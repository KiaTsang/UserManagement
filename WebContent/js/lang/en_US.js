/****exception*****/
exception={
	global:{
		network : "网络异常：",
		usernameIsNotExsit: "用户名不存在",
		systemException : "系统发生异常，请联系管理员！",
		parameterInputInperfect : "参数输入不完整！",
		parameterInputInvalid : "参数输入无效！",
		objectDoesNotExist : "数据不存在！",
		objectAlreadyExists : "数据已存在！",
		accessDenied : "你没有相应权限，请联系管理员！",
		usernameShouldBeInput : "用户名不能为空，请重新输入！",
		usernameInputInvalid : "用户名输入格式不有误，请重新输入！",
		usernameIsExsit : "用户名已经存在！",
		userIsDisabled : "用户已被锁定，请联系管理员！",
		emailIsExsit : "该邮箱已于其他用户绑定，请重新输入！",
		passwordShouldBeInput : "密码不能为空，请输入密码！",
		passwordInputInvalid : "密码格式不正确，请重新输入！",
		passwordIsError : "密码错误，请重新输入！",
		authenticationError : "用户名或密码错误，请重新输入！",
		ftpError : "FTP操作失败！",
		fileOperateFailed : "文件操作失败！",
		nullFindResult: "获取信息失败！",
		againPlease : "稍后请重试！",
		evalError : "{0}",
		dataassociatedwithother:"当前项目正在被使用中！",
		dateformatInvalid : "日期格式不对！"
	},
	issue:{

	}
};

