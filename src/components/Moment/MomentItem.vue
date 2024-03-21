<template>
  <div class="moment-item">
    <el-card style="width: 100%" shadow="hover" class="card">
      <img :src="getImageUrl(info)" />
      <div class="content">
        <div class="title">
          {{ info.title }}
        </div>
        <div class="body">
          {{ info.content }}
        </div>
      </div>
      <div class="comment">
        <el-button link type="danger" @click="deleteMomentFunc"
          v-if="deleteButton">删除动态</el-button
        >
        <el-button link type="warning" @click="commentFunc">发表评论</el-button>
        <el-button link type="primary" @click="lookComment">查看评论</el-button>
      </div>
      <el-dialog
        v-model="commentDialogVisible"
        title="发表评论"
        width="500"
        align-center
      >
        <el-input
          v-model="commentText"
          :rows="5"
          type="textarea"
          placeholder=""
        />
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="commentDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="submitComment"> 确认 </el-button>
          </div>
        </template>
      </el-dialog>
      <el-dialog v-model="commentTableVisible" title="评论列表" width="800">
        <el-table :data="commentList" border>
          <el-table-column
            property="name"
            label="用户"
            width="200"
            header-align="center"
            align="center"
          />
          <el-table-column
            property="content"
            label="内容"
            header-align="center"
            align="center"
          />
         <el-table-column property="createAt" label="日期" width="180" align="center"> 
         <template #default="scope">
            {{ new Date(scope.row.createAt).toLocaleString() }}
        </template>
      </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { defineProps, ref, defineEmits } from "vue";
import { useRoute } from "vue-router";
import { deleteMoment, addComment, getCommentList } from "../../api";
import { useUserStore } from "../../store/user";

const props = defineProps({
  info: {
    type: Object,
  },
});
const emit = defineEmits(["updateList"]);
const updateList = () => {
  emit("updateList");
};

const dialogVisible = ref(false);

const showDialog = () => {
  dialogVisible.value = true;
};

const misShowDialog = () => {
  dialogVisible.value = false;
};

const getImageUrl = (image) => {
  // 构建每个图片的 URL
  return `http://localhost:1015/moment/${image.filename}`; // 替换为实际的图片路径
};

const commentDialogVisible = ref(false);
const commentText = ref();
const commentFunc = () => {
  commentDialogVisible.value = true;
};

const userStore = useUserStore();
const submitComment = async () => {
  const commentData = {
    userId: userStore.id,
    content: commentText.value,
    momentId: props.info.id,
  };
  try {
    await addComment(commentData);
    ElMessage.success("发布成功~");
  } catch (error) {
    ElMessage.error(error);
  }
  commentDialogVisible.value = false;
};

const commentTableVisible = ref(false);
const commentList = ref([]);
const lookComment = async () => {
  commentList.value = await getCommentList(props.info.id);
  commentTableVisible.value = true;
};

const route = useRoute()
const deleteButton = route?.meta?.data?.inUser;
const deleteMomentFunc = async () => {
  await deleteMoment(props.info.id);
  ElMessage.success("删除成功");
  updateList();
};
</script>

<style lang="less" scoped>
.moment-item {
  flex-basis: 47%;
  margin: 10px 0.7%;

  .card {
    img {
      width: 160px;
      height: 160px;
      float: left;
    }

    .content {
      display: flex;
      flex-direction: column;
      padding-left: 20px;
      height: 120px;
      justify-content: start;
      text-align: left;

      .title {
        font-size: 24px;
        font-weight: 600;
      }
    }
    .comment {
      height: 30px;
      width: 100%;
      text-align: right;
      align-self: flex-end;
    }
  }
}
</style>
