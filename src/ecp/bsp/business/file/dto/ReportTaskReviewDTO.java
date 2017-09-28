package ecp.bsp.business.file.dto;

import java.util.Date;

import org.codehaus.jackson.map.annotate.JsonDeserialize;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.springframework.stereotype.Component;

import ecp.bsp.system.commons.utils.jackson.deserilizer.JsonDateDeSerializer;
import ecp.bsp.system.commons.utils.jackson.serializer.JsonDateSerializer;
import ecp.bsp.system.core.BaseDTO;

/**
 * 报表任务评审信息dto
 * 
 * @since 2015-07-10 <br>
 * 
 * @author zengqingyue.
 */
@Component
public class ReportTaskReviewDTO extends BaseDTO {
	/**
	 * 报表任务ID
	 */
	private String reportTaskId;
	/**
	 * 任务策略信息ID.
	 */
	private String taskStrategyId;
	/**
	 * 任务策略名称.
	 */
	private String taskStrategyName;
	/**
	 * 报表任务名称.
	 */
	private String reportTaskName;
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
	 * 报表任务活动状态ID.
	 */
	private String repTaskActivityTypeId;
	/**
	 * 报表任务活动状态.
	 */
	private String repTaskActivityTypeName;
	/**
	 * 报表任务评审ID.
	 */
	private String reportTaskReviewId;
	/**
	 * 报表任务上传信息ID.
	 */
	private String reportTaskUploadId;
	/**
	 * 评审状态ID.
	 */
	private String reportReviewStatusId;
	/**
	 * 评审状态.
	 */
	private String reportReviewStatusName;
	/**
	 * 评审类型ID.
	 */
	private String reportReviewTypeId;
	/**
	 * 评审类型.
	 */
	private String reportReviewTypeName;
	/**
	 * 创建人ID.
	 */
	private String paaEmployeeId;
	/**
	 * 创建人名称.
	 */
	private String paaUsername;
	/**
	 * 评审时间.
	 */
	@JsonSerialize(using=JsonDateSerializer.class)
	@JsonDeserialize(using=JsonDateDeSerializer.class)
	private Date reviewTime;
	/**
	 * 描述.
	 */
	private String reviewDesc;
	/**
	 * 是否最终版本.
	 */
	private String isFinalVersion;
	/**
	 * 运营商.
	 */
	private String operatorName;
    /**
	 * 品牌.
	 */
	private String brandName;
	/**
	 * 产品类型.
	 */
	private String productTypeName;
	/**
	 * 上传人名称.
	 */
	private String uploadUsername;
	/**
	 * 上传时间.
	 */
	@JsonSerialize(using=JsonDateSerializer.class)
	@JsonDeserialize(using=JsonDateDeSerializer.class)
	private Date uploadTime;
	
	public String getReportTaskReviewId() {
		return reportTaskReviewId;
	}
	public void setReportTaskReviewId(String reportTaskReviewId) {
		this.reportTaskReviewId = reportTaskReviewId;
	}
	public String getReportTaskUploadId() {
		return reportTaskUploadId;
	}
	public void setReportTaskUploadId(String reportTaskUploadId) {
		this.reportTaskUploadId = reportTaskUploadId;
	}
	public String getReportReviewStatusId() {
		return reportReviewStatusId;
	}
	public void setReportReviewStatusId(String reportReviewStatusId) {
		this.reportReviewStatusId = reportReviewStatusId;
	}
	public String getReportReviewTypeId() {
		return reportReviewTypeId;
	}
	public void setReportReviewTypeId(String reportReviewTypeId) {
		this.reportReviewTypeId = reportReviewTypeId;
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
	public Date getReviewTime() {
		return reviewTime;
	}
	public void setReviewTime(Date reviewTime) {
		this.reviewTime = reviewTime;
	}
	public String getReviewDesc() {
		return reviewDesc;
	}
	public void setReviewDesc(String reviewDesc) {
		this.reviewDesc = reviewDesc;
	}
	public String getIsFinalVersion() {
		return isFinalVersion;
	}
	public void setIsFinalVersion(String isFinalVersion) {
		this.isFinalVersion = isFinalVersion;
	}
	public String getReportReviewStatusName() {
		return reportReviewStatusName;
	}
	public void setReportReviewStatusName(String reportReviewStatusName) {
		this.reportReviewStatusName = reportReviewStatusName;
	}
	public String getReportReviewTypeName() {
		return reportReviewTypeName;
	}
	public void setReportReviewTypeName(String reportReviewTypeName) {
		this.reportReviewTypeName = reportReviewTypeName;
	}
	public String getReportTaskId() {
		return reportTaskId;
	}
	public void setReportTaskId(String reportTaskId) {
		this.reportTaskId = reportTaskId;
	}
	public String getTaskStrategyId() {
		return taskStrategyId;
	}
	public void setTaskStrategyId(String taskStrategyId) {
		this.taskStrategyId = taskStrategyId;
	}
	
	public String getTaskStrategyName() {
		return taskStrategyName;
	}
	public void setTaskStrategyName(String taskStrategyName) {
		this.taskStrategyName = taskStrategyName;
	}
	public String getReportTaskName() {
		return reportTaskName;
	}
	public void setReportTaskName(String reportTaskName) {
		this.reportTaskName = reportTaskName;
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
	public String getrepTaskActivityTypeId() {
		return repTaskActivityTypeId;
	}
	public void setrepTaskActivityTypeId(String repTaskActivityTypeId) {
		this.repTaskActivityTypeId = repTaskActivityTypeId;
	}
	public String getrepTaskActivityTypeName() {
		return repTaskActivityTypeName;
	}
	public void setrepTaskActivityTypeName(String repTaskActivityTypeName) {
		this.repTaskActivityTypeName = repTaskActivityTypeName;
	}
	public String getOperatorName() {
		return operatorName;
	}
	public void setOperatorName(String operatorName) {
		this.operatorName = operatorName;
	}
	public String getBrandName() {
		return brandName;
	}
	public void setBrandName(String brandName) {
		this.brandName = brandName;
	}
	public String getProductTypeName() {
		return productTypeName;
	}
	public void setProductTypeName(String productTypeName) {
		this.productTypeName = productTypeName;
	}
	public String getUploadUsername() {
		return uploadUsername;
	}
	public void setUploadUsername(String uploadUsername) {
		this.uploadUsername = uploadUsername;
	}
	public Date getUploadTime() {
		return uploadTime;
	}
	public void setUploadTime(Date uploadTime) {
		this.uploadTime = uploadTime;
	}
}