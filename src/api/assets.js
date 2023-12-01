import { fetchEventSource } from "@microsoft/fetch-event-source";

// 获取百川ai流式回答
export function getBaichuanStreamAnswer(params, successCallback) {
  const abortController = new AbortController();
  const signal = abortController.signal;
  fetchEventSource("http://60.204.250.91:8000/v1/chat/completions", {
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
  fetchEventSource("http://159.138.5.80:5610/v1/chat/completions", {
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
export function getRagStreamAnswer(params, successCallback) {
  const abortController = new AbortController();
  const signal = abortController.signal;
  fetchEventSource("http://60.204.250.91:8002/kb/get_stream_answer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    openWhenHidden: true,
    signal: signal,
    body: JSON.stringify(params),
    onmessage: (event) => {
      successCallback(JSON.parse(event.data));
    },
    onclose: () => {
      abortController.abort();
    },
    onerror: () => {
      abortController.abort();
    },
  });
}
