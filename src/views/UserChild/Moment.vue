<template>
  <div class="user-moment">
    <div class="breadcrumb">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: `/user/${route.params.id}/home` }"
          >首页</el-breadcrumb-item
        >
        <el-breadcrumb-item>我的动态列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="search-box">
      <div class="input">
        <el-input
          v-model="searchKey"
          class="w-50 m-2"
          size="large"
          placeholder="搜索动态~"
          :suffix-icon="Search"
        />
      </div>
      <div class="search-button">
        <el-button type="primary" plain size="large" @click="search"> 搜索 </el-button>
        <el-button plain size="large" type="warning" @click="showDialog">
          上传新动态
        </el-button>
        <create-moment-dialog
          :dialogFormVisible="dialogFormVisible"
          title = "分享新动态"
          @misShowDialog="misShowDialog"
          @updateList="updateList"
        ></create-moment-dialog>
      </div>
    </div>
    <div class="list-show">
      <moment-box :momentList="showMomentList" @updateList="updateList"></moment-box>
    </div>
    <div class="example-pagination-block">
      <el-pagination
        layout="prev, pager, next"
        :total="momentList.length"
        @current-change="handleCurrentChange"
        :page-count="Math.ceil(momentList.length / pageSize)"
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
  getMomentListById
} from "../../api/index";
import { useUserStore } from "../../store/user";

const route = useRoute();
const userStore = useUserStore();

const input1 = ref("");

// dialog
const dialogFormVisible = ref(false);

const showDialog = () => {
  dialogFormVisible.value = true;
};

const misShowDialog = () => {
  dialogFormVisible.value = false;
};

//list 
const momentList = ref([]);
const showMomentList = ref([]);

// 分页
const currentPage = ref(1);
const pageSize = ref(6);

const updateList = async () => {
  momentList.value = await getMomentListById(route.params.id);
  showMomentList.value = momentList.value.slice(
    (currentPage.value - 1) * pageSize.value,
    currentPage.value * pageSize.value
  );
};
onMounted(updateList);

const handleCurrentChange = (page) => {
  //页码更改方法
  currentPage.value = page;
  showMomentList.value = momentList.value.slice(
    (currentPage.value - 1) * pageSize.value,
    currentPage.value * pageSize.value
  );
  }

const handleSizeChange = () => {}

//search
const searchKey = ref("")

const search = async () => {
  const keywordList = await getKeywordCommodity(searchKey.value, userStore.id)
  if (keywordList.length > 8) {
    showMomentList.value =  keywordList.slice(
    (currentPage.value - 1) * pageSize.value,
    currentPage.value * pageSize.value)
    recycleList.value =  keywordList
  } else{
    showMomentList.value = keywordList
    momentList.value = keywordList
  }
}
</script>

<style lang="less" scoped>
.user-moment {
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
