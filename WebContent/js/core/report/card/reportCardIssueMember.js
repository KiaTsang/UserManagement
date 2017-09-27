/**
 * File: reportWhiteBoxMembers.js
 * Creator: Terrence.Cai
 * Date: 2015-01-20.
 * Time: 11:00
 * Used: Used for operate report_card_issue_members.jsp
 */
var CardReportMembers = function() {
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
            return CardReportMembers._transformDate2String(newDate);
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
                CardReportMembers._setTimeInterval(year + startDate, year + endDate);
            });

            //处理月份弹出框
            $("a.month").on("changeMonth", function(e) {
                var curSelDate = e.date;
                    startDate = CardReportMembers._transformDate2String(curSelDate),
                    endDate = CardReportMembers._getMaxDateOnMonth(curSelDate);
                CardReportMembers._setTimeInterval(startDate, endDate);
            });

            //处理初次加载该页面
            if((!$("input[name=startDate]").val()) && (!$("input[name=endDate]").val())){
                var date = new Date(),
                    end = CardReportMembers._transformDate2String(date);
                date.setDate(1);
                CardReportMembers._setTimeInterval(CardReportMembers._transformDate2String(date), end);

                //$("#report_content_A").addClass("hidden");
            }

            //处理点击统计按钮事件
            $(".btn-statistics").click(function(e){
                //清空现有弹出框
                clearSmallBox();
                //更新日历时间和相应的时间区间段
                CardReportMembers._setTimeInterval($("input[name=startDate]").val(), $("input[name=endDate]").val());
                //如果选中人员则发送请求否则提醒
                if($("#memberSelected").select2("val").length){
                    CardReportMembers._quantityStatistics();
                }else{
                    $("#report_content_A").addClass("hidden");
                    $.smallBox({
                        title: "提醒信息",
                        content: "请选择要统计的人员",
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
                    var realName = object.realName == undefined ? "<br /> 用户名：" : "<br />" + "用户名：" + object.realName;
                    var html = "登录名：" + object.text;
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
                window.location = $.url_root+'/report/exportCardIssueMembersDatas.jspa?startDate='+ startDate + '&endDate=' + endDate + '&members=' + selectedMembers;
            });
        },

        //根据时间段查找符合条件的数据
        _quantityStatistics : function(){
            var url=$.url_root+"/report/loadCardIssueMembersDatas.jspa",
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
                    members: selectedMembers
                },
                success: function(result){
                    checkResult(result, {
                        showBox : false,
                        callback : function(){
                        	sourceData=result.cardReportDTOList;
                            if(sourceData.length){
	                        	$("#report_content_A").removeClass("hidden");
	                            CardReportMembers._generateStatisticsTable(sourceData);
	                            CardReportMembers._generatePageGraphs(sourceData);
                            }
                        }
                    });
                },
                error: function(xhr, textStatus, errorThrown) {
                    showOperationError(xhr, textStatus, errorThrown);
                }
            });
        },
        
        //渲染柱状图
        _generatePageGraphs : function(sourceData){
        	
        	var data = sourceData,
        		ticks = [],
        		open = [],
        		disputable = [],
        		reopen = [],
        		fixed = [],
        		ds = [],
        		i,j;
        		
            for (i = 0; i <data.length; i++){
            	ticks.push([i, data[i].labelText]);
            	for(j = 0; j < data[i].dataSource.length; j++){
            		if(data[i].dataSource[j][0] == 'OPEN'){
            			open.push([i, data[i].dataSource[j][1]]);
            		}
            		if(data[i].dataSource[j][0] == 'DISPUTABLE'){
            			disputable.push([i, data[i].dataSource[j][1]]);
            		}
            		if(data[i].dataSource[j][0] == 'REOPEN'){
            			reopen.push([i, data[i].dataSource[j][1]]);
            		}
            		if(data[i].dataSource[j][0] == 'FIXED'){
            			fixed.push([i, data[i].dataSource[j][1]]);
            		}
            	}
            }

            ds.push({
                label:"打开",
                data : open,
                bars : {
                    show : true,
                    barWidth : 0.1,
                    order : 1
                },
                valueLabels: {
                  show: true,
                  align: 'center',
                  hideSame: false
                }
            });
            ds.push({
                label:"争议",
                data : disputable,
                bars : {
                    show : true,
                    barWidth : 0.1,
                    order : 2
                },
                valueLabels: {
                  show: true,
                  align: 'center',
                  hideSame: false
                }
            });
            ds.push({
                label:"重新打开",
                data : reopen,
                bars : {
                    show : true,
                    barWidth : 0.1,
                    order : 3
                },
                valueLabels: {
                  show: true,
                  align: 'center',
                  hideSame: false
                }
            });

            ds.push({
                label:"已修复",
                data : fixed,
                bars : {
                    show : true,
                    barWidth : 0.1,
                    order : 3
                },
                valueLabels: {
                  show: true,
                  align: 'center',
                  hideSame: false
                }
            });

            var options = {
                colors : $customColors,
                grid : {
                    show : true,
                    hoverable : true,
                    clickable : true,
                    tickColor : $chrtBorderColor,
                    borderWidth : 0,
                    borderColor : $chrtBorderColor
                },
                legend : {
                    show : true
                },
                tooltip : true,
                tooltipOpts : {
                    content : "<b>%s</b> : <span>%y</span> 个",
                    defaultTheme : false
                },xaxis: {
                    ticks: ticks
                },
                yaxis: {
                    tickDecimals: 0,
                    min: 0
                }
            };

            var target = $("#flotcontainer_A");

            plot2 = null;
            plot2 = $.plot(target, ds, options);
        },

        //渲染统计表
        _generateStatisticsTable : function(sourceData){
        	var data = sourceData,
        		htmls = [],
        		tfoot = [],
	    		len = sourceData.length,
	    		open = 0,
	    		dispute = 0,
	    		reopen = 0,
	    		fix = 0,
	    		total = 0,
	    		i,j;
	    	for(i = 0; i < len; i++){
	    		var labelText = sourceData[i].labelText,
	    			loginName = sourceData[i].author,
	    			opened = sourceData[i].dataSource[0][1],
	    			disputable = sourceData[i].dataSource[1][1],
	    			reopened = sourceData[i].dataSource[2][1],
	    			fixed = sourceData[i].dataSource[3][1];
	    		htmls[i] = '<tr>'
		            +'<td class="text-center"><strong>'+ (i + 1) +'</strong></td>'
		            +'<td><a href="javascript:void(0);">' + labelText + ' [ ' + loginName + ' ]' + '</a></td>'
		            +'<td>' + opened + '</td>'
		            +'<td>' + disputable + '</td>'
		            +'<td>' + reopened + '</td>'
		            +'<td>' + fixed + '</td>'
		            +'<td>' + (opened + disputable + reopened + fixed) + '</td>'
		        +'</tr>';
	    	}
	    	
	    	for(i = 0; i < len; i++){
	    		for(j = 0; j < data[i].dataSource.length; j++){
            		if(data[i].dataSource[j][0] == 'OPEN'){
            			open += data[i].dataSource[j][1];
            		}
            		if(data[i].dataSource[j][0] == 'DISPUTABLE'){
            			dispute += data[i].dataSource[j][1];
            		}
            		if(data[i].dataSource[j][0] == 'REOPEN'){
            			reopen += data[i].dataSource[j][1];
            		}
            		if(data[i].dataSource[j][0] == 'FIXED'){
            			fix += data[i].dataSource[j][1];
            		}
            	}
	    	}
	    	
	    	//处理统计表格的末行
	    	total = open + dispute + reopen + fix;
	    	tfoot.push('<tr><td colspan="2">总缺陷数量</td>'
		            +'<td><strong>' + open + '</strong></td>'
		            +'<td><strong>' + dispute + '</strong></td>'
		            +'<td><strong>' + reopen + '</strong></td>'
		            +'<td><strong>' + fix + '</strong></td>'
		            +'<td><strong>' + total + '</strong></td>'
		        +'</tr>');
	    	
	    	$("#statisticsTable").html(htmls.join(""));
	    	$("#tfoot").html(tfoot.join(""));
	        $(".totalQuantity").html(total + " 个");
        },
    };
}();
