/**
 *  App全局用户信息类
 * @namespace CurrentLoginUser
 * @author  zengqingyue
 * @since   2015-06-01
 */
var CurrentLoginUser={
	/**
	 * 用户数据
	 * @property  data
	 */
	data:{},
	/**
	 * 获取用户信息
	 * @function {object} get
	 * @returns 用户信息
	 */
	get:_get
};

function _get(name){
	return CurrentLoginUser.data[name];
}

(function($){
    //获取当前用户任务节点
	$.ajax({ 
    	type:'post',
        dataType:"json",
        async: false,
        url:SMController.getUrl({controller:'controllerProxy',method:'callBackByRequest'
            ,proxyClass:'loginController',proxyMethod:'getLoginInfo',jsonString:null}),
        success:function(result){
        	if(result.success){
        		CurrentLoginUser.data = result.msg ;
        	}else{
        		 window.location.href='login.html';   		 
        	}     
        } 
    });
})(jQuery);