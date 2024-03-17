<template>
  <el-dialog
    v-model="props.dialogVisible"
    title="修改内容"
    width="500"
    @close="misShowDialog"
  >
    <el-form :model="form">
      <el-form-item
        label="名称"
        :label-width="formLabelWidth"
        style="font-weight: 600"
      >
        <el-input v-model="form.name" autocomplete="off" style="width: 75%" />
      </el-form-item>
      <el-form-item
        label="具体介绍"
        :label-width="formLabelWidth"
        style="font-weight: 600"
      >
        <el-input
          v-model="form.introduce"
          :rows="3"
          type="textarea"
          placeholder="请输入"
          style="width: 75%"
        />
      </el-form-item>
      <el-form-item
        label="图片"
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
      <div class="dialog-footer">
        <el-button @click="misShowDialog">取消</el-button>
        <el-button type="primary" @click="updateItem(), misShowDialog(), resetForm()">
          修改
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, ref, defineProps, defineEmits } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import {
  Search,
  ArrowRight,
  Delete,
  Plus,
  ZoomIn,
} from "@element-plus/icons-vue";
import { updateRecycleItem, updateRecycleItemWithoutPic} from "../../api";

const props = defineProps({
  dialogVisible: {
    type: Boolean,
  },
  info: {
    type: Object,
  },
});

const formLabelWidth = "100px";

const emit = defineEmits(["misShowDialog", "updateList"]);
const misShowDialog = () => {
  emit("misShowDialog", false);
};

const file = ref(props.info.fileList)
const form = reactive({
  id: props.info.id,
  name: props.info.name || "",
  introduce: props.info.introduce || "",
  fileList: [],
});

const resetForm = () => {
  form.fileList = [];
  hideUpload.value = form.fileList.length > 0;
};

const updateItem = async () => {
  if (form.name === props.info.name && form.introduce === props.info.introduce && form.fileList.length === 0) {
    ElMessage.warning('没有改动的内容')
    return
  }
  let result = ''
  if(form.fileList.length === 0) {
    result = await updateRecycleItemWithoutPic(form)
  } else {
    result = await updateRecycleItem(form)
  }
  if (result.status === 401) {
    ElMessage.warning(result.message)
  }else {
    emit("updateList");
    ElMessage.success(result);
  }
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
  return `http://localhost:1015/recycleList/${image.filename}`; // 替换为实际的图片路径
};
</script>
