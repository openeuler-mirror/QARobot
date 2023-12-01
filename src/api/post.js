import axios from "@/axios";
import { ElMessage } from "element-plus";

const UnKonwn_ErrorMsg = "未知错误";
function postRequest(url, data) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        if (err.error_msg) {
          window.$notification?.error({
            content: err.error_msg || UnKonwn_ErrorMsg,
          });
        }
        reject(err);
      });
  });
}
function getRequest(url, data) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}?search=${data}`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log(err);
        if (err.error_msg) {
          window.$notification?.error({
            content: err.error_msg || UnKonwn_ErrorMsg,
          });
        }
        ElMessage.error("请求失败");
      });
  });
}

// 请求issue列表
export function getMoreIssues(inputText) {
  return getRequest("/issues", inputText);
}

export function getAnswer(inputText) {
  return postRequest("/api", {
    input_text: inputText,
    platform: "openEuler",
  });
}
export function getSuggestions(inputText) {
  return postRequest("/api/autofillquestion", {
    input_text: inputText,
    platform: "openEuler",
  });
}
export function getMoreDoc(inputText) {
  return postRequest("/search/docs", {
    keyword: inputText,
    lang: "zh",
    page: 1,
    pageSize: 12,
    type: "",
  });
}

// 用户意见反馈
export function userFeedback(params) {
  return postRequest("/qabot/" + "user_feedback", params);
}
// 问答机器人会话
export function getQabotChat(params) {
  return postRequest("/qabot/" + "chat", params);
}
// 问答满意评价
export function satisfaction(params) {
  return postRequest("/qabot/" + "satisfaction", params);
}
// 推荐问题
export function getChatSuggestions(params) {
  return postRequest("/qabot/" + "suggestions", params);
}
