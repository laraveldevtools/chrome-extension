
chrome.devtools.panels.create(
  "Database",
  "", // No icon
  "panel.html",
  function(panel) {
    console.log("PHP Console panel created!");
  }
);
