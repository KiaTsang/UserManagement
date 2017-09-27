/**
 * FileName: reportCardTechnicalType.js
 *
 * File description goes here.
 *
 * Copyright (c) 2014 iAspec, Inc. All Rights Reserved.
 *
 * @author <a href="mailto:kunwei.zheng@iaspec.com">Kevin Zheng</a>
 * @Version: 1.0.0
 * @DateTime: 2015-01-06
 */

var ReportTechnicalType = function(){
	var containerTop = $("#flotcontainer");
	var plotTop = null;
	var rawData = null;
	return {
	  	init : function() {
	  		ReportTechnicalType.initEvent();
	  		// if(true) {
	  		// 	// 假数据
	  		// 	ReportTechnicalType.doGenerate();
	  		// 	ReportTechnicalType.doPlotTop();
	  		// 	return;
	  		// }
	  		ReportTechnicalType.doRefreshData();
	  	},
		doRefreshData : function() {

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
			var url = $.url_root+"/report/findCardTechnicalType.jspa";

			// 缓存数据
			var $form = $("#redirectForm");
			$form.find('input[name="startDate"]').val(sdate);
			$form.find('input[name="endDate"]').val(edate);

	    	$.ajax({
				url: url, 
				type : "post",
				traditional : true,
				dataType : 'json',
				data: {
	 				'startDate': sdate,
	 				'endDate': edate
				},
				success: function(result){
					checkResult(result, {
	    				showBox : false,
	    				callback : function(){
	    					ReportTechnicalType.setRawData(result.reportList);
	    					ReportTechnicalType.doPlotTop();
	    				}
	    			});
				},
				error: function(xhr, textStatus, errorThrown) {
					showOperationError(xhr, textStatus, errorThrown);
				}
			});
		},
		doGenerate : function() {
			var data = [
				{
					"label":"GSM",
					"open":10,
					"closed":10,
					"total":20
				},
				{
					"label":"CDMA",
					"open":5,
					"closed":7,
					"total":12
				},
				{
					"label":"UICC",
					"open":36,
					"closed":34,
					"total":70
				},
				{
					"label":"3G",
					"open":10,
					"closed":20,
					"total":30
				},
				{
					"label":"LTE",
					"open":20,
					"closed":30,
					"total":50
				},
				{
					"label":"ISIM",
					"open":10,
					"closed":5,
					"total":15
				},
				{
					"label":"CSIM",
					"open":2,
					"closed":3,
					"total":5
				},
				{
					"label":"终端",
					"open":30,
					"closed":10,
					"total":40
				}
			];
			ReportTechnicalType.setRawData(data);
		},
		doPlotTop : function() {
			var $target = ReportTechnicalType.getContainerTop();
			var dataset = ReportTechnicalType.generateDataset();
			var xopt = ReportTechnicalType.generateXaxisOpt();
			var xticks = xopt.ticks;
			var xmax = xopt.max;
			var yticks = ReportTechnicalType.generateYticks();
			var options = {
				colors : $customColors,
				series: {
				    bars: {
				        show: true,
				        barWidth: 0.7,
				        horizontal: true,
				        align: "center"
				    }
				},
				xaxis: {
					ticks: xticks,
					max: xmax,
				    tickLength: 0,
				    minTickSize: 1
				},
				yaxis: {
				    ticks: yticks,
				    labelWidth: 80
				},
				grid : {
				    show : true,
				    hoverable : true,
				    clickable : true,
				    tickColor : $chrtBorderColor,
				    borderWidth : 0,
				    borderColor : $chrtBorderColor
				    //backgroundColor: { colors: ["#ffffff", "#EDF5FF"] }
				},

				legend : true,
				tooltip : true,
				tooltipOpts : {
				    content : "<span>%y</span> = <b>%x</b>",
				    defaultTheme : false
				}
			};
			var plotObj = $.plot($target, dataset, options);
			ReportTechnicalType.setPlotTop(plotObj);
			ReportTechnicalType.doInitTable();
		},
		doInitTable : function() {
			var rawData = ReportTechnicalType.getRawData();
			var tdTmp1 = '<td class="text-center"><strong>{0}</strong></td>';
			var tdTmp2 = '<td>{0}</td>';
			var lastRow = '<td class="text-center"></td><td>合计：</td>';
			var lastRowTd = '<td><strong>{0}</strong></td>';
			var thead = '';
			var tbody = '';
			var sumOpen = 0;
			var sumClosed = 0;

			thead += '<thead><tr>';
			thead += '<th class="text-center" style="width:40px">No.</th>';
			thead += '<th>分类</th>';
			thead += '<th>打开中</th>';
			thead += '<th>已关闭</th>';
			thead += '<th style="width:100px">总缺陷</th>';
			thead += '</tr></thead>';

			for(var j = 0; j < rawData.length; j++) { 
				var tr = common.placeholderConversion({'msg':tdTmp1,'args':[j+1]});
				var label = rawData[j]['label'];
				var open = rawData[j]['open'];
				var closed = rawData[j]['closed'];
				var total = rawData[j]['total'];
				tr += common.placeholderConversion({'msg':tdTmp2,'args':[label]});
				tr += common.placeholderConversion({'msg':tdTmp2,'args':[open]});
				tr += common.placeholderConversion({'msg':tdTmp2,'args':[closed]});
				tr += common.placeholderConversion({'msg':tdTmp2,'args':[total]});
				tbody += '<tr>' + tr + '</tr>';
				sumOpen += open;
				sumClosed += closed;
			}

			// 合计
			lastRow += common.placeholderConversion({'msg':lastRowTd,'args':[sumOpen]});
			lastRow += common.placeholderConversion({'msg':lastRowTd,'args':[sumClosed]});
			lastRow += common.placeholderConversion({'msg':lastRowTd,'args':[sumOpen + sumClosed]});
			lastRow = '<tr>' + lastRow + '</tr>';
			tbody = '<tbody>' + tbody + lastRow + '</tbody>';

			$('#dt_stat').html(thead + tbody);
		},
		generateDataset : function() {
			var rawData = ReportTechnicalType.getRawData();
			var data = [];

			for(var i = 0; i < rawData.length; i++) {
				var arr = [];
				arr.push(rawData[i]["total"]);
				arr.push(i);
				data.push(arr);
			}

			var dataset = [
			    { label: "", data: data, color: $customColors[0] }
			];

			return dataset;
		},
		generateYticks : function() {
			var rawData = ReportTechnicalType.getRawData();
			var ticks = [];

			for(var i = 0; i < rawData.length; i++) {
				var arr = [];
				arr.push(i);
				arr.push(rawData[i]["label"]);
				ticks.push(arr);
			}

			return ticks;
		},
		generateXaxisOpt : function() {
			var rawData = ReportTechnicalType.getRawData();
			var ticks = [];
			var max = 0;

			for(var i = 0; i < rawData.length; i++) {
				var total = rawData[i]["total"];
				if(max < total) {
					max = total;
				}
			}

			if(max < 10) {
				max = 10;
			}else if(max < 100) {
				max = 100;
			}else if(max < 1000) {
				max = 1000;
			}else if(max < 10000) {
				max = 10000;
			}else if(max < 100000) {
				max = 100000;
			}else if(max < 1000000) {
				max = 1000000;
			}else if(max < 10000000) {
				max = 10000000;
			}else if(max < 100000000) {
				max = 100000000;
			}

			for(var i = 1; i <= 10; i++) {
				var arr = [];
				arr.push(max / 10 * i);
				arr.push(max / 10 * i);
				ticks.push(arr);
			}

			return {"ticks":ticks,"max":max};
		},
		genDate : function(){
			if(($("input[name=startDate]").val() == null || $("input[name=startDate]").val() == "") 
				&& ($("input[name=endDate]").val() == null || $("input[name=endDate]").val() == "")){
				//当前时间的前X个月的时间   
				var now = new Date();
				var startDate = new Date(now.getFullYear(),(now.getMonth() - 12),1);
				var endDate = new Date(now.getFullYear(),(now.getMonth()),0);
			   
				ReportTechnicalType.btnChangeDate(startDate,endDate);
			}
		},
		initEvent : function() {
			// Date Picker
	        $('input[name=startDate],input[name=endDate]').datepicker({
	            format: "yyyy-mm-dd",
	            startView : 'month',
	            minViewMode : 'days',
	            language: "zh-CN",
	            todayHighlight : 1,
	            autoclose: true
	        }).on('changeDate', function(ev){
	        	if(!ev.date) {
	        		return;
	        	}
	        	var target=ev.target;
    		});

	        $('#btnYear').datepicker({
	            format: "yyyy",
	            startView : 'decade',
	            minViewMode : 'years',
	            language: "zh-CN",
	            todayHighlight : 1,
	            autoclose: true
	        }).on('changeDate', function(ev){
	        	if(!ev.date) {
	        		return;
	        	}
	        	var tmpDate = ev.date;
	        	var startDate = new Date(tmpDate.getFullYear(),0,1);
	        	var endDate = new Date(tmpDate.getFullYear(),11,31);
	        	ReportTechnicalType.btnChangeDate(startDate,endDate);
    		});

	        $('#btnMonth').datepicker({
	            format: "yyyy-mm",
	            startView : 'year',
	            minViewMode : 'months',
	            language: "zh-CN",
	            todayHighlight : 1,
	            autoclose: true
	        }).on('changeDate', function(ev){
	        	if(!ev.date) {
	        		return;
	        	}
	        	var tmpDate = ev.date;
	        	var year = tmpDate.getFullYear();
	        	var month = tmpDate.getMonth();
	        	var startDate = new Date(year,month,1);
	        	var endDate = new Date(year,month+1,0);
	        	ReportTechnicalType.btnChangeDate(startDate,endDate);
    		});
	        
	        // 注意：必须在Date Picker初始化之后调用
	        ReportTechnicalType.genDate();
	        
			$('#btnStat').on('click', function() {
				ReportTechnicalType.doRefreshData();
			});

			$('#btnExport').on('click', function() {
				var $form = $("#redirectForm");
				var strStartDate = $form.find('input[name="startDate"]').val();
				var strEndDate = $form.find('input[name="endDate"]').val();

				if(strStartDate == "" || strEndDate == "") {
					showSimpleError('请选择开始日期、结束日期！');
					return;
				}
				
				var url = $.url_root+'/report/exportCardTechnicalType.jspa';
				$form.attr('action', url);
				$form.submit();
			});
		},
		btnChangeDate : function(startDate,endDate) {
			$("input[name=startDate]").datepicker('update',startDate);
			$("input[name=endDate]").datepicker('update',endDate);
		},
		getCustomColors : function(index) {
			var i = index % $customColors.length;
			return $customColors[i];
		},
		getContainerTop : function() {
			return containerTop;
		},
		getRawData : function() {
			return rawData;
		},
		getPlotTop : function() {
			return plotTop;
		},
		setRawData : function(value) {
			rawData = value;
		},
		setPlotTop : function(value) {
			plotTop = value;
		}
	};
}();
