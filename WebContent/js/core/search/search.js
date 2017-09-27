/**
 * FileName: search.js
 *
 * File description goes here.
 *
 * Copyright (c) 2010 Asiasoft, Inc. All Rights Reserved.
 *
 * @author <a href="mailto:li.zhou@iaspec.net">Julia</a>
 * @Version: 1.0.0
 * @DateTime: 2014-09-20
 */
var viweCardIssue = $.url_root + "/issue/viewIssueOfCard.jspa?issueId=";
var viweSysdIssue = $.url_root + "/issue/viewIssueOfSystem.jspa?issueId=";
var viweWhiteboxIssue = $.url_root + "/issue/viewIssueOfWhitebox.jspa?issueId=";
var outsiteIssue = $.url_root + "/issue/findOutsideIssueById.jspa?issueId=";
var search = function() {

  return {
	initFindLabels:function()
	{
	    $('#label-tabs-ul a[href="#card-tab-r1"]').on('show.bs.tab', function (e) {
	    	var labelUrl = "/issue/findDefaultLabelsForCard.jspa";
	        issueLabel.initListPage(labelUrl,"card-tagTable");
	    });
	    $('#label-tabs-ul a[href="#sys-tab-r2"]').on('show.bs.tab', function (e) {
	  	  var labelUrl = "/issue/findDefaultLabelsForSystem.jspa";
          issueLabel.initListPage(labelUrl,"sys-tagTable");
	    });
	    $('#label-tabs-ul a[href="#white-tab-r3"]').on('show.bs.tab', function (e) {
	  	  var labelUrl = "/issue/findDefaultLabelsForWhitebox.jspa";
          issueLabel.initListPage(labelUrl,"white-tagTable");
	    });
	},
    getSearchFields :function(params)
	 {
	      params["condition"] = $('#search-textfield').val();
	 },
    initSearch : function()
    {
        $('#dt_issues').dataTable({
            "pageLength": 10,
            "paging": true,
            "language" : i18nRes.global.datatable.language,
            "serverSide": true,
		    "searching": false,
		    "ordering": false,
            "bAutoWidth": false,
            "ajax": {
            	url:$.searchIssuesByCondition,
            	type: "POST",
            	dataSrc: "data",
            	traditional: true, //if the value from the select2 plugin, it should be true
            	data: $.proxy(issueCommon.setDatatableData, issueCommon)
            },
            "columnDefs":
            		   [
                		   {
                    		 "targets": [ 0 ],
                    		 "render": function ( result, type, full ) {
                    		   		return search.getFiledValue(full);
                    		  }
                		   }
                    	],
            "columns":
            		[
            		 null
                    ],
            "initComplete":function(oSettings, json){
                    $('#top_totalCount,#bottom_totalCount').html(json.recordsFiltered);
                    $('#top_usedSeconds').html(json.usedSeconds);
	         }
        });
    },
    getFiledValue :function(full)
    {
    	var viewUrl = '';
    	var projectDTO = full.projectDTO == undefined ? '' : full.projectDTO;
    	var projectType = projectDTO == '' ? '' : projectDTO.type == undefined ? '' : projectDTO.type;
    	if(projectType == '')
    	{
    		viewUrl = viweSysdIssue + full.issueId;
    	}
    	else if(projectType == "card")
    	{
    		viewUrl =viweCardIssue + full.issueId;
    	}else if(projectType == "system")
    	{
    		viewUrl = viweSysdIssue + full.issueId;
    	}
    	else if(projectType == "whitebox")
    	{
    		viewUrl = viweWhiteboxIssue + full.issueId;
    	}else if(projectType == "outsiteTest")
    	{
    		viewUrl = outsiteIssue + full.issueId;
    	}
    	
    	var projectName = projectDTO == '' ? '' : projectDTO.name == undefined ? '' : projectDTO.name;
    	
    	var productionDTO = full.productionDTO == undefined ? '' : full.productionDTO;
    	var productionName = productionDTO == '' ? '' : productionDTO.productionName == undefined ? '' : productionDTO.productionName;
    	
    	var projectNameOrProductinName = projectName == '' ? productionName : projectName;

    	var requirementName = projectDTO == '' ? '' : projectDTO.requirementName == undefined ? '' : projectDTO.requirementName;
    	
    	var productModel = full.productModel === undefined ? '' : '<a target="_blank" href="'+viewUrl+'" title="'+i18nRes.searchField.productModel+'"><i class="fa fa-barcode"></i> '+full.productModel+'&nbsp;&nbsp;</a>';
    	var validatedResult = full.validatedResult == undefined ? '' : full.validatedResult;
    	var summary = full.summary === undefined ? '<h4><a target="_blank" href="'+viewUrl+'" title="'+i18nRes.searchField.requirementName+'">'+requirementName+'</a></h4>' : '<h4><a target="_blank" href="'+viewUrl+'" title="'+i18nRes.searchField.summary+'">'+full.summary+'</a></h4>';
    	var fixedUser = full.fixedUserDTO === undefined ? '' : '<a target="_blank" href="'+viewUrl+'" title="'+i18nRes.searchField.fixedUser+'"><i class="fa fa-user"></i> '+full.fixedUserDTO.realName+' [ '+full.fixedUserDTO.name+' ]&nbsp;&nbsp;</a>';
    	var statusTemp = full.status === undefined ? '' : '<a target="_blank" href="'+viewUrl+'" title="'+i18nRes.searchField.status+'"><i class="fa fa-code-fork"></i> '+i18nRes.issue.issueStatus[full.status]+'&nbsp;&nbsp;</a>';
    	var severity = full.severity === undefined ? productModel : '<a target="_blank" href="'+viewUrl+'" title="'+i18nRes.searchField.severity+'"><i class="'+issueCommon.getIssueSeverityFontColor(full.severity)+'"></i> '+i18nRes.issue.issueSeverity[full.severity]+'&nbsp;&nbsp;</a>';
    	var priority = full.priority === undefined ? '' : full.priority== "CRITICAL" ? '<a target="_blank" href="'+viewUrl+'" title="'+i18nRes.searchField.priority+'"><img class="imgAlignment " src="' + $.url_root + '/img/critical.png' + '" style="width: 16px; height: 16px;margin-right:0px;margin-left: -4px;"></img>'+i18nRes.issue.issuePriority[full.priority]+'&nbsp;&nbsp;</a>' : '<a href="'+viewUrl+'" style="width: 15px; height: 15px;margin-right:0px;margin-left: -4px;" title="'+i18nRes.searchField.priority+'">&nbsp;'+ common.getImgUrl(full.priority, i18nRes.issue.issuePriority[full.priority])+'&nbsp;&nbsp;</a>';
    	var description = full.description === undefined ? '' : i18nRes.searchField.description+full.description;
    	
    	if(full.status == "CLOSED" && full.projectDTO.type == "outsiteTest")
    	{
    		statusTemp = '<a target="_blank" href="'+viewUrl+'" title="'+i18nRes.searchField.validatedResult+'"><i class="fa fa-code-fork"></i> '+validatedResult+'&nbsp;&nbsp;</a>';
    	}
    	var html =
   	        '<div class="search-results clearfix smart-form" style="padding-top: 5px; padding-bottom: 5px;">'
    		     +   ''+summary+''
                 +   '<div>'
                 +   '<p class="note">'
                 +   '<a target="_blank" href="'+viewUrl+'" title="'+i18nRes.searchField.projectNameOrProductinName+'"><i class="fa fa-leaf"></i> '+projectNameOrProductinName+'&nbsp;&nbsp;</a>'
                 +   '<a target="_blank" href="'+viewUrl+'" title="'+i18nRes.searchField.code+'"><i class="fa fa-reorder"></i> '+full.code+'&nbsp;&nbsp;</a>'
                 +   ''+fixedUser+''
                 +   ''+statusTemp+''
                 +   ''+severity+''
                 +   ''+priority+''
//                 +   '<div class="url text-success">'
//                 +   ''+viewUrl+''
//                 +   '<i class="fa fa-caret-down"></i>'
//                 +   '</div>'
                 +   '<p class="description">'
                 +   ''+description+''
                 +   '</p>'
                 +   '</div></div><hr style="border:1px dashed #e3e3e3;">';
        return html;
    }
  };
}();
