/**
 * FileName: common_report.js
 *
 * Copyright (c) 2014 IASPEC, Inc. All Rights Reserved.
 *
 * @author <a href="mailto:qiqu.huang@iaspec.com">Charlie Huang</a>
 * @Version: 1.0.0
 * @DateTime: 2014-01-04
 */
$(function(window, $) {
    var Eipd = window.Eipd;
    Eipd.namespace("issue.report.reportCommon").renderDateView = function(root_url) {
        var self = this;
        loadScript(root_url + "/js/core/report/common/common_report_utility.js", function() {
            var commonUtil = Eipd.issue.report.reportCommonUtility;
            $("#date-unit-sel").find("a").each(function(i, v) {
                var format = $(this).data("dateformat"),
                    viewIndex = $(this).data("viewindex");
                $(this).datepicker({
                    format: format,
                    language: "zh-CN",
                    autoclose: true,
                    startView: viewIndex,
                    minViewMode: viewIndex,
                    calendarWeeks: true
                });
            });

            $("a.year").on("changeYear", function(e) {
                var curSelDate = e.date,
                    year = curSelDate.getFullYear(),
                    startDate = "-01-01",
                    endDate = "-12-31";
                self._updateDatePicker(year + startDate, year + endDate);
            });

            $("a.month").on("changeMonth", function(e) {
                var curSelDate = e.date;
                startDate = commonUtil.transformDate2String(curSelDate),
                    endDate = commonUtil.getMaxDateOnMonth(curSelDate);
                self._updateDatePicker(startDate, endDate);
            });

            $("#startDate, #endDate").datepicker({
                format: "yyyy-mm-dd",
                startView: 0,
                minViewMode: 0,
                language: "zh-CN", // @TUDO, change the i18n
                todayHighlight: 1,
                autoclose: true
            }).on("changeDate", function(e) {
                if ($(e.target).data("type") === "start") {
                    $("#endDate").datepicker("setStartDate", e.date);
                } else {
                    $("#startDate").datepicker("setEndDate", e.date);
                }
            });

            var date = new Date();
            $("#endDate").val(commonUtil.transformDate2String(date));
            date.setDate(1);
            $("#startDate").val(commonUtil.transformDate2String(date));
            $("#totalClick").click();
        });
    };

    Eipd.namespace("issue.report.reportCommon")._updateDatePicker = function(startDate, endDate) {
        $("#startDate").val(startDate);
        $("#endDate").val(endDate);
        $("#startDate, #endDate").datepicker("update");
    };

    Eipd.namespace("issue.report.reportCommon").getDataSource = function(url, startDate, endDate) {
        var dataSource = null;
        $.ajax({
            url: url,
            dataType: "json",
            type: "post",
            async: false,
            data: {
                startDate: startDate,
                endDate: endDate
            },

            success: function(result) {
                var dataSrc = [];
                window.checkResult(result, {
                    showBox: false,
                    callback: function(data) {
                        dataSource = data;
                    }
                });
            }
        });
        return dataSource;
    };

    // $container {jqObj} dataSource {Array}
    Eipd.namespace("issue.report.reportCommon").renderPie = function($container, dataSource) {
        $.plot($container, dataSource, {
            series: {
                pie: {
                    show: true,
                    radius: 1,
                    label: {
                        show: true,
                        radius: 2 / 3,
                        formatter: function(label, series) {
                            return '<div style="font-size:11px;text-align:center;padding:4px;color:white;">' + series.label + '<br/>' + series.percent.toFixed(1) + '%</div>';
                        },
                        threshold: 0.01
                    }
                }
            },
            legend: {
                show: true,
                noColumns: 1, // number of colums in legend table
                labelFormatter: function(label, series) {
                    return label + ': ' + series.data[0][1] + ' (' + (window.isNaN(series.percent) ? 0 : series.percent.toFixed(1)) + '%)';
                }, // fn: string -> string

                labelBoxBorderColor: "#000", // border color for the little label boxes
                container: null, // container (as jQuery object) to put legend in, null means default on top of graph
                position: "ne", // position of default legend container within plot
                margin: [5, 10], // distance from grid edge to default legend container within plot
                backgroundColor: "#efefef", // null means auto-detect
                backgroundOpacity: 1 // set to 0 to avoid background
            },
            grid: {
                hoverable: true,
                clickable: true
            }
        });
    };

    // dataSource  {Object}
    Eipd.namespace("issue.report.reportCommon").fillReportInfos = function(dataSource) {
        for (var k in dataSource) {
            $("." + k).html(dataSource[k]);
        }
    };

    /*
     * $container {jqObj}
     * dataSource {Array} [{labelText: {String}, totalOpeneds: {Number}, totalCloseds: {Number}}]
     */
    Eipd.namespace("issue.report.reportCommon").renderTables = function($container, dataSource) {
        var htmls = [],
            len = dataSource.length,
            closeds = 0,
            totals = 0,
            opened = 0,
            closed = 0,
            i;
        for (i = 0; i < len; i++) {
            var labelText = dataSource[i].labelText,
                totalOpeneds = dataSource[i].totalOpeneds,
                totalCloseds = dataSource[i].totalCloseds;
            closeds += totalCloseds;
            opened += totalOpeneds;
            closed += totalCloseds;
            totals += dataSource[i].totals;
            htmls.push("<tr><td class=\"text-center\"><strong>" +
                (i + 1) + "</strong></td><td>" + labelText +
                "</td><td>" + totalOpeneds + "</td><td>" + totalCloseds +
                "</td><td>" + (totalOpeneds + totalCloseds) + "</td></tr>");
        }

        $container.html(htmls.join(""));
        $(".opened").html(opened);
        $(".closed").html(closed);
        $("#total-Issues").html(totals);
    };

}(window, jQuery));
