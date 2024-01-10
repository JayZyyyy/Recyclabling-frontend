<template>
  <div class="login-box">
    <div class="welcome">欢迎回来，请登录！</div>
    <div class="login-form">
      <el-form :model="formData" style="max-width: 460px">
        
        <el-input
          v-model="formData.name"
          :prefix-icon="User"
          placeholder="用户名"
          clearable
        />
        <el-input
          v-model="formData.password"
          :prefix-icon="Lock"
          placeholder="密码"
          clearable
          show-password
        />
        <button class="button" @click="loginFunc" type="button">登录</button>
      </el-form>
      <div class="info">还没有账号？<span @click="changeToRegister">点击注册</span></div>
    </div> 
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { User, Lock } from "@element-plus/icons-vue";
import { login } from '../../api/index'
import { ElMessage } from "element-plus";
import { useRouter } from 'vue-router'
import { useUserStore } from '../../store/user'
import { useLoginStore } from '../../store/login'

const formData = reactive({
  name: "",
  password: "",
});

const router = useRouter()
const userStore = useUserStore() 
const loginFunc = async () => {
  await login(formData).then((res) => {
    if (res.status === 400) {
      ElMessage.error(res.message)
    } else {
      ElMessage.success("登录成功")
      userStore.storeData(res)
      router.push('/home')
    }
  })
  
}
const loginStore = useLoginStore()
const changeToRegister = () => {
  loginStore.isLogin = false
}
</script>

<style lang="less" scoped>
.login-box {
  text-align: center;

  .welcome {
    padding: 10px;
    font-family: "Rubik", sans-serif;
    font-size: 1.7rem;
    font-weight: 600;
    letter-spacing: 0.15rem;
    color: rgb(28, 105, 122);
  }

  .login-form {
    width: 85%;
    margin: auto;

    .el-input {
      height: 6vh;
      margin-top: 20px;
      margin-bottom: 10px;
      font-size: 20px;
    }

    .button {
      width: 100%;
      height: 50px;
      margin-top: 20px;
      font-size: 20px;
      background: #07b464;
      color: white;
      border-radius: 10px;
      cursor: pointer;
    }
  }
  .info {
    margin-top: 20px;
    color: rgba(0, 0, 0, 0.5);

    span {
      color: #07b464;
      cursor: pointer;
    }
  }
}
</style>
