console.log("內容腳本注入");  
const ACTION_SAVE = 1;

// $('body').click(function() {
//     //send message to ext
//     console.log("body click");  
//     var testInformation = 'test';
//     chrome.runtime.sendMessage(testInformation, function(response) {
//     //callback
//     });
// });

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.action == 'open_dialog_box') {
        if($('#addInputModal').length == 0) {
            $('body').append(
                '<div class="modal" tabindex="-1" role="dialog" id="addInputModal" data-backdrop="false">'+
                    '<div class="modal-dialog" role="document">'+
                        '<div class="modal-content">'+
                            '<div class="modal-header">'+
                                '<h3 class="modal-title">Save Data</h3>'+
                                '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                                    '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>'+
                            '<div class="modal-body">'+
                                '<lebel for="idInput">element id: </lebel>'+
                                '<input type="text" id="idInput" /><br><br>'+
                                '<lebel for="nameInput">Data Name: </lebel>'+
                                '<input type="text" id="nameInput" /><br><br>'+
                                '<lebel for="valueInput">Data Value: </lebel>'+
                                '<input type="text" id="valueInput" />'+
                            '</div>'+
                            '<div class="modal-footer">'+
                                '<button type="button" class="btn btn-primary" id="modalYes">Save</button>'+
                                '<button type="button" class="btn btn-secondary" data-dismiss="modal" id="modalNo">Cancel</button>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'
            );
        }

        let focusElement = $(':focus');
        $('#idInput').val(focusElement.attr('id'));
        $('#valueInput').val(focusElement.val());
        // 顯示modal
        $('#addInputModal').modal('toggle');
    } else if(msg.action == 'check_all_ckeckbox') {
        let allCheckbox = $("input:checkbox");
        // console.log(allCheckbox);
        allCheckbox.each(function(){
            $(this).prop("checked", true);
        });
    }
});

$(document).on('click','#modalYes',function(e) {
    // let sendData = {
    //     'action': ACTION_SAVE,
    //     'data': {
    //         'id': $('#idInput').val(),
    //         'name': $('#nameInput').val(),
    //         'value': $('#valueInput').val()
    //     }
    // };

    // chrome.runtime.sendMessage(JSON.stringify(sendData), function(response) {
    //     //callback
    // });
    let inputs = {};
    chrome.storage.sync.get(['inputs'], function(result) {
        let inputId = $('#idInput').val();
        if(result.inputs) {
            result.inputs[inputId] = {};
            result.inputs[inputId].name = $('#nameInput').val();
            result.inputs[inputId].value = $('#valueInput').val();
            inputs = result.inputs;
        } else {
            inputs[inputId] = {};
            inputs[inputId].name = $('#nameInput').val();
            inputs[inputId].value = $('#valueInput').val();
        }
        console.log(inputs);
        chrome.storage.sync.set({'inputs': inputs});
    });

    $('#addInputModal').modal('toggle');
});