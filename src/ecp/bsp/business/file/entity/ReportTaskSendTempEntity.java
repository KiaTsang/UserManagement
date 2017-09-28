package ecp.bsp.business.file.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import ecp.bsp.system.core.BaseEntity;

/**
 * 报表任务发送临时表信息实体
 * 
 * @since 2015-07-31
 * 
 * @author zengqingyue.
 */
@Entity
@Table(name = "PMS_REPORT_TASK_SEND_TEMP", schema = "PMSWEB_DBA")
public class ReportTaskSendTempEntity extends BaseEntity {
	/**
	 * 版本号.
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 报表任务加密信息ID.
	 */
	private String reportTaskId;
	/**
	 * 报表任务加密信息ID.
	 */
	private String reportTaskName;
	/**
	 * 分发类型ID.
	 */
	private String reportTaskSendId;
	/**
	 * 是否加密.
	 */
	private String isEncryption;
	/**
	 * 运营商名称.
	 */
	private String operatorName;

	@Id
	@Column(name = "REPORT_TASK_SEND_TEMP_ID", unique = true, nullable = false, length = 32)
	public String getReportTaskSendTempId() {
		return this.getId();
	}

	public void setReportTaskSendTempId(String reportTaskSendTempId) {
		this.setId(reportTaskSendTempId);
	}
	
	@Column(name = "REPORT_TASK_ID", nullable = false, length = 50)
	public String getReportTaskId() {
		return reportTaskId;
	}

	public void setReportTaskId(String reportTaskId) {
		this.reportTaskId = reportTaskId;
	}
	
	@Column(name = "REPORT_TASK_NAME", nullable = false, length = 50)
	public String getReportTaskName() {
		return reportTaskName;
	}

	public void setReportTaskName(String reportTaskName) {
		this.reportTaskName = reportTaskName;
	}

	@Column(name = "REPORT_TASK_SEND_ID", nullable = false, length = 50)
	public String getReportTaskSendId() {
		return reportTaskSendId;
	}

	public void setReportTaskSendId(String reportTaskSendId) {
		this.reportTaskSendId = reportTaskSendId;
	}

	@Column(name = "IS_ENCRYPTION", nullable = false, length = 50)
	public String getIsEncryption() {
		return isEncryption;
	}

	public void setIsEncryption(String isEncryption) {
		this.isEncryption = isEncryption;
	}

	@Column(name = "OPERATOR_NAME", nullable = false, length = 50)
	public String getOperatorName() {
		return operatorName;
	}

	public void setOperatorName(String operatorName) {
		this.operatorName = operatorName;
	}
	
}