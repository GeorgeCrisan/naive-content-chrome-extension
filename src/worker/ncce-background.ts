
const getTextContent = (info: any) => {
  console.log("ab", info);
  console.log(window.getSelection());
};

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id ? tab.id : -1 },
    func: getTextContent,
    args: [tab]
  }).then();
});

