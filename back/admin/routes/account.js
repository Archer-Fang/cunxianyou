/**
 * Created by XT on 2017/7/4.
 * 账户相关路由
 */

var express = require('express');
const Constant=require('../../configs/constant');
var router = express.Router();
const manager=require("../business/manager");
var util = require('util');
var underscore=require('underscore');


router.get('/login', function(req, res, next) {
    res.render("account/login", {layout: null});
});

router.post("/login/authorize",function(req, res) {
    //通过用户名取到用户信息
    manager.getUserInfoByUserName(req, function (code, result) {
        req.session.authorized=false;
        var jsonObj;
        if (code === Constant.LOGIN_STATUS.USER_NOT_EXIST) {
            jsonObj = JSON.parse('{"code":-1,"message":"用户不存在"}');
        }
        else if (code === Constant.LOGIN_STATUS.USER_REFUSED) {
            jsonObj = JSON.parse('{"code":-1,"message":"用户已被禁用"}');
        }
        else if (code === Constant.LOGIN_STATUS.ROLE_REFUSED) {
            jsonObj = JSON.parse('{"code":-1,"message":"角色已被禁用"}');
        }
        else if (code === Constant.LOGIN_STATUS.NORMAL) {
            req.session.manager = {
                'manager_name': result.manager_name,
                'manager_id': result.manager_id,
                'manager_real_name': result.manager_real_name
            };//保存用户session信息
            req.session.authorized = true;
            jsonObj = {code:1, message:"登录成功"};
        }
        else if (code === Constant.LOGIN_STATUS.USER_PASSWORD_ERROR) {
            jsonObj ={code:-1,message:"密码错误"};
        }
        else {
            var messageTemp=util.format("系统错误：%s",result);
            jsonObj= {code:-1,message:messageTemp};
        }
        res.send(jsonObj);
    });
});

router.get('/login/logout', function (req, res) {
    delete req.session.manager;
    delete req.session.menu;
    req.session.error = null;
    req.session.authorized = false;
    res.redirect('/login');
});

module.exports = router;