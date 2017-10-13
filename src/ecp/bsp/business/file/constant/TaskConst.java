package ecp.bsp.business.file.constant;

/**
 * 任务信息代码常量定义
 * 
 * @since 2015-06-25
 * 
 * @author zengqingyue.
 * 
 */
public class TaskConst {
	/**
	 * 活动类型实体
	 */
	public static final String ReportSendTypeEntity = "ecp.bsp.business.file.entity.ReportSendTypeEntity";

	/**
	 * 过滤字符
	 */
	public static final String split = ",";
	
	/**
	 * 文件地址属性文件的存放路径
	 */
	public static final String PROPERTIES_NAME_FILE_DIR_PATH = "fileDir.properties";
	public static final String PROPERTIES_KEY_DOWNLOAD_PATH = "downloadPath";
	public static final String PROPERTIES_KEY_ENCRYPTION_PATH = "encryptionPath";
	
	/**
	 * ftp下载到本地的存放路径
	 */
//	public static final String PARAM_FTP_DOWNLOAD_LOCAL_PATH = "D:\\ftm\\下载报表";
	/**
	 * 加密报表本地的存放路径
	 */
//	public static final String PARAM_ENCRYPTION_LOCAL_PATH = "D:\\ftm\\加密报表"+File.separator;
	/**
	 * 自动生成的报表任务名称
	 */
	public static final String PARAM_AUTO_REPORT_TASK_NAME = "自动生成的报表任务名称";
	/**
	 * 报表任务压缩文件名称
	 */
	public static final String PARAM_REPORT_TASK_ZIP_NAME = "日报表压缩文件";
	/**
	 * 系统管理员ID.
	 */
	public static final String PARAM_SYSTEM_MANAGER_ID = "1";
	/**
	 * 系统管理员名称.
	 */
	public static final String PARAM_SYSTEM_MANAGER_NAME = "administrator";
	/**
	 * 系统自动加密成功结果.
	 */
	public static final String PARAM_ENCRYPTION_SUCCESS_RESULT = "系统自动加密成功";
	/**
	 * 系统自动加密失败结果.
	 */
	public static final String PARAM_ENCRYPTION_FAIL_RESULT = "系统自动加密失败";
	/**
	 * 策略名称.
	 */
	public static final String PARAM_ENTITY_STRATEGY_NAME = "strategyName";
	/**
	 * 任务策略ID.
	 */
	public static final String PARAM_ENTITY_TASK_STRATEGY_ID = "taskStrategyId";
	/**
	 * 报表任务上传ID.
	 */
	public static final String PARAM_ENTITY_REPORT_TASK_UPLOAD_ID = "reportTaskUploadId";
	/**
	 * 任务评审状态ID.
	 */
	public static final String PARAM_ENTITY_REPORT_REVIEW_STATUS_ID = "reportReviewStatusId";
	/**
	 * 任务评审ID.
	 */
	public static final String PARAM_ENTITY_REPORT_TASK_REVIEW_ID = "reportTaskReviewId";
	/**
	 * 任务发送ID.
	 */
	public static final String PARAM_ENTITY_REPORT_TASK_SEND_ID = "reportTaskSendId";
	/**
	 * 是否发送.
	 */
	public static final String PARAM_ENTITY_IS_SEND = "isSend";
	
	
	/**
	 * 获取未完成的报表任务
	 */
	public static final String SQL_GET_NOT_FINISHED_REPORT_TASK = new StringBuilder()
	.append(" SELECT * FROM PMS_REPORT_TASK T ")
	.append(" WHERE T.END_TIME IS NULL ")
	.append(" AND T.TASK_STRATEGY_ID = ?")
	.toString();


	/**
	 * 根据任务策略名称获取任务策略信息
	 */
	public static final String SQL_GET_TASK_STRATEGY_INFO_BY_NAME = new StringBuilder()
	.append(" SELECT * FROM PMS_TASK_STRATEGY T ")
	.append(" WHERE T.TASK_STRATEGY_NAME = ? ")
	.append(" AND T.IS_FINAL_VERSION = '1' ")
	.toString();
	
	/**
	 * 根据任务策略名称和ID获取任务策略信息
	 */
	public static final String SQL_GET_TASK_STRATEGY_INFO_BY_ID = new StringBuilder()
	.append(SQL_GET_TASK_STRATEGY_INFO_BY_NAME)
	.append(" AND T.TASK_STRATEGY_ID NOT IN ? ")
	.toString();
	
