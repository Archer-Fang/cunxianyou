/**
 * Created by hj on 2017-02-03.
 */
module.exports = {
    PAGE_SIZE: 20,
    //数据查询结果
    DB_RESULT: {NONE: 0, SUCCESS: 1, FAILED: -1, REPEAT: 2},
    //前台返回值
    RESULT_STATUS: {SESSION_OUT: -100, SUCCESS: 1, FAILED: -1},
    //权限
    USER_ROLE: {WORKER: 2, USER: 1},
    //notice审核状态
    REVIEW_STATUS: {PASS: 2, SUBMIT: 1, FAILED: -1},
    //常规状态
    COMMON_STATUS: {TRUE: 1, FALSE: -1},

    //登录状态 created by XT @2017年4月17日
    LOGIN_STATUS:{

        //用户不存在
        USER_NOT_EXIST:0,

        //用户被禁用
        USER_REFUSED:3,

        //角色被禁用
        ROLE_REFUSED:4,

        //正常登录
        NORMAL:1,

        //密码错误
        USER_PASSWORD_ERROR:2
    },

    //父级栏目的parentId为-1
    PARENT_MENU:-1,

    //ConfigInfo类型
    CONFIG_INFO_TYPE:{

    },
    RETURN_JSON:{
        SUCCESS:'{"code":1,"message":"内容保存成功"}',
        DELETE_SUCCESS:'{"code":1,"message":"内容删除成功"}',
        FAILED:'{"code":-1,"message":"内容保存失败"}'

    }
};
