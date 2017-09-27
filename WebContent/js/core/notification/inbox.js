/*
 * @(#)TaskAction.java
 *
 * Copyright (c) 2014 iASPEC. All Rights Reserved.
 * 
 * @version 1.00 2014-09-04
 * @author <a href="mailto:kunwei.zheng@iaspec.com">Kevin Zheng</a>
 */

var InboxList = function(){
	var postData = {};

	return {
		getPostData : function() {
			return postData;
		},
		setPostData : function(result) {
			postData.startIndex = result.startIndex;
			postData.pageSize = result.pageSize;
			postData.totalCount = result.totalCount;
			postData.unreadCount = result.unreadCount;

			var remain = postData.totalCount % postData.pageSize;
			if(remain === 0) {
				postData.pageCount = postData.totalCount / postData.pageSize;
			}else {
				postData.pageCount = Math.floor(postData.totalCount / postData.pageSize) + 1;
			}
		},
		resetPostData : function(status) {
			var tmp = {
				'startIndex' : 1,
				'pageSize' : 20,
				'totalCount' : 0,
				'pageCount' : 0,
				'unreadCount' : 0,
				'status' : 'UNREAD'
			};
			tmp.status = status;

			postData = {};
			$.extend(postData, tmp);
		},
		init : function() {
			$(window).resize(function() {
			    InboxList.tableHeightSize()
			});
			
			InboxList.resetPostData('UNREAD');
			
			var mid=$("#infoMid").val();
			if(mid!=null&&mid!=""){
				InboxList.updateMessageAsRead(mid);
			}else{
				// 默认加载数据
				InboxList.loadMessages();
			}

			// 初始化事件绑定
			InboxList.initEvent();
		},
		loadMessages : function() {
			$.ajax({
			    method: "POST",
			    url: $.url_root+"/notification/findMessages.jspa",
			    datatype: "json",
			    data: InboxList.getPostData(),
			    success: function (result) {
			        checkResult(result, {
			        	message : "",
			        	showBox : false,
			        	callback : function(){
			        		$('.table-wrap').html(result.messages);

			        		// 调整高度
			        		InboxList.tableHeightSize();

			        		// 缓存分页数据
			        		InboxList.setPostData(result);

			        		// 设置分页描述数据
			        		InboxList.setPagedDesc(result);

			        		// 绑定事件
			        		InboxList.bindEvent();
			        	}
			        });
			    },
			    error: function(xhr, textStatus, errorThrown) {
			    	showOperationError(xhr, textStatus, errorThrown);
			    }
			});
		},
		findTopMessages : function(result) {
			$.ajax({
				url: $.url_root+"/notification/findTopMessages.jspa",
				type : 'post',
				traditional: true,
				data : {
					'pageSize' : 3
				},
				success : function(data) {
					checkResult(data, {
						message : '',
						showBox : false,
						callback : function(){
							//先清除原有的li[data-biz-id]
							$("#notifyUL li[data-biz-id]").remove();
							// 刷新
							$("#notifyUL li").eq(1).before(data.messages);
							// top消息列表事件
							InboxList.topEventMessageInfo();
						}
					});
				},
				error: function(xhr, textStatus, errorThrown) {
					showOperationError(xhr, textStatus, errorThrown);
				}
			});
		},
		updateMessageAsRead : function(id) {
			$.ajax({
				url: $.url_root+"/notification/markAsRead.jspa",
				type : 'post',
				traditional: true,
				data : {
					'messageIds' : id
				},
				success : function(data) {
					checkResult(data, {
						message : '',
						showBox : false,
						callback : function(){
							//刷新
							//window.location.href=window.document.location.href;
							
							//信息详情
							InboxList.findMessageDetail(id);
							
							// 涮新TOP的通知信息列表
			        		InboxList.findTopMessages();
						}
					});
				},
				error: function(xhr, textStatus, errorThrown) {
					showOperationError(xhr, textStatus, errorThrown);
				}
			});
		},
		findMessageDetail : function(id) {
			$.ajax({
				url: $.url_root+"/notification/findMessageDetail.jspa",
				type : 'post',
				traditional: true,
				data : {
					'messageId' : id
				},
				success : function(result) {
					checkResult(result, {
						message : '',
						showBox : false,
						callback : function(){
							$("#detailDelId").val(id);
							
							$('.table-wrap').html(result.messages);
							
							$('.unreadCount').html(result.unreadCount);
							
							//$(".optionMenu2").removeClass('hidden');
							$(".optionMenu1").addClass('hidden');
							
							$("#btnShowUnread").removeClass('active');
							$("#btnShowRead").removeClass('active');
							
						}
					});
				},
				error: function(xhr, textStatus, errorThrown) {
					showOperationError(xhr, textStatus, errorThrown);
				}
			});
		},
		setPagedDesc : function(result) {
			var postData = InboxList.getPostData();
			var startIndex = postData.startIndex;
			var pageSize = postData.pageSize;
			var totalCount = postData.totalCount;
			var pageCount = postData.pageCount;
			var unreadCount = postData.unreadCount;

			var begin = (startIndex - 1) * pageSize + 1;
			var end = startIndex * pageSize;
			if(startIndex == pageCount) {
				end = totalCount;
			}
			var info = common.placeholderConversion({
				'msg' : '第{0} - 第{1}, 共{2}条消息',
				'args' : [begin, end, totalCount]
			});

			if(postData.totalCount == 0) {
				info = '共0条消息';
			}
			$('#pagingInfo').html(info);
			$('.unreadCount').html(unreadCount);
		},
		initEvent : function() {
			$('#btnPrev').on('click', function(e){
				var postData = InboxList.getPostData();
				if(postData.startIndex <= 1) {
					return;
				}
				postData.startIndex = postData.startIndex - 1;
				InboxList.loadMessages();
			});

			$('#btnNext').on('click', function(e){
				var postData = InboxList.getPostData();

				if(postData.startIndex >= postData.pageCount) {
					return;
				}
				postData.startIndex = postData.startIndex + 1;
				InboxList.loadMessages();
			});

			$('#btnShowUnread').on('click', function(e) {
				if($(this).hasClass('active')) {
					return;
				}
				//$(".optionMenu2").addClass('hidden');
				$(".optionMenu1").removeClass('hidden');
				
				$(this).siblings('li').removeClass('active');
				$(this).addClass('active');

				// 加载未读消息
				InboxList.resetPostData('UNREAD');
				InboxList.loadMessages();
			});

			$('#btnShowRead').on('click', function(e) {
				if($(this).hasClass('active')) {
					return;
				}
				
				//$(".optionMenu2").addClass('hidden');
				$(".optionMenu1").removeClass('hidden');
				
				$(this).siblings('li').removeClass('active');
				$(this).addClass('active');

				// 加载已读消息
				InboxList.resetPostData('READ');
				InboxList.loadMessages();
			});

			$('#btnSelectAll').on('click', function(e) {
				$("#inbox-table>tbody>tr").find('input[type=checkbox]').prop('checked', true);
			});

			$('#btnSelectNone').on('click', function(e) {
				$("#inbox-table>tbody>tr").find('input[type=checkbox]').prop('checked', false);
			});

			$('#btnSelectReverse').on('click', function(e) {
				$("#inbox-table>tbody>tr").find('input[type=checkbox]').each(function(index, element){
					var isChecked = $(this).prop('checked');
					$(this).prop('checked', !isChecked);
				})
			});

			$('#btnMarkAsRead').on('click', function(e) {
				var ids = InboxList.getCheckedIds();
				if(ids.length == 0) {
					$.smallBox({
					    title : i18nRes.global.select,
					    color : $boxColors.yellow,
					    //timeout: 8000,
					    iconSmall : "fa fa-times"
					});
					return;
				}

				$.ajax({
					url: $.url_root+"/notification/markAsRead.jspa",
					type : 'post',
					traditional: true,
					data : {
						'messageIds' : ids
					},
					success : function(data) {
						checkResult(data, {
							message : '',
							showBox : false,
							callback : function(){
								// 刷新
								InboxList.loadMessages();
								
								// 涮新TOP的通知信息列表
				        		InboxList.findTopMessages();
							}
						});
					},
					error: function(xhr, textStatus, errorThrown) {
						showOperationError(xhr, textStatus, errorThrown);
					}
				});
			});

			$('#btnMarkAsUnread').on('click', function(e) {
				var ids = InboxList.getCheckedIds();
				if(ids.length == 0) {
					$.smallBox({
					    title : i18nRes.global.select,
					    color : $boxColors.yellow,
					    //timeout: 8000,
					    iconSmall : "fa fa-times"
					});
					return;
				}

				$.ajax({
					url: $.url_root+"/notification/markAsUnread.jspa",
					type : 'post',
					traditional: true,
					data : {
						'messageIds' : ids
					},
					success : function(data) {
						checkResult(data, {
							message : '',
							showBox : false,
							callback : function(){
								// 刷新
								InboxList.loadMessages();
								
								// 涮新TOP的通知信息列表
				        		InboxList.findTopMessages();
							}
						});
					},
					error: function(xhr, textStatus, errorThrown) {
						showOperationError(xhr, textStatus, errorThrown);
					}
				});
			});

			$('#btnDelete').on('click', function(e) {
				var ids = InboxList.getCheckedIds();
				if(ids.length == 0) {
					$.smallBox({
					    title : i18nRes.global.select,
					    color : $boxColors.yellow,
					    //timeout: 8000,
					    iconSmall : "fa fa-times"
					});
					return;
				}
				$.smallBox({
				    title : i18nRes.global.confirm.title,
				    content : '确定删除消息吗？' + " <p class='text-align-right'><a href='javascript:void(0);' onclick='InboxList.deleteMessage();' class='btn btn-danger btn-sm'>"+i18nRes.global.yes+"</a> <a href='javascript:void(0);'  class='btn btn-primary btn-sm'>"+i18nRes.global.no+"</a></p>",
				    color : $boxColors.blue,
				    //timeout: 8000,
				    icon : "fa fa-bell swing animated"
				});
			});
			
			$('#btnDetailDelete').on('click', function(e) {
				var id = $("#detailDelId").val();
				$.smallBox({
					title : i18nRes.global.confirm.title,
					content : '确定删除消息吗？' + " <p class='text-align-right'><a href='javascript:void(0);' onclick='InboxList.deleteDetailMessage("+id+");' class='btn btn-danger btn-sm'>"+i18nRes.global.yes+"</a> <a href='javascript:void(0);'  class='btn btn-primary btn-sm'>"+i18nRes.global.no+"</a></p>",
					color : $boxColors.blue,
					//timeout: 8000,
					icon : "fa fa-bell swing animated"
				});
			});
			
			$('#btnRefresh').on('click', function(e) {
				InboxList.loadMessages();
			});
		},
		bindEvent : function() {
			$("#inbox-table>tbody>tr").click(function(obj){
			    var checkbox = $(this).find('input[type=checkbox]');
			    var isChecked = checkbox.prop('checked');
			    checkbox.prop('checked', !isChecked);
			});
			// 查看消息详情
			$("#inbox-table>tbody>tr").find('.inbox-data-message').find('div > span').on('click', function(e){
				e.stopPropagation();

				var row = $(this).parents('.inbox-data-message').parent();
				var id=row.attr('data-biz-id');
				InboxList.updateMessageAsRead(id);
				/*$.ajax({
					url: $.url_root+"/notification/markAsRead.jspa",
					type : 'post',
					traditional: true,
					data : {
						'messageIds' : id
					},
					success : function(data) {
						checkResult(data, {
							message : '',
							showBox : false,
							callback : function(){
								//刷新
								//window.location.href=window.document.location.href;
								
								//信息详情
								InboxList.findMessageDetail(id);
								
								// 涮新TOP的通知信息列表
				        		InboxList.findTopMessages();
							}
						});
					},
					error: function(xhr, textStatus, errorThrown) {
						showOperationError(xhr, textStatus, errorThrown);
					}
				});*/
			});
		},
		topEventMessageInfo:function() {
	        $("#notifyUL").find('li').off('click').on('click', function(){
	            var id = $(this).attr('data-biz-id');
	            var url=$.url_root+"/notification/inbox.jspa";
	            if(id!=null&&id!="undefine"){
	            	url = $.url_root+"/notification/inbox.jspa?messageId="+id;
	            }
	            location.href = url;
	        });
	    },
		tableHeightSize : function() {
			var tableHeight = $(window).height() - 212;
			$('.table-wrap').css('height', tableHeight + 'px');
		},
		getCheckedIds : function() {
			var ids = [];
			$("#inbox-table>tbody>tr").each(function(index, element){
				var checkbox = $(this).find('input[type=checkbox]');
				if(!checkbox.prop('checked')) {
					return;
				}
				ids.push($(this).attr('data-biz-id'));
			});
			return ids;
		},
		deleteMessage : function()
		{
			var ids = InboxList.getCheckedIds();
			if(ids.length == 0) {
				return;
			}

			$.ajax({
				url: $.url_root+"/notification/deleteMessages.jspa",
				type : 'post',
				traditional: true,
				data : {
					'messageIds' : ids
				},
				success : function(data) {
					checkResult(data, {
						message : '删除消息成功！',
						showBox : true,
						callback : function(){
							// 刷新
							InboxList.loadMessages();
							
							// 涮新TOP的通知信息列表
			        		InboxList.findTopMessages();
						}
					});
				},
				error: function(xhr, textStatus, errorThrown) {
					showOperationError(xhr, textStatus, errorThrown);
				}
			});
		},
		deleteDetailMessage : function(id)
		{
			var ids=[];
			ids.push(id);
			$.ajax({
				url: $.url_root+"/notification/deleteMessages.jspa",
				type : 'post',
				traditional: true,
				data : {
					'messageIds' : ids
				},
				success : function(data) {
					checkResult(data, {
						message : '删除消息成功！',
						showBox : true,
						callback : function(){
							
							//$(".optionMenu2").addClass('hidden');
							$(".optionMenu1").removeClass('hidden');
							// 刷新
							InboxList.loadMessages();
							
							// 涮新TOP的通知信息列表
							InboxList.findTopMessages();
						}
					});
				},
				error: function(xhr, textStatus, errorThrown) {
					showOperationError(xhr, textStatus, errorThrown);
				}
			});
		}
	};
}();