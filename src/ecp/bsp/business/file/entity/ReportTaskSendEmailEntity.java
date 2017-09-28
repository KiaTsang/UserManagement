package ecp.bsp.business.file.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import ecp.bsp.system.core.BaseEntity;

/**
 * 报表任务发送EMAIL信息实体
 * 
 * @since 2015-06-12 <br>
 * 
 * @author zengqingyue.
 */
@Entity
@Table(name = "PMS_REP_TASK_SEND_EMAIL", schema = "PMSWEB_DBA")
public class ReportTaskSendEmailEntity extends BaseEntity {
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
	private String emailSendStatusId;
	/**
	 * 邮箱接收人ID.
	 */
	private String emailReceiverId;
	/**
	 * 分发时间.
	 */
	private Date emailSendTime;
	/**
	 * 是否最终版本.
	 */
	private String emailSendResult;
	/**
	 * 邮件接收人类型.
	 */
	private String emailReceiverType;

	@Id
	@Column(name = "REP_TASK_SEND_EMAIL_ID", unique = true, nullable = false, length = 32)
	public String getReportTaskSendEmailId() {
		return this.getId();
	}

	public void setReportTaskSendEmailId(String reportTaskSendEmailId) {
		this.setId(reportTaskSendEmailId);
	}
	
	@Column(name = "REPORT_TASK_SEND_ID", nullable = false, length = 50)
	public String getReportTaskSendId() {
		return reportTaskSendId;
	}

	public void setReportTaskSendId(String reportTaskSendId) {
		this.reportTaskSendId = reportTaskSendId;
	}

	@Column(name = "EMAIL_SEND_STATUS_ID", nullable = false, length = 50)
	public String getEmailSendStatusId() {
		return emailSendStatusId;
	}
	
	public void setEmailSendStatusId(String emailSendStatusId) {
		this.emailSendStatusId = emailSendStatusId;
	}
	
	@Column(name = "EMAIL_RECEIVER_ID", nullable = false, length = 50)
	public String getEmailReceiverId() {
		return emailReceiverId;
	}
	
	public void setEmailReceiverId(String emailReceiverId) {
		this.emailReceiverId = emailReceiverId;
	}
	
	@Column(name = "EMAIL_SEND_TIME", nullable = false, length = 50)
	public Date getEmailSendTime() {
		return emailSendTime;
	}
	
	public void setEmailSendTime(Date emailSendTime) {
		this.emailSendTime = emailSendTime;
	}
	
	@Column(name = "EMAIL_SEND_RESULT", nullable = false, length = 50)
	public String getEmailSendResult() {
		return emailSendResult;
	}
	
	public void setEmailSendResult(String emailSendResult) {
		this.emailSendResult = emailSendResult;
	}
	@Column(name = "EMAIL_RECEIVER_TYPE", nullable = false, length = 32)
	public String getEmailReceiverType() {
		return emailReceiverType;
	}

	public void setEmailReceiverType(String emailReceiverType) {
		this.emailReceiverType = emailReceiverType;
	}
	
}