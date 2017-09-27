/*
 * FileName: issueEditCommon.js
 *
 * File description goes here.
 *
 * Copyright (c) 2010 Asiasoft, Inc. All Rights Reserved.
 *
 * @author <a href="mailto:li.zhou@iaspec.net">julia.zhou</a>
 * @Version: 1.0.0
 * @DateTime: 2014-06-27
 */

var issueEditCommon = (function() {
    return {
        _operationHistoryPageNumber: -1,

        _form: null,

        setOperationHistoryPageNumber: function(pageNumber) {
            this._operationHistoryPageNumber = pageNumber;
        },

        initialize: function() {
            this.assigned_issue_to();
            this.initComponentEvent();
            this._buildCloneDialog();
        },

        _buildCloneDialog: function() {
            if (!$("#cloneDialog").length) {
                var cloneDialog = '<div class="modal fade" id="cloneDialog" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="dailogTitle" aria-hidden="true">' +
                    '<div class="modal-dialog" style="margin-top: 150px;">' +
                    '<div class="modal-content">' +
                    '<div class="modal-header">' +
                    '<button type="button" class="close btn-clone-cancel" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' +
                    '<h4 class="modal-title" id="dailogTitle">复制缺陷</h4>' +
                    '</div>' +
                    '<div class="modal-body">' +
                    '<form class="form-horizontal cloneIssueForm" role="form" action="' + $.url_root + '/issue/cloneIssue.jspa">' +
                    /*'<div class="form-group form-group-sm">' +
                    '<label class="col-sm-2 control-label" for="formGroupInputSmall">缺陷编号</label>' +
                    '<div class="col-sm-10">' +
                    '<input class="required-validation form-control" name="issueDTO.code" type="text" placeholder="请输入缺陷编号">' +
                    '<span class="help-block"><span style="color: rgb(91,192,222);"><span class="glyphicon glyphicon-warning-sign"></span></span> <span style="color: #737373;">请输入缺陷编号，留空将由系统自动产生一个缺陷编号。</span></span>' +
                    '</div>' +
                    '</div>' +*/
                    '<div class="form-group form-group-sm">' +
                    '<label class="col-sm-2 control-label">是否审核</label>' +
                    '<div class="col-sm-10">' +
                    '<select class="auditSelector" name="issueDTO.isApproved" style="width: 100%;">' +
                    '<option value="false" selected>不审核</option>' +
                    '<option value="true">审核</option>' +
                    '</select>' +
                    '</div>' +
                    '</div>' +
                    '<div class="form-group form-group-sm fixerSelector">' +
                    '<label class="col-sm-2 control-label">修复人</label>' +
                    '<div class="col-sm-10">' +
                    '<input class="required-validation ignored modal-receiver" name="issueDTO.fixedUser" type="hidden" data-url="' + $.url_root + '/user/findUsersByDevelopRole.jspa" data-single="true" data-placeholder="请指定一个修复人">' +
                    '</div>' +
                    '</div>' +
                    '<input type="hidden" name="issueId" value="' + $("#issueId").val() + '">' +
                    '<input type="hidden" name="cloneableProjectType" value="' + $("#cloneableProjectType").val() + '">' +
                    '</form>' +
                    '</div>' +
                    '<div class="modal-footer">' +
                    '<button type="button" class="btn btn-default btn-clone-cancel" data-dismiss="modal">取消</button>' +
                    '<button type="button" class="btn btn-primary btn-clone-ok">确定</button>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';

                $(".cloneDialogContainer").append($(cloneDialog));
                $(".cloneIssueForm .auditSelector").select2().on("select2-selected", function(e) {
                    if (e.val === "true") {
                        $(".cloneDialogContainer .fixerSelector").css("display", "none").find("input").select2("val", "");
                    } else {
                        $(".cloneDialogContainer .fixerSelector").css("display", "block");
                    }
                });

                // HACK: 删除select2 不必要的搜索栏
                $(".cloneIssueForm .select2-search").remove();

                this._applyValidation($(".cloneIssueForm"));
            }
        },

        _applyValidation: function($form) {
            this._form = $form.validate({
                errorElement: "strong",
                ignore: ":not('.required-validation')",
                errorClass: "note_error text-danger",
                focusCleanup: true,
                focusInvalid: false,
                rules: {
                    "issueDTO.fixedUser": "required" //,
                        // "issueDTO.code": {
                        //     customRule: /^[0-9a-zA-Z_]+$/,
                        //     remote: {
                        //         url: $.url_root + "/issue/uniqueCode.jspa",
                        //         dataType: "json",
                        //         type: "POST"
                        //     }
                        // }
                },
                messages: {
                    "issueDTO.fixedUser": {
                        required: validation.issue.fixedUserCannotEmpty
                    } // ,
                    // "issueDTO.code": {
                    //     remote: "缺陷编号已存在，请重新指定"
                    // }
                },

                invalidHandler: function(event, validator) {
                    if ($(".cloneIssueForm .auditSelector").select2("val") === "true" && validator.numberOfInvalids() === 1 && validator.currentElements.hasClass("ignored")) {
                        this.submit();
                    }
                },

                highlight: function(element, errorClass) {
                    $(element).parent().addClass("has-error");
                },

                unhighlight: function(element, errorClass) {
                    $(element).parent().removeClass("has-error");
                },

                errorPlacement: function(error, element) {
                    error.insertAfter(element);
                }
            });
        },

        initComponentEvent: function() {
            var self = this;
            $('#issueTab a[href="#a2"]').on('show.bs.tab', function(e) {
                self.loadPersonalOperationHistory();
            });

            $(".btn-load-more-history").on("click", ".btn-next-page", function(e) {
                if (!$(this).attr("disabled")) {
                    self.loadPersonalOperationHistory(self._operationHistoryPageNumber + 1);
                }
                e.stopPropagation();
            });

            $(".btn-load-more-history").on("click", ".btn-prev-page", function(e) {
                if (!$(this).attr("disabled")) {
                    self.loadPersonalOperationHistory(self._operationHistoryPageNumber - 1);
                }
                e.stopPropagation();
            });

            $(".btn-clone").on("click", function(e) {
                $("#cloneDialog").modal("show");
            });

            $(".cloneDialogContainer").on("click", ".btn-clone-ok", function(e) {
                $(".cloneIssueForm").submit();
            });

            $(".cloneDialogContainer").on("click", ".btn-clone-cancel", function(e) {
                var $delegateTarget = $(e.delegateTarget);
                $delegateTarget.find(".has-error").removeClass("has-error");
                self._form.resetForm();
                $delegateTarget.find(".required-validation").each(function(i, v) {
                    if ($(this).hasClass("ignored")) {
                        $(this).select2("val", "");
                    } else {
                        $(this).val("");
                    }
                });
            });

            $("#btn-del-issue").on("click", function(e) {
                //清除界面上现有弹出框
                clearSmallBox();
                $.smallBox({
                    title: "操作提示",
                    content: "您即将要删除该缺陷，确认要删除该缺陷吗? <p class='text-align-right'>" +
                        "<a href='javascript:void(0);' class='btn btn-danger btn-sm btn-delete-issue'>是</a> " +
                        "<a href='javascript:void(0);' class='btn btn-primary btn-sm'>否</a></p>",
                    color: "#A65858",
                    icon: "fa fa-bell swing animated"
                });
            });

            $("body").on("click", "a.btn-delete-issue", function(e) {
                // 锁定，防止重复提交
                if(!lockSmallBox()) {
                    return;
                }
                $.ajax({
                    url: $.url_root + "/issue/disIssue.jspa",
                    type: "post",
                    datatype: "json",
                    data: {
                        issueId: $("#issueId").val()
                    },

                    success: function(result) {
                        location.href = $.url_root + $("#listUrl").val();
                    }
                });
            });
        },

        //处理指派人弹出框
        assigned_issue_to: function() {
            $(".modal-receiver").each(function(i, v) {
                var $that = $(this);
                $that.select2($.extend({
                    placeholder: "Please select one",
                    allowClear: true,
                    width: "100%",
                    ajax: {
                        url: $.url_root + "/user/findUsersByDevelopRole.jspa",
                        dataType: 'json',
                        quietMillis: 300,

                        data: function(term, page) {
                            return {
                                "userQueryConditionDTO.name": term,
                                "userQueryConditionDTO.realName": term,
                                iDisplayStart: (page - 1) * 10 + 1,
                                iDisplayLength: 10
                            };
                        },

                        results: function(data, page) {
                            var more = (page * 10) < data.totalRecords; // whether or not there are more results available
                            var realNames = new Array();
                            for (var i = 0; i < data.totalDisplayRecords; i++) {
                                realNames.push({
                                    id: data.json.results[i].id,
                                    text: data.json.results[i].text,
                                    realName: data.json.results[i].realName
                                });
                            }

                            return {
                                results: realNames,
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
                    	var html = " " + realName;
                        html += (object.id ?  " [ " + object.id + " ]" : "");
                        return html;
                    },

                    dropdownCssClass: "bigdrop",

                    escapeMarkup: function(m) {
                        return m;
                    }

                }, {
                    multiple: !$that.data("single") ? true : false
                }));
            });
        },

        //加载历史记录
        loadPersonalOperationHistory: function(pageNumber) {
            var self = this;
            $.ajax({
                url: $.url_root + "/issue/loadOperationHistory.jspa",
                type: "post",
                datatype: "json",
                data: {
                    pageNum: pageNumber,
                    issueId: $("#issueId").val(),
                    projectId: $("#projectId").val()
                },

                beforeSend: function() {
                    $("#historyWrapper").addClass("widget-body-ajax-loading");
                },

                complete: function() {
                    $("#historyWrapper").removeClass("widget-body-ajax-loading");
                },

                success: function(result) {
                    checkResult(result, {
                        showBox: false,
                        callback: function() {
                            if (result.totalPage) { //意味着有当前缺陷的相关记录
                                if (result.totalPage !== 1) {
                                    $(".btn-load-more-history").css("display", "block");
                                }

                                var pageNumber = result.pageNum;
                                if (pageNumber === result.totalPage) {
                                    if (pageNumber === 1) {
                                        $(".btn-next-page").attr("disabled", true);
                                        $(".btn-prev-page").attr("disabled", true);
                                    } else {
                                        $(".btn-next-page").attr("disabled", true);
                                        $(".btn-prev-page").removeAttr("disabled");
                                        self._operationHistoryPageNumber = pageNumber;
                                    }
                                } else if (pageNumber === 1) {
                                    $(".btn-prev-page").attr("disabled", true);
                                    $(".btn-next-page").removeAttr("disabled");
                                    self._operationHistoryPageNumber = pageNumber;
                                } else {
                                    $(".btn-prev-page").removeAttr("disabled");
                                    $(".btn-next-page").removeAttr("disabled");
                                    self._operationHistoryPageNumber = pageNumber;
                                }

                                $(".btn-load-more-history").siblings().remove().end().before(i18n.translateTemplate2I18n(result.result));
                            } else {
                                $(".no-history-info").empty().append(i18n.translateTemplate2I18n(result.result));
                            }
                        }
                    });
                }
            });
        }
    };
}());
