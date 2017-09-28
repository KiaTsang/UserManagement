package ecp.bsp.business.file.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import ecp.bsp.system.core.BaseEntity;

/**
 * 任务策略实体
 * 
 * @since 2015-06-08 <br>
 * 
 * @author zengqingyue.
 */
@Entity
@Table(name = "PMS_TASK_STRATEGY", schema = "PMSWEB_DBA")
public class TaskStrategyEntity extends BaseEntity {
	/**
	 * 版本号.
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 策略信息ID.
	 */
	private String strategyInfoId;
	/**
	 * 任务策略名称.
	 */
	private String taskStrategyName;
	/**
	 * 任务批次编号.
	 */
	private String taskBatchCode;
	/**
	 * 产品类型ID.
	 */
	private String productTypeId;
	/**
	 * 运营商ID.
	 */
	private String operatorId;
	/**
	 * 报表分发类型ID.
	 */
	private String reportSendTypeId;
	/**
	 * 上传类型ID.
	 */
	private String uploadOperatorTypeId;
	/**
	 * 加密类型ID.
	 */
	private String encryptionOperatorTypeId;
	/**
	 * 加密算法ID.
	 */
	private String encryptionAlgorithmId;
	/**
	 * 报表来源FtpID.
	 */
	private String reportSourceFtpId;
	/**
	 * 报表目标FtpID.
	 */
	private String reportTargetFtpId;
	/**
	 * 创建人ID.
	 */
	private String paaEmployeeId;
	/**
	 * 创建人名称.
	 */
	private String paaUsername;
	/**
	 * 创建时间.
	 */
	private Date createTime;
	/**
	 * 任务策略描述.
	 */
	private String taskStrategyDesc;
	/**
	 * 是否加密.
	 */
	private String isEncryption;
	/**
	 * 是否匹配规则.
	 */
	private String isMatchRule;
	/**
	 * 是否最终版本.
	 */
	private String isFinalVersion;
	/**
	 * 如果为邮件外发则匹配的邮件模板.
	 */
	private String mailModeId;
	
	/**
	 * 外发成功是否发送邮件通知.
	 */
	private String isSendSucMailInform;
	/**
	 * 报表发送成功发送邮件通知的邮件模板.
	 */
	private String sendSucmailModeId;
	
	/**
	 * 获取任务策略ID.
	 * 
	 * @return 任务策略ID.
	 */
	@Id
	@Column(name = "TASK_STRATEGY_ID", unique = true, nullable = false, length = 32)
	public String getTaskStrategyId() {
		return this.getId();
	}

	/**
	 * 设置任务策略ID.
	 * 
	 * @param productTypeId
	 *            任务策略ID.
	 */
	public void setTaskStrategyId(String taskStrategyId) {
		this.setId(taskStrategyId);
	}
	
	@Column(name = "TASK_STRATEGY_NAME", nullable = false, length = 50)
	public String getTaskStrategyName() {
		return taskStrategyName;
	}

	public void setTaskStrategyName(String taskStrategyName) {
		this.taskStrategyName = taskStrategyName;
	}

	@Column(name = "STRATEGY_INFO_ID", nullable = false, length = 50)
	public String getStrategyInfoId() {
		return strategyInfoId;
	}

	public void setStrategyInfoId(String strategyInfoId) {
		this.strategyInfoId = strategyInfoId;
	}

	@Column(name = "TASK_BATCH_CODE", nullable = false, length = 50)
	public String getTaskBatchCode() {
		return taskBatchCode;
	}

	public void setTaskBatchCode(String taskBatchCode) {
		this.taskBatchCode = taskBatchCode;
	}

	@Column(name = "PRODUCT_TYPE_ID", nullable = false, length = 50)
	public String getProductTypeId() {
		return productTypeId;
	}

	public void setProductTypeId(String productTypeId) {
		this.productTypeId = productTypeId;
	}

	@Column(name = "OPERATOR_ID", nullable = false, length = 50)
	public String getOperatorId() {
		return operatorId;
	}

	public void setOperatorId(String operatorId) {
		this.operatorId = operatorId;
	}

	@Column(name = "REPORT_SEND_TYPE_ID", nullable = false, length = 50)
	public String getReportSendTypeId() {
		return reportSendTypeId;
	}