	/**
	 * 获取任务策略信息列表
	 */
	public static final String SQL_GET_TASK_STRATEGY_INFO_LIST = new StringBuilder()
	.append(" SELECT A.CREATE_TIME, A.PAA_USERNAME, B.*, B.TASK_STRATEGY_ID AS ID,B.TASK_STRATEGY_NAME AS TEXT, ")
	.append("        C.USAGE_STATUS_NAME,D.PRODUCT_TYPE_NAME, E.OPERATOR_NAME,F.REPORT_SEND_TYPE_NAME, J.TASK_QUARTZ_TIME, ")
	.append("        G.OPERATOR_TYPE_NAME AS UPLOAD_OPERATOR_TYPE_NAME, ")
	.append("        (SELECT WMSYS.WM_CONCAT(DISTINCT I.BRAND_NAME) ")
	.append("         FROM PMS_TASK_BRAND H, PMS_BRAND I ")
	.append("         WHERE H.BRAND_ID = I.BRAND_ID ")
	.append("         AND H.TASK_STRATEGY_ID = B.TASK_STRATEGY_ID) AS BRAND_NAME ")
	.append(" FROM PMS_STRATEGY_INFO A, PMS_TASK_STRATEGY B, PMS_USAGE_STATUS C, ")
	.append("      PMS_PRODUCT_TYPE D, PMS_OPERATOR E, PMS_REPORT_SEND_TYPE F, PMS_OPERATOR_TYPE G,PMS_TASK_QUARTZ J ")
	.append(" WHERE A.STRATEGY_INFO_ID = B.STRATEGY_INFO_ID ")
	//.append(" AND A.USAGE_STATUS_ID = '1' ")
	.append(" AND A.USAGE_STATUS_ID = C.USAGE_STATUS_ID ")
	.append(" AND B.PRODUCT_TYPE_ID = D.PRODUCT_TYPE_ID ")
	.append(" AND B.OPERATOR_ID = E.OPERATOR_ID ")
	.append(" AND B.REPORT_SEND_TYPE_ID = F.REPORT_SEND_TYPE_ID ")
	.append(" AND B.UPLOAD_OPERATOR_TYPE_ID = G.OPERATOR_TYPE_ID ")
	.append(" AND B.TASK_STRATEGY_ID = J.TASK_STRATEGY_ID(+) ")
	.append(" AND B.IS_FINAL_VERSION = '1' ")
	.append(" ORDER BY  A.CREATE_TIME DESC ")
	.toString();
	/**
	 * 获取已使用的任务策略信息列表
	 */
	public static final String SQL_GET_USED_TASK_STRATEGY_INFO_LIST = new StringBuilder()
	.append(" SELECT A.CREATE_TIME, A.PAA_USERNAME, B.TASK_STRATEGY_ID AS ID,B.TASK_STRATEGY_NAME AS TEXT, ")
	.append("        C.USAGE_STATUS_NAME,D.PRODUCT_TYPE_NAME, E.OPERATOR_NAME,F.REPORT_SEND_TYPE_NAME, J.TASK_QUARTZ_TIME, ")
	.append("        G.OPERATOR_TYPE_NAME AS UPLOAD_OPERATOR_TYPE_NAME, ")
	.append("        (SELECT WMSYS.WM_CONCAT(DISTINCT I.BRAND_NAME) ")
	.append("         FROM PMS_TASK_BRAND H, PMS_BRAND I ")
	.append("         WHERE H.BRAND_ID = I.BRAND_ID ")
	.append("         AND H.TASK_STRATEGY_ID = B.TASK_STRATEGY_ID) AS BRAND_NAME ")
	.append(" FROM PMS_STRATEGY_INFO A, PMS_TASK_STRATEGY B, PMS_USAGE_STATUS C, ")
	.append("      PMS_PRODUCT_TYPE D, PMS_OPERATOR E, PMS_REPORT_SEND_TYPE F, PMS_OPERATOR_TYPE G,PMS_TASK_QUARTZ J ")
	.append(" WHERE A.STRATEGY_INFO_ID = B.STRATEGY_INFO_ID ")
	.append(" AND A.USAGE_STATUS_ID = '1' ")
	.append(" AND A.USAGE_STATUS_ID = C.USAGE_STATUS_ID ")
	.append(" AND B.PRODUCT_TYPE_ID = D.PRODUCT_TYPE_ID ")
	.append(" AND B.OPERATOR_ID = E.OPERATOR_ID ")
	.append(" AND B.REPORT_SEND_TYPE_ID = F.REPORT_SEND_TYPE_ID ")
	.append(" AND B.UPLOAD_OPERATOR_TYPE_ID = G.OPERATOR_TYPE_ID ")
	.append(" AND B.TASK_STRATEGY_ID = J.TASK_STRATEGY_ID(+) ")
	.append(" AND B.IS_FINAL_VERSION = '1' ")
	.append(" ORDER BY  A.CREATE_TIME DESC ")
	.toString();
	/**
	 * 根据ID获取任务策略信息
	 */
	public static final String SQL_GET_TASK_STRATEGY_INFO_BY_TASK_STRATEGY_ID = new StringBuilder()
	.append(" SELECT A.CREATE_TIME, A.PAA_USERNAME, B.*, ")
	.append("        C.USAGE_STATUS_NAME,D.PRODUCT_TYPE_NAME, E.OPERATOR_NAME,F.REPORT_SEND_TYPE_NAME, ")
	.append("        G.OPERATOR_TYPE_NAME AS UPLOAD_OPERATOR_TYPE_NAME,J.QUARTZ_PERIOD_TYPE_ID,J.TASK_QUARTZ_TIME, ")
	.append("        J.TASK_QUARTZ_MONTH, J.TASK_QUARTZ_WEEK, J.TASK_QUARTZ_DAY ,")
	
	.append("        (SELECT WMSYS.WM_CONCAT(DISTINCT I.BRAND_ID) ")
	.append("         FROM PMS_TASK_BRAND H, PMS_BRAND I ")
	.append("         WHERE H.BRAND_ID = I.BRAND_ID ")
	.append("         AND H.TASK_STRATEGY_ID = B.TASK_STRATEGY_ID) AS BRAND_IDS, ")
	
	.append("        (SELECT WMSYS.WM_CONCAT(DISTINCT I.EMAIL_RECEIVER_ID) ")
	.append("         FROM PMS_TASK_EMAIL_RECEIVER H, PMS_EMAIL_RECEIVER I ")
	.append("         WHERE H.EMAIL_RECEIVER_ID = I.EMAIL_RECEIVER_ID ")
	.append("         AND H.TASK_EMAIL_RECEIVER_TYPE = '1' ")
	.append("         AND H.TASK_STRATEGY_ID = B.TASK_STRATEGY_ID) AS EMAIL_RECEIVER_IDS, ")
	
	.append("        (SELECT WMSYS.WM_CONCAT(DISTINCT I.EMAIL_RECEIVER_ID) ")
	.append("         FROM PMS_TASK_EMAIL_RECEIVER H, PMS_EMAIL_RECEIVER I ")
	.append("         WHERE H.EMAIL_RECEIVER_ID = I.EMAIL_RECEIVER_ID ")
	.append("         AND H.TASK_EMAIL_RECEIVER_TYPE = '0' ")
	.append("         AND H.TASK_STRATEGY_ID = B.TASK_STRATEGY_ID) AS EMAIL_CC_IDS, ")
	
	.append("        (SELECT WMSYS.WM_CONCAT(DISTINCT I.EMAIL_RECEIVER_ID) ")
	.append("         FROM PMS_TASK_EMAIL_RECEIVER H, PMS_EMAIL_RECEIVER I ")
	.append("         WHERE H.EMAIL_RECEIVER_ID = I.EMAIL_RECEIVER_ID ")
	.append("         AND H.TASK_EMAIL_RECEIVER_TYPE = '2' ")
	.append("         AND H.TASK_STRATEGY_ID = B.TASK_STRATEGY_ID) AS sendSucInformReceiverIds, ")
	
