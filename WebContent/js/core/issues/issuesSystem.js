/**
 * FileName: issuescard.js
 *
 * File description goes here.
 *
 * Copyright (c) 2010 Asiasoft, Inc. All Rights Reserved.
 *
 * @author <a href="mailto:qiqu.huang@iaspec.net">Charlie Huang</a>
 * @Version: 1.0.0
 * @DateTime: 2014-07-09
 */

var issueSystem = (function() {

    return {
        runDataTables: function() {
            $('#dt_issues').dataTable({
                "serverSide": true, // hander by server
                "bAutoWidth": false,
                "responsive": true,
                "ordering": true,
                "order": [[ 12, "desc" ]],
                "lengthMenu": [[10, 25, 50, 100], [10, 25, 50, 100]],
                "lengthChange": true,
                "paging": true,
                "sDom": "<'dt-top-row'><'dt-wrapper't><'dt-row dt-bottom-row'<'row'<'col-sm-4'i><'col-sm-8 text-right'p>><'row'<'col-xs-12 col-sm-12 col-md-12 col-lg-12'l>>>",
                "ajax": {
                    url: $.url_root + "/issue/findIssuesbyCondition.jspa", //server url
                    type: "POST", //production, consider the POST, if GET, not supported by GBK encoding
                    dataSrc: "data", // it should be the same with the result property
                    traditional: true, //if the value from the select2 plugin, it should be true
                    data: $.proxy(issueCommon.setDatatableData, issueCommon)
                },
                "columnDefs": [{
                        "targets": [0],
                        "render": function(data, type, full) {
                            return '<a title="' + data + '" target="_blank" href="' + $.url_root + '/issue/viewIssueOfSystem.jspa?issueId=' + full.issueId + '">' + data + '</a>';
                        }
                    },

                    {
                        "targets": [1],
                        "orderable": true,
                        "render": function(data, type, full) {
                            data = data || "";
                            var pName = (data.name ? data.name : "");
                            return '<a class="without-decoration font-default" title="' + pName + '" href="javascript:;">' + pName + '</a>';
                        }
                    },

                    {
                        "targets": [2],
                        "orderable": true,
                        "render": function(data, type, full) {
                            data = data || "";
                            var pName = (data.productionName ? data.productionName : "");
                            return '<a class="without-decoration font-default" title="' + pName + '" href="javascript:;">' + pName + '</a>';
                        }
                    },

                     {
                        "targets": [3],
                        "render": function(data, type, full) {
                            data = data || "";
                            return '<a class="without-decoration font-default" title="' + data + '" href="javascript:;">' + data + '</a>';
                        }
                    }, {
                        "targets": [4],
                        "render": function(data, type, full) {
                            data = data || '';
                            var directApprover = (data.realName ? data.realName : "");
                            return '<a class="without-decoration font-default" title="' + directApprover + '" href="javascript:;">' + directApprover + '</a>';
                        }
                    }, {
                        "targets": [5],
                        "render": function(data, type, full) {
                            data = data || '';
                            var fixedUser = data.realName || "";
                            return '<a class="without-decoration font-default" title="' + fixedUser + '" href="javascript:;">' + fixedUser + '</a>';
                        }
                    }, {
                        "targets": [6],
                        "render": function(data, type, full) {
                            data = data || "";
                            var validator = data.realName || "";
                            return '<a class="without-decoration font-default" title="' + validator + '" href="javascript:;">' + validator + '</a>';
                        }
                    }, {
                        "targets": [7],
                        "render": function(data, type, full) {
                            data = data || '';
                            var creator = data.realName || "";
                            return '<a class="without-decoration font-default" title="' + creator + '" href="javascript:;">' + creator + '</a>';
                        }
                    }, {
                        "targets": [8],
                        "render": function(data, type, full) {
                            return common.getImgUrl(data, i18nRes.issue.issuePriority[data]);
                        }
                    }, {
                        "targets": [9],
                        "render": function(data, type, full) { //severity
                            return '<span class="' + issueCommon.getIssueSeverityFontColor(data) + '"></span>&nbsp;<a class="without-decoration font-default" title="' + i18nRes.issue.issueSeverity[data] + '">' + i18nRes.issue.issueSeverity[data] + '</a>';
                        }
                    }, {
                        "targets": [10],
                        "render": function(data, type, full) {
                            return '<a class="without-decoration font-default" title="' + i18nRes.issue.issueSecurity[data] + '">' + i18nRes.issue.issueSecurity[data] + '</a>';
                        }
                    }, {
                        "targets": [11],
                        "render": function(data, type, full) {
                            var font_color = (data === "NEW" ? "txt-color-red" : "font-white");
                            return '<span class="' + issueCommon.getIssueStatusBackground(data) + '">' + '<a class="without-decoration ' + font_color + '" title="' + i18nRes.issue.issueStatus[data] + '">' + i18nRes.issue.issueStatus[data] + '</a>' + '</span>';
                        }
                    }, {
                        "targets": [12],
                        "render": function(data, type, full) {
                            return '<a class="without-decoration font-default" title="' + data + '">' + data + '</a>';
                        }
                    }, {
                        "targets": [13],
                        "orderable": false,
                        "render": function(data, type, full) {
                            return issueCommon.createMenuItems(full, {
                                fixedUser: full.fixedUser,
                                url: $.url_root + "/issue/viewIssueOfSystem.jspa?issueId=",
                                creator: full.creator
                            });
                        }
                    }
                ],
                "columns": [{
                    "data": "code",
                    "defaultContent": ""
                }, {
                    "data": "projectDTO",
                    "defaultContent": "",
                    "class": "hidden-xs hidden-sm"
                }, {
                    "data": "productionDTO",
                    "defaultContent": "",
                    "class": "hidden-xs hidden-sm"
                }, {
                    "data": "summary",
                    "defaultContent": "",
                    "class": "hidden-xs hidden-sm"
                }, {
                    "data": "directApproverDTO",
                    "defaultContent": ""
                }, {
                    "data": "fixedUserDTO",
                    "defaultContent": ""
                }, {
                    "data": "validatorDTO",
                    "defaultContent": ""
                }, {
                    "data": "creatorDTO",
                    "defaultContent": "",
                    "class": "hidden-xs hidden-sm"
                }, {
                    "data": "priority",
                    "defaultContent": ""
                    // "class": "text-center"
                }, {
                    "data": "severity",
                    "defaultContent": ""
                    // "class": "text-center"
                }, {
                    "data": "securityLevel",
                    "defaultContent": "未指定"
                    // "class": "text-center"
                }, {
                    "data": "status",
                    "defaultContent": ""
                    // "class": "text-center"
                }, {
                    "data": "createTime",
                    "defaultContent": "",
                    "class": "hidden-xs hidden-sm"
                }, {
                    "data": null,
                    // "class": "text-center"
                }],
                "fnDrawCallback":function(oSettings, json){
               	 if(oSettings.json.recordsTotal > 0)
                	{
                		$(".exportToExcelTables").show();
                	}else
                		$(".exportToExcelTables").hide();
               }
            });
            var table = $('#dt_issues').DataTable(),
                colvis = new $.fn.dataTable.ColVis(table, {
                buttonText: "显示 / 隐藏 列",
                bRestore: true,
                sRestore: "显示全部",
            });
            // $( colvis.button() ).appendTo($("#tableBtns"));
            
            $("table").resizableColumns({});
        },

        initialize: function() {
            loadScript($.url_root + "/js/core/issues/issueListCommon.js", function() {
                Eipd.namespace("issue.issueCommon").initUsers($.url_root + "/user/getToUsers.jspa", true, i18nRes.global);
            });
            issueCommon.bindingSearchEvent();
            common.loadDatatableSettings();
            this.runDataTables();
        }
    };
}());
