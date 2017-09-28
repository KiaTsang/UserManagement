package ecp.bsp.business.file.dto;

import java.io.Serializable;
import java.util.Date;

import org.springframework.stereotype.Component;

import ecp.bsp.system.core.BaseDTO;

/**
 * 邮件报表通知DTO
 * 
 * @since 2015-06-23 <br>
 * 
 * @author zengqingyue.
 */
@Component
public class EmailReportNoticeDTO extends BaseDTO  implements Serializable{
	/**
	 * 版本号.
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 报表任务名称.
	 */
	private String reportTaskName;
	/**
	 * 报表任务活动状态.
	 */
	private String repTaskActivityStatusName;
	/**
	 * 任务批次编号.
	 */
	private String taskBatchCode;
	/**
	 * 产品类型.
	 */
	private String productTypeName;
	/**
	 * 运营商.
	 */
	private String operatorName;
	/**
	 * 品牌.
	 */
	private String brandName;
	/**
	 * 报表分发类型.
	 */
	private String reportSendTypeName;
	/**
	 * 上传类型.
	 */
	private String uploadOperatorTypeName;
	/**
	 * 加密类型.
	 */
	private String encryptionOperatorTypeName;
	/**
	 * 加密算法.
	 */
	private String encryptionAlgorithmName;
	/**
	 * 报表来源FtpID.
	 */
	private String reportSourceFtpId;
	/**
	 * 报表目标FtpID.
	 */
	private String reportTargetFtpId;
	/**
	 * 负责人.
	 */
	private String paaUsername;
	/**
	 * 完成时间.
	 */
	private Date finishTime;
	/**
	 * 任务策略描述.
	 */
	private String taskStrategyDesc;
	public String getReportTaskName() {
		return reportTaskName;
	}
	public void setReportTaskName(String reportTaskName) {
		this.reportTaskName = reportTaskName;
	}
	public String getRepTaskActivityStatusName() {
		return repTaskActivityStatusName;
	}
	public void setRepTaskActivityStatusName(String repTaskActivityStatusName) {
		this.repTaskActivityStatusName = repTaskActivityStatusName;
	}
	public String getTaskBatchCode() {
		return taskBatchCode;
	}
	public void setTaskBatchCode(String taskBatchCode) {
		this.taskBatchCode = taskBatchCode;
	}
	public String getProductTypeName() {
		return productTypeName;
	}
	public void setProductTypeName(String productTypeName) {
		this.productTypeName = productTypeName;
	}
	public String getOperatorName() {
		return operatorName;
	}
	public void setOperatorName(String operatorName) {
		this.operatorName = operatorName;
	}
	public String getBrandName() {
		return brandName;
	}
	public void setBrandName(String brandName) {
		this.brandName = brandName;
	}
	public String getReportSendTypeName() {
		return reportSendTypeName;
	}
	public void setReportSendTypeName(String reportSendTypeName) {
		this.reportSendTypeName = reportSendTypeName;
	}
	public String getUploadOperatorTypeName() {
		return uploadOperatorTypeName;
	}
	public void setUploadOperatorTypeName(String uploadOperatorTypeName) {
		this.uploadOperatorTypeName = uploadOperatorTypeName;
	}
	public String getEncryptionOperatorTypeName() {
		return encryptionOperatorTypeName;
	}
	public void setEncryptionOperatorTypeName(String encryptionOperatorTypeName) {
		this.encryptionOperatorTypeName = encryptionOperatorTypeName;
	}
	public String getEncryptionAlgorithmName() {
		return encryptionAlgorithmName;
	}
	public void setEncryptionAlgorithmName(String encryptionAlgorithmName) {
		this.encryptionAlgorithmName = encryptionAlgorithmName;
	}
	public String getReportSourceFtpId() {
		return reportSourceFtpId;
	}
	public void setReportSourceFtpId(String reportSourceFtpId) {
		this.reportSourceFtpId = reportSourceFtpId;
	}
	public String getReportTargetFtpId() {
		return reportTargetFtpId;
	}
	public void setReportTargetFtpId(String reportTargetFtpId) {
		this.reportTargetFtpId = reportTargetFtpId;
	}
	public String getPaaUsername() {
		return paaUsername;
	}
	public void setPaaUsername(String paaUsername) {
		this.paaUsername = paaUsername;
	}
	public Date getFinishTime() {
		return finishTime;
	}
	public void setFinishTime(Date finishTime) {
		this.finishTime = finishTime;
	}
	public String getTaskStrategyDesc() {
		return taskStrategyDesc;
	}
	public void setTaskStrategyDesc(String taskStrategyDesc) {
		this.taskStrategyDesc = taskStrategyDesc;
	}
}
