<template>
  <div class="show-item">
    <div class="pic">
      <a href="#" ondragstart="return false">
        <img :src="getImageUrl(info)" />
        <div class="mask">
          <h3 @click="showDialog()">
            查看详情
          </h3>
          <ShowDialog
            :info="info"
            :key="info.id"
            :dialogVisible="dialogVisible"
            @misShowDialog="misShowDialog"
          ></ShowDialog>
        </div>
      </a>
    </div>
    <div class="detail">{{ info.name }}</div>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'
const props = defineProps({
  info: {
    type: Object
  }
})


const dialogVisible = ref(false);

const showDialog = () => {
  dialogVisible.value = true;
};

const misShowDialog = () => {
  dialogVisible.value = false;
};

const recycleList = ref([]);
const showRecycleList = ref([]);

const updateList = async () => {
  recycleList.value = await getRecycleList();
  showRecycleList.value = recycleList.value.slice(
    (currentPage.value - 1) * pageSize.value,
    currentPage.value * pageSize.value
  );
};


const getImageUrl = (image) => {
  // 构建每个图片的 URL
  return `http://localhost:1015/recycleList/${image.filename}`; // 替换为实际的图片路径
};

</script>

<style lang="less" scoped>
.show-item {
  flex-basis: 23%;
  margin: 10px 0.7%;
  padding-top: 1%;

  .pic {
    width: 100%;
    height: 230px;

    position: relative;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }

    a:hover {
      img {
        transform: scale(1.1);
        width: 100%;
        overflow: hidden;
      }
      .mask {
        opacity: 1;
      }
    }

    .mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(101, 101, 101, 0.2);
      color: #ffffff;
      opacity: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.4rem;
    }
  }

  .detail {
    color: rgb(28, 105, 122);
    font-family: "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial,
      sans-serif;
    font-size: 1.3rem;
    font-weight: 500;
    letter-spacing: 0.1rem;
    text-align: center;
  }
}
</style>
