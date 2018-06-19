

$(function() {

    var $loginBox = $('#loginBox');
    var $registerBox = $('#registerBox');
    var $userInfo = $('#userInfo');

    //切换到注册面板
    $loginBox.find('a.colMint').on('click', function() {
        $registerBox.show();
        $loginBox.hide();
    });

    //切换到登录面板
    $registerBox.find('a.colMint').on('click', function() {
        $loginBox.show();
        $registerBox.hide();
    });

    //注册
    $registerBox.find('button').on('click', function() {
        //通过ajax提交请求
        $.ajax({
            type: 'post',
            url: '/api/user/register',
            data: {
                username: $registerBox.find('[name="username"]').val(),
                password: $registerBox.find('[name="password"]').val(),
                repassword:  $registerBox.find('[name="repassword"]').val()
            },
            dataType: 'json',
            success: function(result) {
                $registerBox.find('.colWarning').html(result.dui);

                if (result.code) {
                    //注册成功
                    setTimeout(function() {
                        $loginBox.show();
                        $registerBox.hide();
                        console.log(result.reqb)
                        $loginBox.find('[name="username"]').val(result.reqb.username)
                        $loginBox.find('[name="password"]').val(result.reqb.password)
                    }, 1000);
                }

            }
        });
    });
    //登录
    $loginBox.find('button').on('click', function() {
        //通过ajax提交请求

        $.ajax({
            type: 'post',
            url: '/login',
            data: {
                username: $loginBox.find('[name="username"]').val(),
                password: $loginBox.find('[name="password"]').val()
            },
            dataType: 'json',
            success: function(result) {
                console.log(result)
                $loginBox.find('.colWarning').html(result.message);

                if(!result.code){
                    window.location.href = "http://127.0.0.1:3000/?username="+result.usermes.name;
                }
            }
        })
    })

    //退出
    $('#logout').on('click', function() {
        $.ajax({
            url: '/api/user/logout',
            success: function(result) {

            }
        });
        window.location.reload()
    })

})
function aaa(x,e){
    $(e).addClass("focus").siblings().removeClass("focus")
    $.ajax({
        type: 'GET',
        url: '/api/message?typeo='+x,
        success: function(responseData) {
            $("#mainLeft").html("")
            var datames = responseData.message;
            var mobanstring = $("#template1").html()
            var compiled = _.template(mobanstring);
            datames.forEach(function(item){
                var html = compiled({
                    title:item.title,
                    author:item.author,
                    addTime:item.addTime,
                    reading:item.reading,
                    _id:item._id.toString(),
                    pinglun:item.pinglun,
                    description:item.description
                });
                $("#mainLeft").append($(html));
            })
        }
    })
}
aaa("")
function changview(id){
    $.ajax({
        type: 'GET',
        url: '/api/view?contentid='+id,
        success: function(responseData) {
            var item = responseData.viewmes;
            item.isuser = responseData.user
            $("#mainLeft").html("")
            var mobanstring = $("#viewtemp").html()
            var compiled = _.template(mobanstring);
            var html = compiled(item);
            $("#mainLeft").append($(html));
        }
    })
}


    $.ajax({
        type: 'GET',
        url: '/api/types',
        success: function(responseData) {
            var _html = `<a class="focus" href="javascript:void(0)" onclick="aaa('')">首页</a>`
            responseData.cate.forEach(function(item){
                _html += `<a href="javascript:void(0)" class="" onclick="aaa('${item.name}',this)">${item.name}</a>`
            })
            $(".menu").html(_html)
        }
    })







//function ajax(){
//    var xmlHttpReg = null;
//    if(window.ActiveXObject){
//        xmlHttpReg = new ActiveXObject("Microsoft.XMLHTTP")
//    }else if(window.XMLHttpRequest){
//        xmlHttpReg = new XMLHttpRequest()
//    }
//
//    xmlHttpReg.open("GET","aa.php",true)
//    xmlHttpReg.send()
//
//    xmlHttpReg.onreadystatechange = function(){
//        if(xmlHttpReg.state == 4 && xmlHttpReg.status == 200){
//            console.log(xmlHttpReg.responseText)
//        }
//    }
//}
//
//
