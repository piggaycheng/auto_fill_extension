import actionType from './enum/actionType.js';

$(document).ready(function() {
    console.log("ready!");
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

    // 按下OK
    $('#okBtn').on('click', function(e){
        let highlights = $('.ui-state-highlight');
        for(let key in highlights) {
            if(key > 0) {
                highlights.eq(key).addClass('ui-state-default').removeClass('ui-state-highlight');
            }
        }
        // 隱藏
        $(this).hide();
        // 操作區塊顯示
        $('#actionEditor').css('visibility', 'visible');
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
        helper: "clone",                // 複製
        revert: "invalid",              // 還原
        disabled: true,
        stop: function( event, ui ) {
            let el = ui.helper;
            el.data('type', $('#actionSelector').val());

            if($('.ui-state-highlight').length > 2) {
                $('#okBtn').show();
            }
        },
        start: function( event, ui ) {
            // 操作區塊隱藏
            $('#actionEditor').css('visibility', 'hidden');
        },
    });
    
    $("ul, li").disableSelection();

    //FIXME: 之後要改成依照storage中action長度來判斷
    let defaultCards = $('.ui-state-default');
    for(let i=0; i<defaultCards.length; i++) {
        if(defaultCards.eq(i).data('type') == actionType.ADD_TEXT_INPUT) {
            $('#actionEditor').append('<div class="editArea"><button class="btn trashBtn"><i class="fas fa-trash"></i></button>' + 
            '<button class="btn"><i class="fas fa-edit"></i></button>' + 
            '<button class="btn"><i class="fas fa-crosshairs"></i></button></div>');
        } else {
            $('#actionEditor').append('<div class="editArea"><button class="btn trashBtn"><i class="fas fa-trash"></i></button>');
        }
        
    }
});

$(document).on('click', '.trashBtn', function(e){
    console.log(e);
});

function onStorageChangeHandler(changes, namespace) {
    console.log(changes);
}