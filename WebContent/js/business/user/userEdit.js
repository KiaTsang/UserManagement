/**
 * FileName: userEdit.js
 * File description: 用于加载和初始化自动化规则配置页面的组件及内容
 * Copyright (c) 2016 Eastcompeace, Inc. All Rights Reserved.
 *
 * @author <a href="mailto:zengqingyue@eastcompeace.com">zengqingyue</a>
 * @DateTime: 2016-10-18
 */

/**
 * userEdit所有属性和方法定义
 * @type {userEdit}
 */
var userEdit = function () {

    var handleSelect2 = function () {
        $("#taskStrategyId").select2({
            placeholder: "请选择或者输入一个项目名称",
            allowClear: true,
            maximumInputLength: 200,

            formatInputTooLong: function (input, max) {
                var n = input.length - max;
                return "项目名称过长，至多允许200个字符，" + "请删掉" + n + "个字符";
            },

            query: function(options) { //search
                var realParams = {
                    pageSize: 5,  //默认每次显示5条记录
                    pageNum: options.page,
                    "projectQueryCondition.type" : "card",
                    "projectQueryCondition.name" : options.term
                };

                var queryConditions = [];
                var putObj = [];
                var obj = {};
                obj.isLike = true;
                obj.isRaw = false;
                obj.isEntityField = false;
                obj.isCaseSensitive = false;
                obj.fieldName = "TEXT";
                obj.type = "string";
                obj.stringCondition = options.term;
                queryConditions.push(obj);

                putObj.push(StringUtil.decorateRequestData('List',queryConditions));
                putObj.push(StringUtil.decorateRequestData('Integer',(options.page-1)*5 + 1));
                putObj.push(StringUtil.decorateRequestData('Integer',5));

                var proxyObj = new Object();
                proxyObj.proxyClass = "fileController";
                proxyObj.proxyMethod = "getUsedTaskStrategyListByCondition";
                proxyObj.jsonString = MyJsonUtil.obj2str(putObj);

                $.ajax({
                    url : $.url_root + "/controllerProxy.do?method=callBack",
                    dataType : "json",
                    type: "POST",
                    data : proxyObj,

                    success : function(data) {
                        checkResult(data, {
                            showBox: false,
                            callback: function() {
                                options.callback(data.json);
                            }
                        });
                    }
                });
            }
        }).on('select2-selected', function(e) { //fire when selected the option
                console.log('select2-selected');
                var taskStrategyId = e.choice.id;
                $("#taskStrategyId").val(taskStrategyId);  // empty the value first
//                $("#create-issue-form").valid();
            }).on('select2-clearing', function(e) {
                $(".changed-form").find("input.changed").val("");
                validator.cleanValidation();
            });
    }

    var handleForm = function () {
        $("#create-issue-form").validate({
            // 指定验证时要忽略哪些元素，默认是hidden，支持jQuery的伪类选择器，需要为应用该验证器的元素加上.required-validation
            errorElement: "strong",
            ignore: ":not('.required-validation')",
            errorClass: "note_error text-danger",
            focusCleanup: true,
            focusInvalid: false,
            rules: {
                taskStrategyId: {
                    required: true
                }
            }, // Messages for form
            messages: {
                taskStrategyId:{
                    required:"策略不能为空！！！"
                }
            },

            highlight: function(element, errorClass) {
                $(element).parent().addClass("has-error");
            },

            unhighlight: function(element, errorClass) {
                $(element).parent().removeClass("has-error");
            },

            submitHandler: function(form) { //验证通过时触发
                var taskStrategyId = $('#taskStrategyId').attr("value");
                var obj = [];
                //隐藏域赋值
                $('#paaEmployeeId').attr("value", "20667");
                $('#paaUsername').attr("value", "曾庆越");
                var addData = DomUtil.getJSONObjectFromForm('create-issue-form', null);
                console.log(addData);
                var fileList = $('#file-upload').data('blueimp-fileupload').options.uploadCreateIds;
                if (fileList.length == 0) {
                    bootbox.alert({
                        className: 'span4 alert-error',
                        buttons: {
                            ok: {
                                label: '确定',
                                className: 'btn blue'
                            }
                        },
                        message: "附件不能为空",
                        callback: function () {

                        },
                        title: "错误提示"
                    });
                } else {
                    obj.push(StringUtil.decorateRequestData('ReportTaskDTO', addData));
                    obj.push(StringUtil.decorateRequestData('List', fileList));
                    //进度条
                    $('#progressBar').modal('show', true);
                    $.ajax({
                        type: "POST",
                        url: SMController.getUrl({
                            controller: 'controllerProxy',
                            method: 'callBack',
                            proxyClass: 'fileController',
                            proxyMethod: 'submitReportTask',
                            jsonString: MyJsonUtil.obj2str(obj)
                        }),
                        dataType: "json",
                        beforeSend: function(jqXHR, settings) {
                            $.blockUI({
                                message: '<div class="progress progress-lg progress-striped active" style="margin-bottom: 0px;">' +
                                    '<div style="width: 100%" role="progressbar" class="progress-bar bg-color-darken">' +
                                    '<span id="processStatus" style="position: relative; top: 5px;font-size:15px;">正在处理，请稍后...</span></div>' +
                                    '</div>'
                            });
                        },
                        success: function (result) {
                            if (result.success) {
                                $("#processStatus").text("提交成功，正在返回上一页面...");
                                setTimeout(function(){
                                    $.unblockUI();
                                    history.back();
                                }, 1500);

                            } else {
                                $.unblockUI();
                                bootbox.alert({
                                    title: '提示',//I18n.getI18nPropByKey("ProductionExecution.errorPrompt"),
                                    message:result.msg,
                                    className:'span4 alert-error',
                                    buttons: {
                                        ok: {
                                            label: '关闭',//I18n.getI18nPropByKey("ProductionExecution.confirm"),
                                            className: 'btn blue'
                                        }
                                    },
                                    callback: function() {

                                    }
                                });
                            }
                        }
                    });
                }
            }, // Do not change code below

            errorPlacement: function(error, element) {
                error.appendTo(element.parent());
            }
        });
    }

    var handleFileUpload = function () {
        $('#file-upload').fileupload({
            myUrl: SMController.getUrl({controller:'controllerProxy',method:'callBackByRequest'
                ,proxyClass:'attachmentController',proxyMethod:'upload',jsonString:''}),
            dataType: 'json',
            autoUpload: true,
            maxFileSize: 10000000// <1 MB
        }).on('fileuploadprocessalways', function (e, data) {
                console.log("fileuploadprocessalways");
                if(data.files.error){
                    $('#imageError').find("label").empty();
                    if(data.files[0].error=="File is too large"){
                        $('#imageError').removeClass('hidden').find("label").append("最大上传文件大小为 10.00 MB！");
                    }
                    if(data.files[0].error=="File type not allowed"){
                        $('#imageError').removeClass('hidden').find("label").append("上传文件类型不对！");
                    }
                }
            }).on('fileuploaddone',function (e, data) {
                var that = $(this).data('blueimp-fileupload') ||
                    $(this).data('fileupload');
                var file=data.result.files[0];
                that.options.uploadCreateIds.push(file['createId']);
                $('#imageError').addClass('hidden');
                var url =file.url;
                var date = new Date();
                var createTime =date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日 " +date.getHours()+":"+date.getMinutes();
                var fileContent ="<tr>"
                    +"<td><a href='"+$.url_root+"/issue/fileAttachementDownload.jspa?filePath="+url+"&fileName="+file.name+"'>"+file.name+"</a></td>"
                    +"<td width='100'>"+file.size+" B</td>"
                    +"<td width='160'>"+createTime+"</td>"
                    +"<td width='60' ><a class='deleteFile' data-fileId='"+file.id+"' data-fileName='"+file.name+"' href='javascript:void(0);'><i class='fa fa-trash-o'></i>"
                    +"</a></td>"
                    +"<input type='hidden' name='fileId' value='"+file.id+"'>"
                    +"<input type='hidden' name='createId' value='"+file.createId+"'>"
                    +"<input type='hidden' name='fileName' value='"+file.name+"'>"
                    +"<input type='hidden' name='mimeType' value="+file.type+">"
                    +"</tr>";
                $('#fileAttachements tbody').append(fileContent);
            });

        $('#file-upload').change(function(e) {
            console.log("upload_change");
            $(this).parent().next().val($(this).val());
            e.preventDefault();
        });

        $('#fileAttachements').on("click", ".deleteFile", function(e) {
            console.log($(this).data("fileid"));
            var obj = [];
            obj.push(StringUtil.decorateRequestData('String',$(this).data("fileid")));
            var $that = $(this);
            $.ajax({
                type:'post',
                dataType:"json",
                url:SMController.getUrl({controller:'controllerProxy',method:'callBack'
                    ,proxyClass:'attachmentController',proxyMethod:'deleteTempAttachmentFileById',
                    jsonString:MyJsonUtil.obj2str(obj)}),
                success :function(result)
                {
                    if(result) {
                        $that.closest("tr").remove();
                    }else {
                    }
                }
            });
        });
    }

    return {
        init: function () {
            handleSelect2();
            handleForm();
            handleFileUpload();
        }
    };
}();