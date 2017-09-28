/**
 * 自定义js工具类
 * @namespace Businesssuport.Util.DateUtil
 * @author  zengqingyue.
 * @since   2013-12-16.
 *
 */
var DateUtil = new Object();
var now = new Date(); //当前日期
var nowDayOfWeek = now.getDay(); //今天本周的第几天
var nowDay = now.getDate(); //当前日
var nowMonth = now.getMonth(); //当前月
var nowYear = now.getFullYear(); //当前年

//获得某月的天数
DateUtil.getMonthDays = function(myMonth) {
    var monthStartDate = new Date(nowYear, myMonth, 1);
    var monthEndDate = new Date(nowYear, myMonth + 1, 1);
    var   days   =   (monthEndDate   -   monthStartDate)/(1000   *   60   *   60   *   24);
    return   days;
}
//获得本周的开端日期
DateUtil.getWeekStartDate = function(format) {
    var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1);
    return weekStartDate.pattern(format);
}

//获得本周的停止日期
DateUtil.getWeekEndDate = function(format) {
    var weekEndDate = new Date(nowYear, nowMonth, nowDay + (7 - nowDayOfWeek));
    return weekEndDate.pattern(format);
}

//获得本月的开端日期
DateUtil.getMonthStartDate = function(format) {
    var monthStartDate = new Date(nowYear, nowMonth, 1);
    return monthStartDate.pattern(format);
}
//获得本月的停止日期
DateUtil.getMonthEndDate = function(format) {
    var monthEndDate = new Date(nowYear, nowMonth, DateUtil.getMonthDays(nowMonth));
    return monthEndDate.pattern(format);
}
//获取本年的开始日期
DateUtil.getYearStartDate = function(format) {
    var yearStartDate = new Date(nowYear, 0, 1);
    return yearStartDate.pattern(format);
}

//获得某年某月的天数
DateUtil.getMonthDaysNew = function(year,month) {
    var monthStartDate = new Date(year, month, 1);
    var monthEndDate = new Date(year,month + 1, 1);
    var   days   =   (monthEndDate   -   monthStartDate)/(1000   *   60   *   60   *   24);
    return   days;
}
//获取某一天
DateUtil.getDateNew = function(year,month,newDay,format) {
    var weekStartDate = new Date(year, month, newDay);
    return weekStartDate.pattern(format);
}
//获取周的开始日期
DateUtil.getDateNew = function(year,month,newDay,newDayOfWeek,format) {
    var weekStartDate = new Date(year, month, newDay - newDayOfWeek + 1);
    return weekStartDate.pattern(format);
}
//获得周的停止日期
DateUtil.getWeekEndDateNew = function(year,month,newDay,newDayOfWeek,format) {
    var weekEndDate = new Date(year, month, newDay + (7 - newDayOfWeek));
    return weekEndDate.pattern(format);
}
//获得月的开端日期
DateUtil.getMonthStartDateNew = function(year,month,newDay,newDayOfWeek,format) {
    var monthStartDate = new Date(year, month, 1);
    return monthStartDate.pattern(format);
}
//获得月的停止日期
DateUtil.getMonthEndDateNew = function(year,month,newDay,newDayOfWeek,format) {
    var monthEndDate = new Date(year, month, DateUtil.getMonthDaysNew(year,month));
    return monthEndDate.pattern(format);
}
//获取年的开始日期
DateUtil.getYearStartDateNew = function(year,month,newDay,newDayOfWeek,format) {
    var yearStartDate = new Date(year, 0, 1);
    return yearStartDate.pattern(format);
}
//获取年的结束日期
DateUtil.getYearEndDateNew = function(year,month,newDay,newDayOfWeek,format) {
    var yearEndDate = new Date(year, 11, 31);
    return yearEndDate.pattern(format);
}

Date.prototype.pattern=function(fmt) {
    var o = {
        "M+" : this.getMonth()+1, //月份
        "d+" : this.getDate(), //日
        "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时
        "H+" : this.getHours(), //小时
        "m+" : this.getMinutes(), //分
        "s+" : this.getSeconds(), //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S" : this.getMilliseconds() //毫秒
    };
    var week = {
        "0" : "\u65e5",
        "1" : "\u4e00",
        "2" : "\u4e8c",
        "3" : "\u4e09",
        "4" : "\u56db",
        "5" : "\u4e94",
        "6" : "\u516d"
    };
    if(/(y+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    if(/(E+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "\u661f\u671f" : "\u5468") : "")+week[this.getDay()+""]);
    }
    for(var k in o){
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}
