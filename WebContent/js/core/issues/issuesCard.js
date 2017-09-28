/**
 * FileName: issueCard.js
 *
 * File description goes here.
 *
 * Copyright (c) 2010 Asiasoft, Inc. All Rights Reserved.
 *
 * @author <a href="mailto:li.zhou@iaspec.net">julia.zhou</a>
 * @Version: 1.0.0
 * @DateTime: 2014-06-27
 */
var issueCard = (function() {
    return {
        runDataTables: function() {
            // 表头定义
            var tableHead = [
                { "sTitle": "报表任务信息ID", "mData": "reportTaskId","bVisible":false},
                { "sTitle": "报表名称","mData": "reportTaskName","type" :"string" },
                { "sTitle": "活动状态", "mData": "repTaskActivityTypeName","type":"repTaskActivityTypeCombo"},
                { "sTitle": "产品类型", "mData": "productTypeName","type" :"string" },
                { "sTitle": "品牌", "mData": "brandName","type" :"string"},
                { "sTitle": "运营商", "mData": "operatorName","type" :"string"},
                { "sTitle": "分发类型", "mData": "reportSendTypeName","type":"reportSendTypeCombo" },
                { "sTitle": "创建人", "mData": "paaUsername" ,"type" :"string"},
                { "sTitle": "开始时间", "mData": "startTime","type" :"date"},
                { "sTitle": "结束时间","mData": "endTime","type" :"date"}
            ];

           var oTable =  $('#dt_issues').dataTable({
                "aoColumns": tableHead,
                "serverSide": true,
                "bAutoWidth": false,
                "responsive": true,
                "ordering": true,
                "order": [[ 2, "ASC" ]],
                "lengthMenu": [[10, 25, 50, 100], [10, 25, 50, 100]],
                "lengthChange": true,
                "paging": true,
                "sDom": "<'dt-top-row'><'dt-wrapper't><'dt-row dt-bottom-row'<'row'<'col-sm-4'i><'col-sm-8 text-right'p>><'row'<'col-xs-12 col-sm-12 col-md-12 col-lg-12'l>>>",
                "ajax": {
                    url: "../../controllerProxy.do?method=callBack",
                    type: "POST",
                    dataSrc: "data",
                    traditional: true, //if the value from the select2 plugin, it should be true
                    data: $.proxy(issueCommon.setDatatableData, issueCommon)
                },
                "columnDefs": [{
                    "targets": [0],
                    "render": function(data, type, full) {
                        return '<a title="' + data + '" target="_blank" href="' + $.url_root + '/issue/viewIssueOfCard.jspa?issueId=' + full.issueId + '">' + data + '</a>';
                    }
                }, {
                    "targets": [1],
                    "render": function(data, type, full) {
                        return '<a class="without-decoration font-default" title="' + data + '" href="javascript:;">' + data + '</a>';
                    }
                }, {
                    "targets": [2],
                    "render": function(data, type, full) {
                        data = data || "";
                        return '<a class="without-decoration font-default" title="' + data + '" href="javascript:;">' + data + '</a>';
                    }
                }]
            });
//            oTable.fnAddData(data);

            var table = $('#dt_issues').DataTable(),
                colvis = new $.fn.dataTable.ColVis(table, {
                    buttonText: "显示 / 隐藏 列",
                    bRestore: true,
                    sRestore: "显示全部"
                });

            // $( colvis.button() ).appendTo($("#tableBtns"));
            
        	$("#dt_issues").resizableColumns({
        	    store: window.store
        	});
        	
        },

        initialize: function() {
            loadScript($.url_root + "../../js/core/issues/issueListCommon.js", function() {
                Eipd.namespace("issue.issueCommon").initUsers($.url_root + "/user/getToUsers.jspa", true, i18nRes.global);
            });
            issueCommon.bindingSearchEvent();
            common.loadDatatableSettings();
            this.runDataTables();
        }
    };
}());
