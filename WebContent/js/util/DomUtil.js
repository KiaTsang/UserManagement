/**
 * DOM操作工具类(依赖JQUERY框架)
 * @author  zengqingyue
 * @since   2015-06-02
 * @type {Object}
 */
var DomUtil = new Object();
/**
 * 根据dom元素返回取到dom元素反对应的json对象字符串  <br>
 * @param type  根据dom对象的id或者name属性来取<br>
 * @param domAndJsonMappingArray  格式如:"input:domName1-fieldName1,domName2-fieldName2;div:domName1-fieldName1"<br>
 * @return  返回json对象
 */
DomUtil.extractJsonObjectFromDom = function(type,domAndJsonMappingArray) {
    //"input:domName1-fieldName1,domName2-fieldName2;div:domName1-fieldName1"
    if(type=='name'){
        var result = [];
        var obj = {};
        var domType = domAndJsonMappingArray.split(';');
        for(var i in domType){
            var domTypeSub = domType[i].split(':');
            var domAndJsonName = domTypeSub[1].split(',');
            for(var j in domAndJsonName){
                var temp = domAndJsonName[j].split('-');
                var str =$(domTypeSub[0]+'[name='+temp[0]+']').val();
                obj[temp[1]] = str;
                //alert(str);
                //result.push(obj);
            }
        }
        return obj;
        //return '{'+toJson(result)+'}';
    }else{
        alert('根据id获取的还没完成!');
    }
}
/**
 * 根据dom元素返回取到dom元素反对应的json对象字符串  <br>
 * @param formId  form对象的id<br>
 * @param excludeField  格式如:"name1,name2,.....",<br>
 * @return  返回json对象
 */
DomUtil.getJSONObjectFromForm = function(formId,excludeField) {
    var obj = {};
    var array = document.getElementById(formId).elements;
    if(excludeField) excludeFields = excludeField.split(',');
    for(var i=0;i<array.length;i++){
        if(excludeField){
            if( array[i].name){
                var flag = false;
                for(var e in excludeFields){
                    if(excludeFields[e]!=array[i].name){
                    }else{
                        flag = true;
                        break;
                    }
                }
                if(!flag) obj[array[i].name]	= array[i].value ;
            }
        }else{
        	if(array[i].name){
            obj[array[i].name]	= array[i].value ;
        	}
        }
    }
    return obj;
}

/**
 * 根据表单对象form获取表单元素的值  <br>
 * @param form对象<br>
 * @return  返回json对象
 */
DomUtil.getJSONObjectFromFormObject = function(form) {
    var array =form.elements;
    var obj = {};
    for(var i=0;i<array.length;i++){
        if( array[i].name){
        	if(array[i].type=='radio'){
                if(array[i].checked){
            	  obj[array[i].name] = array[i].value;
                  }
             }else{
	    	      obj[array[i].name] = array[i].value ;
	    	}
            //obj[array[i].name]	= array[i].value ;
        }
    }
    return obj;
}

/**
 * 根据表单对象form清空表单元素  <br>
 * @param form对象<br>
 * @return  返回json对象
 */
DomUtil.clearFormObject = function(formId) {
    var obj = {};
    var array = document.getElementById(formId).elements;
    for(var i=0;i<array.length;i++){
    	 if( array[i].name=='ftpHostname')
         {     
    		 array[i].value ="000.000.000.000";	 
         }else if(array[i].type!='radio'){ 
             array[i].value ="";
         }
        if(  array[i].name ){
            obj[array[i].name]	=  array[i].value ;
        }
    }
    return obj;
}

/**
 * 为form表单设置值
 * @param formId
 * @param entity
 */
DomUtil.setFormElementsValueViaJSONObject = function(formId,entity) {
    var obj = {};
    var array = document.getElementById(formId).elements;
    for(var key in entity){
        for(var i=0;i<array.length;i++){
            if(array[i].name && key == array[i].name){
            	 if(array[i].type=='radio'){
                     if(array[i].value== entity[key]){
                         array[i].checked = true ;
                     }
                 }else{
                     array[i].value = entity[key];
                     break ;
                 }
               /* array[i].value = entity[key];
                break;*/
            }
        }
    }
}

/**
 * 根据元素名称获取值
 * @param type
 * @param name
 * @return {*|jQuery}
 */
DomUtil.getValueByElementName = function(type,name) {
    if($(type+'[name='+name+']').val())
        return $(type+'[name='+name+']').val();
    else
        return null;
}
/**
 * 为元素设置值
 * @param type
 * @param name
 * @param value
 */
DomUtil.setValueByElementName = function(type,name,value) {
    if($(type+'[name='+name+']'))
        $(type+'[name='+name+']').val(value);
}

/**
 * 当添加孩子节点时，刷新树数据
 * @param treeData
 * @param parentNodeId
 * @param nodeData
 */
DomUtil.refleshTreeData = function(treeData,parentNodeId,nodeData) {
    for(var i=0;i<treeData.length;i++){
        //alert('treenodeid: '+treeData[i].id+';parentNodeId: '+parentNodeId+'; length:'+treeData.length);
        if(parentNodeId == treeData[i].id){
            if(treeData[i].children)
                ;
            else
                treeData[i]['children'] = [];

            treeData[i].children.push(nodeData);
            return ;
        }
        if(treeData[i].children.length>0)
            DomUtil.refleshTreeData(treeData[i].children,parentNodeId,nodeData);
    }
}

/**
 * 修改树数据
 * @param treeData
 * @param nodeData
 * @param id
 * @param text
 */
DomUtil.modifyTreeData = function(treeData,nodeData,id,text) {
    for(var i=0;i<treeData.length;i++){
        if(nodeData[id] == treeData[i].id){
            treeData[i].text = nodeData[text];
            return ;
        }
        if(treeData[i].children.length>0)
            DomUtil.refleshTreeData(treeData[i].children,nodeData,id,text);
    }
}

/**
 * 刷新下拉列表数据
 * @param comboboxData
 * @param entity
 */
DomUtil.refleshComboboxData = function(comboboxData,entity) {
    comboboxData.push(entity);
}

/**
 * 刷新数组数据
 * @param oldArrayData
 * @param entities
 * @param id
 */
DomUtil.refleshArrayData = function(oldArrayData,entities,id) {
    if(id){
        for(var i=0;i<oldArrayData.length;i++){
            if(oldArrayData[i][id] == entities[id]){
                for(var p in entities){
                    oldArrayData[i][p] = entities[p];
                }
                return ;
            }
        }
    }else{
        if(entities && entities.length>0){
            for(var i=0;i<entities.length;i++){
                oldArrayData.push(entities[i]);
            }
        }
    }
}
/**
 * 删除数据元素
 * @param array
 * @param entity
 * @param compareKey
 */
DomUtil.removeEntity = function(array,entity,compareKey) {
    var flag = false;
    for(var i=0,n=0;i<array.length;i++){
        if(array[i][compareKey]==entity[compareKey]) flag = true;
        else array[n++]=array[i]
    }
    if(flag) array.length-=1;
}

/**
 * 拼接页面dom元素
 * @param fileName
 *          html文件名
 * @param domId
 *          dom唯一标识
 */
DomUtil.appendHtml2Dom = function(fileName,domId) {
    $.ajax({
        url: fileName+".html",
        dataType: "html",
        async: false,
        success: function(data) {
            $("#"+domId).append(data);
        }
    });
}
