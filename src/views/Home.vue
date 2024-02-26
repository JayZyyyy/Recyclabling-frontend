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
        <ShowList></ShowList>
        <show-commodities></show-commodities>
      </div>
    </div>
  </div>
</template>


<script setup>
import HeaderVue from "../components/Header.vue";
import Info from "../components/pic/Info.vue";
import Picture from "../components/pic/Picture.vue";

import { onMounted } from 'vue'
import { useUserStore } from "../store/user";

const userStore = useUserStore()
onMounted(() => {
  console.log(userStore.isAdmin)
})

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
    }
  }
}
</style>
