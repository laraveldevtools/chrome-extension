// contentScript.js

let lastRightClickedElement = null;

document.addEventListener("contextmenu", (event) => {
    lastRightClickedElement = event.target;
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getFilePath") {
        if (!lastRightClickedElement) {
            console.log("No element found.");
            sendResponse({ filePath: null });
            return true;
        }

        let element = lastRightClickedElement;
        let filePath = null;

        // First try to find the data-view attribute
        while (element && !filePath) {
            if (element.hasAttribute("data-view")) {
                filePath = element.getAttribute("data-view");
                break;
            }
            element = element.parentElement;
        }

        // If no data-view found, look for View comment
        if (!filePath) {
            const walker = document.createTreeWalker(
                document.documentElement,
                NodeFilter.SHOW_COMMENT,
                null,
                false
            );

            let node;
            while ((node = walker.nextNode())) {
                const comment = node.nodeValue.trim();
                if (comment.startsWith('View:')) {
                    filePath = comment.replace('View:', '').trim();
                    break;
                }
            }
        }

        if (filePath) {
            console.log(`File path found: ${filePath}`);
            // Send to both the background script and panel
            sendResponse({ filePath });
            chrome.runtime.sendMessage({ 
                action: 'updateFile', 
                filePath: filePath 
            });
        } else {
            console.log("No file path found.");
            sendResponse({ filePath: null });
        }

        return true; // Keep the message channel open for async response
    }
});
