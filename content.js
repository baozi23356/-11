// 监听来自popup的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'downloadVideo') {
    extractVideoUrl()
      .then(videoUrl => {
        if (videoUrl) {
          chrome.runtime.sendMessage({
            action: 'startDownload',
            url: videoUrl
          });
          sendResponse({ success: true });
        } else {
          sendResponse({ success: false });
        }
      })
      .catch(error => {
        console.error('提取视频URL失败:', error);
        sendResponse({ success: false });
      });
    return true; // 保持消息通道开启
  }
});

// 提取视频URL
async function extractVideoUrl() {
  // 查找视频元素
  const videoElement = document.querySelector('video');
  if (videoElement && videoElement.src) {
    return videoElement.src;
  }
  
  // 如果直接获取失败，尝试从网络请求中获取
  const scripts = document.getElementsByTagName('script');
  for (const script of scripts) {
    const text = script.textContent;
    if (text && text.includes('playAddr')) {
      const match = text.match(/"playAddr":"([^"]+)"/);
      if (match && match[1]) {
        return decodeURIComponent(match[1]);
      }
    }
  }
  
  return null;
} 