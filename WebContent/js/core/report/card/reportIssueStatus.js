/**
 * FileName: report.js
 *
 * File description goes here.
 *
 * Copyright (c) 2010 Asiasoft, Inc. All Rights Reserved.
 *
 * @author <a href="mailto:Eason.chen@dorsia.hk">eason.chen</a>
 * @Version: 1.0.0
 * @DateTime: 2014-06-27
 */

var reportStatus = function(){
	  return {
		initTable : function()
		{
			if($("#startDate").val()==null||$("#startDate").val()==""||$("#endDate").val()==null||$("#endDate").val()==""){
				var now=new Date();
				var y = now.getFullYear();
				var m = (parseInt(now.getMonth()) + 1) + "";
				var d = now.getDate() + "";
				var nextm=parseInt(now.getMonth())+"";
				if(nextm.length == 1){
					nextm = '0' + nextm;
				}
				if(m.length == 1){
					m = '0' + m;
				}
				if(d.length == 1){
					d = '0' + d;
				}
				var startDate=y+"-"+nextm+"-"+"01";
				var endDate=y+"-"+m+"-"+d;
				$("#startDate").val(startDate);
				$("#endDate").val(endDate);
			}
			
			$("#startTime").html($("#startDate").val());
			$("#endTime").html($("#endDate").val());
			
			$.ajax({
				url: $.url_root+"/report/listIssueStatus.jspa",
				type: "POST",
				dataType: "json",
				data: {
					"startDate": $('#startDate').val(),
					"endDate": $('#endDate').val()
				},
				success: function(result) {
					checkResult(result, {
	    				showBox : false,
	    				callback : function(){
	    					var data = result.issueDTOList;
	    					 $('body').data("cacheData",data);
	    					 
	    					 reportStatus.generatePageGraphs(data)
	    					$('#issueStatusCheckbox').find('input[type=checkbox]').attr("checked",true);
	    				}
	    			});
				},
				error: function(xhr, textStatus, errorThrown) {
					showOperationError(xhr, textStatus, errorThrown);
				}
			});
		},
		 
		 initEvent:function(){
			 
			 $('input[name=startDate],input[name=endDate]').datepicker({
				format: "yyyy-mm-dd",
	            //format: "dd/mm/yyyy",
	            minViewMode: "days",
	            language: "zh-CN",
	            todayHighlight : 1,
	            autoclose: true
	        });
	        
	        $("#btnYear").datepicker({
	            format: "yyyy",
	            language: "zh-CN",
	            autoclose: true,
	            startView : 2,
	            minViewMode : 2,
	        }).on('changeYear', function(e){
	        	var now=e.date;
	        	var year=now.getFullYear();
	        	var startDate=year+"-01-01";
	        	var endDate=year+"-12-31";
	        	
	        	$("#startDate").val(startDate);
				$("#endDate").val(endDate);
				$('input[name=startDate],input[name=endDate]').datepicker('update');
	        });
	        
	        $("#btnMonth").datepicker({
	            format: "yyyy-mm",
	            language: "zh-CN",
	            autoclose: true,
	            startView : 1,
	            minViewMode : 1,
	        }).on('changeMonth', function(e){
	        	var now=e.date;
	        	var year=now.getFullYear();
	        	var month=(parseInt(now.getMonth()) + 1);
	        	var mDay=categoryProject.getMonthDay(year,month);
	        	if((month+"").length == 1){
	        		month = '0' + month;
				}
	        	
	        	var startDate=year+"-"+month+"-01";
	        	var endDate=year+"-"+month+"-"+mDay;
	        	$("#startDate").val(startDate);
				$("#endDate").val(endDate);
				$('input[name=startDate],input[name=endDate]').datepicker('update');
	        });
		        $('#totalClick').click(function(){
		        	reportStatus.initTable();
		        	
		        	//$('#startTime').html($('#startDate').val());
		        	//$('#endTime').html($('#endDate').val());
		    	});
		        
		        $('input[type=checkbox]').on('click',function(event) {
		        	if(this.checked){
		        		$(this).prop("checked",true);
		        	}else{
		        		$(this).prop("checked",false);
		        	}
		        	
		        	var ychecked=[];
		        	$('#issueStatusCheckbox').find('input[type=checkbox]').each(function(i, o) {
		        		if(!$(this).prop("checked")){
		        			ychecked[i] = $(this).data("name");
		        		}
					 });
		        	
		        	var sdata=$("body").data("cacheData");
		        	var outdata=[];
		        	for(var i=0, len = sdata.length;i<len;i++){
		        		var statuss = sdata[i].status;
		        		if($.inArray(statuss,ychecked) == -1){
		        			outdata.push(sdata[i]);
		        		}
		        	}
		        	reportStatus.generatePageGraphs(outdata);
		        });
			},
			
			generatePageGraphs:function(sourceData) {
				var sdata=sourceData;
				var count = 0;
				var data= [];
				var html=[];
				
				for(var j=0, len = sdata.length;j<len;j++){
					count=count+sdata[j].totalIssues;
				}
				for(var i=0, len = sdata.length;i<len;i++){
					//var percent = ((sdata[i].totalIssues/count)*100);
					var percent=((sdata[i].totalIssues/count)*100).toFixed(2)+"%";
					if(percent=='NaN%'){
						percent = '0%'
					}
				          html[i] = 
				          		 '<tr>'
				          		  +'<td class="text-center">'
				          		  +	'<strong>'
				          		  + (i + 1)
				          		  +'</strong>'
				          		  +'</td>'
				          		  +'<td class="text-center">'
				          		  + i18nRes.issue.issueStatus[sdata[i].status]
				                  +'</td>'
				                  +'<td class="text-left">'
				                  + sdata[i].totalIssues
				                  +'</td>'
				                  +' <td class="text-left">'
				                  + percent
				                  +'</td></tr>'	 
				          data.push({ label: i18nRes.issue.issueStatus[sdata[i].status],  data: sdata[i].totalIssues})//把数据缓存起来
				        }
					$('#initData').html(html.join(""));
					$("#count").html(count);
					$("#vcount").html(count);
					
					 var placeholder = $("#placeholder");

					 
					 
				        var plot = $.plot(placeholder, data, {
				            legend: {
				                show: true,
				                noColumns: 2,
				                margin: 5,
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
				                var  percent = item.series.percent.toFixed(2);
	                        	if(percent == 'NaN'){
	                        		percent = 0;
	                        	}
				                var msg = item.series.label + ": " + item.series.data[0][1] + ' (' + percent + '%)';
				                showTooltip(pos.pageX, pos.pageY, msg);
				            } else {
				                plot.unhighlight();
				                $("#tooltip").remove();
				                previousPost = $(this).data('previous-post', -1);
				            }
				         });

				         // 滚动到最上方
				      //   $("html, body").animate({ scrollTop: 0 }, "fast");
		    },
		    getMonthDay:function(Year,Month){
				var day=null;
				switch(Month)
				{
					case 1:
					case 3:
					case 5:
					case 7:
					case 8:
					case 10:
					case 12:   // 12
						day=31;break;
					case 4:
					case 6:
					case 9:
					case 11:
						day=30;break;
					case 2:
					if((Year%4==0)&&(Year%100!=0)||(Year%400==0))
						day=29;
					else
						day=28;
				}
				return day;
			}
	};
}();
