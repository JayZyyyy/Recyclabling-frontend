<template>
  <div class="user-cart">
    <div class="breadcrumb">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: `/user/${route.params.id}/home` }"
          >首页</el-breadcrumb-item
        >
        <el-breadcrumb-item>我的购物车</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-table
      ref="multipleTableRef"
      :data="showCartList"
      row-key="id"
      style="width: 100%,text-align: center;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" :reserve-selection="true" />
      <el-table-column label="商品图片" width="130" align="center">
        <template #default="scope">
          <div style="display: flex; align-items: center; height: 9vh">
            <img :src="getImageUrl(scope.row.filename)" class="commodity-pic" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="商品信息" header-align="center" width="180">
        <template #default="scope">
          <div
            style="
              display: flex;
              flex-direction: column;
              text-align: left;
              margin-left: 10px;
            "
          >
            <span>{{ scope.row.name }}</span>
            <span>{{ scope.row.introduce }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        property="price"
        label="单价"
        width="150"
        align="center"
      />
      <el-table-column property="num" label="数量" width="180" align="center">
        <template #default="scope">
          <el-input-number
            v-model="scope.row.num"
            :min="1"
            :max="1000"
            size="small"
            @change="handleChange(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column label="金额" width="150" align="center">
        <template #default="scope">
          <span style="color: #ff4400"
            >¥{{ (scope.row.num * scope.row.price).toFixed(2) }}</span
          >
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button size="small" type="danger" @click="deleteFunc(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="example-pagination-block">
      <el-pagination
        layout="prev, pager, next"
        :total="cartList.length"
        @current-change="handleCurrentChange"
        :page-count="Math.ceil(cartList.length / pageSize)"
        :current-page="currentPage"
      />
    </div>
    <div class="bottom-text">
      <div class="text">
        <el-text size="large"
          >共计
          <span style="color: #ff4400; font-weight: 600" size="large">
            {{ nums }}</span
          >
          件</el-text
        >
        <el-text size="large"
          >合计
          <span style="color: #ff4400; font-weight: 600" size="large">
            {{ totalPrice }}</span
          >
          元</el-text
        >
      </div>
      <el-button size="large" type="warning" plain @click="checkout">结算</el-button>
    </div>
  </div>
</template>

<script  setup>
import { ref, onMounted } from "vue";
import { ElMessage, ElTable } from "element-plus";
import { ArrowRight } from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
import { getCartList, updateCart, deleteItem, checkoutCart } from "../../api/index";

const route = useRoute();

const cartList = ref([]);
const showCartList = ref([]);

const getList = async () => {
  cartList.value = await getCartList(route.params.id);
  cartList.value = cartList.value.reduce((acc, curr) => {
    const existingItem = acc.find(
      (item) => item.commodityId === curr.commodityId
    );

    if (existingItem) {
      existingItem.num += curr.num;
    } else {
      acc.push({ ...curr });
    }

    return acc;
  }, []);
  showCartList.value = cartList.value.slice(0, 6);
}

onMounted(() => getList());

const multipleTableRef = ref();
const multipleSelection = ref([]);
const toggleSelection = (rows) => {
  if (rows) {
    rows.forEach((row) => {
      multipleTableRef.value.toggleRowSelection(row, undefined);
    });
  } else {
    multipleTableRef.value.clearSelection();
  }
};

const selectedIds = ref([]);
const nums = ref(0);
const totalPrice = ref(0);
const handleSelectionChange = (val) => {
  multipleSelection.value = val;
  selectedIds.value = val.map((item) => item.id);
  nums.value = 0;
  totalPrice.value = 0;
  multipleSelection.value.forEach((row) => {
    nums.value += row.num;
    totalPrice.value += row.num * row.price;
  });
};

// 防抖
function debounce(fn, delay = 300) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.call(this, ...args);
    }, delay);
  };
}

const handleChange = async (row) => {
  nums.value = 0;
  totalPrice.value = 0;
  multipleSelection.value.forEach((row) => {
    nums.value += row.num;
    totalPrice.value += row.num * row.price;
  });
  const debouncedUpdateCart = debounce(async () => {
    const result = await updateCart(route.params.id, row.commodityId, row.num);
    if (result.status === 401) {
      ElMessage.warning(result.message);
    }
  }, 1000);

  debouncedUpdateCart();
};

// 删除功能
const deleteFunc = async (row) => {
  const result = await deleteItem(route.params.id, row.commodityId);
  ElMessage.success(result);
  getList()
};

// 结算
const checkout = async () => {
  const res = await checkoutCart(route.params.id, multipleSelection.value)
  if (res.status === 200) {
    ElMessage.success(res.message)
  } else {
    ElMessage.warning(res)
  }
  multipleTableRef.value.clearSelection()
  getList()
}

const getImageUrl = (filename) => {
  // 构建每个图片的 URL
  return `http://localhost:1015/commodity/${filename}`; // 替换为实际的图片路径
};

const currentPage = ref(1);
const pageSize = ref(6);

const handleCurrentChange = (page) => {
  //页码更改方法
  currentPage.value = page;
  showCartList.value = cartList.value.slice(
    (currentPage.value - 1) * pageSize.value,
    currentPage.value * pageSize.value
  );
};
</script>

<style lang="less" scoped>
.user-cart {
  .breadcrumb {
    padding: 4% 2%;

    .el-breadcrumb {
      font-size: 1.2rem;
    }
  }

  .commodity-pic {
    width: 90%;
  }

  .example-pagination-block {
    width: 100%;
    display: flex;
    justify-content: center;
    text-align: center;
    margin-bottom: 1vw;
  }
  .bottom-text {
    width: 25%;
    float: right;
    display: flex;
    justify-content: space-around;
    margin-right: 3vw;

    .text {
      width: 150px;
      display: flex;
      flex-direction: column;
    }

    .el-button {
      width: 6vw;
    }
  }
}
</style>
