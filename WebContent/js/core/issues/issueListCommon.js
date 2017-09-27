/**
 * 加载当前系统所有类型的用户到select2插件中
 */
Eipd.namespace("issue.issueCommon").initUsers = function(url, isMultiple, i18n) {
    $("input[data-allusers]:hidden").each(function(i, v) {
        $(this).select2({
            url: url,
            allowClear: true,
            width: "100%",
            multiple: isMultiple,

            query: function(options) {
                $.ajax({
                    global: false,
                    url: url,
                    dataType: "json",
                    type: "POST",
                    data: {
                        pageLen: 2,
                        pageNum: options.page,
                        "userQueryConditionDTO.name": options.term,
                        "userQueryConditionDTO.realName": options.term
                    },
                    quietMillis: 300,

                    success: function(data) {
                        checkResult(data, {
                            showBox: false,

                            callback: function() {
                                options.callback(data.json);
                            }
                        });
                    }
                });
            },

            formatResult: function(object, container, query) {
                var realName = "<br>" + i18n.system.userName + i18n.interpunction.colon + (object.text || ""),
                    html = i18n.system.loginName + i18n.interpunction.colon + object.extraInfos.ln;
                return html += realName;;
            },

            dropdownCssClass: "bigdrop"
        });
    });
};
