package ecp.bsp.business.file.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import ecp.bsp.system.core.BaseEntity;

/**
 * 任务品牌实体
 * 
 * @since 2015-06-08 <br>
 * 
 * @author zengqingyue.
 */
@Entity
@Table(name = "PMS_TASK_BRAND", schema = "PMSWEB_DBA")
public class TaskBrandEntity extends BaseEntity {
	/**
	 * 版本号.
	 */
	private static final long serialVersionUID = 1L;
	
	/**
	 * 品牌ID.
	 */
	private String brandId;
	
	/**
	 * 任务策略ID.
	 */
	private String taskStrategyId;
	
	@Id
	@Column(name = "TASK_BRAND_ID", unique = true, nullable = false, length = 32)
	public String getTaskBrandId() {
		return this.getId();
	}

	public void setTaskBrandId(String taskBrandId) {
		this.setId(taskBrandId);
	}
	
	@Column(name = "BRAND_ID", nullable = false, length = 50)
	public String getBrandId() {
		return brandId;
	}
	
	public void setBrandId(String brandId) {
		this.brandId = brandId;
	}
	
	@Column(name = "TASK_STRATEGY_ID", nullable = false, length = 50)
	public String getTaskStrategyId() {
		return taskStrategyId;
	}
	
	public void setTaskStrategyId(String taskStrategyId) {
		this.taskStrategyId = taskStrategyId;
	}
}