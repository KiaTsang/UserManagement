/**
 * FileName: reportCardTechnicalTypeTrend.js
 *
 * File description goes here.
 *
 * Copyright (c) 2010 Asiasoft, Inc. All Rights Reserved.
 *
 * @author <a href="mailto:denghui.he@iaspec.net">keith</a>
 * @Version: 1.0.0
 * @DateTime: 2015-01-06
 */

var TechnicalTypeTrend = function(){
	
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
	        
	        TechnicalTypeTrend.genDate();
	        
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
	        	TechnicalTypeTrend.stat();
	        });
	        
	        $(".exportExcel").click(function(e){
	        	var startDate=$("#EpStartDate").val();
				var endDate=$("#EpEndDate").val();
				window.location=$.url_root+'/report/exportCardTechnicalTypeTrend.jspa?reportQueryCondition.startDate='+startDate+'&'+'reportQueryCondition.endDate='+endDate;
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
			
			var url=$.url_root+"/report/loadCardTechnicalTypeTrend.jspa";
	    	$.ajax({
				url: url, 
				type : "post",
				traditional : true,
				dataType : 'json',
				data: {
	 				'reportQueryCondition.startDate': sdate,
	 				'reportQueryCondition.endDate': edate
				},
				success: function(result){
					checkResult(result, {
	    				showBox : false,
	    				callback : function(){
	    					var dtos=result.issueDTOList;
	    					 TechnicalTypeTrend.generatePageGraphs(dtos);
	    					 TechnicalTypeTrend.doInitTable(dtos);
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
						labelText:"3G UICC",
						dataSource:[[2009,parseInt(Math.random() * 300)],[2010,parseInt(Math.random() * 300)],[2011,parseInt(Math.random() * 300)],[2012,parseInt(Math.random() * 300)],[2013,parseInt(Math.random() * 300)],[2014,parseInt(Math.random() * 300)]]
					},
					{
						labelText:"ISIM",
						dataSource:[[2009,parseInt(Math.random() * 300)],[2010,parseInt(Math.random() * 300)],[2011,parseInt(Math.random() * 300)],[2012,parseInt(Math.random() * 300)],[2013,parseInt(Math.random() * 300)],[2014,parseInt(Math.random() * 300)]]
					},
					{
						labelText:"LTE",
						dataSource:[[2009,parseInt(Math.random() * 300)],[2010,parseInt(Math.random() * 300)],[2011,parseInt(Math.random() * 300)],[2012,parseInt(Math.random() * 300)],[2013,parseInt(Math.random() * 300)],[2014,parseInt(Math.random() * 300)]]
					},
					{
						labelText:"CDMA",
						dataSource:[[2009,parseInt(Math.random() * 300)],[2010,parseInt(Math.random() * 300)],[2011,parseInt(Math.random() * 300)],[2012,parseInt(Math.random() * 300)],[2013,parseInt(Math.random() * 300)],[2014,parseInt(Math.random() * 300)]]
					},
					{
						labelText:"GMS",
						dataSource:[[2009,parseInt(Math.random() * 300)],[2010,parseInt(Math.random() * 300)],[2011,parseInt(Math.random() * 300)],[2012,parseInt(Math.random() * 300)],[2013,parseInt(Math.random() * 300)],[2014,parseInt(Math.random() * 300)]]
					}
			);
					
					
			TechnicalTypeTrend.generatePageGraphs(sourcedata);
			TechnicalTypeTrend.doInitTable(sourcedata);*/
	    },
		generatePageGraphs:function(sourceData) {
			var inputDate=sourceData;
			
			var ds = new Array();
	        
	        for(var x=0, len0 = inputDate.length;x<len0;x++){
	        	var xdata=inputDate[x].dataSource;
	        	var label=inputDate[x].labelText;
	        	ds.push({
		            label: label,
		            data : xdata,
		            color: $customColors[x]
		        });
			}

	        var options = {
	            series: {
	                lines: {
	                    show: true,
	                    lineWidth: 1,
	                    fill: true,
	                    fillColor: {
	                        colors: [
	                            {
	                                opacity: 0.1
	                            },
	                            {
	                                opacity: 0.15
	                            }
	                        ]
	                    }
	                },
	                points: {
	                    show: true
	                },
	                shadowSize: 0
	            },

	            grid: {
	                hoverable: true,
	                clickable: true,
	                tickColor: $chrtBorderColor,
	                borderWidth: 0,
	                borderColor: $chrtBorderColor
	            },
	            tooltip: true,
	            tooltipOpts: {
	                content: "<b>%x</b>年度属于标签 <b>%s</b> 的缺陷 共有 <b>%y</b> 个",
	                dateFormat: "%y-%0m-%0d",
	                defaultTheme: false
	            },
	            yaxes: [
	                {
	                    min: 0,
	                    tickLength: 10
	                }
	            ],
	            xaxis: {
	                ticks: 15,
	                tickDecimals: 0
	            },
	            yaxis: {
	                ticks: 15,
	                tickDecimals: 0
	            }
	        }

	        var toggles = $("#rev-toggles_D"),
	            target = $("#flotcontainer_D");

	        plot2 = null;
	        plot2 = $.plot(target, ds, options);

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
			var lastRow = '<td colspan="{0}">总缺陷数量：</td>';
			var lastRowTd = '<td class="text-left"><strong>{0}</strong></td>';
			var thead = '';
			var tbody = '';
			
			//thead
			var getTime=true;
			
			//tfoot
			var colspan=2;
			var footTotal=0;
			
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
						colspan++;
			        	var tmp = common.placeholderConversion({'msg':thTmp2,'args':[xdata[j][0]]});
						thead += tmp;
						tmp = '';
					}
				}
				
				var total2 = common.placeholderConversion({'msg':tdTmp3,'args':[btotal]});
    			
    			tbody += '<tr>' + td2 + tr02 + tr2 + total2+ '</tr>';
    			
				getTime=false;
			}
	    	
	    	//thead
	    	thead = '<thead><tr>' + thTmp1 + thead + thTmp3 + '</tr></thead>';
	    	
	    	//tbody
	    	tbody = '<tbody>' + tbody + '</tbody>';
	    	
	    	//tfoot
	    	lastRow=common.placeholderConversion({'msg':lastRow,'args':[colspan]});
			lastRow += common.placeholderConversion({'msg':lastRowTd,'args':[footTotal]});
	    	lastRow = '<tfoot><tr>' + lastRow + '</tr></tfoot>';
	    	
	    	$('.totalStats').html(footTotal);
	    	
	    	$('#tableStat').html(thead + tbody + lastRow);
	    }
	};
}();