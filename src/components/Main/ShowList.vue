<template>
  <div class="show-list">
    <div class="info">
      <span>可利用废物列表展示</span>
      <span class="sub-info">来了解一下吧！</span>
    </div>
    <div class="list">
      <ShowBox></ShowBox>
    </div>
  </div>
</template>

<style lang="less" scoped>
.show-list {
  text-align: center;
  .info {
    display: flex;
    flex-direction: column;
    color: rgb(28, 105, 122);
    font-family: "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial,
      sans-serif;
    font-size: 2rem;
    font-weight: 600;
    letter-spacing: 0.1rem;

    .sub-info {
      font-size: 1.5rem;
      font-weight: 500;
      margin-top: 10px;
    }
  }
}
</style>
