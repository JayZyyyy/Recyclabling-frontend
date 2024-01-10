<template>
  <div class="user-recycle-list">
    <div class="breadcrumb">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: `/user/${route.params.id}/home` }"
          >首页</el-breadcrumb-item
        >
        <el-breadcrumb-item>可回收废物列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="search-box">
      <div class="input">
        <el-input
          v-model="input1"
          class="w-50 m-2"
          size="large"
          placeholder="搜索想要了解的物品吧~"
          :suffix-icon="Search"
        />
      </div>
      <div class="search-button">
        <el-button type="primary" plain size="large"> 搜索 </el-button>
        <el-button plain size="large" type="warning" @click="showDialog()">
          上传新项目
        </el-button>
        <CreateDialog
          :dialogFormVisible="dialogFormVisible"
          title = "上传新的可回收项目"
          @misShowDialog="misShowDialog"
          @updateList="updateList"
        ></CreateDialog>
      </div>
    </div>
    <div class="list-show">
      <ShowBox :recycleList="showRecycleList"></ShowBox>
    </div>
    <div class="example-pagination-block">
      <el-pagination
        layout="prev, pager, next"
        :total="recycleList.length"
        @current-change="handleCurrentChange"
        :page-count="Math.ceil(recycleList.length / pageSize)"
        :current-page="currentPage"
      />
    </div>
  </div>
</template>


<script setup>
import { onMounted, reactive, ref, watch, defineEmits } from "vue";
import {
  Search,
  ArrowRight,
  Delete,
  Plus,
  ZoomIn,
} from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { useRoute } from "vue-router";
import ShowBox from "../../components/Main/ShowBox.vue";
import CreateDialog from "../../components/Main/CreateDialog.vue";
import {
  getRecycleList,
  uploadImage,
  uploadRecycleItem,
} from "../../api/index";
import { useUserStore } from "../../store/user";

const route = useRoute();
const userStore = useUserStore();

const recycleList = ref([]);
const showRecycleList = ref([]);

const updateList = async () => {
  recycleList.value = await getRecycleList();
  showRecycleList.value = recycleList.value.slice(
    (currentPage.value - 1) * pageSize.value,
    currentPage.value * pageSize.value
  );
};
onMounted(updateList);

const input1 = ref("");

const imageFile = ref("");

const uploadItem = async () => {
  const result = await uploadRecycleItem(form);
  ElMessage.success(result);
  recycleList.value = await getRecycleList();
  showRecycleList.value = recycleList.value.slice(
    (currentPage.value - 1) * pageSize.value,
    currentPage.value * pageSize.value
  );
};

const dialogFormVisible = ref(false);
const formLabelWidth = "100px";

const showDialog = () => {
  dialogFormVisible.value = true;
};

const misShowDialog = () => {
  dialogFormVisible.value = false;
};

// 分页
const currentPage = ref(1);
const pageSize = ref(8);

const handleCurrentChange = (page) => {
  //页码更改方法
  currentPage.value = page;
  showRecycleList.value = recycleList.value.slice(
    (currentPage.value - 1) * pageSize.value,
    currentPage.value * pageSize.value
  );
  console.log(showRecycleList.value);
};

const handleSizeChange = () => {

}
</script>


<style lang="less" scoped>
.user-recycle-list {
  .breadcrumb {
    padding: 4% 2%;

    .el-breadcrumb {
      font-size: 1.2rem;
    }
  }
  .search-box {
    width: 60%;
    margin-left: 2%;
    margin-top: -1%;
    display: flex;

    .input {
      width: 50%;

      .el-input {
        border-radius: 5%;
      }
    }

    .search-button {
      width: 45%;
      display: flex;
      margin-left: 2%;

      .el-button {
        width: 50%;
      }
    }
  }
  .example-pagination-block {
    width: 100%;
    display: flex;
    justify-content: center;
    text-align: center;
  }
}
</style>

