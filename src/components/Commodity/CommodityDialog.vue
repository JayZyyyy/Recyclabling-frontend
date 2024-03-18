<template>
  <el-dialog
    v-model="props.dialogVisible"
    title="具体内容"
    width="500"
    @close="misShowDialog"
  >
    <el-form :model="form">
      <el-form-item
        label="名称"
        :label-width="formLabelWidth"
        style="font-weight: 600"
      >
        <el-input
          v-model="form.name"
          autocomplete="off"
          style="width: 75%"
          :disabled="disabled"
        />
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
          :disabled="disabled"
        />
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
          :disabled="disabled"
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
          :disabled="disabled"
          type="number"
        />
      </el-form-item>
      <el-form-item
        label="分类"
        :label-width="formLabelWidth"
        style="font-weight: 600"
      >
        <el-input
          v-model="form.category"
          autocomplete="off"
          style="width: 75%"
          :disabled="disabled"
        />
      </el-form-item>
      <el-form-item
        label="图片"
        :label-width="formLabelWidth"
        style="font-weight: 600"
        v-if="confirmButton"
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
        <el-button @click="resetStatus(), misShowDialog()">取消</el-button>
        <el-button
          v-if="modifyButton && !confirmButton"
          type="warning"
          @click="modify"
        >
          点击修改
        </el-button>
        <el-button
          v-if="confirmButton"
          type="warning"
          @click="updateCommodityFunc(), misShowDialog(), resetForm()"
        >
          确认修改
        </el-button>
        <el-button
          type="warning"
          v-if="!modifyButton"
          @click="centerDialogVisible = true"
        >
          加入购物车
        </el-button>
        <el-button type="primary" @click="resetStatus(), misShowDialog()">
          确认
        </el-button>
      </div>
      <el-dialog
        v-model="centerDialogVisible"
        title="购买数量"
        width="300"
        center
      >
        <el-input-number v-model="num" :min="1" :max="10" size="large" />
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="addItemFunc">
              确认
            </el-button>
          </div>
        </template>
      </el-dialog>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, ref, defineProps, defineEmits } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { useRoute } from "vue-router";
import {
  Search,
  ArrowRight,
  Delete,
  Plus,
  ZoomIn,
} from "@element-plus/icons-vue";
import { updateCommodity, updateCommodityWithoutPic, addItem } from "../../api/index";
import { useUserStore } from "../../store/user";

const props = defineProps({
  dialogVisible: {
    type: Boolean,
  },
  info: {
    type: Object,
  },
});

const centerDialogVisible = ref(false);
const num = ref(1);

const userStore = useUserStore()
const addItemFunc = async () => {
  const addItemData = {
    commodityId: form.id,
    userId: userStore.id,
    num: num.value
  }
  
  const result = await addItem(addItemData)
  if (result?.status === 401) {
    ElMessage.warning(result.message)
  } else {
    ElMessage.success(result)
  }
  misShowDialog()
  centerDialogVisible.value = false
}

const formLabelWidth = "100px";

const emit = defineEmits(["misShowDialog", "updateList"]);
const misShowDialog = () => {
  emit("misShowDialog", false);
};

const route = useRoute();
const modifyButton = route?.meta?.data?.inUser;
const disabled = ref(true);
const confirmButton = ref(false);

const modify = () => {
  disabled.value = false;
  confirmButton.value = true;
};

const resetStatus = () => {
  disabled.value = true;
  confirmButton.value = false;
};

const file = ref(props.info.fileList);
const form = reactive({
  id: props.info.id,
  name: props.info.name || "",
  introduce: props.info.introduce || "",
  count: props.info.count || 0,
  price: props.info.price || 0,
  category: props.info.category || "",
  fileList: [],
});

const resetForm = () => {
  form.fileList = [];
  hideUpload.value = form.fileList.length > 0;
};

const updateCommodityFunc = async () => {
  if (
    form.name === props.info.name &&
    form.introduce === props.info.introduce &&
    form.fileList.length === 0 &&
    form.category === props.info.category &&
    form.count === props.info.count &&
    form.price === props.info.price
  ) {
    ElMessage.warning("没有改动的内容");
    return;
  }
  let result = "";
  if (form.fileList.length === 0) {
    result = await updateCommodityWithoutPic(form);
  } else {
    result = await updateCommodity(form);
  }
  if (result.status === 401) {
    ElMessage.warning(result.message);
  } else {
    emit("updateList");
    ElMessage.success(result);
  }
  resetStatus();
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
