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
        <el-input v-model="props.info.name" autocomplete="off" style="width: 75%" :disabled="disabled"/>
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
          :disabled="disabled"
        />
      </el-form-item>
            <el-form-item
        label="价格"
        :label-width="formLabelWidth"
        style="font-weight: 600"
      >
        <el-input v-model="props.info.price" autocomplete="off" style="width: 75%" :disabled="disabled" type="number"
          step="0.01"/>
      </el-form-item>
      <el-form-item
        label="库存"
        :label-width="formLabelWidth"
        style="font-weight: 600"
      >
        <el-input v-model="props.info.count" autocomplete="off" style="width: 75%" :disabled="disabled" type="number"/>
      </el-form-item>
      <el-form-item
        label="分类"
        :label-width="formLabelWidth"
        style="font-weight: 600"
      >
        <el-input v-model="props.info.category" autocomplete="off" style="width: 75%" :disabled="disabled"/>
      </el-form-item>

    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="misShowDialog">取消</el-button>
        <el-button v-if="modifyButton && !confirmButton" type="warning" @click="modify">
          点击修改
        </el-button>
        <el-button v-if="confirmButton" type="warning">
          确认修改
        </el-button>
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
import { useRoute } from "vue-router";

const route = useRoute()
const modifyButton = route.meta.data.inUser
const disabled = ref(true)
const confirmButton = ref(false)
const modify = () => {
  disabled.value = false
  confirmButton.value = true
}

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
