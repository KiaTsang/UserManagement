package ecp.bsp.business.file.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Component;
import org.codehaus.jackson.map.annotate.JsonDeserialize;
import org.codehaus.jackson.map.annotate.JsonSerialize;

import ecp.bsp.system.commons.utils.jackson.deserilizer.JsonDateDeSerializer;
import ecp.bsp.system.commons.utils.jackson.serializer.JsonDateSerializer;
import ecp.bsp.system.core.BaseDTO;
/**
 * 任务策略dto
 * 
 * @since 2015-06-25
 * 
 * @author zengqingyue.
 */
@Component
public class TaskStrategyDTO extends BaseDTO implements Serializable{
	/**
	 * 序列化
	 */
	private static final long serialVersionUID = 1L;
    private String id;
	
	private String text;
	/**
	 * 报表规则列表
	 */
	private List<ReportRuleDTO> reportRuleList;
	/**
	 * 任务报表规则ID.
	 */
	private String taskReportRuleId;
	/**
	 * 邮箱接收人Ids.
	 */
	private String emailReceiverIds;
	/**
	 * 邮箱抄送人Ids.
	 */
	private String emailCcIds;
	/**
	 * 报表外发成功之后通知邮件接收人Ids.
	 */
	private String 	 sendSucInformReceiverIds;
	/**
	 * 报表外发成功之后通知邮箱抄送人Ids.
	 */
	private String 	 sendSucInformCcIds;
	/**
	 * 邮箱接收人.
	 */
	private String emailReceiverName;
	/**
	 * 客户Ids.
	 */
	private String customerIds;
	/**
	 * 客户.
	 */
	private String customerName;
	/**
	 * 任务评审人Ids.
	 */
	private String taskReviewerIds;
	/**
	 * 任务评审人
	 */
	private String taskReviewerName;
	/**
	 * 调度周期类型ID.
	 */
	private String quartzPeriodTypeId;
	/**
	 * 调度月
	 */
	private Integer taskQuartzMonth;
	/**
	 * 调度周
	 */
	private Integer taskQuartzWeek;
	/**
	 * 调度日
	 */
	private Integer taskQuartzDay;
	/**
	 * 调度时间
	 */
	private String taskQuartzTime;
	/**
	 * 任务策略名称.
	 */
	private String taskStrategyName;
	/**
	 * 策略信息ID.
	 */
	private String strategyInfoId;
	/**
	 * 使用状态ID
	 * @return
	 */
	private String usageStatusId;
	/**
	 * 使用状态名称
	 * @return
	 */
	private String usageStatusName;
	/**
	 * 任务策略信息ID.
	 */
	private String taskStrategyId;
	/**
	 * 任务批次编号.
	 */
	private String taskBatchCode;
	/**
	 * 产品类型ID.
	 */
	private String productTypeId;
	/**
	 * 产品类型.
	 */
	private String productTypeName;
	/**
	 * 运营商ID.
	 */
	private String operatorId;
	/**
	 * 运营商ID.
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
	 * 报表分发类型ID.
	 */
	private String reportSendTypeId;
	/**
	 * 报表分发类型.
	 */
	private String reportSendTypeName;
	/**
	 * 上传类型ID.
	 */
	private String uploadOperatorTypeId;
	/**
	 * 上传类型.
	 */
	private String uploadOperatorTypeName;
	/**
	 * 加密类型ID.
	 */
	private String encryptionOperatorTypeId;
	/**
	 * 加密类型.
	 */
	private String encryptionOperatorTypeName;
	/**
	 * 加密算法ID.
	 */
	private String encryptionAlgorithmId;
	/**
	 * 加密算法.
	 */
	private String encryptionAlgorithmName;
	/**
	 * 报表来源FtpID.
	 */
	private String reportSourceFtpId;
	/**
	 * 报表来源FtpName.
	 */
	private String reportSourceFtpName;
	/**
	 * 报表来源FtpPath.
	 */
	private String reportSourceFtpPath;
	/**
	 * 报表目标FtpID.
	 */
	private String reportTargetFtpId;
	/**
	 * 报表目标FtpName.
	 */
	private String reportTargetFtpName;
	/**
	 * 报表目标FtpPath.
	 */
	private String reportTargetFtpPath;
	/**
	 * 创建人ID.
	 */
	private String paaEmployeeId;
	/**
	 * 创建人名称.
	 */
	private String paaUsername;
	/**
	 * 创建时间.
	 */
	@JsonSerialize(using=JsonDateSerializer.class)
	@JsonDeserialize(using=JsonDateDeSerializer.class)
	private Date createTime;
	/**
	 * 任务策略描述.
	 */
	private String taskStrategyDesc;
	/**
	 * 是否加密.
	 */
	private String isEncryption;
	/**
	 * 是否匹配规则.
	 */
	private String isMatchRule;
	/**
	 * 外发成功是否发送邮件通知.
	 */
	private String isSendSucMailInform;
	/**
	 * 如果为邮件外发则匹配的邮件模板.
	 */
	private String mailModeId;
	/**
	 * 报表发送成功发送邮件通知的邮件模板.sendSucinformMailmodelId
	 */
	private String sendSucinformMailmodelId;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public String getTaskStrategyName() {
		return taskStrategyName;
	}
	public void setTaskStrategyName(String taskStrategyName) {
		this.taskStrategyName = taskStrategyName;
	}
	public String getStrategyInfoId() {
		return strategyInfoId;
	}
	public void setStrategyInfoId(String strategyInfoId) {
		this.strategyInfoId = strategyInfoId;
	}
	public String getTaskBatchCode() {
		return taskBatchCode;
	}
	public void setTaskBatchCode(String taskBatchCode) {
		this.taskBatchCode = taskBatchCode;
	}
	public String getProductTypeId() {
		return productTypeId;
	}
	public void setProductTypeId(String productTypeId) {
		this.productTypeId = productTypeId;
	}
	public String getProductTypeName() {
		return productTypeName;
	}
	public void setProductTypeName(String productTypeName) {
		this.productTypeName = productTypeName;
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
	public String getReportSendTypeId() {
		return reportSendTypeId;
	}
	public void setReportSendTypeId(String reportSendTypeId) {
		this.reportSendTypeId = reportSendTypeId;
	}
	public String getReportSendTypeName() {
		return reportSendTypeName;
	}
	public void setReportSendTypeName(String reportSendTypeName) {
		this.reportSendTypeName = reportSendTypeName;
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
	public String getEncryptionOperatorTypeId() {
		return encryptionOperatorTypeId;
	}
	public void setEncryptionOperatorTypeId(String encryptionOperatorTypeId) {
		this.encryptionOperatorTypeId = encryptionOperatorTypeId;
	}
	public String getEncryptionOperatorTypeName() {
		return encryptionOperatorTypeName;
	}
	public void setEncryptionOperatorTypeName(String encryptionOperatorTypeName) {
		this.encryptionOperatorTypeName = encryptionOperatorTypeName;
	}
	public String getEncryptionAlgorithmId() {
		return encryptionAlgorithmId;
	}
	public void setEncryptionAlgorithmId(String encryptionAlgorithmId) {
		this.encryptionAlgorithmId = encryptionAlgorithmId;
	}
	public String getEncryptionAlgorithmName() {
		return encryptionAlgorithmName;
	}
	public void setEncryptionAlgorithmName(String encryptionAlgorithmName) {
		this.encryptionAlgorithmName = encryptionAlgorithmName;
	}
	public String getReportSourceFtpId() {
		return reportSourceFtpId;
	}
	public void setReportSourceFtpId(String reportSourceFtpId) {
		this.reportSourceFtpId = reportSourceFtpId;
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
	public String getReportTargetFtpId() {
		return reportTargetFtpId;
	}
	public void setReportTargetFtpId(String reportTargetFtpId) {
		this.reportTargetFtpId = reportTargetFtpId;
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
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public String getTaskStrategyDesc() {
		return taskStrategyDesc;
	}
	public void setTaskStrategyDesc(String taskStrategyDesc) {
		this.taskStrategyDesc = taskStrategyDesc;
	}
	public String getTaskReportRuleId() {
		return taskReportRuleId;
	}
	public void setTaskReportRuleId(String taskReportRuleId) {
		this.taskReportRuleId = taskReportRuleId;
	}
	public String getEmailReceiverIds() {
		return emailReceiverIds;
	}
	public void setEmailReceiverIds(String emailReceiverIds) {
		this.emailReceiverIds = emailReceiverIds;
	}
	
	public String getEmailReceiverName() {
		return emailReceiverName;
	}
	public void setEmailReceiverName(String emailReceiverName) {
		this.emailReceiverName = emailReceiverName;
	}
	public String getCustomerIds() {
		return customerIds;
	}
	public void setCustomerIds(String customerIds) {
		this.customerIds = customerIds;
	}
	
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	public String getTaskReviewerIds() {
		return taskReviewerIds;
	}
	public void setTaskReviewerIds(String taskReviewerIds) {
		this.taskReviewerIds = taskReviewerIds;
	}
	
	public String getTaskReviewerName() {
		return taskReviewerName;
	}
	public void setTaskReviewerName(String taskReviewerName) {
		this.taskReviewerName = taskReviewerName;
	}
	public String getQuartzPeriodTypeId() {
		return quartzPeriodTypeId;
	}
	public void setQuartzPeriodTypeId(String quartzPeriodTypeId) {
		this.quartzPeriodTypeId = quartzPeriodTypeId;
	}
	public String getTaskQuartzTime() {
		return taskQuartzTime;
	}
	public void setTaskQuartzTime(String taskQuartzTime) {
		this.taskQuartzTime = taskQuartzTime;
	}
	public String getTaskStrategyId() {
		return taskStrategyId;
	}
	public void setTaskStrategyId(String taskStrategyId) {
		this.taskStrategyId = taskStrategyId;
	}
	public String getUsageStatusId() {
		return usageStatusId;
	}
	public void setUsageStatusId(String usageStatusId) {
		this.usageStatusId = usageStatusId;
	}
	public List<ReportRuleDTO> getReportRuleList() {
		return reportRuleList;
	}
	public void setReportRuleList(List<ReportRuleDTO> reportRuleList) {
		this.reportRuleList = reportRuleList;
	}
	public String getUsageStatusName() {
		return usageStatusName;
	}
	public void setUsageStatusName(String usageStatusName) {
		this.usageStatusName = usageStatusName;
	}
	public Integer getTaskQuartzMonth() {
		return taskQuartzMonth;
	}
	public void setTaskQuartzMonth(Integer taskQuartzMonth) {
		this.taskQuartzMonth = taskQuartzMonth;
	}
	public Integer getTaskQuartzWeek() {
		return taskQuartzWeek;
	}
	public void setTaskQuartzWeek(Integer taskQuartzWeek) {
		this.taskQuartzWeek = taskQuartzWeek;
	}
	public Integer getTaskQuartzDay() {
		return taskQuartzDay;
	}
	public void setTaskQuartzDay(Integer taskQuartzDay) {
		this.taskQuartzDay = taskQuartzDay;
	}
	public String getIsEncryption() {
		return isEncryption;
	}
	public void setIsEncryption(String isEncryption) {
		this.isEncryption = isEncryption;
	}
	public String getIsMatchRule() {
		return isMatchRule;
	}
	public void setIsMatchRule(String isMatchRule) {
		this.isMatchRule = isMatchRule;
	}
	public String getMailModeId() {
		return mailModeId;
	}
	public void setMailModeId(String mailModeId) {
		this.mailModeId = mailModeId;
	}
	public String getEmailCcIds() {
		return emailCcIds;
	}
	public void setEmailCcIds(String emailCcIds) {
		this.emailCcIds = emailCcIds;
	}
	public String getSendSucInformReceiverIds() {
		return sendSucInformReceiverIds;
	}
	public void setSendSucInformReceiverIds(String sendSucInformReceiverIds) {
		this.sendSucInformReceiverIds = sendSucInformReceiverIds;
	}
	public String getSendSucInformCcIds() {
		return sendSucInformCcIds;
	}
	public void setSendSucInformCcIds(String sendSucInformCcIds) {
		this.sendSucInformCcIds = sendSucInformCcIds;
	}
	public String getIsSendSucMailInform() {
		return isSendSucMailInform;
	}
	public void setIsSendSucMailInform(String isSendSucMailInform) {
		this.isSendSucMailInform = isSendSucMailInform;
	}
	public String getSendSucinformMailmodelId() {
		return sendSucinformMailmodelId;
	}
	public void setSendSucinformMailmodelId(String sendSucinformMailmodelId) {
		this.sendSucinformMailmodelId = sendSucinformMailmodelId;
	}
	
	
}