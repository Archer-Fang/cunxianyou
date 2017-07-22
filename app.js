var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');

//引入session模块
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs= require('hbs');
var hbsHelper=require('./back/helpers/hbs-helper');

var router=require('./router');

var app = express();

//项目根目录，全局变量
global.appRoot = path.resolve(__dirname);

// 设置html类型的hbs
app.set('view engine', 'html');
app.engine('html', hbs.__express);

//支持多个views
app.set('views', [path.join(__dirname, 'back/views'),path.join(__dirname, 'front/views')]);


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//设置前后台公共静态目录
app.use(express.static(path.join(__dirname, 'public')));

//设置专用上传相关的静态路径
app.use("/upload", express.static(path.join(__dirname, 'upload')));

//设置后台静态目录
app.use("/back", express.static(path.join(__dirname, 'back/assets/')));

//设置前台静态目录
app.use("/front", express.static(path.join(__dirname, 'front/assets/')));


app.use(cookieParser());
// 设置 Session
app.use(session({
    secret: 'dreamtouch',
    name: 'zjems.dreamtouch',
    cookie: {maxAge: 120 * 60 * 1000}, //120min超时
    resave: true,
    rolling:true,
    saveUninitialized: false
}));


hbsHelper.init();

//路由管理
router.route(app);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send(err.toString());
});


module.exports = app;
