<template>
  <div class="appclass">
    <div class="maincontainer">
      <div class="appheader">
        <img src="@/assets/Euler.png" alt="" class="headerSrc" />
        <span class="title">欢迎使用欧拉小智</span>
      </div>
      <div class="container" id="container">
        <div class="list" id="list" ref="list">
          <ul>
            <li v-for="(item, index) in msglist" :key="index">
              <RightItem :type="item.type" :content="item.content" v-if="item.me"></RightItem>
              <LeftItem :type="item.type" :header="item.header" :content="item.content" :moreDoc="item.moreDoc" @badreq="badreq" @getMsg="getMsg" v-else>
              </LeftItem>
            </li>
          </ul>
        </div>
      </div>
      <div class="bottom">
        <ul id="list" class="poplist">
          <li class="popitem" v-for="(item, index) in msgData" :key="index" v-html="item"
            @click="popClick(item)"></li>
        </ul>
        <div class="input-send">
          <van-field :border="false" type="textarea" v-model="text"
            placeholder="请输入您要咨询的内容，小智会快速回复哒~" class="input" @input="searchData"
            @keydown.native="listen($event)" />
          <div class="bottomBtn">
            <el-button class="send" @click="send" :disabled="isDisabled">发送</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import defaultSettings from '@/config/defaultSettings.js';
import { getAnswer, getSuggestions, getMoreDoc } from '@/api/post';
import LeftItem from '@/components/LeftItem';
import RightItem from '@/components/RightItem';

export default {
  name: 'Chat',
  components: { LeftItem, RightItem },
  data: () => {
    return {
      header: '',
      doneFlag: true,
      msgData: [],
      text: '',
      msg: '',
      msgType: '',
      msglist: [],
      moreDoc: []
    };
  },
  updated() {
    this.$nextTick(() => {
      const div = document.getElementById('container');
      div.scrollTop = div.scrollHeight;
    })
  },
  computed: {
    isDisabled() {
      return (
        this.text.length === 0 || this.text.split(' ').join('').length === 0
      );
    },
  },
  created() {
  },
  mounted() {
    this.initData('welcome_tag');
  },
  methods: {
    listen(event) {
      this.text = this.text.replace(/[\r\n]/g, '');
      if (!this.text) {
        if (event.keyCode === 13) {
          event.preventDefault();
          return false;
        }
      }
      if (event.keyCode === 13) {
        event.preventDefault(); // 阻止浏览器默认换行操作
        this.send();
      }
    },
    send() {
      this.msgData = [];
      this.text = this.text.replace(/[\r\n]/g, '');
      if (
        this.text.length === 0 ||
        this.text.split(' ').join('').length === 0
      ) {
        return;
      } else {
        this.msglist.push({
          type: 1,
          content: this.text,
          me: true,
        });
        this.initData(this.text);
        this.text = '';
      }
    },
    popClick(msg) {
      msg = msg
        .replaceAll('<span style=\'color:#0C7DD4\'>', '')
        .replaceAll('</span>', '');
      this.text = msg;
      this.send();
      this.msgData = [];
    },
    searchData() {
      this.msgData = [];
      if (this.text) {
        getSuggestions(this.text).then((res) => {
          if (res.data) {
            res.data.forEach((item) => {
              if (this.text) {
                item = item.replaceAll(
                  this.text,
                  `<span style='color:#0C7DD4'>${this.text}</span>`
                );
                this.msgData.push(item);
              }
            });
          }
        });
      }
    },
    initData(text) {
      if (this.doneFlag) {
        this.doneFlag = false;
        setTimeout(() => {
          this.doneFlag = true;
        }, defaultSettings.DefaultRequestInterval);
        getMoreDoc(text).then((res) => {
          if (res.status === 200 && res.obj) {
            this.moreDoc = [];
            res.obj.records.forEach((item) => {
              item.title = item.title.replaceAll(
                '<span>',
                '<span style="color:#AD0D00">'
              );
              this.moreDoc.push(item);
            });
          } else {
            this.moreDoc = [];
          }
        })
        getAnswer(text).then((res) => {
          if (res.data && res.data[0]) {
            this.header = '';
            if (res.data[0].answer_source === 'welcome_tag') {
              this.msgType = 0; // 首次进入小智界面所展示的数据类型
              this.msg = res.data[0].chatScriptContent;
            } else if (res.data[0].answer_source === 'backfill') {
              this.msgType = 1; // 小智未查找到问题相关信息所返回的数据类型
              this.msg = res.data[0].chatScriptContent;
            } else if (
              res.data[0].answer_source === 'faq' &&
              res.data[0].answer
            ) {
              this.msgType = 2; // 小智查找到问题相关信息所返回的数据类型
              this.msg = res.data[0].answer;
              this.header = res.data[0].intent;
            } else {
              this.msgType = 3;
              this.msg = res.data[0].related_ques;
            }
            this.msglist.push({
              header: this.header,
              type: this.msgType,
              content: this.msg,
              moreDoc: this.moreDoc,
              me: false,
            });
          }
        });
      } else {
        this.$message('您的操作过于频繁,请稍后再试');
        return;
      }
    },
    getMsg(msg) {
      this.text = msg;
      this.send();
    },
    badreq() {
      this.msglist.push({
        header: '',
        type: 4,
        content: '<p>小智没有回答您的问题？想要提出使用意见？欢迎点击链接向我们提问&amp;反馈！我们会尽快为您解答：<a href="https://isurvey.huawei.com/survey/#/privacy-page?p=U28753-fErYxf-bEx8Iw" target="_blank" rel="noopener">欧拉小智使用意见</a>&nbsp;</p>',
        moreDoc: [],
        me: false,
      });
    }
  },
};
</script>

