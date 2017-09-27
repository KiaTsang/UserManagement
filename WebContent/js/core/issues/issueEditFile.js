/**
 * FileName: issueEditFile.js
 *
 * File description goes here.
 *
 * Copyright (c) 2010 Asiasoft, Inc. All Rights Reserved.
 *
 * @author <a href="mailto:bingke.cai@iaspec.net">Terrence.Cai</a>
 * @Version: 1.0.0
 * @DateTime: 2014-09-23
 */

var issueEditFile = function() {
    return {
        //文件上传和删除
        initFileUploadAndDelete: function() {
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
