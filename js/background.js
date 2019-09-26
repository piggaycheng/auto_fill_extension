chrome.runtime.onMessage.addListener(function(myMessage, sender, sendResponse){
    //do something that only the extension has privileges here
    console.log(myMessage);
    return true;
});

// console.log("background page ready");  

let contextMenusItem = {
    "id": "autoFill",
    "title": "新增至AutoFill",
    "contexts": ["selection"]
};

chrome.contextMenus.create(contextMenusItem);

chrome.contextMenus.onClicked.addListener(function(clickData){
    if(clickData.menuItemId == 'autoFill' && clickData.selectionText) {
        let input = {};
        chrome.storage.sync.get(['input'], function(result) {
            if(result.input) {
                result.input[clickData.selectionText] = '';
                input = result.input;
            } else {
                input[clickData.selectionText] = '';
            }
            console.log(input);
            chrome.storage.sync.set({'input': input});
        });
    }
});