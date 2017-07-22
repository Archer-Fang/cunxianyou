/**
 * Created by zhangmengfei on 2017/3/6.
 */
// judgeIEVersionAndLink();
function checkUsername() {
    var username = getCookie('username')
    if (username != null && username != "") {
        document.getElementById("userName").value = username;
    }
    $("body").height($(window).height());
}
function saveUsername() {
    var username = document.getElementById("userName").value;
    var expiredays = 365;
    var exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = 'username' + "=" + escape(username) +
        ((expiredays == null) ? "" : "; expires=" + exdate.toGMTString())
}
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(c_name + "=")
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1
            var c_end = document.cookie.indexOf(";", c_start)
            if (c_end == -1) c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}
$(document).ready(function () {
    $('.login-bg').height($(window).height());
    $('.login-bg').width($(window).width());
    $(".checked").click(function () {
        $(this).addClass("hide");
        $(this).siblings().removeClass("hide");
        saveUsername();
    });

//        //点击跳到忘记密码页面
//        $(".forget").click(function () {
//            window.location.href = "/forget";
//        });
});
function login() {
    var userNameVal = $("#userName").val();
    var passwordVal = $("#password").val();
    if (userNameVal.trim().length == 0) {
        $('#loginModal .modal-body').html("请输入用户名");
        $('#loginModal').modal('show');
    } else if (passwordVal.trim().length == 0) {
        $('#loginModal .modal-body').html("请输入密码");
        $('#loginModal').modal('show');
    } else {
        //提交post验证账号密码是否符合要求
        $.post("/login/authorize", {userName: userNameVal, password: passwordVal}, function (data) {
            if (data.code == BACK_RESULT_CODE.FAILED) {
                $('#loginModal .modal-body').html(data.message);
                $('#loginModal').modal('show');
            }
            else {
                window.location.href = "/back/index";
            }
        });
    }
}


//按下enter键之后执行提交时间
$(document).keydown(function (event) {
    if (event.keyCode == 13) {
        login();
    }
});