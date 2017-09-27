/**
 * File: reportCardProductType.js
 * Creator: Terrence.Cai
 * Date: 2015-01-05.
 * Time: 11:00
 * Used: Used for operate report_card_product_type.jsp
 */
var CardProductType = function() {
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
            return CardProductType._transformDate2String(newDate);
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
                CardProductType._setTimeInterval(year + startDate, year + endDate);
            });

            //处理月份弹出框
            $("a.month").on("changeMonth", function(e) {
                var curSelDate = e.date;
                    startDate = CardProductType._transformDate2String(curSelDate),
                    endDate = CardProductType._getMaxDateOnMonth(curSelDate);
                CardProductType._setTimeInterval(startDate, endDate);
            });

            //处理初次加载该页面
            if((!$("input[name=startDate]").val()) && (!$("input[name=endDate]").val())){
                var date = new Date(),
                	end = CardProductType._transformDate2String(date);
                date.setDate(1);
                CardProductType._setTimeInterval(CardProductType._transformDate2String(date), end);
                CardProductType._quantityStatistics();
            }

            //处理点击统计按钮事件
            $(".btn-statistics").click(function(e){
            	CardProductType._setTimeInterval($("input[name=startDate]").val(), $("input[name=endDate]").val());
            	CardProductType._quantityStatistics();
            });

            //导出excel数据为空时给提醒
            $(".exportToExcelGraphs, .exportToExcelTables").click(function(e){
            	//清空现有弹出框
            	clearSmallBox();
            	var startDate = $(".fromDate").html();
            		endDate = $(".toDate").html();
            	/*
            	if(!totalFeedbackQuantity){
            		$.smallBox({
            			title: tipMessage.tipMsg,
            			content: tipMessage.tipCon,
            			icon: "fa fa-bell swing animated",
                        color: "#A65858",
                        timeout: 2000
            		});
            		return;
            	}
            	*/
            	window.location = $.url_root+'/report/exportCardProductDatas.jspa?startDate='+ startDate + '&endDate=' + endDate;
            });
        },

        //根据时间段查找符合条件的数据
        _quantityStatistics : function(){
            var url=$.url_root+"/report/loadCardProductTypeDatas.jspa",
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
                            CardProductType._generatePageGraphs(sourceData);
                            CardProductType._generateStatisticsTable(sourceData);
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
            var container = $("#pie_chart_C");

            var data = sourceData,
            	len = data.length,
            	realData = [],
            	totalTypes = 0,
            	i;
            for(i = 0; i < len; i++){
            	realData.push({
            		label: data[i].labelText,
            		data : parseInt(data[i].total)
                });
            	totalTypes += data[i].total;
            }

            var options = {
                series : {
                    pie : {
                        show : true,
                        //innerRadius : 0.1,
                        radius : 1,
                        label : {
                            show : true,
                            radius : 2 / 3,
                            formatter : function(label, series) {
                                return '<div style="font-size:11px;text-align:center;padding:4px;color:white;">' + series.label + '<br/>' + series.percent.toFixed(1) + '%</div>';
                            },
                            threshold : 0.05
                        }
                    }
                },
                legend : {
                    show : true,
                    // number of colums in legend table
                    noColumns : 2,
                    // fn: string -> string
                    labelFormatter : function(label, series) {
                        return label + ': ' + series.data[0][1] + ' (' + (window.isNaN(series.percent) ? 0 : series.percent.toFixed(1)) + '%)';
                    },
                    // border color for the little label boxes
                    labelBoxBorderColor : "#000",
                    // container (as jQuery object) to put legend in, null means default on top of graph
                    container : null,
                    // position of default legend container within plot
                    position : "ne",
                    // distance from grid edge to default legend container within plot
                    margin : [5, 10],
                    // null means auto-detect
                    backgroundColor : "#efefef",
                    // set to 0 to avoid background
                    backgroundOpacity : 1
                },
                grid : {
                    hoverable : true,
                    clickable : true
                }
            };

            $.plot(container, realData, options);
            $(".totalNumber").html(totalTypes);
            $(".totalQuantity").html(totalTypes + "个");
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

