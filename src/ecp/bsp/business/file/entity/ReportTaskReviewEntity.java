package ecp.bsp.business.file.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import ecp.bsp.system.core.BaseEntity;

/**
 * 报表任务评审信息实体
 * 
 * @since 2015-06-12 <br>
 * 
 * @author zengqingyue.
 */
@Entity
@Table(name = "PMS_REPORT_TASK_REVIEW", schema = "PMSWEB_DBA")
public class ReportTaskReviewEntity extends BaseEntity {
	/**
	 * 版本号.
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 报表任务上传信息ID.
	 */
	private String reportTaskUploadId;
	/**
	 * 评审状态ID.
	 */
	private String reportReviewStatusId;
	/**
	 * 评审类型ID.
	 */
	private String reportReviewTypeId;
	/**
	 * 创建人ID.
	 */
	private String paaEmployeeId;
	/**
	 * 创建人名称.
	 */
	private String paaUsername;
	/**
	 * 评审时间.
	 */
	private Date reviewTime;
	/**
	 * 描述.
	 */
	private String reviewDesc;
	/**
	 * 是否最终版本.
	 */
	private String isFinalVersion;

	@Id
	@Column(name = "REPORT_TASK_REVIEW_ID", unique = true, nullable = false, length = 32)
	public String getReportTaskReviewId() {
		return this.getId();
	}

	public void setReportTaskReviewId(String reportTaskReviewId) {
		this.setId(reportTaskReviewId);
	}
	
	@Column(name = "REPORT_TASK_UPLOAD_ID", nullable = false, length = 50)
	public String getReportTaskUploadId() {
		return reportTaskUploadId;
	}

	public void setReportTaskUploadId(String reportTaskUploadId) {
		this.reportTaskUploadId = reportTaskUploadId;
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
	
	@Column(name = "REPORT_REVIEW_STATUS_ID", nullable = false, length = 50)
	public String getReportReviewStatusId() {
		return reportReviewStatusId;
	}
	
	public void setReportReviewStatusId(String reportReviewStatusId) {
		this.reportReviewStatusId = reportReviewStatusId;
	}
	
	@Column(name = "REPORT_REVIEW_TYPE_ID", nullable = false, length = 50)
	public String getReportReviewTypeId() {
		return reportReviewTypeId;
	}
	
	public void setReportReviewTypeId(String reportReviewTypeId) {
		this.reportReviewTypeId = reportReviewTypeId;
	}
	
	@Column(name = "REVIEW_TIME", nullable = false)
	public Date getReviewTime() {
		return reviewTime;
	}
	
	public void setReviewTime(Date reviewTime) {
		this.reviewTime = reviewTime;
	}
	
	@Column(name = "REVIEW_DESC", nullable = false, length = 50)
	public String getReviewDesc() {
		return reviewDesc;
	}
	
	public void setReviewDesc(String reviewDesc) {
		this.reviewDesc = reviewDesc;
	}
	
}