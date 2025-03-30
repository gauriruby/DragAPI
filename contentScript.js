document.addEventListener("dragstart", (event) => {
    let attachmentElement = event.target.closest(".attachment");
    if (attachmentElement) {
        let fileUrl = attachmentElement.getAttribute("href");
        let fileName = attachmentElement.innerText.trim();

        chrome.runtime.sendMessage({ action: "storeFile", fileUrl, fileName });
    }
});
