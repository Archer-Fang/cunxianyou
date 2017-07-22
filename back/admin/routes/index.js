/**
 * Created by HUI on 2017/7/4.
 */


var express = require('express');
var router = express.Router();

var Constant=require('../../configs/constant');
var util=require('util');
var moment=require("moment");
var Helper=require('../../helpers/helper');
var formidable=require('formidable');
var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');
var underscore=require('underscore');
var browser = require('../../helpers/file-manager-js/browser');

const column=require('../business/column');//menu已改为新写法


//后台首页
router.use('/back/index',function (req, res, next) {
    column.init(req, function (code, column) {
        if (code>0){
            res.render("layout/index", {
                layout: null,
                list: column,
                column_list: column.column_list,
                manager_real_name: req.session.manager.manager_real_name
            });
        }
        else
        {
            //TODO:render到错误信息页
        }
    });
});




var uploadServerPath = "";//存储上去的文件路径
router.use("/back/attach/upload", function (req, res,next) {

    //如果后缀中有userId,则创建文件夹的时候以id为文件夹
    var userId=req.query.userId;



    // create an incoming form object
    var form = new formidable.IncomingForm();

    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = true;

    var type = req.query.type;

    // var dateDirectory = moment().format('YYYY') + "/" + moment().format('MM') + "/" + moment().format('DD');
    if(userId) {type=userId+"/"+type;}

    // var saveUrl = '/upload/www/' + type + "/" + dateDirectory;
    var saveUrl = '/upload/www/' + type;

    var tempUrl = path.join(global.appRoot, saveUrl);
    // store all uploads in the /uploads directory
    //创建文件夹
    mkdirp.sync(tempUrl, function (err) {
        if (err) {
            console.error(err);
        }
        else {
        }
    });

    form.uploadDir = tempUrl;
    var tempFileName;

    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    form.on('file', function (field, file) {

        var fileNameTemp = file.name;//获取文件真实名称（含后缀）

        //2017年2月14日修改文件名格式为统一格式@XT
        var ext = path.extname(fileNameTemp);//获取后缀名，含.

        //重命名文件名（带后缀），统一格式@XT
        var fileName = moment().format('YYYYMMDDHHmmssSSSS') + ext;
        tempFileName=fileName;
        fs.rename(file.path, path.join(form.uploadDir, fileName));
        uploadServerPath = saveUrl + "/" + fileName;
    });

    // log any errors that occur
    form.on('error', function (err) {
        console.log('An error has occured: \n' + err);
    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', function () {
        var result = {
            "state": "success",
            "serverPath": uploadServerPath,
            "dirPath":tempUrl+ "/" + tempFileName
        };
        res.end(JSON.stringify(result));
    });
    // parse the incoming request containing the form data
    form.parse(req);
});
module.exports = router;