<template>
  <div class="show-box">
    <commodity-item
      v-for="(image, index) in commodityList"
      :key="index"
      :info="image"
      @updateList="updateList"
    ></commodity-item>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
const props = defineProps({
  commodityList: {
    type: Array,
  },
});
const emit = defineEmits(['updateList'])
const updateList = () => {
  emit('updateList')
}

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
