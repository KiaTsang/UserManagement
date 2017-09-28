package ecp.bsp.business.file.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import ecp.bsp.system.core.BaseEntity;

/**
 * 报表任务加密信息实体
 * 
 * @since 2015-06-12 <br>
 * 
 * @author zengqingyue.
 */
@Entity
@Table(name = "PMS_REPORT_TASK_ENCRYPTION", schema = "PMSWEB_DBA")
public class ReportTaskEncryptionEntity extends BaseEntity {
	/**
	 * 版本号.
	 */
	private static final long serialVersionUID = 1L;
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
	 * 是否最终版本.
	 */
	private String isFinalVersion;

	@Id
	@Column(name = "REPORT_TASK_ENCRYPTION_ID", unique = true, nullable = false, length = 32)
	public String getReportTaskEncryptionId() {
		return this.getId();
	}

	public void setReportTaskEncryptionId(String reportTaskEncryptionId) {
		this.setId(reportTaskEncryptionId);
	}
	
	@Column(name = "REPORT_TASK_REVIEW_ID", nullable = false, length = 50)
	public String getReportTaskReviewId() {
		return reportTaskReviewId;
	}

	public void setReportTaskReviewId(String reportTaskReviewId) {
		this.reportTaskReviewId = reportTaskReviewId;
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
	
	@Column(name = "IS_FINAL_VERSION", nullable = false, length = 50)
	public String getIsFinalVersion() {
		return isFinalVersion;
	}
	
	public void setIsFinalVersion(String isFinalVersion) {
		this.isFinalVersion = isFinalVersion;
	}
	
	@Column(name = "ENCRYPTION_ALGORITHM_ID", nullable = false, length = 50)
	public String getEncryptionAlgorithmId() {
		return encryptionAlgorithmId;
	}
	
	public void setEncryptionAlgorithmId(String encryptionAlgorithmId) {
		this.encryptionAlgorithmId = encryptionAlgorithmId;
	}
	
	@Column(name = "OPERATOR_TYPE_ID", nullable = false, length = 50)
	public String getOperatorTypeId() {
		return operatorTypeId;
	}
	
	public void setOperatorTypeId(String operatorTypeId) {
		this.operatorTypeId = operatorTypeId;
	}
	
	@Column(name = "ENCRYPTION_TIME", nullable = false, length = 50)
	public Date getEncryptionTime() {
		return encryptionTime;
	}
	
	public void setEncryptionTime(Date encryptionTime) {
		this.encryptionTime = encryptionTime;
	}
	
	@Column(name = "ENCRYPTION_DESC", nullable = false, length = 50)
	public String getEncryptionDesc() {
		return encryptionDesc;
	}
	
	public void setEncryptionDesc(String encryptionDesc) {
		this.encryptionDesc = encryptionDesc;
	}

	@Column(name = "IS_ENCRYPTION", nullable = false, length = 50)
	public String getIsEncryption() {
		return isEncryption;
	}

	public void setIsEncryption(String isEncryption) {
		this.isEncryption = isEncryption;
	}
	
}