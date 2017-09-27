/**
 * FileName: reportCardIssueStatus.js
 *
 * File description goes here.
 *
 * Copyright (c) 2010 Asiasoft, Inc. All Rights Reserved.
 *
 * @author <a href="mailto:denghui.he@iaspec.net">keith</a>
 * @Version: 1.0.0
 * @DateTime: 2015-01-08
 */

var IssueStatus = function(){
	
	return {
		genDate:function(){
			if(($("input[name=startDate]").val()==null || $("input[name=startDate]").val()=="") && ($("input[name=endDate]").val()==null || $("input[name=endDate]").val()=="")){
			   var now=new Date();
			   var startDate= new Date(now.getFullYear(),now.getMonth(),1);
			   
			   var endDate=new Date();
			   
			   $("input[name=startDate]").datepicker('update',startDate).trigger('changeDate');
			   $("input[name=endDate]").datepicker('update',endDate).trigger('changeDate');
			}
		},
		initEvent:function(){
			// Date Picker
	        $('input[name=startDate],input[name=endDate]').datepicker({
	        	format: "yyyy-mm-dd",
	            startView : 'month',
	            minViewMode : 'days',
	            language: "zh-CN",
	            todayHighlight : 1,
	            autoclose: true
	        }).on('changeDate', function(ev){
	        	var target=ev.target;
	        	if($(target).attr('name')=="startDate"){
	        		$("input[name=endDate]").datepicker('setStartDate', $(target).val());
	        	}
	        	if($(target).attr('name')=="endDate"){
	        		$("input[name=startDate]").datepicker('setEndDate', $(target).val());
	        	}
    		});
	        
	        IssueStatus.genDate();
	        
	        $('#btnYear').datepicker({
	            format: "yyyy",
	            startView : 'decade',
	            minViewMode : 'years',
	            language: "zh-CN",
	            todayHighlight : 1,
	            autoclose: true
	        }).on('changeDate', function(ev){
	        	if(!ev.date) {
	        		return;
	        	}
	        	var tmpDate = ev.date;
	        	var startDate = new Date(tmpDate.getFullYear(),0,1);
	        	var endDate = new Date(tmpDate.getFullYear(),11,31);
	        	btnChangeDate(startDate,endDate);
    		});
	        
	        $('#btnMonth').datepicker({
	            format: "yyyy-mm",
	            startView : 'year',
	            minViewMode : 'months',
	            language: "zh-CN",
	            todayHighlight : 1,
	            autoclose: true
	        }).on('changeDate', function(ev){
	        	if(!ev.date) {
	        		return;
	        	}
	        	var tmpDate = ev.date;
	        	var startDate = new Date(tmpDate.getFullYear(),tmpDate.getMonth(),1);
	        	var endDate = new Date(tmpDate.getFullYear(),tmpDate.getMonth()+1,0);
	        	btnChangeDate(startDate,endDate);
    		});
	        
	        function btnChangeDate(startDate,endDate){
	           $('input[name=startDate],input[name=endDate]').datepicker('setStartDate',null);
			   $('input[name=startDate],input[name=endDate]').datepicker('setEndDate',null);
			   $("input[name=startDate]").datepicker('update',startDate).trigger('changeDate');
			   $("input[name=endDate]").datepicker('update',endDate).trigger('changeDate');
	        };
	        
	        $("#btnStat").click(function(e){
	        	IssueStatus.stat();
	        });
	        
	        $(".exportExcel").click(function(e){
	        	var startDate=$("#EpStartDate").val();
				var endDate=$("#EpEndDate").val();
				window.location=$.url_root+'/report/exportCardIssueStatus.jspa?reportQueryCondition.startDate='+startDate+'&'+'reportQueryCondition.endDate='+endDate;
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
			
			var url=$.url_root+"/report/loadCardIssueStatus.jspa";
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
	    					IssueStatus.generatePageGraphs(dtos);
	    					IssueStatus.doInitTable(dtos);
	    				}
	    			});
				},
				error: function(xhr, textStatus, errorThrown) {
					showOperationError(xhr, textStatus, errorThrown);
				}
			});
	    },
		generatePageGraphs:function(sourceData) {
			var inputDate=sourceData;
			
			var data= [];
			
			for(var i=0, len = inputDate.length;i<len;i++){
				data.push({ label: i18nRes.issue.issueStatus[inputDate[i].status],  data: inputDate[i].total})//把数据缓存起来
			}

	        var placeholder = $("#placeholder");

	        var plot = $.plot(placeholder, data, {
	            legend: {
	                show: true,
	                noColumns: 1,
	                margin: 10,
	                labelFormatter: function(label, series) {
	                	var  percent = series.percent.toFixed(2);
                    	if(percent == 'NaN'){
                    		percent = 0;
                    	}
	                    return label + ': ' + series.data[0][1] + ' (' + percent + '%)';
	                }
	            },
	            series: {
	                pie: { 
	                    show: true,
	                    label: {
	                        show: true,
	                        radius: 1/2,
	                        threshold: 0.1,
	                        formatter: function(label, series) {
	                        	var  percent = series.percent.toFixed(2);
	                        	if(percent == 'NaN'){
	                        		percent = 0;
	                        	}
	                            return "<div style='font-size:8pt; text-align:center; padding:2px; color: white;'>" + series.label + "<br/>" + percent + "%</div>";
	                        },
	                        background: {
	                            opacity: 0.8
	                        }
	                    }
	                }
	            },
	            grid: {
	                hoverable: true
	            },
	            colors: $customColors
	        });


	        function showTooltip(x, y, contents) {
	            $('<div id="tooltip">' + contents + '</div>').css( {
	                position: 'absolute',
	                top: y + 10,
	                left: x + 10,
	                border: '1px solid #fdd',
	                padding: '2px',
	                'background-color': '#fee',
	                opacity: 0.80
	            }).appendTo("body");//.fadeIn(200);
	         }

	         $('#placeholder').bind('mouseout', function() {
	            plot.unhighlight();
	            $("#tooltip").remove();
	            $(this).data('previous-post', -1);
	         });

	         $('#placeholder').bind('plothover', function(event, pos, item) {
	            if (item) {
	                if ($(this).data('previous-post') != item.seriesIndex) {
	                    plot.unhighlight();
	                    plot.highlight(item.series, item.datapoint);
	                    $(this).data('previous-post', item.seriesIndex);
	                }
	                $("#tooltip").remove();
	                var msg = item.series.label + ": " + item.series.data[0][1] + ' (' + item.series.percent.toFixed(2) + '%)';
	                showTooltip(pos.pageX, pos.pageY, msg);
	            } else {
	                plot.unhighlight();
	                $("#tooltip").remove();
	                previousPost = $(this).data('previous-post', -1);
	            }
	         });
	         // 滚动到最上方
	         $("html, body").animate({ scrollTop: 0 }, "fast");
	    },
	    doInitTable:function(sourceData){
	    	var inputDate=sourceData;
	    	
	    	var count = 0;
			var html=[];
	    	
	    	for(var j=0, len = inputDate.length;j<len;j++){
				count=count+inputDate[j].total;
			}
	    	
	    	for(var i=0, len = inputDate.length;i<len;i++){
	    		var percent=((inputDate[i].total/count)*100).toFixed(2)+"%";
				if(percent=='NaN%'){
					percent = '0%'
				}
			          html[i] ='<tr>'
			          		  +'<td class="text-center">'
			          		  +	'<strong>'
			          		  + (i + 1)
			          		  +'</strong>'
			          		  +'</td>'
			          		  +'<td class="text-left">'
			          		  + i18nRes.issue.issueStatus[inputDate[i].status]
			                  +'</td>'
			                  +'<td class="text-left">'
			                  + inputDate[i].total
			                  +'</td>'
			                  +' <td class="text-left">'
			                  + percent
			                  +'</td></tr>';
			}
	    	$('#tableStat').html(html.join(""));
	    	$('.totalStats').html(count);
	    },
	    //Fromat yyyy-MM-dd
	    dateFromat:function(date,fmt)   
	    { //author: meizz   
	      var o = {   
	        "M+" : date.getMonth()+1,                 //月份   
	        "d+" : date.getDate(),                    //日   
	        "h+" : date.getHours(),                   //小时   
	        "m+" : date.getMinutes(),                 //分   
	        "s+" : date.getSeconds(),                 //秒   
	        "q+" : Math.floor((date.getMonth()+3)/3), //季度   
	        "S"  : date.getMilliseconds()             //毫秒   
	      };   
	      if(/(y+)/.test(fmt))   
	        fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
	      for(var k in o)   
	        if(new RegExp("("+ k +")").test(fmt))   
	      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
	      return fmt;   
	    }  
	};
}();