	.append("        (SELECT WMSYS.WM_CONCAT(DISTINCT I.EMAIL_RECEIVER_ID) ")
	.append("         FROM PMS_TASK_EMAIL_RECEIVER H, PMS_EMAIL_RECEIVER I ")
	.append("         WHERE H.EMAIL_RECEIVER_ID = I.EMAIL_RECEIVER_ID ")
	.append("         AND H.TASK_EMAIL_RECEIVER_TYPE = '3' ")
	.append("         AND H.TASK_STRATEGY_ID = B.TASK_STRATEGY_ID) AS sendSucInformCcIds, ")
	
	.append("        (SELECT WMSYS.WM_CONCAT(DISTINCT H.PAA_EMPLOYEE_ID) ")
	.append("         FROM PMS_TASK_CUSTOMER H ")
	.append("         WHERE H.TASK_STRATEGY_ID = B.TASK_STRATEGY_ID) AS CUSTOMER_IDS, ")
	
	.append("        (SELECT WMSYS.WM_CONCAT(DISTINCT H.PAA_EMPLOYEE_ID) ")
	.append("         FROM PMS_TASK_REVIEWER H ")
	.append("         WHERE H.TASK_STRATEGY_ID = B.TASK_STRATEGY_ID) AS TASK_REVIEWER_IDS ")
	
	.append(" FROM PMS_STRATEGY_INFO A, PMS_TASK_STRATEGY B, PMS_USAGE_STATUS C, PMS_PRODUCT_TYPE D, ")
	.append("      PMS_OPERATOR E, PMS_REPORT_SEND_TYPE F, PMS_OPERATOR_TYPE G,PMS_TASK_QUARTZ J ")
	
	.append(" WHERE A.STRATEGY_INFO_ID = B.STRATEGY_INFO_ID ")
	.append(" AND A.USAGE_STATUS_ID = C.USAGE_STATUS_ID ")
	.append(" AND B.PRODUCT_TYPE_ID = D.PRODUCT_TYPE_ID ")
	.append(" AND B.OPERATOR_ID = E.OPERATOR_ID ")
	.append(" AND B.REPORT_SEND_TYPE_ID = F.REPORT_SEND_TYPE_ID ")
	.append(" AND B.UPLOAD_OPERATOR_TYPE_ID = G.OPERATOR_TYPE_ID ")
	.append(" AND B.TASK_STRATEGY_ID = J.TASK_STRATEGY_ID(+) ")
	.append(" AND B.TASK_STRATEGY_ID = ? ")
	.append(" AND B.IS_FINAL_VERSION = '1' ")
	.toString();
	/**
	 * 根据任务策略信息ID获取报表规则信息列表
	 */
	public static final String SQL_GET_REPORT_RULE_LIST_BY_TASK_STRATEGY_ID = new StringBuilder()
	.append(" SELECT B.* ")
	.append(" FROM PMS_TASK_REPORT_RULE A ,PMS_REPORT_RULE B ")
	.append(" WHERE A.REPORT_RULE_ID = B.REPORT_RULE_ID ")
	.append(" AND A.TASK_STRATEGY_ID = ? ")
	.toString();
	
	/**
	 * 获取算法列表
	 */
	public static final String SQL_GET_ENCRYPTION_ALGORITHM_LIST = new StringBuilder()
	.append(" SELECT T.*,T.ENCRYPTION_ALGORITHM_ID AS ID,T.ENCRYPTION_ALGORITHM_NAME AS TEXT,  T.ENCRYPTION_ALGORITHM_DESC AS EMAIL_RECEIVER_DESC, ")
	.append(" S.DLL_NAME,S.ALGORITHM_DLL_ID,S.DLL_METHOD,S.DLL_EXTRA_PARAM,S.DLL_RETURN_TYPE ")
	.append(" FROM PMS_ENCRYPTION_ALGORITHM T,PMS_ALGORITHM_DLL S ")
	.append(" WHERE T.ENCRYPTION_ALGORITHM_ID = S.ENCRYPTION_ALGORITHM_ID(+) ")
	.toString();
	
	/**
	 * 获取报表任务上传信息列表
	 */
	public static final String SQL_GET_REPORT_TASK_UPLOAD_LIST = new StringBuilder()
	.append(" SELECT A.*,B.REPORT_TASK_UPLOAD_ID, B.PAA_USERNAME AS UPLOAD_USER_NAME ,B.UPLOAD_TIME, C.FTP_UPLOAD_RESULT, D.REP_TASK_ACTIVITY_TYPE_NAME,G.TASK_STRATEGY_NAME, H.PRODUCT_TYPE_NAME,I.OPERATOR_NAME ,")
	
	.append("        (SELECT WMSYS.WM_CONCAT(DISTINCT I.BRAND_NAME) ")
	.append("         FROM PMS_TASK_BRAND H, PMS_BRAND I ")
	.append("         WHERE H.BRAND_ID = I.BRAND_ID ")
	.append("         AND H.TASK_STRATEGY_ID = G.TASK_STRATEGY_ID) AS BRAND_NAME ,")
	
	.append("        E.OPERATOR_TYPE_ID AS UPLOAD_OPERATOR_TYPE_ID, ")
	.append("        E.OPERATOR_TYPE_NAME AS UPLOAD_OPERATOR_TYPE_NAME, ")
	.append("        NVL(F.FTP_SYNC_STATUS_ID, '1') AS FTP_SYNC_STATUS_ID, ")
	.append("        NVL(F.FTP_SYNC_STATUS_NAME, '同步成功') AS FTP_SYNC_STATUS_NAME")
	
	.append(" FROM PMS_REPORT_TASK A, PMS_REPORT_TASK_UPLOAD B, PMS_REP_TASK_UPLOAD_FTP C, ")
	.append("      PMS_REP_TASK_ACTIVITY_TYPE D,PMS_OPERATOR_TYPE E, PMS_FTP_SYNC_STATUS F ,PMS_TASK_STRATEGY G,PMS_PRODUCT_TYPE H,PMS_OPERATOR I")
	
