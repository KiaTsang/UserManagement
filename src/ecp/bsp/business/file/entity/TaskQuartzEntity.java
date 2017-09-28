package ecp.bsp.business.file.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import ecp.bsp.system.core.BaseEntity;

/**
 * 任务调度信息实体
 * 
 * @since 2015-06-15 <br>
 * 
 * @author zengqingyue.
 */
@Entity
@Table(name = "PMS_TASK_QUARTZ", schema = "PMSWEB_DBA")
public class TaskQuartzEntity extends BaseEntity {
	/**
	 * 版本号.
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 任务策略ID.
	 */
	private String taskStrategyId;
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

	@Id
	@Column(name = "TASK_QUARTZ_ID", unique = true, nullable = false, length = 32)
	public String getTaskQuartzId() {
		return this.getId();
	}

	public void setTaskQuartzId(String taskQuartzId) {
		this.setId(taskQuartzId);
	}
	
	@Column(name = "TASK_STRATEGY_ID", nullable = false, length = 50)
	public String getTaskStrategyId() {
		return taskStrategyId;
	}
	
	public void setTaskStrategyId(String taskStrategyId) {
		this.taskStrategyId = taskStrategyId;
	}
	
	@Column(name = "QUARTZ_PERIOD_TYPE_ID", nullable = false, length = 50)
	public String getQuartzPeriodTypeId() {
		return quartzPeriodTypeId;
	}
	
	public void setQuartzPeriodTypeId(String quartzPeriodTypeId) {
		this.quartzPeriodTypeId = quartzPeriodTypeId;
	}
	
	@Column(name = "TASK_QUARTZ_TIME", nullable = false, length = 50)
	public String getTaskQuartzTime() {
		return taskQuartzTime;
	}
	
	public void setTaskQuartzTime(String taskQuartzTime) {
		this.taskQuartzTime = taskQuartzTime;
	}

	@Column(name = "TASK_QUARTZ_MONTH", nullable = false, length = 50)
	public Integer getTaskQuartzMonth() {
		return taskQuartzMonth;
	}

	public void setTaskQuartzMonth(Integer taskQuartzMonth) {
		this.taskQuartzMonth = taskQuartzMonth;
	}

	@Column(name = "TASK_QUARTZ_WEEK", nullable = false, length = 50)
	public Integer getTaskQuartzWeek() {
		return taskQuartzWeek;
	}

	public void setTaskQuartzWeek(Integer taskQuartzWeek) {
		this.taskQuartzWeek = taskQuartzWeek;
	}

	@Column(name = "TASK_QUARTZ_DAY", nullable = false, length = 50)
	public Integer getTaskQuartzDay() {
		return taskQuartzDay;
	}

	public void setTaskQuartzDay(Integer taskQuartzDay) {
		this.taskQuartzDay = taskQuartzDay;
	}
	
}