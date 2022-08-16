<template>
  <div>
    <div class="timearea">
      <span class="righttiem">{{ date }}</span>
    </div>
    <div class="rightcontainer">
      <img class="head" src="@/assets/头像.png" />
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
    font-size: 14px;
    font-family: Microsoft YaHei UI;
    font-weight: 400;
    color: #333333;
  }
}
.rightcontainer {
  display: flex;
  padding: 10px 15px;
  margin-left: 60px;
  flex-direction: row-reverse;

  .head {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 1px solid #eee;
  }

  .content {
    margin-right: 28px;
    margin-top: 10px;

    .text {
      background: #eeeeee;
      word-break: break-all;
      border-radius: 4px;
      padding: 7px 16px;
      font-family: Microsoft YaHei UI;
      font-weight: 400;
      color: #000000;
      opacity: 1;
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