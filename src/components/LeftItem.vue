<template>
  <div>
    <div class="time" v-if="zanfeedVis">{{ date }}</div>
    <div class="leftcontainer">
      <div v-if="zanfeedVis" class="headcore">
        <img class="head" src="@/assets/机器人头像.png" />
      </div>
      <div class="content">
        <div class="welcomeMsg" v-if="type === 0">
          <div class="welcome_user">
            尊敬的用户，您好！欢迎使用openEuler小智，很高兴为您服务，请问您遇到什么问题了？
          </div>
        </div>
        <div class="aitext welcomeMsg" v-if="type === 1">
          <div class="welcome_question">
            抱歉，您的提问需要更具体的内容或背景才能得到回答。
          </div>
          <div class="titledivider"></div>
          <div v-html="content"></div>
        </div>
        <div class="text" v-if="type === 2 || type === 4">
          <div
            class="header"
            v-if="header.length != 0 && header.split(' ').join('').length != 0"
          >
            {{ header }}
          </div>
          <div class="answer_content" v-html="content"></div>
        </div>
        <div class="text" v-if="type === 3">
          <div class="welcome_user" v-if="content.length > 0">
            您可能想了解的是:
          </div>
          <div
            class="realize_more"
            v-for="(item, index) in content"
            :key="'infoC' + item.qa_pair_id"
          >
            <a
              href="javascript:void(0)"
              class="itemmsg"
              @click="getMsg(item.st_question)"
              >{{ index + 1 }}.{{ item.st_question }}</a
            >
          </div>
        </div>
        <div
          class="text"
          v-if="
            (moreDoc.length != 0 && type === 1) ||
            (moreDoc.length != 0 && type === 3)
          "
        >
          <div class="titledivider"></div>
          <div class="welcome_question">更多文档库内容:</div>
          <div
            class="listBefore"
            v-for="(item, index) in moreDoc.slice(0, 2)"
            :key="item.id"
          >
            <div class="docList">
              <div class="docTitle">
                {{ index + 1 }}.<span
                  v-html="item.title"
                  @click="jump(item.path)"
                ></span>
              </div>
              <div
                class="docVersion"
                v-if="
                  item.version &&
                  item.version.length !== 0 &&
                  item.version.split(' ').join('').length !== 0
                "
              >
                版本: {{ item.version }}
              </div>
            </div>
          </div>
          <div
            class="listEnd"
            v-for="(item, index) in moreDoc.slice(2)"
            :key="item.id"
          >
            <div v-if="showDoc">
              <div class="docList">
                <div class="docTitle">
                  {{ index + 3 }}.<span
                    v-html="item.title"
                    @click="jump(item.path)"
                  ></span>
                </div>
                <div
                  class="docVersion"
                  v-if="
                    item.version &&
                    item.version.length !== 0 &&
                    item.version.split(' ').join('').length !== 0
                  "
                >
                  版本: {{ item.version }}
                </div>
              </div>
            </div>
          </div>
          <div v-if="moreDoc.length > 5">
            <div class="titledivider"></div>
            <div @click="showDoc = showDoc ? false : true" class="bottomTitle">
              <span class="showMore">{{ showDoc ? "收起" : "查看更多" }}</span>
              <i
                :class="showDoc ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
              ></i>
            </div>
          </div>
        </div>
        <div class="zan-box" v-if="type != 0 && type != 5">
          <img
            class="zanitem"
            src="@/assets/like-unclicked.png"
            alt=""
            v-if="!iscommented"
            @click="comment(1, requestId)"
          />
          <img
            class="zanitem"
            src="@/assets/like-clicked.png"
            alt=""
            v-if="islike && islike === 1"
          />
          <img
            class="zanitem"
            src="@/assets/dislike-unclicked.png"
            alt=""
            v-if="!iscommented"
            @click="comment(-1, requestId)"
          />
          <img
            class="zanitem"
            src="@/assets/dislike-clicked.png"
            alt=""
            v-if="islike && islike === -1"
          />
        </div>
        <div class="zan-feedback" v-if="type === 5 && !isSubmit && zanfeedVis">
          <div
            class="header"
            v-if="header.length != 0 && header.split(' ').join('').length != 0"
          >
            {{ header }}
          </div>
          <el-row class="button-content">
            <el-button
              @click="getCheck(1)"
              size="medium"
              :type="checked === 1 ? 'primary' : ''"
              round
              >答非所问</el-button
            >
            <el-button
              @click="getCheck(2)"
              size="medium"
              :type="checked === 2 ? 'primary' : ''"
              round
              >没有答案</el-button
            >
            <el-button
              @click="getCheck(3)"
              size="medium"
              :type="checked === 3 ? 'primary' : ''"
              round
              >操作后无效</el-button
            >
            <el-button
              @click="getCheck(4)"
              size="medium"
              :type="checked === 4 ? 'primary' : ''"
              round
              >其他-请补充</el-button
            >
          </el-row>
          <el-input
            class="suggest_content"
            type="textarea"
            :rows="7"
            placeholder="请具体描述您的意见"
            v-model="badsuggest"
          >
          </el-input>
          <el-row class="check-button">
            <el-button size="medium" @click="submit(requestId)">提交</el-button>
            <el-button size="medium" @click="cancelsub">取消</el-button>
          </el-row>
        </div>
        <div class="text" v-if="type === 5 && isSubmit && zanfeedVis">
          <el-icon
            style="color: #5cdd5c; margin-right: 4px"
            name="el-icon-success"
          ></el-icon>
          <span>已提交</span>
        </div>
        <div class="aitext" v-if="type === 6" v-loading="aitext === ''">
          <div v-highlight v-if="aitext !== ''" v-html="aitext"></div>
          <div v-else style="height: 35px; width: 25px"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { $emit } from "../utils/gogocodeTransfer";
