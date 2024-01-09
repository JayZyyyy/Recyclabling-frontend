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
        <!-- <el-upload
          v-if="userStore.isAdmin == 1"
          v-model:file-list="fileList"
          class="upload-demo"
          action="http://localhost:1015/upload/picture"
          :limit="1"
          multiple
        >
          <el-button type="warning" plain size="large" style="width: 100%"
            >上传</el-button
          >
        </el-upload> -->
        <!-- <input type="file">
        <el-button type="warning" plain size="large" style="width: 50%"
            >上传</el-button
          > -->
        <input type="file" @change="uploadImage1" />
      </div>
    </div>
    <div class="list-show">
      <ShowBox :recycleList="recycleList"></ShowBox>
    </div>
  </div>
</template>


<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import { Search, ArrowRight } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { useRoute } from "vue-router";
import ShowBox from "../../components/Main/ShowBox.vue";
import { getRecycleList, uploadImage } from "../../api/index";
import { useUserStore } from "../../store/user";
import { URL } from "url";

const route = useRoute();
const userStore = useUserStore();

const recycleList = ref({});

onMounted(async () => {
  recycleList.value = await getRecycleList();
});

const input1 = ref("");

const imageFile = ref("");

const uploadImage1 = async (event) => {
  imageFile.value = event.target.files[0];
  console.log("已选择文件:" + imageFile.value);
  await uploadImage(imageFile.value);
};
</script>


<style lang="less" scoped>
.user-recycle-list {
  .breadcrumb {
    padding: 4%;

    .el-breadcrumb {
      font-size: 1.2rem;
    }
  }
  .search-box {
    width: 70%;
    margin-left: 4%;
    margin-top: -1%;
    display: flex;

    .input {
      width: 45%;

      .el-input {
        border-radius: 5%;
      }
    }

    .search-button {
      width: 30%;
      padding-left: 2%;
      display: flex;

      .el-button {
        width: 50%;
      }
    }
  }
}
</style>
