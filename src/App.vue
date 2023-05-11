<template>
  <div id="app">
    <!-- <img style="width: 230px;position: fixed;" src="@/assets/chatbot.gif" v-draggable /> -->
    <Chat />
    <AppFooter />
  </div>
</template>

<script>
import Chat from './components/Chat.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  name: 'App',
  components: {
    Chat,
    AppFooter
  },
};
</script>

<style scoped>
</style>
