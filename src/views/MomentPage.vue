<template>
  <div class="moment-page">
    <div class="top">
      <Header />
    </div>
    <div class="main">
      <div class="header">好物经验分享交流中心</div>
      <div class="list">
      <moment-box :momentList="showMomentList"></moment-box>
    </div>
      <div class="example-pagination-block">
        <el-pagination
          layout="prev, pager, next"
          :total="momentList.length"
          @current-change="handleCurrentChange"
          :page-count="Math.ceil(momentList.length / pageSize)"
          :current-page="currentPage"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getMomentList } from "../api/index";

const momentList = ref({});
const showMomentList = ref({});

onMounted(async () => {
  momentList.value = await getMomentList();
  showMomentList.value = momentList.value.slice(0, 12);
});

const currentPage = ref(1);
const pageSize = ref(8);

const handleCurrentChange = (page) => {
  //页码更改方法
  currentPage.value = page;
  showMomentList.value = momentList.value.slice(
    (currentPage.value - 1) * pageSize.value,
    currentPage.value * pageSize.value
  );
};
</script>


<style scoped lang="less">
.moment-page {
  width: 98vw;
  background: #fffcfc;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;

  .top {
    width: 100%;
  }

  .main {
    width: 75vw;
    background: white;
    display: flex;
    flex-direction: column;

    .header {
      padding-top: 1vw;
      text-align: center;
      height: 10vh;
      font-family: "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial,
        sans-serif;
      font-size: 2.5rem;
      font-weight: 600;
      font-style: italic;
      letter-spacing: 0.2rem;
      color: rgb(28, 105, 122);
    }

    .showList {
      width: 100%;
      margin-top: -2vw;
    }

    .example-pagination-block {
      width: 100%;
      display: flex;
      justify-content: center;
      text-align: center;
      margin-bottom: 1vw;
    }
  }
}
</style>
