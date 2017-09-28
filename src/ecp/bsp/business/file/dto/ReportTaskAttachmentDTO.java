package ecp.bsp.business.file.dto;


import java.util.Date;

import org.springframework.stereotype.Component;

import ecp.bsp.system.core.BaseDTO;

/**
 * 报表任务附件实体
 * 
 * @since 2015-06-12 <br>
 * 
 * @author zengqingyue.
 */
@Component
public class ReportTaskAttachmentDTO extends BaseDTO {
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
	 * 加密ID.
	 */
	private String encryptionStatusName;
	/**
	 * 报表任务活动状态ID.
	 */
	private String repTaskActivityTypeId;
	/**
	 * 报表任务活动状态ID.
	 */
	private String repTaskActivityTypeName;
	
	/**
	 * 附件名称.
	 */
	private String attachmentName;
	/**
	 * 附件名称.
	 */
	private String attachmentRename;
	/**
	 * 附件路径.
	 */
	private String attachmentPath;
	/**
	 * 附件临时路径.
	 */
	private String attachmentTempPath;
	/**
	 * 前台创建时的id,用于区别不同的附件
	 */
	private String attachmentCreateId;
	/**
	 * 附件状态
	 */
	private String attachmentStatusId;
	/**
	 * 附件状态
	 */
	private String attachmentStatusName;
	/**
	 * 附件创建时间
	 */
	private Date attachmentCreateTime;
	/**
	 * 附件类型
	 */
	private String attachmentType;
	/**
	 * 附件大小
	 */
	private Integer attachmentSize;
	/**
	 * 附件上传人
	 */
	private String paaEmployeeId;
	public String getReportTaskId() {
		return reportTaskId;
	}
	public void setReportTaskId(String reportTaskId) {
		this.reportTaskId = reportTaskId;
	}
	public String getAttachmentId() {
		return attachmentId;
	}
	public void setAttachmentId(String attachmentId) {
		this.attachmentId = attachmentId;
	}
	public String getEncryptionStatusId() {
		return encryptionStatusId;
	}
	public void setEncryptionStatusId(String encryptionStatusId) {
		this.encryptionStatusId = encryptionStatusId;
	}
	public String getEncryptionStatusName() {
		return encryptionStatusName;
	}
	public void setEncryptionStatusName(String encryptionStatusName) {
		this.encryptionStatusName = encryptionStatusName;
	}
	public String getRepTaskActivityTypeId() {
		return repTaskActivityTypeId;
	}
	public void setRepTaskActivityTypeId(String repTaskActivityTypeId) {
		this.repTaskActivityTypeId = repTaskActivityTypeId;
	}
	public String getRepTaskActivityTypeName() {
		return repTaskActivityTypeName;
	}
	public void setRepTaskActivityTypeName(String repTaskActivityTypeName) {
		this.repTaskActivityTypeName = repTaskActivityTypeName;
	}
	public String getAttachmentName() {
		return attachmentName;
	}
	public void setAttachmentName(String attachmentName) {
		this.attachmentName = attachmentName;
	}
	public String getAttachmentRename() {
		return attachmentRename;
	}
	public void setAttachmentRename(String attachmentRename) {
		this.attachmentRename = attachmentRename;
	}
	public String getAttachmentPath() {
		return attachmentPath;
	}
	public void setAttachmentPath(String attachmentPath) {
		this.attachmentPath = attachmentPath;
	}
	public String getAttachmentTempPath() {
		return attachmentTempPath;
	}
	public void setAttachmentTempPath(String attachmentTempPath) {
		this.attachmentTempPath = attachmentTempPath;
	}
	public String getAttachmentCreateId() {
		return attachmentCreateId;
	}
	public void setAttachmentCreateId(String attachmentCreateId) {
		this.attachmentCreateId = attachmentCreateId;
	}
	public String getAttachmentStatusId() {
		return attachmentStatusId;
	}
	public void setAttachmentStatusId(String attachmentStatusId) {
		this.attachmentStatusId = attachmentStatusId;
	}
	public String getAttachmentStatusName() {
		return attachmentStatusName;
	}
	public void setAttachmentStatusName(String attachmentStatusName) {
		this.attachmentStatusName = attachmentStatusName;
	}
	public Date getAttachmentCreateTime() {
		return attachmentCreateTime;
	}
	public void setAttachmentCreateTime(Date attachmentCreateTime) {
		this.attachmentCreateTime = attachmentCreateTime;
	}
	public String getAttachmentType() {
		return attachmentType;
	}
	public void setAttachmentType(String attachmentType) {
		this.attachmentType = attachmentType;
	}
	public Integer getAttachmentSize() {
		return attachmentSize;
	}
	public void setAttachmentSize(Integer attachmentSize) {
		this.attachmentSize = attachmentSize;
	}
	public String getPaaEmployeeId() {
		return paaEmployeeId;
	}
	public void setPaaEmployeeId(String paaEmployeeId) {
		this.paaEmployeeId = paaEmployeeId;
	}
	
	
	
}