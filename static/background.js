let isRunning = false;

chrome.browserAction.setBadgeText({ text: 'β' });
chrome.browserAction.setBadgeBackgroundColor({ color: '#f6585c' });

chrome.commands.onCommand.addListener(command => {
  // Call 'update' with an empty properties object to get access to the current
  // tab (given to us in the callback function).
  chrome.tabs.update({}, tab => {
    if (!isRunning) {
      if (command === 'toggle-snap-guide') {
        chrome.tabs.executeScript(tab.id, { file: 'inpage.js' });
        chrome.tabs.insertCSS(tab.id, { file: 'inpage.css' });
        isRunning = true;
      }
    } else {
      chrome.tabs.sendMessage(tab.id, 'toggleActive');
    }
  });
});

chrome.browserAction.onClicked.addListener(tab => {
  if (!isRunning) {
    chrome.tabs.executeScript(tab.id, { file: 'inpage.js' });
    chrome.tabs.insertCSS(tab.id, { file: 'inpage.css' });
    isRunning = true;
  } else {
    chrome.tabs.sendMessage(tab.id, 'toggleActive');
  }
});
