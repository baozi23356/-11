chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'startDownload') {
    // 获取当前标签页的标题作为文件名
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      const filename = `douyin_video_${Date.now()}.mp4`;
      
      chrome.downloads.download({
        url: request.url,
        filename: filename,
        saveAs: true
      });
    });
  }
}); 