<template>
  <div class="user-list">
    <div class="breadcrumb">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: `/user/${route.params.id}/home` }"
          >首页</el-breadcrumb-item
        >
        <el-breadcrumb-item>我的信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
  <el-table :data="userList" style="width: 100%;" >
    <el-table-column label="用户名" width="250px;" prop="name" align="center"/>
    <el-table-column label="邮箱" width="350px" prop="email" align="center">
    </el-table-column>
    <el-table-column label="操作" align="center">
      <template #default="scope">
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.row.id)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { Timer } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { deleteUser, getUserList } from "../../api";

const route = useRoute();
const userList = ref([]);
onMounted(async () => {
  userList.value = await getUserList();
});

const handleDelete =  async (id) => {
  await deleteUser(id)
  ElMessage.success('删除成功')
  userList.value = await getUserList()
};

</script>

<style lang="less" scoped>
.user-list {
  .breadcrumb {
    padding: 4% 2%;

    .el-breadcrumb {
      font-size: 1.2rem;
    }
  }

  .form {
    margin-top: 10vh;
    margin-left: 2vw;

    .button {
      margin-left: 5vw;
    }
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
