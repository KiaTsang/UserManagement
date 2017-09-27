/**
 * FileName: dashboard.js
 *
 * File description goes here.
 *
 * Copyright (c) 2014 Iaspec, Inc. All Rights Reserved.
 *
 * @Version: 1.0.0
 * @DateTime: 2014-07-14
 */
var ids = '#dt_attentionIssues,#dt_submitIssues'.split(',');
var attentionIssuesUrl =$.url_root+"/issue/findIssuesbyCondition.jspa";
var submitIssuesUrl =$.url_root+"/issue/findIssuesbyCondition.jspa";
var pendingDisposeIssuesUrl =$.url_root+"/issue/findPendingDisposeIssues.jspa";
var allIssuesByConditon =$.url_root+"/issue/findAllIssuesbyCondition.jspa";

var viweCardIssue =$.url_root+"/issue/viewIssueOfCard.jspa?issueId";
var viweSysdIssue =$.url_root+"/issue/viewIssueOfSystem.jspa?issueId";
var viweWhiteboxIssue =$.url_root+"/issue/viewIssueOfWhitebox.jspa?issueId";

var loginName =localStorage.getItem("username");
var distinctionType = $("#query-Type").val();

var dashboard = (function() {
    return {
        initDashboard :function()
        {
            common.loadDatatableSettings();
            this._addExtraColumnDefinition(distinctionType);
            this.pendingDisposeIssues(distinctionType);
            this.initDataTables();
            this.disposedTable();
            this.statisticIssues();
            this.renderProjectsStatisticsTable();
            this.initTableEvent();
        },

        urls: {
            "#dt_attentionIssues": {url: attentionIssuesUrl}, // 关注
            "#dt_submitIssues": {url: submitIssuesUrl},
            "card":{url:viweCardIssue},
            "system":{url:viweSysdIssue},
            "whitebox":{url:viweWhiteboxIssue}
        },

        defaultColumnDefs : [
         {
             "targets": [ 0 ],
             "render": function ( data, type, full ) {
                 return '<a title="' + data + '" href="' + dashboard.urls[distinctionType].url + '=' + full.issueId + '">' + data + '</a>';
             }
         },
         {
             "targets": [ 1 ],
             "render": function ( data, type, full ) {
                 data = data || "";
                 return '<a title="' + data + '" class="without-decoration font-default" href="javascript:;">' + data + '</a>';
             }
         },

         {
             "targets": [ 2 ],
             "render": function ( data, type, full ) {
                 data = data || "";
                 return '<a title="' + data + '" class="without-decoration font-default" href="javascript:;">' + data + '</a>';
             }
         },
         {
             "targets": [ 3 ],
             "render": function ( data, type, full ) {
                 data = data || "";
                 var realName = data.realName || "";
                 return '<a title="' + realName + '" class="without-decoration font-default" href="javascript:;">' + realName + '</a>';
             }
         },
         {
             "targets": [ 4 ],
             "render": function ( data, type, full ) {
                 data = data || "";
                 var fixedUser = data.realName || "";
                 return '<a title="' + fixedUser + '" class="without-decoration font-default" href="javascript:;">' + fixedUser + '</a>';
             }
         },
         {
             "targets": [ 5 ],
             "render": function ( data, type, full ) {
                 data = data || "";
                 var validator = data.realName || "";
                 return '<a title="' + validator + '" class="without-decoration font-default" href="javascript:;">' + validator + '</a>';
             }
         },
         {
             "targets": [ 6 ],
             "render": function ( data, type, full ) {
                 data = data || "";
                 var creator = data.realName || "";
                 return '<a class="without-decoration font-default" title="' + creator + '" href="javascript:;">' + creator + '</a>';
             }
         },
         {
             "targets": [ 7 ],
             "render": function ( data, type, full ) {
                 return common.getImgUrl(data, i18nRes.issue.issuePriority[data]);
             }
         },
         {
             "targets": [ 8 ],
             "render": function ( data, type, full ) {
                 return '<span class="' + issueCommon.getIssueSeverityFontColor(data) + '"></span>&nbsp;' + '<a class="without-decoration font-default" title="' + i18nRes.issue.issueSeverity[data] + '">' + i18nRes.issue.issueSeverity[data] + '</a>';
             }
         },
         {
             "targets": [ 9 ],
             "render": function ( data, type, full ) {
                 return '<a class="without-decoration font-default" title="' + i18nRes.issue.issueSecurity[data] + '">' + i18nRes.issue.issueSecurity[data] + '</a>';
             }
         },
         {
             "targets": [ 10 ],
             "render": function ( data, type, full ) {
                 var font_color = (data === "NEW" ? "txt-color-red" : "font-white");
                 return '<span class="' + issueCommon.getIssueStatusBackground(data) + '">' + '<a class="without-decoration ' + font_color + '" title="' + i18nRes.issue.issueStatus[data] + '">' + i18nRes.issue.issueStatus[data] + '</a>' + '</span>';
             }
         },{
             "targets": [ 11 ],
             "render": function(data, type, full) {
                 return '<a class="without-decoration font-default" title="' + data + '">' + data + '</a>';
             }
         }, {
             "targets": [ 12 ],
             "render": function ( data, type, full ) {
                 return issueCommon.createMenuItems(full, {fixedUser: full.fixedUser, url: dashboard.urls[distinctionType].url + "=", creator: full.creator});
             }
         }
        ],

        _addExtraColumnDefinition: function(type) {
            var that = this;
            if (type === "system") {
                var targets = [ 0, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
                    len = targets.length,
                    i,
                    isArraysLenEquals = (targets.length === that.defaultColumnDefs.length);

                if (!isArraysLenEquals) {
                    throw new Error("The length of targets with source is not equals, please check!");
                }

                for (i = 0; i < len; i++) {
                    that.defaultColumnDefs[i]["targets"].push(targets[i]);
                }
                that.defaultColumnDefs.push({
                    "targets": [ 2 ],
                    "render": function ( data, type, full ) {
                        data = data || "";
                        return '<a title="' + data + '" class="without-decoration font-default" href="javascript:;">' + data + '</a>';
                     }
                });

                that.defaultColumns.splice(2, 0, {
                    "data": "productionDTO.productionName",
                    "defaultContent": "",
                    "class": "hidden-xs hidden-sm"}
                );
            }
        },

        defaultColumns : [
          {"data": "code", "defaultContent": ""},
          {"data": "projectDTO.name", "defaultContent": "", "class": "hidden-xs hidden-sm"},
          {"data": "summary", "defaultContent": "", "class": "hidden-xs hidden-sm"},
          {"data": "directApproverDTO"},
          {"data": "fixedUserDTO"},
          {"data": "validatorDTO"},
          {"data": "creatorDTO", "defaultContent": "", "class": "hidden-xs hidden-sm"},
          {"data": "priority", "defaultContent": ""},
          {"data": "severity", "defaultContent": ""},
          {"data": "securityLevel", "defaultContent": ""},
          {"data": "status", "defaultContent": ""},
          {"data": "createTime", "defaultContent": "", "class": "hidden-xs hidden-sm"},
          null
        ],

        initTableEvent: function() {
            $("#dt_attentionIssues > tbody, #dt_pendingDisposeIssues > tbody, #dt_submitIssues > tbody").on("dblclick", "tr", function(e) {
            	var url = $(this).find("td").eq(0).children().attr("href");
            	if (url) {
            		location.href = url;
            	}
            });
        },

        getSearchFields: function(params,objectId)
         {
            if(objectId == "#dt_submitIssues")
            {
                params[issueCommon._const.conditionPrefix + "creator"] = loginName;
            }

            if(objectId == "#dt_attentionIssues")
            {
                params[issueCommon._const.conditionPrefix + "currentUserName"] = loginName;
            }
         },
         initDataTables: function()
         {
        	 var orderColumn = 11;
             var that = this;
             if (distinctionType === "system") {
            	 orderColumn = 12;
             }
             $.each(ids, function(key, value) {
                var customParams = function(params) {
                    var cusParams = new Object();
                    that.getSearchFields(cusParams,value);
                    cusParams['pageSize'] = params.length;
                    cusParams['startIndex'] = params.start;
                    cusParams['draw'] = params.draw;
                    cusParams[issueCommon._const.conditionPrefix + "type"] = distinctionType;

                    $.extend(cusParams, params.order[0] ? {colIndex: params.order[0].column,
                        dir: params.order[0].dir} : undefined);

                    return cusParams;
                };

                $(value).dataTable({
                	"sPaginationType" : "bootstrap_full",
                    "serverSide": true,
                    "bAutoWidth": false,
                    "pageLength": 5,
                    "responsive": true,
                    "ordering": true,
                    "order": [[ orderColumn, "desc" ]],
                    "dom": '<"text-right pagination-sum-info"i>t<"text-right datatable-pagination"p>',
                    "ajax": {
                        url: that.urls[value].url,
                        type: "POST",
                        dataSrc: "data",
                        traditional: true, //if the value from the select2 plugin, it should be true
                        data: customParams
                    },
                    "columnDefs": that.defaultColumnDefs,
                    "columns": that.defaultColumns,

                    "fnDrawCallback":function(oSettings, json){
                        dashboard.toggleCells(this.closest("article").hasClass(that.CLASS_LONG_ROW),ids);
                    }
                 });
             });
         },

         CLASS_SHORT_ROW: "col-sm-6 col-md-6 col-lg-6",

         CLASS_LONG_ROW: "col-sm-12 col-md-12 col-lg-12",

         disposedTable:function()
          {
                // 默认只显示部分字段
                this.toggleCells(false, ids);
                // widget占据半行、整行的样式
                var classShortRow = this.CLASS_SHORT_ROW,
                    classLongRow = this.CLASS_LONG_ROW;
                // 指示widget目前是否占有半行？
                // var isShortRow = $(articleIds).hasClass(classShortRow);
                var isShortRow = true;
                // 指示当前是否全屏状态
                var isFullscreen = false;


                // 自定义横向展开按钮
                $('a.btnToggleCells').click(function(event) {
                    var $that = $(this),
                        articles = $that.parents('article').siblings().andSelf(),
                        tableIds = [],
                        isShortRow = $that.closest("article").hasClass(classShortRow);

                    // isShortRow = articles.hasClass(classShortRow);
                    $.each(articles, function(k,v){
                        var $article = $(this),
                            isShortRow = $article.hasClass(classShortRow),
                            $anchor = $article.find(".btnToggleCells");
                        $.each($article.find("table"), function(i, j) {
                            tableIds.push("#" + $(this).attr("id"));
                        })

                        if(!isShortRow) {
                            $article.removeClass( classLongRow ).addClass( classShortRow );
                            dashboard.toggleCells(isShortRow, tableIds);
                        } else {
                            $article.removeClass( classShortRow ).addClass( classLongRow );
                            dashboard.toggleCells(isShortRow, tableIds);
                        }

                        if (isShortRow) {
                            $anchor.html("<i class='fa fa-compress-horizontal'></i>");
                        } else {
                            $anchor.html("<i class='fa fa-expand-horizontal'></i>");
                        }
                    });

                    if (isShortRow) {
                        $that.closest("article").prependTo($that.closest(".row"));
                    }

                    // 隐藏tooltip，否则点击按钮后tooltip不会自动消失
                    $('div.tooltip.fade.in').hide();

                    // 重新获取：指示widget目前是否占有半行？
                    // isShortRow = articles.hasClass( classShortRow );
                });

                // 给全屏按钮附加事件（全屏状态：显示更多条数据）
                $('a.jarviswidget-fullscreen-btn').click(function(event) {
                    var articles = $(this).parents('article').parent().find('article');
                    var tableIds = [];
                    isShortRow = articles.hasClass(classShortRow);
                    $.each(articles, function(k,v){
                        tableIds.push('#' + $(this).find('table').attr('id'));
                    });

                    // 隐藏tooltip，否则点击按钮后tooltip不会自动消失
                    $('div.tooltip.fade.in').hide();

                    // 显示所有字段，显示更多行
                    if(!isFullscreen && isShortRow) {
                        dashboard.toggleCells(true, tableIds);
                        dashboard.toggleRows(true, tableIds);
                    }

                    // 显示部分字段，显示更少行
                    if(isFullscreen && isShortRow) {
                        dashboard.toggleCells(false, tableIds);
                        dashboard.toggleRows(false, tableIds);
                    }

                    // 显示更多行
                    if(!isFullscreen && !isShortRow) {
                        dashboard.toggleRows(true, tableIds);
                    }

                    // 显示更少行
                    if(isFullscreen && !isShortRow) {
                        dashboard.toggleRows(false, tableIds);
                    }

                    // 切换全屏标志
                    isFullscreen = !isFullscreen;
                });

          },
         toggleCells: function(isDisplay, tableIds, hiddenCols) {

            // 修复当最大化datatable时，发生翻页或排序行为，会造成列的隐藏
            var colIndexs = [ 3, 4, 5, 9, 11 ];   // 定义需要隐藏的列的索引，以0开始计算，（请结合实际列的顺序调整）
            if (distinctionType === "system") {
        		colIndexs = [ 4, 5, 6, 7, 8, 10];
            }

            $.each(tableIds, function(i, v) {
                var oTable = $(v).DataTable();
	    	    var columns = oTable.columns(colIndexs);
	    	    columns.visible(isDisplay);
            });

            $("table").resizableColumns("destroy");
            $("table").resizableColumns({});
        },
        toggleRows: function(showMore, tableIds){

            var oTable = null,
                oSettings = null,
                pageSize = 0;

            if(showMore) {
                pageSize = 10;
            }else {
                pageSize = 5;
            }

            $.each(tableIds, function(k, v) {
                oTable = $(v).dataTable();
                oSettings = oTable.fnSettings();
                oSettings._iDisplayLength = pageSize;
                oTable.fnDraw();
            });
        },
        statisticIssues: function()
        {
             $.ajax({
                  global: false,
                  url: allIssuesByConditon,
                  type: "POST",
                  dataType: "json",
                  data: {
                      "issueQueryCondition.type": distinctionType
                  },

                  success: function(result) {
                        checkResult(result,
                            {
                               showBox:false,
                               callback : function() {
                                   if(result.issueStatisticDTO !=null)
                                    {
                                        var resultDto = result.issueStatisticDTO;
                                        $("#newIssuesTotal").html(resultDto.newIssues);
                                        $("#criticalIssuesTotal").html(resultDto.criticalIssues);
                                        $("#disposeIssuesTotal").html(resultDto.pendingFixingIssues);
                                        $("#validatedPassIssuesTotal").html(resultDto.validatedPassIssues);
                                    }
                            }
                        });
                  }
               });
        },
        pendingDisposeIssues: function(productionType)
        {
             var that = this;

             $.ajax({
                  global: false,
                  url: pendingDisposeIssuesUrl,
                  type: "POST",
                  dataType: "json",
                  data: {
                      "issueQueryCondition.type": distinctionType
                  },
                  success: function(result) {
                     var data = result.data;
                     $("#dt_pendingDisposeIssues").dataTable({
                    	 "sPaginationType" : "bootstrap_full",
                         "serverSide": false,
                         "bAutoWidth": false,
                         "stateSave": true,
                         "responsive": true,
                         "ordering": true,    // 开启是否允许排序
                         "dom": '<"text-right pagination-sum-info"i>t<"text-right datatable-pagination"p>',
                         "order": [ [ 10, "desc" ] ],
                         "pageLength": 5,
                         "columnDefs": that.defaultColumnDefs,
                         "columns": that.defaultColumns,
                         "aaData": data,

                         fnDrawCallback: function(oSettings, json) {
                             dashboard.toggleCells(this.closest("article").hasClass(that.CLASS_LONG_ROW), [ "#dt_pendingDisposeIssues" ]);
                         }
                     });
                  }
               });
        },

        renderProjectsStatisticsTable: function() {
            var that = this;

            $("#dt_production_project").dataTable({
            	"sPaginationType" : "bootstrap_full",
                "serverSide": true,
                "bAutoWidth": false,
                "stateSave": true,
                "responsive": true,
                "dom": '<"text-right pagination-sum-info"i>t<"text-right datatable-pagination"p>',
                "pageLength": 5,
                "ajax": {
                    url: $.url_root + "/project/loadSysProjectsIssuesStat.jspa",
                    type: "POST",
                    dataSrc: "data",

                    data: function (params) {

                        return {
                            pageSize: params.length,
                            startIndex: params.start,
                            draw: params.draw,
                            "systemProjectQueryCondition.type": distinctionType
                        };
                    }
                },
                "columnDefs":
                    [
                        {
                            "targets": [ 0 ],
                            "render": function ( data, type, full ) {
                                data = data || "";
                                return '<a title="' + data + '" class="without-decoration font-default" href="javascript:;">' + data + '</a>';
                            }
                        },
                        {
                            "targets": [ 3 ],
                            "render": function ( data, type, full ) {
                                return  "<div class=\"sparkline display-inline\" data-sparkline-type=\"pie\" data-sparkline-piecolor='[\"#E979BB\", \"#57889C\"]'" +
                                        "data-sparkline-offset=\"90\" data-sparkline-piesize=\"23px\">" + full.validatedIssues + "," + (full.totalIssues - full.validatedIssues) + "</div>"
                            }
                        }
                       ],
                "columns":
                    [
                        {"data": "name", "defaultContent": ""},
                        {"data": "totalIssues", "defaultContent": "", "class": "text-align-center"},
                        {"data": "validatedIssues", "defaultContent": "", "class": "text-align-center"},
                        {"data": null, "defaultContent": "", "class": "text-align-center"},
                    ],
                fnDrawCallback: function(oSettings, json) {
                    this.find(".sparkline").each(function(i, v) {
                        var $ele = $(this);

                        var pieColors = $ele.data('sparkline-piecolor') || ["#B4CAD3", "#4490B1", "#98AA56", "#da532c", "#6E9461", "#0099c6", "#990099", "#717D8A"],
                            pieWidthHeight = $ele.data('sparkline-piesize') || 90,
                            pieBorderColor = $ele.data('border-color') || '#45494C',
                            pieOffset = $ele.data('sparkline-offset') || 0;

                        $ele.sparkline('html', {
                            type : 'pie',
                            width : pieWidthHeight,
                            height : pieWidthHeight,
                            tooltipFormat : '<span style="color: {{color}}">&#9679;</span> ({{percent.1}}%)',
                            sliceColors : pieColors,
                            offset : 0,
                            borderWidth : 1,
                            offset : pieOffset,
                            borderColor : pieBorderColor
                        });
                    });
                }
            });
        }
    };
})();
