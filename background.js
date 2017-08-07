let isRunning = false;

chrome.commands.onCommand.addListener(function (command) {
  // Call 'update' with an empty properties object to get access to the current
  // tab (given to us in the callback function).
  chrome.tabs.update({}, function (tab) {
    if (command === 'toggle-snap-guide') {
      chrome.tabs.executeScript(tab.id, {file: 'inpage.js'});
      isRunning = true;
    }
  });
});

chrome.browserAction.onClicked.addListener(function (tab) {
  if (!isRunning) {
    chrome.tabs.executeScript(tab.id, {file: 'inpage.js'});
    isRunning = true;
  }
});