<template>
  <div class="CommodityPage">
    <div class="top">
      <Header />
    </div>
    <div class="main">
      <div class="header">可回收废物商品列表</div>
      <div class="nav-tab">
        <div class="icons">
          <div class="icon" @click="filterByCategory('衣服类')">
            <el-tooltip
              class="box-item"
              effect="light"
              content="衣服类"
              placement="top"
            >
              <font-awesome-icon icon="fa-solid fa-shirt" size="3x" />
            </el-tooltip>
          </div>
          <div class="icon" @click="filterByCategory('塑料瓶类')">
            <el-tooltip
              class="box-item"
              effect="light"
              content="塑料瓶类"
              placement="top"
            >
              <font-awesome-icon icon="fa-solid fa-bottle-water" size="3x" />
            </el-tooltip>
          </div>
          <div class="icon" @click="filterByCategory('玻璃瓶类')">
            <el-tooltip
              class="box-item"
              effect="light"
              content="玻璃瓶类"
              placement="top"
            >
              <font-awesome-icon icon="fa-solid fa-bottle-droplet" size="3x" />
            </el-tooltip>
          </div>
          <div class="icon" @click="filterByCategory('报纸废纸类')">
            <el-tooltip
              class="box-item"
              effect="light"
              content="报纸废纸类"
              placement="top"
            >
              <font-awesome-icon icon="fa-solid fa-newspaper" size="3x" />
            </el-tooltip>
          </div>
          <div class="icon" @click="filterByCategory('纸箱类')">
            <el-tooltip
              class="box-item"
              effect="light"
              content="纸箱类"
              placement="top"
            >
              <font-awesome-icon icon="fa-solid fa-box" size="3x" />
            </el-tooltip>
          </div>
          <div class="icon" @click="filterByCategory('塑料制品类')">
            <el-tooltip
              class="box-item"
              effect="light"
              content="塑料制品类"
              placement="top"
            >
              <font-awesome-icon icon="fa-solid fa-bucket" size="3x" />
            </el-tooltip>
          </div>
          <div class="icon" @click="filterByCategory('旧书籍类')">
            <el-tooltip
              class="box-item"
              effect="light"
              content="旧书籍类"
              placement="top"
            >
              <font-awesome-icon icon="fa-solid fa-book" size="3x" />
            </el-tooltip>
          </div>
          <div class="icon" @click="filterByCategory('厨余用品类')">
            <el-tooltip
              class="box-item"
              effect="light"
              content="厨余用品类"
              placement="top"
            >
              <font-awesome-icon icon="fa-solid fa-utensils" size="3x" />
            </el-tooltip>
          </div>
          <div class="icon" @click="filterByCategory('特色信件')">
            <el-tooltip
              class="box-item"
              effect="light"
              content="特色信件"
              placement="top"
            >
              <font-awesome-icon icon="fa-solid fa-envelope" size="3x" />
            </el-tooltip>
          </div>
          <div class="icon" @click="filterByCategory('其他类')">
            <el-tooltip
              class="box-item"
              effect="light"
              content="其他类"
              placement="top"
            >
              <font-awesome-icon icon="fa-solid fa-rectangle-list" size="3x" />
            </el-tooltip>
          </div>
          <div class="icon" @click="filterByCategory('全部')">
            <el-tooltip
              class="box-item"
              effect="light"
              content="全部"
              placement="top"
            >
            <font-awesome-icon icon="fa-solid fa-reply-all" size="3x"/>
            </el-tooltip>
          </div>

        </div>
        <div class="search-box">
          <el-input
            v-model="searchKey"
            class="w-50 m-2"
            size="large"
            placeholder="搜索"
            :suffix-icon="Search"
            @keyup.enter="search"
          />
        </div>
      </div>
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
  </div>
</template>


<script setup>
import { onMounted, ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { Search } from "@element-plus/icons-vue";
import { getCommodityList, getKeywordCommodity, getCommodityByCategory } from "../api/index";

const commodityList = ref({});
const showCommodityList = ref({});

onMounted(async () => {
  commodityList.value = await getCommodityList();
  showCommodityList.value = commodityList.value.slice(0, 12);
});

const currentPage = ref(1);
const pageSize = ref(12);

const handleCurrentChange = (page) => {
  //页码更改方法
  currentPage.value = page;
  showCommodityList.value = commodityList.value.slice(
    (currentPage.value - 1) * pageSize.value,
    currentPage.value * pageSize.value
  );
};

// nav-tab
const searchKey = ref("")

const search = async () => {
  const keywordList = await getKeywordCommodity(searchKey.value)
  if (keywordList.length > 8) {
    showCommodityList.value =  keywordList.slice(
    (currentPage.value - 1) * pageSize.value,
    currentPage.value * pageSize.value)
    recycleList.value =  keywordList
  } else{
    showCommodityList.value = keywordList
    commodityList.value = keywordList
  }
}

// icon 点击
const filterByCategory = async (category = '') => {
  const result = await getCommodityByCategory(category)
  showCommodityList.value = result
  commodityList.value = result
}


</script>


<style scoped lang="less">
.CommodityPage {
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

    .nav-tab {
      width: 100%;
      display: flex;
      justify-content: start;

      .icons {
        width: 80%;
        display: flex;
        justify-content: space-around;

        .icon {
          cursor: pointer;
          height: 100%;
          pointer-events: auto;
        }
      }
    }

    .showList {
      width: 100%;
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
