/**
 * FileName: issuescard.js
 *
 * File description goes here.
 *
 * Copyright (c) 2010 Asiasoft, Inc. All Rights Reserved.
 *
 * @author <a href="mailto:denghui.he@iaspec.net">keith</a>
 * @Version: 1.0.0
 * @DateTime: 2014-06-27
 */

var SystemSeverity = function(){

	return {
		genDate:function(){
			if(($("input[name=startDate]").val()==null || $("input[name=startDate]").val()=="") && ($("input[name=endDate]").val()==null || $("input[name=endDate]").val()=="")){
				 //当前时间的前X个月的时间
			   var now=new Date();
			   var startDate= new Date(now.getFullYear(),(now.getMonth() - 11),1);

			   var endDate=new Date();

				$("input[name=startDate]").datepicker('update',startDate).trigger('changeDate');
				$("input[name=endDate]").datepicker('update',endDate).trigger('changeDate');
			}
		},
		initEvent:function(){
			// Date Picker
	        $('input[name=startDate],input[name=endDate]').datepicker({
	            format: "yyyy-mm",
	            startView : 1,
	            minViewMode : 1,
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

	        SystemSeverity.genDate();

	        $("#nowYear").click(function(e){
			   var now=new Date();
			   var startDate= new Date(now.getFullYear(),0,1);
			   var endDate=new Date(now.getFullYear(),11,31);

			   btnChangeDate(startDate,endDate);
	        });

	        $("#lastYear").click(function(e){
			   var now=new Date();
			   var startDate= new Date(now.getFullYear()-1,0,1);
			   var endDate=new Date(now.getFullYear()-1,11,31);

			   btnChangeDate(startDate,endDate);
	        });

	        $("#beforeYear").click(function(e){
        	   var now=new Date();
			   var startDate= new Date(now.getFullYear()-2,0,1);
			   var endDate=new Date(now.getFullYear()-2,11,31);

			   btnChangeDate(startDate,endDate);
	        });

	        function btnChangeDate(startDate,endDate){
	           $('input[name=startDate],input[name=endDate]').datepicker('setStartDate',null);
			   $('input[name=startDate],input[name=endDate]').datepicker('setEndDate',null);
			   $("input[name=startDate]").datepicker('update',startDate).trigger('changeDate');
			   $("input[name=endDate]").datepicker('update',endDate).trigger('changeDate');
	        };

	        $("#btnStat").click(function(e){
	        	var $formDate = $("#checkDate");
				if(!$formDate.valid()) {
		            return;
		        }
	        	SystemSeverity.stat();
	        });
		},
		initValidation : function() {
			var $formDate = $("#checkDate");
			$formDate.validate({
				ignore: ".ignore",
				rules:{
					startDate:{
						required:true
					},
					endDate:{
						required:true
					},
				},
				messages: {
					startDate:{
					  	required:function(){
					  		$.smallBox({
		                        title: "开始时间不能为空！",
		                        content: "",
		                        color: $boxColors.red,
		                        iconSmall: "fa fa-times",
		                        timeout: 2000
		                    });
					  	}
				  	},
				  	endDate:{
					  	required:function(){
					  		$.smallBox({
		                        title: "结束时间不能为空！",
		                        content: "",
		                        color: $boxColors.red,
		                        iconSmall: "fa fa-times",
		                        timeout: 2000
		                    });
					  	}
				  	}
				}
			});
		},
		stat:function(){
			$("#pStartDate").html($("input[name=startDate]").val());
			$("#pEndDate").html($("input[name=endDate]").val());

			var sdate=$("input[name=startDate]").datepicker('getDate').Format("yyyy-MM-dd");
			var edate=$("input[name=endDate]").datepicker('getDate').Format("yyyy-MM-dd");

			var url=$.url_root+"/report/loadIssuesSeverityReportOfSystem.jspa";
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
	    					var dtos=result.systemReportDatas;
	    					SystemSeverity.generatePageGraphs(dtos);
	    				}
	    			});
				},
				error: function(xhr, textStatus, errorThrown) {
					showOperationError(xhr, textStatus, errorThrown);
				}
			});
	    },
		generatePageGraphs:function(sourceData) {
			 var sdata=sourceData;
			 var data = [];
			 var pHtml=[];
			 var pserious;
			 var pcommon;
			 var pslight;
			 var pdeadly;

			 for(var i = 0,len=sdata.length; i < len; i++) {
				 switch(sdata[i].labelText)
				 {
					 case "SERIOUS":
						 pserious=sdata[i].dataSource;
						 break;
					 case "COMMON":
						 pcommon=sdata[i].dataSource;
						 break;
					 case "SLIGHT":
						 pslight=sdata[i].dataSource;
						 break;
					 case "DEADLY":
						 pdeadly=sdata[i].dataSource;
						 break;
					 default:break;
				 }

				 data.push({
	                 	label: i18nRes.issue.issueSeverity[sdata[i].labelText],
	                    data: sdata[i].dataSource,
	                    color: $customColors[i],
	                    bars: {
	                        show: true,
	                        align: "left",
	                        barWidth: 4 * 30 * 60 * 1000 * 80,
	                        order : (i + 1)
	                    },
	                    valueLabels: {
	                      show: true,
	                      align: 'center',
	                      hideSame: false
	                    }
	             });
	         }

			 var pseriousTotal=0;
			 var pcommonTotal=0;
			 var pslightTotal=0;
			 var pdeadlyTotal=0;

			 for(var j = 0,len=pserious.length; j < len; j++) {
				 pseriousTotal=pseriousTotal+pserious[j][1];
				 pcommonTotal=pcommonTotal+pcommon[j][1];
				 pslightTotal=pslightTotal+pslight[j][1];
				 pdeadlyTotal=pdeadlyTotal+pdeadly[j][1];
				 var pdate=new Date(pserious[j][0]).Format("yyyy.MM");
				 pHtml[j]='<tr>'
					+'<td class="text-center"><strong>'
					+ (j+1)
					+'</strong></td>'
					+'<td class="text-left">'
					+ pdate
					+'</td>'
					+'<td class="text-left">'
					+ pserious[j][1]
					+'</td>'
					+'<td class="text-left">'
					+ pcommon[j][1]
					+'</td>'
					+'<td class="text-left">'
					+ pslight[j][1]
					+'</td>'
					+'<td class="text-left">'
					+ pdeadly[j][1]
					+'</td>'
					+'</tr>';
			 }

			 ptotalHtml='<tr>'
				+'<td class="text-center"><strong></strong></td>'
				+'<td class="text-left">'
				+ '合计：'
				+'</td>'
				+'<td class="text-left">'
				+ pseriousTotal
				+'</td>'
				+'<td class="text-left">'
				+ pcommonTotal
				+'</td>'
				+'<td class="text-left">'
				+ pslightTotal
				+'</td>'
				+'<td class="text-left">'
				+ pdeadlyTotal
				+'</td>'
				+'</tr>';

                toggles = $("#rev-toggles"),
                target = $("#flotcontainer");

	            var options = {
	                grid: {
	                    show : true,
	                    borderWidth : 0,
	                    hoverable: true
	                },
	                legend: {
	                    show: true,
	                    noColumns: 4,
	                    margin: 5,
	                    labelFormatter: function(label, series) {
	                        return label;
	                    },
	                    container: "#flotItmesContainer"
	                },
	                tooltip: true,
	                tooltipOpts: {
	                    content: function(label, xval, yval, flotItem) {
	                        return "<b>" + new Date(flotItem.series.data[flotItem.dataIndex][0]).Format("yyyy/MM") + " </b>系统产品缺陷等级" + tipMessage.belong_to + "<strong>" + label + "</strong>" + tipMessage.quantity + yval + " 个  ";
	                    },

	                    // 使工具提示框颜色与数据线颜色保持一致
	                    onHover: function(flotItem, $tooltipEl) {
	                        $tooltipEl.css({
	                            "border-color": flotItem.series.color,
	                            "font-size": 14,
	                            "font-color": "#333"
	                        });
	                    }
	                },
	                xaxis: {
	                    mode: "time",
	                    timeformat: "%y/%m",
                    	minTickSize:[1,"month"]
	                },
	                yaxis: {
	                    tickFormatter: function (val, axis) {
	                        return val;
	                    },
	                    min: 0,
	                    minTickSize: 0.5
	                    //max: 15
	                }
	            };

	            plot2 = null;
	            
	            plot2 = $.plot(target, data, options);
	            
	            //table
	            $("#severityTable").html(pHtml.join("") + ptotalHtml);

	        function gd(year, month, day) {
	            return new Date(year, month, day).getTime();
	        }

	        // 滚动到最上方
	        $("html, body").animate({ scrollTop: 0 }, "fast");
	    }
	};
}();