import { satisfaction } from "@/api/post";
import MarkdownIt from "markdown-it";
import { getRagStreamAnswer } from "@/api/assets";

export default {
  components: {},
  name: "LeftItem",
  props: [
    "type",
    "content",
    "header",
    "moreDoc",
    "moreIssue",
    "question",
    "requestId",
  ],
  emits: ["divMove", "getMsg", "badreq"],
  data: () => {
    return {
      md: "",
      mdText: "",
      zanfeedVis: true, // 判断用户是否点赞完毕
      isSubmit: false, // 判断用户是否反馈完毕
      loading: true,
      aitext: "",
      date: "",
      welcomeTitle: "",
      welcomeNote: "",
      showMsg: false,
      showDoc: false,
      showIssue: false,
      iscommented: false,
      islike: undefined,
      tableData: [],
      badsuggest: "",
      checked: null,
      feedbackTag: "",
    };
  },
  created() {
    this.initData();
    this.Time();
  },
  mounted() {
    this.md = new MarkdownIt({
      linkify: true,
    });
  },
  methods: {
    submit(requestId) {
      switch (this.checked) {
        case 1:
          this.feedbackTag = "答非所问";
          break;
        case 2:
          this.feedbackTag = "没有答案";
          break;
        case 3:
          this.feedbackTag = "操作后无效";
          break;
        case 4:
          this.feedbackTag = "其他-请补充";
          break;
      }
      const params = {
        degree: -1,
        feedback_tag: this.feedbackTag,
        comment: this.badsuggest,
        request_id: requestId,
      };
      satisfaction(params).then((res) => {
        this.$message("反馈成功!");
        this.isSubmit = true;
      });
    },
    cancelsub() {
      this.zanfeedVis = false;
    },
    initData() {
      if (this.type === 1) {
        this.welcomeTitle = this.content[0];
        this.tableData = this.content[0];
      }
      if (this.type === 0) {
        this.welcomeTitle = this.content[0];
        this.welcomeNote = this.content[1];
        this.tableData = this.content[0];
      }
      if (this.type === 6) {
        // 采用知识库来回答
        this.getAnswerByRag();
      }
    },

    // 通过知识库获取回答
    getAnswerByRag() {
      const params = {
        question: this.question,
        kb_sn: "openEuler_5f09ebb1",
      };
      let reg = /\bhttps?:\/\/[\w\/\.-]+(?<![.,。，])/g;

      getRagStreamAnswer(
        params,
        (res) => {
          this.mdText += res.content;
          this.aitext = this.md.render(this.mdText);
          this.$emit("divMove");
        },
        () => {
          this.mdText = this.mdText.replace(reg, (match) => {
            return match + " ";
          });
          this.aitext = this.md.render(this.mdText);
          this.$emit("divMove");
        },
        () => {
          this.aitext = this.md.render("Network error");
          this.$emit("divMove");
        }
      );
    },
    getMsg(msg) {
      $emit(this, "getMsg", msg);
    },
    getCheck(value) {
      this.checked = value;
    },
    // 评论
    comment(type, requestId) {
      const params = {
        degree: type, // 1表示满意，-1表示不满意
        request_id: requestId,
      };
      satisfaction(params).then((res) => {
        this.iscommented = true;
        this.islike = type;
        if (type === 1) {
          this.$message("反馈成功!");
        } else {
          $emit(this, "badreq", requestId);
          this.zanfeedVis = true;
        }
      });
    },
    jump(path) {
      if (path.charAt(path.length - 1) === "/") {
        window.open("https://www.openeuler.org/" + path);
      } else if (path.charAt(0) === "/") {
        window.open("https://forum.openeuler.org" + path);
      } else {
        window.open("https://www.openeuler.org/" + path + ".html");
      }
    },
    jumpIssue(link) {
      window.open(link);
    },
    Time() {
      let hour = new Date().getHours();
      let minute =
        new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes();
      this.date = `${hour}:${minute}`;
    },
  },
};
</script>

