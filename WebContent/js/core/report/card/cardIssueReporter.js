/**
 * FileName: cardIssueReporter.js
 * 
 * 
 * Copyright (c) 2014 IASPEC, Inc. All Rights Reserved.
 * 
 * @author <a href="mailto:qiqu.huang@iaspec.com">Charlie Huang</a>
 * @Version: 1.0.0
 * @DateTime: 2014-12-26
 */

(function(root_url, window, $) {
    
    var Eipd = window.Eipd,
        loadScript = window.loadScript,
        reqUrl = root_url + "/report/loadCardIssType.jspa";
    
    Eipd.namespace("issue.report.cardIssueTypeReportStat").initialize = function(env) {
        this.handleSearch();
        this.exportData();
        loadScript(root_url + "/js/core/report/common/common_report.js", function() {
            Eipd.issue.report.reportCommon.renderDateView(root_url);
        });
        
    };

    Eipd.namespace("issue.report.cardIssueTypeReportStat").renderIssueReport = function(url, startDate, endDate) {
        var dataSource = Eipd.issue.report.reportCommon.getDataSource(url, startDate, endDate),
            data = dataSource.issueDTOList,
            len = data.length,
            realData = [],
            tableDataSource = [],
            totalIssues = 0,
            i;
        
        for(i = 0; i < len; i ++) {
            realData.push({
                label: data[i].labelText,
                data: parseInt(data[i].total)
            });
            totalIssues += data[i].total;
            tableDataSource.push({
                labelText: data[i].labelText, 
                totalOpeneds: data[i].statusMap.totalProcessingStatus, 
                totalCloseds: data[i].statusMap.totalClosedStatus,
                totals: data[i].total
            });
        }
        
        Eipd.issue.report.reportCommon.renderPie($("#flotcontainer"), realData);
        Eipd.issue.report.reportCommon.fillReportInfos({
            startDate: startDate,
            endDate: endDate,
            vcount: totalIssues
        });
        Eipd.issue.report.reportCommon.renderTables($("#issue-stat-infos"), tableDataSource);
        
    };

    Eipd.namespace("issue.report.cardIssueTypeReportStat").handleSearch = function() {
        var self = this;
        $("#totalClick").on("click", function(e) {
            self.renderIssueReport(reqUrl, $("#startDate").val(), $("#endDate").val());
        });
    };
    
    Eipd.namespace("issue.report.cardIssueTypeReportStat").exportData = function() {
    	$(".exportStatisticsData").on("click", function(e) {
    		window.location = root_url + '/report/exportIssueTypeDatas.jspa?startDate='+ $("#startDate").val() + '&endDate=' + $("#endDate").val();
    	});
    };

    Eipd.namespace("issue.report.cardIssueTypeReportStat").initialize();
}($.url_root, window, jQuery));

