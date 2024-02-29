<template>
  <el-dialog
    v-model="props.dialogVisible"
    title="具体内容"
    width="500"
    @close="misShowDialog"
  >
    <el-form :model="props.info">
      <el-form-item
        label="名称"
        :label-width="formLabelWidth"
        style="font-weight: 600"
      >
        <el-input v-model="props.info.name" autocomplete="off" style="width: 75%" disabled/>
      </el-form-item>
      <el-form-item
        label="具体介绍"
        :label-width="formLabelWidth"
        style="font-weight: 600"
      >
        <el-input
          v-model="props.info.introduce"
          :rows="3"
          type="textarea"
          placeholder="请输入"
          style="width: 75%"
          disabled
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="misShowDialog">取消</el-button>
        <el-button type="primary" @click="misShowDialog">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, ref, defineProps, defineEmits } from "vue";
import { ElMessageBox } from 'element-plus'

const props = defineProps({
  dialogVisible: {
    type: Boolean
  },
  info: {
    type: Object
  }
});

const formLabelWidth = "100px";


const emit = defineEmits(["misShowDialog"]);
const misShowDialog = () => {
  emit("misShowDialog", false);
}
</script>
