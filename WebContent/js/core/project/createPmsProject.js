var createPmsProject = function(){
	return {
		init : function() {
			createPmsProject.initFileUpload();
			createPmsProject.initValidation();
			createPmsProject.initEvent();
		},
		initValidation : function() {
			$.validator.addMethod("codeFormat", function(value, element) {
			    var tel = /^[0-9a-zA-Z_-]+$/;
			    return this.optional(element) || (tel.test(value));
			}, "message");
			
			$.validator.addMethod("projectNameFormat", function(value, element) {  
			    var tel = /^[\u4e00-\u9fa5\.\sa-zA-Z0-9_-]+$/;
			    return this.optional(element) || (tel.test(value));
			}, "message");

			var $formCreateProject = $("#checkout-form");
			$formCreateProject.validate({
				ignore: ":not('.required-validation')",
				errorElement: "strong",
                errorClass: "note_error text-danger",
                focusCleanup: true,
                focusInvalid: false,
				rules:{
					projectCode:{
						// codeFormat:[],
						remote:{
	                        url: $.url_root+"/project/checkProjectCode.jspa",
	                        type: "post",
	                        data: {
	                            'propertyName': "code",
	                            'propertyVal':function(){
	                                return $formCreateProject.find('input[name=projectCode]').val();
	                            }
	                        }
						},
						maxlength: 200
					},
					projectName:{
						// projectNameFormat:[],
						required: true,
						maxlength: 200
					}
				},
				messages: {
					projectCode:{
					  	// codeFormat:"只接受由数字、26个英文字母或者下划线组成的字符串！",
					  	remote:"项目编号已存在！请重新输入！",
					  	maxlength: "字段最大允许200个字符"
				  	},
				  	projectName:{
				  		// projectNameFormat:"名字只能使用字母，数字，汉字，'_'和'-''，请重新输入！",
					  	required:"项目名称不能为空！",
					  	maxlength: "字段最大允许200个字符"
				  	}
				},
				
				highlight: function(element, errorClass) {
                    $(element).parent().addClass("has-error");
                },
                
                unhighlight: function(element, errorClass) {
                    $(element).parent().removeClass("has-error");
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
		           // acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i
		        }).on('fileuploadprocessalways', function (e, data) {
		            //console.log(data);
		            if(data.files.error){
		                $('#imageError').find("label").empty();
		                if(data.files[0].error=="File is too large"){
		                   $('#imageError').removeClass('hidden').find("label").append("最大上传文件大小为 10.00 MB！");

		                }
		            }
		        }).on('fileuploaddone',function (e, data) {
		            var file=data.result;
		            $('#imageError').addClass('hidden');
		            var url =file.url;
		            var date = new Date();
		            var createTime =date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日 ";
		            var fileContent ="<tr>"
		                            +"<td><a href='"+$.url_root+"/project/pmsFileAttachementDownload.jspa?filePath="+url+"&fileName="+file.uploadFileName+"'>"+file.uploadFileName+"</a></td>"
		                            +"<td width='100'>"+file.size+" B</td>"
		                            +"<td width='160'>"+createTime+"</td>"
		                            +"<td width='20' ><a class='deletefile' data-filepath='"+url+"' data-filename='"+file.uploadFileName+"' href='javascript:void(0);'><i class='fa fa-trash-o'></i>"
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
		            $.ajax({
		                url:$.url_root+"/project/deletePmsFileAttachement.jspa",
		                datatype:"json",
		                data:{
		                	"filePath": $(this).data("filepath"), //data-filePath
			                "fileName": $(this).data("filename")
		                },
		                success :function(result)
		                {
		                    if(result.success) {
		                        $that.closest("tr").remove();
		                       $('#fileName').val("");
		                    }
		                }
		            });
		     });
		},
		initEvent : function() {
			
			var managers=[];
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
                	$("#selectProjectManager").select2({
        		        allowClear: true,
        		        multiple: false,
        		        data: managers,

        		        formatResult :function(object, container, query){
        		            var html = "登录名：" + object.name+"<br/>"+"用户名：" + object.realName;
        		            return html;
        		        },
        		        formatSelection : function(object, container){
        		            var realName = object.realName == undefined ? "" : object.realName;
        		            var html = " " + realName;
        		            html += (object.id ?  " [ " + object.id + " ]" : "");
        		            return html;
        		        },
        		        matcher: function(term, text, opt) {
    			        	return opt.id.toUpperCase().indexOf(term.toUpperCase())>=0
    			        	|| text.toUpperCase().indexOf(term.toUpperCase())>=0;
    			       }
        		    }).on('select2-selected', function(e) { //fire when selected the option
        		    	var data = e.choice;
                        $('#selectProjectManager').val(data.text);
                        $('#projectManager').val(data.name);
        		    });
                }
            });
			
			var members=[];
			$.ajax({
                url : $.url_root+"/project/selectMembers.jspa",
                dataType : "json",
                type: "POST",
                success : function(data) {
                	var dtos = data.resultList;
                	for(var i=0, len = dtos.length;i<len;i++){
                		members.push({id:dtos[i].name,text: dtos[i].realName,name:dtos[i].name,realName:dtos[i].realName});
                	}
                	$("#selectProjectMember").select2({
        		        allowClear: true,
        		        multiple: true,
        		        data:function() { return {results: members }; },
        		        formatResult :function(object, container, query){
        		        	var html = "登录名：" + object.name+"<br/>"+"用户名：" + object.realName;
        		            return html;
        		        },
        		        formatSelection : function(object, container){
        		            var realName = object.realName == undefined ? "" : object.realName;
        		            var html = " " + realName;
        		            html += (object.id ?  " [ " + object.id + " ]" : "");
        		            return html;
        		        },
        		        matcher: function(term, text, opt) {
    			        	return opt.id.toUpperCase().indexOf(term.toUpperCase())>=0
    			        	|| text.toUpperCase().indexOf(term.toUpperCase())>=0;
    			       }

        		    }).on('change', function(e) { //fire when selected the option
        		    	var data = e.val;
                        //$('#selectProjectMember').val(data.text);
                        $('#projectMember').val(data);
        		    });
                }
            });
			
			$("#btnSaveProject").click(function(event) {
				
				// 锁定，防止重复提交
				if(!lockItms($('#btnSaveProject').get(0))) {
					return;
				}

				var $formCreateProject = $("#checkout-form");
				if(!$formCreateProject.valid()) {
					// 解锁
					unlockItms($('#btnSaveProject').get(0));
		            return;
		        }

				var filePath = [];
			 	$(".filePath").each(function(i, v) {
			 		filePath.push($(this).val());
			 	});
			 	
			 	var fileName = [];
			 	$(".fileName").each(function(i, v) {
			 		fileName.push($(this).val());
			 	});
			 	
			 	var mimeType = [];
			 	$(".mimeType").each(function(i, v) {
			 		mimeType.push($(this).val());
			 	});
			 	
			 	var data = {
			 			'projectDTO.code': $formCreateProject.find('input[name=projectCode]').val(),
		 				'projectDTO.name':$formCreateProject.find('input[name=projectName]').val(),
		 				'projectDTO.description':$("#projectDesc").find('.summernote').code(),
		 				'projectDTO.projectManager':$("#projectManager").val(),
		 				'projectDTO.projectMember':$("#projectMember").val()
		 		};
				 	
			    $.extend(data, filePath.length > 0 ? {'filePath': filePath, 'fileName': fileName,'mimeType': mimeType} : {});
			 	

				$.ajax({
					url: $.url_root+"/project/createPMSProject.jspa",
					type : "post",
					traditional : true,
					dataType : 'json',
					data: data,
					success: function(result){
						checkResult(result, {
	        				showBox : false,
	        				callback : function(){
	        					history.go(-1);
	        				}
	        			});
					},
					error: function(xhr, textStatus, errorThrown) {
						// 解锁
						unlockItms($('#btnSaveProject').get(0));
						showOperationError(xhr, textStatus, errorThrown);
					}
				});
			});
		},
	};
}();