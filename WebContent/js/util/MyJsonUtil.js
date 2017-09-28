/**
 * 自定义json工具类
 * @namespace MyJsonUtil
 * @author  zengqingyue.
 * @since   2015-06-01.
 *
 */
var MyJsonUtil = new Object();

MyJsonUtil.toJson = function(arr){
     var parts = [];
     var is_list = (Object.prototype.toString.apply(arr) === '[object Array]');
 
    for(var key in arr) {
         var value = arr[key];
         if(typeof value == "object") {
             parts.push(MyJsonUtil.toJson(value));
         }else if(typeof value == "function"){
                 value = value.toString()
                              .replace(/(\n[\s|\t]*\r*\n)/g, '')
                              .replace(/\n|\r|(\r\n)/g,'')
                              .replace(/\s{2,}/,'')
                              .replace(/"/,'\"');
                 parts.push('\"' + value + '\"');
         } else {
             var str = "";
             if(!is_list){
               key = key.replace(/"/,'\"');
                str = '\"' + key + '\":';
             }
 
             //Custom handling for multiple data types
             if(typeof value == "number"){//Numbers
                  str += value;
             }else if(value === false){//The booleans false
                 str += 'false';
             }else if(value === true){//The booleans true
                 str += 'true';
             }else{//string
            	 if(value){
	                 value = value.replace(/"/,'\"');
	                 str += '\"' + value + '\"';
            	 }else{
            		 str += 'null';
            	 }
             }
 
             parts.push(str);
         }
     }
     var json = parts.join(",");
     if(is_list) return '[' + json + ']';//array
     return '{' + json + '}';//object
 }

/**
 * 将对象转化为字符串
 * @param o
 * @return {*}
 */
MyJsonUtil.obj2str = function(o){
     if (o == undefined) {
         return null;
     }
     var r = [];
     if (typeof o == "string") {
    	 if(!o) {
    		 return null;
    	 }
    	 return "\"" + o.replace(/([\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\"";
     }
     if (typeof o == "object") {
         if (!o.sort) {
             for (var i in o)
                 r.push("\"" + i + "\":" + MyJsonUtil.obj2str(o[i]));
             if (!!document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)) {
                 r.push("toString:" + o.toString.toString());
             }
             r = "{" + r.join() + "}"
         } else {
             for (var i = 0; i < o.length; i++)
                 r.push(MyJsonUtil.obj2str(o[i]))
             r = "[" + r.join() + "]";
         }
         return r;
     }
     return o.toString().replace(/\"\:/g, '":""');
 }