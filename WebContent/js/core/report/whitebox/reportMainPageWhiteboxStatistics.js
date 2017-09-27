/**
 * FileName: reportMainPageCardStatistics.js
 *
 * File description goes here.
 *
 * Copyright (c) 2014 Iaspec, Inc. All Rights Reserved.
 *
 * @author <a href="mailto:qiqu.huang@iaspec.net">Charlie Huang</a>
 * @Version: 1.0.0
 * @DateTime: 2014-09-26
 */

var whiteboxStatistics = (function() {
	return {

		options: {
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
                tickLength: 0
            },
            yaxes: [
                {
                    min: 0,
                    tickDecimals: 0
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
                    return "<b>" + flotItem.series.xaxis.ticks[flotItem.dataIndex].label + " </b> 的缺陷数量：" + yval;
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

		// 进行初始化动作
		initialize: function() {
			this.renderTheReportOfWhitebox();
		},

		// 获取数据并渲染报表
		renderTheReportOfWhitebox: function() {
			var that = this;
			$.ajax({
    			url: $.url_root + "/report/loadIssuesReportOfWhitebox.jspa",
    			type: "post",
    			dataType: "json",

    			success: function(result) {
    				checkResult(result, {
    					showBox: false,
    					callback: function () {
                            var reportList = result.whiteboxReportDatas,
                                graphTicks = [],
                                dataSource = [],
                                len = reportList.length,
                                i;

    						for(i=0; i < len; i++) {
                                dataSource.push([i, reportList[i].totalIssues]);
                                graphTicks.push([i, reportList[i].date]);
    						}

                            $.extend(that.options.xaxis, {
                                ticks: graphTicks
                            });

                            if (len) {
                                $(".graph-title").html(graphTicks[0][1] + " ~ " + graphTicks[11][1] + " 白盒缺陷趋势");
                            }

                            $.plot($("#chart1"), [{ // 渲染报表
                                label: "缺陷数量",
                                data: dataSource,
                                points: {
                                    symbol: "circle"
                                }
                            }], that.options);
    					}
    				});
    			}
        	});
		}
	};
}());
