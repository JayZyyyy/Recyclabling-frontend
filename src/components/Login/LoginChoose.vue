<template>
  <div class="login-choose">
    <LoginBox v-if="isLogin" @changeToRegister='changeToRegister'></LoginBox>
    <RegisterBox v-else @changeToLogin='changeToLogin'></RegisterBox>
  </div>
</template>

<script setup>
import {ref} from 'vue'
const isLogin = ref(true)

const changeToRegister = val => {
  isLogin.value = val
}

const changeToLogin = (val) => {
  isLogin.value = val
}
</script>
