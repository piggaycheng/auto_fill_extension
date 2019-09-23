console.log("內容腳本注入");  

$('body').click(function() {
    //send message to ext
    console.log("body click");  
    var testInformation = 'test';
    chrome.runtime.sendMessage(testInformation, function(response) {
    //callback
    });
});


// document.body.addEventListener('click', function(){
//     console.log("內容腳本注入");  
// }, true);