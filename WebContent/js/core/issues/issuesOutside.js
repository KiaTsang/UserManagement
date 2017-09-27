/**
 *Creator:Terrence.Cai;
 *Date:2014-09-22;
 *Time:11:00;
 *Used:Used for operate outside testing;
 */
var outside = function() {
    var searchField = {};

    return {

        /*Get searchFields value*/
        getSearchFields: function() {
            return searchField;
        },
        /*Set searchFields value*/
        setSearchFields: function(obj) {
            searchField = {};
            $.extend(searchField, obj);
        },

        /*Draw Table by DataTable Plugins*/
        runDataTables: function() {
            var customParams = function(params) {
                $.extend(params, outside.getSearchFields());
                params['pageSize'] = params.length;
                params['startIndex'] = params.start;
                params['draw'] = params.draw;
                params['outsiteTestIssueQueryCondition.type'] = $('#Type').val();
                return params;
            };

            $('#dt_outside').dataTable({
            	"sPaginationType" : "bootstrap_full",
                "pageLength": 10,
                "paging": true,
                "language": i18nRes.global.datatable.language,
                "stateSave": true,
                "serverSide": true,
                "bAutoWidth": false,
                "responsive": true,
                "lengthMenu": [[10, 25, 50, 100], [10, 25, 50, 100]],
                "lengthChange": true,
                "paging": true,
                "sDom": "<'dt-top-row'>r<'dt-wrapper't><'dt-row dt-bottom-row'<'row'<'col-sm-4'i><'col-sm-8 text-right'p>><'row'<'col-xs-12 col-sm-12 col-md-12 col-lg-12'l>>>",
                "ajax": {
                    url: $.url_root + "/issue/findOutsideIssueByCondition.jspa",
                    type: "POST",
                    dataSrc: "data",
                    traditional: true,
                    data: customParams
                },
                "columns": [{
                    "data": "code"
                }, {
                    "data": "outsiteTestProjectDTO.requirementName",
                    "defaultContent": "---"
                }, {
                    "data": "description",
                    "defaultContent": "---"
                }, {
                    "data": "productModel",
                    "defaultContent": "---"
                }, {
                    "data": "appVersion",
                    "defaultContent": "---"
                }, {
                    "data": "fixedUser",
                    "defaultContent": "---"
                }, {
                    "data": "validator",
                    "defaultContent": "---"
                }, {
                    "data": "validatedResult",
                    "defaultContent": "---"
                }, {
                    "data": "createTime",
                    "defaultContent": "---"
                }, {
                    "data": null
                }],
                "fnDrawCallback":function(oSettings, json){
               	 if(oSettings.json.recordsTotal > 0)
                	{
                		$(".exportToExcelTables").show();
                	}else
                		$(".exportToExcelTables").hide();
               },
                "columnDefs": [{
                    "targets": [0],
                    "render": function(data, type, full) {
                        return '<a href="' + $.url_root + '/issue/findOutsideIssueById.jspa?issueId=' + full.issueId + '" title="' + data + '">' + data + '</a>';
                    }
                }, {
                    "targets": [1],
                    "render": function(data, type, full) {
                        data = data || "---";
                        return '<a title="' + data + '" class="without-decoration font-default" href="javascript:;">' + data + '</a>';
                    }
                }, {
                    "targets": [2],
                    "render": function(data, type, full) {
                        data = data || ""
                        data = data.replace(/(\<|<\/).+?\>/g, "") || "---";
                        return '<a title="' + data + '" class="without-decoration font-default" href="javascript:;">' + data + '</a>';
                    }
                }, {
                    "targets": [8],
                    "render": function(data, type, full) {
                        var createTime = full.createTime;
                        return data === undefined ? '' : createTime.split("T")[0];
                    }
                }, {
                    "targets": [9],
                    "render": function(data, type, full) {
                        var operate = '<div>' + '<a class="btn btn-primary btn-xs dropdown-toggle " data-toggle="dropdown">' + '<i class="fa fa-gear"></i>' + '<i class="fa fa-caret-down" style="margin-left: 4px;"></i>' + '</a>' + '<ul class="dtable dropdown-menu pull-right">' + '<li><a title="' + i18nRes.global.view + '" href="' + $.url_root + '/issue/findOutsideIssueById.jspa?issueId=' + full.issueId + '">' + i18nRes.global.view + '</a></li>' + '<li class="divider"></li>' + '<li><a title="' + i18nRes.global.remove + '" href="javascript:void(0)" class="btnDeleteOutsite" data-issueId="' + full.issueId + '">' + i18nRes.global.remove + '</a></li>' + '</ul>' + '</div>';
                        return operate;
                    }
                }, ]
            });
            
            var table = $('#dt_outside').DataTable(),
                colvis = new $.fn.dataTable.ColVis(table, {
                buttonText: "显示 / 隐藏 列",
                bRestore: true,
                sRestore: "显示全部",
                sAlign: "right"
            });
            
            // $( colvis.button() ).appendTo($("#tableBtns"));
            
            $("#dt_outside").resizableColumns({});

            $('#dt_outside').on('draw.dt', function() {
                $('.btnDeleteOutsite').off('click').on('click', function(e) {
                    //清除界面上现有弹出框
                    clearSmallBox();
                    var issueId = $(this).attr('data-issueId');
                    $.smallBox({
                        title: tipMessage.title,
                        content: tipMessage.content + "<p class='text-align-right'><a href='javascript:void(0);' onclick='outside.deleteOutsiteIssue(" + issueId + ");' class='btn btn-danger btn-sm'>" + i18nRes.global.yes + "</a> <a href='javascript:void(0);'  class='btn btn-primary btn-sm'>" + i18nRes.global.no + "</a></p>",
                        color: "#296191",
                        icon: "fa fa-bell swing animated"
                    });
                    e.preventDefault();
                });
            });
        },

        /*Delete the selected test specification*/
        deleteOutsiteIssue: function(issueId) {
            // 锁定，防止重复提交
            if(!lockSmallBox()) {
                return;
            }
            $.ajax({
                url: $.url_root + "/issue/delOutsideIssue.jspa",
                type: "post",
                traditional: true,
                dataType: 'json',
                data: {
                    'issueId': issueId
                },
                success: function(result) {
                    checkResult(result, {
                        message: tipMessage.content,
                        showBox: true,
                        callback: function() {
                            $('#dt_outside').DataTable().draw();
                        }
                    });
                },
                error: function(xhr, textStatus, errorThrown) {
                    showOperationError(xhr, textStatus, errorThrown);
                }
            });
        },

        /*Init Basic Event*/
        initEvent: function() {

            $("#outside-condition-selector").on("click", "a", function(e) {
                $("#search-input").attr("name", "outsiteTestIssueQueryCondition." + $(this).data("lastValue"));
                if (!$(this).parent().hasClass("active")) {
                    $("#current-selected-condition").children("span:first").html($(this).html());
                    $("#search-input").attr("placeholder", $(this).html());
                    $(this).prepend('<i class="fa fa-check"></i>').parent().addClass("active").siblings().removeClass("active").find("i").remove();
                }
            });

            $('#btn-show-more-search,#btn-show-simple-search').click(function(e) {
                $('#more-search').toggle();
                $('#simple-search').toggle();
            });

            $("#dt_outside > tbody").on("dblclick", "tr", function(e) {
            	var url = $(this).find("td").eq(0).children().attr("href");
            	if (url) {
            		location.href = url;
            	}
            });
        },

        /*Init Basic Search Event*/
        initBasicSearchEvent: function() {
            var executeQuery = function() {
                var obj = {},
                    fieldName = $("#search-input").attr("name");
                obj[fieldName] = $("#search-input").val();
                outside.setSearchFields(obj);
                $('#dt_outside').DataTable().draw();
            };

            $('#btn-simple-search').click(function(e) {
                executeQuery();
            });

            $("#search-input").keyup(function(e) {
                if (e.which === 13) {
                    executeQuery();
                }
            });
        },

        /*Init More Search Event*/
        initMoreSearchEvent: function() {
            $('input[name=createDate]').datepicker({
                format: "yyyy-mm-dd",
                endDate: Date(),
                minViewMode: "days",
                language: "zh-CN",
                autoclose: true
            });

            $("#btn-more-search").click(function(e) {
                var obj = {};
                var prefix = "outsiteTestIssueQueryCondition.";
                obj[prefix + "projectName"] = $("#search-more-projectName").val();
                obj[prefix + "productModel"] = $("#search-more-productModel").val();
                obj[prefix + "fixedUser"] = $("#search-more-fixedUser").val();
                obj[prefix + "validator"] = $("#search-more-validator").val();
                outside.setSearchFields(obj);
                $('#dt_outside').DataTable().draw();
            });
        }
    };
}();
