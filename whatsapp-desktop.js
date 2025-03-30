document.addEventListener("dragover", (event) => {
    event.preventDefault();
});

document.addEventListener("drop", async (event) => {
    event.preventDefault();

    try {
        const data = event.dataTransfer.getData("text/plain");
        if (!data) return;

        const fileData = JSON.parse(data);
        const response = await fetch(fileData.fileUrl);
        const blob = await response.blob();
        const file = new File([blob], fileData.fileName, { type: blob.type });

        // Simulate drag and drop to WhatsApp Desktop
        const clipboardItem = new ClipboardItem({ [blob.type]: blob });
        await navigator.clipboard.write([clipboardItem]);

        alert("File copied to clipboard! Paste it into WhatsApp.");
    } catch (error) {
        console.error("Error handling file drop:", error);
    }
});
