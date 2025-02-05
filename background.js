chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
    console.log("URL changed via SPA:", details.url);
    sendMessageToPanel(details.url);

}, {
    url: [{
        hostContains: "."
    }]
});

chrome.webNavigation.onCommitted.addListener((details) => {
    console.log("URL changed via full page load:", details.url);
    sendMessageToPanel(details.url);

}, {
    url: [{
        hostContains: "."
    }]
});



function sendMessageToPanel(url) {
    chrome.runtime.sendMessage({
        action: "urlChanged",
        newUrl: url
    });
}