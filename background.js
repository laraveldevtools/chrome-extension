// background.js

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
      id: "edit-code",
      title: "Edit Code",
      contexts: ["all"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "edit-code") {
      // Request file path from the content script
      chrome.tabs.sendMessage(tab.id, { action: "getFilePath" }, (response) => {
          if (response && response.filePath) {
              // Send message to update the panel's iframe URL
              chrome.runtime.sendMessage({
                  action: 'updateFile',
                  filePath: response.filePath
              });
          }
      });
  }
});
