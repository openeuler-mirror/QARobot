<template>
  <div class="app-content"><slot></slot></div>
</template>

<script>
export default {
  name: 'appContent',
  props: {
    pcTop: {
      type: Number,
      default: 64,
    },
    mobileTop: {
      type: Number,
      default: 40,
    },
  },
  data: () => {
    return {}
  },
  computed: {
    mobilePaddingTop() {
      return this.mobileTop + 'px'
    },
    pcPaddingTop() {
      return this.pcTop + 'px'
    },
  },
  created() {},
  methods: {},
}
</script>

<style lang="scss" scoped>
.app-content {
  padding-top: v-bind('pcPaddingTop');
  padding-bottom: 64px;
  padding-left: 44px;
  padding-right: 44px;
  max-width: 1504px;
  margin: 0 auto;
  @media (max-width: 1439px) {
    padding-left: 24px;
    padding-right: 24px;
  }
  @media (max-width: 1100px) {
    padding-left: 16px;
    padding-right: 16px;
    padding-top: v-bind('mobilePaddingTop');
    padding-bottom: 40px;
  }
}
</style>
