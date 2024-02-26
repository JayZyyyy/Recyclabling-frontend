<template>
  <div class="nav-tab">
    <div class="icons">
      <font-awesome-icon icon="fa-solid fa-shirt"  size="3x"/>
      <font-awesome-icon icon="fa-solid fa-bottle-water" size="3x"/>
      <font-awesome-icon icon="fa-solid fa-bottle-droplet" size="3x"/>
      <font-awesome-icon icon="fa-solid fa-newspaper" size="3x"/>
      <font-awesome-icon icon="fa-solid fa-box" size="3x"/>
      <font-awesome-icon icon="fa-solid fa-bucket" size="3x"/>
      <font-awesome-icon icon="fa-solid fa-book" size="3x"/>
      <font-awesome-icon icon="fa-solid fa-plate-wheat" size="3x"/>
      <font-awesome-icon icon="fa-solid fa-envelope" size="3x"/>
    </div>
    <div class="search-box">
      <el-input
      v-model="input1"
      class="w-50 m-2"
      size="large"
      placeholder="Please Input"
      :suffix-icon="Search"
    />
    </div>
  </div>
</template>


<script setup>
// shirt  bottle-water newspaper box  bucket book plate-wheat envelope
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { Search } from '@element-plus/icons-vue'
</script>

<style lang="less" scoped>
.nav-tab {
  width: 100%;
  display: flex;
  padding-bottom: 1vh;
  justify-content: start;

  .icons {
    width: 80%;
    display: flex;
    justify-content: space-around;
  }
}
</style>
