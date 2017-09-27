/**
 * Creator: Terrence.Cai
 * Date: 2014-12-24.
 * Time: 12:00
 * Used: Used for operate report_syspro_feedback_quantity.jsp
 */
var feedbackQuantity = function() {
	var totalFeedbackQuantity = 0;
    return {
        initializeComponent: function() {
            this._initializeEventComponent();
            this._quantityStatistics();
        },

        //初始化日期插件上时间区间的显示
        _setTimeInterval : function(startDate, endDate){
        	$(".fromDate").html(startDate.Format("yyyy-MM-dd"));
            $(".toDate").html(endDate.Format("yyyy-MM-dd"));
            $('input[name=startDate],input[name=endDate]').datepicker('setStartDate',null);
            $('input[name=startDate],input[name=endDate]').datepicker('setEndDate',null);
            $("input[name=startDate]").datepicker('update',startDate).trigger('changeDate');
            $("input[name=endDate]").datepicker('update',endDate).trigger('changeDate');
        },

        //初始化事件组件;
        _initializeEventComponent: function() {
            //初始化日期插件
            $('input[name=startDate],input[name=endDate]').datepicker({
                format: "yyyy-mm",
                startView : 'year',
                minViewMode : 'year',
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

            //处理初次加载该页面时时间区间的设定
            if((!$("input[name=startDate]").val()) && (!$("input[name=endDate]").val())){
                var now = new Date();
                var startDate= new Date(now.getFullYear(),(now.getMonth() - 11),1);
                var endDate = new Date();
                feedbackQuantity._setTimeInterval(startDate, endDate);
            }
            //设定今年时间段
            $(".nowYear").click(function(e){
               var now=new Date();
               var startDate= new Date(now.getFullYear(),0,1);
               var endDate=new Date(now.getFullYear(),11,31);
               feedbackQuantity._setTimeInterval(startDate, endDate);
            });
            //设定去年时间段
            $(".lastYear").click(function(e){
               var now=new Date();
               var startDate= new Date(now.getFullYear()-1,0,1);
               var endDate=new Date(now.getFullYear()-1,11,31);
               feedbackQuantity._setTimeInterval(startDate, endDate);
            });
            //设定前年时间段
            $(".beforeYear").click(function(e){
               var now=new Date();
               var startDate= new Date(now.getFullYear()-2,0,1);
               var endDate=new Date(now.getFullYear()-2,11,31);
               feedbackQuantity._setTimeInterval(startDate, endDate);
            });
            //统计按钮的处理
            $(".btn-statistics").click(function(e){
            	var startDate = $("input[name=startDate]").datepicker('getDate');
            	var endDate = $("input[name=endDate]").datepicker('getDate');
            	feedbackQuantity._setTimeInterval(startDate, endDate);
                feedbackQuantity._quantityStatistics();
                totalFeedbackQuantity = 0;
            });
            
            //导出excel数据为空时给提醒
            $(".exportToExcelGraphs, .exportToExcelTables").click(function(e){
            	//清空现有弹出框
            	clearSmallBox();
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
            	window.location = $.url_root+'/report/exportFeedbackData.jspa';
            });
            
            // 滚动到最上方
            $("html, body").animate({
                scrollTop: 0
            }, "fast");
        },

        //根据时间段查找符合条件的数据
        _quantityStatistics : function(){
            var url=$.url_root+"/report/loadIssuesFeedbackReportOfSystem.jspa",
            	startDate = $("input[name=startDate]").datepicker('getDate').Format('yyyy-MM-dd'),
            	endDate = $("input[name=endDate]").datepicker('getDate').Format('yyyy-MM-dd');

            $.ajax({
                url: url,
                type : "post",
                traditional : true,
                dataType : 'json',
                data: {
                    "condition.startDate": startDate,
                    "condition.endDate": endDate
                },
                success: function(result){
                    checkResult(result, {
                        showBox : false,
                        callback : function(){
                            var sourceData=result.systemReportDatas;
                            feedbackQuantity._generatePageGraphs(sourceData);
                            feedbackQuantity._generateStatisticsTable(sourceData);
                        }
                    });
                },
                error: function(xhr, textStatus, errorThrown) {
                    showOperationError(xhr, textStatus, errorThrown);
                }
            });
        },
        
        //根据数据源渲染折线图
        _generatePageGraphs: function(sourceData) {
            var target = $("#placeholder");
            var reportList = sourceData,
            	graphTicks = [],
            	dataSource = [],
            	dataSet = [],
            	averageDataSource,
            	len = reportList.length,
                totalIssues = 0,
                averageData,
                i;

            for(i = 0; i < len; i++){
            	dataSource.push([i, reportList[i].totalIssues]);
            	graphTicks.push([i, reportList[i].date]);
            	totalIssues += reportList[i].totalIssues;
            	totalFeedbackQuantity += reportList[i].totalIssues;
            }

            averageData = Math.ceil(totalIssues / len);
            averageDataSource = [[0, averageData],[len - 1, averageData]];

            dataSet = [{
                label: tipMessage.feedback_quantity,
                data: dataSource,
                points: {
                    symbol: "circle"
                }
            }, {
                label: tipMessage.average_quantity,
                data: averageDataSource,
                points: {
                    show: false,
                    symbol: "triangle"
                }
            }];

            var options = {
        		legend: {
                    noColumns: 0,
                    labelBoxBorderColor: "#000000",
                    margin: 10,
                    position: "nw"
                },
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true,
                        radius: 3
                    }
                },
                xaxis: {
                    mode: "categories",
                    tickLength: 0,
                    ticks: graphTicks
                },
                grid: {
                    hoverable: true,
                    borderWidth: 1
                },
                colors: $customColors,
                tooltip: true,  // 当鼠标悬停至数据点时，是否显示工具提示
                tooltipOpts: {

                    content: function(label, xval, yval, flotItem) {
                        return "<b>" + flotItem.series.xaxis.ticks[flotItem.dataIndex].label + "系统产品缺陷的反馈数量：" + yval + " 个";
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
                yaxes: [
                        {
                            min: 0, // 不要有 tickLength，有的话就不能显示刻度了
                            tickDecimals: 0     // 不允许刻度有小数
                        }
                ]
            };

            var plot = $.plot(target, dataSet, options);

            //處理缺陷數量
            $('.feedbackQuantity').html(totalIssues + report.sharing.util);
        },

        //渲染統計列表
        _generateStatisticsTable : function(sourceData){
        	$(".total").empty();
        	var bodyHtml = [],
        		totalIssues = 0,
        		i,j;

        	for(i = 0; i<sourceData.length; i++){
            	totalIssues += sourceData[i].totalIssues;
            }

        	for(j = 0; j < sourceData.length; j++){
        		bodyHtml[j] = '<tr>'
                    +'<td class="text-center">'
                    +    '<strong>' +(j+1)+ '</strong>'
                    +'</td>'
                    +'<td class="text-left">'
                    +   sourceData[j].date
                    +'</td>'
                    +'<td class="text-left">'
                    +   sourceData[j].totalIssues
                    +'</td>'
                    +'<td class="text-left">'
                    +   (totalIssues <= 0 ? "0%" : (Math.round(sourceData[j].totalIssues / totalIssues * 10000) / 100.00 + "%"));
                    +'</td>'
                +'</tr>';
        	}

            $("#statisticsTable").html(bodyHtml.join(""));
            $(".total").append("<strong>" + totalIssues + "</strong>");
        }
    };
}();

