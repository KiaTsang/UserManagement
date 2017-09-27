/**
 * FileName: common.js
 *
 * File description goes here.
 *
 * Copyright (c) 2010 Asiasoft, Inc. All Rights Reserved.
 *
 * @author <a href="mailto:qiqu.huang@iaspec.net">Charlie Huang</a>
 * @Version: 1.0.0
 * @DateTime: 2014-07-14
 */

var issueCommon = (function($) {
    return {
        // 初始化弹出框和select2组件
        initialize: function() { // step one
            this._initDialog();
            msgBox.initialize();
            this.assigned_issue_to();
            this.initSelect2Component();
            $("#btn-add-attachment").click(function(e) {
                $("#file-upload").click();
            });
            this._watchOperation();
        },

        _cache: $("body"),

        _issueStatusBackground: {
            NEW: 'status',
            REJECT: 'label-warning',
            SUSPEND: 'label-warning',
            OPEN: 'bg-color-pink',
            FIXED: 'bg-color-blue',
            VALIDATED: 'label-success',
            REOPEN: 'label-danger',
            DISPUTABLE: 'label-warning',
            CLOSED: 'label-success',
            DRAFT: 'label-primary'  //  TUDO
        },

        _issueSeverityFontColor: {
            DEADLY: 'fa fa-arrow-circle-up txt-color-red',
            SERIOUS: 'fa fa-arrow-circle-up txt-color-yellow',
            COMMON: 'fa fa-arrow-circle-down txt-color-blue',
            SLIGHT: 'fa fa-arrow-circle-down txt-color-greenDark'
        },

        _items: {
            "dtms_res_issue_approve_new": {
                text: i18nRes.issue.operations.AUDIT,
                code: "0001",
                url: "processApprovedIssue.jspa"
            },
            "dtms_res_issue_suspend": {
                text: i18nRes.issue.operations.SUSPEND,
                code: "0002",
                url: "processSuspendIssue.jspa"
            },
            "dtms_res_issue_reject": {
                text: i18nRes.issue.operations.REJECT,
                code: "0003",
                url: "processRejectIssue.jspa"
            },
            "dtms_res_issue_claim": {
                text: i18nRes.issue.operations.APPLY,
                code: "0004",
                url: "processClaimIssue.jspa"
            },
            "dtms_res_issue_assign": {
                text: i18nRes.issue.operations.ASSIGN,
                code: "0005",
                url: "processAssignIssue.jspa"
            },
            "dtms_res_issue_disputable": {
                text: i18nRes.issue.operations.DISPUTABLE,
                code: "0006",
                url: "processDisputable.jspa"
            },
            "dtms_res_issue_fix": {
                text: i18nRes.issue.operations.FIXED,
                code: "0007",
                url: "processFixIssue.jspa"
            },
            "dtms_res_issue_validate": {
                text: i18nRes.issue.operations.VALIDATED,
                code: "0008",
                url: "processValidateFixedIssue.jspa"
            },
            "dtms_res_issue_close": {
                text: i18nRes.issue.operations.CLOSE,
                code: "0010",
                url: "processCloseIssue.jspa"
            },
            "dtms_res_issue_reopen": {
                text: i18nRes.issue.operations.REOPEN,
                code: "0011",
                url: "processReopenIssue.jspa"
            },
            "dtms_res_issue_submit": {
                text: i18nRes.issue.operations.SUBMIT,
                code: "0012",
                url: "subIssue.jspa"
            },
            "dtms_res_issue_delete": {
                text: i18nRes.issue.operations.DELETE,
                code: "0013",
                url: "delIssue.jspa"
            },
            "dtms_res_issue_reassign": {
                text: i18nRes.issue.operations.REASSIGN,
                code: "0014",
                url: "processReAssignIssue.jspa"
            }
        },

        _const: {
//            globalResources: localStorage.getItem("globalResources").split(","),
            specificResources: localStorage.getItem("specificResources"),
            listUrlPrefix: $.url_root + "/issue/issue_", // 定义列表操作前缀
            editUrlprefix: $.url_root + "/issue/edit_", // 定义编辑操作前缀
            loginUser: $("#loginUser").val(),
            conditionPrefix: "issueQueryCondition.",
            searchType: {
                simple: "simple",
                combination: "combination"
            }
        },

        _actionStatus: {
            "0001": "OPEN",
            "0002": "SUSPEND",
            "0003": "REJECT",
            "0004": "OPEN",
            "0005": "OPEN",
            "0006": "DISPUTABLE",
            "0007": "FIXED",
            "0008": "VALIDATED",
            "0010": "CLOSED",
            "0011": "REOPEN"
        },

        _actionOperation: { // for i18n
            "0001": "AUDIT",
            "0002": "SUSPEND",
            "0003": "REJECT",
            "0004": "APPLY",
            "0005": "ASSIGN",
            "0006": "DISPUTABLE",
            "0007": "FIXED",
            "0008": "VALIDATED",
            "0010": "CLOSE",
            "0011": "REOPEN",
            "0012": "SUBMIT",
            "0013": "DELETE",
            "0014": "REASSIGN"
        },

        // 状态-菜单按钮操作定义
        _statusResources: {
            "NEW": ["dtms_res_issue_approve_new", "dtms_res_issue_suspend", "dtms_res_issue_reject"],
            "OPEN": ["dtms_res_issue_claim", "dtms_res_issue_assign", "dtms_res_issue_disputable", "dtms_res_issue_fix","dtms_res_issue_reassign",],
            "REOPEN": ["dtms_res_issue_disputable", "dtms_res_issue_fix", "dtms_res_issue_reassign"],
            "FIXED": ["dtms_res_issue_validate", "dtms_res_issue_reopen"],
            "VALIDATED": ["dtms_res_issue_close"],
            "REJECT": ["dtms_res_issue_close"],
            "CLOSED": [],
            "SUSPEND": ["dtms_res_issue_reject", "dtms_res_issue_reopen"],
            "DISPUTABLE": ["dtms_res_issue_reject", "dtms_res_issue_reopen", "dtms_res_issue_suspend"],
            "DRAFT": ["dtms_res_issue_delete", "dtms_res_issue_submit"]
        },

        // infos包含当前dialog所需要填充的信息
        _setDialogInfo: function(eleId, infos) {
            var $dialog = $("#" + eleId);
            if ($dialog.length) {
                for (var k in infos) {
                    if (infos.hasOwnProperty(k)) {
                        if (k === "proName" || k === "pName") {
                            if (infos[k]) {
                                $dialog.find("." + k).html(infos[k]).parent("div").removeClass("hidden");
                            } else {
                                $dialog.find("." + k).html("").parent("div").addClass("hidden");
                            }
                            continue;
                        }
                        $dialog.find("." + k).html(infos[k]);
                    }
                }
            }
        },

        _initDialog: function() { // step2
            var url = $.url_root + "/user/findUsersByDevelopRole.jspa";
            var assigned_dialog =
                '<div class="modal" id="assign-issue-dialog" tabindex="-1" role="dialog" aria-labelledby="assign-issue-dialog-title" aria-hidden="true" data-backdrop="static" data-show="true">' +
                '<div class="modal-dialog" style="margin-top: 150px;">' +
                '<div class="modal-content">' +
                '<div class="modal-header assign-dialog-heading">' +
                '<h4 class="modal-title" id="assign-issue-dialog-title"><span class="operationTitle"></span></span></h4>' +
                '</div>' +
                '<div class="modal-body">' +
                '<div class="panel panel-default pInfo">' +
                '<div class="panel-body">' +
                // ###############
                '<div class="row">' +
                '<div class="col-lg-12 hidden">' +
                '<label><strong>项目名称：</strong></label>' +
                '<div class="pName break-all" style="display: inline;">' +
                '</div>' +
                '</div>' +
                '<div class="col-lg-12 hidden">' +
                '<label><strong>产品名称：</strong></label>' +
                '<div class="proName" style="display: inline;">' +
                '</div>' +
                '</div>' +
                '<div class="col-lg-12">' +
                '<label><strong>缺陷概要：</strong></label>' +
                '<div class="pDesc break-all">' +
                '</div>' +
                '</div>' +
                '</div>' +
                // ###############
                '</div>' +
                '</div>' +
                '<form class="form-horizontal hidden approve-dialog">' +
                '<div class="form-group hidden fixedUser-container">' +
                '<label class="control-label col-lg-2 text-left">' + i18nRes.issue.issueLabel.assigner + '</label>' +
                '<div class="col-lg-10">' +
                '<input name="modal_receiver" class="modal-receiver ignored required-validation" id="fixedUserSelector" data-formatResult="true" data-url="' +
                url + '" data-single="true" type="hidden" style="width: 100%;" data-placeholder="' + i18nRes.issue.issueLabel.assigner + '">' +
                '</div>' +
                '</div>' +
                '<div class="bPContainer1"></div>' +
                '<div class="comment-container">' +
                // security
                '<div class="form-group">' +
                '<label class="control-label col-lg-2 text-left">' +
                i18nRes.issue.issueLabel.security +
                '</label>' +
                '<div class="col-lg-10">' +
                '<input class="security-level" name="security" type="hidden" data-select="PUBLIC" data-single="true" style="width: 100%;" data-src="local" data-placeholder="' +
                i18nRes.issue.issueLabel.security + '">' +
                '</div>' +
                '</div>' +
                // security
                // basic point
                '<div class="bPContainer"></div>' +
                // end basic point
                '<div class="form-group">' + '<label class="control-label col-lg-2 text-left">' + i18nRes.issue.issueLabel.remark + '</label>' +
                '<div class="col-lg-10">' + '<textarea name="issueRemark" class="form-control col-lg-10 no-resize issueRemark required-validation" placeholder="请输入一些关于该缺陷的想法或意见..." style="min-height: 120px;"></textarea>' + '</div>' +
                '</div>' + '</div>' + '<div class="form-group hidden remark-container">' + '<label class="control-label col-lg-2 text-left">' + i18nRes.issue.issueLabel.remark +
                '</label>' + '<div class="col-lg-10">' + '<textarea name="issueRemark1" class="form-control col-lg-10 no-resize issueRemark required-validation" placeholder="请输入一些关于该缺陷的想法或意见..." style="min-height: 120px;"></textarea>' + '</div>' +
                '</div>' + '</form>' + '<form class="hidden other-dialog">' + '<div class="form-group">' + '<label>' + i18nRes.issue.issueLabel.remark + '</label>' + '&nbsp;<span style="color: red;">*</span>' +
                '<textarea class="form-control no-resize issueRemarks required-validation" name="issueRemarks" placeholder="请输入一些关于该缺陷的想法或意见..." style="min-height: 120px;"></textarea>' + '</div>' + '</form>' + '</div>' +
                '<div class="modal-footer buttons-container">' + '<button class="btn btn-default btn-assign-cancel" type="button" data-dismiss="modal">' + i18nRes.global.cancel + '</button>' // 如需添加一个新的dialog，请给取消按钮添加.btn-assign-cancel
                + '<button class="btn btn-primary btn-listener" type="button">' + i18nRes.global.pass + '</button>' + '</div>' + '</div>' + '</div>' + '</div>';

            var issueCommentDialog =
                '<div class="modal" id="issue-comment-dialog" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static" data-show="true">' +
                '<div class="modal-dialog" style="margin-top: 150px;">' +
                '<div class="modal-content">' +
                '<div class="modal-header assign-dialog-heading">' +
                '<h4 class="modal-title"><span class="commentTitle"></span></h4>' +
                '</div>' +
                '<div class="modal-body">' +
                '<div class="panel panel-default pInfo">' +
                '<div class="panel-body">' +
                // project infos modules
                '<div class="row">' +
                '<div class="col-lg-12 hidden">' +
                '<label><strong>项目名称：</strong></label>' +
                '<div class="pName break-all" style="display: inline;">' +
                '</div>' +
                '</div>' +
                '<div class="col-lg-12 hidden">' +
                '<label><strong>产品名称：</strong></label>' +
                '<div class="proName" style="display: inline;">' +
                '</div>' +
                '</div>' +
                '<div class="col-lg-12">' +
                '<label><strong>缺陷概要：</strong></label>' +
                '<div class="pDesc break-all">' +
                '</div>' +
                '</div>' +
                '</div>' +
                // ###############
                '</div>' +
                '</div>' +
                '<form><div class="form-group">' +
                '<label for="ta">' + i18nRes.issue.issueLabel.comment + '</label>' +
                '<textarea id="ta" class="form-control no-resize tx-comment-area" style="min-height: 120px;"></textarea>' +
                '</div>' + '</form>' + '</div>' + '<div class="modal-footer buttons-container">' +
                '<button class="btn btn-default btn-assign-cancel" type="button" data-dismiss="modal">' + i18nRes.global.cancel + '</button>' +
                '<button class="btn btn-primary btn-issue-comment" type="button" data-dismiss="modal">' + i18nRes.global.save + '</button>' + '</div>' +
                '</div>' + '</div>' + '</div>';

            var cache = this._cache;

            $("<div class='jbpmDialogCont'></div>").appendTo("body");

            $(".jbpmDialogCont").on("click", ".btn-submit", function(e) {
                var $that = $(this);
                $.post($.url_root + "/issue/" + $that.data("url"), { issueId: $that.next(".iid").val(), "issueDTO.globalApprover": ($(".gApprover").select2("val") || undefined)}, function(result) {
                    checkResult(result, {
                        callback: function() {
                            if ($('#dt_issues').length) {
                                $('#dt_issues').DataTable().draw();
                            } else {
                                location.href = location.href;
                            }
                        },
                        message: that.getAjaxSuccessMsg("0012")
                    });
                });
            });

            $("#assign-issue-dialog, #issue-comment-dialog").remove();
            $(assigned_dialog + "," + issueCommentDialog).appendTo(cache);
            var form = this._initDialogValidate();
            var form1 = this._initCommentValidation();
            var that = this;

            // bind pass button
            $("#assign-issue-dialog").on("click", ".btn-listener", function(e) {
                var options = cache.data("options");
                var issueRemark = $(".issueRemark").val() != "" ? $(".issueRemark").val() : $(".issueRemarks").val();
                $.extend(options, {
                    remark: issueRemark
                });
                that._setStatus(options, form, form1);
            }).on("hidden.bs.modal", function(e) {
                $(this).find("textarea").val("").end().find(".modal-receiver").select2("val", "").end().find(".security-level").select2("val", "PUBLIC"); // 默认选中“公开”
                form.invalidElements().next().hide().parent().removeClass("has-error");
                form1.invalidElements().next().hide().parent().removeClass("has-error");
            }).find(".modal-receiver").on("select2-selected", function(e) {
                cache.data("receiver", e.choice.text);
                form.form();
            });

            $(".btn-assign-cancel").click(function(e) {
                cache.removeData();
            });

            var that = this;

            // bind menu list item event
            $('#dt_issues,#btn-operation-group,#dt_attentionIssues,#dt_pendingDisposeIssues,#dt_submitIssues').on("click", ".status_click", function(e) {
                // 清除界面上现有弹出框
                clearSmallBox();
                var $that = $(this),
                    options = $that.data("options"),
                    code = options.code,
                    title = $that.data("title"),
                    $title = $(".operationTitle"),
                    $dialog = $("#assign-issue-dialog"),
                    securityLevel = options.securityLevel,
                    issueStatus = options.issueStatus;

                // 初始化securityLevel的值
                var securityLevelIsNull = (securityLevel == "undefined" || securityLevel == undefined || securityLevel == "" || securityLevel == "null" || securityLevel == null);
                !securityLevelIsNull ? $(".security-level").select2("val", securityLevel) : $(".security-level").select2("val", "PUBLIC");

                var data = {
                    "options": options,
                    "that": $that
                };

                if (code === that._items.dtms_res_issue_approve_new.code || code === that._items.dtms_res_issue_assign.code || code === that._items.dtms_res_issue_fix.code || code === that._items.dtms_res_issue_validate.code || code === that._items.dtms_res_issue_suspend.code || code === that._items.dtms_res_issue_reject.code || code === that._items.dtms_res_issue_disputable.code || code === that._items.dtms_res_issue_reopen.code || code === that._items.dtms_res_issue_reassign.code) {

                    that.setDialogTitle(code, common.placeholderConversion({
                        msg: i18nRes.issue.dialogTitle[that._actionOperation[code]],
                        args: [title]
                    }), data);

                } else if (code === that._items.dtms_res_issue_close.code) {
                    var closeContent = common.placeholderConversion({
                        msg: i18nRes.issue.dialogContent.closeContent
                    });
                    msgBox.showBox({
                        title: common.placeholderConversion({
                            msg: i18nRes.issue.dialogTitle[that._actionOperation[code]],
                            args: [title]
                        }),
                        //data-processinstanceid=\"" + options.processInstanceId + "\"
                        content: closeContent + " <p class='text-align-right'><a href='javascript:void(0);' class='btn btn-danger btn-sm btn-go' data-issueid=\"" + options.issueId + "\" data-url=\"" + options.url + "\" data-code=\"" + options.code + "\">" + i18nRes.global.yes + "</a> <a href='javascript:void(0);'  class='btn btn-primary btn-sm'>" + i18nRes.global.no + "</a></p>",
                        color: "INFO",
                        icon: "BELL",
                        callback: that._setStatus,
                        sourcePointer: that
                    });
                    return;
                } else if (code === that._items.dtms_res_issue_claim.code) {
                    var applyContent = common.placeholderConversion({
                        msg: i18nRes.issue.dialogContent.applyContent
                    });
                    msgBox.showBox({
                        title: common.placeholderConversion({
                            msg: i18nRes.issue.dialogTitle[that._actionOperation[code]],
                            args: [title]
                        }),
                        //data-processinstanceid=\"" + options.processInstanceId + "\"
                        content: applyContent + " <p class='text-align-right'><a href='javascript:void(0);' class='btn btn-danger btn-sm btn-go' data-issueid=\"" + options.issueId + "\" data-url=\"" + options.url + "\" data-code=\"" + options.code + "\">" + i18nRes.global.yes + "</a> <a href='javascript:void(0);'  class='btn btn-primary btn-sm'>" + i18nRes.global.no + "</a></p>",
                        color: "INFO",
                        icon: "BELL",
                        callback: that._setStatus,
                        sourcePointer: that
                    });
                    return;
                } else if (code === that._items.dtms_res_issue_delete.code) {
                    var deleteContent = common.placeholderConversion({
                        msg: i18nRes.issue.dialogContent.deleteContent
                    });

                    $.smallBox({
                        title: common.placeholderConversion({
                            msg: i18nRes.issue.dialogTitle[that._actionOperation[code]],
                            args: [title]
                        }),
                        content: deleteContent + " <p class='text-align-right'><a href='javascript:;' class='btn btn-danger btn-sm btn-sure'>" + i18nRes.global.yes + "</a> <a href='javascript:;'  class='btn btn-primary btn-sm'>" + i18nRes.global.no + "</a></p>",
                        color: "#A65858",
                        icon: "fa fa-bell swing animated",
                    });


                    $(".btn-sure").off("click").on("click", function(e) {
                        $.post($.url_root + "/issue/" + options.url, { issueId: options.issueId }, function(result) {
                            checkResult(result, {
                                callback: function() {
                                    if ($('#dt_issues').length) {
                                        $('#dt_issues').DataTable().draw();
                                    } else {
                                        setTimeout(function() {
                                            location.href = $("#listUrl").val();
                                        }, 1500);
                                    }
                                },
                                message: that.getAjaxSuccessMsg(code)
                            });
                        });
                    });

                    return;
                } else if (code === that._items.dtms_res_issue_submit.code) {
                    var submitContent = common.placeholderConversion({
                        msg: i18nRes.issue.dialogContent.submitContent
                    });

                    if (!options.fixedUser) {
                        that.submitDraftToJBPM($.url_root + "/user/findUsersByDevelopRole.jspa", {
                            title: title,
                            pName: options.pName,
                            pDesc: options.pDesc,
                            issueId: options.issueId
                        });
                        return;
                    }

                    $.smallBox({
                        title: common.placeholderConversion({
                            msg: i18nRes.issue.dialogTitle[that._actionOperation[code]],
                            args: [title]
                        }),
                        content: submitContent + " <p class='text-align-right'><a href='javascript:;' class='btn btn-danger btn-sm btn-sure'>" + i18nRes.global.yes + "</a> <a href='javascript:;'  class='btn btn-primary btn-sm'>" + i18nRes.global.no + "</a></p>",
                        color: "#296191",
                        icon: "fa fa-bell swing animated",
                    });

                    $(".btn-sure").off("click").on("click", function(e) {
                        $.post($.url_root + "/issue/" + options.url, { issueId: options.issueId }, function(result) {
                            checkResult(result, {
                                callback: function() {
                                    if ($('#dt_issues').length) {
                                        $('#dt_issues').DataTable().draw();
                                    } else {
                                        location.href = location.href;
                                    }

                                },
                                message: that.getAjaxSuccessMsg(code)
                            });
                        });
                    });

                    return;
                }

                $("#assign-issue-dialog").modal('show');

                e.stopPropagation();

            }).on("click", ".btn-comment", function(e) {
                cache.data("commentIssueId", $(this).data("issueid"));
                var title = $(this).data("title");

                that._setDialogInfo("issue-comment-dialog", {
                    commentTitle: common.placeholderConversion({
                        msg: i18nRes.issue.dialogTitle.commentTitle,
                        args: [title]
                    }),
                    pName: $(this).data("options").pName,
                    pDesc: $(this).data("options").pDesc,
                    proName: $(this).data("options").proName
                });

                $("#issue-comment-dialog")
                .find(".btn-issue-comment")
                .data("title", title)
                .end()
                .modal('show');
            });

            // 绑定弹出评论框的事件
            $("#issue-comment-dialog").on("click", ".btn-issue-comment", function(e) {
                that._submitIssueComment({
                    "commentDTO.issueId": cache.data("commentIssueId"),
                    "commentDTO.commentBody": $(".tx-comment-area").val()
                }, {
                    commentTitle: $(this).data("title")
                });
            }).on("hidden.bs.modal", function(e) {
                $(this).find("textarea").val("");
            });

        },

        // 设置弹出框的标题，同时显示不同内容到弹出框
        // code：指示当前操作是哪种类型
        setDialogTitle: function(code, title, data) {
            var that = this,
                bPoint = data.options.bp;
            var fixedUser = data.options.fixedUser;
            var fixedUserIsNull = (fixedUser == null || fixedUser == undefined || fixedUser == 'null' || fixedUser == 'undefined' || fixedUser == "");
            var $dialog = $("#assign-issue-dialog"); // 模态对话框
            this._setDialogInfo("assign-issue-dialog", {
                operationTitle: title,
                pName: data.options.pName,
                pDesc: data.options.pDesc,
                proName: data.options.proName
            });
            $dialog.find(".remark-container").addClass("hidden");
            $dialog.find(".fixedUser-container").addClass("hidden");
            $(".bPContainer, .bPContainer1").removeClass("form-group").empty(); // remove first for safety
            if (code === that._items.dtms_res_issue_approve_new.code) {
                $dialog.find(".fixedUser-container").removeClass("hidden");
                that.addBPointComp(".bPContainer", bPoint);
                $dialog.find(".comment-container").removeClass("hidden").parent(".approve-dialog").removeClass("hidden").siblings().not(".pInfo").addClass("hidden");
            } else if ((code === that._items.dtms_res_issue_suspend.code || code === that._items.dtms_res_issue_reject.code) && fixedUserIsNull) {
                $dialog.find(".comment-container").removeClass("hidden").parent(".approve-dialog").removeClass("hidden").siblings().not(".pInfo").addClass("hidden");
            } else if (code === that._items.dtms_res_issue_assign.code) {
                $dialog.find(".fixedUser-container").removeClass("hidden");
                $dialog.find(".comment-container").addClass("hidden").parent(".approve-dialog").removeClass("hidden").siblings().not(".pInfo").addClass("hidden");
            } else if (code === that._items.dtms_res_issue_reassign.code) {
                $dialog.find(".fixedUser-container").removeClass("hidden");
                $dialog.find(".comment-container").addClass("hidden").parent(".approve-dialog").removeClass("hidden").siblings().not(".pInfo").addClass("hidden");
                $dialog.find(".remark-container").removeClass("hidden");
            }
            else if (code === that._items.dtms_res_issue_reopen.code && data.options.issueStatus == "SUSPEND" && fixedUserIsNull) {
                that.addBPointComp(".bPContainer1", bPoint);
                $dialog.find(".fixedUser-container").removeClass("hidden");
                $dialog.find(".comment-container").addClass("hidden").parent(".approve-dialog").removeClass("hidden").siblings().not(".pInfo").addClass("hidden");
                $dialog.find(".remark-container").removeClass("hidden");
            } else if (code === that._items.dtms_res_issue_fix.code || code === that._items.dtms_res_issue_validate.code || code === that._items.dtms_res_issue_suspend.code || code === that._items.dtms_res_issue_reject.code || code === that._items.dtms_res_issue_disputable.code || code === that._items.dtms_res_issue_reopen.code) {
                $dialog.find(".other-dialog").removeClass("hidden").siblings().not(".pInfo").addClass("hidden");
            }
            that._cache.data(data);
        },

        addBPointComp: function(eleCls, defaultVal) {
            $(eleCls).addClass("form-group").html(
                '<label class="control-label col-lg-2 text-left">基点</label>' +
                '<div class="col-lg-10">' +
                '<input type="text" name="basicPoint" class="form-control basicPoint required-validation" placeholder="请输入关于该缺陷的统计基点" value="' + defaultVal + '">' +
                '</div>'
            );
        },
        /**
		 * @params data 发送到服务器的参数
		 * @params data 当前缺陷相关的数据
		 */
        _setStatus: function(options, form, form1) {
            var fixedUser = options.fixedUser;
            var fixedUserIsNull = (fixedUser == null || fixedUser == undefined || fixedUser == 'null' || fixedUser == 'undefined' || fixedUser == "");
            var issueId = options.issueId,
                //processInstanceId = options.processInstanceId,
                code = options.code,
                url = options.url,
                remark = options.remark,
                data = {
                    "issueDTO.issueId": issueId,
                    //"issueDTO.processInstanceId": processInstanceId,
                    "issueDTO.remark": remark
                };

            if (code != undefined) {
                var loginUser = this._const.loginUser;
                var security = $.trim($(".security-level").select2("val")) || "PUBLIC";
                if (code === this._items.dtms_res_issue_approve_new.code) {
                    if (!form.form()) {
                        return;
                    }
                    var receiver = this._cache.data("receiver");
                    data = $.extend(data, receiver ? {
                        "issueDTO.fixedUser": receiver
                    } : {}, {
                        "issueDTO.securityLevel": security
                    }, {
                        "issueDTO.basicPoint": $.trim($(".bPContainer").find(".basicPoint").val())
                    }); // 审核或分配时是否有选择指派人
                } else if ((code === this._items.dtms_res_issue_suspend.code || code === this._items.dtms_res_issue_reject.code) && fixedUserIsNull) {
                    if (!form.element(".issueRemark")) {
                        return;
                    }
                    data = $.extend(data, {
                        "issueDTO.securityLevel": security
                    }); // 审核或分配时是否有选择指派人
                } else if (code === this._items.dtms_res_issue_assign.code) {
                    if (!form.form()) {
                        return;
                    }
                    var receiver = this._cache.data("receiver");
                    data = $.extend(data, receiver != undefined ? {
                        "issueDTO.fixedUser": receiver
                    } : {}); // 审核或分配时是否有选择指派人
                } else if (code === this._items.dtms_res_issue_close.code) {
                    data = $.extend(data, loginUser != undefined ? {
                        "issueDTO.closedUser": loginUser
                    } : {});
                } else if (code === this._items.dtms_res_issue_reopen.code && fixedUserIsNull) {
                    if (!form.form()) {
                        return;
                    }
                    var receiver = this._cache.data("receiver");
                    data = $.extend(data, receiver ? {
                        "issueDTO.fixedUser": receiver
                    } : {}, {
                        "issueDTO.basicPoint": $.trim($(".bPContainer1").find(".basicPoint").val())
                    });
                }else if (code === this._items.dtms_res_issue_reassign.code) {
                    if (!form.form()) {
                        return;
                    }
                    var receiver = this._cache.data("receiver");
                    data = $.extend(data, receiver ? {
                        "issueDTO.fixedUser": receiver
                    } : {});
                }
                else if (code === this._items.dtms_res_issue_validate.code) {
                    if (!form1.form()) {
                        return;
                    }
                    data = $.extend(data, loginUser != undefined ? {
                        "issueDTO.validator": loginUser
                    } : {});
                } else if (code === this._items.dtms_res_issue_reopen.code || code === this._items.dtms_res_issue_reject.code) {
                	 if (!form1.form()) {
                          return;
                      }
                	data = $.extend(data, loginUser != undefined ? {
                        "issueDTO.validator": loginUser
                    } : {});
                }
                else if (code === this._items.dtms_res_issue_claim.code) { // 认领时，修复人就是当前登陆者
                    data = $.extend(data, {
                        "issueDTO.fixedUser": loginUser
                    });
                } else if (code === this._items.dtms_res_issue_fix.code) {
                    if (!form1.form()) {
                        return;
                    }
                }
                else if (code === this._items.dtms_res_issue_disputable.code) {
                    if (!form1.form()) {
                        return;
                    }
                } else if (code === this._items.dtms_res_issue_suspend.code || code === this._items.dtms_res_issue_reject.code) {
                    if (!form1.form()) {
                        return;
                    }
                }
            }

            $("#assign-issue-dialog").modal("hide");
            var self = this;

            var ajaxSuccessMsg = this.getAjaxSuccessMsg(code);
            var isListOperation = options.isListOperation;
            var urlResult = self._const.listUrlPrefix + url;
            // 判断是列表操作url还是编辑页面操作url
            if ($('#dt_issues').length == 0) {
                urlResult = self._const.editUrlprefix + url;
            }
            $.ajax({
                url: urlResult,
                type: "post",
                datatype: "json",
                data: data,
                success: function(result) {
                    // 列表操作流程之后的处理
                    if ($('#dt_issues').length != 0) {
                        checkResult(result, {
                            callback: function() {
                                $('#dt_issues').DataTable().draw();
                            },
                            message: ajaxSuccessMsg
                        });
                    } else {
                        // 编辑页面操作流程之后的处理
                        checkResult(result, {
                            showBox: false,
                            callback: function() {
                                window.location.href = window.document.location.href;
                            }
                        });
                    }
                }
            });

            self._cache.removeData(); // 每次操作完成都要清除当次的缓存
        },

        // params: {commentDTO.commentBody: xxxx, commentDTO.issueId: xxxx}
        _submitIssueComment: function(params, extraParams) {
            var _self = this;
            $.ajax($.extend({
                url: $.url_root + "/issue/createSimpleIssueComment.jspa",
                type: "post",
                datatype: "json",
                success: function(result) {
                    checkResult(result, {
                        message: common.placeholderConversion({
                            msg: tipMessage.issueComment.commentIssueComment,
                            args: [extraParams.commentTitle]
                        })
                    });
                }
            }, {
                data: params
            }));
            this._cache.remove("commentIssueId"); // 清楚缓存的ID
        },

        getAjaxSuccessMsg: function(code) {
            return i18nRes.issue.ajaxSuccessMsg[this._actionOperation[code]];
        },

        // 将Issue的可操作的权限与当前登录用户所具有的权限作比对，取出有效的权限
        _getValidatedResources: function(resources, status, issueId, options) {
            var fixedUser = options.fixedUser;
            var loginUser = this._const.loginUser;
            var creator = options.creator;
            if (status === 'OPEN') {
                if (fixedUser != undefined && fixedUser != "" && fixedUser != null) { // 如果已指定修复者，则remove掉res_issue_claim和res_issue_assign
                    resources = resources.remove(["dtms_res_issue_claim", "dtms_res_issue_assign"]);
                    if (fixedUser != loginUser) { // 如果当前登录用户不是当前登录者，则remove掉争议和修复操作
                        resources = resources.remove(["dtms_res_issue_disputable", "dtms_res_issue_fix"]);
                    }
                } else { // 如果未指定修复者，则remove掉争议和修复功能
                    resources = resources.remove(["dtms_res_issue_disputable", "dtms_res_issue_fix"]);
                }
            } else if (status === 'REOPEN') {
                // 如果状态是REOPEN,且修复者不是当前登录用户，则remove掉争议和已修复
                if (fixedUser != undefined && fixedUser != loginUser) {
                    resources = resources.remove(["dtms_res_issue_disputable", "dtms_res_issue_fix"]);
                }
            }

            // 如果当前用户不是创建者且也不是测试角色，则remove掉dtms_res_issue_validate和dtms_res_issue_reopen
            if (status === 'FIXED' && creator != loginUser && !this.isTest()) {
                resources = resources.remove(["dtms_res_issue_validate", "dtms_res_issue_reopen"]);
            }

            if ((status === 'DISPUTABLE' || status === 'SUSPEND') && !this.isManager()) {
                resources = resources.remove(["dtms_res_issue_reopen"]);
            }

            if (status === 'DRAFT' && loginUser != creator) {
                resources = resources.remove(["dtms_res_issue_submit", "dtms_res_issue_delete"]);
            }

            var validResources = [],
                self = this;
            $.each(resources, function(i, v) {
                $.inArray(v, self._const.globalResources) != -1 && validResources.push({
                    text: self._items[v].text,
                    code: self._items[v].code,
                    url: self._items[v].url
                });
            });

            if (self._const.specificResources != null) {
                var specificResourcesTemp = self._const.specificResources.replace(/\{|\}|\[|\]/g, "").replace(/,(\d+)/g, "|$1").split("|");
                $.each(specificResourcesTemp, function(i, v) {
                    v = v.split("=");
                    var issueIdTemp = v[0];
                    var issueSpecificResourceTemps = v[1].split(",");

                    if (issueIdTemp == issueId) {
                        $.each(resources, function(i, v) {
                            if ($.inArray(v, issueSpecificResourceTemps) != -1 && $.inArray(v, self._const.globalResources) == -1) {
                                validResources.push({
                                    text: self._items[v].text,
                                    code: self._items[v].code,
                                    url: self._items[v].url
                                });
                            }
                        });
                    }
                });
            }
            return validResources;
        },
        /**
		 * 描述：为每条缺陷生成动态的菜单项
		 *
		 * @param issueDTO
		 *            当前缺陷的相关信息
		 * @return 返回相应的动态菜单字符串
		 */
        createMenuItems: function(issueDTO, options) {
            var itemsTemp = this._getValidatedResources(this._statusResources[issueDTO.status], issueDTO.status, issueDTO.issueId, options),
                html = [],
                itemsLen = itemsTemp.length,
                url = options.url,
                issueId = issueDTO.issueId,
                securityLevel = issueDTO.securityLevel,
                bp = issueDTO.basicPoint || "";
            var itemsLenTemp = itemsLen + 1; // 加1，因为下面的循环的初始值是从2开始，确保循环itemsTemp全部元素

            var issueCode = issueDTO.code || issueDTO.issueCode,
                defaultExtraOpts = {
                    pName: (issueDTO.projectDTO && issueDTO.projectDTO.name) || undefined,
                    pDesc: issueDTO.summary || undefined,
                    proName: (issueDTO.productionDTO && issueDTO.productionDTO.productionName) || undefined
                };

            html[0] = '<div>' + '<a class="btn btn-primary btn-xs dropdown-toggle" data-toggle="dropdown"><i class="fa fa-gear"></i> <i class="fa fa-caret-down"></i></a>' + '<ul class="dtable dropdown-menu pull-right">' + '<li class="operationlist text-left"><a href="' + url + issueId + '">' + i18nRes.issue.operations.view_issue + '</a></li>';

            html[itemsLenTemp + 2] = '<li class="text-left"><a href="javascript:void(0);" class="btn-comment" data-title="' + issueCode + '" data-issueid="' + issueId + '"' + 'data-options=\'' + JSON.stringify(defaultExtraOpts) + '\'>' + i18nRes.issue.operations.comment_issue + '</a></li>'
                + '</ul>' + '</div>';


            for (var i = 2; i <= itemsLenTemp; i++, (i == itemsLenTemp || i == itemsLenTemp + 1) ? (html[1] = '<li class="divider"></li>', html[itemsLenTemp + 1] = '<li class="divider"></li>') : '') {
                var item = itemsTemp[i - 2],
                    defaultOps = {
                        isListOperation: true
                    };
                    $.extend(defaultOps, {
                        issueId: issueId || undefined,
                        issueStatus: issueDTO.status || undefined,
                        securityLevel: securityLevel || undefined,
                        fixedUser: issueDTO.fixedUser || undefined,
                        pName: (issueDTO.projectDTO && issueDTO.projectDTO.name) || undefined,
                        pDesc: issueDTO.summary || undefined,
                        proName: (issueDTO.productionDTO && issueDTO.productionDTO.productionName) || undefined,
                        //processInstanceId: issueDTO.processInstanceId || undefined,
                        url: item.url || undefined,
                        code: item.code || undefined,
                        bp: bp
                    });

                html[i] = '<li class="text-left"><a class="status_click"' + ' href="javascript:void(0);" data-title="' + issueCode + '"' + ' data-options=\'' + JSON.stringify(defaultOps) + '\'>' + item.text + '</a></li>';
            }

            return html.join("");
        },
        /**
		 * 描述：为编辑页面的缺陷生成动态的菜单项
		 *
		 * @param 当前缺陷的相关信息
		 */
        createMenuItems_edit: function() {
            var statusTemp = $("#status").val();
            var issueIdTemp = $("#issueId").val();
           // var processInstanceId = $("#processInstanceId").val();
            var fixedUserTemp = $("#fixedUserTemp").val();
            var creatorTemp = $("#creatorTemp").val();
            var viewUrl = $("#viewUrl").val();
            var securityLevel = $("#security").val();
            var itemsTemp = this._getValidatedResources(this._statusResources[statusTemp], statusTemp, issueIdTemp, {
                fixedUser: fixedUserTemp,
                creator: creatorTemp
            });
            var itemsLenTemp = itemsTemp.length - 1;
            var issueTitle = $(".issueCode").html(),
                proTitle = $(".pjTitle").html().replace(/\s/g, ""),
                issueSum = $("#summary").html(),
                bp = $(".bp").html().replace(/\s|-/g, ""),
                proName = $(".proName").html();
            var html = [],
                defaultOps = {
                    isListOperation: false,
                    issueId: issueIdTemp || undefined,
                    issueStatus: statusTemp || undefined,
                    securityLevel: securityLevel || undefined,
                    fixedUser: fixedUserTemp || undefined,
                    pName: proTitle || undefined,
                    pDesc: issueSum || undefined,
                    proName: proName || undefined,
                    //processInstanceId: processInstanceId || undefined,
                    bp: bp
                };
            for (var i = 0; i <= itemsLenTemp; i++) {
                var item = itemsTemp[i];
                $.extend(defaultOps, {
                    url: item.url || undefined,
                    code: item.code || undefined,
                });
                html[i] = '<a class="btn btn-default status_click" data-title="' + issueTitle + '" data-options=\'' + JSON.stringify(defaultOps) + '\'>' + item.text + '</a>';
            }
            $("#btn-operation-group").html(html.join(""));
        },
        _roles: localStorage.getItem("roles"),

        isManager: function() {
            var roles = this._roles;
            var isManager = false;
            if (roles) {
                var roles = roles.split(",");
                $.each(roles, function(i, v) {
                    if (v.indexOf("dtms-developManager") != -1 || v.indexOf("dtms-testManager") != -1) {
                        isManager = true;
                    }
                });
            }
            return isManager;
        },
        isTest: function() {
            var roles = this._roles;
            var isTest = false;
            if (roles) {
                var roles = roles.split(",");
                $.each(roles, function(i, v) {
                    if (v.toLowerCase().indexOf("test") != -1) {
                        isTest = true;
                        return false;
                    }
                });
            }
            return isTest;
        },
        getIssueSeverityFontColor: function(level) {
            return this._issueSeverityFontColor[level];
        },

        getIssueStatusBackground: function(status) {
            if (status === 'NEW') {
                return this._issueStatusBackground[status];
            }

            return "status label " + this._issueStatusBackground[status] + " font-sm";
        },

        select2InitValue: {
            status: [{
                "id": "NEW",
                "text": i18nRes.issue.issueStatus.NEW
            }, {
                "id": "OPEN",
                "text": i18nRes.issue.issueStatus.OPEN
            }, {
                "id": "SUSPEND",
                "text": i18nRes.issue.issueStatus.SUSPEND
            }, {
                "id": "FIXED",
                "text": i18nRes.issue.issueStatus.FIXED
            }, {
                "id": "VALIDATED",
                "text": i18nRes.issue.issueStatus.VALIDATED
            }, {
                "id": "DISPUTABLE",
                "text": i18nRes.issue.issueStatus.DISPUTABLE
            }, {
                "id": "REOPEN",
                "text": i18nRes.issue.issueStatus.REOPEN
            }, {
                "id": "REJECT",
                "text": i18nRes.issue.issueStatus.REJECT
            }, {
                "id": "CLOSED",
                "text": i18nRes.issue.issueStatus.CLOSED
            }, {
                "id": "DRAFT",
                "text": i18nRes.issue.issueStatus.DRAFT
            }],

            severity: [{
                "id": "DEADLY",
                "text": i18nRes.issue.issueSeverity.DEADLY
            }, {
                "id": "SERIOUS",
                "text": i18nRes.issue.issueSeverity.SERIOUS
            }, {
                "id": "COMMON",
                "text": i18nRes.issue.issueSeverity.COMMON
            }, {
                "id": "SLIGHT",
                "text": i18nRes.issue.issueSeverity.SLIGHT
            }],

            priority: [{
                "id": "CRITICAL",
                "text": i18nRes.issue.issuePriority.CRITICAL
            }, {
                "id": "MAJOR",
                "text": i18nRes.issue.issuePriority.MAJOR
            }, {
                "id": "MINOR",
                "text": i18nRes.issue.issuePriority.MINOR
            }, {
                "id": "TRIVIAL",
                "text": i18nRes.issue.issuePriority.TRIVIAL
            }],

            security: [{
                "id": "TOP",
                "text": i18nRes.issue.issueSecurity.TOP
            }, {
                "id": "NORMAL",
                "text": i18nRes.issue.issueSecurity.NORMAL
            }, {
                "id": "PUBLIC",
                "text": i18nRes.issue.issueSecurity.PUBLIC
            }],

            securityLevel: function(self) {
                return self.select2InitValue.security;
            },

            labelType: [{
                    "id": "CHECKBOX",
                    "text": "复选框"
                }, {
                    "id": "RADIOBOX",
                    "text": "单选按钮"
                },
                {
                    "id": "SELECTOR",
                    "text": "下拉框"
                }
            ]
        },
        // 初始化需要远程搜索功能的select2插件，主要针对input[data-url]元素
        initRemoteSearchSelector: function() {
            var that = this;
            $("input[data-url]:not('.ignored')").each(function(i, v) {
                var $selector = $(this);
                var options = $selector.data("options"),
                    params = {};
                for (var k in options) {
                    params[options[k]] = $selector.data(k);
                }
                that._getRemoteItems($selector.data("url"), $selector, params);
            });
        },

        _getRemoteItems: function(url, $select2Container, extraParams) {
            $select2Container.select2($.extend({
                allowClear: true,
                width: "100%",
                multiple: true,
                minimumInputLength: 1,
                query: function(options) {
                    var realParams = {};
                    $.extend(realParams, {
                        pageSize: 5,
                        pageNum: options.page
                    }); // 默认每次显示5条记录

                    for (var k in extraParams) {
                        if (extraParams.hasOwnProperty(k)) {
                            realParams[k] = (extraParams[k] || options.term);
                        }
                    }

                    $.ajax({
                        global: false,
                        url: url,
                        dataType: "json",
                        type: "POST",
                        data: realParams,
                        quietMillis: 300,

                        success: function(data) { // data format:
													// {"results":[{"id":"developer1","text":"developer1"}]}
                            checkResult(data, {
                                showBox: false,
                                callback: function() {
                                    options.callback(data.json);
                                }
                            });
                        }
                    });
                },
                dropdownCssClass: "bigdrop"
            }, {
                multiple: !$select2Container.data("single") ? true : false
            }, {
                minimumInputLength: $select2Container.data("minLimit") === false ? "" : 1
            }, {
                createSearchChoice: $select2Container.data("createsearchchoice") ? function(term, data) { // term为输入关键字，data为搜索总数据
                    var choice = {
                        id: 0, // 约定，0代表创建新的标签组
                        text: term
                    };
                    $.each(data, function(i, v) {
                        if (term == v.text) {
                            choice = {
                                id: null,
                                text: term
                            };
                            return false;
                        }
                    });
                    return choice;
                } : null
            })).on("select2-selected", function(e) {
                $(this).data("selectedtext", e.choice.text);
            });
        },

        // 初始化数据源非来自远程的select2插件，主要针对input[data-url]元素
        initLocalSearchSelector: function($select2Container, datas, disabled) { // items为数组，下拉列表项
            datas = (datas instanceof Array || datas instanceof Object ? datas : (typeof this.select2InitValue[datas] === "function" ? this.select2InitValue[datas](this) : this.select2InitValue[datas]));
            $select2Container.select2($.extend({
                width: "100%",
                multiple: true,
                data: datas // data format:
							// [{"id":"developer1","text":"developer1"}]
            }, {
                multiple: !$select2Container.data("single") ? true : false
            }, {
                width: $select2Container.data("width") || "100%"
            }, {
                initSelection: ($select2Container.data("initialize") ?
                    function($element, callback) {
                        var initVals = [];
                        $.each($element.val().split(","), function(i, v) {
                            $.each(datas, function(i, obj) {
                                if (obj.id == v) {
                                    initVals.push(obj);
                                    return false;
                                }
                            });
                        });
                        callback(initVals);
                    } : null)
            }, {
                allowClear: $select2Container.data("clear") ? true : false
            }, {
                formatSelection: function(object, container) {
                    var html = "";
                    if ("disabled" in object) {
                        if (object.disabled) {
                            html =  "<strike>" + object.text + "</strike>";
                            if ($select2Container.data("single")) {
                                container.css("background-color", "#959EA6");
                            } else {
                                container.parent().css("background-color", "#959EA6");
                            }
                        } else {
                            html = object.text;
                        }
                    } else {
                        html = object.text
                    }
                    return html;
                }
            })).select2("enable", disabled ? false : true);    // .select2("enable", $select2Container.data("isactived"))

            if ($select2Container.data("select")) { // 设定默认选中值
                $select2Container.select2("val", $select2Container.data("select"));
            }
        },

        initSelect2Component: function() {
            issueCommon.initRemoteSearchSelector(); // 初始化简单搜索部分select2插件，主要针对input[data-url]元素
            $.each($("input[data-src=local]"), function(i, v) {
                var $that = $(this);
                issueCommon.initLocalSearchSelector($that, $that.attr("name"));
            });
        },
        // 设置Datatable的分页与查询
        setDatatableData: function(params) {
            var customParams = {
                    draw: params.draw, // draw, avoid to be attacted
                    pageSize: params.length, // pageSize
                    startIndex: params.start // startIndex to retrieve in database
                },
                that = this,
                conditionPrefix = that._const.conditionPrefix;
            console.log(customParams);
            $.extend(customParams, params.order[0] ? {colIndex: params.order[0].column,
                dir: params.order[0].dir} : undefined);

            customParams[conditionPrefix + "type"] = $("#query-Type").val();
            customParams[conditionPrefix + "beanString"] = $.search_issue_labelIds;
            customParams[conditionPrefix + "exactly"] = $.search_issue_isExact;

            if ($("#query-mode").val() === that._const.searchType.simple) {
                var $selected = $("#issue-condition-selector > li.active > a"),
                    selectedComponentName = $selected.data("lastValue"),
                    inputValue = $.trim($("input[name=" + selectedComponentName + "]").val());

                if (inputValue) {
                    if ($selected.data("multi")) {
                        customParams[conditionPrefix + selectedComponentName] = common.splitStr(inputValue); // 下拉框处理
                    } else {
                        customParams[conditionPrefix + selectedComponentName] = inputValue;
                    }
                }
            } else if ($("#query-mode").val() === that._const.searchType.combination) {
                $("input[data-moda]").each(function(i, dom) {
                    var inputValue = $.trim($(this).val());

                    if (inputValue) {
                        if ($(this).is(":hidden")) {
                            customParams[conditionPrefix + $(this).attr("name")] = common.splitStr(inputValue);
                        } else {
                            customParams[conditionPrefix + $(this).attr("name")] = inputValue; // 文本域处理
                        }
                    }
                });
            }

            return customParams;
        },
        // 刷新列表
        refreshDataTable: function(urlTemp) {
            var url = $.findIssuesbyCondition;

            if (urlTemp != null) {
                url = urlTemp;
            }
            var isCard = $("#card-tab-r1").hasClass("active");
            var isSys = $("#sys-tab-r2").hasClass("active");
            var isWhite = $("#white-tab-r3").hasClass("active");
            if (isCard || isSys || isWhite) {
                 url = $.searchIssuesByCondition;
            }

            $('#dt_issues').on('preXhr.dt', function(e, settings, data) {
                if (isCard) {
                    data["issueQueryCondition.beanString"] = $.search_global_issue_card_labelIds;
                    // data["issueQueryCondition.type"] = "card";
                    data["issueQueryCondition.exactly"] = $.search_global_issue_card_isExact;
                } else if (isSys) {
                    data["issueQueryCondition.beanString"] = $.search_global_issue_sys_labelIds;
                    // data["issueQueryCondition.type"] = "system";
                    data["issueQueryCondition.exactly"] = $.search_global_issue_sys_isExact;
                } else if (isWhite) {
                    data["issueQueryCondition.beanString"] = $.search_global_issue_white_labelIds;
                    // data["issueQueryCondition.type"] = "whitebox";
                    data["issueQueryCondition.exactly"] = $.search_global_issue_white_isExact;
                } else {
                    if ($.search_issue_labelIds) {
                        data["issueQueryCondition.beanString"] = $.search_issue_labelIds;
                        data["issueQueryCondition.exactly"] = $.search_issue_isExact;
                    }
                }
            }).DataTable().ajax.url(url).load(function(json) {

                $('#top_totalCount,#bottom_totalCount').html(json.recordsFiltered);
                $('#top_usedSeconds').html(json.usedSeconds);
            }); // 重绘datatable，再次触发ajax请求

        },

        // 绑定查询事件
        bindingSearchEvent: function() {
            var that = this;

            // 绑定简单搜索左边部分的按钮操作
            $("#issue-condition-selector").on("click", "a", function(e) {
                var $that = $(this),
                    name = $that.data("lastValue"),
                    $form = $that.closest("form"),
                    $input = $form.find("input[name=" + name + "]");

                if ($input.hasClass("hidden")) {
                    $input.removeClass("hidden").siblings("input").addClass("hidden");
                }

                if (!$that.parent().hasClass("active")) {
                    $that.closest("div").find("span:first").html($(this).html());
                    $(this).prepend('<i class="fa fa-check"></i>').parent().addClass("active").siblings().removeClass("active").find("i").remove();
                }
            });

            // 绑定高级和基本按钮事件
            $('#btn-show-more-search, #btn-show-simple-search').click(function(e) {
                $('#more-search').toggle();
                $('#simple-search').toggle();
                $("#query-mode").val($(this).data("searchMode"));
            });

            // 绑定搜索按钮事件
            $("#btn-simple-search, #btn-combination-search").click(function(e) {
                that.refreshDataTable();
            });

            // 绑定表单按下enter响应事件
            $("#simple-search-form").find("input[data-keyup='true']").keyup(function(e) {
                if (e.which === 13) { // when click the Enter
                    that.refreshDataTable();
                }
            });

            var searchKey = $.trim($(".searchKey").val());
            if (searchKey != "") { // 从主页点击查看信息触发
                $("#issue-condition-selector").find("a[data-last-value=" + searchKey + "]").click();
                $("#simple-search-form").find("input[name=" + searchKey + "]").val($(".searchValue").val());
            }

            $("#btn-global-search").click(function() {
                that.refreshDataTable($.searchIssuesByCondition);
            });

            // 绑定表单按下enter响应事件
            $("#global-search-form").find("input[data-keyup='true']").keyup(function(e) {
                if (e.which === 13) { // when click the Enter
                    that.refreshDataTable($.searchIssuesByCondition);
                }
            });

            $("#dt_issues > tbody").on("dblclick", "tr", function(e) {
            	var url = $(this).find("td").eq(0).children().attr("href");
            	if (url) {
            		//location.href = url;
            		window.open(url);
            	}
            });
        },

        // 编辑页面的关注操作
        _watchOperation: function() {
            var url = $.url_root + '/issue/createOrUpdateWatcher.jspa';

            $(".btn-unfocus").on("click", function(e) {
                var $self = $(this);
                $.ajax({
                    url: url,
                    type: "post",
                    dataType: "json",
                    data: {
                        "issueDTO.issueId": $("#issueId").val()
                    },
                    success: function(result) {
                        checkResult(result, {
                            message: "取消关注成功",
                            callback: function() {
                                $self.css("display", "none").next("i").css("display", "");
                                var totalWatchers = result.issueDTO.totalWatchers;
                                if (!totalWatchers)
                                    $(".totalWatchers").html(0);
                                else
                                    $(".totalWatchers").html(totalWatchers);
                                $(".watchBanner").html("关注");
                            }
                        });
                    }
                });
            });

            $(".btn-focus").on("click", function(e) {
                var $self = $(this);
                $.ajax({
                    url: url,
                    type: "post",
                    dataType: "json",
                    data: {
                        "issueDTO.issueId": $("#issueId").val()
                    },

                    success: function(result) {
                        checkResult(result, {
                            message: "关注成功",

                            callback: function() {
                                var totalWatchers = result.issueDTO.totalWatchers;
                                $self.css("display", "none").prev("i").css("display", "");

                                if (!totalWatchers) {
                                    $(".totalWatchers").html(0);
                                } else {
                                    $(".totalWatchers").html(totalWatchers);
                                }

                                $(".watchBanner").html("取消关注");
                            }
                        });
                    }
                });
            });
        },

        // 添加验证
        _initDialogValidate: function() {
            var form = $(".approve-dialog").validate({
                // onsubmit: false,
                ignore: ":not('.required-validation')", // 指定验证时要忽略哪些元素，默认是hidden，支持jQuery的伪类选择器，需要为应用该验证器的元素加上.required-validation
                errorElement: "strong",
                errorClass: "note_error text-danger",
                focusCleanup: true,
                focusInvalid: false,
                rules: {
                    "modal_receiver": {
                        required: true
                    },
                    "issueRemark": {
                        maxlength: 2048
                    },
                    "issueRemark1": {
                        maxlength: 2048
                    },
                    "basicPoint": {
                        maxlength: 30
                    }
                },
                messages: {
                    "modal_receiver": {
                        required: validation.issue.repairerCannotEmpty
                    },
                    "issueRemark": {
                        maxlength: "字段最大允许2048个字符"
                    },
                    "issueRemark1": {
                        maxlength: "字段最大允许2048个字符"
                    },
                    "basicPoint": {
                        maxlength: "字段最大允许30个字符"
                    }
                },

                highlight: function(element, errorClass) {
                    $(element).parent().addClass("has-error");
                },

                unhighlight: function(element, errorClass) {
                    $(element).parent().removeClass("has-error");
                }
            });
            return form;
        },

        _initCommentValidation: function() {
            var form = $(".other-dialog").validate({
                // onsubmit: false,
                ignore: ":not('.required-validation')", // 指定验证时要忽略哪些元素，默认是hidden，支持jQuery的伪类选择器，需要为应用该验证器的元素加上.required-validation
                errorElement: "strong",
                errorClass: "note_error text-danger",
                focusCleanup: true,
                focusInvalid: false,
                rules: {
                    "issueRemarks": {
                        required: true,
                        maxlength: 2048
                    }
                },
                messages: {
                    "issueRemarks": {
                        required: validation.comment.cannotEmpty,
                        maxlength: "字段最大允许2048个字符"
                    }
                },

                highlight: function(element, errorClass) {
                    $(element).parent().addClass("has-error");
                },

                unhighlight: function(element, errorClass) {
                    $(element).parent().removeClass("has-error");
                }
            });
            return form;
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

        submitDraftToJBPM: function(url, datas) {
            var dialog;
            if (!$("#JBPMDialog").length) {
                    dialog = '<div class="modal" id="JBPMDialog" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-show="true">' +
                             '<div class="modal-dialog" style="margin-top: 150px;">' +
                             '<div class="modal-content">' +
                             '<div class="modal-header assign-dialog-heading">' +
                             '<h4 class="modal-title" id="myModalLabel">提交缺陷<strong><span class="title"></span></strong></h4>' +
                             '</div>' +
                             '<div class="modal-body">' +
                             // panel
                             '<div class="panel panel-default pInfo">' +
                             '<div class="panel-body">' +
                             // project infos modules
                             '<div class="row">' +
                             '<div class="col-lg-12">' +
                             '<label><strong>项目名称：</strong></label>' +
                             '<div class="pName break-all" style="display: inline;">' +
                             '</div>' +
                             '</div>' +
                             '<div class="col-lg-12">' +
                             '<label><strong>缺陷概要：</strong></label>' +
                             '<div class="pDesc break-all">' +
                             '</div>' +
                             '</div>' +
                             '</div>' +
                             // ###############
                             '</div>' +
                             '</div>' +
                             // panel end
                             '<form class="form-horizontal" role="form">' +
                             '<div class="form-group form-group-sm">' +
                             '<label class="col-sm-2 control-label">审核负责人</label>' +
                             '<div class="col-sm-10">' +
                             '<input class="gApprover" type="hidden" data-single="true" style="width: 100%;" data-placeholder="审核负责人">' +
                             '</div>' +
                             '</div>' +
                             '</form>' +
                             '</div>' +
                             '<div class="modal-footer buttons-container">' +
                             '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>' +
                             '<button type="button" class="btn btn-primary btn-submit" data-dismiss="modal" data-url="subIssue.jspa">确认</button>' +
                             '<input type="hidden" class="iid" value="">' +
                             '</div>' +
                             '</div>' +
                             '</div>' +
                             '</div>';
                $(dialog).appendTo($(".jbpmDialogCont"));
                $(".gApprover").select2({
                    allowClear: true,
                    width: "100%",
                    ajax: {
                        url: $.url_root + "/user/findUsersByManagerRole.jspa",
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
                        var html = " " + realName;
                        html += (object.id ?  " [ " + object.id + " ]" : "");
                        return html;
                    },

                    dropdownCssClass: "bigdrop",

                    escapeMarkup: function(m) {
                        return m;
                    }

                });
            }
            this._setDialogInfo("JBPMDialog", {
                title: datas.title,
                pName: datas.pName,
                pDesc: datas.pDesc
            });

            $("#JBPMDialog").find(".iid").val(datas.issueId);

            $("#JBPMDialog").modal("show");
        },

        // 页面上显示已选中的标签
        fillSelectedLabelInPanel: function(label) {
            var html = "<i id='" + label.id + "'>" + label.text + "</i>",
                comma = "<span>，</span>",
                $container = $("#selected-label-placeholder");
            if ($container.html().length > 0) {
                html = comma + html;
            }
            $container.append($(html));
        },

        removeSelectedLabelFromPanel: function(labelId) {
            var $removelabel = $("#" + labelId),
                $nextSpan = $removelabel.next(),
                $prevSpan = $removelabel.prev();
            if ($removelabel.is(":last-child")) {
                $prevSpan.remove();
            } else {
                $nextSpan.remove();
            }
            $removelabel.remove();
        },

        removeAllSelectedLabelFromPanel: function() {
            $("#selected-label-placeholder").empty();
        }
    };
}(jQuery));
