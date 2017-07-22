var util = require('./file_manager/utils');
var xml = require('./file_manager/xml_preparing');
var FileManagerFactory = require('./file_manager/file_manager_factory');
var browserCommand = new FileManagerFactory({fs:'disk'})

var path = require('path');
var rootPath = getRootPath();
var config = require('./file_manager/config');

//modified by cuckoo@20170204
util.prepareDirs(rootPath, ['/upload/'+ config.user_file_path]);

function strtr(str){
  str = str.replace(/\\\\/g, '\\\\');
  str = str.replace(/\"/g, '\\"');
  return str;
}

//Created by cuckoo @20170205
function getRootPath() {
    var appDir = path.dirname(require.main.filename);
    var rootPath=appDir.substr(0,appDir.length-4); //去掉 /bin
    return  rootPath;
}
module.exports = new function(){

  this.browse = function(req, res){

    //安全性验证 by cuckoo
    if(!req.session.authorized){
        return;
    }

    var command  = req.query.Command;
    var resourceType = req.query.Type;
    var currentFolder = req.query.CurrentFolder;

    if ( !command  || !resourceType || !currentFolder ){
      return ;
    }



    // Check if it is an allowed command
    if ( ! util.isAllowedCommand( command ) ){
      util.setXmlHeaders(res)
      return res.send(xml.renderError( 1, 'The "' + command + '" command isn\'t allowed'))
    }

    // Check if it is an allowed type.
    if ( ! util.isAllowedType( resourceType ) ){
      util.setXmlHeaders(res)
      return res.send(xml.renderError( 1, 'Invalid type specified')) ;
    }

      // File Upload doesn't have to Return XML, so it must be intercepted before anything.
    if ( command == 'FileUpload' ) {
      return browserCommand.fileUpload(req, resourceType, currentFolder, command, function(err, result){

        if (result.errorNumber && result.errorNumber != 201) {
          result.fileUrl = "";
          result.fileName = "";
        }

        return res.send("<script type='text/javascript'>\
        (function(){var d=document.domain;while (true){try{var A=window.parent.document.domain;break;}catch(e) {};d=d.replace(/.*?(?:\.|$)/,'');if (d.length==0) break;try{document.domain=d;}catch (e){break;}}})();\
        window.parent.OnUploadCompleted(" +  result.errorNumber + ",'" + strtr( result.fileUrl ) + "','" + strtr( result.fileName ) + "', '" +  strtr( result.customMsg ) + "') ;\
        </script>");

      }) ;

    } else if( command == 'CreateFolder'){
      util.setXmlHeaders(res)
      var newFolderName = req.query.NewFolderName;
      var errorObj = browserCommand.createFolder( resourceType, currentFolder, newFolderName ) ;
      return res.send(xml.renderError( errorObj.number, errorObj.text))
    }

    var foldersAndFiles  = {};
    switch ( command ){
      case 'GetFolders' :
        foldersAndFiles = browserCommand.getFolders( resourceType, currentFolder ) ;
        break ;
      case 'GetFoldersAndFiles' :
        foldersAndFiles = browserCommand.getFoldersAndFiles( resourceType, currentFolder ) ;
        break ;
    }
    util.setXmlHeaders(res)
    res.send(xml.renderXml(command, resourceType, currentFolder, foldersAndFiles));
  }

  this.upload = function(req, res){
    // //安全性验证 by cuckoo
    // if(!req.session.authorized){
    //   return;
    // }
    var command = 'QuickUpload';
    var resourceType = req.query.Type || 'File';
    var currentFolder = "/" ;

    // Check if it is an allowed command
    if ( ! util.isAllowedCommand( command ) ){
      return res.send(xml.renderError( 1, 'The "' + command + '" command isn\'t allowed'))
    }

    // Check if it is an allowed type.
    if ( ! util.isAllowedType( resourceType ) ){
      return res.send(xml.renderError( 1, 'Invalid type specified')) ;
    }

    var CKEcallback = req.query.CKEditorFuncNum;

    browserCommand.fileUpload(req, resourceType, currentFolder, command, function(err, result){

      if (result.errorNumber && result.errorNumber !== 201) {
        result.fileUrl = "";
        result.fileName= "";
      }
     
      var msg = "";
     
      switch (result.errorNumber )
      {
        case 0 :
          msg = "上传成功";
          break;
        case 1 :  // Custom error.
          msg = result.customMsg;
          break ;
        case 201 :
          msg = 'A file with the same name is already available. The uploaded file has been renamed to "' + result.fileName + '"' ;
          break ;
        case 202 :
          msg = 'Invalid file' ;
          break ;
        default :
          msg = 'Error on file upload. Error number: ' + result.errorNumber ;
          break ;
      }


      res.send("<script type='text/javascript'>\
      (function(){var d=document.domain;while (true){try{var A=window.parent.document.domain;break;}catch(e) {};d=d.replace(/.*?(?:\.|$)/,'');if (d.length==0) break;try{document.domain=d;}catch (e){break;}}})();\
      window.parent.CKEDITOR.tools.callFunction('" + CKEcallback + "','" + strtr(result.fileUrl) + "', '" + strtr( msg) + "');\
      </script>")
    });
  }
  
}