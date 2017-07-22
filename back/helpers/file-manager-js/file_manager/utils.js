var config = require('./config');
var fs = require('fs');
var path = require('path');

//added by XT@20170301
var mkdirp = require('mkdirp');




//modified by cuckoo@20170204
var BASE_FILES_PATH = path.resolve(__dirname + '/../../../../upload/');

var browserUtil = new function(){
  var self = this;

  this.isAllowedCommand = function( command ){
    return config['ConfigAllowedCommands'].join(',').indexOf( command ) >= 0;
  }

  this.isAllowedType = function( resourceType ){
    return config['ConfigAllowedTypes'].join(',').indexOf( resourceType ) >= 0;
  }
    // this.isAllowedFileType = function( fileType ){
    //   var fileTypeLower=fileType.toLocaleLowerCase();
    //     return config['ConfigAllowedFiles'].join(',').indexOf( fileTypeLower ) >= 0;
    // }
    //added by NM@20170304
    this.isAllowedImageFileType = function (fileType) {
        var fileTypeLower = fileType.toLocaleLowerCase();
        return config['ConfigAllowedImageFiles'].join(',').indexOf(fileTypeLower) >= 0;
    }
    this.isAllowedFileFileType = function (fileType) {
        var fileTypeLower = fileType.toLocaleLowerCase();
        return config['ConfigAllowedFileFiles'].join(',').indexOf(fileTypeLower) >= 0;
    }
    this.isAllowedVideoFileType = function (fileType) {
        var fileTypeLower = fileType.toLocaleLowerCase();
        return config['ConfigAllowedVideoFlies'].join(',').indexOf(fileTypeLower) >= 0;
    }
  this.setXmlHeaders = function(res){
    res.setHeader('Expires','Mon, 26 Jul 1997 05:00:00 GMT');
    res.setHeader('Last-Modified', new Date().toUTCString() );
    res.setHeader('Cache-Control','no-store, no-cache, must-revalidate');
    res.setHeader('Cache-Control','post-check=0, pre-check=0');
    res.setHeader('Pragma','no-cache');
    res.setHeader('Content-Type', 'text/xml; charset=utf-8');
  }

  this.isDirExists = function(dir){
    try{
      return fs.statSync(dir).isDirectory();
    }catch (err){
      return false;
    }
  }

  this.isFileExists = function(filepath){
    try{
      return fs.statSync(filepath).isFile();
    }catch (err){
      return false;
    }
  }

  this.prepareDirs = function(root, dirsArray){
    dirsArray.map(function(dir){
      if (!self.isDirExists(root + dir)){

          //modified by XT@20170301
          mkdirp.sync(root + dir, function (err) {
              if (err) console.error(err);
              else console.log('create dir success!')
          });
          // fs.mkdirSync(root + dir);
      }
    })
  };

  this.getBaseFilesPath = function(){
    return BASE_FILES_PATH;
  }

  this.getFilesAndFolders = function(dir){
    var folders = [] ;
    var files = [] ;

    var readFiles = fs.readdirSync(dir);
    for ( var i = 0 ; i < readFiles.length; i++ ){
      var fileStat = fs.statSync( dir + readFiles[i]);
      if (fileStat.isDirectory()){
        folders.push({name: readFiles[i], size: fileStat.size});
      }else if(fileStat.isFile()){
        files.push({name: readFiles[i], size: fileStat.size})
      }
    }
    return {folders: folders, files: files}
  }


  this.getResourceTypePath = function( resourceType, command ) {
    if ( command == "QuickUpload")
      return config.QuickUploadPath[resourceType];
    else
      return config.FileTypesPath[resourceType];
  }


  this.server_MapPath = function(filepath){
    return BASE_FILES_PATH + filepath ;
  }




  this.getResourceTypeDirectory = function( resourceType, command ){
    if ( command == "QuickUpload"){
      if ( strlen( config.QuickUploadAbsolutePath[resourceType] ) > 0 ){
        return config.QuickUploadAbsolutePath[resourceType];
      }

      // Map the "UserFiles" path to a local directory.
      return self.server_MapPath(config.QuickUploadPath[resourceType]);
    } else {
      if ( strlen( config.FileTypesAbsolutePath[resourceType] ) > 0 )
        return config.FileTypesAbsolutePath[resourceType] ;

      // Map the "UserFiles" path to a local directory.
      return self.server_MapPath( config.FileTypesPath[resourceType] ) ;
    }
  }

  this.serverMapFolder = function( resourceType, folderPath, command ){
    // Get the resource type directory.
    resourceTypePath = self.getResourceTypeDirectory( resourceType, command ) ;

    self.createDirIfNotExists('', resourceTypePath)
    // Return the resource type directory combined with the required path.
    return self.combinePaths( resourceTypePath , folderPath ) ;
  }


  this.combinePaths = function( basePath, folder ){
    return removeFromEnd( basePath, '/' ) + '/' + removeFromStart( folder, '/' ) ;
  }

  this.getUrlFromPath = function( resourceType, folderPath, command ){
    return self.combinePaths( self.getResourceTypePath( resourceType, command ), folderPath );
  }


  this.sanitizeFolderName = function( newFolderName ){
    newFolderName = stripslashes( newFolderName ) ;

    // Remove . \ / | : ? * " < >
    newFolderName = newFolderName.replace( '/\\.|\\\\|\\/|\\||\\:|\\?|\\*|"|<|>|[[:cntrl:]]/', '_' ) ;

    return newFolderName ;
  }
  

  this.createDirIfNotExists = function(root, dir){
    if (!self.isDirExists(root + dir)){

        //modified by XT@20170301
        mkdirp.sync(root + dir, function (err) {
            if (err) console.error(err);
            else console.log('create dir success!')
        });
        // fs.mkdirSync(root + dir);

        // fs.mkdirSync(root + dir);
    }
  }

  this.isDirExists = function(dir){
    try{
      return fs.statSync(dir).isDirectory();
    }catch (err){
      return false;
    }
  }

  function stripslashes( str ) { 
    return str.replace('/\0/g', '0').replace('/\(.)/g', '$1');
  }

  function strlen(str){
    return str.length;
  }

  function removeFromStart( sourceString, charToRemove ){
    var pattern = new RegExp('^' + charToRemove + '+'); 
    return sourceString.replace( pattern, '' );
  }

  function removeFromEnd( sourceString, charToRemove ){
    var pattern = new RegExp( charToRemove + '+$');
    return sourceString.replace( pattern, '');
  }
}

module.exports = browserUtil