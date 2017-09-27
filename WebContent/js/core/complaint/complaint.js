/**
 * FileName: complaint.js
 *
 * File description goes here.
 *
 * Copyright (c) 2010 Asiasoft, Inc. All Rights Reserved.
 *
 * @author <a href="mailto:li.zhou@iaspec.net">julia.zhou</a>
 * @Version: 1.0.0
 * @DateTime: 2014-06-27
 */

var complaint = (function() {

    return {

        _searchField: null,

        // Get searchFields value
        getSearchFields: function() {
            return this._searchField;
        },

        // Set searchFields value
        setSearchFields: function(obj) {
            this._searchField = obj;
        },

        runDataTables: function() {
        	var renderOrderColumn=function(index){
		    	  var defaultColumn = "complaint.createTime";
		    	  switch (index) {
		    	    case 0:
		    	      return "complaint.complaintCode";
		    	    case 1:
		    	      return "complaint.projectName";
		    	    case 2:
		    	      return "complaint.infoProvider";
		    	    case 3:
		    	      return "to_char(complaint.faultSummary)";
		    	    case 5:
			    	      return "complaint.isSolved";
		    	    default:
		    	      return defaultColumn;
		    	  }
			};
            var customParams = function(params) {
                $.extend(params, complaint.getSearchFields());
                params['pageSize'] = params.length;
   	        	params['startIndex'] = params.start;
   	        	params['draw'] = params.draw;
   	        	params["condition.sortColumn"] = renderOrderColumn(params.order[0].column);
		        params["condition.sortOrder"] = params.order[0].dir;
	        	return params;
            };

            $('#dt_complain').dataTable({
                "pageLength": 10,
                "sPaginationType" : "bootstrap_full",
                "paging": true,
                "bSort": false,
                "responsive": true,
                "serverSide": true,
                "bAutoWidth": false,
                "stateSave": true,
                "ordering": true,
                "lengthMenu": [[10, 25, 50, 100], [10, 25, 50, 100]],
                "lengthChange": true,
                "paging": true,
                "sDom": "<'dt-top-row'>r<'dt-wrapper't><'dt-row dt-bottom-row'<'row'<'col-sm-4'i><'col-sm-8 text-right'p>><'row'<'col-xs-12 col-sm-12 col-md-12 col-lg-12'l>>>",
                "language": i18nRes.global.datatable.language,
                "ajax": {
                    url: $.url_root + "/complaint/findComplaintbyCondition.jspa",
                    type: "POST",
                    dataSrc: "data",
                    traditional: true, //if the value from the select2 plugin, it should be true
                    data: customParams
                },
                "columns": [{
                    "data": "complaintCode",
                    "defaultContent": ""
                }, {
                    "data": "projectName",
                    "defaultContent": ""
                }, {
                    "data": "infoProvider",
                    "defaultContent": ""
                }, {
                    "data": "faultSummary",
                    "defaultContent": ""
                }, {
                    "data": "createTime",
                    "defaultContent": ""
                }, {
                    "data": "isSolved",
                    "defaultContent": ""
                }, {
                    "data": null
                }],

                "columnDefs": [{
                    "targets": [0],
                    "render": function(data, type, full) {
                        return '<a href="' + $.url_root + '/complaint/viewComplaint.jspa?complaintId=' + full.id + '" title="' + data + '">' + data + '</a>';
                    }
                }, {
                    "targets": [1],
                    "render": function(data, type, full) {
                        data = data || "";
                        return '<a class="without-decoration font-default" title="' + data + '" href="javascript:;">' + data + '</a>';
                    }
                }, {
                    "targets": [2],
                    "render": function(data, type, full) {
                        data = data || "";
                        return '<a class="without-decoration font-default" title="' + data + '" href="javascript:;">' + data + '</a>';
                    }
                }, {
                    "targets": [3],
                    "render": function(data, type, full) {
                        data = data || "";
                        return '<a class="without-decoration font-default" title="' + data.replace(/\<.+?\>/g, "") + '" href="javascript:;">' + data.replace(/\<.+?\>/g, "") + '</a>';
                    }
                }, {
                    "targets": [5],
                    "render": function(data, type, full) {
                        if (!data) {
                            return '<span class="status label bg-color-pink font-sm">' + i18nRes.complaint.complaintField.isSovledNo + '</span>';
                        } else {
                            return '<span class="status label label-success font-sm">' + i18nRes.complaint.complaintField.isSovledYes + '</span>';
                        }
                    }
                }, {
                    "targets": [6],
                    "render": function(data, type, full) {
                        var operate = '<div>' + '<a class="btn btn-primary btn-xs dropdown-toggle " data-toggle="dropdown" style="height: 22px; padding: 1px 5px 1px 5px;">' + '<i class="fa fa-gear" style="padding: 0 4px 0 0;"></i>' + '<i class="fa fa-caret-down"></i>' + '</a>' + '<ul class="dtable dropdown-menu pull-right" style="right: 70px;">' + '<li><a title="' + i18nRes.global.view + '" href="' + $.url_root + '/complaint/viewComplaint.jspa?complaintId=' + full.id + '">' + i18nRes.global.view + '</a></li>' + '<li class="divider"></li>' + '<li><a title="' + i18nRes.global.edit + '" href="' + $.url_root + '/complaint/viewComplaint.jspa?complaintId=' + full.id + '">' + i18nRes.global.edit + '</a></li>' + '<li><a title="' + i18nRes.global.remove + '" href="javascript:void(0)" class="btnDeleteComplaint" data-complaintId="' + full.id + '">' + i18nRes.global.remove + '</a></li>' + '</ul>' + '</div>';

                        return operate;
                    }
                }]
            });
            $("table").resizableColumns({});
        },

        //  Delete the selected test specification
        deleteComplaint: function(complaintId) {
            // 锁定，防止重复提交
            if(!lockSmallBox()) {
                return;
            }
            $.ajax({
                url: $.url_root + "/complaint/deleteComplaint.jspa",
                type: "post",
                traditional: true,
                dataType: 'json',
                data: {
                    'complaintId': complaintId
                },
                success: function(result) {
                    checkResult(result, {
                        message: i18nRes.global.successDeleted,
                        showBox: true,

                        callback: function() {
                            $('#dt_complain').DataTable().draw();
                        }
                    });
                },
                error: function(xhr, textStatus, errorThrown) {
                    showOperationError(xhr, textStatus, errorThrown);
                }
            });
        },

        //  Init Basic Event
        initEvent: function() {
            $("#complaint_condition_selector").on("click", "a", function(e) {
                $("#search-input").attr("name", "condition." + $(this).data("lastValue"));
                if (!$(this).parent().hasClass("active")) {
                    $("#current-selected-condition").children("span:first").html($(this).html());
                    if ($(this).data("lastValue") === "isSolved") {
                        $("#search-input").hide();
                        $('#isSovledHtml').removeClass('hidden');
                    } else {
                        $("#search-input").show();
                        $("#isSovledHtml").addClass('hidden');
                    }
                    $(this).prepend('<i class="fa fa-check"></i>').parent().addClass("active").siblings().removeClass("active").find("i").remove();
                }
            });

            $('#dt_complain').on("click", ".btnDeleteComplaint", function(e) {
                //清除界面上现有弹出框
                clearSmallBox();
                var complaintId = $(this).attr('data-complaintId');
                $.smallBox({
                    title: i18nRes.global.confirm.title,
                    content: i18nRes.complaint.deleteTips + "<p class='text-align-right'><a href='javascript:void(0);' onclick='complaint.deleteComplaint(" + complaintId + ");' class='btn btn-danger btn-sm'>" + i18nRes.global.yes + "</a> <a href='javascript:void(0);'  class='btn btn-primary btn-sm'>" + i18nRes.global.no + "</a></p>",
                    color: "#296191",
                    icon: "fa fa-bell swing animated"
                });

                e.preventDefault();
            });

            //  点击高级跟基本的触发
            $('#btn-show-more-search, #btn-show-simple-search').on("click", function(e) {
                $('#more-search').toggle();
                $('#simple-search').toggle();
                e.stopPropagation();
            });

            $("#dt_complain > tbody").on("dblclick", "tr", function(e) {
                var url = $(this).find("td").eq(0).children().attr("href");
                if (url) {
                    location.href = url;
                }
            });
        },

        //  Init Basic Search Event
        initBasicSearchEvent: function() {
            var executeQuery = function() {
                var obj = {},
                    $input = $("#search-input"),
                    fieldName = $input.attr("name");
                
                if ($input.is(":hidden")) {
                    var $select = $('#isSovledHtml'),
                        val = $.trim($select.select2("val"));
    
                    if (val) {
                        obj[$select.data("name")] = val;
                    }
                } else {
                    var val = $.trim($input.val());
    
                    if (val) {
                        obj[fieldName] = val;
                    }
    
                }
    
                complaint.setSearchFields(obj);
    
                $('#dt_complain').DataTable().draw();
            };
            
            $('#btn-simple-search').on("click", function(e) {
                e.stopPropagation();
                executeQuery();
            });
            
            $("#search-input").keyup(function(e) {
                if (e.which === 13) {
                    executeQuery(); 
                }
            });
        },

        //  Init More Search Event
        initMoreSearchEvent: function() {
            $("#btn-more-search").on("click", function(e) {
                var obj = {},
                    prefix = "condition.",
                    solvedVal = $.trim($("#search-more-isSolved").val()),
                    projectName = $.trim($("#search-more-projectName").val()),
                    complaintCode = $.trim($("#search-more-complaintCode").val()),
                    infoProvider = $.trim($("#search-more-infoProvider").val());

                if (projectName) {
                    obj[prefix + "projectName"] = projectName;
                }

                if (complaintCode) {
                    obj[prefix + "complaintCode"] = complaintCode;
                }

                if (infoProvider) {
                    obj[prefix + "infoProvider"] = infoProvider;
                }

                if (solvedVal) {
                    obj[prefix + "isSolved"] = solvedVal;
                }

                complaint.setSearchFields(obj);

                $('#dt_complain').DataTable().draw();
                e.stopPropagation();
            });
        },

        initSelector_isSolved: function() {
            $.each($("input[data-src=local]"), function(i, v) {
                $(this).select2({
                    width: "100%",
                    multiple: false,
                    data: [{
                        "id": "",
                        "text": "全部"
                    }, {
                        "id": "true",
                        "text": i18nRes.complaint.complaintField.isSovledYes
                    }, {
                        "id": "false",
                        "text": i18nRes.complaint.complaintField.isSovledNo
                    }]
                }).select2("val", "true");
            });
            
            $(".select2-search").remove();
        }
    };
}());
