chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  const currentTab = tabs[0];
  const url = new URL(currentTab.url);
  const databaseUrl = `${url.origin}/devtools`;
  document.getElementById('databaseFrame').src = databaseUrl;
});
