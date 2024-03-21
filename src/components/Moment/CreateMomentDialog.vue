<template>
  <el-dialog
    v-model="props.dialogFormVisible"
    width="30%"
    :title="title"
    @close="resetForm(),misShowDialog()"
  >
    <el-form :model="form">
      <el-form-item
        label="标题"
        :label-width="formLabelWidth"
        style="font-weight: 600"
      >
        <el-input v-model="form.title" autocomplete="off" style="width: 75%" />
      </el-form-item>
      <el-form-item
        label="具体内容"
        :label-width="formLabelWidth"
        style="font-weight: 600"
      >
        <el-input
          v-model="form.content"
          :rows="3"
          type="textarea"
          placeholder="请输入"
          style="width: 75%"
        />
      </el-form-item>
      <el-form-item
        label="配图"
        :label-width="formLabelWidth"
        style="font-weight: 600"
      >
        <el-upload
          action="#"
          list-type="picture-card"
          :auto-upload="false"
          :class="{ hide: hideUpload }"
          v-model:file-list="form.fileList"
          :on-change="handleChange"
          :limit="1"
          :on-remove="handleRemove"
        >
          <el-icon><Plus /></el-icon>

          <template #file="{ file }">
            <div>
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                alt=""
              />
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <el-icon><Delete /></el-icon>
                </span>
              </span>
            </div>
          </template>
        </el-upload>
        <el-dialog v-model="dialogImageVisible" width="20%">
          <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
      </el-form-item>
    </el-form>
    <template #footer>
      <span
        class="dialog-footer"
        style="display: flex; justify-content: center"
      >
        <el-button @click="resetForm(),misShowDialog()" size="large" style="width: 20%"
          >取消</el-button
        >
        <el-button
          type="primary"
          @click="uploadMoment()"
          size="large"
          style="width: 20%"
        >
          上传
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>


<script setup>
import { reactive, ref, defineProps, defineEmits } from "vue";
import {
  Search,
  ArrowRight,
  Delete,
  Plus,
  ZoomIn,
} from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import ShowBox from "../../components/Main/ShowBox.vue";
import { addMoment } from "../../api/index";
import { useRoute } from "vue-router";
import { useUserStore } from "../../store/user";

const route = useRoute();
const user = useUserStore();

const props = defineProps({
  dialogFormVisible: {
    type: Boolean,
  },
  info: {
    type: Object,
  },
  title: {
    type: String,
  },
});

const emit = defineEmits(["misShowDialog", "updateList"]);
const misShowDialog = () => {
  emit("misShowDialog", false);
};

const form = reactive({
  title: "",
  content: "",
  fileList: [],
});

const uploadMoment = async () => {
  if (
    form.fileList &&
    form.content &&
    form.title
  ) {
    form.userId = user.id;
    const result = await addMoment(form);
    ElMessage.success(result);
    emit("updateList");
    misShowDialog();
    resetForm();
  } else {
    ElMessage.warning("请确保所有表单都有内容哦~");
    return;
  }
};

const formLabelWidth = "100px";

const resetForm = () => {
  form.title = "";
  form.content = "";
  form.fileList = [];
  hideUpload.value = form.fileList.length > 0;
};

const dialogImageUrl = ref("");
const dialogImageVisible = ref(false);
const hideUpload = ref(false);

const handleChange = (file, fileList) => {
  hideUpload.value = fileList.length > 0;
};

const handleRemove = (file) => {
  form.fileList.pop();
  hideUpload.value = form.fileList.length > 0;
};

const handlePictureCardPreview = (file) => {
  dialogImageUrl.value = file.url;
  dialogVisible.value = true;
};

const getImageUrl = (image) => {
  // 构建每个图片的 URL
  return `http://localhost:1015/commodity/${image.filename}`; // 替换为实际的图片路径
};

</script>


<style lang="less" scoped>
.user-recycle-list {
  .list-show {
    margin-left: 1%;
  }
  .el-button--text {
    margin-right: 15px;
  }
  .el-select {
    width: 300px;
  }
  .el-input {
    width: 300px;
  }
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
}
</style>

<style>
.hide .el-upload--picture-card {
  display: none;
}
</style>
