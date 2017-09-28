package ecp.bsp.business.file.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import ecp.bsp.system.core.BaseEntity;

/**
 * 报表任务附件实体
 * 
 * @since 2015-06-12 <br>
 * 
 * @author zengqingyue.
 */
@Entity
@Table(name = "PMS_REPORT_TASK_ATTACHMENT", schema = "PMSWEB_DBA")
public class ReportTaskAttachmentEntity extends BaseEntity {
	/**
	 * 版本号.
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 报表任务ID.
	 */
	private String reportTaskId;
	/**
	 * 附件ID.
	 */
	private String attachmentId;
	/**
	 * 加密ID.
	 */
	private String encryptionStatusId;
	/**
	 * 报表任务活动状态ID.
	 */
	private String repTaskActivityTypeId;
	
	@Id
	@Column(name = "REPORT_TASK_ATTACHMENT_ID", unique = true, nullable = false, length = 32)
	public String getReportTaskAttachmentId() {
		return this.getId();
	}

	public void setReportTaskAttachmentId(String reportTaskAttachmentId) {
		this.setId(reportTaskAttachmentId);
	}
	
	@Column(name = "REPORT_TASK_ID", nullable = false, length = 50)
	public String getReportTaskId() {
		return reportTaskId;
	}

	public void setReportTaskId(String reportTaskId) {
		this.reportTaskId = reportTaskId;
	}

	@Column(name = "ATTACHMENT_ID", nullable = false, length = 50)
	public String getAttachmentId() {
		return attachmentId;
	}
	
	public void setAttachmentId(String attachmentId) {
		this.attachmentId = attachmentId;
	}
	
	@Column(name = "ENCRYPTION_STATUS_ID", nullable = false, length = 50)
	public String getEncryptionStatusId() {
		return encryptionStatusId;
	}

	public void setEncryptionStatusId(String encryptionStatusId) {
		this.encryptionStatusId = encryptionStatusId;
	}

	@Column(name = "REP_TASK_ACTIVITY_TYPE_ID", nullable = false, length = 50)
	public String getRepTaskActivityTypeId() {
		return repTaskActivityTypeId;
	}

	public void setRepTaskActivityTypeId(String repTaskActivityTypeId) {
		this.repTaskActivityTypeId = repTaskActivityTypeId;
	}

}