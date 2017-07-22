/**
 * Created by HUI on 2017/7/4.
 */


var ManagerModel = require('../../models/index').manager;
// var ViManagerModel=require('../../models/index').vi_back_manager;
var Helper=require('../../helpers/helper');
var Constant = require('../../configs/constant');
var underscore=require('underscore');
const Manager = module.exports = {};

//登陆使用
Manager.getUserInfoByUserName= function (req, callback) {
    var  userName=req.body.userName;
    var passWdMd5=Helper.md5(req.body.password);
    var resultData;
    var retCode=0;
    ManagerModel.findOne({
        where:{
            manager_name:userName
        }
    }).then(function(manager){
        if(manager)
        {
            resultData=manager;
            // if(manager.role_status===Constant.COMMON_STATUS.TRUE) {
            if (manager.manager_status === Constant.COMMON_STATUS.TRUE) {
                if (manager.manager_pwd_md5 === passWdMd5) {
                    //一切正常
                    retCode = Constant.LOGIN_STATUS.NORMAL;
                }
                else {
                    //密码错误
                    retCode = Constant.LOGIN_STATUS.USER_PASSWORD_ERROR
                }
            }
            else {
                //有该用户，但是被禁用了
                retCode = Constant.LOGIN_STATUS.USER_REFUSED;
            }
            // }
            // else {
            //
            //     //有该用户，但是角色被禁用了
            //     retCode = Constant.LOGIN_STATUS.ROLE_REFUSED;
            // }
        }
        else
        {
            //用户不存在
            retCode=Constant.LOGIN_STATUS.USER_NOT_EXIST;
        }
        callback(retCode,resultData)
    })
};


// //获取列表
// Manager.getManagerList=function(pageIndex,keyword,managerStatus,callback){
//     if(managerStatus===undefined){
//         managerStatus="";
//     }
//     var searchObj={
//         manager_real_name:{ $like: '%'+keyword+'%' },
//         manager_status:managerStatus===""?{$like:'%'}:managerStatus
//     };
//     ViManagerModel.findAndCountAll({
//         where:searchObj,
//         offset:(pageIndex-1) * Constant.PAGE_SIZE,
//         limit: Constant.PAGE_SIZE,
//         order:'create_time desc'
//     }).then(function(res){
//         callback(res);
//     });
// };

// //获取详情
// Manager.getDetailById=function(manager_id){
//     return ViManagerModel.find({where:{manager_id:manager_id}});
// };

//编辑管理员
// Manager.editById=function (req,callback) {
//     var managerPwdMd5=req.body.manager_pwd_md5;
//     var managerAfterUpdate={
//         manager_name:req.body.manager_name,
//         manager_real_name:req.body.manager_real_name,
//         manager_status:req.body.manager_status,
//         telephone:req.body.telephone,
//         update_time:new Date(),
//         role_id:req.body.role_id,
//         operator_id:req.session.manager.userId
//     };
//     if(managerPwdMd5!=="0|0|0|0")
//     {
//         managerAfterUpdate["managerPwdMd5"]=Helper.md5(managerPwdMd5);
//     }
//     ManagerModel.find({where:{manager_id:req.body.manager_id}}).then(function (user) {
//         if(user.telephone==req.body.telephone){
//             ManagerModel.update(managerAfterUpdate, {
//                 where:{manager_id:req.body.manager_id}
//             }).then(function (res) {
//                 if (res.length>0) {
//                     callback(Constant.DB_RESULT.SUCCESS);//1 表示添加成功
//                 } else {
//                     callback(Constant.DB_RESULT.FAILED);
//                 }
//             })
//         }
//         else {
//             ManagerModel.find({where:{telephone:req.body.telephone}}).then(function (phone) {
//                 if(phone!==null){
//                     callback(2);//手机号已存在
//                 }
//                 else {
//                     ManagerModel.update(managerAfterUpdate, {
//                         where:{manager_id:req.body.manager_id}
//                     }).then(function (res) {
//                         if (res.length>0) {
//                             callback(Constant.DB_RESULT.SUCCESS);//1 表示添加成功
//                         } else {
//                             callback(Constant.DB_RESULT.FAILED);
//                         }
//                     })
//                 }
//             })
//         }
//     })
//
//
// };

// //添加管理员
// Manager.add=function(req,callback){
//     ManagerModel.find({where:{telephone:req.body.telephone}}).then(function (phone) {
//         if(phone!==null){
//             callback(2);//手机号已存在
//         }else {
//             ManagerModel.create({
//                     manager_name:req.body.manager_name,
//                     manager_real_name:req.body.manager_real_name,
//                     manager_status:req.body.manager_status,
//                     telephone:req.body.telephone,
//                     manager_pwd_md5:Helper.md5(req.body.manager_pwd_md5),
//                     create_time:new Date(),
//                     update_time:new Date(),
//                     role_id:req.body.role_id,
//                     operator_id:req.session.manager.userId
//                 }
//             ).then(function (res) {
//                 if (res.dataValues) {
//                     callback(Constant.DB_RESULT.SUCCESS);//1 表示添加成功
//                 } else {
//                     callback(Constant.DB_RESULT.FAILED);
//                 }
//             })
//         }
//     });
//
//
//
// };




// /**
//  * 获取管理员的名称列表，用于查重
//  * @param managerName 可空，比较的对象
//  * @param callback
//  * @author XT
//  * @date 2017年6月20日
//  */
// Manager.getManagerAccountList=function(managerName,callback){
//     ManagerModel.findAll({
//         where:{
//             manager_name:{
//                 $ne:managerName
//             }
//         },
//         attributes:["manager_name"]
//     }).then(function(res){
//         var result=underscore.pluck(underscore.pluck(res,"dataValues"),"manager_name");
//         callback(result);
//     })
// };