<template>
  <div class="user-soldOut">
    <div class="breadcrumb">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: `/user/${route.params.id}/home` }"
          >首页</el-breadcrumb-item
        >
        <el-breadcrumb-item>我的购物车</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-table
      :data="showCartList"
      row-key="id"
      style="width: 100%,text-align: center;"
    >

      <el-table-column label="商品图片" width="200" align="center">
        <template #default="scope">
          <div style="display: flex; align-items: center; height: 10vh">
            <img :src="getImageUrl(scope.row.filename)" class="commodity-pic" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="商品信息" header-align="center" width="220">
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
      <el-table-column property="num" label="数量" width="150" align="center" />
      <el-table-column label="金额" width="150" align="center">
        <template #default="scope">
          <span style="color: #ff4400"
            >¥{{ (scope.row.num * scope.row.price).toFixed(2) }}</span
          >
        </template>
      </el-table-column>
      <el-table-column property="updateAt" label="交易时间" width="180" align="center"> 
         <template #default="scope">
            {{ new Date(scope.row.updateAt).toLocaleString() }}
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
  </div>
</template>

<script  setup>
import { ref, onMounted } from "vue";
import { ElMessage, ElTable } from "element-plus";
import { ArrowRight } from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
import { getSoldOutList } from "../../api/index";

const route = useRoute();

const cartList = ref([]);
const showCartList = ref([]);

const getList = async () => {
  cartList.value = await getSoldOutList(route.params.id);
  showCartList.value = cartList.value.slice(0, 6);
}

onMounted(() => getList());

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
.user-soldOut {
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
}
</style>
