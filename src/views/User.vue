<template>
  <div class="user-layout">
    <div class="container">
      <div class="left">
        <div class="top"><span>欢迎您~</span>{{ userStore.name }}</div>
        <div class="middle">
          <div class="tab" @click="toHome">
            <div class="tab-icon">
              <el-icon :size="28"><Memo /></el-icon>
            </div>
            <div class="tab-text">首页</div>
          </div>
          <div class="tab" @click="toRecycleList"  v-if="userStore.isAdmin">
            <div class="tab-icon">
              <el-icon :size="28"><Files /></el-icon>
            </div>
            <div class="tab-text">可回收废物列表</div>
          </div>
          <div class="tab">1</div>
          <div class="tab">1</div>
          <div class="tab">1</div>
          <div class="tab">1</div>
          <div class="tab" @click="toHomePage">
            <div class="tab-icon">
              <el-icon :size="28"><House /></el-icon>
              
            </div>

            回到首页</div>
        </div>
      </div>
      <div class="right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "../store/user";
import { Memo, Files, House } from "@element-plus/icons-vue";
import { useRouter, useRoute } from "vue-router";


const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

const toHome = () => {
  router.push(`/user/${route.params.id}/home`);
};

const toHomePage = () => {
  router.push('/home')
}

const toRecycleList = () => {
  router.push(`/user/${route.params.id}/recycleList`);
};
</script>

<style lang="less" scoped>
.user-layout {
  width: 100vw;
  height: 100vh;
  display: flex;
  background: #f9f9f9;

  .container {
    margin: 0 auto;
    background: white;
    display: flex;

    .left {
      width: 15vw;
      height: 100vh;
      min-width: 200px;
      border-right:0.1px solid #e5edeb ;
      background: #f4fff9;
      text-align: center;
      opacity: 0.7;

      .top {
        padding: 30px;
        color: #83c5b3;
        font-family: "Tomorrow";
        font-weight: 500;
        font-size: 1.5rem;
      }

      .middle {
        margin-top: 20px;

        .tab {
          display: flex;
          padding: 15px;
          width: 100%;
          margin: auto;
          cursor: pointer;
          &:hover {
            color: #83c5b3;
          }
          padding-left: 15%;

          .tab-icon {
            padding-right: 20px;
          }

          .tab-text {
            font-size: 1.1rem;
            font-weight: 500;
          }
        }
      }
    }

    .right {
      width: 55vw;
      min-width: 600px;
    }
  }
}
</style>
