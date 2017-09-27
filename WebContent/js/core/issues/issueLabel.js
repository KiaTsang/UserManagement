/**
 * FileName: issueLabel.js
 *
 * File description goes here.
 *
 * Copyright (c) 2010 Asiasoft, Inc. All Rights Reserved.
 *
 * @author <a href="mailto:qiqu.huang@iaspec.net">Charlie.Huang</a>
 * @Version: 1.0.0
 * @DateTime: 2014-08-14
 */
var issueLabel = (function(i18) {
    return {
        _const: {
            issueid: $("#issueId").val()
        },

        initialize: function() {
            issueCommon.initRemoteSearchSelector();
            $.each($("input[data-src=local]"), function(i, v) {
                var $that = $(this);
                issueCommon.initLocalSearchSelector($that, $that.attr("name"));
            });
            this.initializeEventBinding();
        },

        selectedGroupLabels: {},

        selectedGroupLabelsTemp: {}, // 暂存功能的groupLabels

        groupsInPage: [],

        selectedLables: [],

        getSelectedLables: function() {
            return this.selectedLables;
        },

        oldRadioIds: {},

        lastLabels: {},

        initializeEventBinding: function() {
            var self = this;
            //绑定标签添加按钮
            $(".btn-add-label").click(function() {
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
                self._saveOrUpdateLabels($(this).data("url"), params);
            });

            $("#tagTable").on("click", ".checkbox", function(e) {
                var groupName = $.trim($(this).closest("td").prev().html()),
                    labelName = $(this).data("name"),
                    labelId = $(this).data("labelId"),
                    labelText = $(this).data("labelText"),
                    totalLabels = [];
                if ($(this).is(":checked")) {
                    $.each($(this).parent().siblings().andSelf(), function(i, v) {
                        totalLabels.push({
                            id: $(this).find("input[type='checkbox']").data("labelId"),
                            text: $(this).find("input[type='checkbox']").data("labelText")
                        });
                    });
                    self._setSelectedLabels({id: labelId, text: labelText}, groupName, labelName, $(this).data("componentType"), totalLabels);
                } else {
                    $.each($(this).parent().siblings().andSelf(), function(i, v) {
                        totalLabels.push({
                            id: $(this).find("input[type='checkbox']").data("labelId"),
                            text: $(this).find("input[type='checkbox']").data("labelText")
                        });
                    });
                    self._setSelectedLabels({id: labelId, text: labelText, isDeleted: true}, groupName, labelName, $(this).data("componentType"), totalLabels);
                }
            });

            $("#tagTable").on("click", ".radiobox", function(e) {
                var groupName = $.trim($(this).closest("td").prev().html()),
                    labelName = $(this).attr("name"),
                    labelId = $(this).data("labelId"),
                    labelText = $(this).data("labelText"),
                    totalLabels = [];

                $.each($(this).parent().siblings().andSelf(), function(i, v) {
                    totalLabels.push({
                        id: $(this).find("input[type='radio']").data("labelId"),
                        text: $(this).find("input[type='radio']").data("labelText")
                    });
                });

                if (!$(this).attr("checked")) {
                    if (self.lastLabels[groupName]) {
                        self._setSelectedLabels(self.lastLabels[groupName], groupName, labelName, $(this).data("componentType"), totalLabels);
                        $(this).closest("td").find("input[name=" + self.lastLabels[groupName].name + "]").removeAttr("checked").prop("checked", false);
                    }
                    self._setSelectedLabels({id: labelId, text: labelText, name: labelName}, groupName, labelName, $(this).data("componentType"), totalLabels);
                    self.lastLabels[groupName] = {id: labelId, text: labelText, isDeleted: true, name: labelName};

                    $(this).attr("checked", "checked").prop("checked", true);
                } else {
                    self._setSelectedLabels({id: labelId, text: labelText, isDeleted: true, name: labelName}, groupName, labelName, $(this).data("componentType"), totalLabels);
                    $(this).removeAttr("checked").prop("checked", false);
                }
            });

            //为页面上的radio绑定监听器
            $(".labelGroupsHolder").on("click", ".radiobox", function(e) {
                var curCheckedRadioId = $(this).data("labelId"),
                    labelText = $.trim($(this).next().html()),
                    groupName = $.trim($(this).closest("tr").data("groupName")),
                    name = $(this).attr("name").substr(0, $(this).attr("name").lastIndexOf("_")),
                    type = $(this).data("displayType"),
                    totalLabels = [];

                $(this).closest("td").find("input[type=radio]").each(function(i, v) {
                    totalLabels.push({
                        id: $(this).data("labelId"),
                        text: $.trim($(this).next().html())
                    });
                });

                if ($(this).attr("checked")) {
                    self.getSelectedLables().removeItem(curCheckedRadioId);
                    self._setSelectedLabels({id: curCheckedRadioId, text: labelText, isDeleted: true}, groupName, name, type, totalLabels);
                    self._mergeGroupLabelsTemp2RealGroupLabels(self.selectedGroupLabelsTemp, self.selectedGroupLabels);
                    self.removeProsBy(self.selectedGroupLabelsTemp);
                    $(this).removeAttr("checked").prop("checked", false);
                    self._removeSpecifiedGroup(groupName);
                    self._cleanUp(groupName);
                    return false;
                }

                var $lastCheckedRadio = $(this).closest("td").find("input.radiobox[checked]"),
                    lastCheckedRadioId = $lastCheckedRadio.data("labelId"),
                    lastCheckedRadioText = $.trim($lastCheckedRadio.next().html());

                $lastCheckedRadio.removeAttr("checked").prop("checked", false);
                $(this).attr("checked", "checked").prop("checked", true);

                self.getSelectedLables().removeItem(lastCheckedRadioId).push(curCheckedRadioId);    // change the selected items in drawer
                self._setSelectedLabels({id: lastCheckedRadioId, text: lastCheckedRadioText, isDeleted: true}, groupName, name, type, totalLabels);
                self._mergeGroupLabelsTemp2RealGroupLabels(self.selectedGroupLabelsTemp, self.selectedGroupLabels);
                self.removeProsBy(self.selectedGroupLabelsTemp);
                self._setSelectedLabels({id: curCheckedRadioId, text: labelText, name: name}, groupName, name, type, totalLabels);
                self._mergeGroupLabelsTemp2RealGroupLabels(self.selectedGroupLabelsTemp, self.selectedGroupLabels);
                self.removeProsBy(self.selectedGroupLabelsTemp);
                self.lastLabels[groupName] = {id: curCheckedRadioId, text: labelText, isDeleted: true, name: name};
            });

            //抽屉保存按钮
            var groupsInPage = self.groupsInPage;
            $(".btn-add-label-in-page").click(function(e) {
                $("#ad-container-CardPro, #ad-container-SystemPro, #ad-container-whiteboxPro").toggleClass("open"); //关闭抽屉
                self.selectedLables.empty(); //记录当前在抽屉中所选择的所有类型label的id集合，目的：当下次展开抽屉式，默认选中当前页面上所选的
                var mergedSelectedGroupLabels = self._mergeGroupLabelsTemp2RealGroupLabels(self.selectedGroupLabelsTemp, self.selectedGroupLabels);
                self.removeProsBy(self.selectedGroupLabelsTemp);
                $.each(mergedSelectedGroupLabels, function(lableGroupTitle, json) {
                    var selectedLabelsTemp = [],
                    isSelectedLabelsEmpty = false; //记录每一个分组中所选择的label的id集合
                    //标记已勾选的标签，以便下次展开抽屉时默认选中
                    $.each(json, function(i, v) {
                        if (v.labels.length === 0) {
                            isSelectedLabelsEmpty = true;
                        }

                        $.each(v.labels, function(j, k) {
                            self.selectedLables.push(k.id);
                            selectedLabelsTemp.push(k.id);
                        });
                    });

                    if ($.inArray(lableGroupTitle, groupsInPage) === -1) {  // 判断当前选中的标签组是否已在页面上存在
                        if (isSelectedLabelsEmpty) { // 直接打开抽屉，选中然后取消
                            self._cleanUp(lableGroupTitle);
                        } else {
                            self._setSelectedLabelsToPage(lableGroupTitle, json, selectedLabelsTemp);
                            groupsInPage.push(lableGroupTitle); //标记该分组已在页面上生成，避免后续添加项时再次生成独立相同的组。
                        }
                    } else {
                        self._removeSpecifiedGroup(lableGroupTitle);  // 删除页面上的对应分组
                        if (isSelectedLabelsEmpty) { // 如果没有选中标签，则不在页面上生成该组
                            self._cleanUp(lableGroupTitle);
                        } else {
                            self._setSelectedLabelsToPage(lableGroupTitle, json, selectedLabelsTemp);
                        }
                    }
                });
            });

            //点击抽屉取消按钮
            $(".btn-close-drawer").click(function(e) {
                $("#ad-container-CardPro, #ad-container-SystemPro, #ad-container-whiteboxPro").toggleClass("open");
                self.removeProsBy(self.selectedGroupLabelsTemp);
            });

            this._initDrawerClickEvent(this.initComboboxTags);

            //点击保存按钮
            $("#btn-save, #btn-draft").click(function(e) {
                if(!lockItms($(this).get(0))) {
                	return;
                }
                saveNotes();
                var result = validator.validationResult();
                if (result == true || result == undefined) {
                    //create
                    $("#updateFlag").val("true"); //true为创建操作
                } else {
                    //update
                    $("#updateFlag").val("false"); //false为更新操作
                }
                self._generateLabelParams();

                unlockItms($(this).get(0));

                if (!$.trim($(".labelGroupsHolder").html())) {
                	var scrollTargetDis = $(".chat-list-open-close").offset().top - ($("#ribbon").height() + $("#navbar").height() + 35);
                    $("html, body").animate({
                        scrollTop: Math.floor(scrollTargetDis)
                    }, 300, "linear");

                    $(".chat-list-open-close").popover("destroy").popover({
                        placement: "left",
                        html: true,
                        title: "<strong>提示<strong>",
                        content: "请至少为该缺陷指定一个标签"
                    }).popover("show");

                    setTimeout(function(){
                        $(".chat-list-open-close").popover("destroy");
                    }, 3000);

                    return;
                }

                if ($(this).data("save")) {
                    $("#draftFlag").val("true");
                } else {
                    $("#draftFlag").val("false");
                }

                var $form = $("#create-issue-form");

                if ($form.valid()) {
                    var draftFlag = $("#draftFlag").val();

                    if (draftFlag === "true") {
                        self._sendData($form.attr("action"), $form.serialize(), function(data) {
                            setTimeout(function() {
                                location.href = $.url_root + "/issue/" + data.targetUrl;
                            }, 1000);
                        }, true, i18.issue.ajaxSuccessMsg.SAVE_DRAFT);
                    } else {
                        self._sendData($form.attr("action"), $form.serialize(), function(data) {
                            setTimeout(function() {
                                location.href = $.url_root + "/issue/" + data.targetUrl;
                            }, 1000);
                        }, true, i18.issue.ajaxSuccessMsg.SUBMIT);
                    }
                }
            });

            $("#tagTable").on("click", ".label-setting-page", function(e) {
                $(".labelSetting").click();
            });
        },

        printInfo: function() {
//            var self = this;
//            console.log(self.selectedGroupLabels);
//            console.log("temp");
//            console.log(self.selectedGroupLabelsTemp);
//            console.log("groupsInPage");
//            console.log(self.groupsInPage);
//            console.log("lastLabels");
//            console.log(self.lastLabels);
        },

        removeProsBy: function(groupLabelsTmp, key) {
            if (typeof key === "undefined") {
                for (k in groupLabelsTmp) {
                    delete groupLabelsTmp[k];
                }
                return;
            }

            if (key in groupLabelsTmp) {
                delete groupLabelsTmp[key];
            }
        },

        _cleanUp: function(lableGroupTitle) {
            var self = this;
            if (self.groupsInPage.indexOf(lableGroupTitle) !== -1) {
                self.groupsInPage.splice(self.groupsInPage.indexOf(lableGroupTitle), 1);
            }

            if (lableGroupTitle in self.lastLabels) {
                delete self.lastLabels[lableGroupTitle];
            }
            self.removeProsBy(self.selectedGroupLabels, lableGroupTitle);
        },

        // 合并临时分组到真实分组
        _mergeGroupLabelsTemp2RealGroupLabels: function(source, target) {
            if (typeof source !== "object" || typeof target !== "object") {
                throw new Error("arguments should be object.");
            }

            var getTargetObjIds = function(target) {
                var len = target.length,
                    ids = [],
                    i;

                for (i = 0; i < len; i++) {
                    ids.push(target[i].id);
                }

                return ids;
            },

            appendUniqueVal = function(s, t) {
                var len = s.length,
                    i, g, l;
                for (i = 0; i < len; i++) {
                    var ocrIndex = getTargetObjIds(t).indexOf(s[i].id);
                    if (ocrIndex === -1) {
                        if (!s[i].isDeleted) {
                            t.push(s[i]);
                        }
                    } else {
                        if (!s[i].isDeleted) { // 判断是否为删除项
                            if (t[ocrIndex].text !== s[i].text) {
                                t[ocrIndex].text = s[i].text;
                            }
                        } else {
                            t.splice(ocrIndex, 1);
                        }
                    }
                }

                return t;
            },

            filterInvalidItems = function(source) {
                var invalidItems = {
                },
                k;
                for (k in source) {
                  var items = source[k].labels,
                  len = items.length;
                  for (var i = 0; i < len; i++) {
                    if (items[i].isDeleted) {
                      if (!invalidItems[items[i].id]) {
                        invalidItems[items[i].id] = 1;
                      }
                    }
                  }
                  for (var i = 0; i < items.length; i++) {
                      if (items[i].id in invalidItems) {
                          items.splice(i, 1);
                          i -= 1;
                      }
                  }
                }
                return source;
            };

            for (g in source) {
                if (g in target) {
                    for (l in source[g]) {
                        if (l in target[g]) {
                            target[g][l].totalLabels = appendUniqueVal(source[g][l].totalLabels, target[g][l].totalLabels);
                            target[g][l].labels = appendUniqueVal(source[g][l].labels, target[g][l].labels);
                        }
                    }
                } else {
                    target[g] = filterInvalidItems(source[g]);  // 没有跟踪到页面上的组时触发，也就是页面上没有组
                }
            }

            return target
        },

        _sendData: function(url, data, callbackAction, isPopupbox, message) {
            $.ajax({
                url: url,
                type: "POST",
                dataType: "json",
                data: data,

                beforeSend: function(jqXHR, settings) {
                    $.blockUI({
                        message: '<div class="progress progress-sm progress-striped active" style="margin-bottom: 0px;">' +
                                 '<div style="width: 100%" role="progressbar" class="progress-bar bg-color-darken">' +
                                 '<span style="position: relative; top: -3px;">正在处理，请稍后...</span></div>' +
                                 '</div>'
                    });
                },

                success: function(result) {
                    checkResult(result, {
                        showBox: isPopupbox,
                        callback: function(data) {
                            callbackAction(data);
                        },
                        message: message
                    });
                },

                complete: function() {
                    $.unblockUI();
                }
            });
        },

        _initDrawerClickEvent: function(fninitComboBoxTags) {

            var self = this;

            //点击抽屉展开图标
            $('#chat-list-open-close-CardPro, #chat-list-open-close-SystemPro, #chat-list-open-close-whiteboxPro').click(function() {
                if (!$(this).parent().hasClass("open")) {
                    self._drawLabels(function(data) {
                        $("#tagTable").html(data.result);
                        $.proxy(fninitComboBoxTags, self)();
                        self._setTagLabelsSelected(self.getSelectedLables()); //应该是一个所有组件的合集
                    });
                }
                $(this).parent('.ad-container').toggleClass('open');
            });
        },

        _drawLabels: function(fn) {
            $.ajax({
                url: $("#labelUrl").val(),
                dataType: "json",
                type: "POST",
                success: function(data) {
                    checkResult(data, {
                        showBox: false,
                        callback: fn
                    });
                }
            });
        },

        _saveOrUpdateLabels: function(url, params) {
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
                            $(".labelContent").val("");
                        }
                    });
                }
            });
        },

        //渲染抽屉中的下拉框
        initComboboxTags: function() {
            var self = this;
            $("#tagTable").find("td:has('span.hidden')").each(function(i, v) {
                var totalLabels = [],
                    totalLabelIds = [],
                    $dropDownComp = $(this).children("input[type=hidden]"),
                    groupName = $.trim($(this).prev().html()),
                    name = $(this).children("input[type=hidden]").attr("name"),
                    type = $(this).children("input[type=hidden]").data("componentType");

                // 获取所有项
                $(this).children("span.hidden").each(function(i, v) {
                    totalLabels.push({
                        id: $(this).data("labelId"),
                        text: $(this).data("labelText")
                    });
                   totalLabelIds.push($(this).data("labelId"));
                    // $(this).remove();  //如果有特殊问题，可以尝试注释该行
                });

                $dropDownComp.attr("data-label-id", totalLabelIds.join(",")); // 展开下拉显示所有下拉项

                issueCommon.initLocalSearchSelector($dropDownComp, totalLabels);

                $dropDownComp.on("select2-selecting", function(e) { //绑定抽屉中select2选中事件
                    var labelId = e.object.id,
                        labelText = e.object.text;

                    if (self.lastLabels[groupName]) {
                        self._setSelectedLabels(self.lastLabels[groupName], groupName, name, type, totalLabels);
                    }
                    self._setSelectedLabels({id: labelId, text: labelText}, groupName, name, type, totalLabels);
                    self.lastLabels[groupName] = {id: labelId, text: labelText, isDeleted: true};
                }).on("select2-removed", function(e) {
                    var labelId = e.choice.id,
                    labelText = e.choice.text;
                    self._setSelectedLabels({id: labelId, text: labelText, isDeleted: true}, groupName, name, type, totalLabels);
                });
            });
        },

        _uniqueLabels: function(obj) {

        },

        // k为分组名称, json={labelName: {type: "CHECKBOX", labels: [{id: xxxx, text: xxx}...], totalLabels: []}}, selectedLables为目前选中的labels，[]
        _setSelectedLabelsToPage: function(k, json, selectedLables) {
            var html = [],
                self = this,
                groupName = $.trim(k);
            $.each(json, function(name, v) {
                if (v.type === 'CHECKBOX') { //如果是复选框，则渲染成select2插件
                    html[0] = '<tr data-group-name="' + groupName + '"><td width="80" style="padding-top: 13px;">' + $.trim(k) + '</td><td>';
                    html[1] = self._generateDynamicComponent(v.type, name, v.labels);
                    html[2] = '</td></tr>';
                    $(".labelGroupsHolder").append($(html.join("")));
                    var $select2 = $(".labelGroupsHolder").find("input[name='" + name + "']");
                    issueCommon.initLocalSearchSelector($select2, v.totalLabels);
                    $select2
                        .on("select2-selecting", function(e) { //如果发生不正常行为，请尝试先卸载监听器，然后添加监听器，选中时触发
                            self.getSelectedLables().push(e.val); // 默认选中标签
                            self._setSelectedLabels({id: e.val, text: e.object.text}, groupName, name, v.type, v.totalLabels);
                            self._mergeGroupLabelsTemp2RealGroupLabels(self.selectedGroupLabelsTemp, self.selectedGroupLabels);
                            self.removeProsBy(self.selectedGroupLabelsTemp);
                        })
                        .on("select2-removed", function(e) { //删除时触发
                            self.getSelectedLables().removeItem(e.val);
                            self._setSelectedLabels({id: e.val, text: e.choice.text, isDeleted: true}, groupName, name, v.type, v.totalLabels);
                            self._mergeGroupLabelsTemp2RealGroupLabels(self.selectedGroupLabelsTemp, self.selectedGroupLabels);
                            self.removeProsBy(self.selectedGroupLabelsTemp);
                            if ($(this).select2("val").length === 0){
                                self._removeSpecifiedGroup(groupName);
                                self._cleanUp(groupName);
                            }
                        });
                } else if (v.type === 'RADIOBOX') {
                    html.push('<tr data-group-name="' + k + '"><td width="80" style="padding-top: 13px;">' + k + '</td><td>');
                    $.each(v.totalLabels, function(i, val) {
                        html.push('<label class="radio radio-inline"><input data-display-type="RADIOBOX" class="radiobox" type="radio" data-label="true" name="' + (v.labels[0].name + "_") + '"' //加上后缀"_"，避免与抽屉中的name产生冲突而导致打开抽屉时页面的radio不被选中
                            + (val.id === selectedLables[0] ? "checked=\"checked\"" : "") + ' data-label-id="' + val.id + '"><span>' //id为radio的名称, totalLabels: [{id: radio的名称, text:radio的文本}],selectedLabels为选中的文本
                            + val.text + '</span>' + '</label>');
                    });
                    html.push('</td></tr>');
                    $(".labelGroupsHolder").append($(html.join("")));
                } else if (v.type === 'SELECTOR') {
                    html[0] = '<tr data-group-name="' + k + '"><td width="80" style="padding-top: 13px;">' + k + '</td><td>';
                    html[1] = self._generateDynamicComponent(v.type, name, v.labels);
                    html[2] = '</td></tr>';
                    $(".labelGroupsHolder").append($(html.join("")));
                    var $select2 = $(".labelGroupsHolder").find("input[name='" + name + "']");
                    issueCommon.initLocalSearchSelector($select2, v.totalLabels);
                    $select2.on("select2-selecting", function(e) {
                        var groupName = $.trim($(this).closest("td").prev().html()),
                            curSelectedId = e.object.id,
                            curSelectedText = e.object.text;
                        if (self.lastLabels[groupName]) {
                            self.getSelectedLables().removeItem(self.lastLabels[groupName].id).push(curSelectedId);
                            self._setSelectedLabels({id: self.lastLabels[groupName].id, text: self.lastLabels[groupName].text, isDeleted: true}, groupName, name, v.type, v.totalLabels);
                            self._mergeGroupLabelsTemp2RealGroupLabels(self.selectedGroupLabelsTemp, self.selectedGroupLabels);
                            self.removeProsBy(self.selectedGroupLabelsTemp);
                            self._setSelectedLabels({id: curSelectedId, text: curSelectedText}, groupName, name, v.type, v.totalLabels);
                            self._mergeGroupLabelsTemp2RealGroupLabels(self.selectedGroupLabelsTemp, self.selectedGroupLabels);
                            self.removeProsBy(self.selectedGroupLabelsTemp);
                            self.lastLabels[groupName] = {id: curSelectedId, text: curSelectedText, isDeleted: true};
                        }
                    }).on("select2-removed", function(e) {
                        var groupName = $.trim($(this).closest("td").prev().html()),
                            curSelectedId = e.choice.id,
                            curSelectedText = e.choice.text;
                        self.getSelectedLables().removeItem(curSelectedId);
                        self._setSelectedLabels({id: curSelectedId, text: curSelectedText, isDeleted: true}, groupName, name, v.type, v.totalLabels);
                        self._mergeGroupLabelsTemp2RealGroupLabels(self.selectedGroupLabelsTemp, self.selectedGroupLabels);
                        self.removeProsBy(self.selectedGroupLabelsTemp);
                        self._removeSpecifiedGroup(groupName);
                        self._cleanUp(groupName);
                    });
                }
            });
        },

        _removeSelectedLabel: function(removedLabelVal, groupName, labelName) {
            var mergedSelectedGroupLabels = this._mergeGroupLabelsTemp2RealGroupLabels(this.selectedGroupLabels, this.selectedGroupLabelsTemp);
            if (mergedSelectedGroupLabels[groupName][labelName].labels) {
                mergedSelectedGroupLabels[groupName][labelName].labels.removeItem(removedLabelVal);
            }
        },

        // selectedLabel = {id: xxx, text: xxx}, type为控件类型
        _setSelectedLabels: function (selectedLabel, groupName, labelName, type, totalLabels) {
            var self = this;

            if (!self.selectedGroupLabelsTemp[groupName]) {
                self.selectedGroupLabelsTemp[groupName] = {};
            }

            if (!self.selectedGroupLabelsTemp[groupName][labelName]) {
                self.selectedGroupLabelsTemp[groupName][labelName] = {
                    type: type,
                    labels: [], // 当前抽屉中选中的便签
                    totalLabels: [] // 当前所在组的所有标签集合
                };

                // 获得当前选中便签所在的所有标签集合
                $.each(totalLabels, function(i, v) {
                    self.selectedGroupLabelsTemp[groupName][labelName].totalLabels.push({
                        id: v.id,
                        text: v.text
                    });
                });
            }

            self.selectedGroupLabelsTemp[groupName][labelName].labels.removeJSONBy("id", selectedLabel.id);
            self.selectedGroupLabelsTemp[groupName][labelName].labels.push(selectedLabel);
        },

        //componentType，要生成的控件类型，如CHECKBOX, RADIO 等
        _generateDynamicComponent: function(componentType, name, selectedLabels) {
            var componentHTML = "";
            var selectedlabelVals = [];
            $.each(selectedLabels, function(i, v) {
                selectedlabelVals.push(v.id);
            });
            switch (componentType) {
                case "CHECKBOX":
                    componentHTML = '<input name="' + name + '" data-display-type="CHECKBOX" type="hidden" data-label="true" data-initialize="true" value="' + selectedlabelVals.join(",") + '">';
                    break;
                case "SELECTOR":
                    componentHTML = '<input name="' + name + '" data-display-type="SELECTOR" data-placeholder=" " type="hidden" data-single="true" data-clear="true" data-label="true" data-initialize="false" value="' + selectedlabelVals.join(",") + '">';
                    break;
            }
            return componentHTML;
        },

        _currentSelectedValue: -1,

        //设置抽屉展开时指定标签选中状态
        _setTagLabelsSelected: function(labelIds) { //labelIds为选中的label id集合，是一个数组, labelIds: {name: {type: "SELECTOR", selectedVals: [labelId...]}}
            var $tagTable = $("#tagTable, #card-tagTable, #sys-tagTable, #white-tagTable"),
                self = this;
            $.each(labelIds, function(i, v) {
                $tagTable.find("input[data-label-id]").each(function(j, k) {
                    if (($(this).data("labelId") + "").indexOf(",") != -1) { // selector控件
                        var idTemp = $(this).data("labelId").split(",");
                        var $that = $(this);
                        $.each(idTemp, function(l, m) {
                            if (m == v) {
                                $that.select2("val", v);
                                self._currentSelectedValue = v;
                                return false;
                            }
                        });
                    } else {
                        if ($(this).data("labelId") == v) {
                            if ($(this).is(":hidden")) {
                                $(this).select2("val", v);
                                self._currentSelectedValue = v;
                            } else {
                                $(this).attr("checked", true).prop("checked", true);
                            }
                            return false;
                        }
                    }
                });
            });
        },

        _removeSpecifiedGroup: function(grouptitle) { //根据组的名称删除页面上的组
            $(".labelGroupsHolder").find("tr[data-group-name='" + grouptitle + "']").remove();
            // delete this.selectedGroupLabels[grouptitle];
        },

        _generateLabelParams: function() {
            var params = [];
            $(".labelGroupsHolder").find("input[data-label]").each(function(i, $v) {
                var displayType = $(this).data("displayType");
                if (displayType == 'CHECKBOX') {
                    $.each($(this).select2("val"), function(i, v) {
                        params.push('{"labelId":"' + v + '"}'); //额外参数请在这添加
                    });
                } else if (displayType == 'RADIOBOX') {
                    if ($(this).attr("checked")) {
                        params.push('{"labelId":"' + $(this).data("labelId") + '"}');
                    }
                } else if (displayType == 'SELECTOR') {
                    !$(this).select2("val") || params.push('{"labelId":"' + $(this).select2("val") + '"}');
                }
            });
            params = '[' + params.join(",") + ']';
            $("#labels").val(params);
        },

        //编辑页面的程序入口点
        initEditPage: function() {
            this._initDrawerClickEvent(this._initEditableComboBoxTags); //绑定抽屉点击事件
            this._initDrawerComponentClickEvent(); //绑定抽屉中checkbox点击事件
            var isIssueReadOnly = ($("#isReadOnly").val() === "true" ? true : false);
            // if (!isIssueReadOnly) {
                this._initPagelabelClickEvent(); //绑定更新页面中checkbox和radio的点击事件
            // }

            this._constructLabelGroups(); //绘制页面的便签
        },

        //编辑页面中抽屉的下拉框生成处理
        _initEditableComboBoxTags: function() {
            var self = this;
            var issueId = self._const.issueid;
            $("#tagTable").find("td:has('span.hidden')").each(function(i, v) {
                var data = [],
                    labelIds = [];
                $(this).children("span.hidden").each(function(i, v) {
                    data.push({
                        id: $(this).data("labelId"),
                        text: $(this).data("labelText")
                    });
                    labelIds.push($(this).data("labelId"));
                });
                var $dropDownComp = $(this).children("input[type=hidden]");
                $dropDownComp.data("labelId", labelIds.join(",")); //便于展开抽屉时选中下拉处理
                issueCommon.initLocalSearchSelector($dropDownComp, data);
                $dropDownComp.on("select2-selecting", function(e) { //绑定抽屉中select2选中事件
                    var labelId = e.object.id;
                    var lastLabelId = self._currentSelectedValue;
                    if (lastLabelId != labelId) {
                        self._releaseIssueLabelAssociation(issueId, lastLabelId, false);
                        self._setIssueLabelAssociation(issueId, labelId);
                        self._currentSelectedValue = labelId;
                    }
                }).on("select2-removed", function(e) {
                    self._releaseIssueLabelAssociation(issueId, e.val, false);
                    self._constructLabelGroups();
                    self._currentSelectedValue = -1;
                });
            });
        },

        _constructLabelGroups: function() {
            var self = this,
                isDisabled = $("#status").val();
            $.ajax({
                url: $.url_root + "/issue/constructLabelGroups.jspa",
                type: "POST",
                dataType: "json",
                data: {
                    "issueId": $("#issueId").val()
                },
                success: function(data) {
                    checkResult(data, {
                        showBox: false,
                        callback: function() {
                            $(".labelGroupsHolder").html(data.result);
                            self._initEditableLabelComponent(isDisabled === "CLOSED" || isDisabled === "VALIDATED"); //渲染复选框
                            self._initEditableDropdownComponent(isDisabled === "CLOSED" || isDisabled === "VALIDATED"); //渲染单选下拉框
                            if (isDisabled !== "CLOSED" && isDisabled !== "VALIDATED")
                            self._initPageSelect2ClickEvent(); //页面上标签点击事件处理
                        }
                    });
                }
            });
        },

        //渲染编辑页面的单选下拉框
        _initEditableDropdownComponent: function(disabled) {
            var self = this;
            $(".labelGroupsHolder").find("input[data-single]").each(function(i, v) {
                var totalLabels = [];
                $(this).nextAll("input[type='hidden']").each(function(e) {
                    var isDisabled = $(this).data("isactived") ? false : true;
                    totalLabels.push({
                        id: $(this).data("labelId"),
                        text: $(this).data("labelText"),
                        disabled: isDisabled
                    });
                });
                issueCommon.initLocalSearchSelector($(this), totalLabels, disabled);

                self.selectedLables.push($(this).select2("val"));
            });
        },

        _initDrawerComponentClickEvent: function() {
            var self = this;
            $("#tagTable").on("click", ".checkbox, .radiobox", function(e) {
                var issueId = self._const.issueid;
                var componentType = $(this).data("componentType");
                if (componentType === 'CHECKBOX') {
                    var labelId = $(this).data("labelId");
                    if ($(this).is(":checked")) { //新增关联
                        self._setIssueLabelAssociation(issueId, labelId);
                    } else { //删除与缺陷关联的标签
                        self._releaseIssueLabelAssociation(issueId, labelId, true);
                    }
                } else if (componentType === 'RADIOBOX') {
                    var $sourceRadio = $(this).closest("td").find("input.radiobox[checked]");
                    var lastestlabelId = $(this).data("labelId");
                    var hasLastCheckedRadio = false;
                    if ($sourceRadio.length) {
                        hasLastCheckedRadio = true;
                    }

                    if (hasLastCheckedRadio) {
                        var lastLabelId = $sourceRadio.data("labelId"); //源单选id
                        if (lastLabelId != lastestlabelId) {
                            $sourceRadio.removeAttr("checked").prop("checked", false);
                            $(this).attr("checked", true).prop("checked", true);
                            self._releaseIssueLabelAssociation(issueId, lastLabelId, false);
                            self._setIssueLabelAssociation(issueId, lastestlabelId);
                        }
                    } else {
                        $(this).attr("checked", true).prop("checked", true);
                        self._setIssueLabelAssociation(issueId, lastestlabelId);
                    }
                }
            });
        },

        //更新页面使用
        _initEditableLabelComponent: function(disabled) {
            var self = this;
            self.selectedLables.empty();
            $(".labelGroupsHolder").find("input[data-initialize], input.radiobox:checked").each(function(i, v) {
                if ($(this).attr("data-initialize")) {
                    var totalLabels = [];
                    $.each($(this).nextAll("input[type='hidden']"), function(j, dom) {
                        var isDisabled = $(this).data("isactived") ? false : true;
                        totalLabels.push({
                            id: $(this).data("labelId"),
                            text: $(this).data("labelText"),
                            disabled: isDisabled
                        });
                        // $(this).remove(); //删除<span>元素，调试时可以注释该行
                    });
                    issueCommon.initLocalSearchSelector($(this), totalLabels, disabled);

                    $.each($(this).val().split(","), function(i, v) {
                        self.selectedLables.push(v);
                    }); //设定抽屉中已选中的标签状态
                } else if ($(this).hasClass("radiobox")) {
                    self.selectedLables.push($(this).parent().next("a").data("labelId"));
                }
            });
        },

        _initPageSelect2ClickEvent: function() {
            var self = this,
                issueId = self._const.issueid;
            $(".labelGroupsHolder").find("input[data-component-type!='RADIOBOX']").each(function(i, v) {
                var componentType = $(this).data("componentType");
                if (componentType == 'CHECKBOX') {
                    $(this).on("select2-selecting", function(e) {
                        self._setIssueLabelAssociation(issueId, e.object.id);
                    }).on("select2-removing", function(e) {
                        self._releaseIssueLabelAssociation(issueId, e.choice.id, true);
                    });
                } else if (componentType == 'SELECTOR') {
                    var lastLabelId = $(this).select2("val");
                    $(this).on("select2-selecting", function(e) {
                        var labelId = e.object.id;
                        if (lastLabelId != labelId) {
                            self._releaseIssueLabelAssociation(issueId, lastLabelId, false);
                            self._setIssueLabelAssociation(issueId, labelId);
                        }
                    }).on("select2-removed", function(e) {
                        self._releaseIssueLabelAssociation(issueId, lastLabelId, true);
                    });
                }
            });
        },

        //页面上标签点击事件处理
        _initPagelabelClickEvent: function() {
            if ($("#status").val() !== 'CLOSED' && $("#status").val() !== 'VALIDATED') {
                var self = this,
                    issueId = self._const.issueid;

                $(".labelGroupsHolder").on("click", "input[data-component-type='RADIOBOX']", function(e) {
                    var $lastCheckedRadio = $(this).closest("td").find("input.radiobox[checked]");
                    var lastCheckedRadioId = $lastCheckedRadio.data("labelId");
                    var latestCheckedRadioId = $(this).data("labelId");
                    if (lastCheckedRadioId != latestCheckedRadioId) {
                        $lastCheckedRadio.removeAttr("checked").prop("checked", false);
                        $(this).attr("checked", "checked").prop("checked", true);
                        self._releaseIssueLabelAssociation(issueId, lastCheckedRadioId, false);
                        self._setIssueLabelAssociation(issueId, latestCheckedRadioId);
                    }
                });

                $(".labelGroupsHolder").on("click", "a.btn-label-deleted", function(e) {
                    self._releaseIssueLabelAssociation(issueId, $(this).data("labelId"), true);
                });
            }
        },

        //设置缺陷与便签关联
        _setIssueLabelAssociation: function(issueId, labelId) {
            var self = this;
            $.ajax({
                url: $.url_root + "/issue/updateIssueDetails.jspa",
                type: "POST",
                dataType: "json",
                data: {
                    "issueDTO.issueId": issueId,
                    "issueDTO.issueLabelDto.labelId": labelId
                },
                success: function(data) {
                    checkResult(data, {
                        showBox: false,
                        callback: function() {
                            self._constructLabelGroups(); //重新绘制页面上的分组
                        }
                    });
                }
            });
        },

        //释放设置缺陷与便签关联
        _releaseIssueLabelAssociation: function(issueId, labelId, isCallback) {
            var self = this;
            $.ajax({
                url: $.url_root + "/issue/deleteIssueLabelValue.jspa",
                type: "POST",
                dataType: "json",
                data: {
                    "issueDTO.issueId": issueId,
                    "issueDTO.issueLabelDto.labelId": labelId
                },
                success: function(data) {
                    checkResult(data, {
                        showBox: false,
                        callback: function() {
                            isCallback && self._constructLabelGroups(); //重新绘制页面上的分组
                        }
                    });
                }
            });
        },
        //缺陷列表的程序入口点
        initListPage: function(labelUrl, tableId) {
            this._initDrawerLabel(labelUrl, tableId);
        },
        //缺陷列表动态标签查询
        _initDrawerLabel: function(labelUrl, tableId) {
            var self = this;
            //点击更多搜索条件
            var url = labelUrl;
            $.ajax({
                url: $.url_root + url,
                dataType: "json",
                type: "POST",
                data: {
                    "isTableSearch": true
                },
                success: function(data) {
                    checkResult(data, {
                        showBox: false,
                        callback: function() {
                            if (tableId == null) {
                                $("#tagTable").html(data.result);
                            } else {
                                $("#" + tableId).html(data.result);
                            }

                            self._setTagLabelsSelected($.search_issue_labelIds); //checkbox和radio选中的集合
                            self._setTagLabelsSelected($.search_global_issue_card_labelIds);
                            self._setTagLabelsSelected($.search_global_issue_sys_labelIds);
                            self._setTagLabelsSelected($.search_global_issue_white_labelIds);
                            $("#myonoffswitch").attr("checked", $.search_issue_isExact).prop("checked", $.search_issue_isExact);
                            $("#myonoffswitch1").attr("checked", $.search_global_issue_card_isExact).prop("checked", $.search_global_issue_card_isExact);
                            $("#myonoffswitch2").attr("checked", $.search_global_issue_sys_isExact).prop("checked", $.search_global_issue_sys_isExact);
                            $("#myonoffswitch3").attr("checked", $.search_global_issue_white_isExact).prop("checked", $.search_global_issue_white_isExact);
                            issueCommon.refreshDataTable();
                        }
                    });
                }
            });
        },
        //绑定缺陷列表查询里面的动态标签checkbox和radiobox事件
        initBindComponentClickEvent: function() {
                var self = this;
                $("#tagTable,#card-tagTable,#sys-tagTable,#white-tagTable").on("click", ".checkbox, .radiobox", function(e) {
                    var componentType = $(this).data("componentType");
                    var isCard = $("#card-tab-r1").hasClass("active");
                    var isSys = $("#sys-tab-r2").hasClass("active");
                    var isWhite = $("#white-tab-r3").hasClass("active");
                    if (componentType === 'CHECKBOX') {
                        var labelId = $(this).data("labelId");
                        if ($(this).is(":checked")) {
                            if (isCard) {
                                $.search_global_issue_card_labelIds.push(labelId);
                            } else if (isSys) {
                                $.search_global_issue_sys_labelIds.push(labelId);
                            } else if (isWhite) {
                                $.search_global_issue_white_labelIds.push(labelId);
                            } else {
                                $.search_issue_labelIds.push(labelId);
                            }

                            issueCommon.fillSelectedLabelInPanel({id: labelId, text: $(this).data("labelText")});
                        } else {
                            if (isCard) {
                                $.search_global_issue_card_labelIds.removeItem(labelId);
                            } else if (isSys) {
                                $.search_global_issue_sys_labelIds.removeItem(labelId);
                            } else if (isWhite) {
                                $.search_global_issue_white_labelIds.removeItem(labelId);
                            } else {
                                $.search_issue_labelIds.removeItem(labelId);
                            }
                            issueCommon.removeSelectedLabelFromPanel(labelId);
                        }
                    } else if (componentType === 'RADIOBOX' || componentType === 'SELECTOR') {
                        var $sourceRadio = $(this).closest("td").find("input.radiobox[checked]");
                        var lastestLabelId = $(this).data("labelId");
                        var hasLastCheckedRadio = false;
                        if ($sourceRadio.length) {
                            hasLastCheckedRadio = true;
                        }

                        if (hasLastCheckedRadio) {
                            //var lastLabelText = $sourceRadio.data("labelText");  //源单选id
                            var lastLabelId = $sourceRadio.data("labelId"); //源单选id
                            if (lastLabelId != lastestLabelId) {
                                $sourceRadio.removeAttr("checked").prop("checked", false);
                                $(this).attr("checked", true).prop("checked", true);

                                if (isCard) {
                                    $.search_global_issue_card_labelIds.push(lastestLabelId);
                                } else if (isSys) {
                                    $.search_global_issue_sys_labelIds.push(lastestLabelId);
                                } else if (isWhite) {
                                    $.search_global_issue_white_labelIds.push(lastestLabelId);
                                } else {
                                    $.search_issue_labelIds.push(lastestLabelId);
                                }

                                if (isCard) {
                                    $.search_global_issue_card_labelIds.removeItem(lastLabelId);
                                } else if (isSys) {
                                    $.search_global_issue_sys_labelIds.removeItem(lastLabelId);
                                } else if (isWhite) {
                                    $.search_global_issue_white_labelIds.removeItem(lastLabelId);
                                } else {
                                    $.search_issue_labelIds.removeItem(lastLabelId);
                                }
                                issueCommon.removeSelectedLabelFromPanel(lastLabelId);
                                issueCommon.fillSelectedLabelInPanel({id: lastestLabelId, text: $(this).data("labelText")});
                            }
                        } else {
                            $(this).attr("checked", true).prop("checked", true);
                            //$.search_issue_labelValues.push(lastestLabelText);
                            if (isCard) {
                                $.search_global_issue_card_labelIds.push(lastestLabelId);
                            } else if (isSys) {
                                $.search_global_issue_sys_labelIds.push(lastestLabelId);
                            } else if (isWhite) {
                                $.search_global_issue_white_labelIds.push(lastestLabelId);
                            } else {
                                $.search_issue_labelIds.push(lastestLabelId);
                            }
                            issueCommon.fillSelectedLabelInPanel({id: lastestLabelId, text: $(this).data("labelText")});
                        }
                    }
                    issueCommon.refreshDataTable();
                });

                $("#myonoffswitch,#myonoffswitch1,#myonoffswitch2,#myonoffswitch3").on("click", function(e) {
                    var isCard = $("#card-tab-r1").hasClass("active");
                    var isSys = $("#sys-tab-r2").hasClass("active");
                    var isWhite = $("#white-tab-r3").hasClass("active");
                    if (isCard) {
                        if ($(this).is(":checked")) {
                            $.search_global_issue_card_isExact = true;
                        } else
                            $.search_global_issue_card_isExact = false;
                    } else if (isSys) {
                        if ($(this).is(":checked")) {
                            $.search_global_issue_sys_isExact = true;
                        } else
                            $.search_global_issue_sys_isExact = false;
                    } else if (isWhite) {
                        if ($(this).is(":checked")) {
                            $.search_global_issue_white_isExact = true;
                        } else
                            $.search_global_issue_white_isExact = false;
                    } else {
                        if ($(this).is(":checked")) {
                            $.search_issue_isExact = true;
                        } else
                            $.search_issue_isExact = false;
                    }
                    issueCommon.refreshDataTable();
                });

                $('#btnCancelFields,#btnCancelFields1,#btnCancelFields2,#btnCancelFields3').click(function(event) {
                    $('#moreConditions').find("input.radiobox[checked]").removeAttr("checked");
                    $('#moreConditions').find("input[type='checkbox']").removeAttr("checked");
                    var isCard = $("#card-tab-r1").hasClass("active");
                    var isSys = $("#sys-tab-r2").hasClass("active");
                    var isWhite = $("#white-tab-r3").hasClass("active");
                    if (isCard) {
                        $.search_global_issue_card_labelIds = [];
                    } else if (isSys) {
                        $.search_global_issue_sys_labelIds = [];
                    } else if (isWhite) {
                        $.search_global_issue_white_labelIds = [];
                    } else {
                        $.search_issue_labelIds = [];
                    }
                    issueCommon.removeAllSelectedLabelFromPanel();
                    issueCommon.refreshDataTable();
                });
        }
    };
}(i18nRes));
