package ecp.bsp.business.file.dto;

import java.util.Date;

import org.codehaus.jackson.map.annotate.JsonDeserialize;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.springframework.stereotype.Component;

import ecp.bsp.business.file.constant.TaskConst;
import ecp.bsp.system.commons.utils.jackson.deserilizer.JsonDateDeSerializer;
import ecp.bsp.system.commons.utils.jackson.serializer.JsonDateSerializer;
import ecp.bsp.system.core.BaseDTO;
import ecp.bsp.system.framework.query.data.dto.InternationalEntityRegister;
import ecp.bsp.system.framework.query.data.dto.ModelEntityAnnotation;

/**
 * 报表任务实体
 * 
 * @since 2015-06-12 <br>
 * 
 * @author zengqingyue.
 */
@Component
@ModelEntityAnnotation( propertiesFileName = "",
refEntity = InternationalEntityRegister.ReportTaskEntity +
            InternationalEntityRegister.split +
            InternationalEntityRegister.RepTaskActivityTypeEntity +
            InternationalEntityRegister.split +
            InternationalEntityRegister.ProductTypeEntity +
            InternationalEntityRegister.split +
            InternationalEntityRegister.BrandEntity +
            InternationalEntityRegister.split +
            InternationalEntityRegister.OperatorEntity +
            TaskConst.split +
            TaskConst.ReportSendTypeEntity 
            )
public class ReportTaskDTO extends BaseDTO {
	/**
	 * 报表任务ID
	 */
	private String reportTaskId;
	/**
	 * 任务策略信息ID.
	 */
	private String taskStrategyId;
	/**
	 * 报表任务名称.
	 */
	private String reportTaskName;
	/**
	 * 创建人ID.
	 */
	private String paaEmployeeId;
	/**
	 * 创建人名称.
	 */
	private String paaUsername;
	/**
	 * 开始时间.
	 */
	@JsonSerialize(using=JsonDateSerializer.class)
	@JsonDeserialize(using=JsonDateDeSerializer.class)
	private Date startTime;
	/**
	 * 结束时间.
	 */
	@JsonSerialize(using=JsonDateSerializer.class)
	@JsonDeserialize(using=JsonDateDeSerializer.class)
	private Date endTime;
	/**
	 * 报表任务活动类型ID.
	 */
	private String repTaskActivityTypeId;
	/**
	 * 报表任务活动类型名称.
	 */
	private String repTaskActivityTypeName;
	/**
	 * 上传类型ID.
	 */
	private String uploadOperatorTypeId;
	/**
	 * 上传类型.
	 */
	private String uploadOperatorTypeName;
	/**
	 * 上传时间.
	 */
	@JsonSerialize(using=JsonDateSerializer.class)
	@JsonDeserialize(using=JsonDateDeSerializer.class)
	private Date uploadTime;
	/**
	 * 上传人ID.
	 */
	private String uploadEmployeeId;
	/**
	 * 上传人名称.
	 */
	private String uploadUsername;
	/**
	 * 报表任务信息ID.
	 */
	private String reportTaskUploadId;
	/**
	 * 上传类型ID.
	 */
	private String ftpId;
	/**
	 * ftp同步状态ID.
	 */
	private String ftpSyncStatusId;
	/**
	 * ftp同步状态.
	 */
	private String ftpSyncStatusName;
	/**
	 * 是否匹配规则.
	 */
	private String isMatchRule;
	/**
	 * FTP上传时间.
	 */
	@JsonSerialize(using=JsonDateSerializer.class)
	@JsonDeserialize(using=JsonDateDeSerializer.class)
	private Date ftpUploadTime;
	/**
	 * 上传结果.
	 */
	private String ftpUploadResult;
	/**
	 * 产品类型ID.
	 */
	private String productTypeId;
	/**
	 * 运营商ID.
	 */
	private String operatorId;
	/**
	 * 运营商.
	 */
	private String operatorName;
	/**
	 * 品牌ID.
	 */
	private String brandIds;
	/**
	 * 品牌.
	 */
	private String brandName;
	/**
	 * 产品类型.
	 */
	private String productTypeName;
	/**
	 * 任务策略名称.
	 */
	private String taskStrategyName;
	/**
	 * 审核描述.
	 */
	private String reviewDesc;
	/**
	 * 审核时间.
	 */
	private String reviewTime;
	/**
	 * 操作类型名称.
	 */
	private String operatorTypeName;
	/**
	 * 算法名称.
	 */
	private String encryptionAlgorithmName;
	/**
	 * 算法描述.
	 */
	private String encryptionAlgorithmDesc;
	/**
	 * 附件名称.
	 */
	private String attachmentName;
	/**
	 * 附件大小.
	 */
	private String attachmentSize;
	/**
	 * 创建日期.
	 */
	private String attachmentCreateTime;
	/**
	 * 审核人.
	 */
	private String reviewUserName;
	/**
	 * 加密人.
	 */
	private String encryptionUserName;
	/**
	 * 加密时间.
	 */
	@JsonSerialize(using=JsonDateSerializer.class)
	@JsonDeserialize(using=JsonDateDeSerializer.class)
	private Date encryptionTime;
	/**
	 * 加密描述.
	 */
	private String encryptionDesc;
	/**
	 * 活动用户名.
	 */
	private String activityUsername;
	/**
	 * 活动类型名称.
	 */
	private String taskActivityTypeName;
	/**
	 * 活动时间.
	 */
	@JsonSerialize(using=JsonDateSerializer.class)
	@JsonDeserialize(using=JsonDateDeSerializer.class)
	private Date activityTime;
	/**
	 * 活动描述.
	 */
	private String activityDesc;
	/**
	 * 报表来源FtpID.
	 */
	private String reportSourceFtpId;
	/**
	 * 任务批次编号.
	 */
	private String taskBatchCode;
	/**
	 * 报表分发类型.
	 */
	private String reportSendTypeName;
	/**
	 * 是否加密.
	 */
	private String isEncryption;
	/**
	 * 新增报表的数量.
	 */
	private Integer newReportNum;
	/**
	 * 已审核报表的数量.
	 */
	private Integer reviewReportNum;
	/**
	 * 已加密报表的数量.
	 */
	private Integer encryptionReportNum;
	/**
	 * 已外发报表的数量.
	 */
	private Integer sendReportNum;
	/**
	 * 邮箱接收人.
	 */
	private String emailReceiverName;
    /**
	 * 报表来源FtpName.
	 */
	private String reportSourceFtpName;
	/**
	 * 报表来源FtpPath.
	 */
	private String reportSourceFtpPath;
	/**
	 * 报表目标FtpName.
	 */
	private String reportTargetFtpName;
	/**
	 * 报表目标FtpPath.
	 */
	private String reportTargetFtpPath;
	
