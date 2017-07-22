/**
 * Created by HUI on 2017-01-04.
 * 此方法库是前台后台都可能会用到的工具方法
 */


/**
 * dt函数库
 * @type {{post: dt.post, trim: dt.trim, isEmpty: dt.isEmpty, back: dt.back, getQueryString: dt.getQueryString, log: dt.log, replaceBr: dt.replaceBr}}
 */
var dt= {
    /**
     *ajax的封装（post）
     * @param funcName  请求的方法名
     * @param argsData 入参
     * @param successFunc 成功的回调函数
     * @param errorFunc 失败的回调函数
     */
    post:function(funcName,argsData,successFunc,errorFunc){
        var UA=navigator.userAgent;
        var TOKEN="dreamtouch";
        var DT_API = API_URL + "?timeStamp=" + new Date().getTime();
        var argsIn={
            "apicode": funcName,
            "args": argsData,
            "deviceinfo":UA,
            "token":TOKEN
        };
        $.ajax({
            type: 'post',
            url: DT_API,
            data: JSON.stringify(argsIn),
            crossDomain: true == !(document.all),
            dataType: 'json',
            success: function (data) {
                //开发阶段，ajax获取的结果console出来
                //dt.log(JSON.stringify(data));
                successFunc(data);
            },
            error:function(err){
                // TODO:此处增加一些 400 500等错误的提示
                errorFunc(err);
            }
        });
    },

    /**
     * trim函数表示去除 字符串前后 的空格
     * u3000 空格  u00A0 不间断空格
     * @param str
     * @returns {XML|void|string}
     */
    trim: function (str) {
        return str.replace(/^(\u3000|\s|\t|\u00A0)*|(\u3000|\s|\t|\u00A0)*$/g, "");
    },
    /**
     * 去除字符串所有空格
     */
    trimAll: function (str) {
        return str.replace(/\s/g,"");//去除所有空格
    },
    /**
     * 判断是否为空
     * 先判断是否为undefined，在判断是否为null，最后判断如果是字符串的话，是否是“”
     * 满足以上任何一种则返回true，其余情况返回false
     * @param obj
     * @returns {boolean}
     */
    isEmpty: function (obj) {
        if (obj === undefined) {
            return true;
        } else if (obj === null) {
            return true;
        } else if (typeof obj === "string") {
            if (this.trim(obj) ==="") {
                return true;
            }
        }
        return false;
    },

    /**
     * 返回上一页
     */
    back: function () {
        history.back();
    },

    /**
     * 获取地址栏参数的方法
     * @example http://www.test.com?name=zhangsan&age=15，获取age为：dt.getQueryString("age")
     * @param name 参数名
     * @returns {*} 返回参数值或者null
     */
    getQueryString:function(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!==null)return  decodeURIComponent(r[2]); return null;
    },

    /**
     * 正式环境下不打印 str
     * @param str
     */
    log:function (str) {
        if(DT_ENVIRONMENT!=enumEnvironment.PROD)
        {
            console.log(str);
        }
    },
    /**
     * 去除换行
     * @param str
     */
    replaceBr:function (str) {
        return str.replace(/\r\n/g, "<br>");
    }
};



/** 格式化输入字符串**/

//用法: "hello{0}".format('world')；返回'hello world'

String.prototype.format= function(){
    var args = arguments;
    return this.replace(/\{(\d+)\}/g,function(s,i){
        return args[i];
    });
};



/**
 * 判断IE版本
 * @author XT
 * @date 2017年2月23日
 * @returns {boolean} 返回true表示当前环境>ie9（或不是ie），返回false表示当前环境<=ie9
 */
var judgeIEVersion = function () {
    var result = true;//是否是所需版本以上版本
    var ua = navigator.userAgent.toLowerCase();
    var isIE = ua.indexOf("msie") > -1;
    var version;
    if (isIE) {
        version = ua.match(/msie ([\d.]+)/)[1];
        var sa = parseInt(version);
        if (sa <= IE_VERSION) {
            result = false
        } else {
        }
    } else {
    }
    return result;
};

var judgeIEVersionAndLink = function () {
    if (!judgeIEVersion()) {
        window.location.href = "/download";
    }
};


//Unix日期转换
var unixDateFormat = function (dateStr, dateRule) {
    //dateStr=14030588040000
    //dateRule='yyyy-MM-dd h:m:s'
    var newDate = new Date();
    newDate.setTime(dateStr);
    return newDate.format(dateRule);
};

Date.prototype.format = function (format) {
    var date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
};


function getCountDays(year,month) {
    var curDate = new Date(year,parseInt(month-1),1);
    /* 获取当前月份 */
    var curMonth = curDate.getMonth();
    /*  生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
    curDate.setMonth(curMonth + 1);
    /* 将日期设置为0,获取当月最后一天日期*/
    curDate.setDate(0);
    /* 返回当月的天数 */
    return curDate.getDate();
}


/**
 * 初始化选择器
 * @param dataArr 数据源数组
 * @param selectDom 选择日期的dom元素
 * @author XT
 * @date 2017年7月11日
 */
var initSelector=function(dataArr,selectDom){
    var htmlStr="";
    _.map(dataArr,function(item){htmlStr=htmlStr+"<option value=\"{0}\">{1}</option>".format(item.value,item.text);});
    selectDom.append(htmlStr);
};


/**
 * 局部渲染
 * @param url 路由地址
 * @param dom dom的容器
 * @author XT
 * @date 2017年7月11日
 */
var loadPartList=function(url, dom){
    var ts = "?ts=" + Date.parse(new Date());
    if (url.indexOf("?") !== -1){url = url.replace('?', ts + "&");}
    else {url = url + ts;}
    dom.load(url);
};


/**
 * 重置表单验证（主要针对modal）
 * @param formDom
 * @author XT
 * @date 2017年7月11日
 * @remark reset方法只能在初始化后执行（可以在提交成功后进行重置）
 */
var resetFromValidate=function (formDom) {
    formDom.data('bootstrapValidator').destroy();
    formDom.data('bootstrapValidator', null);


    //清空表单内容
    formDom.find("input").val("");//清空输入框
    formDom.find("select").val("");//清空选择框
    formDom.find("textarea").val("");//清空多行输入框
    formDom.find("button").attr("disabled",false);//清空按钮禁用状态
    formDom.find(".dt-progress-box").removeClass("dt-progress-active");//隐藏上传附件的进度条
};









