(()=>{"use strict";const e=e=>{const t=document.getElementsByTagName("body"),c=document.getElementsByTagName("html");let n=t&&t[0]?t[0]:c[0];if(n){const t=window.getSelection();t.selectAllChildren(n);const c=t.toString();t.removeAllRanges();const o=document.createElement("a"),i=JSON.stringify({value:c}),l=new Blob([i],{type:"application/json"}),a=URL.createObjectURL(l);o.setAttribute("href",a),o.setAttribute("download",e.title.replace(/[^a-zA-Z ]/g,"")+".md"||0),o.click(),URL.revokeObjectURL(a)}};chrome.action.onClicked.addListener((t=>{chrome.scripting.executeScript({target:{tabId:t.id?t.id:-1},func:e,args:[t]})}))})();