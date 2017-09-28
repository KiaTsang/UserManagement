package ecp.bsp.business.file.dto;

import java.util.Date;

import org.springframework.stereotype.Component;

import ecp.bsp.system.core.BaseDTO;

/**
 * 报表任务加密信息dto
 * 
 * @since 2015-07-16
 * 
 * @author zengqingyue.
 */
@Component
public class ReportTaskEncryptionDTO extends BaseDTO {
	/**
	 * 任务策略ID
	 */
	private String reportTaskId;
	/**
	 * 任务策略ID
	 */
	private String taskStrategyId;
	/**
	 * 报表任务加密信息ID.
	 */
	private String reportTaskEncryptionId;
	/**
	 * 报表任务评审信息ID.
	 */
	private String reportTaskReviewId;
	/**
	 * 算法ID.
	 */
	private String encryptionAlgorithmId;
	/**
	 * 加密类型ID.
	 */
	private String operatorTypeId;
	/**
	 * 加密类型ID.
	 */
	private String encryptionOperatorTypeId;
	/**
	 * 创建人ID.
	 */
	private String paaEmployeeId;
	/**
	 * 创建人名称.
	 */
	private String paaUsername;
	/**
	 * 加密时间.
	 */
	private Date encryptionTime;
	/**
	 * 描述.
	 */
	private String encryptionDesc;
	/**
	 * 是否加密.
	 */
	private String isEncryption;
	/**
	 * 报表分发类型ID.
	 */
	private String reportSendTypeId;
	/**
	 * 是否最终版本.
	 */
	private String isFinalVersion;
	/**
	 * 报表目标FtpID.
	 */
	private String reportTargetFtpId;
	/**
	 * 运营商名称.
	 */
	private String operatorId;
	/**
	 * 运营商名称.
	 */
	private String operatorName;
	
	public String getReportTaskEncryptionId() {
		return reportTaskEncryptionId;
	}
	public void setReportTaskEncryptionId(String reportTaskEncryptionId) {
		this.reportTaskEncryptionId = reportTaskEncryptionId;
	}
	public String getReportTaskReviewId() {
		return reportTaskReviewId;
	}
	public void setReportTaskReviewId(String reportTaskReviewId) {
		this.reportTaskReviewId = reportTaskReviewId;
	}
	public String getEncryptionAlgorithmId() {
		return encryptionAlgorithmId;
	}
	public void setEncryptionAlgorithmId(String encryptionAlgorithmId) {
		this.encryptionAlgorithmId = encryptionAlgorithmId;
	}
	public String getOperatorTypeId() {
		return operatorTypeId;
	}
	public void setOperatorTypeId(String operatorTypeId) {
		this.operatorTypeId = operatorTypeId;
	}
	public String getPaaEmployeeId() {
		return paaEmployeeId;
	}
	public void setPaaEmployeeId(String paaEmployeeId) {
		this.paaEmployeeId = paaEmployeeId;
	}
	public String getPaaUsername() {
		return paaUsername;
	}
	public void setPaaUsername(String paaUsername) {
		this.paaUsername = paaUsername;
	}
	public Date getEncryptionTime() {
		return encryptionTime;
	}
	public void setEncryptionTime(Date encryptionTime) {
		this.encryptionTime = encryptionTime;
	}
	public String getEncryptionDesc() {
		return encryptionDesc;
	}
	public void setEncryptionDesc(String encryptionDesc) {
		this.encryptionDesc = encryptionDesc;
	}
	public String getIsFinalVersion() {
		return isFinalVersion;
	}
	public void setIsFinalVersion(String isFinalVersion) {
		this.isFinalVersion = isFinalVersion;
	}
	public String getIsEncryption() {
		return isEncryption;
	}
	public void setIsEncryption(String isEncryption) {
		this.isEncryption = isEncryption;
	}
	public String getTaskStrategyId() {
		return taskStrategyId;
	}
	public void setTaskStrategyId(String taskStrategyId) {
		this.taskStrategyId = taskStrategyId;
	}
	public String getEncryptionOperatorTypeId() {
		return encryptionOperatorTypeId;
	}
	public void setEncryptionOperatorTypeId(String encryptionOperatorTypeId) {
		this.encryptionOperatorTypeId = encryptionOperatorTypeId;
	}
	public String getReportSendTypeId() {
		return reportSendTypeId;
	}
	public void setReportSendTypeId(String reportSendTypeId) {
		this.reportSendTypeId = reportSendTypeId;
	}
	public String getReportTargetFtpId() {
		return reportTargetFtpId;
	}
	public void setReportTargetFtpId(String reportTargetFtpId) {
		this.reportTargetFtpId = reportTargetFtpId;
	}
	public String getReportTaskId() {
		return reportTaskId;
	}
	public void setReportTaskId(String reportTaskId) {
		this.reportTaskId = reportTaskId;
	}
	public String getOperatorId() {
		return operatorId;
	}
	public void setOperatorId(String operatorId) {
		this.operatorId = operatorId;
	}
	public String getOperatorName() {
		return operatorName;
	}
	public void setOperatorName(String operatorName) {
		this.operatorName = operatorName;
	}

}