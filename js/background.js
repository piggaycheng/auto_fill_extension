chrome.runtime.onMessage.addListener(function(myMessage, sender, sendResponse){
    //do something that only the extension has privileges here
    console.log(myMessage);
    return true;
});

console.log("background page ready");  

// let contextMenusItem = {
//     "id": "Auto Fill",
//     "title": "Auto Fill",
//     "contexts": ["all"]
// };

// chrome.contextMenus.create(contextMenusItem);