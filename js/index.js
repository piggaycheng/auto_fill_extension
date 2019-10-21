$( document ).ready(function() {
    console.log( "ready!");
    const NONE = 0;
    const ADD_TEXT_INPUT = 1;
    const CHECK_ALL_CHECKBOX = 2;
    const CLICK = 3;

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

    // selector必須要有選值才可以新增卡片
    $('#actionSelector').on('change', function(e){
        if($('#actionSelector').val() == 0) {
            $('#draggable').draggable("option", "disabled", true);
        } else {
            $('#draggable').draggable("option", "disabled", false);
        }
    });

    // 取得chrome storage data
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
        revert: true,
        // stop: function( event, ui ) {
        //     console.log(ui);
        // }
    });

    $("#draggable").draggable({
        connectToSortable: "#sortable",
        helper: "clone",
        revert: "invalid",
        disabled: true,
        stop: function( event, ui ) {
            let el = ui.helper;
            el.data('type', $('#actionSelector').val());
        }
    });
    
    $("ul, li").disableSelection();
});

function onStorageChangeHandler(changes, namespace) {
    console.log(changes);
}