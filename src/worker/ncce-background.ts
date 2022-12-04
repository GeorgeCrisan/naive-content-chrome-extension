
const getTextContent = (info: any) => {
  const body = document.getElementsByTagName("body");
  const html = document.getElementsByTagName("html");
  let anchorElement = body && body[0] ? body[0] : html[0];

  if (anchorElement) {
    // Get hold of the parent element, body or html and select all the text
    const selection: any = window.getSelection();
    selection.selectAllChildren(anchorElement);
    
    const textContent = selection.toString();
    selection.removeAllRanges();

    const a = document.createElement('a');

    // Prepare the payload for upload
    const payload = JSON.stringify({ value: textContent });
    const blob = new Blob([payload], {type: "application/json"});
    const url = URL.createObjectURL(blob);

    // Prepare link for download
    a.setAttribute('href', url);
    a.setAttribute('download', info.title.replace(/[^a-zA-Z ]/g, "") + ".json" || "textcontent.json");
    a.click();

    // Do clean up 
    URL.revokeObjectURL(url);
  }
};

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id ? tab.id : -1 },
    func: getTextContent,
    args: [tab]
  });
});
