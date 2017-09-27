/**
 * FileName: messageBox.js
 *
 * File description goes here.
 *
 * Copyright (c) 2010 Asiasoft, Inc. All Rights Reserved.
 *
 * @author <a href="mailto:qiqu.huang@iaspec.net">Charlie Huang</a>
 * @Version: 1.0.0
 * @DateTime: 2014-07-31
 */

var msgBox = (function($) {

	return {
		initialize: function() {
			var self = this;
			$("#divSmallBoxes").off("click").on("click", 'a.btn-go', function(e) {
				($.proxy(self._fncallback, self._pointer))( // hack the this point in the function
					{
						issueId: $(this).data("issueid"),
						processInstanceId: $(this).data("processinstanceid"),
						url: $(this).data("url"),
						code: $(this).data("code")
					});
				self._fncallback = null; //release the resource
				self._pointer = null;
			});
		},

		_pointer: null,

		_fncallback: null,

		_boxBackgroundColor: {
			INFO: "#296191",
			ERROR: "#A65858",
			WARNING: "#fcf8e3",
			SUCCESS: "#549005"
		},

		_icon: { //you should define your icon here
			BELL: "fa fa-bell swing animated",
			TIMES: "fa fa-times"
		},
		/**
		 * 显示弹出框
		 * @param ooBoxProperties {Object} format: {title: "", content: "", color: "", icon: "", extraParams: anyType}
		 */
		showBox: function(ooBoxProperties) {
			var options = {
				title: ooBoxProperties.title,
				content: ooBoxProperties.content,
				color: this._boxBackgroundColor[ooBoxProperties.color]
			};

			if (ooBoxProperties.callback) {
				this._fncallback = ooBoxProperties.callback;
			}

			if (ooBoxProperties.target) { //指定监听目标
				var that = this;
				$("#divSmallBoxes").off("click").on("click", ooBoxProperties.target, function(e) {
					that._fncallback();
					e.stopPropagation();
				});
			}

			if (ooBoxProperties.sourcePointer) {
				this._pointer = ooBoxProperties.sourcePointer;
			}

			var icon = this._icon[ooBoxProperties.icon],
				iconSmall = this._icon[ooBoxProperties.iconSmall],
				timeout = ooBoxProperties.timeout;

			$.extend(options, {
				icon: icon || undefined,
				iconSmall: iconSmall || undefined,
				timeout: timeout || undefined
			});
			$.smallBox(options);
		}
	};
}(jQuery));