	.append(" WHERE A.REPORT_TASK_ID = B.REPORT_TASK_ID ")
	.append(" AND A.REP_TASK_ACTIVITY_TYPE_ID = D.REP_TASK_ACTIVITY_TYPE_ID ")
	.append(" AND A.TASK_STRATEGY_ID = G.TASK_STRATEGY_ID ")
	.append(" AND G.PRODUCT_TYPE_ID = H.PRODUCT_TYPE_ID ") 
    .append(" AND G.OPERATOR_ID = I.OPERATOR_ID ")
	.append(" AND B.REPORT_TASK_UPLOAD_ID = C.REPORT_TASK_UPLOAD_ID(+) ")
	.append(" AND B.OPERATOR_TYPE_ID = E.OPERATOR_TYPE_ID ")
	.append(" AND C.FTP_SYNC_STATUS_ID = F.FTP_SYNC_STATUS_ID(+) ")
	.append(" AND B.IS_FINAL_VERSION = '1' ")
	.append(" ORDER BY F.FTP_SYNC_STATUS_ID ASC, A.START_TIME DESC ")
	.toString();
	
	
	public static final String SQL_GET_REPORT_TASK_UPLOAD_LIST_BY_PAA_EMPLOYEE_ID = new StringBuilder()
	.append(" SELECT * FROM ( ")
	.append(SQL_GET_REPORT_TASK_UPLOAD_LIST)
	.append(" ) UPLOAD_INFO ")
	.append(" WHERE PAA_EMPLOYEE_ID = ?  ")
	.toString();
	/**
	 * 获取报表任务审核信息列表
	 */
	public static final String SQL_GET_REPORT_TASK_REVIEW_LIST = new StringBuilder()
	.append(" SELECT A.REPORT_TASK_ID,A.REPORT_TASK_NAME, A.TASK_STRATEGY_ID, B.PAA_USERNAME AS UPLOAD_USER_NAME ,B.UPLOAD_TIME , ")
	.append(" 		 C.*, D.REPORT_REVIEW_STATUS_NAME, E.REPORT_REVIEW_TYPE_NAME, F.* ,H.PRODUCT_TYPE_NAME,I.OPERATOR_NAME , ")
	
	.append("        (SELECT WMSYS.WM_CONCAT(DISTINCT I.BRAND_NAME) ")
	.append("         FROM PMS_TASK_BRAND H, PMS_BRAND I ")
	.append("         WHERE H.BRAND_ID = I.BRAND_ID ")
	.append("         AND H.TASK_STRATEGY_ID = G.TASK_STRATEGY_ID) AS BRAND_NAME")
	
	.append(" FROM PMS_REPORT_TASK A, PMS_REPORT_TASK_UPLOAD B, PMS_REPORT_TASK_REVIEW C,  ")
	.append("      PMS_REPORT_REVIEW_STATUS D, PMS_REPORT_REVIEW_TYPE E,PMS_REP_TASK_ACTIVITY_TYPE F,PMS_TASK_STRATEGY G,PMS_PRODUCT_TYPE H,PMS_OPERATOR I ")
	
	.append(" WHERE A.REPORT_TASK_ID = B.REPORT_TASK_ID ")
	.append(" AND A.REP_TASK_ACTIVITY_TYPE_ID = F.REP_TASK_ACTIVITY_TYPE_ID ")
	.append(" AND A.TASK_STRATEGY_ID = G.TASK_STRATEGY_ID ")
	.append(" AND G.PRODUCT_TYPE_ID = H.PRODUCT_TYPE_ID ") 
    .append(" AND G.OPERATOR_ID = I.OPERATOR_ID ")
	.append(" AND B.REPORT_TASK_UPLOAD_ID = C.REPORT_TASK_UPLOAD_ID ")
	.append(" AND C.REPORT_REVIEW_STATUS_ID = D.REPORT_REVIEW_STATUS_ID(+) ")
	.append(" AND C.REPORT_REVIEW_TYPE_ID = E.REPORT_REVIEW_TYPE_ID ")
	.append(" AND B.IS_FINAL_VERSION = '1' ")
	.append(" AND C.IS_FINAL_VERSION = '1' ")
	.append(" ORDER BY C.REVIEW_TIME DESC ")
	.toString();
	
	/**
	 * 根据PAA用户ID获取报表任务审核信息列表
	 */
	public static final String SQL_GET_REPORT_TASK_REVIEW_LIST_BY_PAA_EMPLOYEE_ID = new StringBuilder()
	.append(" SELECT * FROM ( ")
	.append(SQL_GET_REPORT_TASK_REVIEW_LIST)
	.append(") REVIEW_INFO  ")
	.append("WHERE PAA_EMPLOYEE_ID = ? ")
	.toString();
	
	/**
	 * 根据PAA用户ID获取报表任务审核信息列表(过滤审核的）
	 */
	public static final String SQL_GET_REPORT_TASK_REVIEW_LIST_BY_PAA_EMPLOYEE_ID_FILTER = new StringBuilder()
	.append(SQL_GET_REPORT_TASK_REVIEW_LIST_BY_PAA_EMPLOYEE_ID)
	.append(" AND REVIEW_TIME IS NULL")
	.toString();
	
	/**
	 * 根据任务审核信息ID获取报表任务审核信息列表
	 */
	public static final String SQL_GET_REPORT_TASK_REVIEW_LIST_BY_ID = new StringBuilder()
	.append(" SELECT * FROM ( ")
	.append(SQL_GET_REPORT_TASK_REVIEW_LIST)
	.append(") REVIEW_INFO  ")
	.append("WHERE REPORT_TASK_REVIEW_ID = ? ")
	.toString();
	
	/**
	 * 根据任务上传ID获取未评审的信息
	 */
	public static final String SQL_GET_REPORT_TASK_UN_REVIEW_LIST_BY_UPLOAD_ID = new StringBuffer()
	.append("SELECT * FROM PMS_REPORT_TASK_REVIEW T ")
	.append("WHERE T.REPORT_TASK_UPLOAD_ID = ? ")
	.append("AND T.REPORT_REVIEW_STATUS_ID IS NULL ")
	.toString();
	
