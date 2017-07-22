/**
 * Created by HUI on 2017-01-04.
 */

var DT_CLICK="click";//点击事件，手机端要换为tap，执行速度快
var UA_LOCAL=navigator.userAgent;
if(/ipad|iphone|andriod/.test(UA_LOCAL))//如果设置是移动设备的话，则执行tap事件
{
    DT_CLICK='tap';
}

/**
 * 当前环境
 * DEV开发环境
 * PRE_PROD预上线版本
 * PROD正式版本
 * @type {{DEV: number, PRE_PROD: number, PROD: number}}
 * */
var enumEnvironment={
    DEV:1,
    PRE_PROD:2,
    PROD:3
};

/**
 * 定义当前环境为 DEV
 * @type {number}
 */
var DT_ENVIRONMENT=enumEnvironment.DEV;

//后台操作类型
var BACK_OPERATE = {
    EDIT: 'edit',
    ADD: 'add'
};
//后台结果code
var BACK_RESULT_CODE = {SUCCESS: 1, FAILED: -1};
//延迟时间
var BACK_DELAY_TIME = {TIPS: 2000};

//支持IE9以上的版本
var IE_VERSION = 8;
//配置信息类别
var CONFIG_TYPE={
    TEXT:1,
    IMAGE:2,
    VIDEO:3

};
//后台通用状态 1:启用，-1:禁用
var BACK_COMMON_STATUS={
    ENABLE:1,
    DISABLE:-1
};


//后台页码
var PAGE_SIZE_GLOBAL=20;


//选择框，学历
var SELECTOR_EDUCATION=[
    {
        value:1,
        text:"高中"
    },
    {
        value:2,
        text:"职高"
    },
    {
        value:3,
        text:"大专"
    },
    {
        value:4,
        text:"本科"
    },
    {
        value:5,
        text:"硕士研究生"
    },
    {
        value:6,
        text:"博士研究生"
    },
    {
        value:7,
        text:"硕士（七年制）"
    },
    {
        value:8,
        text:"博士（八年制）"
    }
];

var SELECTOR_DEGREE=[
    {
        value:1,
        text:"无学位"
    },
    {
        value:2,
        text:"学士学位"
    },
    {
        value:3,
        text:"硕士学位"
    },
    {
        value:4,
        text:"博士学位"
    }
];
//院区枚举
var HOSPITAL_DISTRICT=[
    {
        value:1,
        text:"朝晖院区"
    },
    {
        value:2,
        text:"望江山院区"
    }
];

//登录权限
var USER_ROLE={WORKER: 2, USER: 1};


var DATE_PICKER_OPTIONS={
    MONTH:{
        language:'zh-CN',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 'year',
        minView: 4,
        forceParse: 1,
        format: 'yyyy-mm'
    },
    YEAR:
        {
            language:'zh-CN',
            weekStart: 1,
            todayBtn:  1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 'decade',
            minView: 'decade',
            forceParse: 0,
            format: 'yyyy'
        }
};

//已弃用
//自动保存数据的时间差
var AUTO_SAVE_TIME=5*1000;//10秒钟

//短信验证码相关配置
var SMS_CONFIG={
    TIME:59,
    API_URL:"placeholder"
};