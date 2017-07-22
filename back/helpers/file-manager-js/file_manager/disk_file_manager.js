var xml = require('./xml_preparing')
var util = require('./utils')
var path = require('path')

var moment=require('moment');

var FileManager = require('./base_interface');
var DiskFileManager = function(options){}
DiskFileManager.prototipe = new FileManager({});


DiskFileManager.prototype.getFolders = function( $resourceType, $currentFolder ){
  // Map the virtual path to the local server path.
  var serverDir = util.serverMapFolder( $resourceType, $currentFolder, 'GetFolders' ) ;
  var foldersAndFiles = util.getFilesAndFolders(serverDir);
  var xmlFoldersObj = xml.prepareFoldersObject(foldersAndFiles.folders);
  return [xmlFoldersObj] 
}

DiskFileManager.prototype.getFoldersAndFiles = function( resourceType, currentFolder ){
  // Map the virtual path to the local server path.
  var serverDir = util.serverMapFolder( resourceType, currentFolder, 'GetFoldersAndFiles' ) ;
  var foldersAndFiles = util.getFilesAndFolders(serverDir);
  var xmlFoldersObj = xml.prepareFoldersObject(foldersAndFiles.folders);
  var xmlFilesObj = xml.prepareFilesObject(foldersAndFiles.files);
  return [xmlFoldersObj, xmlFilesObj] 
}

DiskFileManager.prototype.createFolder = function( resourceType, currentFolder, newFolderName ){
  var errorNumber = '0';
  var errorMsg    = '';

  if ( newFolderName ){
    newFolderName = util.sanitizeFolderName( newFolderName ) ;
    // Map the virtual path to the local server path of the current folder.
    var serverDir = util.serverMapFolder( resourceType, currentFolder, 'CreateFolder' ) ;

    try{
      util.createDirIfNotExists( '', serverDir + newFolderName ) ;
    } catch(err){
        errorNumber = '103';
    }
  } else {
    errorNumber = '102' ;
  }

  return {number: errorNumber, text: errorMsg}
}


DiskFileManager.prototype.fileUpload = function(req, resourceType, currentFolder, sCommand, callback ){

  //cuckoo@20170204
  //customize currentFolder
  if (currentFolder=='/'){
      // currentFolder=currentFolder+moment().format('YYYYMM')+'/';
      //modified by XT@20170301
      currentFolder = currentFolder + moment().format('YYYY') + "/" + moment().format('MM') + "/" + moment().format('DD') + '/';
  }
  var errorNumber = 0 ; //0 means OK!
  var fileName = '' ;
    var resourceTypeName = resourceType;
  var serverDir = util.serverMapFolder( resourceType, currentFolder, sCommand ) ;


  var defaultStorageOptions = {
    dirname: serverDir,
    maxBytes: 100000000,  //cuckoo change to 100M limitation
    saveAs: function (__newFileStream,cb) {
      //重命名 @cuckoo
      var ext=  path.extname(__newFileStream.filename);//获取后缀名，含.
      var extNoDot=ext.substr(1);
        //判断上传类型 by NM
        if (resourceTypeName == 'Image') {
            if (!util.isAllowedImageFileType(extNoDot)) {
                //TODO:临时方案 by cuckoo
                //如果上传非法后缀名，则统一定义文件名为 invalid_file
                __newFileStream.filename = 'invalid_file';
            }
            else if (ext == "" || ext == ".") {
                __newFileStream.filename = 'invalid_file';
            }
            else {
                __newFileStream.filename = moment().format('YYYYMMDDHHmmssSSSS') + ext;
            }
            cb(null, __newFileStream.filename);
        }
        else if (resourceTypeName == 'File') {
            if (!util.isAllowedFileFileType(extNoDot)) {
                //TODO:临时方案 by cuckoo
                //如果上传非法后缀名，则统一定义文件名为 invalid_file
                __newFileStream.filename = 'invalid_file';
            }
            else if (ext == "" || ext == ".") {
                __newFileStream.filename = 'invalid_file';
            }
            else {
                __newFileStream.filename = moment().format('YYYYMMDDHHmmssSSSS') + ext;
            }
            cb(null, __newFileStream.filename);
        }
        else if (resourceTypeName == 'Flash') {
            if (!util.isAllowedVideoFileType(extNoDot)) {
                //TODO:临时方案 by cuckoo
                //如果上传非法后缀名，则统一定义文件名为 invalid_file
                __newFileStream.filename = 'invalid_file';
            }
            else if (ext == "" || ext == ".") {
                __newFileStream.filename = 'invalid_file';
            }
            else {
                __newFileStream.filename = moment().format('YYYYMMDDHHmmssSSSS') + ext;
            }
            cb(null, __newFileStream.filename);
        }
        else if (resourceTypeName == 'Media') {
            if (!util.isAllowedVideoFileType(extNoDot)) {
                //TODO:临时方案 by cuckoo
                //如果上传非法后缀名，则统一定义文件名为 invalid_file
                __newFileStream.filename = 'invalid_file';
            }
            else if (ext == "" || ext == ".") {
                __newFileStream.filename = 'invalid_file';
            }
            else {
                __newFileStream.filename = moment().format('YYYYMMDDHHmmssSSSS') + ext;
            }
            cb(null, __newFileStream.filename);
        }
    }
  }

  var fileFieldName = sCommand == 'QuickUpload' ? 'upload' : 'NewFile';

  req.file(fileFieldName).upload(defaultStorageOptions, function (err, uploadedFiles) {
      //cuckoo@20170204
      //customize error
      if(err){
           if (err.code == 'E_EXCEEDS_UPLOAD_LIMIT'){
               return callback(err, {errorNumber: 1, fileUrl: '', fileName: '', customMsg: '上传文件超过限制大小'});
           }
          return callback(err, {errorNumber: 1, fileUrl: '', fileName: '', customMsg: err.message})
      }

    if(uploadedFiles.length){
      fileName = uploadedFiles[0].filename;
      var fileUrl = util.combinePaths( util.getResourceTypePath( resourceType, sCommand ) , currentFolder ) ;
      fileUrl = util.combinePaths( fileUrl, fileName ) ;

        if (fileName == 'invalid_file') {
            return callback(err, {errorNumber: 1, fileUrl: fileUrl, fileName: fileName, customMsg: '上传的文件格式不符合要求'});
        }
      //add prefix @cuckoo
      fileUrl = '/upload'+fileUrl;
        return callback(err, {errorNumber: errorNumber, fileUrl: fileUrl, fileName: fileName, customMsg: ''})
    }
  });
}




module.exports = DiskFileManager