	/**
	 * 获取报表任务信息列表
	 */
	public static final String SQL_GET_REPORT_TASK_LIST = new StringBuilder()
	.append(" SELECT A.*, C.PRODUCT_TYPE_NAME,D.REP_TASK_ACTIVITY_TYPE_NAME , E.OPERATOR_NAME ,F.REPORT_SEND_TYPE_NAME ,")
	
	.append("        (SELECT WMSYS.WM_CONCAT(DISTINCT I.BRAND_NAME) ")
	.append("         FROM PMS_TASK_BRAND H, PMS_BRAND I ")
	.append("         WHERE H.BRAND_ID = I.BRAND_ID ")
	.append("         AND H.TASK_STRATEGY_ID = B.TASK_STRATEGY_ID) AS BRAND_NAME ")

	.append(" FROM PMS_REPORT_TASK A , PMS_TASK_STRATEGY B, PMS_PRODUCT_TYPE C, PMS_REP_TASK_ACTIVITY_TYPE D ,PMS_OPERATOR E ,PMS_REPORT_SEND_TYPE F")
	.append(" WHERE A.TASK_STRATEGY_ID = B.TASK_STRATEGY_ID  AND B.PRODUCT_TYPE_ID = C.PRODUCT_TYPE_ID ")
	.append(" AND A.REP_TASK_ACTIVITY_TYPE_ID = D.REP_TASK_ACTIVITY_TYPE_ID ")
	.append(" AND B.OPERATOR_ID = E.OPERATOR_ID ")
	.append(" AND B.REPORT_SEND_TYPE_ID = F.REPORT_SEND_TYPE_ID ")
	.append("ORDER BY A.START_TIME DESC ")
	.toString();
	
	/**
	 * 根据任务ID获取报表任务信息列表
	 */
	public static final String SQL_GET_REPORT_TASK_INFO_BY_TASK_ID = new StringBuilder()
    .append(" SELECT A.*, B.TASK_STRATEGY_ID,B.TASK_STRATEGY_NAME ,B.TASK_BATCH_CODE, C.PRODUCT_TYPE_NAME,D.REP_TASK_ACTIVITY_TYPE_NAME , E.OPERATOR_NAME ,")
	
	.append("        (SELECT WMSYS.WM_CONCAT(DISTINCT I.BRAND_NAME) ")
	.append("         FROM PMS_TASK_BRAND H, PMS_BRAND I ")
	.append("         WHERE H.BRAND_ID = I.BRAND_ID ")
	.append("         AND H.TASK_STRATEGY_ID = B.TASK_STRATEGY_ID) AS BRAND_NAME ,")
	 
	.append(" B.IS_ENCRYPTION, B.IS_MATCH_RULE, F.REPORT_SEND_TYPE_NAME ,G.OPERATOR_TYPE_NAME AS UPLOAD_OPERATOR_TYPE_NAME ,")
	
	.append(" ( SELECT H.FTP_NAME ")
	.append("    FROM PMS_FTP H  ")
	.append("	 WHERE  H.FTP_ID = B.REPORT_SOURCE_FTP_ID ) AS REPORT_SOURCE_FTP_NAME ,")
	.append(" ( SELECT H.FTP_PATH ")
	.append("    FROM PMS_FTP H  ")
	.append("	 WHERE  H.FTP_ID = B.REPORT_SOURCE_FTP_ID ) AS REPORT_SOURCE_FTP_PATH ,")
	.append(" ( SELECT H.FTP_NAME ")
	.append("    FROM PMS_FTP H  ")
	.append("	 WHERE  H.FTP_ID = B.REPORT_TARGET_FTP_ID ) AS REPORT_TARGET_FTP_NAME ,")
	.append(" ( SELECT H.FTP_PATH ")
	.append("    FROM PMS_FTP H  ")
	.append("	 WHERE  H.FTP_ID = B.REPORT_TARGET_FTP_ID ) AS REPORT_TARGET_FTP_PATH ,")
	
	.append(" ( SELECT WMSYS.WM_CONCAT(DISTINCT I.EMAIL_RECEIVER_NAME ) ")
	.append("    FROM PMS_TASK_EMAIL_RECEIVER H, PMS_EMAIL_RECEIVER I ")
	.append("    WHERE H.EMAIL_RECEIVER_ID = I.EMAIL_RECEIVER_ID ")
	.append("    AND H.TASK_STRATEGY_ID = B.TASK_STRATEGY_ID) AS EMAIL_RECEIVER_NAME ")
	
	.append(" FROM PMS_REPORT_TASK A , PMS_TASK_STRATEGY B, PMS_PRODUCT_TYPE C, PMS_REP_TASK_ACTIVITY_TYPE D ,PMS_OPERATOR E , PMS_REPORT_SEND_TYPE F,PMS_OPERATOR_TYPE G")
	.append(" WHERE A.TASK_STRATEGY_ID = B.TASK_STRATEGY_ID  AND B.PRODUCT_TYPE_ID = C.PRODUCT_TYPE_ID ")
	.append(" AND A.REP_TASK_ACTIVITY_TYPE_ID = D.REP_TASK_ACTIVITY_TYPE_ID ")
	.append(" AND B.OPERATOR_ID = E.OPERATOR_ID ")
	.append(" AND B.REPORT_SEND_TYPE_ID = F.REPORT_SEND_TYPE_ID ")
	.append(" AND B.UPLOAD_OPERATOR_TYPE_ID = G.OPERATOR_TYPE_ID ")
	.append("AND A.REPORT_TASK_ID = ? ")
	.append("ORDER BY A.START_TIME DESC ")
	.toString();
	
	/**
	 * 根据paa用户ID获取报表任务信息列表
	 */
	public static final String SQL_GET_REPORT_TASK_INFO_BY_PAA_EMPLOYEE_ID = new StringBuilder()
	.append(SQL_GET_REPORT_TASK_LIST)
	.append("AND A.PAA_EMPLOYEE_ID = ? ")
	.append("ORDER BY A.START_TIME DESC ")
	.toString();
	
