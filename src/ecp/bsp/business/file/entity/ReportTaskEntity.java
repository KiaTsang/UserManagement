package ecp.bsp.business.file.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import ecp.bsp.system.core.BaseEntity;

/**
 * 报表任务实体
 * 
 * @since 2015-06-12 <br>
 * 
 * @author zengqingyue.
 */
@Entity
@Table(name = "PMS_REPORT_TASK", schema = "PMSWEB_DBA")
public class ReportTaskEntity extends BaseEntity {
	/**
	 * 版本号.
	 */
	private static final long serialVersionUID = 1L;
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
	private Date startTime;
	/**
	 * 结束时间.
	 */
	private Date endTime;
	/**
	 * 报表任务活动状态ID.
	 */
	private String repTaskActivityTypeId;
	
	@Id
	@Column(name = "REPORT_TASK_ID", unique = true, nullable = false, length = 32)
	public String getReportTaskId() {
		return this.getId();
	}

	public void setReportTaskId(String reportTaskId) {
		this.setId(reportTaskId);
	}
	
	@Column(name = "REPORT_TASK_NAME", nullable = false, length = 50)
	public String getReportTaskName() {
		return reportTaskName;
	}
	
	public void setReportTaskName(String reportTaskName) {
		this.reportTaskName = reportTaskName;
	}
	
	@Column(name = "PAA_EMPLOYEE_ID", nullable = false, length = 50)
	public String getPaaEmployeeId() {
		return paaEmployeeId;
	}
	
	public void setPaaEmployeeId(String paaEmployeeId) {
		this.paaEmployeeId = paaEmployeeId;
	}
	
	@Column(name = "PAA_USERNAME", nullable = false, length = 50)
	public String getPaaUsername() {
		return paaUsername;
	}
	
	public void setPaaUsername(String paaUsername) {
		this.paaUsername = paaUsername;
	}
	
	@Column(name = "START_TIME", nullable = false)
	public Date getStartTime() {
		return startTime;
	}
	
	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}
	
	@Column(name = "END_TIME", nullable = false)
	public Date getEndTime() {
		return endTime;
	}
	
	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}
	
	@Column(name = "TASK_STRATEGY_ID", nullable = false, length = 50)
	public String getTaskStrategyId() {
		return taskStrategyId;
	}
	
	public void setTaskStrategyId(String taskStrategyId) {
		this.taskStrategyId = taskStrategyId;
	}
	
	@Column(name = "REP_TASK_ACTIVITY_TYPE_ID", nullable = false, length = 50)
	public String getRepTaskActivityTypeId() {
		return repTaskActivityTypeId;
	}

	public void setRepTaskActivityTypeId(String repTaskActivityTypeId) {
		this.repTaskActivityTypeId = repTaskActivityTypeId;
	}

	
}