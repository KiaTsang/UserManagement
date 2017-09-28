package ecp.bsp.business.file.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import ecp.bsp.system.core.BaseEntity;

/**
 * 任务客服信息实体
 * 
 * @since 2015-06-15 <br>
 * 
 * @author zengqingyue.
 */
@Entity
@Table(name = "PMS_TASK_CUSTOMER", schema = "PMSWEB_DBA")
public class TaskCustomerEntity extends BaseEntity {
	/**
	 * 版本号.
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 客服ID.
	 */
	private String paaEmployeeId;
	/**
	 * 客服.
	 */
	private String paaUsername;
	/**
	 * 任务策略ID.
	 */
	private String taskStrategyId;

	@Id
	@Column(name = "TASK_CUSTOMER_ID", unique = true, nullable = false, length = 32)
	public String getTaskCustomerId() {
		return this.getId();
	}

	public void setTaskCustomerId(String taskCustomerId) {
		this.setId(taskCustomerId);
	}
	
	@Column(name = "TASK_STRATEGY_ID", nullable = false, length = 50)
	public String getTaskStrategyId() {
		return taskStrategyId;
	}
	
	public void setTaskStrategyId(String taskStrategyId) {
		this.taskStrategyId = taskStrategyId;
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
	
}