chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  const currentTab = tabs[0];
  const url = new URL(currentTab.url);
  //const devtoolsUrl = `http://devtools.test/devtools`;
  const devtoolsUrl = `${url.origin}/devtools`;
  document.getElementById('devtoolsFrame').src = devtoolsUrl;
});