/****issue*****/
i18nRes ={
	global:{
		datatable : {
			language : {
				"processing": "正在加载中......",
	    		"lengthMenu": "每页显示 _MENU_ 条记录",
	    		"zeroRecords": "对不起，查询不到相关数据！",
	    		"info": "当前显示 _START_ 到 _END_ 条，总共 _TOTAL_ 条记录",
	    		"infoEmpty": "没有符合指定条件的记录",
	    		"emptyTable": "没有符合指定条件的数据",
	    		"infoFiltered": "该页 _MAX_ 条记录",
	    		"paginate": {
	    			"first":    "首页",
	    			"previous": "上一页",
	    			"next":     "下一页",
	    			"last":     "末页"
	    		}
			}
		},
		save : '提交',
		remove : '删除',
		cancel : '取消',
		pass : '确定',
		yes : '是',
		no : '否',
		view :'查看',
		edit :'编辑',
		successDeleted:'删除成功！',
		select:'请选择一条记录！',
		confirm : {
			title : "提示信息"
		},
		projectType : {
			card:'卡产品',
			system:'系统',
			whitebox:'白盒',
			outsiteTest:'外场测试'
		},
		year : '年',
		month : '月',
		day : '日',
		system: {
			loginName: "登录名",
			userName: "用户名"
		},
		interpunction: {
			colon: "："
		}
	},
	issue:{
		operations:{
		   AUDIT : '审核',
		   REJECT : '否决',
		   SUSPEND : '搁置',
		   APPLY : '认领',
		   ASSIGN : '指派',
		   REASSIGN: '重新指派',
		   VALIDATED : '验证通过',
		   INVALIDATED : '验证未通过',
		   validate : '验证',
		   REOPEN : '重新打开',
		   DISPUTABLE : '争议',
		   CLOSE : '关闭',
		   FIXED : '修复',
		   SUBMIT: '提交',
		   DELETE: '删除',
		   view_issue: '查看缺陷',
		   comment_issue: '添加评论',
		   dtms_res_issue_approve_new : '审核',
		   dtms_res_issue_suspend : '搁置',
		   dtms_res_issue_reject : '否决',
		   dtms_res_issue_claim : '认领',
		   dtms_res_issue_assign : '指派',
		   dtms_res_issue_disputable : '争议',
		   dtms_res_issue_fix : '已修复',
		   dtms_res_issue_validate : '验证通过',
		   dtms_res_issue_invalidated : '验证不通过',
		   dtms_res_issue_close : '关闭',
		   dtms_res_issue_reopen : '重新打开',
		   dtms_res_issue_delete: '删除',
		   dtms_res_issue_submit: '提交'
		},
		auditItem: {
			audit: "审核",
			no_audit: "不审核"
		},
		dialogTitle: {
		 	AUDIT: "审核缺陷<strong>{0}</strong>为<strong>打开状态</strong>",
			SUSPEND: "置缺陷<strong>{0}</strong>为<strong>搁置状态</strong>",
			REJECT: "置缺陷<strong>{0}</strong>为<strong>否决状态</strong>",
			APPLY: "认领缺陷<strong>{0}</strong>",
			ASSIGN: "为缺陷<strong>{0}</strong>指定修复者",
			DISPUTABLE: "置缺陷<strong>{0}</strong>为<strong>争议状态</strong>",
			FIXED: "置缺陷<strong>{0}</strong>为<strong>已修复状态</strong>",
			VALIDATED: "置缺陷<strong>{0}</strong>为<strong>通过状态</strong>",
			CLOSE: "关闭缺陷<strong>{0}</strong>",
			REOPEN: "置缺陷<strong>{0}</strong>为<strong>重新打开状态</strong>",
			DELETE: "删除缺陷<strong>{0}</strong>",
			SUBMIT: "提交缺陷<strong>{0}</strong>",
			REASSIGN: "重新指派缺陷<strong>{0}</strong>",
			commentTitle: "为缺陷<strong>{0}</strong>添加评论"
		},
		dialogContent: {
			applyContent: "你即将认领该缺陷，确认要认领吗？",
			closeContent: "你即将关闭该缺陷，确认要关闭吗？",
			deleteContent: "你即将永久删除该缺陷，确认要删除吗？",
			submitContent: "你即将提交该缺陷，确认要提交吗？"
		},
		ajaxSuccessMsg: {
			AUDIT: "<span style='font-size: 17px;'><strong>您已成功审核了该缺陷！</strong></span>",
			SUSPEND: "<span style='font-size: 17px;'><strong>您已成功搁置了该缺陷！</strong></span>",
			REJECT: "<span style='font-size: 17px;'><strong>您已成功否决了该缺陷！</strong></span>",
			APPLY: "<span style='font-size: 17px;'><strong>您已成功认领该缺陷！</strong></span>",
			ASSIGN: "<span style='font-size: 17px;'><strong>您已成功指派了该缺陷！</strong></span>",
			DISPUTABLE: "<span style='font-size: 17px;'><strong>该缺陷已被您作争议处理！</strong></span>",
			FIXED: "<span style='font-size: 17px;'><strong>您已成功修复该缺陷！</strong></span>",
			VALIDATED: "<span style='font-size: 17px;'><strong>该缺陷已被您验证通过！</strong></span>",
			CLOSE: "<span style='font-size: 17px;'><strong>您已成功关闭该缺陷！</strong></span>",
			REOPEN: "<span style='font-size: 17px;'><strong>您已成功重新打开了该缺陷！</strong></span>",
			DELETE: "<span style='font-size: 17px;'><strong>您已成功删除该缺陷！</strong></span>",
			SUBMIT: "<span style='font-size: 17px;'><strong>您已成功提交该缺陷！</strong></span>",
			SAVE_DRAFT: "<span style='font-size: 17px;'><strong>保存缺陷为草拟状态成功！</strong></span>"
		},
		issueStatus:{
		   NEW : '新缺陷',
		   REJECT : '否决',
		   SUSPEND : '搁置',
		   OPEN : '打开',
		   FIXED : '已修复',
		   VALIDATED : '验证通过',
		   REOPEN : '重新打开',
		   DISPUTABLE : '争议',
		   CLOSED: '关闭',
		   DRAFT: '草拟'
		},
		issuePriority: {
			CRITICAL : '紧急',
			MAJOR		 : '高',
			MINOR		 : '中',
			TRIVIAL	 : '低'
		},
		issueSeverity: {
			DEADLY   : '致命',
			SERIOUS	 : '严重',
			COMMON	 : '普通',
			SLIGHT	 : '轻微'
		},
	  	issueSecurity:{
		  PUBLIC : '公开',
		  NORMAL : '保密',
		  TOP : '绝密'
		},
		issueLabel: {
			assigner : '指派人',
			security : '保密等级',
			remark : '备注',
			comment : '评论'
		},
		issueRemarkType:{
		   REJECT : '否决',
		   SUSPEND : '搁置',
		   OPEN : '打开',
		   FIXED : '已修复',
		   VALIDATED : '验证通过',
		   REOPEN : '重新打开',
		   DISPUTABLE : '争议',
		   CLOSED: '关闭',
		   REASSIGN: '重新指派'
		},
		issueCommon:{
			remark : '缺陷备注',
			fileAttachement : '附件'
	    },
	    issueComment:
	    {
	    	content:"{0}将缺陷置为<strong class='{1}'>{2}</strong>。",
	        submitContent:"{0}提交了缺陷。",
	        reassignContent:"{0}重新指派了缺陷的修复人。"
	    },
	    issueField:
	    {
	    	code:"编号",
	        environment:"测试环境",
	        position:"缺陷位置",
	        summary:"缺陷概况",
	        priority:"优先级",
	        status:"状态",
	        dueDate:"修复期限",
	        appointedDate:"",
	        timeOriginalEstimate:"最初估算",
	        timeEstimate:"仍需时间",
	        timeSpent:"实际时间",
	        severity:"缺陷等级",
	        securityLevel:"保密级别",
	        description:"缺陷描述",
	        globalApprover:"审核负责人",
	        directApprover:"直接审核人",
	        designee:"指派人",
	        fixedUser:"修复人",
	        validator:"验证人",
	        closedUser:"关闭人",
	        isClaim:"是否认领",
	        totalWatchers:"关注数量",
	        affectedVersion:"影响版本",
	        fixedVersion:"修复版本",
	        validatedDate:"验证时间",
	        solvedScheme:"解决方案",
	        validatedScheme:"验证方案",
	        causeAnalysis:"原因分析",
	        validatedResult:"验证结果",
	        appVersion:"应用版本",
	        productModel:"产品型号",
	        deleted:"是否删除",
	        creator:"创建人",
	        createTime:"创建时间",
	        lastUpdateTime:"更新时间",
	        lastUpdater:"更新人",
	        optimisticLock:"乐观锁",
	        module:"发生模块",
	        basicPoint:"几点",
	        fixedOpinion:"修复意见"
	    }
	},
	projectLevel :{
		PROJECT:'项目',
		PLATFORM :'平台',
		PRODUCTION:'产品'
	},
	projectType:{
		NEW:'新产品',
		REQUIREMENT_UPGRADE:'需求升级',
		COS_UPGRADE :'COS升级',
		APP_UPGRADE :'应用升级',
		CUSTOM_DEVELOPMENT :'个人化升级',
		PLATFORM_MOVING :'平台转移',
		EQUIPMENT_MOVING :'设备转移',
		PROCESSING :'来料加工',
		SOFT_UPGRADE :'新程序开发',
		SOFTUPGRADE :'程序升级',
		SOFT_MIGRATION:'程序移植'
	},
	projectStatus :{
		"OPEN":'启用',
		"CLOSE" :'已关闭'
	},
	industryType:{
		TELECOM:"电信",
		FINANCE:"金融",
		NFC:"移动支付",
		SI:"社保",
		IPASS:"一卡通",
		JAVA:"JAVA",
		C:"C"
	},
	project:
	{
		projectField:
		{
			id:"序号",
			projectLevel:"项目级别",
			name:"项目名称",
			code:"项目编号",
			projectManager:"项目经理",
			type:"项目类型",
			requirementCode:"需求编号",
			requirementName:"需求名称",
			totalIssues:"缺陷总数",
			isOutsiteTest:"外场测试",
			projectType:"项目类型",
			status:"状态",
			description:"描述",
			projectMember:"项目成员",
			icModel:"芯片型号",
			cosVersion:"COS版本",
			cosDeveloper:"COS开发者",
			productionEquipment:"生产设备",
			customDeveloper:"个人开发者",
			appDeveloper:"应用开发者",
			ucDesigner:"用例设计者",
			productionProcedure:"生产程序",
			tester:"测试执行者",
			industryType:"行业类别",
			productionName:"产品名称",
			productionManager:"产品经理"
		}
	},
	complaint:{
		deleteTips :'您确定要删除这个投诉信息吗？',
	    NameValidator:'请选择项目，此项为必填！',
	    CodeValidator:'投诉编号已存在，请重新输入！',
	    RuleValidator:'请输入数字、26个英文字母或者下划线组成的字符串',
		complaintField:{
			id:"序号",
			complaintCode:"投诉编号",
			infoProvider:"信息提供人",
			isSolved:"是否解决",
		    isSovledYes:'已解决',
		    isSovledNo:'未解决',
			projectName:"项目名称",
			projectType:'项目类型',
			projectId:"项目序号",
			faultSummary:"故障简称",
			faultDescption:"故障描述",
			causeAnalysis:"原因分析",
			disposeScheme:"处理方案",
			isDeleted:"是否删除"
		}
	},
	searchField :{
		priority:'优先级',
		status:'缺陷状态',
		severity:'缺陷等级',
		code:'编号',
		description:'描述：',
		summary:'缺陷概况',
		fixedUser:'修复人',
		validatedResult:'验证结果',
		projectNameOrProductinName:'项目名称或者产品名称',
		requirementName:'需求名称',
		productModel:'产品型号'
	}
};