<style scoped lang="scss">
.maincontainer {
  width: 889px;
  height: 788px;
  background: #ffffff;
  box-shadow: 0px 0px 14px rgba(51, 51, 51, 0.16);
  opacity: 1;
  border-radius: 0px;
  margin: 88px auto 24px;
  .appheader {
    width: 889px;
    height: 8%;
    background: #afdfff;
    opacity: 1;
    display: fixed;
    vertical-align: middle;
    .headerSrc {
      position: absolute;
      width: 48px;
      height: 48px;
      margin: 8px 803px 8px 38px;
    }
    .title {
      width: 202px;
      height: 31px;
      font-size: 24px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      margin: 15px 581px 16px 106px !important;
      color: #333333;
      position: absolute;
    }
  }
  .container {
    height: 70%;
    overflow: auto;
    &:hover {
      overflow-y: auto;
    }

    &::-webkit-scrollbar {
      width: 6px;
      color: transparent;
    }

    &::-webkit-scrollbar-track {
      margin: -25px 0 -25px 0;
      border-radius: 5px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(136, 153, 152, 0.3);
      border-radius: 5px;
    }

    &::-webkit-scrollbar-button {
      background-color: transparent;
      border-radius: 5px;
    }
    ul {
      padding: 0;
      margin: 0;
    }

    li {
      list-style: none;
    }

    .list {
      width: 100%;
    }
  }
  ::v-deep .bottom {
    position: relative;
    height: 173px;
    border-top: 1px solid #b7b7b7;
    .poplist {
      border: 1px solid #c1c1c1;
      border-radius: 4px;
      margin-left: 19px;
      background: #fbfbfb;
      position: absolute;
      z-index: 1;
      bottom: 100%;
      font-size: 14px;
      font-family: Microsoft YaHei UI;
      font-weight: 400;
      color: #333333;
      .popitem {
        padding: 5px 40px;
        cursor: pointer;
      }
      .popitem:hover {
        background: #e5e8f0;
      }
    }
    .input-send {
      .input {
        height: 129px;
        .van-field__control {
          min-height: 112px !important;
          &:hover {
            overflow-y: auto;
          }

          &::-webkit-scrollbar {
            width: 7px;
            color: transparent;
          }

          &::-webkit-scrollbar-track {
            margin: -25px 0 -25px 0;
            border-radius: 5px;
          }

          &::-webkit-scrollbar-thumb {
            background-color: rgba(136, 153, 152, 0.3);
            border-radius: 5px;
          }

          &::-webkit-scrollbar-button {
            background-color: transparent;
            border-radius: 5px;
          }
        }
      }
      .bottomBtn {
        .send {
          position: relative;
          right: -808px;
          width: 76px;
          height: 36px;
          border: 0;
          background: #eeeeee;
          border-radius: 4px;
        }
      }
    }
  }
}
</style>