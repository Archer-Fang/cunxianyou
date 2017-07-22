/**
 * Created by HJ on 2017-01-16.
 */
var loadPage=function (url) {
    if (!url.match("/add")) {
        //消除连续两次模态框显示导致的17px叠加偏移
        $('.main-body').css('padding-right', '0');
        $('#circleModal').modal('show');
    }
    $('html,body').animate({scrollTop: 0}, 1);
    //加时间戳，兼容ie9
    var ts = "?ts=" + new Date().getTime();
    if (url.indexOf("?") != -1) {
        url = url.replace('?', ts + "&");
    }
    else {
        url = url + ts;
    }
    $("#main-content-wrapper").load(url);
};


/**
 *
 * @param str 原始字符串
 * @param key 用于切割的字符
 * @example  “张三 李四   ”最后返回["张三"，“李四”]
 */
var getArrFromStr=function(str,key){
    var arr=(dt.trim(str)).split(key);
    return arr;
};

$(document).ready(function () {
    $(".sub-menu li").click(function () {
        $(this).addClass("nav-active").siblings('li').removeClass('nav-active');
        $(this).parent().parent().siblings("li").find("li").removeClass("nav-active");
    });
    $("#confirm").click(function () {
        $('#confirmModal').modal('hide');
        $('.main-body').removeAttr('style');
        $('.main-body').css('background-color', '#f4f5f7');
        deleteConfirm();
    });
});
function openResetPwd() {
    $('#resetPwdModal').modal('show');
}
function resetPwd() {
    var confirmPwd=$('#confirmPwd').val();
    $.post("/login/reset/", {
        managerPwd: confirmPwd
    }, function (data) {
        $('#reset').attr('disabled', false);
        if (data.code == BACK_RESULT_CODE.SUCCESS) {
            $('#tipsModal .modal-body').html(data.message);
            $('#tipsModal').modal('show');
            setTimeout(function () {
                $('#tipsModal').modal('hide');
            }, BACK_DELAY_TIME.TIPS);

        }
        else {
            $('#messageModal .modal-body').html(data.message);
            $('#messageModal').modal('show');
        }
    });
}