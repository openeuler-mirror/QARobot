<template>
  <div>
    <div class="timearea">
      <span class="righttiem">{{ date }}</span>
    </div>
    <div class="rightcontainer">
      <img class="head" src="@/assets/用户头像.png" />
      <div class="content">
        <div class="text" v-if="type === 1">
          {{ content }}
        </div>
        <img class="img" :src="content" v-else-if="type === 2" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RightItem',
  props: ['id', 'type', 'content'],
  data: () => {
    return {
      date: '',
    };
  },
  created() {
    this.Time();
  },
  methods: {
    getMsg(msg) {
      this.$emit('getMsg', msg);
    },
    Time() {
      let hour = new Date().getHours();
      let minute =
        new Date().getMinutes() < 10
          ? '0' + new Date().getMinutes()
          : new Date().getMinutes();
      this.date = `${hour}:${minute}`;
    },
  },
};
</script>

<style scoped lang="scss">
.timearea {
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  .righttiem {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #999999;
    line-height: 22px;
    font-weight: 400;
  }
}
.rightcontainer {
  display: flex;
  padding: 10px 15px;
  margin-left: 60px;
  flex-direction: row-reverse;

  .head {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 1px solid #eee;
  }

  .content {
    position: relative;
    max-width: 85%;
    margin-right: 25px;

    .text {
      background: #F7F8FA;
      border: 1px solid rgba(229,232,240,1);
      word-break: break-all;
      border-radius: 4px;
      padding: 12px;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      font-weight: 400;
      color: #000000;
      line-height: 22px;
      opacity: 1;
    }
    .text::after {
      content: "";
      position: absolute;
      top: 17px;
      right: -7px;
      width: 15px;
      height: 15px;
      background: #F7F8FA;
      border-top: 1px solid rgb(229, 232, 240);
      border-right: 1px solid rgb(229, 232, 240);
      transform: rotate(45deg);
    }

    .img {
      width: 100px;
      border-bottom-right-radius: 10px;
      border-top-right-radius: 10px;
      border-bottom-left-radius: 10px;
    }
  }
}
</style>