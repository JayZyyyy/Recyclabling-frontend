<template>
  <div class="show-box">
    <ShowItem1
      v-for="(image, index) in recycleList"
      :key="index"
      :info="image"
    ></ShowItem1>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({
  recycleList: {
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
