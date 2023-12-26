import { fetchEventSource } from "@microsoft/fetch-event-source";
import axios from "axios";

export function getChatSession() {
  return axios.get("/rag/session/generate_session");
}

// 获取百川ai流式回答
export function getBaichuanStreamAnswer(params, successCallback) {
  const abortController = new AbortController();
  const signal = abortController.signal;
  fetchEventSource("https://60.204.250.91:8000/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    openWhenHidden: true,
    signal: signal,
    body: JSON.stringify(params),
    onmessage: (event) => {
      if (event.data === "[DONE]") abortController.abort();
      if (Object.keys(JSON.parse(event.data).choices[0].delta).includes("role"))
        return;
      if (Object.keys(JSON.parse(event.data).choices[0].delta).length !== 0) {
        successCallback(event);
      }
    },
    onclose: () => {
      abortController.abort();
    },
    onerror: () => {
      abortController.abort();
    },
  });
}
// 获取百川ai流式回答
export function getGptStreamAnswer(params, successCallback) {
  const abortController = new AbortController();
  const signal = abortController.signal;
  fetchEventSource("https://159.138.5.80:5610/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    openWhenHidden: true,
    signal: signal,
    body: JSON.stringify(params),
    onmessage: (event) => {
      if (event.data === "[DONE]") abortController.abort();
      if (Object.keys(JSON.parse(event.data).choices[0].delta).includes("role"))
        return;
      if (Object.keys(JSON.parse(event.data).choices[0].delta).length !== 0) {
        successCallback(event);
      }
    },
    onclose: () => {
      abortController.abort();
    },
    onerror: () => {
      abortController.abort();
    },
  });
}

// 获取rag知识库流式回答
export function getRagStreamAnswer(
  params,
  successCallback,
  closeCallback,
  errorCallback
) {
  const abortController = new AbortController();
  const signal = abortController.signal;
  fetchEventSource("https://rag.test.osinfra.cn/kb/get_stream_answer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    openWhenHidden: true,
    signal: signal,
    body: JSON.stringify(params),
    onmessage: (event) => {
      console.log(event);
      successCallback(JSON.parse(event.data));
    },
    onclose: () => {
      closeCallback();
      abortController.abort();
    },
    onerror: () => {
      errorCallback();
      abortController.abort();
    },
  });
}
