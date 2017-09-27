var viewPmsProject = function(){
	var managers=[];
	var members=[];
	var statusBgColor = {
		    'OPEN':'label label-success',
		    'CLOSE':'label label-default',
		};
	return {
		init : function() {
			viewPmsProject.initContent();
			viewPmsProject.initUserList();
			viewPmsProject.initFileUpload();
			viewPmsProject.initValidation();
			viewPmsProject.initEvent();
			viewPmsProject.initEditable();
		},
		initContent : function() {
			// 项目状态
			var projectStatus = $('#projectStatus').attr('data-value');
			$('#projectStatus').html(viewPmsProject.getProjectStatusText(projectStatus));
			$('#projectStatus').addClass(statusBgColor[projectStatus]);
		},
		 initUserList : function() {
			 $.ajax({
				 url : $.url_root+"/project/selectManager.jspa",
                dataType : "json",
               /* async: false,*/
                type: "POST",
                success : function(data) {
                	var dtos = data.resultList;
                	for(var i=0, len = dtos.length;i<len;i++){
                		managers.push({id:dtos[i].name,text: dtos[i].realName,name:dtos[i].name,realName:dtos[i].realName});
                	}
                }
            });
			 $.ajax({
	                url : $.url_root+"/project/selectMembers.jspa",
	                dataType : "json",
	                type: "POST",
	                success : function(data) {
	                	var dtos = data.resultList;
	                	for(var i=0, len = dtos.length;i<len;i++){
	                		members.push({id:dtos[i].name,text: dtos[i].realName,name:dtos[i].name,realName:dtos[i].realName});
	                	}
	                }
	            });
		 },
		initValidation : function() {
			$.validator.addMethod("projectNameFormat", function(value, element) {  
			    var tel = /^[\u4e00-\u9fa5\.\sa-zA-Z0-9_-]+$/;
			    return this.optional(element) || (tel.test(value));
			}, "message");

			var $formCreateProject = $("#checkout-form");
			$formCreateProject.validate({
				rules:{
					projectName:{
						projectNameFormat:[],
						required:true
					}
				},
				messages: {
				  	projectName:{
					  	schemeNameFormat:"名字只能使用字母，数字，汉字，'_'和'-''，请重新输入！",
					  	required:"项目名称不能为空！"
				  	}
				}
			});
		},
		initEditable : function() {
			$.fn.editable.defaults.mode = 'inline';
			$.fn.editable.defaults.url = $.url_root+'/project/updatePMSProject.jspa';
			$.fn.editableContainer.defaults.onblur = "submit"; //submit the value when click outside the container
	        $.fn.editable.defaults.emptytext = "---"; // set to '-' when no content
	        $.fn.editable.defaults.ajaxOptions = {
					error: function(xhr, textStatus, errorThrown) {
						showOperationError(xhr, textStatus, errorThrown);
					}
				};

			$("a[data-type='text']").not('.specialSelect2, .gt0').editable({
			    params: function(params) {
			        var customParams = {};
			        customParams["projectDTO.projectId"] = $("#viewProjectId").val();
			        customParams[params.name] = params.value;
			        return customParams;
			    }
			});
			
			$("a[data-type='text'].gt0").editable({
			    params: function(params) {
			        var customParams = {};
			        customParams["projectDTO.projectId"] = $("#viewProjectId").val();
			        customParams[params.name] = params.value;
			        return customParams;
			    },
			    validate: function(value) {
			        if ($(this).data("required")) {
    			    	if($.trim(value) === '') {
    					    return '项目名称不能为空！';
    			    	}
			        }
			    	
			    	var maxLength = $(this).data("maxLength");
                    if ($.trim(value).length > maxLength) {
                        return "字段最大允许" + maxLength + "个字符";
                    }
			    }
			});
			
			var pStatus=[{id:"OPEN",text: "启用"},{id:"CLOSE",text: "已关闭"}];
			$('#projectStatus').editable({
				ajaxOptions: {
			        traditional: true
			    },
			    source: pStatus,
			    select2: {
			    	allowClear: true,
			        width: 200,
			        multiple: false,
			    },
			    params: function(params) {
			        var customParams = {};
			        customParams["projectDTO.projectId"] = $("#viewProjectId").val();
			        customParams[params.name] = params.value;
			        return customParams;
			    },
			    success: function(response, newValue) {
			    	$('#projectStatus').removeClass(statusBgColor[$('#projectStatus').attr('data-value')]);
			    	$('#projectStatus').attr('data-value',newValue);
			    	$('#projectStatus').addClass(statusBgColor[newValue]);
			    	$('#projectStatus').css("background-color","");
			    }
			});
			
			$('#projectManager').editable({
				ajaxOptions: {
			        traditional: true
			    },
			    source: managers,
			    select2: {
			    	allowClear: true,
			        width: 300,
			        multiple: false,
			        formatResult :function(object, container, query){
			            var html = " 登录名：" + object.name+"<br/>"+"用户名：" + object.realName;
			            return html;
			        },
			        formatSelection : function(object, container){
    		            var realName = object.realName == undefined ? "" : object.realName;
    		            var html = " " + realName;
    		            html += (object.name ?  " [ " + object.name + " ]" : "");
    		            return html;
    		        },
    		        matcher: function(term, text, opt) {
			        	return opt.id.toUpperCase().indexOf(term.toUpperCase())>=0
			        	|| text.toUpperCase().indexOf(term.toUpperCase())>=0;
			       }
			    },
			    params: function(params) {
			        var customParams = {};
			        customParams["projectDTO.projectId"] = $("#viewProjectId").val();
			        customParams[params.name] = params.value;
			        return customParams;
			    }
			});
			
			$('#projectMember').editable({
				ajaxOptions: {
			        traditional: true
			    },
			    source: members,
			    select2: {
			    	//allowClear: true,
			        width: 300,
			        multiple: true,
			        formatResult :function(object, container, query){
			            var html = "登录名：" + object.name+"<br/>"+"用户名：" + object.realName;
			            return html;
			        },
			        formatSelection : function(object, container){
    		            var realName = object.realName == undefined ? "" : object.realName;
    		            var html = " " + realName;
    		            html += (object.name ?  " [ " + object.name + " ]" : "");
    		            return html;
    		        },
    		        matcher: function(term, text, opt) {
			        	return opt.id.toUpperCase().indexOf(term.toUpperCase())>=0
			        	|| text.toUpperCase().indexOf(term.toUpperCase())>=0;
			       },
			        initSelection: function (element, callback) {
			            var obj = [];
			            var ids = element.val().split(',');
			            $.each(members, function(index,value){
			                if($.inArray(this.id, ids) > -1) {
			                    obj.push(value);
			                }
			            });
			            callback(obj);
			        }
			    },
			    params: function(params) {
			        var customParams = {};
			        customParams["projectDTO.projectId"] = $("#viewProjectId").val();
			        customParams[params.name] = params.value;
			        return customParams;
			    }
			});
		},
		initFileUpload:function()
		{
		     $('#file-upload').fileupload({
		            url:$.url_root+'/project/pmsFileAttachementUpload.jspa',
		            dataType: 'json',
		            autoUpload: true,
		            maxFileSize: 10000000,// <1 MB
		            formData:{"projectId":$("#viewProjectId").val()}
		        }).on('fileuploadprocessalways', function (e, data) {
		            if(data.files.error){
		                $('#imageError').find("label").empty();
		                if(data.files[0].error=="File is too large"){
		                   $('#imageError').removeClass('hidden').find("label").append("最大上传文件大小为 10.00 MB！");

		                }
		                /*if(data.files[0].error=="File type not allowed"){
		                    $('#imageError').removeClass('hidden').find("label").append("上传文件类型不对！");
		                }*/
		            }
		        }).on('fileuploaddone',function (e, data) {
		            var file=data.result;
		            $('#imageError').addClass('hidden');
		            var url =file.url;
		            var date = new Date();
		            var createTime =date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日 ";
		            var fileContent ="<tr>"
		                            +"<td><a href='"+$.url_root+"/project/pmsFileAttachementDownload.jspa?fileAttachementId="+file.fileAttachementId+"'>"+file.uploadFileName+"</a></td>"
		                            +"<td width='100'>"+file.size+" B</td>"
		                            +"<td width='160'>"+createTime+"</td>"
		                            +"<td width='20' ><a class='deletefile' data-filepath='"+url+"' data-fileAttachementId='"+file.fileAttachementId+"' href='javascript:void(0);'><i class='fa fa-trash-o'></i>"
		                            +"</a></td>"
		                            +"<input type='hidden' class='filePath' name='filePath' value='"+url+"'>"
		                            +"<input type='hidden' class='fileName' name='fileName' value='"+file.uploadFileName+"'>"
		                            +"<input type='hidden' class='fileSize' name='fileSize' value='"+file.size+"'>"
		                            +"<input type='hidden' class='mimeType' name='mimeType' value="+file.uploadContentType+">"
		                            +"</tr>";

		            $('#fileAttachements tbody').prepend(fileContent);
		        });

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
	                        	url:$.url_root+"/project/deletePmsFileAttachement.jspa",
	                            datatype:"json",
	                            data:{
	                                //"filePath": $that.data("filepath"),
	                                "fileAttachementId": $that.data("fileattachementid")
	                            },
	                            success :function(result)
	                            {
	                               checkResult(result, {
	                                    message: "<span style='font-size: 17px;'>"+tipMessage.file_del+"</span>",
	                                    callback: function() {
	                                        $that.closest("tr").remove();
	                                        $('#fileName').val("");
	                                    }
	                               });
	                            }
	                        });
	                     }
	                });
		     });
		},
		initEvent : function() {
			
		},
		getProjectStatusText:function(type) {	
			return i18nRes.projectStatus[type];
		},
	};
}();