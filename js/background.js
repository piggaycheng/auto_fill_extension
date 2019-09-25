chrome.runtime.onMessage.addListener(function(myMessage, sender, sendResponse){
    //do something that only the extension has privileges here
    console.log(myMessage);
    return true;
});

// console.log("background page ready");  

let contextMenusItem = {
    "id": "autoFill",
    "title": "add input to autoFill",
    "contexts": ["selection"]
};

chrome.contextMenus.create(contextMenusItem);

chrome.contextMenus.onClicked.addListener(function(clickData){
    if(clickData.menuItemId == 'autoFill' && clickData.selectionText) {
        
    }
});