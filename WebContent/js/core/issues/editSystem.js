/**
 * FileName: editSystem.js
 *
 * File description goes here.
 *
 * Copyright (c) 2014 Iaspec, Inc. All Rights Reserved.
 *
 * @author <a href="mailto:qiqu.huang@iaspec.net">Charlie Huang</a>
 * @Version: 1.0.0
 * @DateTime: 2014-09-22
 */

var editSystem = function() {
    return {
        initialize: function() {
            loadScript($.url_root + "/js/core/issues/issueEditCommon.js", function() {
                issueEditCommon.initialize();
            });
        }
    };
}();
