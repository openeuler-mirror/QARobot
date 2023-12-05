import { fetchEventSource } from "@microsoft/fetch-event-source";

const controller = new AbortController();
const signal = controller.signal;
// ai model chat
export function getAiChat(url, params, successCallback, errCallback) {
  fetchEventSource(url, {
    method: "POST",
    signal,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
    // success callback
    onmessage(msg) {
      console.log(msg);
      successCallback(msg);
    },
    // fail callbak
    onerror(err) {
      errCallback(err);
      throw err;
    },
  });
}
