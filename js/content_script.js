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
                                '<h5 class="modal-title">Modal title</h5>'+
                                '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                                    '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>'+
                            '<div class="modal-body">'+
                                '<p>Modal body text goes here.</p>'+
                            '</div>'+
                            '<div class="modal-footer">'+
                                '<button type="button" class="btn btn-primary">Save changes</button>'+
                                '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'
            );
        }

        $('#addInputModal').modal('toggle');
    }
});