import axios from '@/axios'
import { fetchEventSource } from '@microsoft/fetch-event-source'

const UnKonwn_ErrorMsg = '未知错误'
function postRequest(url, data) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        if (err.error_msg) {
          window.$notification?.error({
            content: err.error_msg || UnKonwn_ErrorMsg,
          })
        }
        reject(err)
      })
  })
}
function getRequest(url, data) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}?search=${data}`)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        if (err.error_msg) {
          window.$notification?.error({
            content: err.error_msg || UnKonwn_ErrorMsg,
          })
        }
        reject(err)
      })
  })
}

// 请求issue列表
export function getMoreIssues(inputText) {
  return getRequest('/issues', inputText)
}

// 请求chatapi
export function getChatapi(inputText, params) {
  const { message, close } = params
  const headers = {
    Authorization: 'Bearer' + ' ' + localStorage.getItem('Access-Token'),
  }
  const body = JSON.stringify([
    {
      role: 'user',
      Content: inputText,
    },
  ])
  // eslint-disable-next-line no-unused-vars
  const es = new fetchEventSource('/chatCompletionStream', {
    method: 'POST',
    headers,
    body,
    async onopen(response) {
      if (response.ok) {
        return // everything's good
      } else if (
        response.status >= 400 &&
        response.status < 500 &&
        response.status !== 429
      ) {
        // throw new Error(response.statusText);
      } else {
        throw new Error()
      }
    },
    onmessage(event) {
      message(event.data)
    },
    onclose() {
      close()
      // if the server closes the connection unexpectedly, retry:
    },
    onerror(err) {
      throw new Error()
    },
  })
}

export function getAnswer(inputText) {
  return postRequest('/api', {
    input_text: inputText,
    platform: 'openEuler',
  })
}
export function getSuggestions(inputText) {
  return postRequest('/api/autofillquestion', {
    input_text: inputText,
    platform: 'openEuler',
  })
}
export function getMoreDoc(inputText) {
  return postRequest('/search/docs', {
    keyword: inputText,
    lang: 'zh',
    page: 1,
    pageSize: 12,
    type: '',
  })
}

// 用户意见反馈
export function userFeedback(params) {
  return postRequest('/qabot/' + 'user_feedback', params)
}
// 问答机器人会话
export function getQabotChat(params) {
  return postRequest('/qabot/' + 'chat', params)
}
// 问答满意评价
export function satisfaction(params) {
  return postRequest('/qabot/' + 'satisfaction', params)
}
// 推荐问题
export function getChatSuggestions(params) {
  return postRequest('/qabot/' + 'suggestions', params)
}
