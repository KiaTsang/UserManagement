/**
 * FileName: i18n.js
 * 
 * File description goes here.
 * 
 * Copyright (c) 2010 Asiasoft, Inc. All Rights Reserved.
 * 
 * @author <a href="mailto:qiqu.huang@iaspec.net">Charlie Huang</a>
 * @Version: 1.0.0
 * @DateTime: 2014-07-11
 */

var i18n = (function(i18nRes) {

    return {
        getIssueRemarkTypeBackground : function(key) {
            var msg = '';
            switch (key) {
            case 'REJECT':
                msg = 'txt-color-yellow';
                break;
            case 'SUSPEND':
                msg = 'txt-color-yellow';
                break;
            case 'OPEN':
                msg = 'txt-color-red';
                break;
            case 'FIXED':
                msg = 'txt-color-red';
                break;
            case 'VALIDATED':
                msg = 'txt-color-red';
                break;
            case 'REOPEN':
                msg = 'txt-color-red';
                break;
            case 'DISPUTABLE':
                msg = 'txt-color-yellow';
                break;
            case 'REASSIGN':
                msg = 'txt-color-red';
            case 'SUBMIT':
                msg = 'txt-color-red';
            default:
                msg = 'txt-color-yellow';
            }
            return msg;
        },

        il8nIssueRemarkResultType : function(key) {
            var msg = '';
            if (key == "SUBMIT") {
                msg = i18nRes.issue.operations.SUBMIT;

            } else if (key == "OPEN" || key == "REJECT" || key == "SUSPEND") {
                msg = i18nRes.issue.operations.AUDIT;
            } else if (key == "FIXED" || key == "DISPUTABLE") {
                msg = i18nRes.issue.operations.FIXED;
            } else if (key == "VALIDATED" || key == "REOPEN") {
                msg = i18nRes.issue.operations.validate;

            } else if (key == "REASSIGN") {
                msg = i18nRes.issue.operations.REASSIGN;
            }

            return msg;
        },
        
        // in template, we shourld use specific placeholder such as #@{key}
        translateTemplate2I18n : function translate2I18n(text) {
            if (typeof text !== 'string') {
                throw new Error('The parameter must be a string.');
            }
            
            var getI18nText = function(nodePath, i18nRes) {
                var paths = nodePath.split("."),
                    len = paths.length,
                    curNodeVal = null,
                    i;
                for (i = 0; i < len; i++) {
                    if (!curNodeVal) {
                        if (i18nRes[paths[i]]) {
                            curNodeVal = i18nRes[paths[i]];
                            continue;
                        } else {
                            throw new Error("The key is undefined.");
                        }
                    }
                    
                    if (!curNodeVal[paths[i]]) {
                        throw new Error("The key is undefined.");
                    }
                    
                    curNodeVal = curNodeVal[paths[i]];
                }
                
                return curNodeVal;
            }
            
            if (typeof text.replace === 'function') {
                return text.replace(/#@{(.*?)(?=\})}/g, (function(i18n) {
                    return function(matcher, groupMatcher) {
                        return getI18nText(groupMatcher, i18n);
                    };
                }(i18nRes)));
            }
            return text;
        }
    };
})(i18nRes);
