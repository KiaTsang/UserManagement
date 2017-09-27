/**
 * FileName: issuesEditOutsideSpecific.js
 *
 * File description goes here.
 *
 * Copyright (c) 2010 Asiasoft, Inc. All Rights Reserved.
 *
 * @author <a href="mailto:bingke.cai@iaspec.net">Terrence.Cai</a>
 * @Version: 1.0.0
 * @DateTime: 2014-09-23
 */

var specificEdit = function() {
    return {
        //加载富文本编辑器
        _initSummernote: function(container) {
            container.summernote(Eipd.namespace("config").summernote);
        },
        //处理富文本编辑器动作
        _summernoteStart: function() {
            var sourceText = "";
            //缺陷描述
            $(".btn-edit-issue-desc").on("click", function(e) {
                $(this).addClass("disabled");
                specificEdit._initSummernote($(".summernote_desc"));
                sourceText = $(".summernote_desc").code();
                $(".btn-desc").show();
            });
            $("#btnCancelDesc").on("click", function(e) {
                $(".summernote_desc").code(sourceText);
                $(".summernote_desc").destroy();
                $(".btn-desc").hide();
                $(".btn-edit-issue-desc").removeClass("disabled");
            });

            $("#btnSaveDesc").on("click", function(e) {
                if(!lockItms($('#btnSaveDesc').get(0))) {
                	return;
                }
                var htmlContent = $(".summernote_desc").code();
                specificEdit.saveSummerNote_desc(htmlContent);
                $(".summernote_desc").destroy();
                $(".btn-desc").hide();
                $(".btn-edit-issue-desc").removeClass("disabled");
            });

            //缺陷分析
            $(".btn-edit-issue-analysis").on("click", function(e) {
                $(this).addClass("disabled");
                specificEdit._initSummernote($(".summernote_analysis"));
                sourceText = $(".summernote_analysis").code();
                $(".btn-desc-analysis").show();
            });

            $("#btnCancelAnalysis").on("click", function(e) {
                $(".summernote_analysis").code(sourceText);
                $(".summernote_analysis").destroy();
                $(".btn-desc-analysis").hide();
                $(".btn-edit-issue-analysis").removeClass("disabled");
            });

            $("#btnSaveAnalysis").on("click", function(e) {
                if(!lockItms($('#btnSaveAnalysis').get(0))) {
                	return;
                }
                var htmlContent = $(".summernote_analysis").code();
                specificEdit.saveSummerNote_analysis(htmlContent);
                $(".summernote_analysis").destroy();
                $(".btn-desc-analysis").hide();
                $(".btn-edit-issue-analysis").removeClass("disabled");
            });

            //解决方案

            $(".btn-edit-issue-solution").on("click", function(e) {
                $(this).addClass("disabled");
                specificEdit._initSummernote($(".summernote_solution"));
                sourceText = $(".summernote_solution").code();
                $(".btn-desc-solution").show();
            });

            $("#btnCancelSolution").on("click", function(e) {
                $(".summernote_solution").code(sourceText);
                $(".summernote_solution").destroy();
                $(".btn-desc-solution").hide();
                $(".btn-edit-issue-solution").removeClass("disabled");
            });

            $("#btnSaveSolution").on("click", function(e) {
                if(!lockItms($('#btnSaveSolution').get(0))) {
                	return;
                }
                var htmlContent = $(".summernote_solution").code();
                specificEdit.saveSummerNote_solution(htmlContent);
                $(".summernote_solution").destroy();
                $(".btn-desc-solution").hide();
                $(".btn-edit-issue-solution").removeClass("disabled");
            });

            //验证方案
            $(".btn-edit-issue-verification").on("click", function(e) {
                $(this).addClass("disabled");
                specificEdit._initSummernote($(".summernote_verification"));
                sourceText = $(".summernote_verification").code();
                $(".btn-desc-verification").show();
            });

            $("#btnCancelVerification").on("click", function(e) {
                $(".summernote_verification").code(sourceText);
                $(".summernote_verification").destroy();
                $(".btn-desc-verification").hide();
                $(".btn-edit-issue-verification").removeClass("disabled");
            });

            $("#btnSaveVerification").on("click", function(e) {
                if(!lockItms($('#btnSaveVerification').get(0))) {
                	return;
                }
                var htmlContent = $(".summernote_verification").code();
                specificEdit.saveSummerNote_verification(htmlContent);
                $(".summernote_verification").destroy();
                $(".btn-desc-verification").hide();
                $(".btn-edit-issue-verification").removeClass("disabled");
            });
        },

        //保存修改后的缺陷描述
        saveSummerNote_desc: function(content) {
            $.ajax({
                url: $.url_root + "/issue/updateOutsideIssue.jspa",
                type: "POST",
                dataType: "json",
                data: {
                    "outsiteTestIssueDTO.description": content,
                    "outsiteTestIssueDTO.issueId": $("#issueId").val()
                },
                success: function(result) {
                    checkResult(result, {
                        showBox: false
                    });
                    unlockItms($('#btnSaveDesc').get(0));
                }
            });
        },

        //保存修改后的方案分析
        saveSummerNote_analysis: function(content) {
            $.ajax({
                url: $.url_root + "/issue/updateOutsideIssue.jspa",
                type: "POST",
                dataType: "json",
                data: {
                    "outsiteTestIssueDTO.causeAnalysis": content,
                    "outsiteTestIssueDTO.issueId": $("#issueId").val()
                },
                success: function(result) {
                    checkResult(result, {
                        showBox: false
                    });
                    unlockItms($('#btnSaveAnalysis').get(0));
                }
            });
        },

        //保存修改后的解决方案
        saveSummerNote_solution: function(content) {
            $.ajax({
                url: $.url_root + "/issue/updateOutsideIssue.jspa",
                type: "POST",
                dataType: "json",
                data: {
                    "outsiteTestIssueDTO.solvedScheme": content,
                    "outsiteTestIssueDTO.issueId": $("#issueId").val()
                },
                success: function(result) {
                    checkResult(result, {
                        showBox: false
                    });
                    unlockItms($('#btnSaveSolution').get(0));
                }
            });
        },

        //保存修改后的验证方案
        saveSummerNote_verification: function(content) {
            $.ajax({
                url: $.url_root + "/issue/updateOutsideIssue.jspa",
                type: "POST",
                dataType: "json",
                data: {
                    "outsiteTestIssueDTO.validatedScheme": content,
                    "outsiteTestIssueDTO.issueId": $("#issueId").val()
                },
                success: function(result) {
                    checkResult(result, {
                        showBox: false
                    });
                    unlockItms($('#btnSaveVerification').get(0));
                }
            });
        },

        //文件上传和删除
        _initFileUploadAndDelete: function() {
            var issueId = $("#issueId").val();
            $('#file-upload').fileupload({
                url: $.url_root + '/issue/fileAttachementUpload.jspa',
                dataType: 'json',
                autoUpload: true,
                maxFileSize: 10000000, // <10 MB
                formData: {
                    "issueId": issueId
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
                        var createTime = date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日 " + date.getHours() + ":" + date.getMinutes();
                        var fileContent = "<tr>" + "<td><a href='" + $.url_root + "/issue/fileAttachementDownload.jspa?filePath=" + url + "&fileName=" + file.uploadFileName + "'>" + file.uploadFileName + "</a></td>" + "<td width='100'>" + file.size + " B</td>" + "<td width='160'>" + createTime + "</td>" + "<td width='20' ><a class='deletefile' data-filepath='" + url + "' data-fileattachementid='" + file.fileAttachementId + "' data-attachmentname='" + file.uploadFileName + "' href='javascript:void(0);'><i class='fa fa-trash-o'></i>" + "</a></td>" + "<input type='hidden' name='filePath' value='" + url + "'>" + "<input type='hidden' name='fileName' value='" + file.uploadFileName + "'>" + "<input type='hidden' name='mimeType' value=" + file.uploadContentType + ">" + "</tr>";

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
