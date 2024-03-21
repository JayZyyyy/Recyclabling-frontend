<template>
  <div class="show-moments">
    <div class="info">
      <span>好物经验交流分享</span>
      <span class="sub-info">快来一起参与吧！</span>
    </div>
    <div class="list">
      <moment-box :momentList="showMomentList"></moment-box>
    </div>
    <div class="more">
      <el-button size="large" @click="toMomentPage">查看更多</el-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getMomentList } from '../../api/index'
import { useRouter } from 'vue-router'

const momentList = ref({})
const showMomentList = ref({})

onMounted(async () => {
  momentList.value = await getMomentList()
  showMomentList.value = momentList.value.slice(0,4)
})

const router = useRouter()
const toMomentPage = () => {
  router.push('/momentPage')
}
</script>

<style lang="less" scoped>
.show-moments {
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