	/**
	 * 根据报表任务信息Id获得报表信息
	 */
	public static final String SQL_GET_REPORT_INFO_LIST_BY_ID = new StringBuilder()
	.append(" SELECT A.*, B.TASK_STRATEGY_NAME , C.PRODUCT_TYPE_NAME,D.REP_TASK_ACTIVITY_TYPE_NAME ")
	.append(" FROM PMS_REPORT_TASK A , PMS_TASK_STRATEGY B, PMS_PRODUCT_TYPE C, PMS_REP_TASK_ACTIVITY_TYPE D ")
	.append(" WHERE A.TASK_STRATEGY_ID = B.TASK_STRATEGY_ID  AND B.PRODUCT_TYPE_ID = C.PRODUCT_TYPE_ID ")
	.append(" AND A.REP_TASK_ACTIVITY_STATUS_ID = D.REP_TASK_ACTIVITY_TYPE_ID ")
	.append(" AND A.REPORT_TASK_ID = ? ")
	.toString();
	
	/**
	 * 根据报表任务信息Id获得报表审核信息
	 */
	public static final String SQL_GET_REPORT_REVIEW_INFO_LIST_BY_ID = new StringBuilder()
	.append(" SELECT B.PAA_USERNAME, B.REVIEW_DESC, B.REVIEW_TIME ")
	.append(" FROM PMS_REPORT_TASK_UPLOAD A, PMS_REPORT_TASK_REVIEW B ")
	.append(" WHERE A.REPORT_TASK_UPLOAD_ID = B.REPORT_TASK_UPLOAD_ID ")
	.append(" AND A.REPORT_TASK_ID = ? ")
	.toString();
	
	/**
	 * 根据任务策略ID获取任务报表规则信息
	 */
	public static final String SQL_GET_REPORT_TASK_REPORT_RULE_LIST_BY_STRATEGY_ID = new StringBuffer()
	.append(" SELECT B.*  ")
	.append(" FROM PMS_TASK_REPORT_RULE A,PMS_REPORT_RULE B ")
	.append(" WHERE A.REPORT_RULE_ID = B.REPORT_RULE_ID ")
	.append(" AND A.TASK_STRATEGY_ID = ? ")
	.toString();
	
	/**
	 * 根据报表任务ID获取报表任务附件信息列表
	 */
	public static final String SQL_GET_REPORT_TASK_REPORT_ATTACHMENT_LIST_BY_TASK_ID = new StringBuffer()
	.append(" SELECT B.*,C.*,D.* ")
	.append(" FROM PMS_REPORT_TASK_ATTACHMENT A, PMS_ATTACHMENT B, ")
	.append(" 	   PMS_REP_TASK_ACTIVITY_TYPE C,PMS_ENCRYPTION_STATUS D ")
	.append(" WHERE A.ATTACHMENT_ID = B.ATTACHMENT_ID ")
	.append("   AND A.REP_TASK_ACTIVITY_TYPE_ID = C.REP_TASK_ACTIVITY_TYPE_ID ")
	.append("   AND A.ENCRYPTION_STATUS_ID = D.ENCRYPTION_STATUS_ID ")
	.append("   AND A.REPORT_TASK_ID = ? ")
	.toString();
	
	/**
	 * 根据报表任务ID获取已加密的报表任务附件信息列表
	 */
	public static final String SQL_GET_ENCRYPTION_ATTACHMENT_LIST_BY_TASK_ID = new StringBuffer()
	.append(SQL_GET_REPORT_TASK_REPORT_ATTACHMENT_LIST_BY_TASK_ID)
	.append(" AND A.ENCRYPTION_STATUS_ID = '1' ")
	.toString();
	
	/**
	 * 根据任务ID获取报表任务所有过程信息
	 */
	public static final String SQL_GET_REPORT_TASK_ALL_INFO_BY_TASK_ID = new StringBuffer()
	.append(" SELECT * FROM (  ")
	
	.append(" SELECT A.PAA_USERNAME AS ACTIVITY_USERNAME,'报表上传' AS TASK_ACTIVITY_TYPE_NAME, ")
	.append("         A.UPLOAD_TIME AS ACTIVITY_TIME,D.FTP_UPLOAD_RESULT || nvl(C.FTP_SYNC_STATUS_NAME,'上传报表成功') AS ACTIVITY_DESC   ")
	.append(" FROM PMS_REPORT_TASK_UPLOAD A,PMS_REP_TASK_UPLOAD_FTP B,PMS_FTP_SYNC_STATUS C,PMS_REP_TASK_UPLOAD_FTP D   ")
	.append(" WHERE A.REPORT_TASK_UPLOAD_ID = B.REPORT_TASK_UPLOAD_ID(+) ")
	.append("   AND B.FTP_SYNC_STATUS_ID = C.FTP_SYNC_STATUS_ID(+) ")
	.append("   AND A.REPORT_TASK_UPLOAD_ID = D.REPORT_TASK_UPLOAD_ID(+) ")
	.append("   AND A.REPORT_TASK_ID = ? ")
	
	
	
	.append(" UNION ALL ")
	
	.append(" SELECT C.PAA_USERNAME AS ACTIVITY_USERNAME, '报表审核' AS TASK_ACTIVITY_TYPE_NAME, ")
	.append("        C.REVIEW_TIME AS ACTIVITY_TIME, ")
	.append("        DECODE(D.REPORT_REVIEW_STATUS_NAME,'','',D.REPORT_REVIEW_STATUS_NAME||'.')||C.REVIEW_DESC AS ACTIVITY_DESC ")
	.append(" FROM PMS_REPORT_TASK_REVIEW C, PMS_REPORT_REVIEW_STATUS D,PMS_REPORT_TASK_UPLOAD A ")
	.append(" WHERE C.REPORT_REVIEW_STATUS_ID = D.REPORT_REVIEW_STATUS_ID(+) ")
	.append("   AND C.REPORT_TASK_UPLOAD_ID = A.REPORT_TASK_UPLOAD_ID ")
	.append("   AND A.REPORT_TASK_ID = ? ")
	
	.append(" UNION ALL ")
	
