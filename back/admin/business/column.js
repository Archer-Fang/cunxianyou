/**
 * Created by HUI on 2017/7/4.
 */
ColumnModel = require('../../models/index').column;
// SubColumnModel = require('../../models/index').vi_back_sub_column;
// PermissionModel=require('../../models/index').permission;


var Manager=require('./manager');
var Constant = require('../../configs/constant');
// var Role=require('./role');
var underscore=require('underscore');

const Column = module.exports = {};

Column.init=function(req,callback){
    ColumnModel.findAll().then(function(columnGroup) {
        var columnDataFinal=[];
        //columnGroup是所有正常的column的集合，包含父级和子级

        //parentGroup是父级栏目的集合
        var parentGroup=underscore.where(columnGroup,{"parent_column_id":Constant.PARENT_MENU});

        //map循环
        underscore.map(parentGroup,function (item) {
            var columnIdTemp=item.column_id;
            var childrenGroup=underscore.where(columnGroup,{"parent_column_id":columnIdTemp});
            var columnObj={
                column_id:columnIdTemp,
                column_title:item.column_title,
                column_list:childrenGroup
            };
            columnDataFinal.push(columnObj);
        });

        if (columnDataFinal.length===0)
        {
            callback(Constant.DB_RESULT.NONE, 'no data');
        }
        else
        {
            /**
             * 将menu数据写入session，无需每次从数据库获取；下次登陆后更新数据
             * @author XT
             * @date 2017-06-08
             */
            req.session.menu=columnDataFinal;
            callback(Constant.DB_RESULT.SUCCESS, columnDataFinal);
        }
    })
};


// Column.getSubColumnList=function(roleId, callback){
//     // Role.getDetailById(roleId).then(function(roleData){
//     SubColumnModel.findAndCountAll({
//     }).then(function(subColumnData){
//         var count=subColumnData.count;
//         // var backColumnList=JSON.parse(roleData.back_menu_list);
//         var subColumnList=underscore.pluck(subColumnData.rows,"dataValues");
//         // underscore.map(subColumnList,function(item){
//         //     var columnId=item.column_id.toString();
//         //     var bindStatus=underscore.contains(backColumnList,columnId)?Constant.COMMON_STATUS.TRUE:Constant.COMMON_STATUS.FALSE;
//         //     item["bindStatus"]=bindStatus;
//         // });
//         var result={
//             rows:subColumnList,
//             count:count
//         };
//         callback(result);
//     })
//     // });
// };