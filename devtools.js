
chrome.devtools.panels.create(
  "Laravel",
  "", // No icon
  "panel.html",
  function(panel) {
    console.log("Laravel Database Tools panel created!");
  }
);
