<template>
  <div class="moment-box">
    <moment-item
      v-for="(image, index) in momentList"
      :key="index"
      :info="image"
      @updateList="updateList"
    ></moment-item>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
const props = defineProps({
  momentList: {
    type: Array,
  },
});
const emit = defineEmits(['updateList'])
const updateList = () => {
  emit('updateList')
}

</script>

<style lang="less" scoped>
.moment-box {
  display: flex;
  flex-wrap: wrap;
  margin-left: 1%;
  overflow: hidden;
  margin-top: 1%;
}
</style>
