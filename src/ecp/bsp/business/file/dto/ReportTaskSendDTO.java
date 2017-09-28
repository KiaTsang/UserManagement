package ecp.bsp.business.file.dto;

import java.util.Date;

import org.springframework.stereotype.Component;

import ecp.bsp.system.core.BaseDTO;

@Component
public class ReportTaskSendDTO extends BaseDTO {
	/**
	 * 
	 */
	private String reportTaskId;
	/**
	 * 
	 */
	private String reportTaskName;
	/**
	 * 
	 */
	private String reportTaskSendId;
	/**
	 * 
	 */
	private String repTaskSendFtpId;
	/**
	 * 
	 */
	private String repTaskSendEmailId;
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
	 * .
	 */
	private String isSend;
	/**
	 * 是否最终版本.
	 */
	private String isFinalVersion;
	/**
	 * FTPID.
	 */
	private String ftpId;

	/**
	 * FTP名称.
	 */
	private String ftpName;
	/**
	 * FTP用户名.
	 */
	private String ftpUserName;
	/**
	 * FTP密码.
	 */
	private String ftpPassword;
	/**
	 * FTP端口号.
	 */
	private Integer ftpPort;
	/**
	 * FTP服务器.
	 */
	private String ftpHostname;
	/**
	 * FTP路径.
	 */
	private String ftpPath;
	/**
	 * FTP描述.
	 */
	private String ftpDesc;
	/**
	 * FTP删除类型ID.
	 */
	private String ftpDeleteTypeId;
	/**
	 * FTP删除类型名称.
	 */
	private String ftpDeleteTypeName;
	/**
	 * 邮箱接收人名称.
	 */
	private String emailReceiverId;
	/**
	 * 邮箱接收人名称.
	 */
	private String emailReceiverName;
	/**
	 * 邮箱接收人地址.
	 */
	private String emailReceiverAddress;
	/**
	 * 邮箱接收人描述.
	 */
	private String emailReceiverDesc;
	/**
	 * 邮箱接收人地址.
	 */
	private String emailReceiversAddress;
	/**
	 * 是否加密.
	 */
	private String isEncryption;
	/**
	 * ftp同步状态ID.
	 */
	private String emailSendStatusId;
	/**
	 * 分发时间.
	 */
	private Date emailSendTime;
	/**
	 * 是否最终版本.
	 */
	private String emailSendResult;
	/**
	 * ftp同步状态ID.
	 */
	private String ftpSyncStatusId;
	/**
	 * 分发时间.
	 */
	private Date ftpSendTime;
	/**
	 * 是否最终版本.
	 */
	private String ftpSendResult;
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

	public String getReportTaskSendId() {
		return reportTaskSendId;
	}

	public void setReportTaskSendId(String reportTaskSendId) {
		this.reportTaskSendId = reportTaskSendId;
	}

	public String getReportTaskEncryptionId() {
		return reportTaskEncryptionId;
	}

	public void setReportTaskEncryptionId(String reportTaskEncryptionId) {
		this.reportTaskEncryptionId = reportTaskEncryptionId;
	}

	public String getReportSendTypeId() {
		return reportSendTypeId;
	}

	public void setReportSendTypeId(String reportSendTypeId) {
		this.reportSendTypeId = reportSendTypeId;
	}

	public Date getSendTime() {
		return sendTime;
	}

	public void setSendTime(Date sendTime) {
		this.sendTime = sendTime;
	}

	public String getIsSend() {
		return isSend;
	}

	public void setIsSend(String isSend) {
		this.isSend = isSend;
	}

	public String getIsFinalVersion() {
		return isFinalVersion;
	}

	public void setIsFinalVersion(String isFinalVersion) {
		this.isFinalVersion = isFinalVersion;
	}

	public String getFtpId() {
		return ftpId;
	}

	public void setFtpId(String ftpId) {
		this.ftpId = ftpId;
	}

	public String getFtpName() {
		return ftpName;
	}

	public void setFtpName(String ftpName) {
		this.ftpName = ftpName;
	}

	public String getFtpUserName() {
		return ftpUserName;
	}

	public void setFtpUserName(String ftpUserName) {
		this.ftpUserName = ftpUserName;
	}

	public String getFtpPassword() {
		return ftpPassword;
	}

	public void setFtpPassword(String ftpPassword) {
		this.ftpPassword = ftpPassword;
	}

	public Integer getFtpPort() {
		return ftpPort;
	}

	public void setFtpPort(Integer ftpPort) {
		this.ftpPort = ftpPort;
	}

	public String getFtpHostname() {
		return ftpHostname;
	}

	public void setFtpHostname(String ftpHostname) {
		this.ftpHostname = ftpHostname;
	}

	public String getFtpPath() {
		return ftpPath;
	}

