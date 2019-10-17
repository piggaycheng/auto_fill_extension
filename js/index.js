$( document ).ready(function() {
    console.log( "ready!" );

    $('#clearStorageBtn').on('click', function(e){
        console.log('test');
        chrome.storage.sync.set({'input': {}}); 
    });
});