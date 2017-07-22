
var browser = require('../file-manager-js');
module.exports = function (app,isLoggedIn) {
    app.all('/browser/browse', isLoggedIn, browser.browse);
    app.post('/uploader/upload', isLoggedIn, browser.upload);
};




