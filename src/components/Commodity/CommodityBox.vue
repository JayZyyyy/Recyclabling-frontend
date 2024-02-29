<template>
  <div class="show-box">
    <commodity-item
      v-for="(image, index) in commodityList"
      :key="index"
      :info="image"
    ></commodity-item>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({
  commodityList: {
    type: Array,
  },
});
</script>

<style lang="less" scoped>
.show-box {
  display: flex;
  flex-wrap: wrap;
  margin-left: 1%;
  overflow: hidden;
  margin-top: 1%;
}
</style>
