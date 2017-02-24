var a = true;

chrome.browserAction.onClicked.addListener(function (tab) {
  if (a) {
    chrome.tabs.executeScript(tab.id, {file: 'inpage.js'});
    a = false;
  }
});