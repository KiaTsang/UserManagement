package ecp.bsp.business.file.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import ecp.bsp.system.core.BaseEntity;

/**
 * 任务评审人信息实体
 * 
 * @since 2015-06-15 <br>
 * 
 * @author zengqingyue.
 */
@Entity
@Table(name = "PMS_TASK_REVIEWER", schema = "PMSWEB_DBA")
public class TaskReviewerEntity extends BaseEntity {
	/**
	 * 版本号.
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 评审人ID.
	 */
	private String paaEmployeeId;
	/**
	 * 评审人名称.
	 */
	private String paaUsername;
	/**
	 * 任务策略ID.
	 */
	private String taskStrategyId;

	@Id
	@Column(name = "TASK_REVIEWER_ID", unique = true, nullable = false, length = 32)
	public String getTaskReviewerId() {
		return this.getId();
	}

	public void setTaskReviewerId(String taskReviewerId) {
		this.setId(taskReviewerId);
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

	@Column(name = "TASK_STRATEGY_ID", nullable = false, length = 50)
	public String getTaskStrategyId() {
		return taskStrategyId;
	}
	
	public void setTaskStrategyId(String taskStrategyId) {
		this.taskStrategyId = taskStrategyId;
	}

}