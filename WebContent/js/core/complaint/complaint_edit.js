/**
 * FileName: complaint.js
 *
 * File description goes here.
 *
 * Copyright (c) 2010 Asiasoft, Inc. All Rights Reserved.
 *
 * @author <a href="mailto:bingke.cai@iaspec.net">Terrence.Cai</a>
 * @Version: 1.0.0
 * @DateTime: 2014-06-27
 */

var complaintEdit = function() {
    var url = $.url_root + "/complaint/updateComplaint.jspa";
    var complaintId = $('#complaintId').val();
    return {
        _summernoteStart: function() {
            var obj = {};
            var sourceText = "";
            var param = "";
            //故障简介
            $(".btn-edit-complaint-summary").on("click", function(e) {
                $(this).addClass("disabled");
                initSummernote($(".summernoteSummary"));
                sourceText = $(".summernoteSummary").code();
                $(".btn-summary").show();
            });

            $("#btnCancelSummary").on("click", function(e) {
                $(".summernoteSummary").code(sourceText);
                $(".summernoteSummary").destroy();
                $(".btn-summary").hide();
                $(".btn-edit-complaint-summary").removeClass("disabled");
            });

            $("#btnSaveSummary").on("click", function(e) {
                if(!lockItms($('#btnSaveSummary').get(0))) {
                	return;
                }
                var htmlContent = $(".summernoteSummary").code();
                complaintEdit.saveSummerNote_summary(htmlContent);
                $(".summernoteSummary").destroy();
                $(".btn-summary").hide();
                $(".btn-edit-complaint-summary").removeClass("disabled");
            });

            //故障描述
            $(".btn-edit-complaint-desc").on("click", function(e) {
                $(this).addClass("disabled");
                initSummernote($(".summernoteDesc"));
                sourceText = $(".summernoteDesc").code();
                $(".btn-desc").show();
            });

            $("#btnCancelDesc").on("click", function(e) {
                $(".summernoteDesc").code(sourceText);
                $(".summernoteDesc").destroy();
                $(".btn-desc").hide();
                $(".btn-edit-complaint-desc").removeClass("disabled");
            });

            $("#btnSaveDesc").on("click", function(e) {
            	if(!lockItms($('#btnSaveDesc').get(0))) {
                	return;
                }
                var htmlContent = $(".summernoteDesc").code();
                complaintEdit.saveSummerNote_desc(htmlContent);
                $(".summernoteDesc").destroy();
                $(".btn-desc").hide();
                $(".btn-edit-complaint-desc").removeClass("disabled");
            });

            //原因分析
            $(".btn-edit-complaint-analysis").on("click", function(e) {
                $(this).addClass("disabled");
                initSummernote($(".summernoteAnalysis"));
                sourceText = $(".summernoteAnalysis").code();
                $(".btn-analysis").show();
            });

            $("#btnCancelAnalysis").on("click", function(e) {
                $(".summernoteAnalysis").code(sourceText);
                $(".summernoteAnalysis").destroy();
                $(".btn-analysis").hide();
                $(".btn-edit-complaint-analysis").removeClass("disabled");
            });

            $("#btnSaveAnalysis").on("click", function(e) {
            	if(!lockItms($('#btnSaveAnalysis').get(0))) {
                	return;
                }
                var htmlContent = $(".summernoteAnalysis").code();
                complaintEdit.saveSummerNote_analysis(htmlContent);
                $(".summernoteAnalysis").destroy();
                $(".btn-analysis").hide();
                $(".btn-edit-complaint-analysis").removeClass("disabled");
            });

            //处理方案
            $(".btn-edit-complaint-scheme").on("click", function(e) {
                $(this).addClass("disabled");
                initSummernote($(".summernoteScheme"));
                complaintEdit.sourceText = $(".summernoteScheme").code();
                $(".btn-scheme").show();
            });

            $("#btnCancelScheme").on("click", function(e) {
                $(".summernoteScheme").code(sourceText);
                $(".summernoteScheme").destroy();
                $(".btn-scheme").hide();
                $(".btn-edit-complaint-scheme").removeClass("disabled");
            });

            $("#btnSaveScheme").on("click", function(e) {
            	if(!lockItms($('#btnSaveScheme').get(0))) {
                	return;
                }
                var htmlContent = $(".summernoteScheme").code();
                complaintEdit.saveSummerNote_scheme(htmlContent);
                $(".summernoteScheme").destroy();
                $(".btn-scheme").hide();
                $(".btn-edit-complaint-scheme").removeClass("disabled");
            });
        },

        saveSummerNote_summary: function(content) {
            $.ajax({
                url: url,
                type: "POST",
                dataType: "json",
                data: {
                    "complaintDTO.faultSummary": content,
                    "complaintDTO.id": complaintId
                },
                success: function(result) {
                    checkResult(result, {
                        showBox: false
                    });
                    unlockItms($('#btnSaveSummary').get(0));
                }
            });
        },

        saveSummerNote_desc: function(content) {
            $.ajax({
                url: url,
                type: "POST",
                dataType: "json",
                data: {
                    "complaintDTO.faultDescption": content,
                    "complaintDTO.id": complaintId
                },
                success: function(result) {
                    checkResult(result, {
                        showBox: false
                    });
                    unlockItms($('#btnSaveDesc').get(0));
                }
            });
        },
        saveSummerNote_analysis: function(content) {
            $.ajax({
                url: url,
                type: "POST",
                dataType: "json",
                data: {
                    "complaintDTO.causeAnalysis": content,
                    "complaintDTO.id": complaintId
                },
                success: function(result) {
                    checkResult(result, {
                        showBox: false
                    });
                    unlockItms($('#btnSaveAnalysis').get(0));
                }
            });
        },
        saveSummerNote_scheme: function(content) {
            $.ajax({
                url: url,
                type: "POST",
                dataType: "json",
                data: {
                    "complaintDTO.disposeScheme": content,
                    "complaintDTO.id": complaintId
                },
                success: function(result) {
                    checkResult(result, {
                        showBox: false
                    });
                    unlockItms($('#btnSaveScheme').get(0));
                }
            });
        },
        _initDelete: function() {
            $('.deleteBtn').off('click').on('click', function(e) {
                //清除界面上现有弹出框
                clearSmallBox();
                var complaintId = $('#complaintId').val();
                console.log(complaintId);
                $.smallBox({
                    title: i18nRes.global.confirm.title,
                    content: i18nRes.complaint.deleteTips + "<p class='text-align-right'><a href='javascript:void(0);' onclick='complaintEdit.deleteComplaint(" + complaintId + ");' class='btn btn-danger btn-sm'>" + i18nRes.global.yes + "</a> <a href='javascript:void(0);'  class='btn btn-primary btn-sm'>" + i18nRes.global.no + "</a></p>",
                    color: "#296191",
                    icon: "fa fa-bell swing animated"
                });
                e.preventDefault();
            });
        },

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
                    window.location.href = $.url_root + "/complaint/complaint.jspa";
                },
                error: function(xhr, textStatus, errorThrown) {
                    showOperationError(xhr, textStatus, errorThrown);
                }
            });
        },

        //文件上传和删除
        _initFileUploadAndDelete: function() {
            $('#file-upload').fileupload({
                url: $.url_root + '/complaint/fileAttachementUpload.jspa',
                dataType: 'json',
                autoUpload: true,
                maxFileSize: 10000000, // <10 MB
                formData: {
                    "complaintId": complaintId
                }
            }).on('fileuploadprocessalways', function(e, data) {
                if (data.files.error) {
                    $('#imageError').find("label").empty();
                    if (data.files[0].error == "File is too large") {
                        $('#imageError').removeClass('hidden').find("label").append(tipMessage.max_file_size);
                    }
                    if (data.files[0].error == "File type not allowed") {
                        $('#imageError').removeClass('hidden').find("label").append(tipMessage.file_type);
                    }
                }
            }).on('fileuploaddone', function(e, data) {
                var file = data.result;
                checkResult(file, {
                    message: "<span style='font-size: 17px;'>" + tipMessage.file_add + "</span>",
                    callback: function() {
                        $('#imageError').addClass('hidden');
                        var url = file.url;
                        var date = new Date();
                        var createTime = date.getFullYear() + i18nRes.global.year + (date.getMonth() + 1) + i18nRes.global.month + date.getDate() + i18nRes.global.day + date.getHours() + ":" + date.getMinutes();
                        var fileContent = "<tr>" + "<td><a href='" + $.url_root + "/complaint/fileAttachementDownload.jspa?filePath=" + url + "&fileName=" + file.uploadFileName + "'>" + file.uploadFileName + "</a></td>" + "<td width='100'>" + file.size + " B</td>" + "<td width='160'>" + createTime + "</td>" + "<td width='20' ><a class='deletefile' data-filepath='" + url + "' data-fileattachementid='" + file.fileAttachementId + "' data-attachmentname='" + file.uploadFileName + "' href='javascript:void(0);'><i class='fa fa-trash-o'></i>" + "</a></td>" + "<input type='hidden' name='filePath' value='" + url + "'>" + "<input type='hidden' name='fileName' value='" + file.uploadFileName + "'>" + "<input type='hidden' name='mimeType' value='" + file.uploadContentType + "'>" + "</tr>";

                        $('#fileAttachements tbody').prepend(fileContent);
                    }
                });
            });
            //删除附件
            $('#fileAttachements').on("click", ".deletefile", function(e) {
            	
            	var $that = $(this);
                msgBox.showBox({
                    title: "删除附件" + "<strong>" + $that.data("attachmentname") + "</strong>",
                    color: "ERROR",
                     icon: "BELL",
                     content: "你即将删除该附件。<br>确认要删除吗? <p class='text-align-right'><a href='javascript:;' class='btn btn-danger btn-sm deleteAction'>是</a> <a href='javascript:;' class='btn btn-primary btn-sm'>否</a></p>",
                     target: ".deleteAction",
                     callback: function() {
                        $.ajax({
                            url:$.url_root+"/issue/deleteFileAttachement.jspa",
                            datatype:"json",
                            data:{
                                "filePath": $that.data("filepath"),
                                "fileAttachementId": $that.data("fileattachementid")
                            },
                            success :function(result)
                            {
                               checkResult(result, {
                                    message: "<span style='font-size: 17px;'>"+tipMessage.file_del+"</span>",
                                    callback: function() {
                                        $that.closest("tr").remove();
                                    }
                               });
                            }
                        });
                     }
                });
            });
        }
    };
}();
