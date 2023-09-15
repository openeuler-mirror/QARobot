<template>
  <div class="appclass">
    <div class="maincontainer">
      <div class="appheader">
        <img src="@/assets/机器人形象.png" alt="" class="headerSrc" />
        <span class="title">欢迎使用openEuler小智</span>
      </div>
      <div class="container" id="container" ref="container">
        <div class="list" id="list" ref="list">
          <ul>
            <li v-for="(item, index) in msglist" :key="index">
              <RightItem
                :type="item.type"
                :content="item.content"
                v-if="item.me"
              ></RightItem>
              <LeftItem
                :question="question"
                :type="item.type"
                :header="item.header"
                :content="item.content"
                :moreDoc="item.moreDoc"
                :moreIssue="item.moreIssue"
                :requestId="item.requestId"
                @badreq="badreq"
                @getMsg="getMsg"
                @chatover="chatover"
                @divMove="divMove"
                v-else
              >
              </LeftItem>
            </li>
          </ul>
        </div>
      </div>
      <div class="bottom">
        <ul id="list" class="poplist">
          <li
            class="popitem"
            v-for="(item, i) in msgData"
            :key="i"
            :class="[currentIndex === i ? 'active' : '']"
            v-html="item"
            @click="popClick(item, i)"
          ></li>
        </ul>
        <div class="input-send">
          <van-field
            :border="false"
            type="textarea"
            v-model="text"
            placeholder="请输入您要咨询的内容，小智会快速回复哒~"
            class="input"
            @input="searchData"
            @keydown="listen($event)"
          />
          <div class="bottomBtn">
            <el-button class="send" :class="[!isDisabled ? 'active' : '']" @click="send" :disabled="isDisabled"
              >发送</el-button
            >
          </div>
        </div>
      </div>
    </div>
    <div class="aside">
      <div class="aside_header">常用工具</div>
      <div class="aside_content">
        <div
          class="aside_item"
          v-for="item in asideOrders"
          :key="item.title"
          @click="getTool(item)"
        >
          <a>
            <div
              class="aside_item_content"
              style="display: flex; align-item: center; justify-content: center"
            >
              <img :src="item.src" />
            </div>
            <div class="aside_item_title">{{ item.title }}</div>
          </a>
        </div>
      </div>
      <div class="aside_footer">
        <div class="footer_title">热点追踪</div>
        <div class="footer_content">
          <ul>
            <li class="itemmsg" v-for="item in hootList" :key="item.title">
              <span @click="gethot(item.src)">{{ item.title }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="aside_footer">
        <div class="footer_title">友情链接</div>
        <div
          class="footer_content"
          style="cursor: pointer"
          @click="
            gethot(
              'https://hiss.shixizhi.huawei.com/portal/1643780836745113602?sxz-lang=zh_CN&pageId=1643780840505217026'
            )
          "
        >
          <img class="footer_content_img" src="@/assets/HISS.png" />
          <div class="footer_content_word">基础软件服务能力平台</div>
        </div>
      </div>
      <div class="aside_search">
        <div class="footer_title">最近搜索</div>
        <div class="footer_content">
          <ul>
            <li
              class="itemmsg"
              v-for="(record, index) in records"
              :key="index"
              @click="fillKeyword(record)"
            >
              <span>{{ formatText(record) }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <el-dialog
      title="意见反馈"
      v-model="dialogVisible"
      center
      width="40%"
      @close="dialogClose"
    >
      <div style="font-size: 16px; margin-bottom: 15px">你给小智打几分？</div>
      <el-rate v-model="rate" show-text style="margin-bottom: 15px">
      </el-rate>
      <el-input
        type="textarea"
        :rows="7"
        placeholder="请具体描述您的意见，小智会不断学习的，你也可以点击右侧的邮件列表链接，找到对应sig组反馈问题。"
        v-model="textarea"
      >
      </el-input>
      <div style="display: flex;align-items: center;margin-top: 20px;">
        <span style="width: 100px;font-size: 15px;">联系邮箱: </span>
        <el-input v-model="email" placeholder="请输入邮箱地址"></el-input>
      </div>
      <template v-slot:footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="feedback">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import defaultSettings from '@/config/defaultSettings.js'
import { asideOrders, hootList, domainIds } from '@/config/asideData.js'
import {
  getChatSuggestions,
  getMoreIssues,
  userFeedback,
  getQabotChat,
  getMoreDoc,
} from '@/api/post'
import LeftItem from '@/components/LeftItem'
import RightItem from '@/components/RightItem'

export default {
  name: 'Chat',
  components: { LeftItem, RightItem },
  data: () => {
    return {
      email: '',
      currentIndex: -1,
      records: [],
      question: '',
      header: '',
      doneFlag: true,
      msgData: [],
      text: '',
      msg: '',
      msgType: '',
      msglist: [],
      moreDoc: [],
      moreIssue: [],
      rate: 0,
      hootList: hootList,
      asideOrders: asideOrders,
      dialogVisible: false,
      textarea: '',
      sessionId: '',
      requestId: '',
      docTextType: 0,
      domainIds: domainIds,
    }
  },
  updated() {
    //  dom 元素更新后执行滚动条到底部 否则不生效
    this.scrollToBottom()
  },
  computed: {
    isDisabled() {
      return (
        this.text.length === 0 || this.text.split(' ').join('').length === 0
      )
    },
  },
  created() {
    this.msglist.push({
      header: this.header,
      type: 0,
      content: '',
      moreDoc: this.moreDoc,
      moreIssue: this.moreIssue,
      me: false,
      requestId: this.requestId,
    })
  },
  mounted() {
    this.initData('')
    // 从本地存储中读取搜索记录
    this.records = JSON.parse(localStorage.getItem('records')) || []
  },
  methods: {
    getTool(data) {
      if (data.type === 'RPC') {
        this.dialogVisible = true
      } else {
        window.open(data.path)
      }
    },
    fillKeyword(keyword) {
      this.text = keyword
    },
    // eventStream动态输出回答时实时监听滚动条底部距离并调用拖动方法
    divMove() {
      this.scrollToBottom()
    },
    scrollToBottom() {
      // 滚动条拖动最底部方法
      // this.$nextTick 将回调延迟到下次DOM更新循环之后执行。在修改数据之后立即使用它，然后等待DOM更新
      this.$nextTick(() => {
        // dom 元素更新后执行滚动条到底部 否则不生效
        let scrollElem = this.$refs.container
        // console.log('scrollHeight: ', scrollElem.scrollHeight);
        // scrollElem.scrollTop = scrollElem.scrollHeight
        scrollElem.scrollTo({
          top: scrollElem.scrollHeight,
          behavior: 'smooth',
        })
      })
    },
    formatText(str) {
      if (str.length > 20) {
        return str.slice(0, 20) + '...'
      } else {
        return str
      }
    },
    handleDraggable(config) {
      if (config.dragging) {
        this.style = {
          left: `${config.x}px`,
          top: `${config.y}px`,
          width: `${config.rect.width}px`,
          height: `${config.rect.height}px`,
        }
      }
    },
    gethot(path) {
      window.open(path)
    },
    feedback() {
      const datas = {
        session_id: this.sessionId,
        feedback: this.rate,
        comment: this.textarea + '【邮箱: ' + this.email + '】',
      }
      userFeedback(datas).then((res) => {
        if (res.feedback_id) {
          this.$message.info('反馈成功!')
          this.dialogVisible = false
        }
      })
    },
    dialogClose() {
      this.email = ''
      this.textarea = ''
      this.rate = 0
    },
    listen(event) {
      this.text = this.text.replace(/[\r\n]/g, '')
      if (!this.text) {
        if (event.keyCode === 13) {
          event.preventDefault()
          return false
        }
      }
      if (event.keyCode === 13) {
        event.preventDefault() // 阻止浏览器默认换行操作
        if (this.currentIndex !== -1) {
          this.text = this.msgData[this.currentIndex]
        }
        this.send()
      }
      if (event.keyCode === 40) {
        if (this.msgData.length !== 0) {
          if (this.currentIndex === this.msgData.length - 1) {
            this.currentIndex = 0
          } else {
            this.currentIndex++
          }
          this.text = this.msgData[this.currentIndex]
        } else {
          return
        }
      }
      if (event.keyCode === 38) {
        if (this.msgData.length !== 0) {
          if (this.currentIndex === -1 || this.currentIndex === 0) {
            this.currentIndex = this.msgData.length - 1
          } else {
            this.currentIndex--
          }
          this.text = this.msgData[this.currentIndex]
        } else {
          return
        }
      }
    },
    chatover() {
      if (this.msgType === 4 || this.msgType === 2) {
        return
      } else {
        this.itempush()
      }
    },
    send(type) {
      this.msgData = []
      this.text = this.text.replace(/[\r\n]/g, '')
      if (
        this.text.length === 0 ||
        this.text.split(' ').join('').length === 0
      ) {
        return
      } else {
        // 搜索的同时处理搜索项到本地存储
        let records = JSON.parse(localStorage.getItem('records')) || []
        // 添加数据并去重
        let record = this.text.trim()
        if (!records.includes(record)) {
          records.unshift(record)
        }
        localStorage.setItem('records', JSON.stringify(records.slice(0, 3)))
        // 从本地存储中读取搜索记录
        this.records = JSON.parse(localStorage.getItem('records')) || []
        this.msglist.push({
          type: 1,
          content: this.text,
          me: true,
        })
        const params = {
          extend: {
            domain_ids: this.domainIds,
          },
          query_types: [0], // 暂时只用到知识库问答
          question: this.text,
        }
        this.getChat(params, type)
        this.question = this.text
        this.text = ''
        this.currentIndex = -1 // 重置currentIndex
      }
    },
    getChat(params, type) {
      getMoreDoc(params.question).then((res) => {
        if (res.status === 200 && res.obj) {
          this.moreDoc = []
          res.obj.records.forEach((item) => {
            item.title = item.title.replaceAll(
              '<span>',
              '<span style="color:#AD0D00">'
            )
            this.moreDoc.push(item)
          })
        } else {
          this.moreDoc = []
        }
      })
      getMoreIssues(params.question).then((res) => {
        console.log(res)
        if (res.data) {
          this.moreIssue = []
          res.data.forEach((item) => {
            const colorStyle = '<span style="color:#AD0D00">'
            if (item.title.indexOf(params.question) !== -1) {
              const startPos = item.title.indexOf(params.question)
              const endPos = startPos + params.question.length
              const highlightedStr =
                item.title.slice(0, startPos) +
                colorStyle +
                item.title.slice(startPos, endPos) +
                '</span>' +
                item.title.slice(endPos)
              item.title = highlightedStr
            }
            this.moreIssue.push(item)
          })
        } else {
          this.moreIssue = []
        }
      })
      getQabotChat(params).then((res) => {
        if (res) {
          this.requestId = res.request_id
          this.sessionId = res.session_id
          this.header = ''
          if (res.reply_type == 0 && res.qabot_answers.answers.length > 0) {
            if (type == '2') {
              this.msgType = 2
            } else {
              this.msgType = 4 // 小智查找到问题相关信息所返回的数据类型
            }
            this.header = res.qabot_answers.answers[0].st_question
            this.msg = res.qabot_answers.answers[0].answer
          } else if (
            res.reply_type == 0 &&
            res.qabot_answers.recommend_answers.length > 0
          ) {
            this.msgType = 3 // 小智推荐的问题
            this.msg = res.qabot_answers.recommend_answers
            this.docTextType = 0
          } else if (res.reply_type == 2) {
            this.msgType = 2
            this.msg = res.chat_answers.answer
          }
          // 小智得数据状态
          if (this.msgType === 0 || this.msgType === 4) {
            this.itempush()
          } else {
            this.msglist.push({
              header: this.header,
              type: 6,
              content: '',
              moreDoc: this.moreDoc,
              moreIssue: this.moreIssue,
              me: false,
              requestId: this.requestId,
            })
          }
        }
      })
    },
    popClick(msg, i) {
      this.currentIndex = i
      this.text = msg
      this.send()
    },
    searchData(event) {
      this.msgData = []
      if (this.text) {
        const params = {
          question: this.text,
          top: 5,
          extend: {
            domain_ids: this.domainIds,
          },
        }
        getChatSuggestions(params).then((res) => {
          this.msgData = []
          if (res.questions) {
            res.questions.forEach((item) => {
              if (this.text) {
                this.msgData.push(item)
              }
            })
          }
        })
      }
    },
    itempush() {
      this.msglist.push({
        header: this.header,
        type: this.msgType,
        content: this.msg,
        moreDoc: this.moreDoc,
        moreIssue: this.moreIssue,
        me: false,
        requestId: this.requestId,
      })
    },
    initData(text) {
      if (this.doneFlag) {
        this.doneFlag = false
        setTimeout(() => {
          this.doneFlag = true
        }, defaultSettings.DefaultRequestInterval)
      } else {
        this.$message('您的操作过于频繁,请稍后再试')
        return
      }
    },
    getMsg(msg) {
      this.text = msg
      this.send('2')
    },
    badreq(requestIds) {
      this.msglist.push({
        header: '可以告诉我您不满意的原因吗?',
        type: 5,
        content: '',
        moreDoc: [],
        moreIssue: [],
        me: false,
        requestId: requestIds,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.appclass {
  display: flex;
  .maincontainer {
    width: 1420px;
    height: 830px;
    background: #ffffff;
    box-shadow: 0px 0px 14px rgba(51, 51, 51, 0.16);
    opacity: 1;
    border-radius: 0px;
    margin: 50px auto 24px;
    margin-right: 20px;
    .appheader {
      width: 1420px;
      height: 80px;
      background: #e5e8f0;
      opacity: 1;
      // display: fixed;
      vertical-align: middle;
      .headerSrc {
        position: relative;
        width: 88px;
        height: 113px;
        margin: -42px 19px 8px 40px;
        display: inline-block;
        vertical-align: middle;
      }
      .title {
        font-family: PingFangSC-Medium;
        font-size: 18px;
        color: #000000;
        line-height: 26px;
        font-weight: 500;
        vertical-align: middle;
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
        margin: -17px 0 -25px 0;
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
          &.active {
            background: #e5e8f0;
          }
        }
        .popitem:hover {
          background: #e5e8f0;
        }
      }
      .input-send {
        .input {
          .van-field__control {
            min-height: 88px !important;
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
            left: 1260px;
            width: 136px;
            height: 48px;
            border: 0;
            background: #d7d7d7;
            border-radius: 4px;
            font-family: PingFangSC-Regular;
            font-size: 18px;
            color: #ffffff;
            text-align: center;
            line-height: 24px;
            font-weight: 400;
            &.active {
              background: #002fa7;
            }
          }
        }
      }
    }
  }
  .aside {
    position: relative;
    width: 300px;
    height: 830px;
    background: #ffffff;
    box-shadow: 0px 0px 14px rgba(51, 51, 51, 0.16);
    opacity: 1;
    border-radius: 0px;
    margin: 50px auto 24px;
    margin-left: 20px;
    .aside_header {
      width: 80px;
      font-weight: 600;
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #000000;
      line-height: 24px;
      text-align: center;
      margin: 40px 25px 16px 21px;
      display: inline-block;
    }
    .aside_content {
      width: 270px;
      display: flex;
      flex-wrap: wrap;
      margin: 0 15px 0;
      .aside_item {
        flex: 0 0 33.3%;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 16px;
        margin-bottom: 16px;
        a {
          background: 0 0;
          text-decoration: none;
          outline: 0;
          cursor: pointer;
          transition: color 0.2s ease;
          .aside_item_content {
            display: flex;
            justify-content: center;
            margin-bottom: 15px;
            img {
              width: 30px;
              height: 30px;
            }
          }
          .aside_item_title {
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #000000;
            letter-spacing: 0;
            text-align: center;
            line-height: 18px;
            font-weight: 400;
          }
        }
      }
    }
    .aside_footer {
      margin: 40px 25px 16px 30px;
      .footer_title {
        font-weight: 600;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #000000;
        line-height: 24px;
        text-align: center;
        display: inline-block;
        margin-bottom: 10px;
      }
      .footer_content_img {
        margin: 16px 156px 6px 27px;
      }
      .footer_content_word {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #000000;
        line-height: 18px;
        font-weight: 400;
      }
      .footer_content {
        .itemmsg {
          color: #000000;
          margin-top: 10px;
          font-size: 12px;
          font-weight: 400;
          line-height: 18px;
          margin: 15px auto 15px;
          cursor: pointer;
          font-family: PingFangSC-Regular;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
    .aside_search {
      margin: 24px 25px 16px 30px;
      position: absolute;
      bottom: 0; /* 将页脚div定位在父级div底部 */
      height: 193px; /* 页脚div高度 */
      .footer_title {
        font-weight: 600;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #000000;
        line-height: 24px;
        text-align: center;
        display: inline-block;
        margin-bottom: 10px;
      }
      .footer_content {
        .itemmsg {
          color: #000000;
          margin-top: 10px;
          font-size: 12px;
          font-weight: 400;
          line-height: 18px;
          margin: 15px auto 15px;
          cursor: pointer;
          font-family: Microsoft Yahei, Open Sans, Helvetica, Tahoma, Arial,
            Hiragino Sans GB, WenQuanYi Micro Hei, sans-serif;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>
