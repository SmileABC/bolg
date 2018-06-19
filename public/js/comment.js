
//$('#messageBtn').on('click',
    function mm() {
    $.ajax({
        type: 'POST',
        url: '/api/comment/post',
        data: {
            "user" : $('#contentId').val(),
            "plnr" : $('#messageContent').val(),
            "pldate" : formatDate(),
            "wenzhangId" : $('#wenzhangId').val()
        },
        success: function(responseData) {

        }
    })
    changview($('#wenzhangId').val())
}


function formatDate() {
    var date1 = new Date();
    return date1.getFullYear() + '年' + (date1.getMonth()+1) + '月' + date1.getDate() + '日 ' + date1.getHours() + ':' + date1.getMinutes() + ':' + date1.getSeconds();
}
