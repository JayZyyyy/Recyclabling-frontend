<template>
  <div class="search-page">
    <div class="top">
      <Header />
    </div>
    <div class="search">
      <div class="search-input">
        <input
          v-model="keyword"
          size="large"
          placeholder="请输入想了解的内容吧！"
        />
        <img src="../assets/search.png" alt="" @click="search" />
      </div>
    </div>
    <div class="recycleList">
      <div class="header">可回收废物列表</div>
      <div class="showList">
        <ShowBox1 :recycleList="showRecycleList"></ShowBox1>
      </div>

      <div class="example-pagination-block">
        <el-pagination
          layout="prev, pager, next"
          :total="recycleList.length"
          @current-change="handleCurrentChange"
          :page-count="Math.ceil(recycleList.length / pageSize)"
          :current-page="currentPage"
        />
      </div>
    </div>
    <div class="commodityList">
      <div class="header">可回收废物商品列表</div>
      <div class="showList">
        <commodity-box :commodityList="showCommodityList"></commodity-box>
      </div>

      <div class="example-pagination-block">
        <el-pagination
          layout="prev, pager, next"
          :total="commodityList.length"
          @current-change="handleCurrentChange"
          :page-count="Math.ceil(commodityList.length / pageSize)"
          :current-page="currentPage"
        />
      </div>
    </div>
    <div class="momentList">
      <div class="header">好物经验分享交流中心</div>
      <div class="showList">
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
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { getKeywordRecycleList, getKeywordCommodity,getKeywordMoment } from "../api/index";

const route = useRoute();
const keyword = ref(route.query.keyword);

//recycleList
const recycleList = ref({});
const showRecycleList = ref({});
const momentList = ref({});
const showMomentList = ref({});

onMounted(async () => {
  recycleList.value = await getKeywordRecycleList(keyword.value);
  showRecycleList.value = recycleList.value.slice(0, 4);
  commodityList.value = await getKeywordCommodity(keyword.value);
  showCommodityList.value = commodityList.value.slice(0, 4);
  momentList.value = await getKeywordMoment(keyword.value)
  showMomentList.value = momentList.value.slice(0, 4);
  
});
const currentPage = ref(1);
const pageSize = ref(4);

const handleCurrentChange = (page) => {
  //页码更改方法
  currentPage.value = page;
  showRecycleList.value = recycleList.value.slice(
    (currentPage.value - 1) * pageSize.value,
    currentPage.value * pageSize.value
  );
};

const commodityList = ref({});
const showCommodityList = ref({});

const currentPageC = ref(1);
const pageSizeC = ref(4);

const handleCurrentChangeC = (page) => {
  //页码更改方法
  currentPageC.value = page;
  showCommodityList.value = commodityList.value.slice(
    (currentPageC.value - 1) * pageSizeC.value,
    currentPageC.value * pageSizeC.value
  );
};
</script>


<style scoped lang="less">
.search-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;

  .top {
    width: 100%;
  }

  .search {
    display: flex;
    background: #ffffff;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 5vh;
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
  }

  .recycleList, .commodityList, .momentList {
    width: 75vw;
    background: white;
    display: flex;
    flex-direction: column;

    .header {
      margin-left: 1vw;
      padding-top: 1vw;
      height: 10vh;
      font-family: "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial,
        sans-serif;
      font-size: 1.6rem;
      font-weight: 600;
      letter-spacing: 0.2rem;
      color: rgb(28, 105, 122);
    }

    .showList {
      width: 100%;
      margin-top: -4vw;
    }

    .example-pagination-block {
      width: 100%;
      display: flex;
      justify-content: center;
      text-align: center;
      margin-bottom: 1vw;
    }
  }

  .example-pagination-block {
    width: 100%;
    display: flex;
    justify-content: center;
    text-align: center;
    margin-bottom: 1vw;
  }
}
</style>
