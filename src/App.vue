<template>
  <div id="app">
    <div class="main">
      <div class="chat">
        <Chat />
      </div>
      <div class="footer">
        <AppFooter />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted } from "vue";
import Chat from "./components/Chat.vue";
import AppFooter from "./components/AppFooter.vue";
import { ElMessageBox } from "element-plus";

onMounted(() => {
  ElMessageBox.alert(
    `<p>1、目前EulerCopilot-智能问答是Alpha版本，暂未公开发布。EulerCopilot-智能问答具备咨询操作系统基础知识 & shell命令、openEuler关键特性、openEuler领域数据 & 知识、openEuler运维问题解决方案等能力。</p>
    <p>2、本服务仅限于内部测试目的使用，不得用于其他任何目的。请妥善保管您的账户，不得将将账号转借给他人使用，也不得对外披露本服务的URL、IP地址等信息。</p>
    <p>3、在使用过程中，如果有发现问题（包括软件设计、软件功能、不合适的问答对等），欢迎通过<a href="https://huaweicompute.wjx.cn/vm/mbjAkMl.aspx" target="_blank"> 《反馈问卷》</a>反馈您的宝贵意见。</p>
    `,
    `使用前须知:`,
    {
      dangerouslyUseHTMLString: true,
      draggable: true,
      showClose: false,
      confirmButtonText: "确认",
    }
  );
});

onBeforeUnmount(() => {
  localStorage.removeItem("chatSession");
});
</script>

<style scoped>
html,
body {
  height: 100%;
}
#app {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.main {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}
.chat {
  flex: 1;
}
.footer {
  flex: 0;
}
</style>
