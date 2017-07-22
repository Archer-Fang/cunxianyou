var path = require('path');

var mainConfig = {
  user_file_path : '/www/',
  user_file_abs_path : ''
};

var defaultConfig = {
  user_file_path : '/www/',
  user_file_abs_path : '',
  Enabled: true,
  UserFilesPath: mainConfig.user_file_path,
  UserFilesAbsolutePath: mainConfig.user_file_abs_path,
  ForceSingleExtension: true,
  SecureImageUploads: true,
  ConfigAllowedCommands: ['QuickUpload', 'FileUpload', 'GetFolders', 'GetFoldersAndFiles', 'CreateFolder'],
  ConfigAllowedTypes: ['File', 'Image', 'Flash', 'Media'],
  HtmlExtensions: ["html", "htm", "xml", "xsd", "txt", "js"],
  ChmodOnUpload: 0777,
  ChmodOnFolderCreate: 0777,
    // ConfigAllowedFiles: ['7z', 'aiff', 'asf', 'avi', 'bmp', 'csv', 'doc','docx', 'fla', 'flv', 'gif', 'gz', 'gzip', 'jpeg', 'jpg', 'mid', 'mov', 'mp3', 'mp4', 'mpc', 'mpeg', 'mpg', 'ods', 'odt', 'pdf', 'png', 'ppt', 'pptx','pxd', 'qt', 'ram', 'rar', 'rm', 'rmi', 'rmvb', 'rtf', 'sdc', 'sitd', 'swf', 'sxc', 'sxw', 'tar', 'tgz', 'tif', 'tiff', 'txt', 'vsd', 'wav', 'wma', 'wmv', 'xls','xlsx', 'xml', 'zip','bmp','gif','jpeg','jpg','png','aiff', 'asf', 'avi', 'mid', 'mov', 'mp3', 'mp4', 'mpc', 'mpeg', 'mpg',  'qt', 'ram', 'rm', 'rmi', 'rmvb',  'tif', 'tiff', 'wav', 'wma', 'wmv'],
    ConfigAllowedImageFiles: ['bmp', 'gif', 'jpeg', 'jpg', 'png'],
    ConfigAllowedFileFiles: ['7z', 'bmp', 'csv', 'doc', 'gif', 'gz', 'gzip', 'jpeg', 'jpg', 'mid', 'mp3', 'ods', 'odt', 'pdf', 'png', 'ppt', 'pxd', 'ram', 'rar', 'rmi', 'rtf', 'tif', 'tiff', 'txt', 'vsd', 'xls', 'zip', 'docx', 'xlsx', 'pptx'],
    ConfigAllowedVideoFlies: ['swf', 'flv', 'aiff', 'asf', 'avi', 'bmp', 'fla', 'flv', 'mid', 'mov', 'mp3', 'mp4', 'mpc', 'mpeg', 'mpg', 'png', 'qt', 'ram', 'rm', 'rmi', 'rmvb', 'swf', 'tif', 'tiff', 'wav', 'wma', 'wmv'],
    AllowedExtensions: {
      File: ['7z', 'bmp', 'csv', 'doc', 'gif', 'gz', 'gzip', 'jpeg', 'jpg', 'mid', 'mp3', 'ods', 'odt', 'pdf', 'png', 'ppt', 'pxd', 'ram', 'rar', 'rmi', 'rtf', 'tif', 'tiff', 'txt', 'vsd', 'xls', 'zip', 'docx', 'xlsx', 'pptx'],
    Image: ['bmp','gif','jpeg','jpg','png'],
    Flash: ['swf','flv'],
      Media: ['aiff', 'asf', 'avi', 'bmp', 'fla', 'flv', 'mid', 'mov', 'mp3', 'mp4', 'mpc', 'mpeg', 'mpg', 'png', 'qt', 'ram', 'rm', 'rmi', 'rmvb', 'swf', 'tif', 'tiff', 'wav', 'wma', 'wmv']
  },
  DeniedExtensions: {
    File: [],
    Image: [],
    Flash: [],
    Media: []
  },
  FileTypesPath: {
    File: mainConfig.user_file_path + 'file/',
    Image: mainConfig.user_file_path + 'image/',
    Flash: mainConfig.user_file_path + 'flash/',
    Media: mainConfig.user_file_path + 'media/',
  },
  FileTypesAbsolutePath:{
    File: mainConfig.user_file_abs_path == '' ? '' : mainConfig.user_file_abs_path +'file/',
    Image: mainConfig.user_file_abs_path == '' ? '' : mainConfig.user_file_abs_path + 'image/',
    Flash: mainConfig.user_file_abs_path == '' ? '' : mainConfig.user_file_abs_path + 'flash/',
    Media: mainConfig.user_file_abs_path == '' ? '' : mainConfig.user_file_abs_path + 'media/',
  },
  QuickUploadPath: {
    File: mainConfig.user_file_path + 'file/',
    Image: mainConfig.user_file_path + 'image/',
    Flash: mainConfig.user_file_path + 'flash/',
    Media: mainConfig.user_file_path + 'media/',
  },
  QuickUploadAbsolutePath: {
    File: mainConfig.user_file_abs_path,
    Image: mainConfig.user_file_abs_path,
    Flash: mainConfig.user_file_abs_path,
    Media: mainConfig.user_file_abs_path,
  }
}

module.exports =  defaultConfig ;