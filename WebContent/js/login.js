/**
 * FileName: login.js
 * File description: 用于加载和初始化登录页面的组件及内容
 * Copyright (c) 2016 Eastcompeace, Inc. All Rights Reserved.
 *
 * @author <a href="mailto:zengqingyue@eastcompeace.com">zengqingyue</a>
 * @DateTime: 2016-11-02
 */

/**
 * login所有属性和方法定义
 * @type {login}
 */
var login = function () {

    var handleForm = function () {
        updateFlag($('.dtms'));
        var sysImageMap = {
                dtms: "../img/login/systemLogo_01.png",
                itms: "../img/login/systemLogo_02.png",
                knowlege: "../img/login/systemLogo_03.png",
                pms: "../img/login/systemLogo_04.png",
                sys: "../img/login/systemLogo_05.png"
            },
            $title = $("#rightTitle img"),
            $form = $("#loginForm"),
            that = this;

        $("#leftContent").on("click", ".simpleTile", function(e) {
            $title.attr("src", sysImageMap[$(this).data("key")]);
            $(this).addClass("selectedTile").siblings().removeClass("selectedTile");
            updateFlag($(this));
        });

        $("#loginForm").validate({
            rules:{
                username:{
                    required:true
                },
                password:{
                    required:true
                }
            },
            messages: {
                username:{
                    required:"用户名不能为空！！！"
                },
                password:{
                    required:"密码不能为空！！！"
                }
            },
            submitHandler: function (form) {
                var obj = [];
                obj.push(StringUtil.decorateRequestData('String',$("#username").val()));
                obj.push(StringUtil.decorateRequestData('String',$("#password").val()));
                var urlConfig = {controller:'controllerProxy',method:'callBackByRequest'
                    ,proxyClass:'loginController',proxyMethod:'login',jsonString:MyJsonUtil.obj2str(obj)};
                var baseUrl = '../'
                $.ajax({
                    type:"POST",
                    url:SMController.getUrl(urlConfig,baseUrl),
                    dataType:"json",
                    success:function(result) {
                        if (result.success) {
//                            $.pnotify({
//                                text: result.msg
//                            });
                            window.location.href='../pages/user/user_list.html';
                        } else {
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
        });

        document.onkeydown = function(e) {
            if(!e) e = window.event;
            if((e.keyCode || e.which) == 13){
                document.getElementById("btnSubmit").click();
            }
        };

        function updateFlag(target) {
            $('.tileFlag').remove();
            $("<div class=\"tileFlag\"></div>").appendTo(target).offset({
                "top": target.offset().top + 3
            });
        }
    };

    var handleTop = function () {
        initTopEvent();
        validateFrom();

        // 初始化表单提交事件
        function initTopEvent() {
            // 设置登录名
            $("#loginUser").text(CurrentLoginUser.data.user_fullname);

            // 退出登录
            $("#logout").click(function(e) {
//                localStorage.removeItem("target_nav");
//                localStorage.removeItem("username");
//                localStorage.removeItem("globalResources");
//                localStorage.removeItem("specificResources");
//                localStorage.removeItem("roles");
                $.ajax({
                    type:'post',
                    dataType:"json",
                    url: SMController.getUrl({controller:'controllerProxy',method:'callBackByRequest',
                        proxyClass:'loginController',proxyMethod:'userLogout',jsonString:null}),
                    success:function(result){
                        if(result.success){
                            window.location.href="../login.html";
                        }else{
                            bootbox.alert({
                                className:'span4 alert-error',
                                buttons: {
                                    ok: {
                                        label: '确定',
                                        className: 'btn blue'
                                    }
                                },
                                message:result.msg,
                                title: "错误提示"
                            });
                        }
                    }
                });
            });

            // 提交表单
            $("#btn-modifiedPassword").on('click', function(e){
                // 清除界面上的弹出框
                clearSmallBox();
                // 锁定，防止重复提交
                if(!lockItms($('#btn-modifiedPassword').get(0))) {
                    return;
                }
                if(!$("#password-form").valid()) {
                    // 解锁
                    unlockItms($('#btn-modifiedPassword').get(0));
                    return;
                }
                $.ajax({
                    url : $.url_root + '/user/changePassWord.jspa',
                    type : 'post',
                    dataType: "json",
                    data : {
                        "userDTO.password" : $("#password").val(),
                        "userDTO.newPassword" : $("#newPassword").val()
                    },
                    success : function(data) {
                        checkResult(data, {
                            message : "密码更改成功",
                            showBox : true,
                            callback : function(){
                                //修改成功后重置表单及清除格式
                                resetOrClearForm();
                                $("#modifyPasswordModal").modal("hide");
                            }
                        });
                        // 解锁
                        unlockItms($('#btn-modifiedPassword').get(0));
                    },
                    error: function(xhr, textStatus, errorThrown) {
                        showOperationError(xhr, textStatus, errorThrown);
                    }
                });
            });

            //取消提交表单,表单填充域清空
            $("#btn-cancel , .close").on('click',function(e){
                resetOrClearForm();
            });
        }

        //为表单提供验证规则
        function validateFrom(){
            //为validator添加自定义方法;
            $.validator.addMethod("rightFormate", function (value, element) {
                var tel = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,60}$/;
                return this.optional(element) || (tel.test(value));
            }, '正确的密码格式是由字母和数字组成!');

            //验证表单
            $("#password-form").validate({
                rules: {
                    password:{
                        required: true
                    },
                    newPassword: {
                        required: true,
                        rangelength: [8,60],
                        rightFormate : true
                    },
                    passwordConfirm: {
                        required: true,
                        equalTo: '#newPassword'
                    }
                },
                messages: {
                    password:{
                        required: '请输入密码!'
                    },
                    newPassword: {
                        required: '请输入密码!',
                        rangelength: "请输入 一个长度介于{0}至{1} 之间的字符串",
                        rightFormate : '正确的密码格式是由字母和数字组成!'

                    },
                    passwordConfirm: {
                        required: '请再次输入密码',
                        equalTo: '输入与上次不一致, 请确保确认密码和新密码一致!'
                    }
                },
                errorPlacement: function(error, element) {
                    error.insertAfter(element.parent());
                }
            });
        }

        //重置或清空表单
        function resetOrClearForm(){
            $("#password-form")[0].reset();
            $("#password, #newPassword, #passwordConfirm").parent().removeClass("state-success state-error").next().remove();
        }
    }

    return {
        init: function () {
            handleForm();
        },
        initTop: function() {
            handleTop();
        }
    };
}();