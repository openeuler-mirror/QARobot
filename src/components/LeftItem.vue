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
          <div class="welcome_notes">{{ welcomeNote }}</div>
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
        <div class="text" v-if="type === 1">
          <div class="header" v-if="header.length != 0 && header.split(' ').join('').length != 0">{{ header }}</div>
          <div class="welcome_question">{{ welcomeTitle }}</div>
          <div class="listBefore" v-for="(item, index) in tableData"
            :key="'infoC' + item">
            <a href="javascript:void(0)" class="itemmsg"
              @click="getMsg(item)">{{ index + 1 }}.{{ item }}</a>
          </div>
        </div>
        <div class="text" v-if="type === 2 || type === 4">
          <div class="header" v-if="header.length != 0 && header.split(' ').join('').length != 0">{{ header }}</div>
          <div v-html="content"></div>
        </div>
        <div class="text" v-if="type === 3">
          <div class="welcome_user">您可能想了解的是:</div>
          <div class="realize_more" v-for="(item, index) in content" :key="'infoC' + item">
            <a href="javascript:void(0)" class="itemmsg"
              @click="getMsg(item)">{{ index + 1 }}.{{ item }}</a>
          </div>
        </div>
        <div class="text" v-if="moreDoc.length != 0 && type === 1 || moreDoc.length != 0 && type === 3">
          <div class="titledivider"></div>
          <div class="welcome_question">更多文档库内容:</div>
          <div class="listBefore" v-for="(item, index) in moreDoc.slice(0, 2)" :key="item.id">
            <div class="docList">
              <div class="docTitle">{{ index + 1 }}.<span v-html="item.title" @click="jump(item.path)"></span></div>
              <div class="docContent" v-html="item.textContent"></div>
            </div>
          </div>
          <div class="listEnd" v-for="(item, index) in moreDoc.slice(2)" :key="item.id">
            <div v-if="showDoc">
              <div class="docList">
                <div class="docTitle">{{ index + 3 }}.<span v-html="item.title" @click="jump(item.path)"></span></div>
                <div class="docContent" v-html="item.textContent"></div>
              </div>
            </div>
          </div>
          <div v-if="moreDoc.length > 5">
            <div class="titledivider"></div>
            <div @click="showDoc = showDoc ? false : true" class="bottomTitle">
              <span class="showMore">{{ showDoc ? "收起" : "查看更多" }}</span>
              <i :class="showDoc ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
            </div>
          </div>
        </div>
        <div class="zan-box" v-if="type != 0 && type != 4">
          <img class="zanitem" src="@/assets/like-unclicked.png" alt="" v-if="!iscommented" @click="comment(1)">
          <img class="zanitem" src="@/assets/like-clicked.png" alt="" v-if="islike && islike === 1">
          <img class="zanitem" src="@/assets/dislike-unclicked.png" alt="" v-if="!iscommented" @click="comment(2)">
          <img class="zanitem" src="@/assets/dislike-clicked.png" alt="" v-if="islike && islike === 2">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LeftItem',
  props: ['type', 'content', 'header', 'moreDoc'],
  data: () => {
    return {
      date: '',
      welcomeTitle: '',
      welcomeNote: '',
      showMsg: false,
      showDoc: false,
      iscommented: false,
      islike: undefined,
      tableData: [],
    };
  },
  created() {
    this.initData();
    this.Time();
  },
  methods: {
    initData() {
      if (this.type === 1) {
        if(this.content.indexOf('{') === -1) {
          this.welcomeTitle = this.content;
        } else {
          this.welcomeTitle = this.content.substring(0, this.content.indexOf('{'));
          this.tableData = this.content.substring(this.content.indexOf('{') + 1, this.content.indexOf('}')).split(';');
        }
      }
      if (this.type === 0) {
        this.welcomeTitle = this.content.substring(0, this.content.indexOf('['));
        this.welcomeNote = this.content.substring(this.content.indexOf('[') + 1, this.content.indexOf(']'));
        this.tableData = this.content
          .substring(this.content.indexOf('{') + 1, this.content.indexOf('}'))
          .split(';');
      }
    },
    getMsg(msg) {
      this.$emit('getMsg', msg);
    },
    comment(type) {
      this.iscommented = true;
      this.islike = type;
      this.$message('反馈成功!')
      if(type === 2) {
        this.$emit('badreq');
      }
    },
    jump(path) {
      if(path.charAt(path.length - 1) === '/') {
        window.open('https://www.openeuler.org/zh/' + path)
      } else {
        window.open('https://www.openeuler.org/zh/' + path + '.html')
      }
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
    position: relative;
    margin-left: 33px;
    margin-top: 10px;
    .zan-box {
      position: absolute;
      display: flex;
      flex-direction: column;
      bottom: 0;
      right: -25px;
      .zanitem{
        width: 25px;
        height: 25px;
        cursor:pointer;
        margin-top: 3px;
      }
    }
    .welcomeMsg {
      padding: 16px;
      opacity: 0.8;
      border-radius: 4px;
      background-color: #e6f7ff;
      .welcome_user {
        margin-top: 8px;
        font-weight: bold;
      }
      .welcome_notes{
        font-size: 16px;
        margin-top: 8px;
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
      .header {
        font-size: 18px;
        margin-top: 10px;
        margin-bottom: 10px;
        font-weight: bold;
      }
      .listBefore {
        margin-top: 10px;
        .docList{
          .docTitle{
            color: #4270E0;
            cursor: pointer;
            &:hover {
              color: #FF0000;
            }
          }
          .docContent{
            margin-top: 10px;
          }
        }
      }
      .listEnd {
        margin-top: 10px;
        .docList{
          .docTitle{
            color: #4270E0;
            cursor: pointer;
            &:hover {
              color: #FF0000;
            }
          }
          .docContent{
            margin-top: 10px;
          }
        }
      }
      .bottomTitle{
        color: #0071c8;
        position: relative;
        cursor: pointer;
        display: flex;
        justify-content: flex-end;
      }
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