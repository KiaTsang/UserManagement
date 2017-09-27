<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html>
<html lang="zh">
<head>
<link href="<s:url value="/css/summernote.css" />" rel="stylesheet" type="text/css" >
<link href="<s:url value="/css/summernote-bs3.css" />" rel="stylesheet" type="text/css" >
<style>
    .note-editor {
        border: 1px solid #a9a9a9!important;
    }

    .no-padding .profile-message {
        overflow: visible!important;
    }

    .no-padding .profile-message, .no-padding .profile-message > div:first-child {
        padding-left: 0;
        padding-right: 0;
    }

    .no-padding .profile-message > div:first-child {
        margin: 0 0 20px 0;
    }

    .btnGroup {
        display: inline-block;
    }

    .smart-timeline-list .well {
        margin-bottom: 10px!important;
        max-width: 245px!important;
    }

    .profile-message > ul > li:first-child {
        margin: 10px 15px 0 20px!important;
    }

    .profile-message .note {
        margin: 0 0 20px!important;
        padding: 15px 30px 15px 15px!important;
        color: #404040!important;
    }

    .profile-message .note-info {
        border-color: #57b5e3!important;
    }

    .profile-message .note h4.block {
        padding-bottom: 10px!important;
        padding-top: 10px!important;
        margin-top: 0!important;
    }

    .profile-message .note p:last-child {
	    margin-bottom: 0!important;
	}
</style>
</head>
<body>
    <jsp:include page="/pages/top.jsp"></jsp:include>
    <!-- Left panel : Navigation area -->
    <!-- Note: This width of the aside area can be adjusted through LESS variables -->
    <jsp:include page="/pages/leftnav.jsp"></jsp:include>

    <div id="main" role="main">
        <div id="ribbon">
            <!-- breadcrumb -->
            <ol class="breadcrumb">
                <li><a href="<s:url value="/dashboard_cardpro.jspa" />">首页</a></li>
                <li>个人资料</li>
            </ol>
        </div>
        <div id="content" style="opacity: 1;">
        <!-- row -->
            <div class="row">
	            <div class="col-sm-12">
	                <div class="well well-sm">
	                    <div class="row">
	                        <div class="col-sm-12 col-md-12 col-lg-6">
	                            <div class="well well-light well-sm no-margin no-padding">
	                                <div class="row">
	                                    <div class="col-sm-12">
	                                        <div id="myCarousel" class="carousel fade profile-carousel">
	                                            <div class="air air-bottom-right padding-10">
	                                            </div>
	                                            <div class="air air-top-left padding-10">
	                                            </div>
	                                            <ol class="carousel-indicators">
	                                                <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
	                                                <li data-target="#myCarousel" data-slide-to="1" class=""></li>
	                                                <li data-target="#myCarousel" data-slide-to="2" class=""></li>
	                                            </ol>
	                                            <div class="carousel-inner">
	                                                <!-- Slide 1 -->
	                                                <div class="item active">
	                                                    <img src="img/demo/s1.jpg" alt="">
	                                                </div>
	                                                <!-- Slide 2 -->
	                                                <div class="item">
	                                                    <img src="img/demo/s2.jpg" alt="">
	                                                </div>
	                                                <!-- Slide 3 -->
	                                                <div class="item">
	                                                    <img src="img/demo/m3.jpg" alt="">
	                                                </div>
	                                            </div>
	                                        </div>
	                                    </div>

	                                    <div class="col-sm-12">

	                                        <div class="row">

	                                            <div class="col-sm-3 profile-pic">
	                                                <img class="logoPathImg" style="cursor: pointer; width: 100px; height: 100px;" src="<s:url value="%{userDTO.logoPath}" />">
	                                               	<div class="hidden">
	                                                      <label class="input input-file" for="file">
	                                                          <div class="button">
	                                                              <input id="file-upload" type="file" name="upload">
	                                                          </div> 
	                                                      </label>
	                                                  </div>

	                                                <div class="padding-10">
	                                                    <h4 class="font-md"><strong>${issueStatisticDTO.newIssues}</strong>
	                                                        <br>
	                                                        <small>缺陷</small>
	                                                    </h4>
	                                                    <br>
	                                                    <h4 class="font-md"><strong>${issueStatisticDTO.pendingFixingIssues}</strong>
	                                                        <br>
	                                                        <small>已修复</small>
	                                                    </h4>
	                                                </div>
	                                            </div>
	                                            <div class="col-sm-6">
	                                                <h1>${userDTO.name}</span>
	                                                    <br>
	                                                    <small>
	                                                        <s:iterator value="roleNames" var="roleName" status="st">
	                                                            ${roleName}<s:if test="!#st.last">,</s:if>
	                                                        </s:iterator>
	                                                    </small>
	                                                </h1>

	                                                <ul class="list-unstyled">
	                                                    <li>
	                                                        <p class="text-muted">
	                                                            <i class="fa fa-phone"></i>&nbsp;&nbsp;
	                                                            <span class="txt-color-darken">
                                                                    <a href="javascript:void(0);" data-type="text" data-name="userDTO.phone" data-pk="${userDTO.userId}" data-value="${userDTO.phone}">${userDTO.phone}</a>
                                                                </span>
	                                                        </p>
	                                                    </li>
	                                                    <li>
	                                                        <p class="text-muted">
	                                                            <i class="fa fa-envelope"></i>&nbsp;&nbsp;<a href="mailto:${userDTO.email}" data-type="text" data-name="userDTO.email" data-pk="${userDTO.userId}" data-value="${userDTO.email}">${userDTO.email}</a>
	                                                        </p>
	                                                    </li>
	                                                    <li>
	                                                        <p class="text-muted">
	                                                            <i class="fa fa-skype"></i>&nbsp;&nbsp;<a class="realName" href="javascript:void(0);" data-type="text" data-name="userDTO.realName" data-pk="${userDTO.userId}" data-value="${userDTO.realName}">${userDTO.realName}</a>
	                                                        </p>
	                                                    </li>
	                                                    <li>
	                                                        <p class="text-muted">
	                                                            <i class="fa fa-calendar"></i>&nbsp;&nbsp;
	                                                            <span class="txt-color-darken">最后登录
	                                                                <a href="javascript:void(0);" rel="tooltip" title="" data-placement="top" data-original-title="Create an Appointment">${userDTO.lastLoginTime}</a>
	                                                            </span>
	                                                        </p>
	                                                    </li>
	                                                </ul>
	                                                <a class="btn btn-default btn-xs btn-edit" href="javascript:void(0);">
	                                                    <i class="fa fa-edit"></i> 编辑个人简述
	                                                </a>
	                                                <div class="btnGroup" style="display: none;">
	                                                    <a class="btn btn-primary btn-xs btn-save" href="javascript:void(0);">
	                                                        <i class="fa fa-save"></i> 保存
	                                                    </a>
	                                                    <a class="btn btn-default btn-xs btn-cancel" href="javascript:void(0);">取消 </a>
	                                                </div>
	                                                <div id="user-description" class="chat-body profile-message">
	                                                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
	                                                        <ul class="list-unstyled">
    	                                                        <li>
    	                                                          <div class="summernote">${userDTO.description }</div>
    	                                                        </li>
	                                                        </ul>
	                                                  </div>
	                                                </div>
	                                                <br>
	                                                <br>
	                                            </div>
	                                        </div>
	                                        <input type="hidden" id="userId" value="${userDTO.userId}">
	                                    </div>
	                                </div>

	                                <div class="row">

	                                    <div class="col-sm-12">

	                                        <hr>

	                                        <div class="padding-10">
	                                            <ul class="nav nav-tabs tabs-pull-right">
	                                                <li class="active">
	                                                    <a href="#a1" data-toggle="tab">我的评论</a>
	                                                </li>
	                                                <li class="pull-left">
	                                                    <span class="margin-top-10 display-inline"><i class="fa fa-rss text-success"></i> 活动信息</span>
	                                                </li>
	                                            </ul>

	                                            <div class="tab-content padding-top-10">
	                                                <div class="tab-pane fade in active" id="a1">
	                                                    <div class="chat-body no-padding profile-message"></div>
	                                                </div>
	                                            </div>
	                                        </div>
	                                    </div>
	                                </div>
	                                <!-- end row -->
	                            </div>
	                        </div>

	                        <div class="col-sm-12 col-md-12 col-lg-6">
	                            <div class="padding-10">
	                                <div class="tab-pane fade in active" id="a2">
	                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
	                                        <h3>历史信息</h3>

	                                        <div class="no-history-info"></div>
	                                        <!-- Timeline Content -->
	                                        <div class="smart-timeline">
	                                            <ul class="smart-timeline-list" id="historyWrapper">
	                                                <li class="text-center btn-load-more">
	                                                    <a href="javascript:void(0)" class="btn btn-sm btn-default"><i
	                                                        class="fa fa-arrow-down text-muted"></i> <span id="load-more-banner">加载更多</span></a>
	                                                </li>
	                                            </ul>
	                                        </div>
	                                        <!-- END Timeline Content -->
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                    <!--end row-->
                        <input type="hidden" id="userId" value="${userDTO.userId}">
                        <input type="hidden" id="userName" value="${userDTO.name}">
	                </div>
	            </div>

            </div>
        <!-- end row -->
        </div>
    </div>