	public String getTaskStrategyId() {
		return taskStrategyId;
	}
	public void setTaskStrategyId(String taskStrategyId) {
		this.taskStrategyId = taskStrategyId;
	}
	public String getReportTaskName() {
		return reportTaskName;
	}
	public void setReportTaskName(String reportTaskName) {
		this.reportTaskName = reportTaskName;
	}
	public String getPaaEmployeeId() {
		return paaEmployeeId;
	}
	public void setPaaEmployeeId(String paaEmployeeId) {
		this.paaEmployeeId = paaEmployeeId;
	}
	public String getPaaUsername() {
		return paaUsername;
	}
	public void setPaaUsername(String paaUsername) {
		this.paaUsername = paaUsername;
	}
	public Date getStartTime() {
		return startTime;
	}
	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}
	public Date getEndTime() {
		return endTime;
	}
	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}
	public String getReportTaskId() {
		return reportTaskId;
	}
	public void setReportTaskId(String reportTaskId) {
		this.reportTaskId = reportTaskId;
	}
	public String getUploadOperatorTypeId() {
		return uploadOperatorTypeId;
	}
	public void setUploadOperatorTypeId(String uploadOperatorTypeId) {
		this.uploadOperatorTypeId = uploadOperatorTypeId;
	}
	public String getUploadOperatorTypeName() {
		return uploadOperatorTypeName;
	}
	public void setUploadOperatorTypeName(String uploadOperatorTypeName) {
		this.uploadOperatorTypeName = uploadOperatorTypeName;
	}
	public Date getUploadTime() {
		return uploadTime;
	}
	public void setUploadTime(Date uploadTime) {
		this.uploadTime = uploadTime;
	}
	public String getUploadEmployeeId() {
		return uploadEmployeeId;
	}
	public void setUploadEmployeeId(String uploadEmployeeId) {
		this.uploadEmployeeId = uploadEmployeeId;
	}
	public String getUploadUsername() {
		return uploadUsername;
	}
	public void setUploadUsername(String uploadUsername) {
		this.uploadUsername = uploadUsername;
	}
	public String getReportTaskUploadId() {
		return reportTaskUploadId;
	}
	public void setReportTaskUploadId(String reportTaskUploadId) {
		this.reportTaskUploadId = reportTaskUploadId;
	}
	public String getFtpId() {
		return ftpId;
	}
	public void setFtpId(String ftpId) {
		this.ftpId = ftpId;
	}
	public String getFtpSyncStatusId() {
		return ftpSyncStatusId;
	}
	public void setFtpSyncStatusId(String ftpSyncStatusId) {
		this.ftpSyncStatusId = ftpSyncStatusId;
	}
	public String getFtpSyncStatusName() {
		return ftpSyncStatusName;
	}
	public void setFtpSyncStatusName(String ftpSyncStatusName) {
		this.ftpSyncStatusName = ftpSyncStatusName;
	}
	public Date getFtpUploadTime() {
		return ftpUploadTime;
	}
	public void setFtpUploadTime(Date ftpUploadTime) {
		this.ftpUploadTime = ftpUploadTime;
	}
	public String getFtpUploadResult() {
		return ftpUploadResult;
	}
	public void setFtpUploadResult(String ftpUploadResult) {
		this.ftpUploadResult = ftpUploadResult;
	}
	public String getIsMatchRule() {
		return isMatchRule;
	}
	public void setIsMatchRule(String isMatchRule) {
		this.isMatchRule = isMatchRule;
	}
	public String getProductTypeId() {
		return productTypeId;
	}
	public void setProductTypeId(String productTypeId) {
		this.productTypeId = productTypeId;
	}
	public String getTaskStrategyName() {
		return taskStrategyName;
	}
	public void setTaskStrategyName(String taskStrategyName) {
		this.taskStrategyName = taskStrategyName;
	}
	public String getProductTypeName() {
		return productTypeName;
	}
	public void setProductTypeName(String productTypeName) {
		this.productTypeName = productTypeName;
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
	public String getReviewDesc() {
		return reviewDesc;
	}
	public void setReviewDesc(String reviewDesc) {
		this.reviewDesc = reviewDesc;
	}
	public String getReviewTime() {
		return reviewTime;
	}
	public void setReviewTime(String reviewTime) {
		this.reviewTime = reviewTime;
	}
	public String getOperatorTypeName() {
		return operatorTypeName;
	}
	public void setOperatorTypeName(String operatorTypeName) {
		this.operatorTypeName = operatorTypeName;
	}
	public String getEncryptionAlgorithmName() {
		return encryptionAlgorithmName;
	}
	public void setEncryptionAlgorithmName(String encryptionAlgorithmName) {
		this.encryptionAlgorithmName = encryptionAlgorithmName;
	}
	public String getEncryptionAlgorithmDesc() {
		return encryptionAlgorithmDesc;
	}
	public void setEncryptionAlgorithmDesc(String encryptionAlgorithmDesc) {
		this.encryptionAlgorithmDesc = encryptionAlgorithmDesc;
	}
	public String getAttachmentName() {
		return attachmentName;
	}
	public void setAttachmentName(String attachmentName) {
		this.attachmentName = attachmentName;
	}
	public String getAttachmentSize() {
		return attachmentSize;
	}
	public void setAttachmentSize(String attachmentSize) {
		this.attachmentSize = attachmentSize;
	}
	public String getAttachmentCreateTime() {
		return attachmentCreateTime;
	}
	public void setAttachmentCreateTime(String attachmentCreateTime) {
		this.attachmentCreateTime = attachmentCreateTime;
	}
	public String getReviewUserName() {
		return reviewUserName;
	}
	public void setReviewUserName(String reviewUserName) {
		this.reviewUserName = reviewUserName;
	}
	public String getEncryptionUserName() {
		return encryptionUserName;
	}
	public void setEncryptionUserName(String encryptionUserName) {
		this.encryptionUserName = encryptionUserName;
	}
	public Date getEncryptionTime() {
		return encryptionTime;
	}
	public void setEncryptionTime(Date encryptionTime) {
		this.encryptionTime = encryptionTime;
	}
	public String getEncryptionDesc() {
		return encryptionDesc;
	}
	public void setEncryptionDesc(String encryptionDesc) {
		this.encryptionDesc = encryptionDesc;
	}
	public String getOperatorId() {
		return operatorId;
	}
	public void setOperatorId(String operatorId) {
		this.operatorId = operatorId;
	}
	public String getOperatorName() {
		return operatorName;
	}
	public void setOperatorName(String operatorName) {
		this.operatorName = operatorName;
	}
	public String getBrandIds() {
		return brandIds;
	}
	public void setBrandIds(String brandIds) {
		this.brandIds = brandIds;
	}
	public String getBrandName() {
		return brandName;
	}
	public void setBrandName(String brandName) {
		this.brandName = brandName;
	}
	public String getActivityUsername() {
		return activityUsername;
	}
	public void setActivityUsername(String activityUsername) {
		this.activityUsername = activityUsername;
	}
	public String getTaskActivityTypeName() {
		return taskActivityTypeName;
	}
	public void setTaskActivityTypeName(String taskActivityTypeName) {
		this.taskActivityTypeName = taskActivityTypeName;
	}
	public Date getActivityTime() {
		return activityTime;
	}
	public void setActivityTime(Date activityTime) {
		this.activityTime = activityTime;
	}
	public String getActivityDesc() {
		return activityDesc;
	}
	public void setActivityDesc(String activityDesc) {
		this.activityDesc = activityDesc;
	}
	public String getReportSourceFtpId() {
		return reportSourceFtpId;
	}
	public void setReportSourceFtpId(String reportSourceFtpId) {
		this.reportSourceFtpId = reportSourceFtpId;
	}
	public String getTaskBatchCode() {
		return taskBatchCode;
	}
	public void setTaskBatchCode(String taskBatchCode) {
		this.taskBatchCode = taskBatchCode;
	}
	public String getReportSendTypeName() {
		return reportSendTypeName;
	}
	public void setReportSendTypeName(String reportSendTypeName) {
		this.reportSendTypeName = reportSendTypeName;
	}
	public String getIsEncryption() {
		return isEncryption;
	}
	public void setIsEncryption(String isEncryption) {
		this.isEncryption = isEncryption;
	}
	public Integer getNewReportNum() {
		return newReportNum;
	}
	public void setNewReportNum(Integer newReportNum) {
		this.newReportNum = newReportNum;
	}
	public Integer getReviewReportNum() {
		return reviewReportNum;
	}
	public void setReviewReportNum(Integer reviewReportNum) {
		this.reviewReportNum = reviewReportNum;
	}
	public Integer getEncryptionReportNum() {
		return encryptionReportNum;
	}
	public void setEncryptionReportNum(Integer encryptionReportNum) {
		this.encryptionReportNum = encryptionReportNum;
	}
	public Integer getSendReportNum() {
		return sendReportNum;
	}
	public void setSendReportNum(Integer sendReportNum) {
		this.sendReportNum = sendReportNum;
	}
	public String getEmailReceiverName() {
		return emailReceiverName;
	}
	public void setEmailReceiverName(String emailReceiverName) {
		this.emailReceiverName = emailReceiverName;
	}
	public String getReportSourceFtpName() {
		return reportSourceFtpName;
	}
	public void setReportSourceFtpName(String reportSourceFtpName) {
		this.reportSourceFtpName = reportSourceFtpName;
	}
	public String getReportSourceFtpPath() {
		return reportSourceFtpPath;
	}
	public void setReportSourceFtpPath(String reportSourceFtpPath) {
		this.reportSourceFtpPath = reportSourceFtpPath;
	}
	public String getReportTargetFtpName() {
		return reportTargetFtpName;
	}
	public void setReportTargetFtpName(String reportTargetFtpName) {
		this.reportTargetFtpName = reportTargetFtpName;
	}
	public String getReportTargetFtpPath() {
		return reportTargetFtpPath;
	}
	public void setReportTargetFtpPath(String reportTargetFtpPath) {
		this.reportTargetFtpPath = reportTargetFtpPath;
	}
	
    
}