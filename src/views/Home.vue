<template>
  <div class="home">
    <div class="top">
      <HeaderVue />
    </div>
    <div class="container">
      <div class="main-pic">
        <Picture1></Picture1>
        <Info></Info>
        <Picture></Picture>
      </div>
      <div class="main">
        <ShowList1></ShowList1>
        <show-commodities></show-commodities>
        <div class="bottom">
          <el-descriptions class="margin-top" :column="3" border>
            <template #title>
              <span class="aboutUs">关于我们</span>
            </template>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  <el-icon :style="iconStyle">
                    <user />
                  </el-icon>
                  姓名
                </div>
              </template>
              JayZz
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  <el-icon :style="iconStyle">
                    <iphone />
                  </el-icon>
                  电话
                </div>
              </template>
              18100000000
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  <el-icon :style="iconStyle">
                    <location />
                  </el-icon>
                  地区
                </div>
              </template>
              中华人民共和国
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  <el-icon :style="iconStyle">
                    <tickets />
                  </el-icon>
                  标记
                </div>
              </template>
              <el-tag size="small">毕设</el-tag>
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  <el-icon :style="iconStyle">
                    <office-building />
                  </el-icon>
                  地址
                </div>
              </template>
              广东省广州市天河区华南农业大学泰山区宿舍
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import HeaderVue from "../components/Header.vue";
import Info from "../components/pic/Info.vue";
import Picture from "../components/pic/Picture.vue";
import {
  Iphone,
  Location,
  OfficeBuilding,
  Tickets,
  User,
} from "@element-plus/icons-vue";

import { onMounted } from "vue";
import { useUserStore } from "../store/user";

const userStore = useUserStore();
onMounted(() => {
  console.log(userStore.isAdmin);
});
</script>


<style scoped lang="less">
.home {
  display: flex;
  flex-direction: column;
  height: 100vh;
  // background: #f7f7f7;

  .top {
    width: 100%;
  }

  .container {
    flex: 1;
    width: 100%;
    overflow-y: scroll;

    .main-pic {
      display: flex;
      justify-content: space-around;
      height: 60vh;
      background: white;
    }

    .main {
      width: 65%;
      margin: auto;
      padding-top: 30px;
      background: white;

      .bottom {
        width: 95%;
        text-align: center;
        margin-left: 3%;
        margin-top: 2%;
        padding-bottom: 2%;

        .aboutUs {
          font-size: 24px !important;
        }
      }
    }
  }
}
</style>
