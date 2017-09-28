package ecp.bsp.business.file.constant;

/**
 * 文件系统配置信息代码常量定义
 * 
 * @since 2015-06-08 <br>
 * 
 * @author zengqingyue.
 * 
 */
public class FileConfigConst {
	/**
	 * 查询条件位置标识符
	 */
	public static final String PARAM_CONDITION_POS_FLAG = "-CONDITION-"; 
	
	/**
	 * 查询条件位置标识符
	 */
	public static final String PARAM_OTHER_PARAM_POS_FLAG = "-OTHER_PARAM-";
	/**
	 * 产品类型ID.
	 */
	public static final String PARAM_ENTITY_PRODUCT_TYPE_ID = "productTypeId";
	/**
	 * 产品类型名称.
	 */
	public static final String PARAM_ENTITY_PRODUCT_TYPE_NAME = "productTypeName";
	/**
	 * 运营商ID.
	 */
	public static final String PARAM_ENTITY_OPERATOR_ID = "operatorId";
	/**
	 * 运营商名称.
	 */
	public static final String PARAM_ENTITY_OPERATOR_NAME = "operatorName";
	/**
	 * 品牌ID.
	 */
	public static final String PARAM_ENTITY_BRAND_ID = "brandId";
	/**
	 * 品牌名称.
	 */
	public static final String PARAM_ENTITY_BRAND_NAME = "brandName";
	/**
	 * 邮箱接收人ID.
	 */
	public static final String PARAM_ENTITY_EMAIL_RECEIVER_ID = "emailReceiverId";
	/**
	 * 任务策略ID.
	 */
	public static final String PARAM_ENTITY_TASK_STRATEGY_ID = "taskStrategyId";
	/**
	 * 邮箱接收人名称.
	 */
	public static final String PARAM_ENTITY_EMAIL_RECEIVER_NAME = "emailReceiverName";
	/**
	 * FTPID.
	 */
	public static final String PARAM_ENTITY_FTP_ID = "ftpId";
	/**
	 * FTP名称.
	 */
	public static final String PARAM_ENTITY_FTP_NAME = "ftpName";
	/**
	 * 算法ID.
	 */
	public static final String PARAM_ENTITY_ENCRYPTION_ALGORITHM_ID = "encryptionAlgorithmId";
	/**
	 * 算法名称.
	 */
	public static final String PARAM_ENTITY_ENCRYPTION_ALGORITHM_NAME = "encryptionAlgorithmName";
	/**
	 * 邮件模板ID.
	 */
	public static final String PARAM_ENTITY_MAIL_MODE_ID = "mailModeId";
	/**
	 * 邮件模板名称.
	 */
	public static final String PARAM_ENTITY_MAIL_MODE_NAME = "mailModeName";

	public static final String SQL_GET_TASK_STRATEGY_LIST_BY_FTP_ID = new StringBuilder()
	.append(" SELECT * FROM PMS_TASK_STRATEGY T")
	.append(" WHERE T.REPORT_SOURCE_FTP_ID = ?")
	.append(" OR T.REPORT_TARGET_FTP_ID = ?")
	.toString();
	
	public static final String SQL_GET_PRODUCT_TYPE_LIST = new StringBuilder()
	.append(" SELECT T.*,PRODUCT_TYPE_ID AS ID,PRODUCT_TYPE_NAME AS TEXT ")
	.append(" FROM PMS_PRODUCT_TYPE T")
	.toString();
	
	public static final String SQL_GET_OPERATOR_LIST = new StringBuilder()
	.append(" SELECT T.*,T.OPERATOR_ID AS ID,T.OPERATOR_NAME AS TEXT FROM PMS_OPERATOR T ")
	.toString();
	
	public static final String SQL_GET_BRAND_LIST = new StringBuilder()
	.append(" SELECT T.*,T.BRAND_ID AS ID,T.BRAND_NAME AS TEXT FROM PMS_BRAND T ")
	.toString();
	
	public static final String SQL_GET_EMAIL_LIST = new StringBuilder()
	.append(" SELECT T.*,T.EMAIL_RECEIVER_ID AS ID,T.EMAIL_RECEIVER_NAME AS TEXT FROM PMS_EMAIL_RECEIVER T ")
	.toString();
	
	public static final String SQL_GET_FTP_LIST = new StringBuilder()
	.append(" SELECT T.*,D.FTP_DELETE_TYPE_NAME ,T.FTP_ID AS ID,T.FTP_NAME AS TEXT FROM PMS_FTP T ,PMS_FTP_DELETE_TYPE D")
	.append(" WHERE T.FTP_DELETE_TYPE_ID = D.FTP_DELETE_TYPE_ID ")
	.toString();
	
	public static final String SQL_GET_TASK_FTP_BY_FTP_ID = new StringBuilder()
	.append(" SELECT T.*,D.FTP_DELETE_TYPE_NAME  FROM PMS_FTP T ,PMS_FTP_DELETE_TYPE D")
	.append(" WHERE T.FTP_DELETE_TYPE_ID = D.FTP_DELETE_TYPE_ID ")
	.append(" AND T.FTP_ID = ? ")
	.toString();

	public static final String SQL_GET_ENCRYPTION_ALGORITHM_BY_ENCRYPTION_ALGORITHM_ID= new StringBuilder()
	.append(" SELECT T.*,T.ENCRYPTION_ALGORITHM_ID AS ID,T.ENCRYPTION_ALGORITHM_NAME AS TEXT,T.ENCRYPTION_ALGORITHM_DESC AS EMAIL_RECEIVER_DESC, ")
	.append(" S.DLL_NAME,S.ALGORITHM_DLL_ID,S.DLL_METHOD,S.DLL_EXTRA_PARAM,S.DLL_RETURN_TYPE ")
	.append(" FROM PMS_ENCRYPTION_ALGORITHM T,PMS_ALGORITHM_DLL S ")
	.append(" WHERE T.ENCRYPTION_ALGORITHM_ID = S.ENCRYPTION_ALGORITHM_ID(+) ")
	.append("AND T.ENCRYPTION_ALGORITHM_ID = ?")
	.toString();
	
	public static final String SQL_GET_MAIL_MODE_LIST = new StringBuilder()
	.append(" SELECT T.*,T.MAIL_MODE_ID AS ID,T.MAIL_MODE_NAME AS TEXT FROM PMS_MAIL_MODE T ")
	.toString();
}