tipMessage ={
    operationSuccess: "操作成功！",
    operationError: "操作失败！",
    title: "确定要删除该条记录吗？",
    tipMsg : "提醒信息",
    content: "记录已被删除！",
	max_file_size: '允许最大上传文件大小为 10.00 MB！',
	file_type: '上传文件类型不对！',
	file_add:'成功添加附件！',
	file_del:'成功删除附件！',
    issueComment: {
    	commentIssueComment: "<span style='font-size: 17px;'>您为缺陷<strong>{0}</strong>添加评论成功！</span>"
    },
    update_success :'更新信息成功！',
	update_fail :'更新信息失败，请联系管理员！',
	tipMsg : '提醒消息',
	tipCon : '反馈数据为空, 不能进行导出操作!',
	feedback_quantity : "反馈数量",
	average_quantity : "平均",
	belong_to : "属于",
	quantity : " 的缺陷数量：",
	plsSelect: "请选择要统计的人员",
	
};

validation = {
	project: {
		codeIsExisted: '项目编号已存在，请重新指定',
		nameCannotEmpty: '项目名称不能为空',
		managerCannotEmpty: '项目经理不能为空',
		maxCharactersSize: '最多能输入{0}个字符'
	},
	production: {
		proNameCannotEmpty: '产品名称不能为空'
	},
	issue: {
		repairerCannotEmpty: '请指派一个缺陷修复人',
		summaryCannotEmpty: '缺陷概述不能为空',
		fixedUserCannotEmpty: '修复人不能为空',
		basicPointCannotEmpty: '基点不能为空'
	},
	label: {
		labelContentCannotEmpty: '标签内容不能为空',
		contentIsExisted: '标签已在该组中存在，请重新输入。'
	},
	labelGroup: {
		labelGroupCannotEmpty: '请选择或添加一个标签分组'
	},
	comment: {
		cannotEmpty: "内容不能为空"
	}
};

report = {
	sharing : {
		type : '类别',
		totalIssueQuantity : '总缺陷数量',
		totalIssue : '总缺陷',
		util : ' 个',
		have : '有',
		issues : '个问题',
		name : '人员名称',
		percent : '所占比重',
		totalHave : '共有',
		
	},
};

