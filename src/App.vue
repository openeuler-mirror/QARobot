<template>
  <div id="app">
    <!-- <img style="width: 230px;position: fixed;" src="@/assets/chatbot.gif" v-draggable /> -->
    <Chat />
  </div>
</template>

<script>
import Chat from './components/Chat.vue';

export default {
  name: 'App',
  components: {
    Chat,
  },
};
</script>

<style scoped>
</style>