<style scoped>
::deep .el-loading-spinner .circular {
  height: 30px !important;
  width: 30px !important;
  animation: loading-rotate 2s linear infinite;
}
</style>

<style lang="scss" scoped>
.time {
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #999999;
  line-height: 22px;
  font-weight: 400;
}
.cursorPointer {
  cursor: pointer;
}
.leftcontainer {
  display: flex;
  padding: 10px 15px;
  margin-right: 60px;

  .headcore {
    margin-left: 15px;
    .head {
      width: 48px;
      height: 48px;
    }
  }

  .content {
    position: relative;
    max-width: 85%;
    margin-left: 25px;
    .zan-box {
      position: absolute;
      display: flex;
      flex-direction: column;
      bottom: 0;
      right: -25px;
      .zanitem {
        width: 25px;
        height: 25px;
        cursor: pointer;
        margin-top: 3px;
      }
    }
    .welcomeMsg {
      padding: 12px;
      opacity: 0.8;
      border-radius: 4px;
      background: #f7f8fa;
      border: 1px solid rgba(229, 232, 240, 1);
      .welcome_user {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #000000;
        line-height: 22px;
        font-weight: 400;
      }
      .welcome_notes {
        font-size: 16px;
      }
      .welcome_question {
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
    .welcomeMsg::before {
      content: "";
      position: absolute;
      top: 16px;
      left: -7px;
      width: 15px;
      height: 15px;
      background: #f7f8fa;
      border-bottom: 1px solid rgb(229, 232, 240);
      border-left: 1px solid rgb(229, 232, 240);
      transform: rotate(45deg);
    }
    .text {
      opacity: 0.8;
      border-radius: 4px;
      background: #f7f8fa;
      border: 1px solid rgba(229, 232, 240, 1);
      padding: 12px;
      font-size: 16px;
      line-height: 1.7;
      font-family: Microsoft YaHei UI;
      font-weight: 400;
      color: #000000;
      word-wrap: break-word;
      word-break: break-all;
      overflow: hidden;
      .header {
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #000000;
        line-height: 24px;
        margin-bottom: 10px;
        font-weight: 600;
      }
      .answer_content {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #000000;
        text-align: justify;
        line-height: 22px;
        font-weight: 400;
      }
      .listBefore {
        margin-top: 10px;
        .docList {
          .docTitle {
            color: #4270e0;
            cursor: pointer;
            &:hover {
              color: #ff0000;
            }
          }
          .docVersion {
            margin-top: 10px;
            font-size: 14px;
          }
          .docContent {
            margin-top: 10px;
          }
        }
      }
      .listEnd {
        margin-top: 10px;
        .docList {
          .docTitle {
            color: #4270e0;
            cursor: pointer;
            &:hover {
              color: #ff0000;
            }
          }
          .docVersion {
            margin-top: 10px;
            font-size: 14px;
          }
          .docContent {
            margin-top: 10px;
          }
        }
      }
      .bottomTitle {
        color: #0071c8;
        position: relative;
        cursor: pointer;
        display: flex;
        justify-content: flex-end;
      }
      .welcome_user {
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
      .realize_more {
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
    .text::before {
      content: "";
      position: absolute;
      top: 16px;
      left: -7px;
      width: 15px;
      height: 15px;
      background: #f7f8fa;
      border-bottom: 1px solid rgb(229, 232, 240);
      border-left: 1px solid rgb(229, 232, 240);
      transform: rotate(45deg);
    }
    .aitext {
      line-height: 2;
      opacity: 0.8;
      border-radius: 4px;
      background-color: #e6f7ff;
      padding: 7px 16px;
      font-size: 16px;
      font-family: Microsoft YaHei UI;
      font-weight: 400;
      color: #000000;
      word-wrap: break-word;
    }
    .zan-feedback {
      width: 500px;
      opacity: 0.8;
      border-radius: 4px;
      background-color: #e6f7ff;
      padding: 7px 16px;
      font-size: 16px;
      font-family: Microsoft YaHei UI;
      font-weight: 400;
      color: #000000;
      .header {
        font-size: 16px;
        margin-bottom: 10px;
        font-weight: bold;
      }
      .button-content {
        margin: 15px 0 5px 0;
      }
      .suggest_content {
        margin: 10px 0 7px 0;
      }
      .check-button {
        margin: 10px 0 10px 0;
      }
    }
  }
}
</style>
