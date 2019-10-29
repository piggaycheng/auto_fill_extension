import actionType from './enum/actionType.js';

$(document).ready(function() {
    console.log("ready!");

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

        // 儲存所有卡片
        chrome.storage.sync.get(['cards'], function(result) {
            let cards = $('.ui-state-default');
            let cardArray = [];
            for(let i=0; i<cards.length; i++) {
                cardArray.push({});
                cardArray[i].actionType = cards.eq(i).data('type');
            }
            chrome.storage.sync.set({'cards': cardArray});

            for(let i=0; i<cardArray.length; i++) {
                if(cardArray[i].actionType == actionType.ADD_TEXT_INPUT) {
                    $('#actionEditor').append('<div class="editArea"><button class="btn trashBtn"><i class="fas fa-trash"></i></button>' + 
                    '<button class="btn"><i class="fas fa-edit"></i></button>' + 
                    '<button class="btn"><i class="fas fa-crosshairs"></i></button></div>');
                } else if(cardArray[i].actionType == actionType.END) {
                    // do nothing
                }else {
                    $('#actionEditor').append('<div class="editArea"><button class="btn trashBtn"><i class="fas fa-trash"></i></button>');
                }
            }
        });
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
    chrome.storage.sync.get(['cards'], function(result) {
        if(result.cards) {
            let cards = result.cards;
            for(let index in cards) {
                // 移除重複的endCard
                if(cards[index].actionType == actionType.END) {
                    $('#endCard').remove();
                    $('#sortable').append('<li class="ui-state-default" data-type="'+ cards[index].actionType +'">end</li>');
                } else {
                    $('#sortable').append('<li class="ui-state-default" data-type="'+ cards[index].actionType +'">123</li>');
                }
            }

            for(let i=0; i<cards.length; i++) {
                if(cards[i].actionType == actionType.ADD_TEXT_INPUT) {
                    $('#actionEditor').append('<div class="editArea"><button class="btn trashBtn"><i class="fas fa-trash"></i></button>' + 
                    '<button class="btn"><i class="fas fa-edit"></i></button>' + 
                    '<button class="btn"><i class="fas fa-crosshairs"></i></button></div>');
                } else if(cards[i].actionType == actionType.END) {
                    // do nothing
                }else {
                    $('#actionEditor').append('<div class="editArea"><button class="btn trashBtn"><i class="fas fa-trash"></i></button>');
                }
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
            $('.editArea').remove();
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
        } else if(defaultCards.eq(i).data('type') == actionType.END) {
            // do nothing
        }else {
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