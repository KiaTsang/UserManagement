/**
 * FileName: userProfile.js
 *
 * File description goes here.
 *
 * Copyright (c) 2014 Iaspec, Inc. All Rights Reserved.
 *
 * @author <a href="mailto:qiqu.huang@iaspec.net">Charlie.Huang</a>
 * @Version: 1.0.0
 * @DateTime: 2014-09-16
 */

var profile = (function() {
    return {
        _operationHistoryPageNumber: -1,
        // 初始化动作
        initialize: function() {
            this.initComponentEvent();
            this.loadPersonalOperationHistory();
            this.loadCommentForCurrentUser();
            this.initEditableForOthers();
            this.initFileUpload();
        },

        // 绑定事件
        initComponentEvent: function() {
            var self = this;
            var sourceText = "";
            $(".btn-edit").on("click", function(e) {
                if (!$("#user-description").find(".note-editor").length) {
                    self.renderDescriptionOfUser();
                    sourceText = $(".summernote").code();
                    $(".btnGroup").toggle(500);
                    e.stopPropagation();
                }
            });

            $(".btn-cancel").on("click", function(e) {
                $(".summernote").code(sourceText);
                $(".summernote").destroy();
                $(".btnGroup").toggle(500);
                e.stopPropagation();
            });

            $(".btn-save").on("click", function(e) {
                var content = $(".summernote").code();
                $.ajax({
                    url: $.url_root + "/updateUser.jspa",
                    type: "POST",
                    dataType: "json",
                    data: {
                        "userDTO.description": content,
                        "userDTO.name": $("#userName").val(),
                    	"userDTO.isOnlyUpdateEipdUser" : true,
                        "userDTO.userId": $("#userId").val()
                    },
                    success: function(result) {
                        checkResult(result, {
                        	message: tipMessage.update_success,
                            showBox: true,
                            callback: function() {
                                $(".summernote").destroy();
                                $(".btnGroup").toggle(500);
                            }
                        });
                    }
                });
                e.stopPropagation();
            });

            $(".profile-message").on("click", ".action-delete", function(e) {
                var $that = $(this);
                $.ajax({
                    url: $.url_root + "/issue/deleteIssueComment.jspa",
                    type: "POST",
                    dataType: "json",
                    data: {
                        "commentId": $that.data("commentId")
                    },
                    success: function(data) {
                        checkResult(data, {
                            message: "<span style='font-size: 17px;'>删除评论成功！</span>",
                            callback: function() {
                                // $that.closest(".message").parent("ul").remove();
                                self.loadCommentForCurrentUser();
                            }
                        });
                    }
                });
                e.stopPropagation();
            });

            $(".profile-message").on("keyup", ".issueReplyContent", function(e) {
                if ($.trim($(this).val())) {
                    $(this).next().children("button").removeClass("disabled");
                } else {
                    $(this).next().children("button").addClass("disabled")
                }
                e.stopPropagation();
            });

            $(".profile-message").on("click", ".btn-chat", function(e) {
                var $sibling = $(this).prev(),
                    $inputContent = $sibling.closest("span").prev('input');

                $.ajax({
                    url: $.url_root + "/issue/createIssueComment.jspa",
                    type: "POST",
                    dataType: "json",
                    data: {
                        "commentDTO.commentBody": $inputContent.val(),
                        "commentDTO.issueId": $sibling.data("issueId"),
                        "commentDTO.parentCommentId": $sibling.data("parentId")
                    },

                    beforeSend: function() {
                        $("#a1").children(".profile-message").addClass("widget-body-ajax-loading");
                    },

                    complete: function() {
                        $("#a1").children(".profile-message").removeClass("widget-body-ajax-loading");
                    },

                    success: function(data) {
                        checkResult(data, {
                            showBox: false,
                            callback: function() {
                                data = data.commentDTO;
                                var html = '<li class="message message-reply">' + '<img src="' + $.url_root + data.userLogoPath + '"style="width: 50px; height: 50px;" class="online">' + '<span class="message-text"> <a href="javascript:void(0);" class="username">' + data.creator + '</a>' + data.commentBody + '</span>' + '<ul class="list-inline font-xs">' + '<li>' + '<span class="text-muted">' + data.createTime + '</span>' + '</li>' + '</ul>' + '</li>'
                                $sibling.closest("li").before($(html));
                                $inputContent.val("").next().children("button").addClass("disabled");
                            }
                        });
                    }
                });
            });

            $("#historyWrapper").on("click", ".btn-load-more", function(e) {
                if (!($(this).children().attr("disabled"))) {
                    self.loadPersonalOperationHistory(self._operationHistoryPageNumber + 1);
                }
                e.stopPropagation();
            });
            
            $(".logoPathImg").on("click",function(e){
            	$('#file-upload').click();
            });
        },
        
        initFileUpload:function()
		{
		     $('#file-upload').fileupload({
		            url:$.url_root+'/updateUserLogo.jspa',
		            dataType: 'json',
		            autoUpload: true,
		            maxFileSize: 1048576,// <1 MB  
		    	    acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
		            formData:{
		     			"userDTO.name":$("#userName").val()
		            	}
		        }).on('fileuploadprocessalways', function (e, data) {
		            if(data.files.error){
		                $('#imageError').find("label").empty();
		                if(data.files[0].error=="File is too large"){
		                   $.smallBox({
		                        title: "最大上传文件大小为 1.00 MB！",
		                        content: "",
		                        color: $boxColors.red,
		                        iconSmall: "fa fa-times",
		                        timeout: 2000
		                    });
		                }
		                if(data.files[0].error=="File type not allowed"){
		                    $.smallBox({
		                        title: "上传文件类型不对！",
		                        content: "",
		                        color: $boxColors.red,
		                        iconSmall: "fa fa-times",
		                        timeout: 2000
		                    });
		                }
		            }
		        }).on('fileuploaddone',function (e, data) {
		        	var result=data.result;
		        	checkResult(result, {
		        		message : "头像上传成功！",
	    				showBox : true,
						callback: function() {
							var logoPath=$.url_root+result.userDTO.logoPath;
							$(".logoPathImg").attr('src',logoPath);
							$(".histotyLogoPath").attr('src',logoPath);
							$("#topLogoPath").attr('src',logoPath);
							localStorage.setItem("topLogoPath",logoPath);
							profile.loadCommentForCurrentUser();
						}
					});
		        });
		},

        // 加载评论
        loadCommentForCurrentUser: function() {
            $.ajax({
                url: $.url_root + "/loadComments.jspa",
                type: "post",
                datatype: "json",

                beforeSend: function() {
                    $("#a1").children(".profile-message").addClass("widget-body-ajax-loading");
                },

                complete: function() {
                    $("#a1").children(".profile-message").removeClass("widget-body-ajax-loading");
                },

                success: function(result) {
                    checkResult(result, {
                        showBox: false,

                        callback: function() {
                            $(".profile-message").eq(1).html(result.result);

                            $(".profile-message").find(".btn-chat").each(function(i, v) {
                                $(this).addClass("disabled");
                            });
                        }
                    });
                }
            });
        },

        // 加载历史记录
        loadPersonalOperationHistory: function(pageNumber) {
            var self = this;
            $.ajax({
                url: $.url_root + "/loadOperationHistory.jspa",
                type: "post",
                datatype: "json",
                data: {
                    pageNumber: pageNumber
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
                            var html = result.result;
                            if (result.totalPage) {
                                $(".btn-load-more").before(i18n.translateTemplate2I18n(result.result));
                                if (result.pageNumber == result.totalPage) {
                                    $(".btn-load-more").children().attr("disabled", true);
                                    $("#load-more-banner").html("已经最后了");
                                } else {
                                    self._operationHistoryPageNumber = result.pageNumber;
                                }
                            } else {
                                $(".btn-load-more").css("display", "none");
                                $(".no-history-info").empty().append(i18n.translateTemplate2I18n(result.result));
                            }
                        }
                    });
                }
            });
        },

        // 渲染富文本框
        renderDescriptionOfUser: function() {
            $(".summernote").summernote($.extend(Eipd.namespace("config").summernote,
                {toolbar: [
                      ['style', ['style']],
                      ['font', ['bold', 'italic', 'underline', 'clear']],
                      ['fontsize', ['fontsize']],
                      ['color', ['color']]
                ]}));
        },

        //处理修改实际名字,邮箱
        initEditableForOthers: function() {
            $.fn.editable.defaults.mode = 'inline';
            $.fn.editable.defaults.url = $.url_root + '/updateUser.jspa';
            $.fn.editableContainer.defaults.onblur = "submit";
            $.fn.editable.defaults.emptytext = "---";
            $.fn.editable.defaults.ajaxOptions = {
                error: function(xhr, textStatus, errorThrown) {
                    showOperationError(xhr, textStatus, errorThrown);
                }
            };

            $("a[data-type='text']").editable({
                params: function(params) {
                    var customParams = {};
                    customParams["userDTO.userId"] = $("#userId").val();
                    customParams["userDTO.name"] = $("#userName").val();
                    customParams[params.name] = params.value;
                    return customParams;
                },
                validate : function(params){
            		if($(this).hasClass("realName")){
            			if($.trim(params) == ''){
            				return "名称不能为空";
            			}
            		}
				},

                success: function(response, newValue) {
            		checkResult(response, {
						message: tipMessage.update_success,
						showBox: true
					});
                }
            });
        },
    };
}());
