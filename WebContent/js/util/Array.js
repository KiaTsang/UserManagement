/**
 * 自定义数组方法，对所有的数组对象适用，用法如下：
 * var array = [{name:'xieshengfeng',age:27},{name:'huanglinhui',age:30}];
 * var entity = array.getEntity('name','xieshengfeng');   //the return is {name:'xieshengfeng',age:27}
 * @param property
 * @param propertyValue
 * @returns
 */
Array.prototype.getEntity = function(property,propertyValue){
	//this represent the Array self.
	if(propertyValue){
		for(var p in this){
			if(this[p][property]== propertyValue)
				return this[p];
		}
	}else{
		for(var p in this){
			if(this[p] == property)
				return this[p];
		}
	}
	return null;
};