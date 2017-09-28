package ecp.bsp.business.file.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import ecp.bsp.system.core.BaseEntity;

/**
 * 报表任务上传FTP信息实体
 * 
 * @since 2015-06-12 <br>
 * 
 * @author zengqingyue.
 */
@Entity
@Table(name = "PMS_REP_TASK_UPLOAD_FTP", schema = "PMSWEB_DBA")
public class ReportTaskUploadFtpEntity extends BaseEntity {
	/**
	 * 版本号.
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 报表任务信息ID.
	 */
	private String reportTaskUploadId;
	/**
	 * ftpID.
	 */
	private String ftpId;
	/**
	 * ftp同步状态ID.
	 */
	private String ftpSyncStatusId;
	/**
	 * ftp上传时间.
	 */
	private Date ftpUploadTime;
	/**
	 * 上传结果.
	 */
	private String ftpUploadResult;
	
	@Id
	@Column(name = "REP_TASK_UPLOAD_FTP_ID", unique = true, nullable = false, length = 32)
	public String getReportTaskUploadFtpId() {
		return this.getId();
	}

	public void setReportTaskUploadFtpId(String reportTaskUploadFtpId) {
		this.setId(reportTaskUploadFtpId);
	}
	
	@Column(name = "REPORT_TASK_UPLOAD_ID", nullable = false, length = 50)
	public String getReportTaskUploadId() {
		return reportTaskUploadId;
	}

	public void setReportTaskUploadId(String reportTaskUploadId) {
		this.reportTaskUploadId = reportTaskUploadId;
	}

	@Column(name = "FTP_ID", nullable = false, length = 50)
	public String getFtpId() {
		return ftpId;
	}
	
	public void setFtpId(String ftpId) {
		this.ftpId = ftpId;
	}
	
	@Column(name = "FTP_SYNC_STATUS_ID", nullable = false, length = 50)
	public String getFtpSyncStatusId() {
		return ftpSyncStatusId;
	}
	
	public void setFtpSyncStatusId(String ftpSyncStatusId) {
		this.ftpSyncStatusId = ftpSyncStatusId;
	}
	
	@Column(name = "FTP_UPLOAD_TIME", nullable = false)
	public Date getFtpUploadTime() {
		return ftpUploadTime;
	}
	
	public void setFtpUploadTime(Date ftpUploadTime) {
		this.ftpUploadTime = ftpUploadTime;
	}
	
	@Column(name = "FTP_UPLOAD_RESULT", nullable = false, length = 50)
	public String getFtpUploadResult() {
		return ftpUploadResult;
	}
	
	public void setFtpUploadResult(String ftpUploadResult) {
		this.ftpUploadResult = ftpUploadResult;
	}
	
}