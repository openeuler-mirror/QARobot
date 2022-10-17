import axios from '@/axios'
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
  return postRequest('/api-search/search/docs', {
    keyword: inputText,
    lang: 'zh',
    page: 1,
    pageSize: 12,
    type: ''
  });
}
