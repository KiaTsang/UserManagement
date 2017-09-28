package ecp.bsp.business.file.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import ecp.bsp.system.core.BaseEntity;

/**
 * 报表任务上传信息实体
 * 
 * @since 2015-06-12 <br>
 * 
 * @author zengqingyue.
 */
@Entity
@Table(name = "PMS_REPORT_TASK_UPLOAD", schema = "PMSWEB_DBA")
public class ReportTaskUploadEntity extends BaseEntity {
	/**
	 * 版本号.
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 报表任务信息ID.
	 */
	private String reportTaskId;
	/**
	 * 上传类型ID.
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
	 * 上传时间.
	 */
	private Date uploadTime;
	/**
	 * 是否最终版本.
	 */
	private String isFinalVersion;
	
	@Id
	@Column(name = "REPORT_TASK_UPLOAD_ID", unique = true, nullable = false, length = 32)
	public String getReportTaskUploadId() {
		return this.getId();
	}

	public void setReportTaskUploadId(String reportTaskUploadId) {
		this.setId(reportTaskUploadId);
	}
	
	@Column(name = "REPORT_TASK_ID", nullable = false, length = 50)
	public String getReportTaskId() {
		return reportTaskId;
	}

	public void setReportTaskId(String reportTaskId) {
		this.reportTaskId = reportTaskId;
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
	
	@Column(name = "OPERATOR_TYPE_ID", nullable = false, length = 50)
	public String getOperatorTypeId() {
		return operatorTypeId;
	}
	
	public void setOperatorTypeId(String operatorTypeId) {
		this.operatorTypeId = operatorTypeId;
	}
	
	@Column(name = "UPLOAD_TIME", nullable = false)
	public Date getUploadTime() {
		return uploadTime;
	}
	
	public void setUploadTime(Date uploadTime) {
		this.uploadTime = uploadTime;
	}
	
	@Column(name = "IS_FINAL_VERSION", nullable = false, length = 50)
	public String getIsFinalVersion() {
		return isFinalVersion;
	}
	
	public void setIsFinalVersion(String isFinalVersion) {
		this.isFinalVersion = isFinalVersion;
	}
	
}