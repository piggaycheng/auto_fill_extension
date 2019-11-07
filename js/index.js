import {actionType, actionTypeText} from './enum/action.js';

var globalCardsArray = [];
var serial = -1;

$(document).ready(function() {
    init();
    console.log("init!");

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
                let text = highlights.eq(key).text();
                console.log(text);
                highlights.eq(key).addClass('ui-state-default').removeClass('ui-state-highlight').text(text);
            }
        }
        // 隱藏
        $(this).hide();
        saveData();
    });

    // 按下OK(編輯text input)
    $('#editOkBtn').on('click', function(e){
        let cards = $('.ui-state-default');
        cards.eq(serial).text($('#nameInput').val());
        cards.eq(serial).data('id', $('#idInput').val());
        cards.eq(serial).data('value', $('#valueInput').val());
        saveData();
        $('#editArea').hide();
    });

    // 按下cancel(編輯))
    $('#editCancelBtn').on('click', function(e){
        $('#editArea').hide();
    });

    $('#runBtn').on('click', function(e){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {action: "run_all"});  
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

    // chrome.storage.onChanged.addListener(onStorageChangeHandler);

    $("#sortable").sortable({
        revert: true,
        start: function( event, ui ) {
            // 操作區塊隱藏
            $('.operateArea').remove();
        },
        stop: function( event, ui ) {
            $('#okBtn').show();
        },
        update: function( event, ui ) {
            $('#okBtn').show();
        },
    });

    $("#draggable").draggable({
        connectToSortable: "#sortable",
        helper: "clone",                // 複製
        revert: "invalid",              // 還原
        disabled: true,
        stop: function( event, ui ) {
            let el = ui.helper;
            let type = $('#actionSelector').val();
            el.data('type', type);
            el.text(actionTypeText[type]);

            $('#okBtn').show();
            $('.operateArea').remove();
        },
        start: function( event, ui ) {
            // 操作區塊隱藏
            $('.operateArea').remove();
        },
    });
    
    $("ul, li").disableSelection();
});

$(document).on('click', '.trashBtn', function(e){
    console.log('clear serial number: ' + $(this).data('serial'));
    deleteOneCard($(this).data('serial'));
});

$(document).on('click', '.editBtn', function(e){
    $('#editArea').show();
    serial = $(this).data('serial');

    $('#nameInput').val(globalCardsArray[serial].customizeName);
});

function onStorageChangeHandler(changes, namespace) {
    console.log(changes);
}

function init() {
    // 取得chrome storage data
    chrome.storage.sync.get(['cards'], function(result) {
        if(result.cards) {
            let cards = result.cards;
            globalCardsArray = result.cards;
            for(let index in cards) {
                // 移除重複的endCard
                if(cards[index].actionType == actionType.END) {
                    $('#endCard').remove();
                    $('#sortable').append('<li class="ui-state-default" data-type="'+ cards[index].actionType + '" data-serial="'+index+'">end</li>');
                } else {
                    $('#sortable').append('<li class="ui-state-default" data-type="'+ cards[index].actionType + '" data-serial="'+index+'">'+cards[index].customizeName+'</li>');
                }
            }

            // show operateArea by storage data
            for(let i=0; i<cards.length; i++) {
                if(cards[i].actionType == actionType.ADD_TEXT_INPUT) {
                    $('#actionEditor').append('<div class="operateArea"><button class="btn trashBtn" data-serial="'+i+'"><i class="fas fa-trash"></i></button>' + 
                    '<button class="btn editBtn" data-serial="'+i+'"><i class="fas fa-edit"></i></button>' + 
                    '<button class="btn"><i class="fas fa-crosshairs"></i></button></div>');
                } else if(cards[i].actionType == actionType.END) {
                    // do nothing
                } else {
                    $('#actionEditor').append('<div class="operateArea"><button class="btn trashBtn" data-serial="'+i+'"><i class="fas fa-trash"></i></button>');
                }
            }
        }
    });
}

function saveData() {
    // 儲存所有卡片
    chrome.storage.sync.get(['cards'], function(result) {
        let cards = $('.ui-state-default');
        let cardArray = [];
        for(let i=0; i<cards.length; i++) {
            cardArray.push({});
            cardArray[i].actionType = cards.eq(i).data('type');
            cardArray[i].customizeName = cards.eq(i).text();
            cardArray[i].id = cards.eq(i).data('id');
            cardArray[i].value = cards.eq(i).data('value');
        }
        chrome.storage.sync.set({'cards': cardArray});
        
        //清空畫面並重置
        deleteAllCards();
        init();
    });
}

function deleteAllCards() {
    // 清除畫面上所有卡片
    $('.ui-state-default').remove();
    $('.operateArea').remove();
}

function deleteOneCard(serial) {
    // 清除特定卡片
    // 取得chrome storage data
    chrome.storage.sync.get(['cards'], function(result) {
        if(result.cards) {
            let cards = result.cards;
            cards.splice(serial, 1);
            chrome.storage.sync.set({'cards': cards}, function() {
                // 清空畫面並重置
                deleteAllCards();
                init();
            });
        }
    });
}


// function showOperateArea() {
//     let cards = $('.ui-state-default');
//     for(let i=0; i<cards.length; i++) {
//         if(cards.eq(i).data('type') == actionType.ADD_TEXT_INPUT) {
//             $('#actionEditor').append('<div class="operateArea"><button class="btn trashBtn" data-serial="'+i+'"><i class="fas fa-trash"></i></button>' + 
//             '<button class="btn editBtn" data-serial="'+i+'"><i class="fas fa-edit"></i></button>' + 
//             '<button class="btn"><i class="fas fa-crosshairs"></i></button></div>');
//         } else if(cards.eq(i).data('type') == actionType.END) {
//             // do nothing
//         } else {
//             $('#actionEditor').append('<div class="operateArea"><button class="btn trashBtn" data-serial="'+i+'"><i class="fas fa-trash"></i></button>');
//         }
//     }
// }