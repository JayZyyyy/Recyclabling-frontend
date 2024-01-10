<template>
  <div class="login-box">
    <div class="welcome">欢迎回来，请注册！</div>
    <div class="login-form">
      <el-form
        ref="ruleFormRef"
        :model="formData"
        :rules="rules"
        style="max-width: 460px"
      >
        <el-form-item prop="name">
          <el-input
            v-model="formData.name"
            :prefix-icon="User"
            placeholder="请输入用户名"
            clearable
          />
        </el-form-item>
        <el-form-item prop="email">
          <el-input
            v-model="formData.email"
            :prefix-icon="Message"
            placeholder="请输入邮箱"
            clearable
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formData.password"
            :prefix-icon="Lock"
            placeholder="请输入密码"
            clearable
            show-password
          />
        </el-form-item>
        <el-form-item prop="checkedPassword">
          <el-input
            v-model="formData.checkedPassword"
            :prefix-icon="Checked"
            placeholder="请再输入一次密码"
            clearable
            show-password
          />
        </el-form-item>
        <el-form-item>
          <el-button class="button" @click="submitForm(ruleFormRef)"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
      <div class="info">
        已经有账号~<span @click="changeToLogin">点击登录</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { User, Lock, Message, Checked } from "@element-plus/icons-vue";
import type { FormInstance, FormRules } from 'element-plus'
import {registerUser} from '../../api/index'
import { ElMessage } from 'element-plus'
import { useLoginStore } from '../../store/login'
const loginStore = useLoginStore()

const changeToLogin = () => {
  loginStore.isLogin = true
}

const formData = reactive({
  name: "",
  email: "",
  password: "",
  checkedPassword: "",
});

const ruleFormRef = ref<FormInstance>()

//验证密码
const validatePass = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    if (formData.checkedPassword !== "") {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("checkedPassword", () => null);
    }
    callback();
  }
};

const validatePass2 = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else if (value !== formData.password) {
    callback(new Error("两次密码不相同，请重新确认"));
  } else {
    callback();
  }
};

// 验证邮箱
function validateEmail(rule, value, callback) {
  // 邮箱验证正则表达式
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(value);
  if (!isValid) {
    callback(new Error("不是合法的邮箱，请重新输入"));
  } else {
    callback();
  }
}

const rules = reactive<FormRules>({
  name: [
    { required: true, message: "请输入有效的用户名", trigger: "blur" },
    { min: 3, max: 10, message: "用户名长度应在3-10之间", trigger: "blur" },
  ],
  email: [
    {
      required: true,
      validator: validateEmail,
      trigger: "blur",
    },
  ],
  password: [{ required: true, validator: validatePass, trigger: "blur" }],
  checkedPassword: [
    { required: true, validator: validatePass2, trigger: "blur" },
  ],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate( async (valid) => {
    if (valid) {
      const data = {
        name: formData.name,
        email: formData.email,
        password: formData.password
      }
      await registerUser(data).then((res) => {
        console.log(res)
        if (res.status === 409) {
          ElMessage.warning(res.message)
        } else {
          ElMessage.success("注册成功，请登录")
          setTimeout(() => { emit("changeToLogin", true) }, 200)
        }
      })
    } else {
      console.log('error submit!')
      return false
    }
  })
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
    margin-top: 5px;

    .el-input {
      height: 5vh;
      margin-top: 5px;
      font-size: 20px;
    }

    .button {
      width: 100%;
      height: 50px;
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
