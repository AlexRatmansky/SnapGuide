// (function (chrome) {

let isRunning = false;

chrome.commands.onCommand.addListener(function(command) {
  // Call 'update' with an empty properties object to get access to the current
  // tab (given to us in the callback function).
  chrome.tabs.update({}, function(tab) {
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

chrome.browserAction.onClicked.addListener(function(tab) {
  if (!isRunning) {
    chrome.tabs.executeScript(tab.id, { file: 'inpage.js' });
    chrome.tabs.insertCSS(tab.id, { file: 'inpage.css' });
    isRunning = true;
  } else {
    chrome.tabs.sendMessage(tab.id, 'toggleActive');
  }
});

// })(chrome)
