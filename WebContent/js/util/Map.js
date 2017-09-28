     /*
	 * MAP对象，实现MAP功能
	 *
	 * 接口：
	 * size()     获取MAP元素个数
	 * isEmpty()    判断MAP是否为空
	 * clear()     删除MAP所有元素
	 * put(key, value)   向MAP中增加元素（key, value)
	 * remove(key)    删除指定KEY的元素，成功返回True，失败返回False
	 * get(key)    获取指定KEY的元素值VALUE，失败返回NULL
	 * element(index)   获取指定索引的元素（使用element.key，element.value获取KEY和VALUE），失败返回NULL
	 * containsKey(key)  判断MAP中是否含有指定KEY的元素
	 * containsValue(value) 判断MAP中是否含有指定VALUE的元素
	 * values()    获取MAP中所有VALUE的数组（ARRAY）
	 * keys()     获取MAP中所有KEY的数组（ARRAY）
	 *
	 * 例子：
	 * var map = new Map();
	 *
	 * map.put("key", "value");
	 * var val = map.get("key")
	 * ……
	 *
	 */
    	
    	//alert("map");

    	JSUtil.Map =  new _Map();
    	
    	/**
    	 * Map集合类。可以使用new Map()初始化 <br>
    	 * @class   JSUtil.Map
    	 * @author  谢声锋
    	 * @since   2013-1-07
    	 * 
    	 */
    	function _Map() {
    		
    		this.elements = new Array();
    		/**
    		 * 获取MAP元素个数
    		 * @function {int} size
    		 * @returns this map's element size
    		 */
    		this.size = function() {
    			return this.elements.length;
    		};
    		/**
    		 * 判断MAP是否为空
    		 * @function {int} isEmpty
    		 * @returns true or false
    		 */
    		this.isEmpty = function() {
    			return (this.elements.length < 1);
    		};
    		/**
    		 * 删除MAP所有元素
    		 * @function {void} clear
    		 */
    		this.clear = function() {
    			this.elements = new Array();
    		};
    		/**
    		 * 向MAP中增加元素（key, value),如果已经有key元素， 则用新的替换旧的元素
    		 * @function {void} put
    		 * @param	key				元素的关键字
    		 * @param	value			元素的值
    		 */
    		this.put = function(_key, _value) {
    			var flag = false;
    			for (i = 0; i < this.elements.length; i++) {
					if (this.elements[i].key == _key) {
						this.elements[i].value = _value;
						flag = true
						break;
					}
				}
    			if(!flag)
	    			this.elements.push( {
	    				key : _key,
	    				value : _value
	    			});
    		};
    		/**
    		 * 删除指定KEY的元素，成功返回true，失败返回False
    		 * @function {boolean} remove
    		 * @param	key				元素的关键字
    		 * @returns true or false
    		 */
    		this.remove = function(_key) {
    			var bln = false;
    			try {
    				for (i = 0; i < this.elements.length; i++) {
    					if (this.elements[i].key == _key) {
    						this.elements.splice(i, 1);
    						return true;
    					}
    				}
    			} catch (e) {
    				bln = false;
    			}
    			return bln;
    		};
    		/**
    		 * 获取指定KEY的元素值VALUE，失败返回NULL
    		 * @function {void} get
    		 * @param	key				元素的关键字
    		 * @returns object
    		 */
    		this.get = function(_key) {
    			try {
    				for (i = 0; i < this.elements.length; i++) {
    					if (this.elements[i].key == _key) {
    						return this.elements[i].value;
    					}
    				}
    			} catch (e) {
    				return null;
    			}
    		};
    		/**
    		 * 获取指定索引的元素（使用element.key，element.value获取KEY和VALUE），失败返回NULL
    		 * @function {void} element
    		 * @param	index				元素所在的位置
    		 * @returns object or null
    		 */
    		this.element = function(_index) {
    			if (_index < 0 || _index >= this.elements.length) {
    				return null;
    			}
    			return this.elements[_index];
    		};
    		
    		/**
    		 * 判断MAP中是否含有指定KEY的元素
    		 * @function {boolean} containsKey
    		 * @param	key				元素所在的位置
    		 * @returns true or false
    		 */
    		this.containsKey = function(_key) {
    			var bln = false;
    			try {
    				for (i = 0; i < this.elements.length; i++) {
    					if (this.elements[i].key == _key) {
    						bln = true;
    					}
    				}
    			} catch (e) {
    				bln = false;
    			}
    			return bln;
    		};
    		
    		/**
    		 * 判断MAP中是否含有指定VALUE的元素
    		 * @function {boolean} containsValue
    		 * @param	value	元素所在的位置
    		 * @returns true or false
    		 */
    		this.containsValue = function(_value) {
    			var bln = false;
    			try {
    				for (i = 0; i < this.elements.length; i++) {
    					if (this.elements[i].value == _value) {
    						bln = true;
    					}
    				}
    			} catch (e) {
    				bln = false;
    			}
    			return bln;
    		};
    		
    		/**
    		 * 获取MAP中所有VALUE的数组（ARRAY）
    		 * @function {[]} values
    		 * @returns array
    		 */
    		this.values = function() {
    			var arr = new Array();
    			for (i = 0; i < this.elements.length; i++) {
    				arr.push(this.elements[i].value);
    			}
    			return arr;
    		};
    		
    		/**
    		 * 获取MAP中所有KEY的数组（ARRAY）
    		 * @function {[]} keys
    		 * @returns array
    		 */
    		this.keys = function() {
    			var arr = new Array();
    			for (i = 0; i < this.elements.length; i++) {
    				arr.push(this.elements[i].key);
    			}
    			return arr;
    		};
    	}

     Map = _Map;
