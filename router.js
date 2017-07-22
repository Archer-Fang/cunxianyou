/**
 * Created by XT on 2017/7/19
 */
// var FrontRoutes=require("./front/routes/index");//前台分路由
var BackRoutes=require("./back/admin/routes/index");//后台分路由
var LoginRoutes=require('./back/admin/routes/account');//登陆分路由
var Browser = require('./back/helpers/file-manager-js');//富文本编辑器上传附件
var Helper=require('./back/helpers/helper');//helper函数



const Router = module.exports = {};
Router.route=function (app) {

    //后台路由
    app.all('/back*',Helper.authorize,BackRoutes);


    //  //前台路由
    // app.all('/front*',FrontRoutes);

    //登录验证
    app.all('/login*', LoginRoutes);
    //编辑器上传附件的代码，必须放在formidable后面，因为skipper与formidable冲突
    app.use(require('skipper')());
    //ckeditor
    app.all('/browser/browse', Browser.browse);
    app.post('/uploader/upload', Browser.upload);
};