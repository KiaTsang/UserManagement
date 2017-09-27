/**
 * FileName: common_report_utility.js 通用工具类
 * 
 * Copyright (c) 2014 IASPEC, Inc. All Rights Reserved.
 * 
 * @author <a href="mailto:qiqu.huang@iaspec.com">Charlie Huang</a>
 * @Version: 1.0.0
 * @DateTime: 2014-01-04
 */

// Date对象转字符串
Eipd.namespace("issue.report.reportCommonUtility").transformDate2String = function(
        date) {
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
};

Eipd.namespace("issue.report.reportCommonUtility").getMaxDateOnMonth = function(
        date) {
    if (typeof date != "object" || !(date instanceof Date)) {
        throw new Error("The parameter is not a date object");
    }
    
    var newDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    
    return this.transformDate2String(newDate);
};
