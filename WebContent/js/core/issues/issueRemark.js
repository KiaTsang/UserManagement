/**
 * FileName: issueRemark.js
 *
 * File description goes here.
 *
 * Copyright (c) 2010 Asiasoft, Inc. All Rights Reserved.
 *
 * @author <a href="mailto:qiqu.huang@iaspec.net">Charlie Huang</a>
 * @Version: 1.0.0
 * @DateTime: 2014-07-09
 */

var issueRemark = function() {

	return {
		findIssueRemarkRecords: function() {
			$.ajax({
				global: false,
				url: $.url_root + "/issue/findIssueRemarkRecord.jspa",
				type: "POST",
				dataType: "json",
				data: {
					"issueRemarkRecordDTO.issueId": $("#issueId").val()
				},
				success: function(result) {
					checkResult(result, {
						showBox: false,
						callback: function() {
							// when success
							if (result.issueRemarkRecordResults != null) {
								$(".issueRemarkRecord").empty();
								for (var i = 0; i < result.issueRemarkRecordResults.length; i++) {
									var data = result.issueRemarkRecordResults[i];
									var content = common.placeholderConversion({
										"msg": i18nRes.issue.issueComment.content,
										"args": [data.creator, i18n.getIssueRemarkTypeBackground(data.issueRemarkType), i18nRes.issue.issueRemarkType[data.issueRemarkType]]
									});
									var date = data.createTime;
									var dateTime = new Date(date);
									var month = dateTime.getMonth() + 1;
									var remark = data.remark != undefined ? data.remark + "。" : "";
									if(data.issueRemarkType ==  "REASSIGN")
									{
										content = common.placeholderConversion({
											"msg": i18nRes.issue.issueComment.reassignContent,
											"args": [data.creator]
										});
									}
									if(data.issueRemarkType ==  "SUBMIT")
									{
										content = common.placeholderConversion({
											"msg": i18nRes.issue.issueComment.submitContent,
											"args": [data.creator]
										});
									}
									var html =
										'<div class="col-xs-2 col-sm-1">' + '<time datetime="2014-09-20" class="icon">' + '<strong>' + month + '月</strong>' + '<span>' + dateTime.getDate() + '</span>' + '</time></div>' + '<div class="col-xs-10 col-sm-11">' + '<h6 class="no-margin"><a href="javascript:void(0);">' + i18n.il8nIssueRemarkResultType(data.issueRemarkType) + '</a></h6>' + '<p>' + content + '</p>' + '<blockquote><p class="break-all">' + remark + '</p></blockquote><small>' + common.formatDateTime(data.createTime) + '</small>' + '</div>' + '<div class="col-sm-12"><hr></div>';
									$(".issueRemarkRecord").append($(html));
								}
							}
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
