/**
 * FileName: issueCard.js
 *
 * File description goes here.
 *
 * Copyright (c) 2010 Asiasoft, Inc. All Rights Reserved.
 *
 * @author <a href="mailto:li.zhou@iaspec.net">julia.zhou</a>
 * @Version: 1.0.0
 * @DateTime: 2014-06-27
 */

var editCard = function() {
	return {
        initialize: function() {
            loadScript($.url_root + "/js/core/issues/issueEditCommon.js", function() {
                issueEditCommon.initialize();
            });
        }
    };
}();