	.append(" SELECT C.PAA_USERNAME AS ACTIVITY_USERNAME,'报表加密' AS TASK_ACTIVITY_TYPE_NAME, ")
	.append("        C.ENCRYPTION_TIME AS ACTIVITY_TIME, ")
	.append("        DECODE(D.ENCRYPTION_ALGORITHM_TYPE,'0','RAR加密,', ")
	.append("		 (DECODE(D.ENCRYPTION_ALGORITHM_TYPE,'1','文件级加密,',''))) || C.ENCRYPTION_DESC AS ACTIVITY_DESC ")
	.append(" FROM  PMS_REPORT_TASK_UPLOAD A,PMS_REPORT_TASK_REVIEW B,PMS_REPORT_TASK_ENCRYPTION C,PMS_ENCRYPTION_ALGORITHM D ")
	.append(" WHERE A.REPORT_TASK_UPLOAD_ID = B.REPORT_TASK_UPLOAD_ID ")
	.append(" AND B.REPORT_TASK_REVIEW_ID = C.REPORT_TASK_REVIEW_ID ")
	.append(" AND C.ENCRYPTION_ALGORITHM_ID = D.ENCRYPTION_ALGORITHM_ID(+) ")
	.append(" AND A.REPORT_TASK_ID = ? ")
	
	.append(" UNION ALL ")
	
	.append(" SELECT C.PAA_USERNAME AS ACTIVITY_USERNAME, '报表外发' AS TASK_ACTIVITY_TYPE_NAME, ")
	.append(" D.SEND_TIME AS ACTIVITY_TIME,")
	.append(" D.SEND_RESULT AS ACTIVITY_DESC ")
	.append(" FROM  PMS_REPORT_TASK_UPLOAD A,PMS_REPORT_TASK_REVIEW B,PMS_REPORT_TASK_ENCRYPTION C, ")
	.append("		PMS_REPORT_TASK_SEND D ")
	.append(" WHERE A.REPORT_TASK_UPLOAD_ID = B.REPORT_TASK_UPLOAD_ID ")
	.append(" AND B.REPORT_TASK_REVIEW_ID = C.REPORT_TASK_REVIEW_ID ")
	.append(" AND C.REPORT_TASK_ENCRYPTION_ID = D.REPORT_TASK_ENCRYPTION_ID ")
	.append(" AND A.REPORT_TASK_ID = ? ")
	
	.append(" UNION ALL ")
	
	.append(" SELECT C.PAA_USERNAME AS ACTIVITY_USERNAME, '邮件通知' AS TASK_ACTIVITY_TYPE_NAME, ")
	.append("        D.SEND_TIME AS ACTIVITY_TIME,  ")
	.append("        DECODE(D.IS_SEND_SUCINFORMEMAIL,'0','无需发送邮件通知,', ")
	.append("		 (DECODE(D.IS_SEND_SUCINFORMEMAIL,'1','需发送邮件通知,',''))) ||  ")
	.append("        DECODE(D.Time_Send_Sucinformemail, 0 ,'还未发送通知邮件,', ")	
	.append("		 1 ,'已发送1次邮件通知,', 2 ,'已发送2次邮件通知,',3,'已发送3次邮件通知,','') ||  ")
	.append("        DECODE(D.RESULT_SEND_SUCINFORMEMAIL,'0','', ")
	.append("		 (DECODE(D.RESULT_SEND_SUCINFORMEMAIL,'1','邮件外发通知成功！','')))  AS ACTIVITY_DESC ")
	.append(" FROM  PMS_REPORT_TASK_UPLOAD A,PMS_REPORT_TASK_REVIEW B,PMS_REPORT_TASK_ENCRYPTION C, ")
	.append("		PMS_REPORT_TASK_SEND D ")
	.append(" WHERE A.REPORT_TASK_UPLOAD_ID = B.REPORT_TASK_UPLOAD_ID ")
	.append(" AND B.REPORT_TASK_REVIEW_ID = C.REPORT_TASK_REVIEW_ID ")
	.append(" AND C.REPORT_TASK_ENCRYPTION_ID = D.REPORT_TASK_ENCRYPTION_ID ")
	.append(" AND A.REPORT_TASK_ID = ? ")
	
	
//	.append(" UNION ALL ")
//	
//	.append(" SELECT C.PAA_USERNAME AS ACTIVITY_USERNAME, '报表外发' AS TASK_ACTIVITY_TYPE_NAME, ")
//	.append("        E.FTP_SEND_TIME AS ACTIVITY_TIME, E.FTP_SEND_RESULT AS ACTIVITY_DESC ")
//	.append(" FROM  PMS_REPORT_TASK_UPLOAD A,PMS_REPORT_TASK_REVIEW B,PMS_REPORT_TASK_ENCRYPTION C, ")
//	.append("		PMS_REPORT_TASK_SEND D,PMS_REP_TASK_SEND_FTP E ")
//	.append(" WHERE A.REPORT_TASK_UPLOAD_ID = B.REPORT_TASK_UPLOAD_ID ")
//	.append(" AND B.REPORT_TASK_REVIEW_ID = C.REPORT_TASK_REVIEW_ID ")
//	.append(" AND C.REPORT_TASK_ENCRYPTION_ID = D.REPORT_TASK_ENCRYPTION_ID ")
//	.append(" AND D.REPORT_TASK_SEND_ID = E.REPORT_TASK_SEND_ID ")
//	.append(" AND A.REPORT_TASK_ID = ? ")
//	
//	.append(" UNION ALL ")
//	
//	.append(" SELECT DISTINCT C.PAA_USERNAME AS ACTIVITY_USERNAME,'报表外发' AS TASK_ACTIVITY_TYPE_NAME, ")
//	.append("        E.EMAIL_SEND_TIME AS ACTIVITY_TIME,E.EMAIL_SEND_RESULT AS ACTIVITY_DESC ")
//	.append(" FROM  PMS_REPORT_TASK_UPLOAD A,PMS_REPORT_TASK_REVIEW B,PMS_REPORT_TASK_ENCRYPTION C, ")
//	.append("		PMS_REPORT_TASK_SEND D,PMS_REP_TASK_SEND_EMAIL E ")
//	.append(" WHERE A.REPORT_TASK_UPLOAD_ID = B.REPORT_TASK_UPLOAD_ID ")
//	.append(" AND B.REPORT_TASK_REVIEW_ID = C.REPORT_TASK_REVIEW_ID ")
//	.append(" AND C.REPORT_TASK_ENCRYPTION_ID = D.REPORT_TASK_ENCRYPTION_ID ")
//	.append(" AND D.REPORT_TASK_SEND_ID = E.REPORT_TASK_SEND_ID ")
//	.append(" AND A.REPORT_TASK_ID = ? ")
	
