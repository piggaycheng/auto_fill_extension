$( document ).ready(function() {
    console.log( "ready!");

    $('#clearStorageBtn').on('click', function(e){
        chrome.storage.sync.clear(function(){
            $('#inputsArea').empty();
            $('#message').text('clear success!!'); 
        });
    });

    // TODO:
    $('#checkCheckbox').on('click', function(e){
        chrome.storage.sync.clear(function(){
            $('#inputsArea').empty();
            $('#message').text('clear success!!'); 
        });
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
});

function onStorageChangeHandler(changes, namespace) {
    console.log(changes);
}