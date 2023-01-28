
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

    // Use to be 
    // const payload = JSON.stringify({ value: textContent });
    // const blob = new Blob([payload], {type: "application/json"});

    // Prepare the payload for upload
    const blob = new Blob([textContent], {type: "application/json"});
    const url = URL.createObjectURL(blob);

    // Prepare link for download
    a.setAttribute('href', url);
    a.setAttribute('download', info.title.trim().replace(/[^a-zA-Z]/g, "-") + ".md" || "textcontent.md");
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
