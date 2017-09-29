/* 
* attachmentPlugin 0.1
* Date: 2015-07-15
* author：tangwenfen
* 使用attachmentPlugin用于附件
*
*
*/ 
(function($){ 
$.fn.attachmentPlugin = function(options){
    // 默认的配置项
    var defaults = {
    } ;
    var options = $.extend(defaults, options);
   //拼凑“附件”的静态页面，用于展示
    var noScript = $("<noscript></noscript>");
    $(noScript).appendTo(this);

    var redirect =  $("<input/>");
    $(redirect).attr({type:"hidden",name:"redirect",value:"http://blueimp.github.com/jQuery-File-Upload/"});
    $(noScript).appendTo(noScript);
    /*start button*/
    var buttonDIV =  $("<div class='row-fluid fileupload-buttonbar'></div>");
    $(buttonDIV).appendTo(this);
     /*start  span7*/
    var span7 =   $("<div class='span7 '>");
    $(span7).appendTo(buttonDIV);

    var addSpan =  $("<span class='btn green fileinput-button'></span>");
    $(addSpan).appendTo(span7);

    var addI =  $("<i class='icon-plus icon-white'></i>");
    $(addI).appendTo(addSpan);

    var addSpan2 =  $("<span></span>");
    $(addSpan2).text("添加文件");
    $(addSpan2).appendTo(addSpan);

    var addInput = $("<input>");
    $(addInput).attr({type:"file",name:"files[]",multiple:true});
    $(addInput).appendTo(addSpan);

    var uploadButton = $("<button class='btn blue start'></button>");
    $(uploadButton).attr("type","submit");
    $(uploadButton).appendTo(span7);

    var uploadI =  $("<i class='icon-upload icon-white'></i>");
    $(uploadI).appendTo(uploadButton);

    var uploadSpan =  $("<span></span>");
    $(uploadSpan).text("开始上传");
    $(uploadSpan).appendTo(uploadButton);

    var cancelButton = $("<button class='btn yellow cancel'></button>");
    $(cancelButton).attr("type","reset");
    $(cancelButton).appendTo(span7);

    var cancelI =  $("<i class='icon-ban-circle icon-white'></i>");
    $(cancelI).appendTo(cancelButton);

    var cancelSpan =  $("<span></span>");
    $(cancelSpan).text("取消上传");
    $(cancelSpan).appendTo(cancelButton);

    var deleteButton = $("<button class='btn red delete'></button>");
    $(deleteButton).attr("type","button");
    $(deleteButton).appendTo(span7);

    var deleteI =  $("<i class='icon-trash icon-white'></i>");
    $(deleteI).appendTo(deleteButton);

    var deleteSpan =  $("<span></span>");
    $(deleteSpan).text("删除");
    $(deleteSpan).appendTo(deleteButton);

    var buttonCheck = $("<input class='toggle fileupload-toggle-checkbox'>");
    $(buttonCheck).attr("type","checkbox");
    $(buttonCheck).appendTo(span7);
    /*end  span7*/
    /*stat span5*/
    var span5 =   $("<div class='span5 fileupload-progress fade '>");
    $(span5).appendTo(buttonDIV);

    var progress =  $("<div  class='progress progress-success progress-striped active' role='progressbar' aria-valuemin='0' aria-valuemax='100'></div>");
    $(progress).appendTo(span5);

    var bar =  $("<div class='bar' style='width:0%'></div>");
    $(bar).appendTo(progress);

    var blank =  $("<div class='progress-extended'>&nbsp;</div>");
    $(blank).appendTo(span5);
    /*end  span5*/
    /*end button*/

    var loading =  $("<div class='fileupload-loading'></div>");
    $(loading).appendTo(this);
    $(loading).append($("<br>"));

    /*start table*/
    var table = $("<table  role='presentation' class='table table-striped table-hover'></table>");
    $(table).appendTo(this);

    var thead = $("<thead></thead>");
    $(thead).appendTo(table);

    var tr = $("<tr></tr>");
    $(tr).appendTo(thead);

    var th =  $("<th></th>");
    $(th).text("文件名");
    $(th).appendTo(tr);

    var th1 =  $("<th class='hidden-480'></th>");
    $(th1).text("文件大小");
    $(th1).appendTo(tr);

    var th2 =  $("<th class='hidden-480'></th>");
    $(th2).text("文件类型");
    $(th2).appendTo(tr);

    var th3 =  $("<th class='hidden-480'></th>");
    $(th3).text("进度");
    $(th3).appendTo(tr);

    var th4 =  $("<th class='hidden-480'></th>");
    $(th4).text("状态");
    $(th4).appendTo(tr);

    var th5 =  $("<th></th>");
    $(th5).appendTo(tr);

    var tbody =  $("<tbody class='files' data-toggle='modal-gallery' data-target='#modal-gallery'></tbody>");
    $(tbody).appendTo(table);
   /*end table*/
};
})(jQuery); 

