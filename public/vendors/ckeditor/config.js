/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
    config.extraPlugins = 'filebrowser';
    config.language = 'zh-cn';
    config.fillEmptyBlocks = false;
    config.height = 400; //保留样式
    //config.pasteFromWordPromptCleanup=true;
    config.enterMode=CKEDITOR.ENTER_P;
    config.contentsCss =['/vendors/ckeditor/contents.css'];
    config.font_defaultLabel = '宋体';
    config.fontSize_defaultLabel = '14px';
    config.font_names = '楷体/楷体-简,楷体;' + '黑体/黑体-简,黑体;' + '宋体/宋体-简,宋体;' + '微软雅黑/微软雅黑;' + '圆体/圆体-简,圆体;' + config.font_names;
};