	public void setReportSendTypeId(String reportSendTypeId) {
		this.reportSendTypeId = reportSendTypeId;
	}

	@Column(name = "UPLOAD_OPERATOR_TYPE_ID", nullable = false, length = 50)
	public String getUploadOperatorTypeId() {
		return uploadOperatorTypeId;
	}

	public void setUploadOperatorTypeId(String uploadOperatorTypeId) {
		this.uploadOperatorTypeId = uploadOperatorTypeId;
	}

	@Column(name = "ENCRYPTION_OPERATOR_TYPE_ID", nullable = false, length = 50)
	public String getEncryptionOperatorTypeId() {
		return encryptionOperatorTypeId;
	}

	public void setEncryptionOperatorTypeId(String encryptionOperatorTypeId) {
		this.encryptionOperatorTypeId = encryptionOperatorTypeId;
	}

	@Column(name = "ENCRYPTION_ALGORITHM_ID", nullable = false, length = 50)
	public String getEncryptionAlgorithmId() {
		return encryptionAlgorithmId;
	}

	public void setEncryptionAlgorithmId(String encryptionAlgorithmId) {
		this.encryptionAlgorithmId = encryptionAlgorithmId;
	}

	@Column(name = "REPORT_SOURCE_FTP_ID", nullable = false, length = 50)
	public String getReportSourceFtpId() {
		return reportSourceFtpId;
	}

	public void setReportSourceFtpId(String reportSourceFtpId) {
		this.reportSourceFtpId = reportSourceFtpId;
	}

	@Column(name = "REPORT_TARGET_FTP_ID", nullable = false, length = 50)
	public String getReportTargetFtpId() {
		return reportTargetFtpId;
	}

	public void setReportTargetFtpId(String reportTargetFtpId) {
		this.reportTargetFtpId = reportTargetFtpId;
	}

	@Column(name = "PAA_EMPLOYEE_ID", nullable = false, length = 50)
	public String getPaaEmployeeId() {
		return paaEmployeeId;
	}

	public void setPaaEmployeeId(String paaEmployeeId) {
		this.paaEmployeeId = paaEmployeeId;
	}

	@Column(name = "PAA_USERNAME", nullable = false, length = 50)
	public String getPaaUsername() {
		return paaUsername;
	}

	public void setPaaUsername(String paaUsername) {
		this.paaUsername = paaUsername;
	}

	@Column(name = "CREATE_TIME", nullable = false)
	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	@Column(name = "TASK_STRATEGY_DESC", nullable = false, length = 50)
	public String getTaskStrategyDesc() {
		return taskStrategyDesc;
	}

	public void setTaskStrategyDesc(String taskStrategyDesc) {
		this.taskStrategyDesc = taskStrategyDesc;
	}

	@Column(name = "IS_FINAL_VERSION", nullable = false, length = 50)
	public String getIsFinalVersion() {
		return isFinalVersion;
	}

	public void setIsFinalVersion(String isFinalVersion) {
		this.isFinalVersion = isFinalVersion;
	}

	@Column(name = "IS_ENCRYPTION", nullable = false, length = 50)
	public String getIsEncryption() {
		return isEncryption;
	}

	public void setIsEncryption(String isEncryption) {
		this.isEncryption = isEncryption;
	}

	@Column(name = "IS_MATCH_RULE", nullable = false, length = 50)
	public String getIsMatchRule() {
		return isMatchRule;
	}

	public void setIsMatchRule(String isMatchRule) {
		this.isMatchRule = isMatchRule;
	}
	@Column(name = "MAIL_MODE_ID", nullable = false, length = 60)
	public String getMailModeId() {
		return mailModeId;
	}

	public void setMailModeId(String mailModeId) {
		this.mailModeId = mailModeId;
	}
	@Column(name = "IS_SEND_SUCMAILINFORM",  length = 32)
	public String getIsSendSucMailInform() {
		return isSendSucMailInform;
	}

	public void setIsSendSucMailInform(String isSendSucMailInform) {
		this.isSendSucMailInform = isSendSucMailInform;
	}
	@Column(name = "SEND_SUCINFORM_MAILMODEL_ID",  length = 32)
	public String getSendSucmailModeId() {
		return sendSucmailModeId;
	}

	public void setSendSucmailModeId(String sendSucmailModeId) {
		this.sendSucmailModeId = sendSucmailModeId;
	}
	

}