<template>
  <div class="show-item">
    <div class="pic">
      <a href="#">
        <img :src="src" />
        <div class="mask">
          <h3>
            查看详情
          </h3>
        </div>
      </a>
            
    </div>
    <div class="detail">2113</div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  src: {
    type: String
  }
})
</script>

<style lang="less" scoped>
.show-item {
  flex-basis: 23%;
  margin: 10px 0.7%;

  .pic {
    width: 100%;
    height: 100%;

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
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: 0.1rem;
    text-align: center;
  }
}
</style>
