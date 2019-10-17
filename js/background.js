const ACTION_SAVE = 1;

// chrome.runtime.onMessage.addListener(function(data, sender, sendResponse){
//     //do something that only the extension has privileges here
//     console.log(data);
//     let data = JSON.parse(data);
//     // save input
//     if(data.action === ACTION_SAVE) {

//     }
//     return true;
// });

// console.log("background page ready");  

let contextMenusItem = {
    "id": "autoFill",
    "title": "新增至AutoFill",
    "contexts": ["all"]
};

chrome.contextMenus.create(contextMenusItem);

function onContextMenusClickHandler(clickData, tab) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, {action: "open_dialog_box"});  
    });
}

chrome.contextMenus.onClicked.addListener(onContextMenusClickHandler);

// chrome.contextMenus.onClicked.addListener(function(clickData){
//     if(clickData.menuItemId == 'autoFill' && clickData.selectionText) {
//         let input = {};
//         chrome.storage.sync.get(['input'], function(result) {
//             if(result.input) {
//                 result.input[clickData.selectionText] = '';
//                 input = result.input;
//             } else {
//                 input[clickData.selectionText] = '';
//             }
//             console.log(input);
//             chrome.storage.sync.set({'input': input});
//         });
//     }
// });