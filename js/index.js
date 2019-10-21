$( document ).ready(function() {
    console.log( "ready!");

    $('#clearStorageBtn').on('click', function(e){
        chrome.storage.sync.clear(function(){
            $('#inputsArea').empty();
            $('#message').text('clear success!!'); 
        });
    });

    $('#checkCheckbox').on('click', function(e){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {action: "check_all_ckeckbox"});  
        });
    });

    $('#okBtn').on('click', function(e){
        
    });

    chrome.storage.sync.get(['inputs'], function(result) {
        if(result.inputs) {
            let inputIds = Object.keys(result.inputs);
            let inputs = result.inputs;
            for(index in inputIds) {
                $('#inputsArea').prepend('<div>name: '+ inputs[inputIds[index]].name + ' value: ' + inputs[inputIds[index]].value +'</div>');
            }
        }
    });

    chrome.storage.onChanged.addListener(onStorageChangeHandler);

    $("#sortable").sortable({
        revert: true
    });
    $("#draggable").draggable({
        connectToSortable: "#sortable",
        helper: "clone",
        revert: "invalid"
    });
    $("ul, li").disableSelection();
});

function onStorageChangeHandler(changes, namespace) {
    console.log(changes);
}