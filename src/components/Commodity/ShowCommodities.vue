<template>
  <div class="show-commodity">
    <div class="info">
      <span>可利用废物商品出售</span>
      <span class="sub-info">来带走几件吧！</span>
    </div>
    <div class="list">
      <ShowBox1 :recycleList="showRecycleList"></ShowBox1>
    </div>
    <div class="more">
      <el-button size="large" @click="toCommodityPage">查看更多</el-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getRecycleList } from '../../api/index'
import { useRouter } from 'vue-router'

const recycleList = ref({})
const showRecycleList = ref({})

onMounted(async () => {
  recycleList.value = await getRecycleList()
  showRecycleList.value = recycleList.value.slice(0,8)
})

const router = useRouter()
const toCommodityPage = () => {
  router.push('/commodityPage')
}
</script>

<style lang="less" scoped>
.show-commodity {
  margin-left: 2%;
  margin-top: 2vw;
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

  .more {
    margin-top: 10px;

    .el-button {
      width: 150px;
    }
  }
}
</style>
