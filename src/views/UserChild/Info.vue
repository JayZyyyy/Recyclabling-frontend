<template>
  <div class="user-info">
    <div class="breadcrumb">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: `/user/${route.params.id}/home` }"
          >首页</el-breadcrumb-item
        >
        <el-breadcrumb-item>我的信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form
      class="form"
      :model="form"
      label-width="auto"
      style="max-width: 450px;"
    >
      <el-form-item label="用户名">
        <el-input v-model="form.name" :disabled="isDisabled" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" :disabled="isDisabled" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          v-model="form.password"
          type="password"
          :disabled="isDisabledPass"
        />
      </el-form-item>
      <el-form-item class="button">
        <el-button type="info" @click="modifyInfo1" v-if="isDisabled"
          >修改基础信息</el-button
        >
        <el-button type="primary" @click="modifyFunc" v-else
          >确认修改</el-button
        >
        <el-button type="warning" @click="modifyPass1" v-if="isDisabledPass">修改密码</el-button>
        <el-button type="danger" @click="modifyPassFunc" v-else
          >确认修改</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { getUserInfo, modifyInfo, modifyPassInfo } from "../../api";

const route = useRoute();

const form = ref({
  id: 0,
  name: "",
  email: "",
  password: "",
});

onMounted(async () => {
  form.value = await getUserInfo(route.params.id);
});

const isDisabled = ref(true);
const isDisabledPass = ref(true);

const modifyInfo1 = () => {
  isDisabled.value = false;
};

const modifyFunc = async () => {
  await modifyInfo({
    id: route.params.id,
    name: form.value.name,
    email: form.value.email,
  });
  ElMessage.success('修改成功')
  form.value = await getUserInfo(route.params.id);
  isDisabled.value = true
};

const modifyPass1 = () => {
  isDisabledPass.value = false;
};

const modifyPassFunc = async () => {
  await modifyPassInfo({
    id: route.params.id,
    password: form.value.password,
  });
  ElMessage.success('修改成功')
  form.value = await getUserInfo(route.params.id);
  isDisabledPass.value = true
};

</script>

<style lang="less" scoped>
.user-info {
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
