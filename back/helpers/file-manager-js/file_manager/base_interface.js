/**
 * File manager interface
 * @module file_manager/base_interface
 * @description Base interface of file manager
 * @author Valya Grinchik valentina.grinchik@itexus.com
 */

var FileManager = function(options){

}

FileManager.prototype.getFolders = function(){};
FileManager.prototype.getFoldersAndFiles = function(){};
FileManager.prototype.createFolder = function(){};
FileManager.prototype.fileUpload = function(){};

module.exports = FileManager;