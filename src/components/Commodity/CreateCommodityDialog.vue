<template>
  <el-dialog
    v-model="props.dialogFormVisible"
    width="30%"
    :title="title"
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
        label="分类"
        :label-width="formLabelWidth"
        style="font-weight: 600"
      >
        <el-select
          v-model="form.category"
          class="m-2"
          placeholder="选择类别"
          size="default"
          style="width: 240px"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="价格"
        :label-width="formLabelWidth"
        style="font-weight: 600"
      >
        <el-input
          v-model="form.price"
          autocomplete="off"
          style="width: 75%"
          type="number"
          step="0.01"
        />
      </el-form-item>
      <el-form-item
        label="库存"
        :label-width="formLabelWidth"
        style="font-weight: 600"
      >
        <el-input
          v-model="form.count"
          autocomplete="off"
          style="width: 75%"
          type="number"
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
      <span
        class="dialog-footer"
        style="display: flex; justify-content: center"
      >
        <el-button @click="misShowDialog" size="large" style="width: 20%"
          >取消</el-button
        >
        <el-button
          type="primary"
          @click="uploadItem()"
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
import {
  getRecycleList,
  uploadImage,
  uploadCommodity,
} from "../../api/index";
import { useRoute } from "vue-router";

const route = useRoute()

const props = defineProps({
  dialogFormVisible: {
    type: Boolean,
  },
  info: {
    type: Object,
  },
});



const emit = defineEmits(["misShowDialog", "updateList"]);
const misShowDialog = () => {
  emit("misShowDialog", false);
};

const form = reactive(
  props.info
    ? props.info
    : {
        name: "",
        introduce: "",
        fileList: [],
        category: "",
        count: '',
        price: '',
      }
);

const uploadItem = async () => {
  if (form.fileList && form.introduce && form.name && form.category && form.count && form.price) {
    const result = await uploadCommodity(form);
    ElMessage.success(result);
    emit("updateList")
    misShowDialog()
    resetForm()
  } else {
    ElMessage.warning("请确保所有表单都有内容哦~");
    return
  }
};

const formLabelWidth = "100px";

const resetForm = () => {
  form.name = "";
  form.introduce = "";
  form.fileList = [];
  form.category = "";
  form.count = '';
  form.price = '';
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

// 选择器
const options = [
  {
    value: "塑料瓶类",
    label: "塑料瓶类",
  },
  {
    value: "玻璃瓶类",
    label: "玻璃瓶类",
  },
  {
    value: "报纸废纸类",
    label: "报纸废纸类",
  },
  {
    value: "纸箱类",
    label: "纸箱类",
  },
  {
    value: "塑料制品类",
    label: "塑料制品类",
  },
  {
    value: "旧书籍类",
    label: "旧书籍类",
  },
  {
    value: "厨余用品类",
    label: "厨余用品类",
  },
  {
    value: "特色信件",
    label: "特色信件",
  },
  {
    value: "其他类",
    label: "其他类",
  },
];
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
