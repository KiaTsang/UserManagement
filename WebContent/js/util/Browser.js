/**
 * 浏览器对象Browser
 */


JSUtil.Browser =  new _Browser();
/**
 * 获取浏览器信息的类。 <br>
 * @class   JSUtil.Browser
 * @author  谢声锋
 * @since   2013-1-07
 * 
 */
function _Browser() {
	/**
	 * 获取浏览器的可用高度
	 * @function {int} getScreenAvailHeight
	 * @returns 浏览器的可用高度
	 */
	this.getScreenAvailHeight = function (){
		return screen.availHeight;
	};
	/**
	 * 获取浏览器的可用宽度
	 * @function {int} getScreenAvailWidth
	 * @returns 浏览器的可用宽度
	 */
	this.getScreenAvailWidth = function (){
		return screen.availWidth;
	};
	/**
	 * 获取Extjs4的window调用show方法要传的参数
	 * @function {object}  getShowXYForCenter
	 * @param windowWidth  Extjs4要调用window的show方法的window的宽度
	 * @param windowHeight Extjs4要调用window的show方法的window的高度
	 * @returns object 	如:{x:111,y:222}
	 */
	this.getShowXYForCenter = function(windowWidth,windowHeight){
		return {
			x:(Extjs4Operator.desktop.getBodyWidth() - windowWidth)/2,
			y:(Extjs4Operator.desktop.getBodyHeight()-windowHeight)/2
		};
	};
	/**
	 * 获取Extjs4的desktop经过传入的参数计算后的宽度
	 * @function {float}  getWidthByPercent
	 * @param   percent  百分比，如：0.99
	 * @returns int
	 */
	this.getWidthByPercent = function(percent){
		return Extjs4Operator.desktop.getBodyWidth()*percent;
	};
	/**
	 * 获取Extjs4的desktop经过传入的参数计算后的高度
	 * @function {float}  getHeightByPercent
	 * @param   percent  百分比，如：0.99
	 * @returns int
	 */
	this.getHeightByPercent = function(percent){
		return Extjs4Operator.desktop.getBodyHeight()*percent;
	};
}
