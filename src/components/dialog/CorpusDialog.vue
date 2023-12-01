<template>
  <el-dialog
    title="语料贡献"
    v-model="visible"
    :before-close="handleClose"
    center
    width="40%"
  >
    <el-form :model="feedbackForm">
      <el-form-item label="问题" :label-width="formLabelWidth">
        <el-input v-model="feedbackForm.question" autocomplete="off" />
      </el-form-item>
      <el-form-item label="回答" :label-width="formLabelWidth">
        <el-input
          v-model="feedbackForm.answer"
          type="textarea"
          :rows="6"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="类别" :label-width="formLabelWidth">
        <el-input v-model="feedbackForm.category" autocomplete="off" />
      </el-form-item>
      <el-form-item label="贡献人" :label-width="formLabelWidth">
        <el-input v-model="feedbackForm.contributor" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfrim"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { watch, defineProps, defineEmits, ref, reactive } from "vue";
import { userFeedback } from "@/api/post";
import { ElMessage } from "element-plus";
const props = defineProps(["visible"]);
const emits = defineEmits(["close"]);

const formLabelWidth = "60px";

const visible = ref(props.visible);

// feedback form
const feedbackForm = reactive({
  question: "",
  answer: "",
  category: "",
  contributor: "",
});

const handleClose = () => {
  emits("close", false);
};

const handleConfrim = async () => {
  const params = {
    session_id: "",
    feedback: 0,
    comment: `【问题】：${feedbackForm.question},【回答】${feedbackForm.answer},【类别】: ${feedbackForm.category}, 【贡献人】: ${feedbackForm.contributor} `,
  };
  const res = await userFeedback(params);
  if (res.feedback_id) {
    ElMessage.success("贡献成功！");
    Object.keys(feedbackForm).forEach((key) => {
      feedbackForm[key] = "";
    });
    handleClose();
  }
};

watch(
  () => props.visible,
  (newVal) => {
    visible.value = newVal;
  }
);
</script>
