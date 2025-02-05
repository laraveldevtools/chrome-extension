chrome.tabs.query({
    active: true,
    currentWindow: true
}, function(tabs) {
    const currentTab = tabs[0];
    const url = new URL(currentTab.url);
    const devtoolsUrl = `${url.origin}/devtools?pathname=${encodeURIComponent(url.pathname)}`;
    document.getElementById('devtoolsFrame').src = devtoolsUrl;
});


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "urlChanged") {
        console.log("New URL received in panel:", message.newUrl);

        // Get the active tab
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function(tabs) {
            if (tabs.length === 0) return; // Ensure a tab exists
            const currentTab = tabs[0];

            try {
                const url = new URL(currentTab.url); // Parse the URL
                const devtoolsUrl = `${url.origin}/devtools?pathname=${encodeURIComponent(url.pathname)}`;

                // Update the iframe
                document.getElementById('devtoolsFrame').src = devtoolsUrl;
            } catch (e) {
                console.error("Invalid URL:", e);
            }
        });
    }
});