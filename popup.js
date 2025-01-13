document.getElementById('downloadBtn').addEventListener('click', async () => {
  const status = document.getElementById('status');
  status.textContent = '正在获取视频...';

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (!tab.url.includes('douyin.com')) {
      status.textContent = '请在抖音视频页面使用此扩展！';
      return;
    }

    chrome.tabs.sendMessage(tab.id, { action: 'downloadVideo' }, (response) => {
      if (response && response.success) {
        status.textContent = '下载已开始...';
      } else {
        status.textContent = '视频获取失败，请重试！';
      }
    });
  } catch (error) {
    status.textContent = '发生错误，请重试！';
    console.error(error);
  }
}); 