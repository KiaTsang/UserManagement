var pmsProjectList = (function(){
    var searchField = {};

    return {

        /*Get searchFields value*/
        getSearchFields : function() {
            return searchField;
        },
        /*Set searchFields value*/
        setSearchFields : function(obj) {
            searchField = {};
            $.extend(searchField,obj);
        },
        
        initEvent:function(){
        	$('#simple-search li').click(function(e){
	        	clearSmallBox();
        		if($(this).hasClass('active')) {
            		e.preventDefault();
            		return;
            	}
            	$(this).siblings().removeClass('active');
            	$(this).addClass('active');
            	$(this).find('a').append($(this).parent().find('i'));
            	$('#switchItem').text($(this).text());
            	
            	$('#simple-search-fields').find('input,select').addClass('hide');
            	var name = $(this).find('a').data('lastValue');
            	$('#simple-search-fields').find('input[name="' + name + '"],select[name="' + name + '"]').removeClass('hide');
	        });
	         
	        $('#btn-show-more-search,#btn-show-simple-search').click(function(e){
	            clearSmallBox();

	            $('#more-search').toggle();
	            $('#simple-search').toggle();
	        });
        },
        initBasicSearchEvent:function(){
        	$(".simpleEnter").keyup(function(e){
		    	   if(e.which === 13){
		    	     $("#btn-simple-search").click();
		    	   }
		    });
        	
	         $('#btn-simple-search').click(function(e){
	             clearSmallBox();
	             var obj = {};
	             var name = $('#simple-search li.active').find('a').data('lastValue');
	             var prefix = 'projectQueryCondition.';
	             var value = $.trim($('#simple-search-fields').find('input[name="' + name + '"],select[name="' + name + '"]').val());
	             if(value != ''){
	            	 obj[prefix + name] = value;
	             }
	             pmsProjectList.setSearchFields(obj);
	            $('#dt_projects').DataTable().draw();
	         });
	    },
	    initMoreSearchEvent:function(){
	         var managers=[];
				$.ajax({
					url : $.url_root+"/project/selectManager.jspa",
	                dataType : "json",
	               /* async: false,*/
	                type: "POST",
	                success : function(data) {
	                	var dtos = data.resultList;
	                	for(var i=0, len = dtos.length;i<len;i++){
	                		managers.push({id:dtos[i].name,text: dtos[i].realName,name:dtos[i].name,realName:dtos[i].realName});
	                	}
	                	$("#selectProjectManager").select2({
	        		        allowClear: true,
	        		        multiple: false,
	        		        data: managers,

	        		        formatResult :function(object, container, query){
	        		            var html = "登录名：" + object.name+"<br/>"+"全名：" + object.realName;
	        		            return html;
	        		        },
	        		        formatSelection : function(object, container){
	        		            var realName = object.realName == undefined ? "" : object.realName;
	        		            var html = " " + realName;
	        		            html += (object.name ?  " [ " + object.name + " ]" : "");
	        		            return html;
	        		        }
	        		    }).on('select2-selected', function(e) { //fire when selected the option
	        		    	var data = e.choice;
	                        $('#selectProjectManager').val(data.text);
	                        $('#search-more-projectManager').val(data.name);
	        		    }).on("select2-removed", function(e) { 
	        		    	$('#search-more-projectManager').val("");
        		    	});
	                }
	            });
	         
				$(".moreEnter").keyup(function(e){
			    	if(e.which === 13){
			    	    $("#btn-more-search").click();
			    	}
			    });
				
	        $("#btn-more-search").click(function(e){
	            clearSmallBox();

	            var obj = {};
	            $.extend(obj, pmsProjectList.processInput($("#search-more-projectName"),'name'));
	            $.extend(obj, pmsProjectList.processInput($("#search-more-projectCode"),'code'));
	            $.extend(obj, pmsProjectList.processInput($("#search-more-projectManager"),'projectManager'));
	            $.extend(obj, pmsProjectList.processInput($("#search-more-projectStatus"),'status'));
	            
	            pmsProjectList.setSearchFields(obj);
	            $('#dt_projects').DataTable().draw();
	        });
	    },
		processInput : function($searchScope,postFieldName) {
            var obj = {};
            var prefix = 'projectQueryCondition.';
            var value = $.trim($searchScope.val());
            if(value != '') {
                // need prefix for direct into queryCondition obj by struts2
                obj[prefix + postFieldName] = value;
            }
            return obj;
        },
        getProjectStatusText:function(type) {	
			return i18nRes.projectStatus[type];
		},
        /*Draw Table by DataTable Plugins*/
        runDataTables : function() {
        	var renderOrderColumn=function(index){
		    	  var defaultColumn = "project.createTime";
		    	  switch (index) {
		    	    case 1:
		    	      return "project.name";
		    	    case 2:
		    	      return "project.code";
		    	    case 3:
		    	      return "project.projectManager";
		    	    case 4:
			    	  return "to_char(project.description)";
		    	    case 5:
		    	      return "project.status";
		    	    default:
		    	      return defaultColumn;
		    	  }
			};
        	var customParams = function(params) {
			    $.extend(params, pmsProjectList.getSearchFields());
   	        	params['pageSize'] = params.length;
   	        	params['startIndex'] = params.start;
   	        	params['draw'] = params.draw;
   	        	params["projectQueryCondition.sortColumn"] =renderOrderColumn(params.order[0].column);
		        params["projectQueryCondition.sortOrder"] = params.order[0].dir;
	        	return params;
        	};

            $('#dt_projects').DataTable({
            	/*sDom: 'C<"clear">lfrtip',
                oColVis: {
                   sAlign: "left",
                   showAll: "显示全部",
                   showNone: "隐藏全部",
                   buttonText:"显示/隐藏列"
                },
                bLengthChange:false,
                searching: false,*/
            	"sPaginationType" : "bootstrap_full",
                pageLength: 10,
                paging: true,
                bAutoWidth: false,
                //ordering: false,
                responsive: true,
                language : i18nRes.global.datatable.language,
                stateSave : true,
                serverSide : true,
                "lengthMenu": [[10, 25, 50, 100], [10, 25, 50, 100]],
                "lengthChange": true,
                "paging": true,
                "sDom": "<'dt-top-row'><'dt-wrapper't><'dt-row dt-bottom-row'<'row'<'col-sm-4'i><'col-sm-8 text-right'p>><'row'<'col-xs-12 col-sm-12 col-md-12 col-lg-12'l>>>",
                ajax: {
                    url: $.url_root + "/project/findPMSProjectList.jspa",
                    type: "POST",
                    dataSrc: "data",
                    traditional: true,
                    data: customParams
                },
                columns:
                    [
                        {data: null},
                        {data: "name", defaultContent: ""},
                        {data: "code", defaultContent: ""},
                        {data: "projectManagerDTO.realName", defaultContent: ""},
                        {data: "description", defaultContent: ""},
                        {data: "status", defaultContent: ""},
                        {data: "createTime", defaultContent: ""},
                        {data: null}
                    ] ,
                columnDefs:
                    [
                        {
                            targets: [ 0 ],
                            orderable: false
                        },
                        {
                            targets: [ 1 ],
                            render: function(data, type, full) {
                                data = data || "";
                                return '<a title="' + data + '"href="'+$.url_root+'/project/viewPmsProject.jspa?pid=' + full.projectId + '"> ' + data +  ' </a>';
                            }
                        },
                        {
                            targets: [ 4 ],
                            render: function(data, type, full) {
                                data = data || ""
                                data = data.replace(/(\<|<\/).+?\>/g, "");
                                return data;
                            }
                        },
                        {
                            targets: [ 5 ],
                            render: function(data, type, full) {
                                data = data || "";
                                var statusBgColor = {
                            		    'OPEN':'label label-success',
                            		    'CLOSE':'label label-default',
                            		};
                                
                                return data == "" ? "" : '<span class="'+statusBgColor[data]+'"> ' + pmsProjectList.getProjectStatusText(data) +  ' </span>';
                            }
                        },
                        {
                            targets: [ 7 ],
                            orderable: false,
                            render:function(data, type, full) {
                                var pid = full.projectId;
                                var btn_operationList = '<div>' 
                                	+'<a class="btn btn-primary btn-xs dropdown-toggle" data-toggle="dropdown" aria-expanded="true" id="' + pid + '">' 
                                	+'<i class="fa fa-gear" style="padding: 0 4px 0 0;"></i>'
                                	+'<i class="fa fa-caret-down"></i>' 
                                	+'</a>' 
                                	+'<ul class="dtable dropdown-menu" role="menu" aria-expanded="' + pid + '">'
	                                +'<li role="presentation"><a role="menuitem" tabindex="-1" title="查看" href="'+$.url_root+'/project/viewPmsProject.jspa?pid=' + pid +'">查看</a></li>'
	                                +'<li role="presentation" class="divider"></li>' 
	                                +'<li role="presentation"><a role="menuitem" tabindex="-1" title="删除" href="javascript:;" class="btnDeletePmsProject" data-projectId="' + pid + '">删除</a></li>'
	                                +'</ul>' 
	                                +'</div>';
                                
                                return btn_operationList;
                            }
                        }
                    ],

                fnDrawCallback: function(oSettings, json) {
                    this.DataTable().column(0, {order:'applied'}).nodes().each(function(cell, i) {
                        cell.innerHTML = (i + 1);
                    });
                }
            });
            
            $("table").resizableColumns({});

            // 候选方案
            /*.on("order.dt", function() {
            $(this).DataTable().column(0, {order:'applied'}).nodes().each(function(cell, i) {
                console.log(cell);
                cell.innerHTML = (i + 1);
            });*/


            $('#dt_projects').on('draw.dt',function(){
                $('.btnDeletePmsProject').off('click').on('click',function(e){
                	clearSmallBox();
                    var pid = $(this).attr('data-projectId');
                     $.smallBox({
                            title : "提示信息",
                            content : "本操作将会删除该项目相关信息，并且无法恢复。<br />确定删除吗？ " +
                            		"<p class='text-align-right'><a href='javascript:void(0);' onclick='pmsProjectList.deletePmsProject("+pid+");' class='btn btn-danger btn-sm'>是</a> " +
                            				"<a href='javascript:void(0);'  class='btn btn-primary btn-sm'>否</a></p>",
                            color : "#296191",
                            icon : "fa fa-bell swing animated"
                        });
                    e.preventDefault();
                });
            });
        },
       /* Delete the selected test project*/
        deletePmsProject : function(projectId) {
        	// 锁定，防止重复提交
			if(!lockSmallBox()) {
				return;
			}
            $.ajax({
                url:$.url_root+'/project/deletePMSProject.jspa',
                type : "post",
                traditional : true,
                dataType : 'json',
                data: {
                     'pid': projectId
                },
                success: function(result){
                    checkResult(result, {
                        message : "删除成功！",
                        showBox : true,
                        callback : function(){
                            $('#dt_projects').DataTable().draw();
                        }
                    });
                },
                error: function(xhr, textStatus, errorThrown) {
                    showOperationError(xhr, textStatus, errorThrown);
                }
            });
        },
        
        removeSelectSearchInput: function() {
            $(".searchRemoved .select2-search").remove();
        }
    };
}());