	public void setFtpPath(String ftpPath) {
		this.ftpPath = ftpPath;
	}

	public String getFtpDesc() {
		return ftpDesc;
	}

	public void setFtpDesc(String ftpDesc) {
		this.ftpDesc = ftpDesc;
	}

	public String getFtpDeleteTypeId() {
		return ftpDeleteTypeId;
	}

	public void setFtpDeleteTypeId(String ftpDeleteTypeId) {
		this.ftpDeleteTypeId = ftpDeleteTypeId;
	}

	public String getFtpDeleteTypeName() {
		return ftpDeleteTypeName;
	}

	public void setFtpDeleteTypeName(String ftpDeleteTypeName) {
		this.ftpDeleteTypeName = ftpDeleteTypeName;
	}

	public String getEmailReceiverId() {
		return emailReceiverId;
	}

	public void setEmailReceiverId(String emailReceiverId) {
		this.emailReceiverId = emailReceiverId;
	}

	public String getEmailReceiverName() {
		return emailReceiverName;
	}

	public void setEmailReceiverName(String emailReceiverName) {
		this.emailReceiverName = emailReceiverName;
	}

	public String getEmailReceiverAddress() {
		return emailReceiverAddress;
	}

	public void setEmailReceiverAddress(String emailReceiverAddress) {
		this.emailReceiverAddress = emailReceiverAddress;
	}

	public String getEmailReceiverDesc() {
		return emailReceiverDesc;
	}

	public void setEmailReceiverDesc(String emailReceiverDesc) {
		this.emailReceiverDesc = emailReceiverDesc;
	}

	public String getReportTaskId() {
		return reportTaskId;
	}

	public void setReportTaskId(String reportTaskId) {
		this.reportTaskId = reportTaskId;
	}

	public String getReportTaskName() {
		return reportTaskName;
	}

	public void setReportTaskName(String reportTaskName) {
		this.reportTaskName = reportTaskName;
	}

	public String getRepTaskSendFtpId() {
		return repTaskSendFtpId;
	}

	public void setRepTaskSendFtpId(String repTaskSendFtpId) {
		this.repTaskSendFtpId = repTaskSendFtpId;
	}

	public String getRepTaskSendEmailId() {
		return repTaskSendEmailId;
	}

	public void setRepTaskSendEmailId(String repTaskSendEmailId) {
		this.repTaskSendEmailId = repTaskSendEmailId;
	}

	public String getEmailReceiversAddress() {
		return emailReceiversAddress;
	}

	public void setEmailReceiversAddress(String emailReceiversAddress) {
		this.emailReceiversAddress = emailReceiversAddress;
	}

	public String getIsEncryption() {
		return isEncryption;
	}

	public void setIsEncryption(String isEncryption) {
		this.isEncryption = isEncryption;
	}

	public String getEmailSendStatusId() {
		return emailSendStatusId;
	}

	public void setEmailSendStatusId(String emailSendStatusId) {
		this.emailSendStatusId = emailSendStatusId;
	}

	public Date getEmailSendTime() {
		return emailSendTime;
	}

	public void setEmailSendTime(Date emailSendTime) {
		this.emailSendTime = emailSendTime;
	}

	public String getEmailSendResult() {
		return emailSendResult;
	}

	public void setEmailSendResult(String emailSendResult) {
		this.emailSendResult = emailSendResult;
	}

	public String getFtpSyncStatusId() {
		return ftpSyncStatusId;
	}

	public void setFtpSyncStatusId(String ftpSyncStatusId) {
		this.ftpSyncStatusId = ftpSyncStatusId;
	}

	public Date getFtpSendTime() {
		return ftpSendTime;
	}

	public void setFtpSendTime(Date ftpSendTime) {
		this.ftpSendTime = ftpSendTime;
	}

	public String getFtpSendResult() {
		return ftpSendResult;
	}

	public void setFtpSendResult(String ftpSendResult) {
		this.ftpSendResult = ftpSendResult;
	}

	public String getSendResult() {
		return sendResult;
	}

	public void setSendResult(String sendResult) {
		this.sendResult = sendResult;
	}

	public String getIsSendSucinformemail() {
		return isSendSucinformemail;
	}

	public void setIsSendSucinformemail(String isSendSucinformemail) {
		this.isSendSucinformemail = isSendSucinformemail;
	}

	public Integer getTimeSendSucinformemail() {
		return timeSendSucinformemail;
	}

	public void setTimeSendSucinformemail(Integer timeSendSucinformemail) {
		this.timeSendSucinformemail = timeSendSucinformemail;
	}

	public String getResultSendSucinformemail() {
		return resultSendSucinformemail;
	}

	public void setResultSendSucinformemail(String resultSendSucinformemail) {
		this.resultSendSucinformemail = resultSendSucinformemail;
	}

}
