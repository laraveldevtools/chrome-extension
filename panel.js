// Listen for messages from the background script about file paths
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'updateFile' && message.filePath) {
    updateIframeUrl(message.filePath);
  }
});

// Function to update the iframe URL with a file path
function updateIframeUrl(filePath = '') {
  const fileQuery = filePath ? `?file=${encodeURIComponent(filePath)}` : '';
  const devtoolsUrl = `http://devtools.test/devtools${fileQuery}`;
  document.getElementById('devtoolsFrame').src = devtoolsUrl;
}

// Initial load of the iframe
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  updateIframeUrl();
});
