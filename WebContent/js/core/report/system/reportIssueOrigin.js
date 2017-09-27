/**
 * FileName: reportIssueOrigin.js
 *
 * File description goes here.
 *
 * Copyright (c) 2014 iAspec, Inc. All Rights Reserved.
 *
 * @author <a href="mailto:kunwei.zheng@iaspec.com">Kevin Zheng</a>
 * @Version: 1.0.0
 * @DateTime: 2014-12-23
 */

var ReportOrigin = function(){
	var containerTop = $("#flotcontainer");
	var containerLeft = $("#pie_chart1");
	var containerRight = $("#pie_chart2");
	var plotTop = null;
	var plotLeft = null;
	var plotRight = null;
	var rawData = null;
	var tooltipId = 'itms_tooltip_id';
	return {
	  	init : function() {
	  		ReportOrigin.initEvent();
	  		// if(true) {
	  		// 	// 假数据
	  		// 	ReportOrigin.doGenerate();
	  		// 	ReportOrigin.doPlotTop();
	  		// 	return;
	  		// }
	  		ReportOrigin.doRefreshData();
	  	},
		doRefreshData : function() {
			ReportOrigin.hidePieRow();

			var strStartDate = $("input[name=startDate]").val();
			var strEndDate = $("input[name=endDate]").val();

			if($.trim(strStartDate) == "" || $.trim(strEndDate) == "") {
				showSimpleError('请选择开始日期、结束日期！');
				return;
			}

			$("#pStartDate").html(strStartDate);
			$("#pEndDate").html(strEndDate);

			var sdate = $("input[name=startDate]").datepicker('getDate').Format("yyyy-MM-dd");
			var edate = $("input[name=endDate]").datepicker('getDate').Format("yyyy-MM-dd");
			var url = $.url_root+"/report/findReportIssueOrigin.jspa";

	    	$.ajax({
				url: url, 
				type : "post",
				traditional : true,
				dataType : 'json',
				data: {
	 				'condition.startDate': sdate,
	 				'condition.endDate': edate
				},
				success: function(result){
					checkResult(result, {
	    				showBox : false,
	    				callback : function(){
	    					ReportOrigin.setRawData(result.reportMap);
	    					ReportOrigin.doPlotTop();
	    				}
	    			});
				},
				error: function(xhr, textStatus, errorThrown) {
					showOperationError(xhr, textStatus, errorThrown);
				}
			});
		},
		doGenerate : function() {
			var data = {
				"header":
				[
					{
						"name":"代码",
						"value":"code"
					},
					{
						"name":"设计",
						"value":"design"
					},
					{
						"name":"操作",
						"value":"operate"
					}
				],
				"data":
				[
					{
						"year":2014,
						"month":0,
						"code":6,
						"design":1,
						"operate":2
					},
					{
						"year":2014,
						"month":1,
						"code":6,
						"design":1,
						"operate":2
					},
					{
						"year":2014,
						"month":2,
						"code":6,
						"design":1,
						"operate":2
					},
					{
						"year":2014,
						"month":3,
						"code":6,
						"design":1,
						"operate":2
					},
					{
						"year":2014,
						"month":4,
						"code":6,
						"design":1,
						"operate":2
					},
					{
						"year":2014,
						"month":5,
						"code":6,
						"design":1,
						"operate":2
					},
					{
						"year":2014,
						"month":6,
						"code":6,
						"design":1,
						"operate":2
					},
					{
						"year":2014,
						"month":7,
						"code":6,
						"design":1,
						"operate":2
					},
					{
						"year":2014,
						"month":8,
						"code":16,
						"design":11,
						"operate":12
					},
					{
						"year":2014,
						"month":9,
						"code":26,
						"design":21,
						"operate":22
					},
					{
						"year":2014,
						"month":10,
						"code":36,
						"design":31,
						"operate":32
					},
					{
						"year":2014,
						"month":11,
						"code":46,
						"design":41,
						"operate":42
					}
				]
			};
			ReportOrigin.setRawData(data);
		},
		doPlotTop : function() {
			var $target = ReportOrigin.getContainerTop();
			var series = ReportOrigin.generateSeries();
			var options = {
				grid: {
				    show : true,
				    borderWidth : 0,
				    hoverable: true,
				    clickable: true
				},
				legend: {
				    show: true,
				    noColumns: 10,
				    margin: 5,
				    labelFormatter: function(label, series) {
				        return label;
				    }
				},
				tooltip: true,
				tooltipOpts: {
				    content: "<b>%x</b>属于标签<span>%s</span>的缺陷 共有 <span>%y</span> 个", //%s -> series label, %x -> X value, %y -> Y value, %x.2 -> precision of X value, %p -> percent
				    dateFormat: "%y年%m月",
				    defaultTheme: false
				},
				xaxis: {
				    mode: "time",
				    timeformat: "%y/%m",
				    minTickSize: [1, "month"]
				},
				yaxis: {
					show: true,
				    tickFormatter: function (val, axis) {
				        return val;
				    },
				    min: 0,
				    minTickSize: 1
				},
				hooks: { 
					draw: [ReportOrigin.drawCallback] 
				}
			};
			var plotObj = $.plot($target, series, options);
			ReportOrigin.setPlotTop(plotObj);
			ReportOrigin.doInitTable();
		},
		doInitTable : function() {
			var rawData = ReportOrigin.getRawData();
			var thTmp1 = '<th class="text-center" style="width:40px">No.</th><th class="text-left">年/月</th>';
			var thTmp2 = '<th class="text-left">{0}</th>';
			var tdTmp1 = '<td class="text-center"><strong>{0}</strong></td>';
			var tdTmp2 = '<td class="text-left">{0}</td>';
			var lastRow = '<td class="text-center"></td><td class="text-left">合计：</td>';
			var lastRowTd = '<td class="text-left"><strong>{0}</strong></td>';
			var thead = '';
			var tbody = '';

			for(var i = 0; i < rawData.header.length; i++) {
				var tmp = common.placeholderConversion({'msg':thTmp2,'args':[rawData.header[i].name]});
				thead += tmp;
				tmp = '';
			}
			thead = '<thead><tr>' + thTmp1 + thead + '</tr></thead>';

			for(var j = 0; j < rawData.data.length; j++) { 
				var tr = '';
				var td = common.placeholderConversion({'msg':tdTmp1,'args':[j+1]});
				var year = rawData.data[j]['year'];
				var month = rawData.data[j]['month'] + 1;
				td += common.placeholderConversion({'msg':tdTmp2,'args':[year+'.'+month]});
				for(var k = 0; k < rawData.header.length; k++) {
					var key = rawData.header[k].value;
					var tmp = common.placeholderConversion({'msg':tdTmp2,'args':[rawData.data[j][key]]});
					tr += tmp;
					tmp = '';
				}
				tbody += '<tr>' + td + tr + '</tr>';
			}
			
			// 合计
			for(var k = 0; k < rawData.header.length; k++) {
				var key = rawData.header[k].value;
				lastRow += common.placeholderConversion({'msg':lastRowTd,'args':[ReportOrigin.calcColumnSum(key)]});
			}
			lastRow = '<tr>' + lastRow + '</tr>';
			tbody = '<tbody>' + tbody + lastRow + '</tbody>';

			$('#dt_stat').html(thead + tbody);
		},
		generateSeries : function() {
			var rawData = ReportOrigin.getRawData();
			var series = [];
			var seriesSample = {
				label: "显示名称",
				data: [],
				color: $customColors[0],
				bars: {
				    show: true,
				    align: "left",
				    barWidth: 3 * 30 * 60 * 1000 * 40,
				    order : 1
				},
				valueLabels: {
				  show: false,
				  align: 'center',
				  hideSame: false
				}
			};

			for(var i = 0; i < rawData.header.length; i++) {
				var obj = {};
				var key = rawData.header[i].value;

				$.extend(true, obj, seriesSample);
				obj.label = rawData.header[i].name;
				obj.data = [];
				obj.color = ReportOrigin.getCustomColors(i);
				obj.bars.order = i + 1;

				for(var j = 0; j < rawData.data.length; j++) {
					var d = [];
					var year = rawData.data[j]['year'];
					var month = rawData.data[j]['month'];
					var value = rawData.data[j][key];
					d.push(ReportOrigin.gd(year,month,2));
					d.push(value);
					obj.data.push(d);
				}

				series.push(obj);
			}
			return series;
		},
		genDate : function(){
			if(($("input[name=startDate]").val() == null || $("input[name=startDate]").val() == "") 
				&& ($("input[name=endDate]").val() == null || $("input[name=endDate]").val() == "")){
				//当前时间的前X个月的时间   
				var now = new Date();
				var startDate = new Date(now.getFullYear(),(now.getMonth() - 11),1);
				var endDate = new Date();
			   
				$("input[name=startDate]").datepicker('update',startDate).trigger('changeDate');
				$("input[name=endDate]").datepicker('update',endDate).trigger('changeDate');
			}
		},
		initEvent : function() {
			// Date Picker
	        $('input[name=startDate],input[name=endDate]').datepicker({
	            format: "yyyy-mm",
	            startView : 1,
	            minViewMode : 1,
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
	        
	        // 注意：必须在Date Picker初始化之后调用
	        ReportOrigin.genDate();
	        
	        $("#nowYear").click(function(e){
				var now = new Date();
				var startDate = new Date(now.getFullYear(),0,1);
				var endDate = new Date(now.getFullYear(),11,31);
				
				btnChangeDate(startDate,endDate);
	        });
	        
	        $("#lastYear").click(function(e){
				var now = new Date();
				var startDate = new Date(now.getFullYear()-1,0,1);
				var endDate = new Date(now.getFullYear()-1,11,31);
				
				btnChangeDate(startDate,endDate);
	        });
	        
	        $("#beforeYear").click(function(e){
        		var now = new Date();
				var startDate = new Date(now.getFullYear()-2,0,1);
				var endDate = new Date(now.getFullYear()-2,11,31);
				
				btnChangeDate(startDate,endDate);
	        });
	        
	        function btnChangeDate(startDate,endDate){
	        	$('input[name=startDate],input[name=endDate]').datepicker('setStartDate',null);
				$('input[name=startDate],input[name=endDate]').datepicker('setEndDate',null);
				$("input[name=startDate]").datepicker('update',startDate).trigger('changeDate');
				$("input[name=endDate]").datepicker('update',endDate).trigger('changeDate');
	        };

			$('#btnStat').on('click', function() {
				ReportOrigin.doRefreshData();
			});

			$('#btnExport').on('click', function() {
				var strStartDate = $("input[name=startDate]").val();
				var strEndDate = $("input[name=endDate]").val();

				if($.trim(strStartDate) == "" || $.trim(strEndDate) == "") {
					showSimpleError('请选择开始日期、结束日期！');
					return;
				}

				var sdate = $("input[name=startDate]").datepicker('getDate').Format("yyyy-MM-dd");
				var edate = $("input[name=endDate]").datepicker('getDate').Format("yyyy-MM-dd");
				
				var $form = $("#redirectForm");
				var url = $.url_root+'/report/exportIssueOrigin.jspa';
				$form.attr('action', url);
				$form.find('input[name="condition.startDate"]').val(sdate);
				$form.find('input[name="condition.endDate"]').val(edate);
				$form.submit();
			});
		},
		doPlotLeft : function(data) {
			var options = {
				legend: {
				    show: true,
				    position: "nw",
				    noColumns: 1,
				    margin: 5,
				    labelFormatter: function(label, series) {
				        return label + ': ' + series.data[0][1] + ' (' + series.percent.toFixed(1) + '%)';
				    }
				},
				series: {
				    pie: { 
				        show: true,
				        label: {
				            show: true,
				            radius: 1/2,
				            threshold: 0.1,
				            formatter: function(label, series) {
				                return "<div style='font-size:8pt; text-align:center; padding:2px; color: white;'>" + series.label + "<br/>" + series.percent.toFixed(1) + "%</div>";
				            },
				            background: {
				                opacity: 0.8
				            }
				        }
				    }
				},
				grid: {
				    hoverable: true
				},
				colors: $customColors
			};
			var $target = ReportOrigin.getContainerLeft();
			var plotObj = $.plot($target, data, options);
			ReportOrigin.setPlotLeft(plotObj);

			// tooltip
			ReportOrigin.initTooltip($target, ReportOrigin.getPlotLeft());
		},
		doPlotRight : function(data) {
			var options = {
				legend: {
				    show: true,
				    noColumns: 1,
				    margin: 5,
				    labelFormatter: function(label, series) {
				        return label + ': ' + series.data[0][1] + ' (' + series.percent.toFixed(1) + '%)';
				    }
				},
				series: {
				    pie: { 
				        show: true,
				        label: {
				            show: true,
				            radius: 1/2,
				            threshold: 0.1,
				            formatter: function(label, series) {
				                return "<div style='font-size:8pt; text-align:center; padding:2px; color: white;'>" + series.label + "<br/>" + series.percent.toFixed(1) + "%</div>";
				            },
				            background: {
				                opacity: 0.8
				            }
				        }
				    }
				},
				grid: {
				    hoverable: true
				},
				colors: $customColors
			};
			var $target = ReportOrigin.getContainerRight();
			var plotObj = $.plot($target, data, options);
			ReportOrigin.setPlotRight(plotObj);

			// tooltip
			ReportOrigin.initTooltip($target, ReportOrigin.getPlotRight());
		},
		drawCallback : function(plot, canvascontext) { 
			var $target = ReportOrigin.getContainerTop();

			// 将顶部的legend移动到外面
			$target.find('.legend > *').css('top','-20px');

			// ticks点击事件
			$target.find(".tickLabel").css('cursor','pointer').off('click').on('click', function(e){
				var rawData = ReportOrigin.getRawData();
    	    	var dataPieLeft = null;
    	    	var dataPieRight = [];

    	    	// 左侧pie：某月份
    	    	for(var i = 0; i < rawData.data.length; i++) {
    	    		// tickLabel格式与options.xaxis.timeformat相同
    	    		var year = rawData.data[i]['year'];
    	    		var month = rawData.data[i]['month'];
    	    		var tickLabel = year + '/' + (month + 1);
    	    		if($(e.target).text() != tickLabel) {
    	    			continue;
    	    		}

    	    		dataPieLeft = [];
    	    		for(var j = 0; j < rawData.header.length; j++) {
    	    			var key = rawData.header[j].value;
    	    			var obj = {};
    	    			obj['label'] = rawData.header[j].name;
    	    			obj['data'] = rawData.data[i][key];
    	    			dataPieLeft.push(obj);
    	    		}

    	    		var $targetPieLeft = ReportOrigin.getContainerLeft();
    	    		$targetPieLeft.siblings('p').find('span').text(year+"年"+(month+1)+"月");

        		    // 渲染pie chart
        		    ReportOrigin.showPieRow();
    	    	}

    	    	if(dataPieLeft != null) {
    	    		ReportOrigin.doPlotLeft(dataPieLeft);
    	    	}

    	    	// 右侧pie：历史
    	    	for(var j = 0; j < rawData.header.length; j++) {
    	    		var key = rawData.header[j].value;
    	    		var obj = {};
    	    		obj['label'] = rawData.header[j].name;
    	    		obj['data'] = 0;
    	    		dataPieRight.push(obj);
    	    	}
		    	for(var i = 0; i < rawData.data.length; i++) {
		    		for(var j = 0; j < rawData.header.length; j++) {
		    			var key = rawData.header[j].value;
		    			dataPieRight[j]['data'] += rawData.data[i][key];
		    		}
		    	}
		    	// 历史数据，不包含当前点击的月份的数据
		    	if(rawData.data.length > 0) {
		    		for(var j = 0; j < rawData.header.length; j++) {
		    			dataPieRight[j]['data'] -= dataPieLeft[j]['data'];
		    		}
		    	}

		    	if(dataPieRight.length != 0) {
		    		ReportOrigin.doPlotRight(dataPieRight);
		    	}
			});

			// bar点击事件
			$target.off('plotclick').on("plotclick", function (event, pos, item) {
			    if (!item) {
			    	return;
			    }

				var rawData = ReportOrigin.getRawData();
    	    	var dataPieLeft = null;
    	    	var dataPieRight = [];

    	    	// 左侧pie：某月份
	    		var year = rawData.data[item.dataIndex]['year'];
	    		var month = rawData.data[item.dataIndex]['month'];

	    		dataPieLeft = [];
	    		for(var j = 0; j < rawData.header.length; j++) {
	    			var key = rawData.header[j].value;
	    			var obj = {};
	    			obj['label'] = rawData.header[j].name;
	    			obj['data'] = rawData.data[item.dataIndex][key];
	    			dataPieLeft.push(obj);
	    		}

	    		var $targetPieLeft = ReportOrigin.getContainerLeft();
	    		$targetPieLeft.siblings('p').find('span').text(year+"年"+(month+1)+"月");

    		    // 渲染pie chart
    		    ReportOrigin.showPieRow();

    	    	if(dataPieLeft != null) {
    	    		ReportOrigin.doPlotLeft(dataPieLeft);
    	    	}

    	    	// 右侧pie：历史
    	    	for(var j = 0; j < rawData.header.length; j++) {
    	    		var key = rawData.header[j].value;
    	    		var obj = {};
    	    		obj['label'] = rawData.header[j].name;
    	    		obj['data'] = 0;
    	    		dataPieRight.push(obj);
    	    	}
		    	for(var i = 0; i < rawData.data.length; i++) {
		    		for(var j = 0; j < rawData.header.length; j++) {
		    			var key = rawData.header[j].value;
		    			dataPieRight[j]['data'] += rawData.data[i][key];
		    		}
		    	}
		    	// 历史数据，不包含当前点击的月份的数据
		    	if(rawData.data.length > 0) {
		    		for(var j = 0; j < rawData.header.length; j++) {
		    			dataPieRight[j]['data'] -= dataPieLeft[j]['data'];
		    		}
		    	}

		    	if(dataPieRight.length != 0) {
		    		ReportOrigin.doPlotRight(dataPieRight);
		    	}
			});
		},
		initTooltip : function($target, plot) {
			var plotObj = plot;

			$target.off('mouseout').on('mouseout', function() {
				plotObj.unhighlight();
				ReportOrigin.removeTooltip();
				$(this).data('previous-post', -1);
			});
			$target.off('plothover').on('plothover', function(event, pos, item) {
			    if (item) {
			        if ($(this).data('previous-post') != item.seriesIndex) {
			            plotObj.unhighlight();
			            plotObj.highlight(item.series, item.datapoint);
			            $(this).data('previous-post', item.seriesIndex);
			        }
			        ReportOrigin.removeTooltip();
			        var msg = item.series.label + ": " + item.series.data[0][1] + ' (' + item.series.percent.toFixed(1) + '%)';
			        ReportOrigin.showTooltip(pos.pageX, pos.pageY, msg);
			    } else {
			        plotObj.unhighlight();
			        ReportOrigin.removeTooltip();
			        previousPost = $(this).data('previous-post', -1);
			    }
			});
		},
		showTooltip : function(x, y, contents) {
			var tooltipId = ReportOrigin.getTooltipId();
			$('<div id="' + tooltipId + '">' + contents + '</div>').css( {
			    position: 'absolute',
			    top: y + 10,
			    left: x + 10,
			    border: '1px solid #fdd',
			    padding: '2px',
			    'background-color': '#fee',
			    opacity: 0.80
			}).appendTo("body");//.fadeIn(200);
		},
		removeTooltip : function() {
			var tooltipId = ReportOrigin.getTooltipId();
			$('#' + tooltipId).remove();
		},
		showPieRow : function() {
			$("#pieRow").removeClass('hidden');
		},
		hidePieRow : function() {
			$("#pieRow").addClass('hidden');
		},
		calcColumnSum : function(key) {
			var rawData = ReportOrigin.getRawData();
			var sum = 0;
			for(var i = 0; i < rawData.data.length; i++) {
				sum += rawData.data[i][key];
			}
			return sum;
		},
		getCustomColors : function(index) {
			var i = index % $customColors.length;
			return $customColors[i];
		},
		getContainerTop : function() {
			return containerTop;
		},
		getContainerLeft : function() {
			return containerLeft;
		},
		getContainerRight : function() {
			return containerRight;
		},
		getRawData : function() {
			return rawData;
		},
		getPlotTop : function() {
			return plotTop;
		},
		getPlotLeft : function() {
			return plotLeft;
		},
		getPlotRight : function() {
			return plotRight;
		},
		getTooltipId : function() {
			return tooltipId;
		},
		setRawData : function(value) {
			rawData = value;
		},
		setPlotTop : function(value) {
			plotTop = value;
		},
		setPlotLeft : function(value) {
			plotLeft = value;
		},
		setPlotRight : function(value) {
			plotRight = value;
		},
		gd : function(year, month, day) {
			return new Date(year, month, day).getTime();
		}
	};
}();
