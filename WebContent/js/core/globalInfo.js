/**
 *  操作全局常量设置的类
 * @namespace GlobalInfo
 * @author  zengqingyue
 * @since   2015-06-01
 */
GlobalInfo = new Object();

/**
 * 国际化信息对象
 * @class GlobalInfo.InternationalResource
 */
GlobalInfo.InternationalResource = new Object();
/**
 * 国际化信息对象的语言属性
 *@property language
 */
GlobalInfo.InternationalResource.language = (navigator.userLanguage || navigator.language.toUpperCase()).toUpperCase();

/**
 * springmvc的controller控制类，它的别名是SMController
 * @class GlobalInfo.SpringMvcController
 */
GlobalInfo.SpringMvcController = {
		/**
		 * 获取mvc的对应controller的请求地址
		 * @function {string} getUrl
		 * @param	config	如:{controller:'controllerName',method:'methodName'}
		 * @returns 完整的请求链接地址
         * 'controllerProxy.do?method=callBackByRequest&proxyClass=defectMainMenuController&proxyMethod=queryMainMenu&jsonString='+this.obj2str(dataType);
		 */
		getUrl: function(config,baseUrl){
            var myBaseUrl = GlobalInfo.Servlet.baseUrl;
            if (baseUrl)
                myBaseUrl = baseUrl;
            if (config['proxyClass'] && config['proxyMethod']) {
                return myBaseUrl + config['controller'] + '.do?method=' + config['method']
                    + '&proxyClass=' + config['proxyClass'] + '&proxyMethod=' + config['proxyMethod'] + '&jsonString=' + config['jsonString'];
            } else {
                return myBaseUrl + config['controller']+'.do?method='+Math.random()+config['method'] + '&jsonString=' + config['jsonString'];
            }
		}
};

/**
 * 为SpringMvcController添加的别名，以方便操作
 * @returns　
 */
SMController = GlobalInfo.SpringMvcController;

/**
 * 设置Servlet全局常量的类
 * @class GlobalInfo.Servlet
 */
GlobalInfo.Servlet = new Object();
/**
 * 设置Servlet下载文件的链接地址，
 * 获取此地址请看@link{businesssupport.util.ECompeaceOperator类}
 * @property baseUrl
 */
GlobalInfo.Servlet.baseUrl = '../../';
