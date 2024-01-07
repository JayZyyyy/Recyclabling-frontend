<template>
  <div class="pic-info">
    <div class="text">
      <span>欢迎使用Green-Recycling!</span>
      <span>我们致力于打造一个</span>
      <span>能普及废物回收再利用知识</span>
      <span> 以及废物交换等的介绍网站和交易平台 </span>
    </div>
    <div class="search">
      <div class="search-input">
        <input
          v-model="input1"
          size="large"
          placeholder="请输入想了解的内容吧！"
        />
        <img src="../../assets/search.png" alt="" />
      </div>
      <div class="search-example">
        <span>日常废纸</span>
        <span>可回收利用资源</span>
        <span>再利用商品</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Search } from "@element-plus/icons-vue";
const input1 = ref("");
</script>

<style lang="less" scoped>
.pic-info {
  display: flex;
  background: #fff;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .text {
    display: flex;
    flex-direction: column;
    font-family: "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial,
      sans-serif;
    font-size: 2rem;
    font-weight: 600;
    font-style: italic;
    letter-spacing: 0.2rem;
    color: rgb(28, 105, 122);
  }

  .search {
    margin-top: 30px;
    .search-input {
      width: 28vw;
      border: none;
      position: relative;

      input {
        width: 100%;
        height: 5vh;
        border-radius: 40px;
        border: 4px solid rgb(28, 105, 122);
        text-indent: 2rem;
        font-size: 1.6rem;
        color: rgb(143, 154, 154);
      }

      img {
        position: absolute;
        right: 20px;
        width: 1.8vw;
        height: 1.8vw;
        margin-top: -2.2vw;
      }
    }

    .search-example {
      margin-top: 14px;
      width: 25vw;
      display: flex;
      justify-content: space-around;
      color: rgb(28, 105, 122);
      font-family: "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial,
      sans-serif;
      font-size: 1rem;
      font-weight: 400;
      letter-spacing: 0.1rem;
      cursor: pointer;
    }
  }
}
</style>
