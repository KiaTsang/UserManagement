/**
 * FileName: WhiteboxIssueTrend.js
 *
 * File description goes here.
 *
 * Copyright (c) 2010 Asiasoft, Inc. All Rights Reserved.
 *
 * @author <a href="mailto:denghui.he@iaspec.net">keith</a>
 * @Version: 1.0.0
 * @DateTime: 2015-01-09
 */

var WhiteboxIssueTrend = function(){
	
	return {
		genDate:function(){
			if(($("input[name=startDate]").val()==null || $("input[name=startDate]").val()=="") && ($("input[name=endDate]").val()==null || $("input[name=endDate]").val()=="")){
				 //当前时间的前X年的时间   
			   var now=new Date();
			   var startDate= new Date(now.getFullYear()-2,now.getMonth(),1);
			   
			   var endDate=new Date();
			   
				$("input[name=startDate]").datepicker('update',startDate).trigger('changeDate');
				$("input[name=endDate]").datepicker('update',endDate).trigger('changeDate');
			}
		},
		initEvent:function(){
			// Date Picker
	        $('input[name=startDate],input[name=endDate]').datepicker({
	            format: "yyyy",
	            startView : 2,
	            minViewMode : 2,
	            language: "zh-CN",
	            todayHighlight : 1,
	            autoclose: true
	        }).on('changeDate', function(ev){
	        	var target=ev.target;
	        	if($(target).attr('name')=="startDate"){
	        		$("input[name=endDate]").datepicker('setStartDate', ev.date);
	        	}
	        	if($(target).attr('name')=="endDate"){
	        		$("input[name=startDate]").datepicker('setEndDate', ev.date);
	        	}
    		});
	        
	        WhiteboxIssueTrend.genDate();
	        
	        $(".threeYear").click(function(e){
			   var now=new Date();
			   var startDate= new Date(now.getFullYear()-2,0,1);
			   var endDate=new Date();
			   
			   btnChangeDate(startDate,endDate);
	        });
	        
	        $(".fiveYear").click(function(e){
			   var now=new Date();
			   var startDate= new Date(now.getFullYear()-4,0,1);
			   var endDate=new Date();
			   
			   btnChangeDate(startDate,endDate);
	        });
	        
	        $(".tenYear").click(function(e){
        	   var now=new Date();
			   var startDate= new Date(now.getFullYear()-9,0,1);
			   var endDate=new Date();
			   
			   btnChangeDate(startDate,endDate);
	        });
	        
	        function btnChangeDate(startDate,endDate){
	           $('input[name=startDate],input[name=endDate]').datepicker('setStartDate',null);
			   $('input[name=startDate],input[name=endDate]').datepicker('setEndDate',null);
			   $("input[name=startDate]").datepicker('update',startDate).trigger('changeDate');
			   $("input[name=endDate]").datepicker('update',endDate).trigger('changeDate');
	        };
	        
	        $("#btnStat").click(function(e){
	        	WhiteboxIssueTrend.stat();
	        });
	        
	        $(".exportExcel").click(function(e){
	        	var startDate=$("#EpStartDate").val();
				var endDate=$("#EpEndDate").val();
				window.location=$.url_root+'/report/exportWhiteboxIssueTrend.jspa?condition.startDate='+startDate+'&'+'condition.endDate='+endDate;
	        });
		},
		stat:function(){
			var startDate=$("input[name=startDate]").val();
			var endDate=$("input[name=endDate]").val();
			
			if(startDate==""||endDate==""){
				showSimpleError("统计时间段不能为空！");
				return;
			}
			
			$("#pStartDate").html(startDate);
			$("#pEndDate").html(endDate);
			
			var sdate=$("input[name=startDate]").datepicker('getDate').Format("yyyy-MM-dd");
			var edate=$("input[name=endDate]").datepicker('getDate').Format("yyyy-MM-dd");
			
			$("#EpStartDate").val(sdate);
			$("#EpEndDate").val(edate);
			
			var url=$.url_root+"/report/loadWhiteboxIssueTrend.jspa";
	    	$.ajax({
				url: url, 
				type : "post",
				traditional : true,
				dataType : 'json',
				data: {
	 				'condition.startDate': sdate,
	 				'condition.endDate': edate
				},
				success: function(result){
					checkResult(result, {
	    				showBox : false,
	    				callback : function(){
	    					var dtos=result.whiteboxReportDatas;
	    					 WhiteboxIssueTrend.generatePageGraphs(dtos);
	    					 WhiteboxIssueTrend.doInitTable(dtos);
	    				}
	    			});
				},
				error: function(xhr, textStatus, errorThrown) {
					showOperationError(xhr, textStatus, errorThrown);
				}
			});
			/*var sourcedata=[];
			sourcedata.push(
					{
						labelText:"内存管理类",
						dataSource:[[2009,parseInt(Math.random() * 300)],[2010,parseInt(Math.random() * 300)],[2011,parseInt(Math.random() * 300)],[2012,parseInt(Math.random() * 300)],[2013,parseInt(Math.random() * 300)],[2014,parseInt(Math.random() * 300)]]
					},
					{
						labelText:"资源管理类",
						dataSource:[[2009,parseInt(Math.random() * 300)],[2010,parseInt(Math.random() * 300)],[2011,parseInt(Math.random() * 300)],[2012,parseInt(Math.random() * 300)],[2013,parseInt(Math.random() * 300)],[2014,parseInt(Math.random() * 300)]]
					},
					{
						labelText:"指针类",
						dataSource:[[2009,parseInt(Math.random() * 300)],[2010,parseInt(Math.random() * 300)],[2011,parseInt(Math.random() * 300)],[2012,parseInt(Math.random() * 300)],[2013,parseInt(Math.random() * 300)],[2014,parseInt(Math.random() * 300)]]
					},
					{
						labelText:"控制流程类",
						dataSource:[[2009,parseInt(Math.random() * 300)],[2010,parseInt(Math.random() * 300)],[2011,parseInt(Math.random() * 300)],[2012,parseInt(Math.random() * 300)],[2013,parseInt(Math.random() * 300)],[2014,parseInt(Math.random() * 300)]]
					},
					{
						labelText:"质量度量类",
						dataSource:[[2009,parseInt(Math.random() * 300)],[2010,parseInt(Math.random() * 300)],[2011,parseInt(Math.random() * 300)],[2012,parseInt(Math.random() * 300)],[2013,parseInt(Math.random() * 300)],[2014,parseInt(Math.random() * 300)]]
					}
			);
					
					
			WhiteboxIssueTrend.generatePageGraphs(sourcedata);
			WhiteboxIssueTrend.doInitTable(sourcedata);*/
	    },
		generatePageGraphs:function(sourceData) {
			var inputData=sourceData;
			
	        var ds = new Array();
	        
	        //自定义x轴
	        var ticks=[];
	        
	        for(var i=0,len=inputData.length;i<len;i++){
	        	var labelText=inputData[i].labelText;
	        	ticks.push([i, labelText]);
	        }
	        
	        //时间戳
	        var timeData=[];
	        
	        for(var j = 0,fristData=inputData[0].dataSource,len1=fristData.length; j < len1; j++) {
				//时间戳
				timeData.push(fristData[j][0]);
			}
	        
	        for(var k=0, len2 = timeData.length; k < len2; k++){
	        	var date=timeData[k];
	        	var xdata=WhiteboxIssueTrend.converData(date,inputData);
	        	ds.push({
		            label: date,
		            data : xdata,
		            bars : {
		                show : true,
		                barWidth : 0.1,
		                order : 1
		            },
		            valueLabels: {
		              show: true,
		              align: 'center',
		              hideSame: false
		            }
		        });
	        }
	        
	        //Display graph
	        $.plot($("#flotcontainer_A"), ds, {
	            colors : $customColors,
	            grid : {
	                show : true,
	                hoverable : true,
	                clickable : true,
	                tickColor : $chrtBorderColor,
	                borderWidth : 0,
	                borderColor : $chrtBorderColor
	            },
	            legend : {
	                show : true
	            },
	            tooltip : true,
	            tooltipOpts : {
	                content : "%s年度属于标签<span>%x" + "</span>的白盒缺陷数量共有" + "<span>%y</span>" + "个",
	                defaultTheme : false
	            },
	            xaxis: {
	                ticks: ticks,
	                tickFormatter: function(v, axis) {
                        return axis.ticks[v].label;
                    }
	            },
	            yaxis: {
                    min: 0,
                    tickDecimals: 0
                }
	        });
	    },
	    doInitTable:function(sourceData){
	    	var inputData=sourceData;
	    	var thTmp1 = '<th class="text-center" style="width:40px">No.</th><th class="text-left">类别</th>';
			var thTmp2 = '<th class="text-left">{0}</th>';
			var thTmp3 = '<th class="text-left">总缺陷</th>';
			var tdTmp1 = '<td class="text-center"><strong>{0}</strong></td>';
			var tdTmp02 = '<td class="text-left">{0}</td>';
			var tdTmp2 = '<td class="text-left">{0}</td>';
			var tdTmp3 = '<td class="text-left">{0}</td>';
			var lastRow = '<td colspan="2">总缺陷数量：</td>';
			var lastRowTd = '<td class="text-left"><strong>{0}</strong></td>';
			var thead = '';
			var tbody = '';
			
			//thead
			var getTime=true;
			
			//tfoot
			//var colspan=2;
			var footTotal=0;
			
			//时间戳
	        var timeData=[];
			
	    	for(var x=0, len0 = inputData.length;x<len0;x++){
	        	var xdata=inputData[x].dataSource;
	        	var label=inputData[x].labelText;
				
				//tbody数据
	        	var td2 = common.placeholderConversion({'msg':tdTmp1,'args':[x+1]});
    			var tr02 = common.placeholderConversion({'msg':tdTmp02,'args':[label]});
    			var tr2 = '';
    			var btotal=0;
				
				//thead以及total
				for(var j = 0,len1=xdata.length; j < len1; j++) {
					//tbody
					var tmp2 = common.placeholderConversion({'msg':tdTmp2,'args':[xdata[j][1]]});
					tr2 += tmp2;
					tmp2 = '';
					
					//bodytotal
					btotal+=xdata[j][1];
					
					//total
					footTotal+=xdata[j][1];
					
					//thead
					if(getTime){
						timeData.push(xdata[j][0]);
						//colspan++;
			        	var tmp = common.placeholderConversion({'msg':thTmp2,'args':[xdata[j][0]]});
						thead += tmp;
						tmp = '';
					}
				}
				
				var total2 = common.placeholderConversion({'msg':tdTmp3,'args':[btotal]});
    			
    			tbody += '<tr>' + td2 + tr02 + tr2 + total2+ '</tr>';
    			
				getTime=false;
			}
	    	
	        /*for(var z = 0,fristData=inputData[0].dataSource,len3=fristData.length; z < len3; z++) {
				//时间戳
				timeData.push(fristData[z][0]);
			}*/
	        
	       //tfoot
	    	for(var k = 0,len4=timeData.length; k < len4; k++) {
	    		var date=timeData[k];
	    		var xdata=WhiteboxIssueTrend.converData(date,inputData);
	    		var yTotal=0;
	    		for(var m=0,len5=xdata.length;m<len5;m++){
	    			yTotal+=xdata[m][1];
	    		}
	    		lastRow += common.placeholderConversion({'msg':lastRowTd,'args':[yTotal]});
	    	}
	    	
	    	//thead
	    	thead = '<thead><tr>' + thTmp1 + thead + thTmp3 + '</tr></thead>';
	    	
	    	//tbody
	    	tbody = '<tbody>' + tbody + '</tbody>';
	    	
	    	//tfoot
	    	//lastRow=common.placeholderConversion({'msg':lastRow,'args':[colspan]});
			lastRow += common.placeholderConversion({'msg':lastRowTd,'args':[footTotal]});
	    	lastRow = '<tfoot><tr>' + lastRow + '</tr></tfoot>';
	    	
	    	$('.totalStats').html(footTotal);
	    	
	    	$('#tableStat').html(thead + tbody + lastRow);
	    },
	    converData:function(date,inputData){
        	var xdata=[];
        	for(var i=0,len=inputData.length;i<len;i++){
	        	var dataSource=inputData[i].dataSource;
	        	for(var t=0,len3=dataSource.length;t<len3;t++){
	        		if(dataSource[t][0]==date){
	        			xdata.push([i, dataSource[t][1]]);
	        		}
	        	}
	        }
        	return xdata;
        }
	};
}();