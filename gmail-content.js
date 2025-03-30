document.addEventListener("dragstart", (event) => {
    let selectedAttachments = document.querySelectorAll("[aria-selected='true'][download_url]");

    if (selectedAttachments.length === 0) {
        let singleAttachment = event.target.closest("[download_url]");
        if (singleAttachment) {
            selectedAttachments = [singleAttachment];  
        }
    }

    if (selectedAttachments.length > 0) {
        let files = Array.from(selectedAttachments).map((attachment) => {
            let fileUrl = attachment.getAttribute("download_url").split(":")[1];
            let fileName = attachment.innerText.trim();
            return { fileUrl, fileName };
        });

        event.dataTransfer.setData("text/plain", JSON.stringify(files));

        chrome.runtime.sendMessage({
            action: "attachments_dragged",
            files: files
        });
    }
});
