<template>
  <div class="show-box">
    <ShowItem
      v-for="(image, index) in recycleList"
      :key="index"
      :info="image"
      @updateList="updateList"
    ></ShowItem>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
const props = defineProps({
  recycleList: {
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
  margin-top: 2%;
}
</style>
