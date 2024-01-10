<template>
  <div class="login-choose">
    <LoginBox v-if="loginStore.isLogin"></LoginBox>
    <RegisterBox v-else></RegisterBox>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import { useLoginStore } from '../../store/login'

const loginStore = useLoginStore()
</script>