	.append(" ) ACT_LOG ")
	.append("  ORDER BY ACTIVITY_TIME DESC ")
	.toString();
	
	/**
	 * 通过DBlink获取发送完成的报表任务分发信息
	 */
	public static final String SQL_GET_HAVE_SEND_REPORT_TASK_SEND_INFO_BY_DBLINK = new StringBuffer()
	.append(" SELECT * FROM PMS_REPORT_TASK_SEND@PMSSEC_dblink T ")
	.append(" WHERE T.IS_SEND = '1' ")
	.toString();
	
	/**
	 * 通过DBlink获取报表任务分发FTP信息
	 */
	public static final String SQL_GET_REPORT_TASK_SEND_FTP_BY_SEND_ID = new StringBuffer()
	.append(" SELECT * FROM PMS_REP_TASK_SEND_FTP@PMSSEC_dblink T ")
	.append(" WHERE T.REPORT_TASK_SEND_ID = ? ")
	.toString();
	
	/**
	 * 通过DBlink获取报表任务分发email信息
	 */
	public static final String SQL_GET_REPORT_TASK_SEND_EMAIL_BY_SEND_ID = new StringBuffer()
	.append(" SELECT * FROM PMS_REP_TASK_SEND_EMAIL@PMSSEC_dblink T ")
	.append(" WHERE T.REPORT_TASK_SEND_ID = ? ")
	.toString();
	
	/**
	 * 通过DBlink获取报表任务分发信息
	 */
	public static final String SQL_GET_REPORT_TASK_SEND_INFO_BY_SEND_ID = new StringBuffer()
	.append(" SELECT * FROM PMS_REPORT_TASK_SEND@PMSSEC_dblink T ")
	.append(" WHERE T.REPORT_TASK_SEND_ID = ? ")
	.toString();
	/**
	 * 获取需要同步dblink信息的reporttask
	 */
	public static final String SQL_REPORT_TASK_SEND = new StringBuffer()
	.append(" SELECT * ")
	.append(" FROM pms_report_task_send  a    ")
	.append("  where  A.IS_SEND= '0'    ")
	.append(" or ( a.IS_SEND = '1' and a.IS_SEND_SUCINFORMEMAIL='1'  and a.TIME_SEND_SUCINFORMEMAIL<3  and  a.RESULT_SEND_SUCINFORMEMAIL='0' ) ")
	.toString();
	
	/**
	 * 获取当前时间前一天FTP同步成功的报表任务信息
	 */
	public static final String SQL_GET_FTP_SYNC_SUCCESS_REPORT_TASK_AT_YESTERDAY = new StringBuffer()
	.append(" SELECT A.REPORT_TASK_ID,D.REPORT_SOURCE_FTP_ID ")
	.append("   FROM PMS_REPORT_TASK A, PMS_REPORT_TASK_UPLOAD B,PMS_REP_TASK_UPLOAD_FTP C, PMS_TASK_STRATEGY D ")
	.append(" WHERE A.REPORT_TASK_ID = B.REPORT_TASK_ID ")
	.append("   AND B.REPORT_TASK_UPLOAD_ID = C.REPORT_TASK_UPLOAD_ID ")
	.append("   AND A.TASK_STRATEGY_ID = D.TASK_STRATEGY_ID ")
	.append("   AND C.FTP_SYNC_STATUS_ID = '1' ")
	.append("   AND C.FTP_UPLOAD_TIME < sysdate-1 ")
	.toString();
	
	/**
	 * 通过报表任务ID获取加密信息列表
	 */
	public static final String SQL_GET_REPORT_TASK_ENCRYPTION_LIST_BY_REPORT_TASK_ID = new StringBuffer()
	.append(" SELECT C.* ")
	.append(" FROM  PMS_REPORT_TASK_UPLOAD A,PMS_REPORT_TASK_REVIEW B,PMS_REPORT_TASK_ENCRYPTION C,PMS_REPORT_TASK D ")
	.append(" WHERE A.REPORT_TASK_ID = D.REPORT_TASK_ID ")
	.append("   AND A.REPORT_TASK_UPLOAD_ID = B.REPORT_TASK_UPLOAD_ID ")
	.append("   AND B.REPORT_TASK_REVIEW_ID = C.REPORT_TASK_REVIEW_ID ")
	.append("   AND A.REPORT_TASK_ID = ? ")
	.toString();
	
	/**
	 * 获取报表数量
	 */
	public static final String SQL_GET_REPORT_TASK_NUM = new StringBuffer()
	.append("SELECT M.NEW_REPORT_NUM, N.REVIEW_REPORT_NUM, K.ENCRYPTION_REPORT_NUM, J.SEND_REPORT_NUM FROM  ")
	.append("(SELECT '1' as SID, COUNT (*) AS NEW_REPORT_NUM " )
	.append("    FROM PMS_REPORT_TASK T WHERE T.START_TIME > TRUNC(SYSDATE, 'DD')) M,")
	.append("(SELECT '1' as SID, COUNT(DISTINCT A.REPORT_TASK_UPLOAD_ID) AS REVIEW_REPORT_NUM " )
    .append("    FROM PMS_REPORT_TASK_REVIEW A WHERE A.REVIEW_TIME IS  NULL) N,")
	.append("(SELECT '1' as SID, COUNT(*) AS ENCRYPTION_REPORT_NUM " )
	.append("    FROM  PMS_REPORT_TASK_ENCRYPTION B WHERE B.ENCRYPTION_TIME IS NOT NULL AND B.IS_ENCRYPTION ='1') K,")
	.append("(SELECT '1' as SID, COUNT(*)  AS SEND_REPORT_NUM " )
	.append("    FROM  PMS_REPORT_TASK_SEND C WHERE C.SEND_TIME IS  NOT NULL) J")
	.append(" WHERE M.SID = N.SID AND N.SID = K.SID AND K.SID = J.SID")
	.toString();
	
}
