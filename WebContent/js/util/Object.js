/**
 * 此类用于对项目信息的操作，如可以获取项目路径等等
 */
JSUtil.Object = new _Object();
/**
 * 对web项目信息的操作类。 <br>
 * @class   JSUtil.Object
 * @author  谢声锋
 * @since   2013-1-15
 * 
 */
function _Object(){
	
	/**
	 * 把copiedObject的属性复制到object
	 * @function {object} copyProperties
	 * @returns  object
	 */
	this.copyProperties = function(object,copiedObject){
		this.each(copiedObject, function(itemKey,itemValue){
			object[itemKey] = itemValue;
		});
		return object;
	};
	/**
	 * 遍历object对象，并且在func函数中对此object对象处理<br>
	 * func的格式如:function(itemKey,itemValue){....}<br>
	 * itemKey为object对象的属性，itemValue为object对象的属性值
	 * @function {void} each
	 * @param object 	被遍历的对象
	 * @param func		处理函数
	 */
	this.each = function(object,func){
		this.funct = func;
		for(var p in object){
			this.funct(p,object[p]);
		}
	};
	
}
