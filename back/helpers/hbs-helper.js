/**
 * Created by XT on 2017-03-26.
 */
var hbs= require('hbs');
var moment = require('moment');

const hbsHelper = module.exports = {};
hbsHelper.init=function () {

    hbs.registerHelper({
        //section段落，用于js，css引用位置
        section : function(name, options){
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        },
        /**
         * 是否显示
         * @param value
         * @param opts
         * @returns {*}
         */
        if_isDisplay: function (value, opts) {
            if (value === 1) {
                return '是';
            } else if (value === -1) {
                return '否';
            } else {
                return '暂无数据';
            }
        },
        /**
         * 状态显示
         * @param value
         * @param opts
         * @returns {*}
         */
        if_commonStatus: function (value, opts) {
            if (value === 1) {
                return '启用';
            } else if (value === -1) {
                return '禁用';
            }
        },
        /**
         * 是否有数据，没有则显示---
         * @param value
         * @param opts
         * @returns {*}
         */
        if_null: function (value, opts) {
            if (value == null||value == undefined) {
                return '---';
            } else {
                return value;
            }
        },
        /**
         * 用户性别显示
         * @param value
         * @param opts
         * @returns {*}
         */
        sexFormat: function (value, opts) {
            var result="未知";
            switch(value)
            {
                case 1:
                    result="男";
                    break;
                case 2:
                    result="女";
                    break;
            }
            return result;
        },
        /**
         *根据value是否与reqValue相等来显示不同的dom结构
         * @param value 字段的值
         * @param reqValue 目标值（自己定义）
         * @param opts
         */
        if_commonReturnDom:function (value, reqValue, opts) {
            if(value===reqValue){
                return opts.fn(this);
            }
            else {
                return opts.inverse(this);
            }

        },
        /**
         *时间转换
         * @param dateStr 时间值
         * @param dateRule 时间格式 如YYYY-MM-DD HH:mm
         * @param opts
         * @returns {*}
         */
        nodeDateFormat: function (dateStr, dateRule, opts) {
            if(dateStr==null||dateStr==undefined||dateStr==""){
                return "---"
            }
            else {
                var timestamp = Date.parse(new Date(dateStr));
                var result = moment(timestamp).format(dateRule);
                return result;
            }
        },
        decodeUrl:function (str) {
            return decodeURIComponent(str);
        },
        /**
         * 去掉所有html标记
         * @param str
         */
        delHtmlTag:function delHtmlTag(str) {
            return str.replace(/<[^>]+>/g, "");//去掉所有的html标记
        }
    });
};