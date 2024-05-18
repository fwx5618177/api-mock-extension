chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    return { cancel: false };
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);

chrome.webRequest.onCompleted.addListener(
  function (details) {
    if (details.responseHeaders) {
      chrome.tabs.executeScript(details.tabId, {
        file: "./mock.js",
      });
    }
  },
  { urls: ["<all_urls>"] },
  ["responseHeaders"]
);
