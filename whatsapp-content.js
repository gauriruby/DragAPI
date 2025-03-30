chrome.storage.local.get("draggedFiles", async (data) => {
    if (!data.draggedFiles || data.draggedFiles.length === 0) return;

    let filesArray = data.draggedFiles.map(fileData => {
        return new File([fileData.blob], fileData.fileName, { type: fileData.fileType });
    });

    let dataTransfer = new DataTransfer();
    filesArray.forEach(file => dataTransfer.items.add(file));

    // Detect if we're running in WhatsApp Web or Desktop
    let isWhatsAppWeb = window.location.hostname.includes("web.whatsapp.com");

    if (isWhatsAppWeb) {
        // 🟢 WhatsApp Web: Use Drag & Drop
        let chatBox = document.querySelector("div[contenteditable='true']");
        if (!chatBox) {
            console.error("WhatsApp Web chat box not found.");
            return;
        }
        let event = new DragEvent("drop", { dataTransfer });
        chatBox.dispatchEvent(event);
    } else {
        // 🟢 WhatsApp Desktop: Use Clipboard API to Paste File
        try {
            let clipboardData = new ClipboardItem({
                [filesArray[0].type]: filesArray[0]
            });

            await navigator.clipboard.write([clipboardData]);

            // Simulate Ctrl + V to paste the file into the chat
            let event = new KeyboardEvent("keydown", {
                key: "v",
                code: "KeyV",
                ctrlKey: true,
                bubbles: true
            });

            document.dispatchEvent(event);
        } catch (error) {
            console.error("Failed to paste file in WhatsApp Desktop:", error);
        }
    }

    // Clear stored files after drop
    chrome.storage.local.remove("draggedFiles");
});
