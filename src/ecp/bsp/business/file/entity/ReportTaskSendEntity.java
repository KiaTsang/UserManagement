package ecp.bsp.business.file.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import ecp.bsp.system.core.BaseEntity;

/**
 * 报表任务发送信息实体
 * 
 * @since 2015-06-12 <br>
 * 
 * @author zengqingyue.
 */
@Entity
@Table(name = "PMS_REPORT_TASK_SEND", schema = "PMSWEB_DBA")
public class ReportTaskSendEntity extends BaseEntity {
	/**
	 * 版本号.
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 报表任务加密信息ID.
	 */
	private String reportTaskEncryptionId;
	/**
	 * 分发类型ID.
	 */
	private String reportSendTypeId;
	/**
	 * 分发时间.
	 */
	private Date sendTime;
	/**
	 * 分发结果.
	 */
	private String sendResult;
	/**
	 * 是否最终版本.
	 */
	private String isSend;
	/**
	 * 是否最终版本.
	 */
	private String isFinalVersion;
	/**
	 * 是否发送文件外发通知邮件
	 */
	private String isSendSucinformemail;
	/**
	 * 外发通知邮件的次数
	 */
	private Integer timeSendSucinformemail;
	/**
	 * 是否成功发送通知邮件
	 */
	private String  resultSendSucinformemail;
	@Id
	@Column(name = "REPORT_TASK_SEND_ID", unique = true, nullable = false, length = 32)
	public String getReportTaskSendId() {
		return this.getId();
	}

	public void setReportTaskSendId(String reportTaskSendId) {
		this.setId(reportTaskSendId);
	}
	
	@Column(name = "REPORT_TASK_ENCRYPTION_ID", nullable = false, length = 50)
	public String getReportTaskEncryptionId() {
		return reportTaskEncryptionId;
	}

	public void setReportTaskEncryptionId(String reportTaskEncryptionId) {
		this.reportTaskEncryptionId = reportTaskEncryptionId;
	}
	
	@Column(name = "IS_FINAL_VERSION", nullable = false, length = 50)
	public String getIsFinalVersion() {
		return isFinalVersion;
	}
	
	public void setIsFinalVersion(String isFinalVersion) {
		this.isFinalVersion = isFinalVersion;
	}
	
	@Column(name = "REPORT_SEND_TYPE_ID", nullable = false, length = 50)
	public String getReportSendTypeId() {
		return reportSendTypeId;
	}
	
	public void setReportSendTypeId(String reportSendTypeId) {
		this.reportSendTypeId = reportSendTypeId;
	}
	
	@Column(name = "SEND_TIME", nullable = false)
	public Date getSendTime() {
		return sendTime;
	}
	
	public void setSendTime(Date sendTime) {
		this.sendTime = sendTime;
	}

	@Column(name = "IS_SEND", nullable = false, length = 50)
	public String getIsSend() {
		return isSend;
	}

	public void setIsSend(String isSend) {
		this.isSend = isSend;
	}

	@Column(name = "SEND_RESULT", nullable = false, length = 50)
	public String getSendResult() {
		return sendResult;
	}

	public void setSendResult(String sendResult) {
		this.sendResult = sendResult;
	}
	@Column(name = "IS_SEND_SUCINFORMEMAIL",  length = 32)
	public String getIsSendSucinformemail() {
		return isSendSucinformemail;
	}

	public void setIsSendSucinformemail(String isSendSucinformemail) {
		this.isSendSucinformemail = isSendSucinformemail;
	}
	@Column(name = "TIME_SEND_SUCINFORMEMAIL")
	public Integer getTimeSendSucinformemail() {
		return timeSendSucinformemail;
	}

	public void setTimeSendSucinformemail(Integer timeSendSucinformemail) {
		this.timeSendSucinformemail = timeSendSucinformemail;
	}
	@Column(name = "RESULT_SEND_SUCINFORMEMAIL",  length = 32)
	public String getResultSendSucinformemail() {
		return resultSendSucinformemail;
	}

	public void setResultSendSucinformemail(String resultSendSucinformemail) {
		this.resultSendSucinformemail = resultSendSucinformemail;
	}
	
}