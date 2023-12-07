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
import { onMounted } from "vue";
import { ElMessageBox } from "element-plus";
import Chat from "./components/Chat.vue";
import AppFooter from "./components/AppFooter.vue";
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
