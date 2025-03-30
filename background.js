chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.action === "attachments_dragged") {
        try {
            let fileBlobs = await Promise.all(message.files.map(async (file) => {
                const response = await fetch(file.fileUrl);
                const blob = await response.blob();
                return {
                    blob: blob,
                    fileName: file.fileName,
                    fileType: blob.type
                };
            }));

            chrome.storage.local.set({ draggedFiles: fileBlobs }, () => {
                console.log("Files stored successfully for transfer.");
            });

        } catch (error) {
            console.error("Error fetching files:", error);
        }
    }
});
