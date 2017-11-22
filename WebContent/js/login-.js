/**
 * FileName: login.js
 *
 * File description goes here.
 *
 * Copyright (c) 2010 Asiasoft, Inc. All Rights Reserved.
 *
 * @author <a href="mailto:li.zhou@iaspec.net">Julia.Zhou</a>
 * @Version: 1.0.0
 * @DateTime: 2014-08-05
 */

var action ="/login.jspa";
var loginTools = function() {

  return {
	    login: function() {
	    	loginTools.updateFlag($('.dtms'));
//	    	var dtms_login=$("#dtmsURL").val()+action;
//	    	var itms_login=$("#itmsURL").val()+action;
//	    	var sys_login=$("#sysURL").val()+action;
//	        var pms_login=$("#pmsURL").val()+action;
//          var knowlege_login=$("#knowlegeURL").val()+action;

//	       	localStorage.setItem("dtms_login",dtms_login);
//	    	localStorage.setItem("itms_login",itms_login);
//	    	localStorage.setItem("sys_login",sys_login);
//	        localStorage.setItem("pms_login",pms_login);
//	        localStorage.setItem("knowlege_login",knowlege_login);

			var sysImageMap = {
                dtms: "img/login/systemLogo_01.png",
                itms: "img/login/systemLogo_02.png",
                knowlege: "img/login/systemLogo_03.png",
                pms: "img/login/systemLogo_04.png",
                sys: "img/login/systemLogo_05.png"
            },
//            sysUrlsMap = {
//                dtms: dtms_login,
//                itms: itms_login,
//                knowlege: knowlege_login,
//                pms: pms_login,
//                sys: sys_login
//            };
            $title = $("#rightTitle img"),
            $form = $("#loginForm"),
            that = this;

            $("#leftContent").on("click", ".simpleTile", function(e) {
				$title.attr("src", sysImageMap[$(this).data("key")]);
//                $form.attr("action", sysUrlsMap[$(this).data("key")]);
                $(this).addClass("selectedTile").siblings().removeClass("selectedTile");
                that.updateFlag($(this));
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
                    console.log(111);
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
                                window.location.href='../user/user_list.html';
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
	    },
	    updateFlag :function(target) {
			$('.tileFlag').remove();
			$("<div class=\"tileFlag\"></div>").appendTo(target).offset({
                "top": target.offset().top + 3
            });
	  },
	  againLogin:function()
	  {
//	     if($("#dtmsURL").val())
//		  {
//	    	  localStorage.setItem("dtms_login", $("#dtmsURL").val() + action);
//              localStorage.setItem("itms_login", $("#itmsURL").val() + action);
//              localStorage.setItem("sys_login", $("#sysURL").val() + action);
//              localStorage.setItem("pms_login", $("#pmsURL").val() + action);
//              localStorage.setItem("knowlege_login", $("#knowlegeURL").val() + action);
//         	  localStorage.setItem("username",$("#j_username").val());
//         	  localStorage.setItem("topLogoPath",$("#topLogoPath").attr("src"));
//		  }
	     
//	     if($("#j_sessionId").val())
//         {
//       	  localStorage.setItem("sessionId", $("#j_sessionId").val());
//         }

//		  var dtms_login = localStorage.getItem("dtms_login"),
//        	  itms_login = localStorage.getItem("itms_login"),
//              sys_login = localStorage.getItem("sys_login"),
//	          pms_login = localStorage.getItem("pms_login");
//              knowlege_login = localStorage.getItem("knowlege_login");
//              sessionId = localStorage.getItem("sessionId");
//              topLogoPath = localStorage.getItem("topLogoPath");
//
//              $("#topLogoPath").attr("src",topLogoPath);
//
//	      var urls = [ itms_login, sys_login, dtms_login, dtms_login ];
//
//          $("#itms_login, #sys_login, #dtms_login, #dtms_login").each(function(i, v) {
//            $(this).on("click", function(e) {
//            	$("#j_sessionId").val(sessionId);
//            	var urlTemp = urls[i]+'?r='+new Date().getTime();
//                $('#loginAgainForm').attr("action", urlTemp).submit();
//            });
//          });

		  $("#logout").click(function(e) {
			  localStorage.removeItem("target_nav");
			  localStorage.removeItem("username");
			  localStorage.removeItem("globalResources");
			  localStorage.removeItem("specificResources");
			  localStorage.removeItem("roles");
		  });
	  }
  };
}();
