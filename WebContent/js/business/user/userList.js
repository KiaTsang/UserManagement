/**
 * FileName: userList.js
 * File description: 用于加载用户列表页面的组件及内容
 * Copyright (c) 2017 Eastcompeace, Inc. All Rights Reserved.
 *
 * @author <a href="mailto:zengqingyue@eastcompeace.com">zengqingyue</a>
 * @DateTime: 2017-11-21
 */

/**
 * userList所有属性和方法定义
 * @type {userList}
 */
var userList = function () {

    var handleDatePicker = function () {
        $("#startDate, #endDate").datepicker({
            format: "yyyy-mm-dd",
            minViewMode: "days",
            todayHighlight : 1,
            autoclose: true
        }).on("changeDate", function(e) {
            if ($(e.target).data("type") === "start") {
                $("#endDate").datepicker("setStartDate", e.date);
            } else {
                $("#startDate").datepicker("setEndDate", e.date);
            }
        });
    }

    var handleTable = function () {
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
                data: $.proxy(searchCommon.setDatatableData, searchCommon)
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

        var table = $('#dt_issues').DataTable(),
            colvis = new $.fn.dataTable.ColVis(table, {
                buttonText: "显示 / 隐藏 列",
                bRestore: true,
                sRestore: "显示全部"
            });

        $("#dt_issues").resizableColumns({
            store: window.store
        });
    }

    return {
        _select2InitValue: {
            reportSendTypeName: [{
                "id": "B2BIC",
                "text": "B2BIC"
            }, {
                "id": "E-MAIL",
                "text": "E-MAIL"
            }, {
                "id": "FTP专线",
                "text": "FTP专线"
            }]
        },
        init: function () {
            searchCommon.select2InitValue = this._select2InitValue;
            searchCommon.tableAjaxParam.proxyClass = "fileController";
            searchCommon.tableAjaxParam.proxyMethod = "getReportTaskListByCondition";
            searchCommon.bindingSearchEvent();
            searchCommon.init();
            common.loadDatatableSettings();
            handleDatePicker();
            handleTable();
        }
    };
}();