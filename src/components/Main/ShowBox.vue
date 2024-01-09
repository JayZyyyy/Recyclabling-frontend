<template>
  <div class="show-box">
    <ShowItem v-for="(image, index) in recycleList" :key="index" :src="getImageUrl(image)"></ShowItem>

  </div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  recycleList: {
    type: Array
  }
})


const getImageUrl = (image) => {
  // 构建每个图片的 URL
  return `http://localhost:1015/recycleList/${image.filename}`; // 替换为实际的图片路径
};

console.log(props.recycleList)
</script>

<style lang="less" scoped>
.show-box {
  display: flex;
  flex-wrap: wrap;
  margin-left: 1%;
  margin-top: 40px;
}
</style>
