<template>
  <div class="header">
    <div class="header-nav">
      <div>Green-Recycling</div>
      <div class="navigate-mid">
        <div class="nav-span" @click="toHome">网站介绍</div>
        <div class="nav-span" @click="toRecycleListPage">废物利用展示</div>
        <div class="nav-span" @click="toCommodityPage">有关商品</div>
        <div class="nav-span">经验分享</div>
        <div class="nav-span">关于我们</div>
      </div>
      <div class="navigate-right" v-if="userStore.token">
        <el-dropdown aria-expanded="true">
          <span class="el-dropdown-link">
            {{ userStore.name }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-if="userStore.isAdmin" @click="toUserView">管理页面</el-dropdown-item>
              <el-dropdown-item v-else @click="toUserView">个人主页</el-dropdown-item>
              <el-dropdown-item @click="toUserCommodity">我的商品</el-dropdown-item>
              <el-dropdown-item @click="toUserCart">我的购物车</el-dropdown-item>
              <el-dropdown-item @click="toUserMoment">我的帖子</el-dropdown-item>
              <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="navigate-right" v-else>
        <div class="login" @click="logIn">登录</div>
        <div class="register">
          <el-button color="#f7d400" round @click="toRegister">在此注册</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ArrowDown } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/user";
import { defineEmits } from 'vue'
import { useLoginStore } from '../store/login'
const router = useRouter();

const userStore = useUserStore();

const logIn = () => {
  router.push("/login");
};

const toUserView = () => {
  router.push(`/user/${userStore.id}`);
}
const emit = defineEmits(['changeToRegister'])

const loginStore = useLoginStore()
const toRegister = () => {
  loginStore.isLogin = false
  router.push("/login");
}
const logout = () => {
  userStore.resetData();
  router.push("/login");
};

const toHome = () => {
  router.push('/home')
}

const toRecycleListPage = () => {
  router.push("./recycleListPage")
}

const toCommodityPage = () => {
  router.push("./commodityPage")
}

const toUserCommodity = () => {
  router.push(`/user/${userStore.id}/commodity`);
}

const toUserCart = () => {
  router.push(`/user/${userStore.id}/cart`);
}

const toUserMoment = () => {
  router.push(`/user/${userStore.id}/moment`);
}

</script> 

<style scoped lang='less'>
.header {
  width: 100vw;
  height: 8vh;
  font-size: 20px;

  .header-nav {
    width: 90%;
    height: 8vh;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    font-family: "Rubik", sans-serif;
    font-size: 1.3rem;
    font-weight: 600;
    letter-spacing: 0.2rem;
    color: rgb(28, 105, 122);
    cursor: pointer;

    .navigate-mid {
      width: 45vw;
      display: flex;
      justify-content: space-around;
    }

    .navigate-right {
      width: 12vw;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: 1.2rem;
      font-weight: 600;
      letter-spacing: 0.2rem;
      color: rgb(28, 105, 122);

      .login {
        vertical-align: bottom;
      }

      .register {
        .el-button {
          width: 7vw;
          height: 5vh;
          font-size: 1.3rem;
          font-weight: 600;
          letter-spacing: 0.2rem;
          color: rgb(28, 105, 122);
        }
      }

      .el-dropdown {
        font-size: 1.3rem;
        font-weight: 500;
        letter-spacing: 0.1rem;
        color: rgb(28, 105, 122);
      }
      
      .example-showcase .el-dropdown-link {
        cursor: pointer;
        color: var(--el-color-primary);
        display: flex;
        align-items: center;
        border: none;
      }

      .el-dropdown-link {
        outline: 0;
      }
    }
  }
}
</style>
