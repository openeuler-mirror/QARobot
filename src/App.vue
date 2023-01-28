<template>
  <div id="app">
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
