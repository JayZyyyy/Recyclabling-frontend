<template>
  <div class="user-home">
    <div class="text">
      <span >欢迎使用Green-Recycling!</span>
      <span>让我们致力于废物回收利用</span>
      <span>让资源以新的方式重新使用</span>
      <span>致力于保护我们的美丽地球吧!!!</span>
    </div>
  </div>
</template>


<style lang="less">
.user-home {
  width: 100%;
  height: 100%;
  background-image: url('../../assets/greenEarth.png') ;
  background-size: 100% 100%;

  .text {
    padding-top: 10%;
    padding-left: 10%;
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
}
</style>
