/**
 * File: reportWhiteBoxType.js
 * Creator: Terrence.Cai
 * Date: 2015-01-09.
 * Time: 11:00
 * Used: Used for operate report_whitebox_types.jsp
 */
var WhiteBoxType = function() {
	var sourceData = [];
    return {
        initializeComponent: function() {
            this._initializeEventComponent();
        	//WhiteBoxType._pieNow();
        },

        //初始化日期插件上时间区间的显示
        _setTimeInterval : function(startDate, endDate){
            $("#startDate").val(startDate);
            $("#endDate").val(endDate);
            $("#startDate, #endDate").datepicker("update");
            $(".fromDate").html(startDate);
            $(".toDate").html(endDate);
        },

        //将日期转换为字符串
        _transformDate2String : function(date){
            if (typeof date != "object" || !(date instanceof Date)) {
                throw new Error("The parameter is not a date object");
            }

            var year = date.getFullYear(),
            	month = date.getMonth() + 1 + "",
            	date = date.getDate() + "";

            if (month.length === 1) {
                month = "0" + month;
            }

            if (date.length === 1) {
                date = "0" + date;
            }
            return year + "-" + month + "-" + date;
        },

        //获取当前月份的最大日期
        _getMaxDateOnMonth : function(date){
            if (typeof date != "object" || !(date instanceof Date)) {
                throw new Error("The parameter is not a date object");
            }
            var newDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            return WhiteBoxType._transformDate2String(newDate);
        },

        //初始化事件组件;
        _initializeEventComponent: function() {
            //初始化年月视图
            $("#date-unit-sel").find("a").each(function(i, v) {
                var format = $(this).data("dateformat");
                var vIndex = $(this).data("viewindex");
                $(this).datepicker({
                    format: format,
                    language: "zh-CN",
                    startView : vIndex,
                    minViewMode : vIndex,
                    autoclose: true,
                    calendarWeeks: true
                });
            });

            //设置日历插件显示日期
            $('#startDate, #endDate').datepicker({
                format : "yyyy-mm-dd",
                startView : 0,
                minViewMode : 0,
                language : "zh-CN",
                todayHighlight : 1,
                autoclose : true
            }).on("changeDate", function(e) {
                if ($(e.target).data("type") === "start") {
                	$("#endDate").datepicker("setStartDate", e.date);
                } else {
                    $("#startDate").datepicker("setEndDate", e.date);
                }
            });

            //处理年份弹出框
            $("a.year").on("changeYear", function(e) {
                var curSelDate = e.date,
                    year = curSelDate.getFullYear(),
                    startDate = "-01-01",
                    endDate = "-12-31";
                WhiteBoxType._setTimeInterval(year + startDate, year + endDate);
            });

            //处理月份弹出框
            $("a.month").on("changeMonth", function(e) {
                var curSelDate = e.date;
                    startDate = WhiteBoxType._transformDate2String(curSelDate),
                    endDate = WhiteBoxType._getMaxDateOnMonth(curSelDate);
                WhiteBoxType._setTimeInterval(startDate, endDate);
            });

            //处理初次加载该页面
            if((!$("input[name=startDate]").val()) && (!$("input[name=endDate]").val())){
                var date = new Date(),
                	end = WhiteBoxType._transformDate2String(date);
                date.setDate(1);
                WhiteBoxType._setTimeInterval(WhiteBoxType._transformDate2String(date), end);
                // WhiteBoxType._quantityStatistics();
            }

            //处理点击统计按钮事件
            $(".btn-statistics").click(function(e){
            	WhiteBoxType._setTimeInterval($("input[name=startDate]").val(), $("input[name=endDate]").val());
            	WhiteBoxType._quantityStatistics();
            	$("#report_content_A, #total_bar").addClass("hidden");
            });
            
            $(".btn-statistics").click();

            //导出excel数据为空时给提醒
            $(".exportToExcelGraphs, .exportToExcelTables").click(function(e) {
            	//清空现有弹出框
            	clearSmallBox();
            	var startDate = $(".fromDate").html();
            		endDate = $(".toDate").html();
            	window.location = $.url_root+'/report/exportWhiteBoxDatas.jspa?startDate='+ startDate + '&endDate=' + endDate;
            });
        },

        //根据时间段查找符合条件的数据
        _quantityStatistics : function(){
            var url=$.url_root+"/report/loadWhiteBoxTypeDatas.jspa",
            	startDate = $("input[name=startDate]").val(),
            	endDate = $("input[name=endDate]").val();
            $.ajax({
                url: url,
                type : "post",
                traditional : true,
                dataType : 'json',
                data: {
                    startDate: startDate,
                    endDate: endDate
                },
                success: function(result){
                    checkResult(result, {
                        showBox : false,
                        callback : function(){
                            sourceData=result.whiteboxReportDatas;
                            var totalIssues = 0,
                            	i;
                            for(i = 0; i < sourceData.length; i++){
                            	totalIssues += sourceData[i].total;
                            }
                            $(".totalIssues").text(totalIssues + report.sharing.util);
                        	WhiteBoxType._pieNow();
                        }
                    });
                },
                error: function(xhr, textStatus, errorThrown) {
                    showOperationError(xhr, textStatus, errorThrown);
                }
            });
        },

        _pieNow : function(){
        	var dataSource = sourceData,
        		data_pie = [],
        		i;
        	for(i = 0; i < dataSource.length; i++){
        		data_pie.push({
        			name : dataSource[i].labelText,
        			y : dataSource[i].total
        		});
        	}
        	
        	Highcharts.getOptions().plotOptions.pie.colors = $customColors;
        	
        	$("#flotcontainer_pie").highcharts({
                credits: {
                    enabled: false
                },
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: ''
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        }
                    },
                    series: {
                        point: {
                            events: {
                                click: function() {
                                	$("#report_content_A, #total_bar").removeClass("hidden");
                                	WhiteBoxType._showSubSelect(this.name, this.y);
                                }
                            }
                        }
                    }
                },
                series: [{
                    type: 'pie',
                    name: report.sharing.percent,
                    data:data_pie
                }]

            });
        },

        _showSubSelect : function(label){
        	if(!label){
                return;
            }

            $('#total_title').text(label);
            WhiteBoxType._generatePageGraphs(label);
            WhiteBoxType._generateStatisticsTable(label);
        },

        //渲染柱状图
        _generatePageGraphs : function(label){
        	var container = $("#flotcontainer_A");
        	
            var data = sourceData,
            	len = data.length,
            	realData = [],
            	ticks = [],
            	i,j;
			for(i = 0; i < len; i++) {
				if(data[i].labelText == label){
					for(j = 0; j < data[i].detail.length; j++){
						
						ticks.push([j, data[i].detail[j].subTypeName]);
						
						realData.push({
							label: data[i].detail[j].subTypeName,
							data: [[j, data[i].detail[j].total]]
						});
					}
				}
	       }
			
            var options = {
        		colors : $customColors,
                grid : {
                    show : true,
                    hoverable : true,
                    clickable : true,
                    tickColor : $chrtBorderColor,
                    borderWidth : 0,
                    borderColor : $chrtBorderColor
                },
                legend: {
                    show: true,
                    noColumns: 8,
                    margin: 5,
                    container: "#flotItmesContainer",
                    labelFormatter: function(label, series) {
                        return label + ': ' + series.data[0][1];
                    }
                },
                series: {
                    bars: {
                        show: true,
                        barWidth: 0.3,
                        align: "center"
                    }
                },
                tooltip : true,
                tooltipOpts : {
                    content : "属于标签<span>%x</span>的白盒缺陷数量" + report.sharing.totalHave + "<span>%y</span>个",
                    defaultTheme : false,
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
                    ticks: ticks
                },
                yaxis: {
                    min: 0,
                    tickDecimals: 0
                }
            };

        	$.plot(container, realData, options);
        },

        //渲染统计表
        _generateStatisticsTable : function(label) {
        	$(".totalQuantity, .totalNumber").empty();
        	var data = sourceData,
    		len = data.length,
    		htmls = [],
    		totals = 0,
    		i,j;
			for(i = 0; i < len; i++) {
				if(data[i].labelText == label){
					for(j = 0; j < data[i].detail.length; j++){
						totals += data[i].detail[j].total;
						htmls[j] = '<tr>'
							+ '<td class="text-center"><strong>' + (j + 1) + '</strong></td>'
                            + '<td><a href="javascript:void(0);">' + data[i].detail[j].subTypeName + '</a></td>'
                            + '<td>' + data[i].detail[j].total + '</td>'
		    			+'</tr>';
					}
				}
	        }
			$("#statisticsTable").html(htmls.join(""));
			$(".totalQuantity, .totalNumber").html(totals + report.sharing.util);
        }
    };
}();