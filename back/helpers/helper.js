/**
 * Created by HJ on 2017-03-23.
 */
var crypto = require('crypto');
var Constant = require('../configs/Constant');
var fs=require('fs');
var moment=require('moment');
var underscore=require('underscore');


const Helper = module.exports = {};
Helper.md5 = function md5(content) {
    var md5 = crypto.createHash('md5');
    md5.update(content);
    var d = md5.digest('hex');  //加密后的值d
    return d;
};
Helper.getReturnJson = function getReturnJson(code) {
    var jsonObj;
    if (code === Constant.RESULT_STATUS.SUCCESS) {
        jsonObj = JSON.parse(Constant.RETURN_JSON.SUCCESS);

    } else {
        jsonObj = JSON.parse(Constant.RETURN_JSON.FAILED);
    }
    return jsonObj;
};


Helper.filterEmoji=function(str){
    var ranges = [
        '\ud83c[\udf00-\udfff]',
        '\ud83d[\udc00-\ude4f]',
        '\ud83d[\ude80-\udeff]'
    ];
    var res = str.replace(new RegExp(ranges.join('|'), 'g'), '');
    var resTemp=encodeURIComponent(res);
    return resTemp;
    // var res=str.replace(/["'<>%;)(&+]/,"");
    // return res;
};

Helper.formatutc = function (utcstring) {
    if(utcstring===null||utcstring===undefined||utcstring===""){
        return "";
    }
    else {
        return moment(utcstring).format("YYYY-MM-DD HH:mm");
    }

};

//对数组进行分页@XT@2017年6月20日
Helper.pagination=function(pageNo, pageSize, array) {
    var offset = (pageNo - 1) * pageSize;
    return (offset + pageSize >= array.length) ? array.slice(offset, array.length) : array.slice(offset, offset + pageSize);
};



//从session中获取栏目名称
Helper.getColumnNameById=function (req,columnIdStr,callback) {
    var columnId=parseInt(columnIdStr);
    var columnGroup=req.session.menu;
    var parentColumnName="父级栏目",subColumnName="子集栏目";
    if(columnGroup&&columnId)
    {
        var subColumnListTemp=underscore.pluck(columnGroup,"columnList");//获取子集列表，但是有层级嵌套关系
        var subColumnList=underscore.flatten(subColumnListTemp);//获取完整的自己列表，去除了嵌套关系
        var subColumnObj=(underscore.where(subColumnList,{"columnId":columnId}))[0];//获取子集obj
        subColumnName=subColumnObj.columnTitle;//获取子集title
        var parentColumnId=subColumnObj.parentColumnId;//从子集obj中拿到parentColumnId
        var parentColumnObj=(underscore.where(columnGroup,{"columnId":parentColumnId}))[0];//获取父级obj
        parentColumnName=parentColumnObj.columnTitle;//获取父级title
    }
    callback(parentColumnName,subColumnName);
};

Helper.postTypeFormat=function (postType) {
    var newPostType;
    if(postType==1){
        newPostType=[2,3]
    }else if(postType==2){
        newPostType=[5];
    }else if(postType==3){
        
    }
};
Helper.getCountDays=function(year,month) {
    var curDate = new Date(year,parseInt(month-1),1);
    /* 获取当前月份 */
    var curMonth = curDate.getMonth();
    /*  生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
    curDate.setMonth(curMonth + 1);
    /* 将日期设置为0,获取当月最后一天日期*/
    curDate.setDate(0);
    /* 返回当月的天数 */
    return curDate.getDate();
};

//登录判断
Helper.isLoginFun=function (req) {
    //应聘者是否登录
    var isLogin=0;//未登录

    if(req.session.authorized)
    {
        //TODO 区分不同角色登录
        isLogin=req.session.manager.roleType;//1应聘者登录,2管理员
    }
    return isLogin;
};

//登陆判断
Helper.authorize=function(req, res, next){
    if(req.session.authorized)
        return next();
    //未登录时，调转登录页面
    if (req.url=== '/back/index')
        res.redirect(303,'/login');
    else
    {
        //如果是ajax post调用时
        if (req.method=='POST'&&req.xhr){
            var jsonObj = JSON.parse('{"code":-1,"message":"登录超时，请退出重新登录"}');
            res.send(jsonObj);
        } else {
            res.render("common/timeout", {layout: null});
        }
    }
};