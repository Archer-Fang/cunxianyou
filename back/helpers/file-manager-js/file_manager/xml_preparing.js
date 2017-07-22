var escape = require('escape-html');
var xml = require('xml')
var util = require('./utils')
var xmlPreparing = new function(){

  this.prepareFoldersObject = function(folders){
    var xmlFolders = []
    folders.map(function(folder){
      xmlFolders.push({Folder: [{_attr:{name: escape(folder.name) }}]})
    })
    return {Folders: xmlFolders}
  }

  this.prepareFilesObject = function(files){
    var xmlFiles = []
    files.map(function(file){
      xmlFiles.push({File: [{_attr:{name: escape(file.name), size: file.size }}]})
    })
    return {Files: xmlFiles}
  }

  this.renderError = function(number, text){
    var errorObj = createErrorNode(number, text);
    return xml({Connector : errorObj})
  }

  this.renderXml = function(command, resourceType, currentFolder, xmlObjs){
    var currentFolderURL = util.getUrlFromPath( resourceType, currentFolder, command)
    xmlObjs.unshift({CurrentFolder:[{_attr:{path: escape(currentFolder), url: escape(currentFolderURL)}}]});
    xmlObjs.unshift({_attr:{command: command, resourceType: resourceType }});
    return xml({Connector: xmlObjs},{ declaration: true })
  }

  function createErrorNode( number, text ){
    var _attr = text ? {number: number, text: escape(text)} : {number: number}
    return {Error:[{_attr: _attr}]}
  }
}

module.exports = xmlPreparing



