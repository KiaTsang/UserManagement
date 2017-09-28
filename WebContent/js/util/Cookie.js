 /*
 * Cookie静态类，实现Cookie功能
 *
 * 接口：
 * setCookie()     设置cookie
 * getCookie()     获取cookie
 * delCookie()     删除cookie
 *
 * 例子：
 * Cookie.setCookie("key", "value", "day");
 * Cookie.getCookie("key")
 * ……
 * @author  曾庆越
 * @since   2014-5-05
 */
    //静态类的名称
    function Cookie() { }

    //静态类的变量列表
    //Cookie.maxLength=0;
    //Cookie.element=null;

    //静态类的函数列表
    /**
    * 设置cookie 3个参数，一个是cookie的名子，一个是值,一个是保存时间
    */
    Cookie.setCookie=function (name,value,day){
         var exp  = new Date();
         exp.setTime(exp.getTime() + day*24*60*60*1000);
         document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
    };
    /**
    * 获取cookies
    */
    Cookie.getCookie=function (name){
    	var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
        if(arr != null){
            var ret;
            try{
                ret = decodeURIComponent(arr[2]);
            }catch(ex){
                ret = unescape(arr[2]);
            }
            return ret;
        }
        return null;
    };
    /**
    * 删除cookie
    */
    Cookie.delCookie=function (name){
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = Cookie.getCookie(name);
        if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
    };
