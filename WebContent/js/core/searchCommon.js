/**
 * FileName: searchCommon.js
 * File description: 用于简单和复杂查询页面的组件及内容
 * Copyright (c) 2016 Eastcompeace, Inc. All Rights Reserved.
 *
 * @author <a href="mailto:zengqingyue@eastcompeace.com">zengqingyue</a>
 * @DateTime: 2017-11-20
 */

/**
 * searchCommon所有属性和方法定义
 * @type {searchCommon}
 */
var searchCommon = function () {

    var handleSelect2 =  function() {
        _initRemoteSearchSelector(); // 初始化简单搜索部分select2插件，主要针对input[data-url]元素
        $.each($("input[data-src=local]"), function(i, v) {
            var $that = $(this);
            _initLocalSearchSelector($that, $that.attr("name"));
        });
    }

    function _initRemoteSearchSelector() {
        var that = this;
        $("input[data-url]:not('.ignored')").each(function(i, v) {
            var $selector = $(this);
            var options = $selector.data("options"),
                params = {};
            for (var k in options) {
                params[options[k]] = $selector.data(k);
            }
            that._getRemoteItems($selector.data("url"), $selector, params);
        });
    }

    function _getRemoteItems (url, $select2Container, extraParams) {
        $select2Container.select2($.extend({
            allowClear: true,
            width: "100%",
            multiple: true,
            minimumInputLength: 1,
            query: function(options) {
                var realParams = {};
                $.extend(realParams, {
                    pageSize: 5,
                    pageNum: options.page
                }); // 默认每次显示5条记录

                for (var k in extraParams) {
                    if (extraParams.hasOwnProperty(k)) {
                        realParams[k] = (extraParams[k] || options.term);
                    }
                }

                $.ajax({
                    global: false,
                    url: url,
                    dataType: "json",
                    type: "POST",
                    data: realParams,
                    quietMillis: 300,

                    success: function(data) { // data format:
                        // {"results":[{"id":"developer1","text":"developer1"}]}
                        checkResult(data, {
                            showBox: false,
                            callback: function() {
                                options.callback(data.json);
                            }
                        });
                    }
                });
            },
            dropdownCssClass: "bigdrop"
        }, {
            multiple: !$select2Container.data("single") ? true : false
        }, {
            minimumInputLength: $select2Container.data("minLimit") === false ? "" : 1
        }, {
            createSearchChoice: $select2Container.data("createsearchchoice") ? function(term, data) { // term为输入关键字，data为搜索总数据
                var choice = {
                    id: 0, // 约定，0代表创建新的标签组
                    text: term
                };
                $.each(data, function(i, v) {
                    if (term == v.text) {
                        choice = {
                            id: null,
                            text: term
                        };
                        return false;
                    }
                });
                return choice;
            } : null
        })).on("select2-selected", function(e) {
                $(this).data("selectedtext", e.choice.text);
            });
    }

    // 初始化数据源非来自远程的select2插件，主要针对input[data-url]元素
    function _initLocalSearchSelector ($select2Container, datas, disabled) { // items为数组，下拉列表项
        datas = (datas instanceof Array || datas instanceof Object ? datas : (typeof searchCommon.select2InitValue[datas] === "function" ? searchCommon.select2InitValue[datas](this) : searchCommon.select2InitValue[datas]));
        $select2Container.select2($.extend({
            width: "100%",
            multiple: true,
            data: datas // data format:
            // [{"id":"developer1","text":"developer1"}]
        }, {
            multiple: !$select2Container.data("single") ? true : false
        }, {
            width: $select2Container.data("width") || "100%"
        }, {
            initSelection: ($select2Container.data("initialize") ?
                function($element, callback) {
                    var initVals = [];
                    $.each($element.val().split(","), function(i, v) {
                        $.each(datas, function(i, obj) {
                            if (obj.id == v) {
                                initVals.push(obj);
                                return false;
                            }
                        });
                    });
                    callback(initVals);
                } : null)
        }, {
            allowClear: $select2Container.data("clear") ? true : false
        }, {
            formatSelection: function(object, container) {
                var html = "";
                if ("disabled" in object) {
                    if (object.disabled) {
                        html =  "<strike>" + object.text + "</strike>";
                        if ($select2Container.data("single")) {
                            container.css("background-color", "#959EA6");
                        } else {
                            container.parent().css("background-color", "#959EA6");
                        }
                    } else {
                        html = object.text;
                    }
                } else {
                    html = object.text
                }
                return html;
            }
        })).select2("enable", disabled ? false : true);    // .select2("enable", $select2Container.data("isactived"))

        if ($select2Container.data("select")) { // 设定默认选中值
            $select2Container.select2("val", $select2Container.data("select"));
        }
    }

    return {
        _const: {
            searchType: {
                simple: "simple",
                combination: "combination"
            }
        },
        select2InitValue: {
        },
        tableAjaxParam: {
            proxyClass: undefined,
            proxyMethod: undefined
        },
        // 绑定查询事件
        bindingSearchEvent: function() {
            var that = this;

            // 绑定简单搜索左边部分的按钮操作
            $("#issue-condition-selector").on("click", "a", function(e) {
                var $that = $(this),
                    name = $that.data("lastValue"),
                    $form = $that.closest("form"),
                    $input = $form.find("input[name=" + name + "]");

                if ($input.hasClass("hidden")) {
                    $input.removeClass("hidden").siblings("input").addClass("hidden");
                }

                if (!$that.parent().hasClass("active")) {
                    $that.closest("div").find("span:first").html($(this).html());
                    $(this).prepend('<i class="fa fa-check"></i>').parent().addClass("active").siblings().removeClass("active").find("i").remove();
                }
            });

            // 绑定高级和基本按钮事件
            $('#btn-show-more-search, #btn-show-simple-search').click(function(e) {
                $('#more-search').toggle();
                $('#simple-search').toggle();
                $("#query-mode").val($(this).data("searchMode"));
            });

            // 绑定搜索按钮事件
            $("#btn-simple-search, #btn-combination-search").click(function(e) {
                that.refreshDataTable();
            });

            // 绑定表单按下enter响应事件
            $("#simple-search-form").find("input[data-keyup='true']").keyup(function(e) {
                if (e.which === 13) { // when click the Enter
                    that.refreshDataTable();
                }
            });

            var searchKey = $.trim($(".searchKey").val());
            if (searchKey != "") { // 从主页点击查看信息触发
                $("#issue-condition-selector").find("a[data-last-value=" + searchKey + "]").click();
                $("#simple-search-form").find("input[name=" + searchKey + "]").val($(".searchValue").val());
            }

            $("#btn-global-search").click(function() {
                that.refreshDataTable($.searchIssuesByCondition);
            });

            // 绑定表单按下enter响应事件
            $("#global-search-form").find("input[data-keyup='true']").keyup(function(e) {
                if (e.which === 13) { // when click the Enter
                    that.refreshDataTable($.searchIssuesByCondition);
                }
            });

            $("#dt_issues > tbody").on("dblclick", "tr", function(e) {
                var url = $(this).find("td").eq(0).children().attr("href");
                if (url) {
                    //location.href = url;
                    window.open(url);
                }
            });
        },

        // 刷新列表
        refreshDataTable: function(urlTemp) {
            var url = '../../controllerProxy.do?method=callBack';
            if (urlTemp != null) {
                url = urlTemp;
            }
            var isCard = $("#card-tab-r1").hasClass("active");
            var isSys = $("#sys-tab-r2").hasClass("active");
            var isWhite = $("#white-tab-r3").hasClass("active");
            if (isCard || isSys || isWhite) {
                url = $.searchIssuesByCondition;
            }

            $('#dt_issues').on('preXhr.dt', function(e, settings, data) {

            }).DataTable().ajax.url(url).load(function(json) {
                    $('#top_totalCount,#bottom_totalCount').html(json.recordsFiltered);
                    $('#top_usedSeconds').html(json.usedSeconds);
                }); // 重绘datatable，再次触发ajax请求

        },

        // 设置Datatable的分页与查询
        setDatatableData: function(params) {
            var queryConditions = [];
            var putObj = [];
            var customParams = {
                    draw: params.draw, // draw, avoid to be attacted
                    pageSize: params.length, // pageSize
                    startIndex: params.start // startIndex to retrieve in database
                };
            var that = this;

            if ($("#query-mode").val() === that._const.searchType.simple) {
                var obj = {};

                obj.isLike = true;
                obj.isRaw = false;
                obj.isEntityField = true;
                obj.isCaseSensitive = false;
                var $selected = $("#issue-condition-selector > li.active > a"),
                    selectedComponentName = $selected.data("lastValue"),
                    inputValue = $.trim($("input[name=" + selectedComponentName + "]").val());
                obj.fieldName = selectedComponentName;
                if (inputValue) {
                    if ($selected.data("multi")) {
                        obj.type = "checkbox";
                        obj.checkboxCondition = inputValue;
                    } else {
                        obj.type = "string";
                        obj.stringCondition = inputValue;
                    }

                }
                queryConditions.push(obj);
            } else if ($("#query-mode").val() === that._const.searchType.combination) {
                $("input[data-moda]").each(function(i, dom) {
                    var inputValue = $.trim($(this).val());
                    if (inputValue) {
                        var obj = {};
                        obj.isLike = true;
                        obj.isRaw = false;
                        obj.isEntityField = true;
                        obj.isCaseSensitive = false;
                        obj.fieldName = $(this).attr("name");
                        console.log($(this).data("type"));
                        if ($(this).data('type') === "checkbox") {
                            obj.type = "checkbox";
                            obj.checkboxCondition = inputValue;
                        } else if ($(this).data('type') === "date") {
                            var myStartFieldValue = inputValue + " 00:00:00";
                            var myEndFieldValue = inputValue + " 23:59:59";
                            obj.type = "date";
                            obj.startDate = myStartFieldValue;
                            obj.endDate = myEndFieldValue;
                        } else {
                            obj.type = "string";
                            obj.stringCondition = inputValue;
                        }
                        queryConditions.push(obj);
                    }
                });
            }

            putObj.push(StringUtil.decorateRequestData('List',queryConditions));
            putObj.push(StringUtil.decorateRequestData('Integer',params.start + 1));
            putObj.push(StringUtil.decorateRequestData('Integer',params.length));

            var obj = new Object();
            obj.proxyClass = this.tableAjaxParam.proxyClass;//"fileController";
            obj.proxyMethod = this.tableAjaxParam.proxyMethod;//"getReportTaskListByCondition";
            obj.jsonString = MyJsonUtil.obj2str(putObj);

            return obj;
        },
        init: function () {
            handleSelect2();
        }
    };
}();