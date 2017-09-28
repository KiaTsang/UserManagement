/**
 * 表格数据加载的工具类
 * @namespace TableLoaderUtil
 * @author  tangwenfen.
 * @since   2015-11-02.
 *
 */
var TableLoaderUtil = new Object();
/**
 * 加载数据表格
 * @param queryConditions 查询条件
 * @param pageStart 起始页码
 * @param pageSet 查看页码条数
 * @param dataController 调用的类
 * @param dataMethod 调用的方法
 * @param oTable 更新的表格
 */
var count ;
TableLoaderUtil.loadTable= function(queryConditions,pageStart,pageSet,dataController,dataMethod,oTable){
    var putObj = [];
    putObj.push(StringUtil.decorateRequestData('List',queryConditions));
    if(pageStart!=1){
    	pageStart =(pageStart-1)*pageSet+1 ;
    }
	putObj.push(StringUtil.decorateRequestData('Integer',pageStart));
    putObj.push(StringUtil.decorateRequestData('Integer',pageSet));
	$.ajax({
         type:'post',
         dataType:"json",
         async:false,
         url:SMController.getUrl({controller:'controllerProxy',method:'callBack'
             ,proxyClass:dataController,proxyMethod:dataMethod,jsonString:MyJsonUtil.obj2str(putObj)}),
         success:function(result){
        	 oTable.fnClearTable();
        	 oTable.fnAddData(result.result);
        	 count = result.totalCount;
         }
     });
}

TableLoaderUtil.currentCount = function() {
	return count;
}