var extend = require('util')._extend;
var DiskFileManager = require('./disk_file_manager');
var S3FileManager = require('./s3_file_manager');



var FileManagerFactory = function(options){
  this.options = options;
  return this.build();
}

FileManagerFactory.prototype.build = function(){
  if(this.options.fs == 's3'){
    return new S3FileManager();
  }else{
    return new DiskFileManager();
  }
}

module.exports = FileManagerFactory