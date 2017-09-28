package ecp.bsp.business.file.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import ecp.bsp.system.core.BaseEntity;

/**
 * 任务报表规则实体
 * 
 * @since 2015-06-08 <br>
 * 
 * @author zengqingyue.
 */
@Entity
@Table(name = "PMS_TASK_REPORT_RULE", schema = "PMSWEB_DBA")
public class TaskReportRuleEntity extends BaseEntity {
	/**
	 * 版本号.
	 */
	private static final long serialVersionUID = 1L;
	
	/**
	 * 报表规则ID.
	 */
	private String reportRuleId;
	
	/**
	 * 任务策略ID.
	 */
	private String taskStrategyId;
	
	@Id
	@Column(name = "TASK_REPORT_RULE_ID", unique = true, nullable = false, length = 32)
	public String getTaskReportRuleId() {
		return this.getId();
	}

	public void setTaskReportRuleId(String taskReportRuleId) {
		this.setId(taskReportRuleId);
	}
	
	@Column(name = "REPORT_RULE_ID", nullable = false, length = 50)
	public String getReportRuleId() {
		return reportRuleId;
	}
	
	public void setReportRuleId(String reportRuleId) {
		this.reportRuleId = reportRuleId;
	}
	
	@Column(name = "TASK_STRATEGY_ID", nullable = false, length = 50)
	public String getTaskStrategyId() {
		return taskStrategyId;
	}
	
	public void setTaskStrategyId(String taskStrategyId) {
		this.taskStrategyId = taskStrategyId;
	}
	
}