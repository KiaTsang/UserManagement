/**
 * FileName: reportMainPageSystemStatistics.js
 *
 * File description goes here.
 *
 * Copyright (c) 2014 Iaspec, Inc. All Rights Reserved.
 *
 * @author <a href="mailto:qiqu.huang@iaspec.net">Charlie Huang</a>
 * @Version: 1.0.0
 * @DateTime: 2014-09-27
 */

var systemStatistics = (function() {
    return {
        plot: null,

        plot2: null,

        plot3: null,

        amountOfFeedbackGraphOptions: {
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
            },
            yaxes: [
                {
                    min: 0, // 不要有 tickLength，有的话就不能显示刻度了
                    tickDecimals: 0     // 不允许刻度有小数
                }
            ],
            grid: {
                hoverable: true,
                borderWidth: 1
            },
            colors: $customColors,
            tooltip: true,  // 当鼠标悬停至数据点时，是否显示工具提示
            tooltipOpts: {

                content: function(label, xval, yval, flotItem) {
                    return "<b>" + flotItem.series.xaxis.ticks[flotItem.dataIndex].label + " 系统产品</b> 的缺陷数量：" + yval;
                },

                // 使工具提示框颜色与数据线颜色保持一致
                onHover: function(flotItem, $tooltipEl) {
                    $tooltipEl.css({
                        "border-color": flotItem.series.color,
                        "font-size": 14,
                        "font-color": "#333"
                    });
                }
            }
        },

        severityStatisticsGraphOptions: {
            grid: {
                show : true,
                borderWidth : 0,
                hoverable: true
            },
            legend: {
                show: true,
                noColumns: 4,
                margin: 10,
                // position: "nw", // 放置位置

                labelFormatter: function(label, series) {
                    return label;
                },

                container: $(".chart2-legend")
            },
            tooltip: true,
            tooltipOpts: {

                content: function(label, xval, yval, flotItem) {
                    return "<b>" + systemStatistics.formatDate(flotItem.series.data[flotItem.dataIndex][0]) + " </b> 属于" + label + " 的缺陷数量：" + yval;
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
                timeformat: "%y/%m"
            },
            yaxis: {

                tickFormatter: function (val, axis) {
                    return val;
                }
                // max: 15 // 控制最大值为15
            },
            yaxes: [
                {
                    min: 0, // 不要有 tickLength，有的话就不能显示刻度了
                    tickDecimals: 0     // 不允许刻度有小数
                }
            ]
        },

        sourceStatisticsGraphOptions: {
            grid: {
                show : true,
                borderWidth : 0,
                hoverable: true,
                clickable: true
            },
            legend: {
                show: true,
                noColumns: 15,
                margin: 10,

                labelFormatter: function(label, series) {
                    return label;
                },

                container: $(".chart3-legend")
            },
            tooltip: true,
            tooltipOpts: {

                content: function(label, xval, yval, flotItem) {
                    return "<b>" + systemStatistics.formatDate(flotItem.series.data[flotItem.dataIndex][0]) + " </b> 来源于" + label + " 的缺陷数量：" + yval;
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
                timeformat: "%y/%m"
            },
            yaxis: {
                tickFormatter: function (val, axis) {
                    return val;
                }
            },
            yaxes: [
                {
                    min: 0, // 不要有 tickLength，有的话就不能显示刻度了
                    tickDecimals: 0     // 不允许刻度有小数
                }
            ]
        },

        // 进行初始化动作
        initialize: function() {
            // this.renderAmountOfFeedbackReport();

            this.bindEventForReportTrigger();

            // 首次加载反馈数量统计
            $("#myTabS1").click();
        },

        // 绑定报表切换事件
        bindEventForReportTrigger: function() {
            var that = this,
                isFirstLoad = false;

            $("#myTabS1").on("click", function(e) {
                if((!isFirstLoad || !$('#s1').is(":visible")) && !that.plot) {   // lazy load
                    setTimeout($.proxy(that.renderAmountOfFeedbackReport, that), 500);
                    isFirstLoad = true;
                }
            });

            $('#myTabS2').on("click", function(e) {
                if(!$('#s2').is(":visible") && !that.plot2) {
                    setTimeout($.proxy(that.renderIssueSeverityReport, that), 500);
                }
            });

            $('#myTabS3').on("click", function(e) {
                if(!$('#s3').is(":visible") && !that.plot3) {
                    setTimeout($.proxy(that.renderIssueSourceReport, that), 500);
                }
            });
        },

        // 获取数据并渲染报表
        renderAmountOfFeedbackReport: function() {
            var that = this;
            $.ajax({
                url: $.url_root + "/report/loadIssuesFeedbackReportOfSystem.jspa",
                type: "post",
                dataType: "json",

                success: function(result) {
                    checkResult(result, {
                        showBox: false,
                        callback: function () {
                            var reportList = result.systemReportDatas,
                                graphTicks = [],
                                dataSource = [],
                                dataSet = [],
                                averageDataSource,
                                len = reportList.length,
                                totalIssues = 0,
                                averageData,
                                i;

                            for(i = 0; i < len; i++) {
                                dataSource.push([i, reportList[i].totalIssues]);
                                graphTicks.push([i, reportList[i].date]);
                                totalIssues += reportList[i].totalIssues;
                            }

                            averageData = Math.ceil(totalIssues / len);    // 求平均缺陷个数
                            averageDataSource = [[0, averageData], [len - 1, averageData]];

                            $.extend(that.amountOfFeedbackGraphOptions.xaxis, {
                                ticks: graphTicks
                            });

                            dataSet = [{
                                label:"反馈数量",
                                data: dataSource,
                                points: {
                                    symbol: "circle"
                                }
                            }, {
                                label:"平均",
                                data: averageDataSource,
                                points: {
                                    show: false,
                                    symbol: "triangle"
                                }
                            }];

                            if (len) {
                                $(".graph-title").eq(0).html("系统产品 " + graphTicks[0][1] + " ~ " + graphTicks[len - 1][1] + " 反馈数量统计");
                            }

                            that.plot = $.plot($("#chart1"), dataSet, that.amountOfFeedbackGraphOptions);
                        }
                    });
                }
            });
        },

        // 获取数据并渲染严重程度统计报表
        renderIssueSeverityReport: function() {
            var that = this;
            $.ajax({
                url: $.url_root + "/report/loadIssuesSeverityReportOfSystem.jspa",
                type: "post",
                dataType: "json",

                success: function(result) {
                    checkResult(result, {
                        showBox: false,

                        callback: function () {
                            var reportList = result.systemReportDatas,
                                dataSource = [],
                                len = reportList.length,
                                i;
                            
                            if (len > 0) {
                                for(i = 0; i < len; i++) {
                                    dataSource.push({
                                        label: i18nRes.issue.issueSeverity[reportList[i].labelText],
                                        data: reportList[i].dataSource,
                                        color: $customColors[i],
                                        bars: {
                                            show: true,
                                            align: "left",
                                            barWidth: 4 * 30 * 60 * 1000 * 80,
                                            order : (i + 1)
                                        },
                                        valueLabels: {
                                            show: true,
                                            align: "center",
                                            hideSame: false
                                        }
                                    });
                                }
    
                                if (len && reportList[0].dataSource) {
    
                                    // TUDO, need to format the date
                                    $(".graph-title").eq(1).html("系统产品 " + that.formatDate(reportList[0].dataSource[0][0]) + " ~ " + that.formatDate(reportList[0].dataSource[reportList[0].dataSource.length - 1][0]) + " 缺陷严重程度统计");
                                }
    
                                that.plot2 = $.plot($("#chart2"), dataSource, that.severityStatisticsGraphOptions);
                            } else {
                                $("#chart2").html("<div style='width: 200px; margin: auto auto;'><h4><strong>没有符合指定条件的数据</strong></h4></div>");
                            }
                        }
                    });
                }
            });
        },

        //渲染缺陷来源图标
        renderIssueSourceReport: function() {
            var that = this;
            $.ajax({
                url: $.url_root + "/report/loadIssueFromSrcReportOfSystem.jspa",
                type: "post",
                dataType: "json",

                success: function(result) {
                    checkResult(result, {
                        showBox: false,

                        callback: function () {
                            var reportList = result.systemReportDatas,
                                dataSource = [],
                                len = reportList.length,
                                i;

                            for(i = 0; i < len; i++) {
                                dataSource.push({
                                    label: reportList[i].labelText,
                                    data: reportList[i].dataSource,
                                    color: $customColors[i],
                                    bars: {
                                        show: true,
                                        align: "left",
                                        barWidth: 4 * 30 * 60 * 1000 * 80 * 4 / len,
                                        order : (i + 1)
                                    },
                                    valueLabels: {
                                        show: true,
                                        align: "center",
                                        hideSame: false
                                    }
                                });
                            }

                            if (len && reportList[0].dataSource) {

                                // TUDO, need to format the date
                                $(".graph-title").eq(2).html("系统产品 " + that.formatDate(reportList[0].dataSource[0][0]) + " ~ " + that.formatDate(reportList[0].dataSource[reportList[0].dataSource.length - 1][0]) + " 缺陷来源统计");
                            }

                            that.plot3 = $.plot($("#chart3"), dataSource, that.sourceStatisticsGraphOptions);
                        }
                    });
                }
            });
        },

        formatDate: function(millis) {
            return new Date(millis).Format("yyyy年MM月");
        }
    };
}());
