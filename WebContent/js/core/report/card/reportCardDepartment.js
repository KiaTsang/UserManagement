/**
 * File: reportCardDepartment.js
 * Creator: Terrence.Cai
 * Date: 2015-01-08.
 * Time: 11:00
 * Used: Used for operate report_card_department.jsp
 */
var CardDepartment = function() {
    return {
        initializeComponent: function() {
            this._initializeEventComponent();
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
            return CardDepartment._transformDate2String(newDate);
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
                CardDepartment._setTimeInterval(year + startDate, year + endDate);
            });

            //处理月份弹出框
            $("a.month").on("changeMonth", function(e) {
                var curSelDate = e.date;
                    startDate = CardDepartment._transformDate2String(curSelDate),
                    endDate = CardDepartment._getMaxDateOnMonth(curSelDate);
                CardDepartment._setTimeInterval(startDate, endDate);
            });

            //处理初次加载该页面
            if((!$("input[name=startDate]").val()) && (!$("input[name=endDate]").val())){
                var date = new Date(),
                	end = CardDepartment._transformDate2String(date);
                date.setDate(1);
                CardDepartment._setTimeInterval(CardDepartment._transformDate2String(date), end);
                CardDepartment._quantityStatistics();
            }

            //处理点击统计按钮事件
            $(".btn-statistics").click(function(e){
            	CardDepartment._setTimeInterval($("input[name=startDate]").val(), $("input[name=endDate]").val());
            	CardDepartment._quantityStatistics();
            });

            //导出excel数据为空时给提醒
            $(".exportToExcelGraphs, .exportToExcelTables").click(function(e){
            	//清空现有弹出框
            	clearSmallBox();
            	var startDate = $(".fromDate").html();
            		endDate = $(".toDate").html();
            	window.location = $.url_root+'/report/exportDepartmentDatas.jspa?startDate='+ startDate + '&endDate=' + endDate;
            });
        },

        //根据时间段查找符合条件的数据
        _quantityStatistics : function(){
            var url=$.url_root+"/report/loadDepartmentDatas.jspa",
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
                            var sourceData=result.issueDTOList;
                            CardDepartment._generatePageGraphs(sourceData);
                            CardDepartment._generateStatisticsTable(sourceData);
                        }
                    });
                },
                error: function(xhr, textStatus, errorThrown) {
                    showOperationError(xhr, textStatus, errorThrown);
                }
            });
        },

        //渲染饼图
        _generatePageGraphs : function(sourceData){
        	var container = $("#flotcontainer_A");

            var data = sourceData,
            	len = sourceData.length,
            	realData = [],
            	ticks = [],
            	totalTypes = 0,
            	i;

			for(i = 0; i < len; i++) {
				var labelText = data[i].labelText,
					totalOpened = sourceData[i].statusMap.totalProcessingStatus,
	    			totalClosed = sourceData[i].statusMap.totalClosedStatus;
	    			totalTypes += (totalOpened + totalClosed);
				
				ticks.push([i, labelText]);
				
				realData.push({
					label: labelText,
	                data: [[i, (totalOpened + totalClosed)]]
	           });
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
                    content : "属于标签<span>%x</span>的缺陷 共有 <span>%y</span> 个",
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
                    tickDecimals: 0,
                }
            };

        	$.plot(container, realData, options);
        	
        	$(".totalNumber").html(totalTypes);
        	$(".totalQuantity").html(totalTypes + "个");
        	// 将顶部的legend移动到外面
        	container.find('.legend').appendTo("#flotItmesContainer");
        },

        //渲染统计图表
        _generateStatisticsTable : function(sourceData){
        	var htmls = [],
        		len = sourceData.length,
        		opened = 0,
        		closed = 0,
        		i;
        	for(i = 0; i < len; i++){
        		var labelText = sourceData[i].labelText,
        			totalOpened = sourceData[i].statusMap.totalProcessingStatus,
        			totalClosed = sourceData[i].statusMap.totalClosedStatus;
        			opened += totalOpened;
        			closed += totalClosed;
        		htmls[i] = '<tr>'
        			+'<td class="text-center">'
        			+	'<strong>' + (i+1) + '</strong>'
        			+'</td>'
        			+'<td><a href="javascript:void(0);">' + labelText + '</a></td>'
        			+'<td>' + totalOpened + '</td>'
        			+'<td>' + totalClosed + '</td>'
        			+'<td>' + (totalOpened + totalClosed) + '</td>'
    			+'</tr>';
        	}
        	$("#statisticsTable").html(htmls.join(""));
        	$(".totalOpened").html(opened);
        	$(".totalClosed").html(closed);
        }
    };
}();
