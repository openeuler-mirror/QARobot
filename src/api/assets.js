import { fetchEventSource } from "@microsoft/fetch-event-source";
import axios from "axios";

export function generateSession() {
  return axios({
    method: "GET",
    headers: { user: JSON.stringify({ userName: "openEuler" }) },
    url: "/rag/generate_session",
  });
}

export function clearSession(session_id) {
  return axios({
    method: "POST",
    headers: { user: JSON.stringify({ userName: "openEuler" }) },
    url: "/rag/clear_session",
    params: { session_id: session_id },
  });
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
  const eventSource = fetchEventSource(
    "https://rag.test.osinfra.cn/kb/natural_language",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        user: JSON.stringify({ userName: "openEuler" }),
      },
      openWhenHidden: true,
      signal: signal,
      body: JSON.stringify(params),
      onmessage: (event) => {
        successCallback(JSON.parse(event.data));
      },
      onclose: () => {
        closeCallback();
        abortController.abort();
      },
      onerror: (err) => {
        errorCallback(err);
        abortController.abort();
        eventSource.close();
      },
    }
  );
}
