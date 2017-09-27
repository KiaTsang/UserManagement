/**
 * File: reportWhiteBoxMembers.js
 * Creator: Terrence.Cai
 * Date: 2015-01-15.
 * Time: 11:00
 * Used: Used for operate report_whitebox_members.jsp
 */
var WhiteBoxMembers = function() {
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
            return WhiteBoxMembers._transformDate2String(newDate);
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
                WhiteBoxMembers._setTimeInterval(year + startDate, year + endDate);
            });

            //处理月份弹出框
            $("a.month").on("changeMonth", function(e) {
                var curSelDate = e.date;
                    startDate = WhiteBoxMembers._transformDate2String(curSelDate),
                    endDate = WhiteBoxMembers._getMaxDateOnMonth(curSelDate);
                WhiteBoxMembers._setTimeInterval(startDate, endDate);
            });

            //处理初次加载该页面
            if((!$("input[name=startDate]").val()) && (!$("input[name=endDate]").val())){
                var date = new Date(),
                	end = WhiteBoxMembers._transformDate2String(date);
                date.setDate(1);
                WhiteBoxMembers._setTimeInterval(WhiteBoxMembers._transformDate2String(date), end);
                
                $("#report_content_A").addClass("hidden");
            }

            //处理点击统计按钮事件
            $(".btn-statistics").click(function(e){
            	//清空现有弹出框
            	clearSmallBox();
            	//更新日历时间和相应的时间区间段
            	WhiteBoxMembers._setTimeInterval($("input[name=startDate]").val(), $("input[name=endDate]").val());
            	//如果选中人员则发送请求否则提醒
            	if($("#memberSelected").select2("val").length){
            		WhiteBoxMembers._quantityStatistics();
            	}else{
            		$("#report_content_A").addClass("hidden");
                    $.smallBox({
                        title: tipMessage.tipMsg,
                        content: tipMessage.plsSelect,
                        icon: "fa fa-bell swing animated",
                        color: "#A65858",
                        timeout: 2000
                    });
            	}
            });
            
            //处理选择需要统计的人员
            $("#memberSelected").select2({
            	width : "90%",
            	multiple: true,
            	allowClear : true,
	    		ajax: {
                    url: $.url_root+'/user/findUsersByDevelopRole.jspa',
                    dataType: "json",
                    quietMillis: 300,
                    type: 'GET',
                    data: function(term, page) {
                    	page = page ? page : 1;
                        return {
                        	"userQueryConditionDTO.name": term,
                            "userQueryConditionDTO.realName": term,
                            iDisplayStart: (page-1)*10 + 1,
                            iDisplayLength: 10
                        };
                    },
                    results: function (data, page) {
                        var more = (page * 10) < data.totalRecords;
                        return {
                            results: data.json.results,
                            more: more
                        };
                    }
                },
                formatResult: function(object, container, query) {
                    var realName = object.realName == undefined ? "<br /> " + i18nRes.global.system.userName + "：" : "<br />" + i18nRes.global.system.userName + "：" + object.realName;
                    var html =  i18nRes.global.system.loginName + "：" + object.text;
                    html += realName;
                    return html;
                },
                formatSelection : function(object, container){
                    var realName = object.realName == undefined ? "" : object.realName;
                    return " " + realName;
                },
                dropdownCssClass: "bigdrop",

                escapeMarkup: function (m) { return m; }
            });

            //导出excel数据为空时给提醒
            $(".exportToExcelGraphs, .exportToExcelTables").click(function(e){
            	//清空现有弹出框
            	clearSmallBox();
            	var startDate = $(".fromDate").html(),
            		endDate = $(".toDate").html(),
            		selectedMembers = $("#memberSelected").select2("val");
            	window.location = $.url_root+'/report/exportWhiteBoxMemberDatas.jspa?startDate='+ startDate + '&endDate=' + endDate + '&selectedMembers=' + selectedMembers;
            });
        },

        //根据时间段查找符合条件的数据
        _quantityStatistics : function(){
            var url=$.url_root+"/report/loadWhiteBoxMemberDatas.jspa",
            	startDate = $("input[name=startDate]").val(),
            	endDate = $("input[name=endDate]").val(),
            	selectedMembers = $("#memberSelected").select2("val"),
            	sourceData = [];
            $.ajax({
                url: url,
                type : "post",
                traditional : true,
                dataType : 'json',
                data: {
                    startDate: startDate,
                    endDate: endDate,
                    selectedMembers : selectedMembers
                },
                success: function(result){
                    checkResult(result, {
                        showBox : false,
                        callback : function(){
                        	// $("#report_content_A").removeClass("hidden");
                            sourceData = result.whiteboxReportDatas;
                            if (sourceData.length > 0) {
                                WhiteBoxMembers._generateStatisticsTable(sourceData);
                                WhiteBoxMembers._generatePageGraphs(sourceData);
                                $("#report_content_A").removeClass("hidden");
                            } else {
                                $("#report_content_A").addClass("hidden");
                            }
                        }
                    });
                },
                error: function(xhr, textStatus, errorThrown) {
                    showOperationError(xhr, textStatus, errorThrown);
                }
            });
        },

        _generatePageGraphs : function(sourceData){
        	var data = sourceData,
        	realData = [],
        	ticks = [],
        	i,j,k,m;
        	
        	for(j = 0; j < sourceData[0].dataSource.length; j ++){
        		ticks.push([j, sourceData[0].dataSource[j][0]]);
        	}
        	
        	for(i = 0; i < data.length; i++){
        		for(m = 0; m < data[i].dataSource.length; m++){
        			data[i].dataSource[m][0] = m;
        		}
        	}
        	
        	
        	for(k = 0; k < data.length; k++){
        		realData.push({
        			label: data[k].fixedUser,
        			data : data[k].dataSource,
        			color: $customColors[k]
        		});
        	}
        	
            var options = {
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
                    hoverable: true,
                    clickable: true,
                    tickColor: $chrtBorderColor,
                    borderWidth: 0,
                    borderColor: $chrtBorderColor
                },
                tooltip: true,
                tooltipOpts: {
                    content: "属于标签<span>%x" + "</span>的白盒缺陷数量共有" + "<span>%y</span>" + "个",
                    defaultTheme: false
                },
                xaxis: {
                    mode: "categories",
                    ticks: ticks,
                    tickFormatter: function(v, axis) {
                        return axis.ticks[v].label;
                    }
                },
                yaxis: {
                    min: 0,
                    tickDecimals: 0
                }
            };

            var target = $("#flotcontainer_A");

            plot2 = null;
            plot2 = $.plot(target, realData, options);
        },

        //渲染统计表
        _generateStatisticsTable : function(sourceData){
        	var datasource = sourceData;
        	var headsCount = (datasource[0] ? datasource[0].dataSource.length : 0),
        		rowCount = datasource.length,
        		theads = [],
        		trs = [],
        		tfoots = [],
        		colsCount = [],
        		allCount = 0;
        	theads.push('<tr><th class="text-center" style="width:40px">No.</th><th>' + report.sharing.name + '</th>');
        	for(var j = 0; j < rowCount; j++){
        		var rowsCount = 0;
        		trs.push('<tr>');
        		trs.push('<td class="text-center"><strong>' + (j + 1) + '</strong></td>');
        		trs.push('<td><a href="javascript:void(0);">' + datasource[j].fixedUser + '</a></td>');
        		for(var i = 0; i < headsCount; i++){
        			if(j == 0){
        				theads.push('<th>' + datasource[0].dataSource[i][0] + '</th>');
        			}
        			trs.push('<td>' + datasource[j].dataSource[i][1] + '</td>');
        			rowsCount += datasource[j].dataSource[i][1];
        			colsCount[i] = colsCount[i] ? colsCount[i] + datasource[j].dataSource[i][1] : datasource[j].dataSource[i][1];
        		}
        		trs.push('<td>' + rowsCount + '</td></tr>');
        	}
        	
        	tfoots.push('<tr><td colspan="2">' + report.sharing.totalIssueQuantity + '</td>');
        	for(var i = 0; i < colsCount.length; i++){
        		tfoots.push('<td>' + colsCount[i] + '</td>');
        		allCount += colsCount[i];
        		if(i == colsCount.length - 1){
        			tfoots.push('<td>' + allCount + '</td>');
        		}
        	}
        	tfoots.push('</tr>');
        	theads.push('<th style="width:100px">' + report.sharing.totalIssue + '</th></tr>');
        	
        	$(".thead").html(theads.join(''));
        	$(".tbody").html(trs.join(''));
        	$(".tfoot").html(tfoots.join(''));
        	$(".totalQuantity").html(allCount + report.sharing.util);
        },
    };
}();
