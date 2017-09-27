var productions = (function(){
	var managers=[];
	var parents=[];
	var reArr=[];
	var isFrist=true;
	var fileProductionId = {id: ""};
    return {
        init:function(){
        	productions.initEvent();
        	productions.initUserList();
        	productions.initViewProductionById();
        	productions.initTree();
        	productions.initValidation();
        	productions.initEditable();
        	/*附件事件*/
			productions.initUpdateFileUpload();
			productions.initSaveFileUpload();
        },
        //通过Id查找当前节点的信息
        initViewProductionById: function() {
        	
        	var pid=$('#selectPid').val();
        	if(pid != null && pid != "") 
        	{
                $.ajax({
                    url: $.url_root + "/production/findProductionTreeById.jspa",
                    type: "post",
                    traditional: true,
                    async: false,
                    dataType: 'json',
                    data: {
                        'productionId': pid
                    },
                    success: function(result) {
                        checkResult(result, {
                            showBox: false,
                            callback: function() {
                                var branchData = result.productionsQueryResult;
                                var arr = [];
                                for (var i = 0; i < branchData.length; i++) {
                                    arr.push(branchData[i].productionId);
                                }
                                reArr = arr.reverse();
                                $("body").data("reArray", reArr);
                            }
                        });
                    },
                    error: function(xhr, textStatus, errorThrown) {
                        showOperationError(xhr, textStatus, errorThrown);
                    }
                });
            }
        },
        initDrawTreeById: function(id) {
        	var pid=$('#selectPid').val();
        	if(pid!=null&&pid!=""){
        		if(id!=null&&id!=""){
        			$("span[data-myId=" + id + "]").click();
            		reArr.splice(0, 1);
        		}
        	}else if(isFrist){
        		isFrist=false;
        		if($('.tree li.parent_li > span').size()>0){
        			$('.tree li.parent_li > span')[0].click();
        		}else{
        			$('#save_production_collapse').removeClass('hidden');
        		}
        	}
        },
        initEvent:function(){
        	$("#save_production").on('click',function(){
        		clearSmallBox();
        		$('#save_parentProductionId').val($("#productionId").val());
        		$('#save_production_collapse').removeClass('hidden');
    			$('#update_production_form').addClass('hidden');
    			
    			var allProductions=[];
    			$.ajax({
    				 url : $.url_root+"/production/findAllProductions.jspa",
                    dataType : "json",
                   /* async: false,*/
                    type: "POST",
                    success : function(data) {
                    	var dtos = data.productionsQueryResult;
                    	for(var i=0, len = dtos.length;i<len;i++){
                    		allProductions.push({id:dtos[i].productionId,text: dtos[i].productionName,code:dtos[i].productionCode});
                    	}
                    	$("#selectParentProduction").val([$("#productionId").val()]).select2({
            		        allowClear: true,
            		        multiple: false,
            		        data: allProductions,

            		        formatResult :function(object, container, query){
            		            var html = "产品编号：" + object.code+"<br/>"+"产品名称：" + object.text;
            		            return html;
            		        }
            		    }).on("select2-removed", function(e) { 
            		    	$('#save_parentProductionId').val(null);
            		    }).on('select2-selected', function(e) { //fire when selected the option
            		    	var data = e.choice;
                            $('#selectParentProduction').val(data.text);
                            $('#save_parentProductionId').val(data.id);
            		    });
                    }
                });
        	});
        	
        	$("#selectProductionManager").select2({
		        allowClear: true,
		        multiple: false,
		        data: managers,
		        formatResult :function(object, container, query){
		        	var html = " 登录名：" + object.id+"<br/>"+"用户名：" + object.text;
		            return html;
		        },
		        formatSelection : function(object, container){
		            var realName = object.text == undefined ? "" : object.text;
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
                $('#selectProductionManager').val(data.text);
                $('#save_productionManager').val(data.id);
		    });
        	
        	$("#del_production").on('click',function(){
        		clearSmallBox();
        		var pid=$("#productionId").val();
        		$.smallBox({
                    title : "提示信息",
                    content : "本操作将会删除该产品相关信息，并且无法恢复。<br />确定删除吗？ " +
                    		"<p class='text-align-right'><a href='javascript:void(0);' onclick='productions.deleteProduction("+pid+");' class='btn btn-danger btn-sm'>是</a> " +
                    				"<a href='javascript:void(0);'  class='btn btn-primary btn-sm'>否</a></p>",
                    color : "#296191",
                    icon : "fa fa-bell swing animated"
                });
        	});
        	
        	$("#delSaveProduction").click(function(event) {
        		$('#update_production_form').removeClass('hidden');
    			$('#save_production_collapse').addClass('hidden');
        	});
        	
        	$("#btnSaveProduction").click(function(event) {
        		clearSmallBox();
				
				// 锁定，防止重复提交
				if(!lockItms($('#btnSaveProduction').get(0))) {
					return;
				}

				var $formCreateProduction = $("#save_production_form");
				if(!$formCreateProduction.valid()) {
					// 解锁
					unlockItms($('#btnSaveProduction').get(0));
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
			 			'productionDTO.parentId': $('#save_parentProductionId').val(),
			 			'productionDTO.productionCode': $("#save_productionCode").val(),
		 				'productionDTO.productionName':$("#save_productionName").val(),
		 				'productionDTO.description':$("#save_productionDesc").find('.save_summernote').code(),
		 				'productionDTO.productionManager':$("#save_productionManager").val(),
		 		};
				 	
			    $.extend(data, filePath.length > 0 ? {'filePath': filePath, 'fileName': fileName,'mimeType': mimeType} : {});
			    
				$.ajax({
					url : $.url_root+'/production/createProduction.jspa',
					type : "post",
					traditional : true,
					dataType : 'json',
					data: data,
					success: function(result){
						checkResult(result, {
	        				showBox : false,
	        				callback : function(){
	        					window.location = '?productionId=' + result.productionId;
	        				}
	        			});
						unlockItms($('#btnSaveProduction').get(0));

					},
					error: function(xhr, textStatus, errorThrown) {
						// 解锁
						unlockItms($('#btnSaveProduction').get(0));
						showOperationError(xhr, textStatus, errorThrown);
					}
				});
			});
        },
        deleteProduction:function(pid){
        	// 锁定，防止重复提交
			if(!lockSmallBox()) {
				return;
			}
			$.ajax({
				url : $.url_root+'/production/deleteProduction.jspa',
				type : "post",
				traditional : true,
				dataType : 'json',
				data: {
					'productionId':pid
				},
				success: function(result){
					checkResult(result, {
						 message : "删除成功！",
	                     showBox : true,
        				 callback : function(){
        					 var parentPid=$("#nowParentId").val();
        					window.location = $.url_root+'/production/viewProductionTree.jspa?productionId=' + parentPid;
        				}
        			});
				},
				error: function(xhr, textStatus, errorThrown) {
					showOperationError(xhr, textStatus, errorThrown);
				}
			});
        },
        initValidation : function() {

			$.validator.addMethod("codeFormat", function(value, element) {  
			    var tel = /^[0-9a-zA-Z_-]+$/;
			    return this.optional(element) || (tel.test(value));
			}, "message");
			
			$.validator.addMethod("nameFormat", function(value, element) {  
			    var tel = /^[\u4e00-\u9fa5\.\sa-zA-Z0-9_-]+$/;
			    return this.optional(element) || (tel.test(value));
			}, "message");

			var $formCreateProduction = $("#save_production_form");
			$formCreateProduction.validate({
				ignore: ":not('.required-validation')",
				errorElement: "strong",
                errorClass: "note_error text-danger",
                focusCleanup: true,
                focusInvalid: true,
				rules:{
					productionCode:{
						codeFormat:[],
						maxlength: 200,
						remote:{
	                        url: $.url_root+"/production/checkProductionCode.jspa",
	                        type: "post",
	                        data: {
	                            'propertyName': "productionCode",
	                            'propertyVal':function(){
	                                return $formCreateProduction.find('input[name=productionCode]').val();
	                            }
	                        }
						}
					},
					productionName:{
						nameFormat:[],
						required:true,
						maxlength: 200
					}
				},
				messages: {
					productionCode:{
					  	codeFormat:"只接受由数字、26个英文字母或者下划线组成的字符串！",
					  	remote:"编号已存在！请重新输入！",
					  	maxlength: "字段最大允许200个字符"
				  	},
				  	productionName:{
				  		nameFormat:"名字只能使用字母，数字，汉字，'_'和'-''，请重新输入！",
					  	required:"产品名称不能为空！",
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
		initSaveFileUpload:function()
		{
		     $('#save_file_upload').fileupload({
		    	 	url:$.url_root+'/production/productionFileAttachementUpload.jspa',
		            dataType: 'json',
		            autoUpload: true,
		            maxFileSize: 10000000,// <1 MB
		           // acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i
		        }).on('fileuploadprocessalways', function (e, data) {
		            if(data.files.error){
		                if(data.files[0].error=="File is too large"){
		                   $.smallBox({
		                        title: "最大上传文件大小为 10.00 MB！",
		                        content: "",
		                        color: $boxColors.red,
		                        iconSmall: "fa fa-times",
		                        timeout: 2000
		                    });
		                }
		            }
		        }).on('fileuploaddone',function (e, data) {
		            var file=data.result;
		            $('#imageError').addClass('hidden');
		            var url =file.url;
		            var date = new Date();
		            var createTime =date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
		            var fileContent ="<tr>"
		                            +"<td><a href='"+$.url_root+"/production/productionFileAttachementDownload.jspa?filePath="+url+"&fileName="+file.uploadFileName+"'>"+file.uploadFileName+"</a></td>"
		                            +"<td>"+file.size+" B</td>"
		                            +"<td>"+createTime+"</td>"
		                            +"<td width='20' ><a class='deletefile' data-filepath='"+url+"' data-filename='"+file.uploadFileName+"' href='javascript:void(0);'><i class='fa fa-trash-o'></i>"
		                            +"</a></td>"
		                            +"<input type='hidden' class='filePath' name='filePath' value='"+url+"'>"
		                            +"<input type='hidden' class='fileName' name='fileName' value='"+file.uploadFileName+"'>"
		                            +"<input type='hidden' class='fileSize' name='fileSize' value='"+file.size+"'>"
		                            +"<input type='hidden' class='mimeType' name='mimeType' value="+file.uploadContentType+">"
		                            +"</tr>";

		            $('#save_fileAttachements tbody').prepend(fileContent);
		        });

		     $('#save_fileAttachements').on("click", ".deletefile", function(e) {
		            var $that = $(this);
		            $.ajax({
		            	url:$.url_root+"/production/deleteProductionFileAttachement.jspa",
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
        initTree : function() {
            $('.tree > ul').attr('role', 'tree').find('ul').attr('role', 'group');
            $('.tree').find('li:has(ul)').addClass('parent_li').attr('role', 'treeitem').find(' > span').off('click').on('click', function(e) {
            	// 停止事件传递
            	e.stopPropagation();
            	
            	var children = $(this).parent('li.parent_li').find(' > ul > li');
                if (children.is(':visible')) {
                    if ($(this).hasClass("parentClicked")) {
                        children.hide('fast');
                        $(this).find(' > i').removeClass().addClass('fa fa-lg fa-plus-circle');
                    }
                } else {
                    children.show('fast');
                    $(this).find(' > i').removeClass().addClass('fa fa-lg fa-minus-circle');
                    // 加载子产品
                	productions.loadSubTree($(this));
                }
            });

            // 树节点点击事件
            $('.tree li.parent_li > span').on('click', function(e) {
            	// 停止事件传递
            	e.stopPropagation();
            	clearSmallBox();
            	
            	//缓存当前的target
                $("body").data("tree-select-target", $(this));
                
                $('#update_production_form').removeClass('hidden');
    			$('#save_production_collapse').addClass('hidden');

            	// 如果目标结点已经是选中状态，则不处理
            	var me = $(this);
            	if(me.hasClass('parentClicked')) {
            		return;
            	}

            	// 配置点击效果
            	$('.tree li.parent_li > span').removeClass('parentClicked');
            	me.addClass('parentClicked');
            	
            	// 显示产品信息
            	productions.showProduction(me);
            	
            	
            });
            
            	productions.initDrawTreeById(reArr[0]);
		},
		loadSubTree : function($span) {
			var me = $span;

			$.ajax({
				url : $.url_root+'/production/findSubProductionTree.jspa',
				type : 'post',
				data : {
					'productionId' : me.attr('data-myId')
				},
				success : function(data) {
					checkResult(data, {
						message : "",
						showBox : false,
						callback : function(){
							// 填充子类、用例
							me.siblings('ul').html(data.template);

							// 标记为已加载
							me.attr('data-loaded', 'yes');

							// 重新绑定事件
							productions.initTree();
						}
					});
				},
				error: function(xhr, textStatus, errorThrown) {
					showOperationError(xhr, textStatus, errorThrown);
				}
			});
		},
		showProduction:function($span){
			var me = $span;
			$.ajax({
				url : $.url_root+'/production/findProductionDetail.jspa',
				type : 'post',
				//async: false,
				data : {
					'productionId' : me.attr('data-myId')
				},
				success : function(data) {
					checkResult(data, {
						message : "",
						showBox : false,
						callback : function(){
							var dto=data.productionDTO;
							var productionId=dto.productionId;
							var parentPid=dto.parentId;
							var parentProduction=dto.parentName == null ? "---" : dto.parentName;
							var productionCode = dto.productionCode;
							var productionName= dto.productionName == null ? "---" : dto.productionName;
							var productionManager=dto.productionManagerDTO==null? "---" : dto.productionManagerDTO.realName;
							var productionDesc= dto.description;
							var productionCreateTime = dto.createTime;
							var productionUpdateTime = dto.lastUpdateTime;
							var productionCreator = dto.creator || "---",
							    productionUpdater = dto.lastUpdater || "---";
							
							$("#productionId").val(productionId);
							$("#nowProductionName").val(dto.productionName);
							$("#nowParentId").val(parentPid);
							$('#parentProduction').attr('data-value', dto.parentId);
							$("#productionCode").html(productionCode);
							$("#productionName").html(productionName);
							$('#productionName').editable('setValue', productionName);
							$("#productionManager").html(productionManager);
							$('#productionManager').editable('setValue', dto.productionManager);
							$("#productionDesc").html(productionDesc);
							$("#productionCreateTime").html(productionCreateTime);
							$("#productionUpdateTime").html(productionUpdateTime);
							$("#productionCreator").html(productionCreator);
							$("#productionUpdater").html(productionUpdater);
							
							/*清空附件表*/
							$('#fileAttachements tbody').html("");
							/*加载附件*/
							productions.productionFilesToUpdate(dto.attachementsDTO);
							/*附件事件*/
							fileProductionId.id =productionId;
							
			    			productions.initParentProductions(dto.parentId,parentProduction);
							
						}
					});
				},
				error: function(xhr, textStatus, errorThrown) {
					showOperationError(xhr, textStatus, errorThrown);
				}
			});
			
		},
		productionFilesToUpdate:function(files){
			var fileContent=[];
			if(files==null){
				return;
			}
			for(var i=0, len = files.length;i<len;i++){
				fileContent[i] ="<tr>"
	                +"<td><a href='"+$.url_root+"/production/productionFileAttachementDownload.jspa?fileAttachementId="+files[i].fileAttachementId+"'>"+files[i].fileName+"</a></td>"
	                +"<td >"+files[i].fileSize+" B</td>"
	                +"<td >"+files[i].createTime+"</td>"
	                +"<td width='20' ><a class='deletefile' data-filepath='"+files[i].filePath+"' data-fileAttachementId='"+files[i].fileAttachementId+"' data-attachmentname='"+files[i].fileName+"' href='javascript:void(0);'><i class='fa fa-trash-o'></i>"
	                +"</a></td>"
	                +"</tr>";
			}

			$('#fileAttachements tbody').prepend(fileContent.join(""));
			
		},
		initUpdateFileUpload:function()
		{
		     $('#file-upload').off('click').fileupload({
		            url:$.url_root+'/production/productionFileAttachementUpload.jspa',
		            dataType: 'json',
		            autoUpload: true,
		            maxFileSize: 10000000,// <10 MB
		            //formData:{"productionId":fileProductionId.id},
			        add: function (e, data) {
			        	data.formData = {"productionId":fileProductionId.id}; // e.g. {id: 123}
			            data.submit();
		            },
		        }).on('fileuploadprocessalways', function (e, data) {
		            if(data.files.error){
		                if(data.files[0].error=="File is too large"){
		                   $.smallBox({
		                        title: "最大上传文件大小为 10.00 MB！",
		                        content: "",
		                        color: $boxColors.red,
		                        iconSmall: "fa fa-times",
		                        timeout: 2000
		                    });
		                }
		                /*if(data.files[0].error=="File type not allowed"){
		                    $.smallBox({
		                        title: "上传文件类型不对！",
		                        content: "",
		                        color: $boxColors.red,
		                        iconSmall: "fa fa-times",
		                        timeout: 2000
		                    });
		                }*/
		            }
		        }).on('fileuploaddone',function (e, data) {
		            var file=data.result;
		            var url =file.url;
		            var date = new Date();
		            var createTime =date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
		            var fileContent ="<tr>"
		                            +"<td><a href='"+$.url_root+"/production/productionFileAttachementDownload.jspa?fileAttachementId="+file.fileAttachementId+"'>"+file.uploadFileName+"</a></td>"
		                            +"<td >"+file.size+" B</td>"
		                            +"<td >"+createTime+"</td>"
		                            +"<td width='20' ><a class='deletefile' data-filepath='"+url+"' data-fileAttachementId='"+file.fileAttachementId+"' data-attachmentname='"+file.uploadFileName+"' href='javascript:void(0);'><i class='fa fa-trash-o'></i>"
		                            +"</a></td>"
		                            +"<input type='hidden' class='filePath' name='filePath' value='"+url+"'>"
		                            +"<input type='hidden' class='fileName' name='fileName' value='"+file.uploadFileName+"'>"
		                            +"<input type='hidden' class='fileSize' name='fileSize' value='"+file.size+"'>"
		                            +"<input type='hidden' class='mimeType' name='mimeType' value="+file.uploadContentType+">"
		                            +"</tr>";

		            $('#fileAttachements tbody').prepend(fileContent);
		        });

		     $('#fileAttachements').on("click", ".deletefile", function(e) {
		            clearSmallBox();
	
			    	var $that = $(this);
	                msgBox.showBox({
	                    title: "删除附件" + "<strong>" + $that.data("attachmentname") + "</strong>",
	                    color: "ERROR",
	                     icon: "BELL",
	                     content: "你即将删除该附件。<br>确认要删除吗? <p class='text-align-right'><a href='javascript:;' class='btn btn-danger btn-sm deleteAction'>是</a> <a href='javascript:;' class='btn btn-primary btn-sm'>否</a></p>",
	                     target: ".deleteAction",
	                     callback: function() {
	                        $.ajax({
	                        	url:$.url_root+"/production/deleteProductionFileAttachement.jspa",
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
	                                        $('#fileName').val("");
	                                    }
	                               });
	                            }
	                        });
	                     }
	                });
		     });
		},
		
		initUserList : function() {
			 $.ajax({
				 url : $.url_root+"/production/selectManager.jspa",
               dataType : "json",
               async: false,
               type: "POST",
               success : function(data) {
               	var dtos = data.resultList;
               	for(var i=0, len = dtos.length;i<len;i++){
               		managers.push({id:dtos[i].name,text: dtos[i].realName});
               	}
               }
           });
		 },
		 initParentProductions:function(parentId,paerentName)
		 {
			 var productionId=$("#productionId").val();
			 parents.splice(0);
			 if(productionId!=null&&productionId!=""){
				 $.ajax({
					 url : $.url_root+"/production/selectParentProduction.jspa",
	               dataType : "json",
	               //async: false,
	               type: "POST",
	               data : {
						'productionId' : productionId
					},
	               success : function(data) {
		               	var dtos = data.productionsQueryResult;
		               	for(var i=0, len = dtos.length;i<len;i++){
		               		parents.push({id:dtos[i].productionId,text: dtos[i].productionName,code:dtos[i].productionCode});
		               	}
						 $('#parentProduction').html(paerentName);
						 $('#parentProduction').editable('setValue', parentId);
	               }
	           });
			 }
		 },
		initEditable : function() {
			$.fn.editable.defaults.mode = 'inline';
			$.fn.editable.defaults.url = $.url_root+'/production/updateProduction.jspa';
			$.fn.editableContainer.defaults.onblur = "submit"; //submit the value when click outside the container
	        $.fn.editable.defaults.emptytext = "---"; // set to '-' when no content
	        $.fn.editable.defaults.ajaxOptions = {
					error: function(xhr, textStatus, errorThrown) {
						showOperationError(xhr, textStatus, errorThrown);
					}
				};

			$("a[data-type='text'].gt0").editable({
			    params: function(params) {
			        var customParams = {};
			        customParams["productionDTO.productionId"] = $("#productionId").val();
			        customParams[params.name] = params.value;
			        return customParams;
			    },
			    validate: function(value) {
			    	var regex = /^[\u4e00-\u9fa5\.\sa-zA-Z0-9_-]+$/;
			    	if ($(this).data("required")) {
    			    	if($.trim(value) === '') {
    					    return '产品名称不能为空！';
    			    	}
			    	}
			    	
			    	var maxLength = $(this).data("maxLength");
                    if ($.trim(value).length > maxLength) {
                        return "字段最大允许" + maxLength + "个字符";
                    }
                    
			    	if(!regex.test(value)) {
			    		return "只能使用字母，数字，汉字，'_'和'-''，请重新输入！";
			    	}
			    },
			    success: function(response, newValue) {
			    	checkResult(response, {
						message : "更新成功！",
						showBox : true,
						callback : function(){
							 var $target = $("body").data("tree-select-target");
		                       // var pid = target.data("myid");
		                        //将更改后的名称设置到左侧相应的树中
							 $target.children("div").html(newValue);
						}
					});
                }
			});
			
			$('#productionManager').editable({
				ajaxOptions: {
			        traditional: true
			    },
			    source: managers,
			    select2: {
			    	allowClear: true,
			        width: 200,
			        multiple: false,
			        formatResult :function(object, container, query){
			        	console.log(query);
			            var html = " 登录名：" + object.id+"<br/>"+"用户名：" + object.text;
			            return html;
			        },
			        formatSelection : function(object, container){
			            var realName = object.text == undefined ? "" : object.text;
			            var html = " " + realName;
			            html += (object.id ?  " [ " + object.id + " ]" : "");
			            return html;
			        },
			        matcher: function(term, text, opt) {
			        	return opt.id.toUpperCase().indexOf(term.toUpperCase())>=0
			        	|| text.toUpperCase().indexOf(term.toUpperCase())>=0;
			       }
			    },
			    params: function(params) {
			        var customParams = {};
			        customParams["productionDTO.productionId"] = $("#productionId").val();
			        customParams[params.name] = params.value;
			        return customParams;
			    },
			    success: function(response, newValue) {
			    	checkResult(response, {
						message : "更新成功！",
						showBox : true,
						callback : function(){
						}
					});
                }
			});
			
			$('#parentProduction').editable({
				ajaxOptions: {
			        traditional: true
			    },
			    source: parents,
			    select2: {
			    	allowClear: true,
			        width: 200,
			        multiple: false,
			        formatResult :function(object, container, query){
			        	var html = "产品编号：" + object.code+"<br/>"+"产品名称：" + object.text;
			            return html;
			        },
			    },
			    params: function(params) {
			        var customParams = {};
			        customParams["productionDTO.productionId"] = $("#productionId").val();
			        var parentId=params.value;
			        if(parentId==null||parentId==""){
			        	parentId=-1;
			        }
			        customParams[params.name] = parentId;
			        return customParams;
			    },
			    success: function(response, newValue) {
			    	checkResult(response, {
						message : "",
						showBox : false,
						callback : function(){
							 var $target = $("body").data("tree-select-target");
		                     var pid = $target.data("myid");
		                   //打开其更新后的树
	                        window.location = $.url_root+'/production/viewProductionTree.jspa?productionId=' + pid;
						}
					});
                }
			});
		},
		
    };
}());
