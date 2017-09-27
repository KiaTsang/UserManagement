/**
 * FileName: issueValidate.js
 *
 * File description goes here.
 *
 * Copyright (c) 2010 Asiasoft, Inc. All Rights Reserved.
 *
 * @author <a href="mailto:li.zhou@iaspec.net">julia.zhou</a>
 * @Version: 1.0.0
 * @DateTime: 2014-06-27
 */

var issueValidate = function() {
    return {
        initIssueCardValidate: function() {
            $("#create-issue-form").validate({
                // 指定验证时要忽略哪些元素，默认是hidden，支持jQuery的伪类选择器，需要为应用该验证器的元素加上.required-validation
                errorElement: "strong",
                ignore: ":not('.required-validation')",
                errorClass: "note_error text-danger",
                focusCleanup: true,
                focusInvalid: false,
                rules: {
                    "issueDTO.cardProjectDTO.code": {
                        maxlength: 200,
                        remote: {
                            url: $.url_root + "/project/validateCode.jspa",
                            dataType: "json",
                            type: "POST",
                            data: {
                                pid: function() {
                                    return $("#pid").val();
                                }
                            }
                        }
                    },
                    "issueDTO.cardProjectDTO.name": {
                        maxlength: 200,
                        required: true
                    },
                    "issueDTO.summary": {
                        maxlength: 200,
                        required: true
                    },
                    "issueDTO.fixedUser": {
                        required: true

                    },
                    "issueDTO.timeEstimate": {
                        maxlength: 30
                    },
                    "issueDTO.timeOriginalEstimate": {
                        maxlength: 30
                    },
                    "issueDTO.cardProjectDTO.requirementCode": {
                        maxlength: 200
                    },
                    "issueDTO.cardProjectDTO.icModel": {
                        maxlength: 200
                    },
                    "issueDTO.cardProjectDTO.cosVersion": {
                        maxlength: 200
                    },
                    "issueDTO.cardProjectDTO.productionProcedure": {
                        maxlength: 200
                    },
                    "issueDTO.cardProjectDTO.cosDeveloper": {
                        maxlength: 200
                    },
                    "issueDTO.cardProjectDTO.productionEquipment": {
                        maxlength: 200
                    },
                    "issueDTO.cardProjectDTO.customDeveloper": {
                        maxlength: 200
                    },
                    "issueDTO.cardProjectDTO.appDeveloper": {
                        maxlength: 200
                    },
                    "issueDTO.cardProjectDTO.ucDesigner": {
                        maxlength: 200
                    },
                    "issueDTO.cardProjectDTO.tester": {
                        maxlength: 200
                    },
                    "issueDTO.environment": {
                        maxlength: 2048
                    },
                    "issueDTO.position": {
                        maxlength: 2048
                    },
                    "issueDTO.affectedVersion": {
                        maxlength: 30
                    },
                    "issueDTO.fixedVersion": {
                        maxlength: 30
                    }/*,
                    "issueDTO.description": {
                        maxlength: 10000
                    }*/
                }, // Messages for form
                messages: {
                    "issueDTO.cardProjectDTO.code": {
                        remote: validation.project.codeIsExisted,
                        maxlength: "项目编号长度不能超过200个字符"
                        
                    },
                    "issueDTO.cardProjectDTO.name": {
                        maxlength: "项目名称长度不能超过200个字符",
                        required: validation.project.nameCannotEmpty
                    },
                    "issueDTO.summary": {
                        maxlength: "字段最大允许200个字符",
                        required: validation.issue.summaryCannotEmpty
                    },
                    "issueDTO.fixedUser": {
                        required: validation.issue.fixedUserCannotEmpty
                    },
                    "issueDTO.timeEstimate": {
                        maxlength: common.placeholderConversion({
                            args: [30],
                            msg: validation.project.maxCharactersSize
                        })
                    },
                    "issueDTO.timeOriginalEstimate": {
                        maxlength: common.placeholderConversion({
                            args: [30],
                            msg: validation.project.maxCharactersSize
                        })
                    },
                    "issueDTO.cardProjectDTO.requirementCode": {
                        maxlength: "字段最大允许200个字符"
                    },
                    "issueDTO.cardProjectDTO.icModel": {
                        maxlength: "字段最大允许200个字符"
                    },
                    "issueDTO.cardProjectDTO.cosVersion": {
                        maxlength: "字段最大允许200个字符"
                    },
                    "issueDTO.cardProjectDTO.productionProcedure": {
                        maxlength: "字段最大允许200个字符"
                    },
                    "issueDTO.cardProjectDTO.cosDeveloper": {
                        maxlength: "字段最大允许200个字符"
                    },
                    "issueDTO.cardProjectDTO.productionEquipment": {
                        maxlength: "字段最大允许200个字符"
                    },
                    "issueDTO.cardProjectDTO.customDeveloper": {
                        maxlength: "字段最大允许200个字符"
                    },
                    "issueDTO.cardProjectDTO.appDeveloper": {
                        maxlength: "字段最大允许200个字符"
                    },
                    "issueDTO.cardProjectDTO.ucDesigner": {
                        maxlength: "字段最大允许200个字符"
                    },
                    "issueDTO.cardProjectDTO.tester": {
                        maxlength: "字段最大允许200个字符"
                    },
                    "issueDTO.environment": {
                        maxlength: "字段最大允许2048个字符"
                    },
                    "issueDTO.position": {
                        maxlength: "字段最大允许2048个字符"
                    },
                    "issueDTO.affectedVersion": {
                        maxlength: "字段最大允许30个字符"
                    },
                    "issueDTO.fixedVersion": {
                        maxlength: "字段最大允许30个字符"
                    }/*,
                    "issueDTO.description": {
                        maxlength: "字段最大允许10000个字符"
                    }*/
                },

                highlight: function(element, errorClass) {
                    $(element).parent().addClass("has-error");
                },

                unhighlight: function(element, errorClass) {
                    $(element).parent().removeClass("has-error");
                },

                submitHandler: function(form) { //验证通过时触发
                    form.submit(); //表单提交
                }, // Do not change code below

                errorPlacement: function(error, element) {
                    error.appendTo(element.parent());
                }
            });
        },

        initIssueSysValidate: function() {
            $("#create-issue-form").validate({
                ignore: ":not('.required-validation')", // 指定验证时要忽略哪些元素，默认是hidden，支持jQuery的伪类选择器，需要为应用该验证器的元素加上.required-validation
                errorElement: "strong",
                focusCleanup: true,
                focusInvalid: false,
                errorClass: "note_error text-danger",
                rules: {
                    "issueDTO.systemProjectDTO.code": {
                        maxlength: 200,
                        remote: { //ajax后台验证该code是否唯一
                            url: $.url_root + "/project/validateCode.jspa",
                            dataType: "json",
                            type: "POST",
                            data: {
                                "pid": function() {
                                    return $("#pid").val();
                                }
                            }
                        }
                    },

                    "pdName": {
                        required: true
                    },
                    "issueDTO.systemProjectDTO.name": {
                        maxlength: 200,
                        required: true
                    },
                    "issueDTO.summary": {
                        required: true,
                        maxlength: 200,
                    },
                    "issueDTO.fixedUser": {
                        required: true
                    },
                    "issueDTO.module": {
                        maxlength: 200,
                    },
                    "issueDTO.environment": {
                        maxlength: 2048
                    },
                    "issueDTO.position": {
                        maxlength: 2048
                    },
                    "issueDTO.affectedVersion": {
                        maxlength: 30
                    },
                    "issueDTO.fixedVersion": {
                        maxlength: 30
                    },
                    "issueDTO.timeEstimate": {
                        maxlength: 30
                    },
                    "issueDTO.timeOriginalEstimate": {
                        maxlength: 30
                    }/*,
                    "issueDTO.description": {
                        maxlength: 10000
                    }*/
                }, // Messages for form
                messages: {
                    "issueDTO.systemProjectDTO.code": {
                        remote: validation.project.codeIsExisted,
                        maxlength: "项目编号长度不能超过200个字符"
                    },
                    "issueDTO.systemProjectDTO.name": {
                        maxlength: "项目名称长度不能超过200个字符",
                        required: validation.project.nameCannotEmpty
                    },
                    "pdName": {
                    	required: validation.production.proNameCannotEmpty
                    },

                    "issueDTO.summary": {
                        required: validation.issue.summaryCannotEmpty,
                        maxlength: "字段最大允许200个字符"
                    },
                    "issueDTO.fixedUser": {
                        required: validation.issue.fixedUserCannotEmpty
                    },
                    "issueDTO.module": {
                        maxlength: "字段最大允许200个字符",
                    },
                    "issueDTO.environment": {
                        maxlength: "字段最大允许2048个字符"
                    },
                    "issueDTO.position": {
                        maxlength: "字段最大允许2048个字符"
                    },
                    "issueDTO.environment": {
                        maxlength: "字段最大允许2048个字符"
                    },
                    "issueDTO.position": {
                        maxlength: "字段最大允许2048个字符"
                    },
                    "issueDTO.affectedVersion": {
                        maxlength: "字段最大允许30个字符"
                    },
                    "issueDTO.fixedVersion": {
                        maxlength: "字段最大允许30个字符"
                    },
                    "issueDTO.timeEstimate": {
                        maxlength: common.placeholderConversion({
                            args: [30],
                            msg: validation.project.maxCharactersSize
                        })
                    },
                    "issueDTO.timeOriginalEstimate": {
                        maxlength: common.placeholderConversion({
                            args: [30],
                            msg: validation.project.maxCharactersSize
                        })
                    }/*,
                    "issueDTO.description": {
                        maxlength: "字段最大允许10000个字符"         
                    }*/
                },

                highlight: function(element, errorClass) {
                    $(element).parent().addClass("has-error");
                },

                unhighlight: function(element, errorClass) {
                    $(element).parent().removeClass("has-error");
                    if ($(element).data("key") === "productionName") {
                        $("#projectSelector").parent().removeClass("has-error");
                    } else if ($(element).data("key") === "name") {
                        $(".proName").parent().removeClass("has-error");
                    }
                },

                submitHandler: function(form) { //验证通过时触发
                    form.submit(); //表单提交
                }, // Do not change code below

                errorPlacement: function(error, element) {
                    error.appendTo(element.parent());
                }
            });
        },

        initIssueWhiteBoxValidate: function() {
            $("#create-issue-form").validate({
                debug: false,
                ignore: ":not('.required-validation')", //指定验证时要忽略哪些元素，默认是hidden，支持jQuery的伪类选择器，需要为应用该验证器的元素加上.required-validation
                errorElement: "strong",
                errorClass: "note_error text-danger",
                focusCleanup: true,
                focusInvalid: false,
                rules: {
                    "issueDTO.whiteboxProjectDTO.code": {
                        maxlength: 200,
                        remote: { //ajax后台验证该code是否唯一
                            url: $.url_root + "/project/validateCode.jspa",
                            dataType: "json",
                            type: "POST",
                            data: {

                                "pid": function() {
                                    return $("#pid").val();
                                }
                            }
                        }
                    },
                    "issueDTO.whiteboxProjectDTO.name": {
                        maxlength: 200,
                        required: true,
                    },
                    "issueDTO.summary": {
                        maxlength: 200,
                        required: true
                    },
                    "issueDTO.environment": {
                        maxlength: 2048
                    },
                    "issueDTO.position": {
                        maxlength: 2048
                    },
                    "issueDTO.fixedUser": {
                        required: true
                    },
                    "issueDTO.affectedVersion": {
                        maxlength: 30
                    },
                    "issueDTO.fixedVersion": {
                        maxlength: 30
                    },
                    "issueDTO.timeEstimate": {
                        maxlength: 30
                    },
                    "issueDTO.timeOriginalEstimate": {
                        maxlength: 30
                    }/*,
                    "issueDTO.description": {
                        maxlength: 10000
                    }*/
                }, // Messages for form
                messages: {
                    "issueDTO.whiteboxProjectDTO.code": {
                        remote: validation.project.codeIsExisted,
                        maxlength: "项目编号长度不能超过200个字符"
                    },
                    "issueDTO.whiteboxProjectDTO.name": {
                        maxlength: "项目名称长度不能超过200个字符",
                        required: validation.project.nameCannotEmpty
                    },
                    "issueDTO.summary": {
                        required: validation.issue.summaryCannotEmpty,
                        maxlength: "字段最大允许200个字符"
                    },
                    "issueDTO.environment": {
                        maxlength: "字段最大允许2048个字符"
                    },
                    "issueDTO.position": {
                        maxlength: "字段最大允许2048个字符"
                    },
                    "issueDTO.fixedUser": {
                        required: validation.issue.fixedUserCannotEmpty
                    },
                    "issueDTO.affectedVersion": {
                        maxlength: "字段最大允许30个字符"
                    },
                    "issueDTO.fixedVersion": {
                        maxlength: "字段最大允许30个字符"
                    },
                    "issueDTO.timeEstimate": {
                        maxlength: common.placeholderConversion({
                            args: [30],
                            msg: validation.project.maxCharactersSize
                        })
                    },
                    "issueDTO.timeOriginalEstimate": {
                        maxlength: common.placeholderConversion({
                            args: [30],
                            msg: validation.project.maxCharactersSize
                        })
                    }/*,
                    "issueDTO.description": {
                        maxlength: "字段最大允许10000个字符"         
                    }*/
                },

                highlight: function(element, errorClass) {
                    $(element).parent().addClass("has-error");
                },

                unhighlight: function(element, errorClass) {
                    $(element).parent().removeClass("has-error");
                },

                submitHandler: function(form) {
                    form.submit(); //表单提交
                }, // Do not change code below

                errorPlacement: function(error, element) {
                    error.appendTo(element.parent());
                }
            });
        }
    };
}();
