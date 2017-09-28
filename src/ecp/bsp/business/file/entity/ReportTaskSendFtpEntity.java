package ecp.bsp.business.file.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import ecp.bsp.system.core.BaseEntity;

/**
 * 报表任务发送FTP信息实体
 * 
 * @since 2015-06-12 <br>
 * 
 * @author zengqingyue.
 */
@Entity
@Table(name = "PMS_REP_TASK_SEND_FTP", schema = "PMSWEB_DBA")
public class ReportTaskSendFtpEntity extends BaseEntity {
	/**
	 * 版本号.
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 报表任务发送信息ID.
	 */
	private String reportTaskSendId;
	/**
	 * ftp同步状态ID.
	 */
	private String ftpSyncStatusId;
	/**
	 * 分发类型ID.
	 */
	private String ftpId;
	/**
	 * 分发时间.
	 */
	private Date ftpSendTime;
	/**
	 * 是否最终版本.
	 */
	private String ftpSendResult;

	@Id
	@Column(name = "REP_TASK_SEND_FTP_ID", unique = true, nullable = false, length = 32)
	public String getReportTaskSendFtpId() {
		return this.getId();
	}

	public void setReportTaskSendFtpId(String reportTaskSendFtpId) {
		this.setId(reportTaskSendFtpId);
	}
	
	@Column(name = "REPORT_TASK_SEND_ID", nullable = false, length = 50)
	public String getReportTaskSendId() {
		return reportTaskSendId;
	}

	public void setReportTaskSendId(String reportTaskSendId) {
		this.reportTaskSendId = reportTaskSendId;
	}
	
	@Column(name = "FTP_SYNC_STATUS_ID", nullable = false, length = 50)
	public String getFtpSyncStatusId() {
		return ftpSyncStatusId;
	}
	
	public void setFtpSyncStatusId(String ftpSyncStatusId) {
		this.ftpSyncStatusId = ftpSyncStatusId;
	}
	
	@Column(name = "FTP_ID", nullable = false, length = 50)
	public String getFtpId() {
		return ftpId;
	}
	
	public void setFtpId(String ftpId) {
		this.ftpId = ftpId;
	}
	
	@Column(name = "FTP_SEND_TIME", nullable = false)
	public Date getFtpSendTime() {
		return ftpSendTime;
	}
	
	public void setFtpSendTime(Date ftpSendTime) {
		this.ftpSendTime = ftpSendTime;
	}
	
	@Column(name = "FTP_SEND_RESULT", nullable = false, length = 50)
	public String getFtpSendResult() {
		return ftpSendResult;
	}
	
	public void setFtpSendResult(String ftpSendResult) {
		this.ftpSendResult = ftpSendResult;
	}
	
}