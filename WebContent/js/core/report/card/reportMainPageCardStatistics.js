/**
 * FileName: reportMainPageCardStatistics.js
 *
 * File description goes here.
 *
 * Copyright (c) 2014 Iaspec, Inc. All Rights Reserved.
 *
 * @author <a href="mailto:qiqu.huang@iaspec.net">Charlie Huang</a>
 * @Version: 1.0.0
 * @DateTime: 2014-09-25
 */

var cardStatistics = (function() {
    var labels = [];
    return {

        options: null,

        dataSource: [],

        plot: null,

        _setLabels: function(labs) {
            labels = labs.slice(0);
        },

        _getLabels: function() {
            return labels;
        },

        //进行初始化动作
        initialize: function() {
            this.loadReportGraphOption();
            this.getReportDataSource();
            this.setExtendArrayFunction();
            this.initGraphCheckedBoxEvent();
        },

        //扩展数组原型功能
        setExtendArrayFunction: function() {
            Array.prototype.removeElementByIndex = function(index) {
                if (typeof index != "number" || index >= this.length || index < 0) {
                    throw new Error("the index is out of array");
                }

                var newArray = [],
                    i,
                    len;
                for(i = 0, len = this.length; i < len; i++) {
                    if(i !== index) {
                        newArray.push(this[i]);
                    }
                }

                return newArray;
            };
        },

        //初始化报表的checkbox事件监听
        initGraphCheckedBoxEvent: function() {
            var that = this;
            $("#rev-toggles_B").on("change", ".checkbox",function() {
                var newDataSource = [];
                $("#rev-toggles_B").find(":checked").each(function(i, v) {
                    newDataSource.push(that.dataSource[$(this).parent().data("index")]);
                });
                that.generateStatisticeReport(newDataSource);
            });
        },

        /*
         * 读取报表的配置
         * TODO: 当图形数据在图表中一致时，就会产生重叠，因此会造成工具条只显示其中一个工具提示，需要后期继续完善。
         */
        loadReportGraphOption: function() {
            var that = this;
            this.options = {
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
                    hoverable: true,    // 是否允许鼠标悬停显示信息
                    clickable: true,
                    tickColor: $chrtBorderColor,    // 垂直标线的颜色
                    borderWidth: 0,    // 容器边框的宽度
                    borderColor: $chrtBorderColor    // 容器边框的颜色
                },
                tooltip: true,    // 当鼠标悬停至数据点时，是否显示工具提示
                tooltipOpts: {

                    content: function(label, xval, yval, flotItem) {
                        console.log(flotItem);
                        var labels = that._getLabels()[flotItem.dataIndex][yval],
                            html = [];
                        for (var i = 0, len = labels.length; i < len; i++) {
                            html.push("<b>" + xval + "</b>年度属于标签<b>\<<span style='color: #739e73;'>" + labels[i] + "</span>\></b>的卡产品缺陷数量&nbsp;共有 <b>" + yval + "</b> 个<br>");
                        }
                        return html.join("");
                        return "";
                    },

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
                        // min: 0,
                        tickLength: 10
                    }
                ],
                xaxis: {
                    ticks: 15,
                    tickDecimals: 0
                },
                yaxis: {
                    // ticks: 15,
                    tickDecimals: 0,
                    min: 0
                }
            };
        },

        /*
         * 获取报表的数据源
         * var dataSource = [];
         * var retResult = [{labelText: "性能缺陷", dataSource: [[2008, 缺陷总数], [2009, 缺陷总数]]}, {labelText: "功能缺陷", dataSource: [[2008, 缺陷总数], [2009, 缺陷总数]]}];
         * for(var i = 0, len = retResult.length; i < len; i++) {
         *    dataSource.push({label: retResult[i].labelText, data: retResult[i].dataSource, color: customColors[i]});
         * }
         */
        getReportDataSource: function() {
            var that = this;
            $.ajax({
                url: $.url_root + "/report/loadIssuesReportOfMalfunction.jspa",
                type: "post",
                dataType: "json",

                success: function(result) {
                    checkResult(result, {
                        showBox: false,
                        callback: function () {
                            var reportList = result.issueDTOList,
                                checkedboxDataSource = [],
                                i,
                                len;

                            if (reportList.length > 0) {
                                for(i = 0, len = reportList.length; i < len; i++) {
                                    that.dataSource.push({
                                        label: reportList[i].labelText,
                                        data: reportList[i].dataSource,
                                        color: $customColors[i]
                                    });

                                    checkedboxDataSource.push({
                                        text: reportList[i].labelText
                                    });
                                }

                                var totalYears = reportList[0].dataSource.length,
                                    toolTips = [];

                                for (var j = 0; j < totalYears; j++) {
                                    var datas = {},
                                        obj = {};
                                    for (var k = 0; k < len; k++) {
                                        if (!datas[reportList[k].dataSource[j][1]]) {
                                            datas[reportList[k].dataSource[j][1]] = [];
                                        }
                                        datas[reportList[k].dataSource[j][1]].push(reportList[k].labelText);
                                    }
                                    toolTips.push(datas);
                                }

                                that._setLabels(toolTips);

                                that.generateStatisticeReport(that.dataSource);
                                that.generateReportCheckbox(checkedboxDataSource);
                            } else {
                                $("#flotcontainer_B").html("<div style='width: 200px; margin: auto auto;'><h4><strong>没有符合指定条件的数据</strong></h4></div>");
                            }
                        }
                    });
                }
            });
        },

        //绘制报表
        generateStatisticeReport: function(dataSource) {
            var $target = $("#flotcontainer_B");
            if (dataSource.length) {
                if (this.plot) {
                    this.plot.setData(dataSource);
                    this.plot.draw();
                } else {
                    this.plot = $.plot($target, dataSource, this.options);
                }
            }
        },

        //根据数据源来绘制相应的checkbox
        generateReportCheckbox: function(checkedboxDataSource) {
            var html = [],
                i,
                len;
            for(i=0, len=checkedboxDataSource.length; i < len; i++) {
                html[i] = "<label for=\"" + "gra-" + i + "_B\"" + "class=\"checkbox\" data-index=\"" + i + "\">" +
                          "<input type=\"checkbox\" id=\"gra-" + i + "_B\" checked=\"checked\">" +
                          "<i></i> " + checkedboxDataSource[i].text + "</label>";
            }

            $("#rev-toggles_B").html(html.join(""));
        }
    };
}());
