# file-manager-js
Nodejs implementation of FCKEditor’s File Manager (File Browser) feature integration in CKEditor

According article http://www.mixedwaves.com/2010/02/integrating-fckeditor-filemanager-in-ckeditor/ CKEditor does not provide the File Manager/File Browser that it used to provide by default in FCKEditor. This functionality is now provided by CKFinder, which is not a free product. 
This package provides Node.js implementation of FCKEditor’s File Manager (File Browser) feature integration in CKEditor.

## Installation

```
$ npm install https://github.com/itexussoft/file-manager-js.git --save
```

## Usage

```javascript
var browser = require('file-manager-js');

module.exports = function (app) {
  app.all('/browse_url', browser.browse);
  app.post('/upload_url', browser.upload);
}
```

In code above we have defined two routes, which we will use in CKEditor intialization code.
So first, that we need is download and put CKEditor in desired folder, for example /path_to_ckeditor/.
Then we need download latest version of FCKeditor (2.6.11) https://sourceforge.net/projects/fckeditor/files/FCKeditor/, copy filemanager folder to ckeditor plugins directory. 

The last thing you need is modify the CKEditor intialization code like below

```javascript
CKEDITOR.replace( 'editorId' , {
  filebrowserBrowseUrl: '/path_to_ckeditor/plugins/filemanager/browser/default/browser.html?Connector=/browse_url',
  filebrowserUploadUrl: '/upload_url?Type=File',
  filebrowserImageUploadUrl: '/upload_url?Type=Image',
  filebrowserFlashUploadUrl: '/upload_url?Type=Flash'
});
```
