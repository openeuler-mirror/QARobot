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
import { onBeforeUnmount } from "vue";
import Chat from "./components/Chat.vue";
import AppFooter from "./components/AppFooter.vue";
import { getChatSession } from "./api/assets";
import { ElMessage } from "element-plus";

getChatSession()
  .then((res) => {
    if (res.data) {
      localStorage.setItem("chatSession", res.data);
    }
  })
  .catch((err) => {
    ElMessage.error(err);
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
