/**
 * FileName: issueCard.js
 *
 * File description goes here.
 *
 * Copyright (c) 2010 Asiasoft, Inc. All Rights Reserved.
 *
 * @author <a href="mailto:qiqu.huang@iaspec.net">Charlie.Huang</a>
 * @Version: 1.0.0
 * @DateTime: 2014-08-14
 */

var label = (function() {
	return {
		initialize: function() {
			this._initGroupSelect2SelectedEvent();
			var form = this._initValidation();
			this._initializeEventBinding(form);
			this._initGroupDeletionDialogYesClickEvent();
			this._initGroupPanelDeletionClickEvent();
			this._initLabelDeletionClickEvent();
			this._initGroupPanelEditClickEvent();
			this._initLabelsOfGroupPanelEditClickEvent($.url_root + "/issue/validateLabel.jspa");
			this._initGroupEditorBtnClickEvent();
			this._initLabelsOfGroupEditorBtnClickEvent();
			this._initIssueTypeClickEvent();

			$(document).on("click", function(e) {
				$(".myPopover").popover("hide");
			});
		},
		
		_isFormValid: function() {
		    return this.numberOfInvalids() === 0;
		},
		
		_isSpecificEleValid: function($ele) {
		    return this.element($ele);
		},

		_initValidation: function() {
		    var that = this,
			    form = $("#formAddGroup").validate({
				onsubmit: false,
				ignore: ":not('.required-validation')", //指定验证时要忽略哪些元素，默认是hidden，支持jQuery的伪类选择器，需要为应用该验证器的元素加上.required-validation
				errorElement: "strong",
				errorClass: "text-danger",
				focusCleanup: true,
				focusInvalid: true,
				
				onkeyup: function(element, event) {
				    if ($(".labelCategory").select2("val")) {
				        if ($(element).hasClass("labelContent")) {
				            that._validElement.call(this, element);
				        }
				    }
				},
				
				onfocusout: false,
				
				rules: {
					"issueLabel.name": {
						required: true,
						remote: {
							url: $.url_root + "/issue/validateLabel.jspa",
							dataType: "json",
							type: "POST",
							data: {
								"labelGroupId": function() {
									return $(".labelCategory").select2("val");
								},
								
								"labelText": function() {
									return $(".labelContent").val();
								}
							}
						},
						maxlength: 200
					},
					
					"issueLabel.labelGroupDTO.labelGroupId": {
						required: true,
						remote: {
                            url: $.url_root + "/issue/valGroupname.jspa",
                            dataType: "json",
                            type: "POST",
                            data: {
                                "groupName": function() {
                                    return $(".labelCategory").select2("data").text;
                                },
                                
                                "labelGroupId": function() {
                                    return $(".labelCategory").select2("val");
                                }
                            }
                        }
					}
				},
				messages: {
					"issueLabel.name": {
						required: validation.label.labelContentCannotEmpty,
						remote: validation.label.contentIsExisted,
						maxlength: "字段最大允许200个字符"
					},
					"issueLabel.labelGroupDTO.labelGroupId": {
						required: validation.labelGroup.labelGroupCannotEmpty,
						remote: validation.labelGroup.groupNameIsExisted
					}
				},
				
				highlight: function(element, errorClass) {
					$(element).parent().addClass("has-error");
				},
				
				unhighlight: function(element, errorClass) {
					$(element).parent().removeClass("has-error");
				},
				
				errorPlacement: function($errorContent, $element) {
					if ($element.hasClass("labelCategory")) {
						$errorContent.insertAfter($element);
						return;
					}

					$errorContent.insertAfter($element.parent());
				}
			});
			return form;
		},

		_initIssueTypeClickEvent: function() {
			$("#taskTypeList").on("click", ".taskType", function(e) {
				$("#taskTypeList").find(".taskType").removeClass("selected");
				$(this).toggleClass("selected");
				var compId = $(this).attr("id");
				if (compId == 'taskType_platform') {
					$(".labelCategory").attr("data-url", $.url_root + "/issue/findDefaultLabelGroupsForCard.jspa").data("url", $.url_root + "/issue/findDefaultLabelGroupsForCard.jspa");
					$(".labelCategory").attr("data-scope", "CARD").data("scope", "CARD");
				} else if (compId == 'taskType_industry') {
					$(".labelCategory").attr("data-url", $.url_root + "/issue/findDefaultLabelGroupsForSystem.jspa").data("url", $.url_root + "/issue/findDefaultLabelGroupsForSystem.jspa");
					$(".labelCategory").attr("data-scope", "SYSTEM").data("scope", "SYSTEM");
				} else if (compId == 'taskType_whitebox') {
					$(".labelCategory").attr("data-url", $.url_root + "/issue/findDefaultLabelGroupsForWhitebox.jspa").data("url", $.url_root + "/issue/findDefaultLabelGroupsForWhitebox.jspa");
					$(".labelCategory").attr("data-scope", "WHITEBOX").data("scope", "WHITEBOX");
				}
				issueCommon.initRemoteSearchSelector();
				e.stopPropagation();
			});
		},

		_initLabelsOfGroupEditorBtnClickEvent: function(e) {
			var self = this;
			$(".group-info").on("click", ".btnEditFieldUpdate", function(e) {
			    e.stopPropagation();
				var $input = $(this).parent().prev();
				if (self._validForm($(this).closest(".smallForm1"))) {
				    self._updateLabelNameById($input.val(), $input.data("labelId"), $input.data("groupId"));
				}
			});
		},
		
		_validForm: function($form) {
		    return $form.valid();
		},
		
		_validElement: function(ele) {
		    if ("element" in this) {
		        return this.element(ele);
		    }
		    
		    throw new Error("no method named element!");
		},

		_initGroupEditorBtnClickEvent: function() {
			var self = this;
			$(".group-info").on("click", ".btnEditGroupSave", function(e) {
			    e.stopPropagation();
				var $input = $(this).parent().prev("input");
				if (self._validForm($(this).closest("form"))) {
				    self._updateLabelGroupNameById($input.val(), $input.data("groupId"))
				}
			});

			$(".group-info").on("click", ".btnEditFieldAddOption", function(e) {
			    e.stopPropagation();
				var $input = $(this).parent().prev("input"),
				    result = self._validElement.call($(".smallForm").validate(), "input[name=fieldItemTextEdit]");
				if (result) {
				    var html = '<tr class="trFieldItem newRow">' + '<td><span class="fieldItemText">' + $input.val() + '</span><div class="fieldItemEditWrapper hidden">' + '<input class="form-control" type="text" value="' + $input.val() + '">' + '</div></td>' + '<td><span class="txt-color-red pull-right btnOptionOper btnDeleteOption"><i class="fa fa-lg fa-times"></i></span>' + '<span class="pull-right btnOptionOper btnEditOption" style="margin-right: 5px;"><i class="fa fa-lg fa-pencil"></i></span>' + '<span class="pull-right btnEditOptionOper btnEditOptionCancel hidden"><i class="fa fa-lg fa-ban"></i></span>' + '<span class="pull-right btnEditOptionOper btnEditOptionSave hidden" style="margin-right: 5px;"><i class="fa fa-lg fa-check"></i></span>' + '</td></tr>';
	                $(html).prependTo($(".labelList"));
	                $input.val(""); //清空文本
				}
			});

			//编辑按钮，针对于下拉框类型的处理
			$(".group-info").on("click", ".btnEditOption", function(e) {
				var $td = $(this).parent("td");
				self._setSelectedLabelId($(this).closest("tr").data("fieldlabelid"));
				$td.find(".btnOptionOper").add($td.prev().children(".fieldItemText")).addClass("hidden");
				$td.find(".btnEditOptionOper").add($td.prev().children(".fieldItemEditWrapper")).removeClass("hidden");
				e.stopPropagation();
			});

			//删除按钮，针对于下拉框类型的处理
			$(".group-info").on("click", ".btnDeleteOption", function(e) {
				var $tr = $(this).closest("tr");
				if (!$tr.hasClass("newRow")) {
					$tr.addClass("hidden");
				} else {
					$tr.remove();
				}
				self._resetSelectedLabelId();
				e.stopPropagation();
			});

			//编辑取消按钮，针对于下拉框类型的处理
			$(".group-info").on("click", ".btnEditOptionCancel", function(e) {
				var $td = $(this).parent("td"),
				$fieldItemText = $td.prev().children(".fieldItemText")
				validator = $(".smallForm").validate();
				$td.find(".btnOptionOper").add($fieldItemText).removeClass("hidden");
				$td.find(".btnEditOptionOper").add($td.prev().children(".fieldItemEditWrapper")).addClass("hidden");
				$td.prev().find("input").val($fieldItemText.html());
				validator.resetForm();
				self._resetSelectedLabelId();
				e.stopPropagation();
			});

			//编辑保存按钮，针对于下拉框类型的处理
			$(".group-info").on("click", ".btnEditOptionSave", function(e) {
			    e.stopPropagation();
				var $td = $(this).parent("td"),
				$fieldItemText = $td.prev().children(".fieldItemText"),
				$input = $td.prev().find("input"),
				validator = $(".smallForm").validate();
				
				if (self._validElement.call(validator, $input[0])) {
    				if ($input.val() != $fieldItemText.html()) {
    					$fieldItemText.html($input.val());
    					$(this).closest("tr").addClass("updateRow"); //表示该文本被修改过
    				}
    				$td.find(".btnOptionOper").add($fieldItemText).removeClass("hidden");
    				$td.find(".btnEditOptionOper").add($td.prev().children(".fieldItemEditWrapper")).addClass("hidden");
				    self._resetSelectedLabelId();
				}
			});

			//点击确定按钮，针对于下拉框类型的处理
			$(".group-info").on("click", ".btnEditFieldSave", function(e) {
			    e.stopPropagation();
				var newLabels = [],
				    updateLabels = [],
				    deletedLabels = [],
				    validator = $(".smallForm").validate();
				    groupTitleValidatedResult = self._validElement.call(validator, ".fieldItemTitleEdit");
				if (groupTitleValidatedResult) {
    				$(".labelList").find("tr").each(function(i, v) {
    					if ($(this).hasClass("hidden")) {
    						deletedLabels.push({
    							"labelId": $(this).data("fieldlabelid")
    						});
    					} else if ($(this).hasClass("newRow")) {
    						newLabels.push({
    							"labelGroupId": $(".btn-group-deleted").data("groupid"),
    							"text": $(this).find("span").html(),
    							"labelType": "SELECTOR"
    						});
    					} else if ($(this).hasClass("updateRow")) {
    						updateLabels.push({
    							"labelId": $(this).data("fieldlabelid"),
    							"text": $(this).find(".fieldItemText").html(),
    							"labelType": "SELECTOR"
    						});
    					}
    				});
    
    				if ($(".fieldItemTitleEdit").val() != $("body").data("groupName")) {
    					self._updateLabelGroupNameById($(".fieldItemTitleEdit").val(), $(".btn-group-deleted").data("groupid"));
    				}
    
    				self._updateMultiLabelsById(updateLabels);
    				self._createMultiLabels(newLabels);
    				self._deleteMultipleLabels(deletedLabels);
    				self._findLabelsByGId($(".btn-group-deleted").data("groupid"));
				}
			});

			//点击取消按钮，针对于下拉框类型的处理
			$(".group-info").on("click", ".btnEditFieldCancel", function(e) {
				$(".edit-group-icon").popover("hide");
				e.stopPropagation();
			});
		},

		_deleteMultipleLabels: function(deletedLabels) {
			var self = this;
			if (deletedLabels.length) {
				$.ajax({
					url: $.url_root + "/issue/deleteMultipleLabels.jspa",
					dataType: "json",
					type: "POST",
					async: false,
					data: {
						beanString: JSON.stringify(deletedLabels)
					},
					success: function(data) {
						checkResult(data, {
							message: "删除标签成功！"
						});
					}
				});
				return true;
			}

			return undefined;
		},

		_createMultiLabels: function(newLabels) {
			var self = this;
			if (newLabels.length) {
				$.ajax({
					url: $.url_root + "/issue/createMultipleLabels.jspa",
					dataType: "json",
					type: "POST",
					data: {
						beanString: JSON.stringify(newLabels)
					},
					async: false,
					success: function(data) {
						checkResult(data, {
							message: "更新标签成功！"
						});
					}
				});
				return true;
			}

			return undefined;
		},

		_updateLabelGroupNameById: function(newGroupName, groupId) {
			var self = this;
			$.ajax({
				url: $.url_root + "/issue/updateLabelGroup.jspa",
				dataType: "json",
				type: "POST",
				async: false,
				data: {
					"issueLabelGroupDTO.labelGroupId": groupId,
					"issueLabelGroupDTO.name": newGroupName
				},
				success: function(data) {
					checkResult(data, {
						message: "更新标签组成功！",
						callback: function() {
							self._refreshGroupLabelsData(data.result, data.issueLabelGroupDTO.labelType);
							self._initGroupPanelEditPopoverUI(data.issueLabelGroupDTO.name, data.issueLabelGroupDTO.labelGroupId); //初始化弹出框UI
							self._initLabelsOfGroupPanelEditPopoverUI();
						}
					});
				}
			});
		},

		_updateMultiLabelsById: function(updateLabels) {
			var self = this;
			if (updateLabels.length) {
				$.ajax({
					url: $.url_root + "/issue/updateMultiLabels.jspa",
					dataType: "json",
					type: "POST",
					data: {
						beanString: JSON.stringify(updateLabels)
					},
					async: false,
					success: function(data) {
						checkResult(data, {
							message: "更新标签成功！"
						});
					}
				});
				return true;
			}
			return undefined;
		},

		_updateLabelNameById: function(newLabelName, labelId, groupId) {
			var self = this;
			$.ajax({
				url: $.url_root + "/issue/updateLabel.jspa",
				dataType: "json",
				type: "POST",
				data: {
					"issueDTO.issueLabelDto.labelId": labelId,
					"issueDTO.issueLabelDto.text": newLabelName,
					"issueLabelGroupDTO.labelGroupId": groupId
				},
				success: function(data) {
					checkResult(data, {
						message: "更新标签成功！",
						callback: function() {
							self._refreshGroupLabelsData(data.result, data.issueLabelGroupDTO.labelType);
							self._initGroupPanelEditPopoverUI(data.issueLabelGroupDTO.name, data.issueLabelGroupDTO.labelGroupId); //初始化弹出框UI
							self._initLabelsOfGroupPanelEditPopoverUI();
						}
					});
				}
			});
		},

		_initLabelsOfGroupPanelEditClickEvent: function(url) {
		    var that = this;
			$(".group-info").on("click", ".edit-label-icon", function(e) {
			    e.stopPropagation();
				$(".edit-group-icon").add($(this).parent(".label-block").siblings(".label-block").children(".edit-label-icon")).popover("hide"); //点击其中一个，然后隐藏其他的弹出框
				$(this).popover('toggle');
				var $smallForm = $(".smallForm1"),
				    $input = $smallForm.find("input");
				that._urlCheckForm($smallForm, {rules : {
				        fieldItemTextEdit: {
                            required: true,
                            remote: {
                                url: url,
                                dataType: "json",
                                type: "POST",
                                data: {
                                    "labelGroupId": function() {
                                        return $input.data("groupId");
                                    },
                                    
                                    "labelText": function() {
                                        return $input.val();
                                    },
                                    
                                    "labelId": function() {
                                        return $input.data("labelId");
                                    }
                                }
                            }
                        }
                    },
                    messages: {
                        fieldItemTextEdit: {
                            required: validation.label.labelContentCannotEmpty,
                            remote: validation.label.contentIsExisted
                        }
                    }
                });
			});
		},

		//初始化组编辑按钮的弹出框UI
		_initGroupPanelEditPopoverUI: function(groupName, groupId, labelType, labels) {
			var self = this;
			if (labelType == 'SELECTOR') {
				$(".edit-group-icon").popover({
					content: self._initGroupPanelDropdownEditPopoverUI(groupName, groupId, labels),
					placement: 'right',
					trigger: 'manual',
					html: true
				});
				return;
			}

			$(".edit-group-icon").popover({
				content: self._genEditGroupContent(groupName, groupId),
				placement: 'right',
				trigger: 'manual',
				html: true
			});
		},

		_initGroupPanelDropdownEditPopoverUI: function(groupName, groupId, labels) {
			var items = [];

			for (var i = 0, len = labels.length; i < len; i++) {
				items[i] = '<tr class="trFieldItem" data-fieldlabelid="' + labels[i].labelId + '">' + '<td><span class="fieldItemText">' + labels[i].text + '</span><div class="fieldItemEditWrapper hidden">' + '<input class="form-control" type="text" name="labelText" value="' + labels[i].text + '">' + '</div></td>' + '<td><span class="txt-color-red pull-right btnOptionOper btnDeleteOption"><i class="fa fa-lg fa-times"></i></span>' + '<span class="pull-right btnOptionOper btnEditOption" style="margin-right: 5px;"><i class="fa fa-lg fa-pencil"></i></span>' + '<span class="pull-right btnEditOptionOper btnEditOptionCancel hidden"><i class="fa fa-lg fa-ban"></i></span>' + '<span class="pull-right btnEditOptionOper btnEditOptionSave hidden" style="margin-right: 5px;"><i class="fa fa-lg fa-check"></i></span>' + '</td></tr>';
			}

			var html = '<form class="smallForm"><div id="popover_content_wrapper_edit_field_multi">' + '<div class="row">' + '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">' + '<form class="formEditField">' + '<div class="smart-form">' + '<section class="singleItem">' + '<label class="input">' + '<input class="fieldItemTitleEdit" type="text" placeholder="字段名称" name="fieldItemTitleEdit" value="' + groupName + '">' + '</label>' + '</section>' + '</div>' + '<section class="multiItem">' + '<div class="input-group">' + '<input class="form-control" type="text" placeholder="子项名称" name="fieldItemTextEdit">' + '<div class="input-group-btn">' + '<button type="button" class="btn btn-primary btnEditFieldAddOption">' + ' <i class="fa fa-lg "></i> 增加子项目' + '</button>' + '</div>' + '</div>' + '<div class="custom-scroll" style="margin-top: 10px;">' + '<table class="table no-border">' + '<tbody class="labelList">' + items.join("") + '</tbody>' + '</table>' + '</div>' + '</section>' + '</form>' + '<div class="pull-right" style="margin-top: 20px;">' + '<a class="btn btn-primary btn-sm btnEditFieldSave"><i class="fa fa-check"></i> 确定</a>&nbsp;&nbsp;' + '<a class="btn btn-default btn-sm btnEditFieldCancel"><i class="fa fa-ban"></i> 取消</a>' + '</div>' + '<div class="clearfix"></div>' + '</div>' + '</div>' + '</div></form>';

			return html;

		},

		//初始化标签编辑按钮的弹出框UI
		_initLabelsOfGroupPanelEditPopoverUI: function() {
			var self = this;
			$(".group-info").find(".edit-label-icon").each(function(i, v) {
				$(this).popover({
					content: self._genEditLabelContent($(this).data("labelText"), $(this).prev().data("labelId"), $(this).parent(".label-block").prevAll(".groupId").val()),
					placement: 'right',
					trigger: 'manual',
					html: true
				});
			});
		},

		_genEditGroupContent: function(groupName, groupId) {
			var html = '<form class="smallForm"><div class="input-group">' + '<input class="form-control" type="text" name="fieldGroupNameEdit" value="' + groupName + '" data-group-id="' + groupId + '">' + '<div class="input-group-btn">' + '<button type="button" placeholder="请输入组名" class="btn btn-primary btnEditGroupSave">' + '<i class="fa fa-lg "></i> 编辑' + '</button>' + '</div>' + '</div></form>';
			return html;
		},

		_genEditLabelContent: function(labelName, labelId, groupId) {
			var html = '<form class="smallForm1"><div class="input-group">' + '<input class="form-control" type="text" name="fieldItemTextEdit" value="' + labelName + '" data-label-id="' + labelId + '" data-group-id="' + groupId + '">' + '<div class="input-group-btn">' + '<button type="button" placeholder="请输入字段名称" class="btn btn-primary btnEditFieldUpdate">' + '<i class="fa fa-lg"></i> 编辑' + '</button>' + '</div>' + '</div>' + '</div></form>';
			return html;
		},

		_initLabelDeletionClickEvent: function() {
			var that = this;
			$(".group-info").on("click", ".btn-label-deleted", function(e) {
				that._deleteLabelByLabelId($(this).data("labelId"), $(this).closest(".panel-body").children(".groupId").val());
				e.stopPropagation();
			});
		},

		//点击复选框的删除按钮
		_deleteLabelByLabelId: function(labelId, gid) {
			var self = this;
			$.ajax({
				url: $.url_root + "/issue/deleteIssueLabel.jspa",
				dataType: "json",
				type: "POST",
				data: {
					"issueLabel.labelId": labelId,
					"issueLabel.labelGroupDTO.labelGroupId": gid
				},
				success: function(data) {
					checkResult(data, {
						message: "删除标签成功！",
						callback: function() {
							self._refreshGroupLabelsData(data.result, data.issueLabelGroupDTO.labelType);
							self._initGroupPanelEditPopoverUI(data.issueLabelGroupDTO.name, data.issueLabelGroupDTO.labelGroupId, data.issueLabelGroupDTO.labelType); //初始化弹出框UI
							self._initLabelsOfGroupPanelEditPopoverUI();
						}
					});
				}
			});
		},

		//为分组控件绑定事件
		_initGroupSelect2SelectedEvent: function() {
			var that = this;
			$(".labelCategory").on("select2-selected", function(e) {
			    var validator = $("#formAddGroup").validate(),
			        id = e.choice.id;
			    validator.resetForm();
			    that._cleanErrorClass("has-error");
			    if (!id) {
			        that._cleanGroupPanelContent();
			        that._lockLabelType(false);
			        that._validElement.call(validator, "input[name='issueLabel.labelGroupDTO.labelGroupId']");
			    } else {
			        that._findLabelsByGId(e.choice.id);
			    }
			    that._cleanElementContent(".labelContent");
			}).on("select2-removed", function(e) {
			    $("#formAddGroup").validate().resetForm();
			    that._cleanGroupPanelContent();
			    that._lockLabelType(false);
			    that._cleanElementContent(".labelContent");
			    that._cleanErrorClass("has-error");
			});
		},
		
		_cleanErrorClass: function(className) {
		    $("." + className).removeClass(className);
		},
		
		_cleanElementContent: function(ele) {
		    $(ele).val("").html("");
		},

		//绑定删除组的“是”按钮
		_initGroupDeletionDialogYesClickEvent: function() {
			var self = this;
			$("#divSmallBoxes").on("click", ".btn-yes", function(e) {
				self._deleteGroupByGId($(this).data("groupid"));
				e.stopPropagation();
			});
		},

		_deleteGroupByGId: function(gId) {
			var self = this;
			$.ajax({
				url: $.url_root + "/issue/deleteIssueLabelGroup.jspa",
				dataType: "json",
				type: "POST",
				data: {
					"issueLabelGroupDTO.labelGroupId": gId
				},
				success: function(data) {
					checkResult(data, {
						message: "删除分组成功！",
						callback: function() {
							self._refreshGroupLabelsData("");
							$(".labelCategory").select2("val", "");
						}
					});
				}
			});
		},

		_initializeEventBinding: function(validatedForm) {
			var self = this;
			//绑定标签添加按钮
			$(".btn-create-label").click(function(e) {
			    if (!lockItms(this)) {
			        return;
			    }
			    
				if (validatedForm.form()) {
					var labelGroupId = $(".labelCategory").select2("val");
					var params = {
						"issueLabel.text": $(".labelContent").val(),
						"issueLabel.labelType": $(".labelType").select2("val"),
						"issueLabel.labelGroupDTO.labelGroupId": labelGroupId
					};

					$.extend(params, parseInt(labelGroupId) == 0 ? { //do not use ===
						"issueLabel.labelGroupDTO.name": $("input.labelCategory").data("selectedtext"),
						"issueLabel.labelGroupDTO.scope": $("input.labelCategory").data("scope")
					} : {});
					self._saveOrUpdateLabels($(this).data("url"), params, validatedForm, this);
				} else {
				    unlockItms(this);
				}
				e.stopPropagation();
			});
		},

		_saveOrUpdateLabels: function(url, params, validatedForm, that) {
			var self = this;
			$.ajax({
				url: url,
				traditional: true,
				dataType: "json",
				type: "POST",
				data: params,
				
				success: function(data) {
					checkResult(data, {
						message: "添加标签成功",
						callback: function() {
							$(".labelCategory").val(data.issueLabelGroupDTO.labelGroupId).trigger("change");
							var labelType = data.issueLabelGroupDTO.labelType;
							self._lockLabelType(labelType);
							self._refreshGroupLabelsData(data.result, labelType);
							self._initGroupPanelEditPopoverUI(data.issueLabelGroupDTO.name, data.issueLabelGroupDTO.labelGroupId, labelType, data.issueLabelGroupDTO.labels); //初始化弹出框UI
							self._initLabelsOfGroupPanelEditPopoverUI();
							unlockItms(that);
						}
					}, function() {
					    unlockItms(that);
					});
					validatedForm.resetForm();
					$(".labelContent").val("");
				},
				
				error: function() {
				    unlockItms(that);
				}
			});
		},

		_findLabelsByGId: function(gid) {
			var self = this;
			$.ajax({
				url: $.url_root + "/issue/findLabelsByGId.jspa",
				type: "POST",
				dataType: "json",
				data: {
					"issueLabelGroupDTO.labelGroupId": gid
				},
				success: function(data) {
					checkResult(data, {
						showBox: false,
						callback: function() {
							var labelType = data.issueLabelGroupDTO.labelType;
							self._lockLabelType(labelType);
							self._refreshGroupLabelsData(data.result, labelType);
							self._initGroupPanelEditPopoverUI(data.issueLabelGroupDTO.name, data.issueLabelGroupDTO.labelGroupId, data.issueLabelGroupDTO.labelType, data.issueLabelGroupDTO.labels); //初始化弹出框UI
							self._initLabelsOfGroupPanelEditPopoverUI();
						}
					});
				}
			});
		},
		
		_currentSelectedLabelId: undefined,
		
		_setSelectedLabelId: function(labelId) {
		    this._currentSelectedLabelId = labelId;
		},
		
        _getSelectedLabelId: function() {
            return this._currentSelectedLabelId;
        },
        
        _resetSelectedLabelId: function() {
            this._currentSelectedLabelId = undefined; 
        },

		//绑定编辑组事件
		_initGroupPanelEditClickEvent: function() {
		    var that = this;
			$(".group-info").on("click", ".edit-group-icon", function(e) {
				$(this).popover('toggle');
				var $smallForm = $(".smallForm"),
				    compType = $(this).data("type"),
				    groupId = $(".labelCategory").select2("val");
				if (compType === "SELECTOR") {
				    that._urlCheckForm($smallForm, {rules : {
				        fieldItemTitleEdit: {
                            required: true,
                            remote: {
                                url: $.url_root + "/issue/valGroupname.jspa",
                                dataType: "json",
                                type: "POST",
                                data: {
                                    "labelGroupId": function() {
                                        return groupId;
                                    },
                                    
                                    "groupName": function() {
                                        return $smallForm.find(".fieldItemTitleEdit").val()
                                    }
                                }
                            }
                        },
                        
				        fieldItemTextEdit: {
                            required: true,
                            remote: {
                                url: $.url_root + "/issue/validateLabel.jspa",
                                dataType: "json",
                                type: "POST",
                                data: {
                                    "labelGroupId": function() {
                                        return groupId;
                                    },
                                    
                                    "labelText": function() {
                                        return $smallForm.find("input[name=fieldItemTextEdit]").val();
                                    }
                                }
                            }
                        },
                        
                        labelText: {
                            required: true,
                            remote: {
                                url: $.url_root + "/issue/validateLabel.jspa",
                                dataType: "json",
                                type: "POST",
                                data: {
                                    "labelGroupId": function() {
                                        return groupId;
                                    },
                                    
                                    "labelId": function() {
                                        return that._getSelectedLabelId();
                                    }
                                }
                            }
                        }
                    },
                    
                    messages: {
                        fieldItemTitleEdit: {
                            required: validation.labelGroup.groupNameCannotEmpty,
                            remote: validation.labelGroup.groupNameIsExisted
                        },
                        
                        fieldItemTextEdit: {
                            required: validation.label.labelContentCannotEmpty,
                            remote: validation.label.contentIsExisted
                        },
                        
                        labelText: {
                            required: validation.label.labelContentCannotEmpty,
                            remote: validation.label.contentIsExisted
                        }
                    }
                    });
				} else {
				    that._urlCheckForm($smallForm, {rules : {
	                    fieldGroupNameEdit: {
	                        required: true,
	                        remote: {
	                            url: $.url_root + "/issue/valGroupname.jspa",
	                            dataType: "json",
	                            type: "POST",
	                            data: {
	                                "labelGroupId": function() {
	                                    return groupId;
	                                },
	                                
	                                "groupName": function() {
	                                    return $smallForm.find(".form-control").val()
	                                }
	                            }
	                        }
	                    }
	                },
	                messages: {
	                    fieldGroupNameEdit: {
	                        required: validation.labelGroup.groupNameCannotEmpty,
	                        remote: validation.labelGroup.groupNameIsExisted
	                    }
	                }
	                });
				}
				$("body").data("groupName", $(".fieldItemTitleEdit").val());
				$(".myPopover").not($(this)).popover("hide");
				e.stopPropagation();
			}).on("click", ".popover", function(e) {
				e.stopPropagation();
			});
		},
		
		_urlCheckForm: function($obj, rule) {
		    var options = $.extend({
	            onsubmit: false,
                errorElement: "strong",
                errorClass: "text-danger",
                focusCleanup: true,
                focusInvalid: true,
                onfocusout: false,
                
                onkeyup: function(element, event) {
                    this.element(element);
                },
                
                highlight: function(element, errorClass) {
                    $(element).parent().addClass("has-error");
                },
                
                unhighlight: function(element, errorClass) {
                    $(element).parent().removeClass("has-error");
                },
                
                errorPlacement: function($errorContent, $element) {
                    $errorContent.insertAfter($element.parent());
                }
		    }, rule);
		    
		    $obj.validate(options);
		},

		//绑定删除组事件
		_initGroupPanelDeletionClickEvent: function() {
			$(".group-info").on("click", ".btn-group-deleted", function(e) {
				$.smallBox({
					title: "删除分组" + "<strong>" + $(this).prev().html() + "</strong>",
					content: "你将要删除该分组，该操作是不可恢复的！" + "<p class='text-align-right'><a href='javascript:void(0);' class='btn btn-danger btn-sm btn-yes' data-groupId='" + $(this).data("groupid") + "'>" + i18nRes.global.yes + "</a> <a href='javascript:void(0);' class='btn btn-primary btn-sm'>" + i18nRes.global.no + "</a></p>",
					icon: "fa fa-bell swing animated",
					color: "#A65858"
				});
				e.stopPropagation();
			});
		},

		_getUIByType: function(labelType, labelText) {
			var html = "";
			switch (labelType) {
				case "CHECKBOX":
					html = '<label class="checkbox-inline" style="margin-left: 0px;">' + '<input class="checkbox" type="checkbox">' + '<span>' + labelText + '</span>' + '</label>';
					break;
				case "RADIOBOX":
					html = '<label class="radio radio-inline"><input class="radiobox" type="radio" name="style-0a">' + '<span>' + labelText + '</span></label>';
					break;
			}

			return html;
		},
		
		_cleanGroupPanelContent: function() {
		    $(".group-info").html("");
		},

		_refreshGroupLabelsData: function(html, labelType) {
			$(".group-info").html(html);
			var self = this;
			if (labelType == 'SELECTOR') {
				$.each($("input.selector"), function(i, v) {
					var $that = $(this),
						data = [];
					$.each($(this).nextAll(), function(i, v) {
						data.push({
							id: $(this).data("labelId"),
							text: $(this).data("labelText").toString()
						});
						$(this).remove();
					});

					$that.select2({
						width: "100%",
						data: data
					}).select2("val", $that.data("select"));
				});
			}
		},

		_lockLabelType: function(labelType) {
			if (labelType) {
				$(".labelType").val(labelType).trigger("change").select2("readonly", true);
				return;
			}
			$(".labelType").select2("readonly", false);
		}
	};
}());
