import axios from '@/axios'
import { fetchEventSource } from '@microsoft/fetch-event-source';

const UnKonwn_ErrorMsg = '未知错误';
function postRequest(url, data) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        if (data.webMessage !== 'manual') {
          window.$notification?.error({ content: err.data.error_msg || UnKonwn_ErrorMsg });
        }
        reject(err);
      });
  });
}
// 请求token
export function getToken(inputText) {
  const formData = new FormData();
  formData.append('username', 'temporary_user')
  formData.append('password', 'default_password')
  return postRequest('/auth', formData);
}

// 请求chatapi
export function getChatapi (inputText, params) {
  const { message, close } = params
  const headers = {
    'Authorization': 'Bearer' + ' ' + localStorage.getItem('Access-Token'),
  };
  const body = JSON.stringify([
    {
      role: 'user',
      Content: inputText
    }
  ]);
  // eslint-disable-next-line no-unused-vars
  const es = new fetchEventSource('/chatCompletionStream', {
    method: 'POST',
    headers,
    body,
    async onopen (response) {
      if (response.ok) {
        return; // everything's good
      } else if (response.status >= 400 && response.status < 500 && response.status !== 429) {
        // throw new Error(response.statusText);
      } else {
        throw new Error();
      }
    },
    onmessage (event) {
      message(event.data);
    },
    onclose () {
      close()
      // if the server closes the connection unexpectedly, retry:
    },
    onerror (err) {
      throw new Error();
    }
  });
}

export function getAnswer(inputText) {
  return postRequest('/api', {
    input_text: inputText,
    platform: 'openEuler'
  });
}
export function getSuggestions(inputText) {
  return postRequest('/api/autofillquestion', {
    input_text: inputText,
    platform: 'openEuler'
  });
}
export function getMoreDoc(inputText) {
  return postRequest('/search/docs', {
    keyword: inputText,
    lang: 'zh',
    page: 1,
    pageSize: 12,
    type: ''
  });
}
