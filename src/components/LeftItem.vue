<template>
  <div>
    <div class="timearea">
      <span class="lefttime">{{ date }}</span>
    </div>
    <div class="leftcontainer">
      <img class="head" src="@/assets/sevice.png" />
      <div class="content">
        <div class="welcomeMsg" v-if="type === 0">
          <div class="welcome_user">{{ welcomeTitle }}</div>
          <div class="titledivider"></div>
          <div class="welcome_question">我猜您想问的问题是:</div>
          <div class="listBefore" v-for="(item, index) in tableData.slice(0, 5)"
            :key="'infoA' + item">
            <a href="javascript:void(0)" class="itemmsg"
              @click="getMsg(item)">{{ index + 1 }}.{{ item }}</a>
          </div>
          <div class="listEnd" v-for="(item, index) in tableData.slice(5)" :key="'infoB' + item">
            <a href="javascript:void(0)" class="itemmsg" v-if="showMsg"
              @click="getMsg(item)">{{ index + 6 }}.{{ item }}</a>
          </div>
          <div v-if="tableData.length > 5">
            <div class="titledivider"></div>
            <div @click="showMsg = showMsg ? false : true" class="bottomTitle">
              <span class="showMore">{{ showMsg ? "收起" : "查看更多" }}</span>
              <i :class="showMsg ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
            </div>
          </div>
        </div>
        <div class="text" v-html="content" v-if="type === 1 || type === 2"></div>
        <div class="text" v-if="type === 3">
          <div class="welcome_user">您可能想了解的是:</div>
          <div class="titledivider"></div>
          <div class="realize_more" v-for="(item, index) in content" :key="'infoC' + item">
            <a href="javascript:void(0)" class="itemmsg"
              @click="getMsg(item)">{{ index + 1 }}.{{ item }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LeftItem',
  props: ['type', 'content'],
  data: () => {
    return {
      date: '',
      welcomeTitle: '',
      showMsg: false,
      tableData: [],
    };
  },
  created() {
    console.log(this.content)
    this.initData();
    this.Time();
  },
  methods: {
    initData() {
      this.welcomeTitle = this.content.substring(0, this.content.indexOf('{'));
      this.tableData = this.content
        .substring(this.content.indexOf('{') + 1, this.content.indexOf('}'))
        .split(';');
    },
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
  .lefttime {
    font-size: 14px;
    font-family: Microsoft YaHei UI;
    font-weight: 400;
    color: #333333;
  }
}
.leftcontainer {
  display: flex;
  padding: 10px 15px;
  margin-right: 60px;

  .head {
    width: 60px;
    height: 60px;
  }

  .content {
    margin-left: 33px;
    margin-top: 10px;
    .welcomeMsg {
      padding: 16px;
      opacity: 0.8;
      border-radius: 4px;
      background-color: #e6f7ff;
      .welcome_user {
        margin-top: 8px;
        font-weight: bold;
      }
      .welcome_question{
        margin-top: 8px;
        font-size: 15px;
      }
      .titledivider {
        width: 99%;
        height: 1px;
        background-color: #acacac;
        opacity: 1;
        border-radius: 1px;
        margin: 16px 0 16px;
      }
      .listBefore {
        margin-top: 10px;
      }
      .listEnd {
        margin-top: 10px;
      }
      .bottomTitle {
        color: #0071c8;
        position: relative;
        cursor: pointer;
        display: flex;
        justify-content: flex-end;
        .showMore {
          margin-top: -3px;
          margin-right: 5px;
        }
      }
      .itemmsg {
        color: #0064c8;
        margin-top: 10px;
        &:hover {
          text-decoration: underline;
        }
      }
    }
    .text {
      opacity: 0.8;
      border-radius: 4px;
      background-color: #e6f7ff;
      padding: 7px 16px;
      font-size: 16px;
      font-family: Microsoft YaHei UI;
      font-weight: 400;
      color: #000000;
      .welcome_user {
        margin-top: 8px;
        font-weight: bold;
      }
      .titledivider {
        width: 99%;
        height: 1px;
        background-color: #acacac;
        opacity: 1;
        border-radius: 1px;
        margin: 16px 0 16px;
      }
      .realize_more{
        margin-top: 10px;
        .itemmsg {
          color: #0064c8;
          margin-top: 10px;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>