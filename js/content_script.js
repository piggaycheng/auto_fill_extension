console.log("內容腳本注入");  

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

        var focusElement = $(':focus');
        $('#valueInput').val(focusElement.val());
        // 顯示modal
        $('#addInputModal').modal('toggle');
    }
});

$(document).on('click','#modalYes',function(e) {
    $('#addInputModal').modal('toggle');
});