/**
 * 用于自动加载全局js的类
 * @author  ZENGQINGYUE
 * @since   2015-05-29
 * 
 */
(function($){
	$.extend({
	     includePath: '',
	     include: function(file) {
	        var files = typeof file == "string" ? [file]:file;
	        for (var i = 0; i < files.length; i++) {
	            var name = files[i].replace(/^\s|\s$/g, "");
	            var att = name.split('.');
	            var ext = att[att.length - 1].toLowerCase();
	            var isCSS = ext == "css";
	            var tag = isCSS ? "link" : "script";
	            var attr = isCSS ? " type='text/css' rel='stylesheet' " : " language='javascript' type='text/javascript' ";
	            var link = (isCSS ? "href" : "src") + "='" + $.includePath + name + "'";
	            if ($(tag + "[" + link + "]").length == 0) document.write("<" + tag + attr + link + "></" + tag + ">");
	        }
	   }
	});

	var _eastcompeaceUIJSRoot = '';
	/**
	 * 需要被加载的全局js和css集合(有关联关系的js文件需要按顺序添加)
	 * @property　_jsArray
	 */
	var _jsArray = [
        /********************** CSS样式加载 ************************/
        'css/bootstrap.min.css',
        'css/bootstrap-responsive.css',
        'css/font-awesome.min.css',
        'css/style-metro.css',
        'css/style.css',
        'css/style-responsive.css',
        'css/ecp-sidebar.css',
        'css/uniform.default.css',
        'css/select2_metro.css',
        'css/DT_bootstrap.css',
        'css/jquery.gritter.css',//jQuery消息通知插件样式

        /********************** JS文件加载 ************************/
        /*应用迁移辅助插件*/
        'js/plugin/jquery-migrate-1.2.1.js',
        /*jqueryUI插件*/
        'js/framework/jquery/jquery-ui-1.10.1.custom.min.js',
        /*bootstrap框架核心js*/
        'js/framework/bootstrap/bootstrap.min.js',
        /*兼容IE的画图插件*/
        'js/plugin/excanvas.min.js',
        /*让不支持css3 Media Query的浏览器包括IE6-IE8等其他浏览器支持查询*/
        'js/plugin/respond.min.js',
        /*HTML样式调整*/
        'js/plugin/jquery.uniform.min.js',
        /*HTML插件初始化文件*/
        'js/plugin/app.js',
        /*jQuery消息通知插件*/
        'js/plugin/jquery.gritter.js',
        /*用于模拟传统的浏览器滚动条(竖向)*/
        'js/plugin/jquery.slimscroll.min.js',
        /*遮罩插件*/
        'js/plugin/jquery.blockui.min.js',
        /*cookie插件*/
        'js/plugin/jquery.cookie.min.js',
        /*加载js工具类*/
        'js/util/MyJsonUtil.js',
        'js/util/StringUtil.js',
        'js/util/DomUtil.js',
        'js/common/GlobalInfo.js'
    ];
	
	function loadAllJS(array){
		var currentDirectory = getWebRootDirectory()+'/'+_eastcompeaceUIJSRoot;
        console.log(currentDirectory);
		$.includePath = currentDirectory;
		$.include(_jsArray);
	}
	/**
	 * get file's currentDirectory
	 * @return	file's currentDirectory
	 */
	function getCurrentDirectory(){
		var locHref = location.href;
		var locArray = locHref.split("/");
	    delete locArray[locArray.length-1];
	    var dirTxt = locArray.join("/");
	    return dirTxt;
	}
	/**
	 * get the web's root directory.
	 * @return
	 */
	function getWebRootDirectory(){
		var strFullPath=window.document.location.href;
		var strPath=window.document.location.pathname;
		var pos=strFullPath.indexOf(strPath);
		var prePath=strFullPath.substring(0,pos);
		var postPath=strPath.substring(0,strPath.substr(1).indexOf('/')+1);
		return prePath+postPath;
	}

    loadAllJS(_jsArray);

})(jQuery);