<jsp:include page="/pages/footer.jsp" />
<script src="<s:url value="/js/resetheight.js"/>"></script>
<script type="text/javascript">
    // DO NOT REMOVE : GLOBAL FUNCTIONS!
    pageSetUp();

    loadScript('<s:url value="/js/plugin/summernote/summernote.js" />', loadDataTableScripts);

    function loadDataTableScripts() {

        loadScript('<s:url value="/js/plugin/x-editable/x-editable.js" />', fun1);
        
        function fun1() {
        	loadScript('<s:url value="/js/plugin/jquery-file/jquery.fileupload.js" />', fun2);
        }
        
        function fun2() {
        	loadScript('<s:url value="/js/plugin/jquery-file/jquery.iframe-transport.js" />', up_10);
        }
        
        function up_10() {
            loadScript('<s:url value="/js/plugin/jquery-file/jquery.xdr-transport.js" />', up_20);
        }

        function up_20() {
            loadScript('<s:url value="/js/plugin/jquery-file/jquery.fileupload-process.js" />', up_30);
        }

        function up_30() {
            loadScript('<s:url value="/js/plugin/jquery-file/jquery.fileupload-validate.js" />', up_40);
        }
        
        function up_40() {
            loadScript('<s:url value="/js/lang/summernote-zh-CN.js" />', initFileUpload);
        }

        function initFileUpload() {
            loadScript('<s:url value="/js/core/issues/userProfile.js" />', initialScript);
        }
    }

    function initialScript() {
        profile.initialize();
    }
</script>
</body>

</html>
