/**
 * Test case:
 * 
 *	PageCommunication.parameter.setParam("name","ddd");
 *	alert(PageCommunication.parameter.getParam('name'));
 *	PageCommunication.parameter.setParam("add","dsdfs");
 *	alert(PageCommunication.parameter.getParam('add'));
 *	
 *	PageCommunication.parameter.setFunc('test',function(){alert('test');});
 *	var func = PageCommunication.parameter.getFunc('test');
 *	func();
 * 
 */

	JSUtil.PageCommunication = new _Parameter();
	
	/**
	 * 用于页面之间传参数的类。 <br>
	 * @class   JSUtil.PageCommunication
	 * @author  谢声锋
	 * @since   2013-1-07
	 * 
	 */
	function _Parameter(){
		/**
		 * 存放单值变量map
		 */
		var parameterMap = new _Map;
		/**
		 * 存放数据集变量map
		 */
		var datasetMap = new _Map;
		/**
		 * 存放函数变量map
		 */
		var functionMap = new _Map;
		
		var pc = window.$_PageCommunication || window.parent.$_PageCommunication;
		if(!pc){
			//alert('if');
			pc = window.$_PageCommunication = new Object();
		}
		//alert(pc === window.$_PageCommunication);
		if(!pc.parameterMap)
			pc.parameterMap = parameterMap;
		if(!pc.datasetMap)
			pc.datasetMap = datasetMap;
		if(!pc.functionMap)
			pc.functionMap = functionMap;
		/**
		 * 获取单值参数
		 * @function {boolean} getParam
		 * @param	key		元素的关键字
		 * @returns  获取的参数
		 */
		this.getParam = function(key){
			return pc.parameterMap.get(key);
		};
		/**
		 * 设置单值参数
		 * @function {boolean} setParam
		 * @param	key		    元素的关键字
		 * @param   parameter   参数
		 * @returns true or false
		 */
		this.setParam = function(key,parameter){
			pc.parameterMap.put(key,parameter);
		};
		/**
		 * 获取数据集参数
		 * @function {dataset|[]} getDataset
		 * @param	key		元素的关键字
		 * @returns 元素的数据集
		 */
		this.getDataset = function(key){
			return pc.datasetMap.get(key);
		};
		/**
		 * 设置数据集参数
		 * @function {void} setDataset
		 * @param	key		元素的关键字
		 * @param	key     元素的数据集
		 */
		this.setDataset = function(key,dataset){
			pc.datasetMap.put(key,dataset);
		};
		/**
		 * 获取函数类型变量
		 * @function {function} getFunc
		 * @param	key		元素的关键字
		 * @returns function
		 */
		this.getFunc = function(key){
			return pc.functionMap.get(key);
		};
		/**
		 * 设置函数类型变量
		 * @function {void} setFunc
		 * @param	key		元素的关键字
		 * @param	function    设置的函数
		 */
		this.setFunc = function(key,func){
			pc.functionMap.put(key,func);
		};
	}
	
//add _Parameter to PageCommunication.
