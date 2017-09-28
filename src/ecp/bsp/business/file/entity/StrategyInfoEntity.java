package ecp.bsp.business.file.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import ecp.bsp.system.core.BaseEntity;

/**
 * 策略信息实体
 * 
 * @since 2015-06-08 <br>
 * 
 * @author zengqingyue.
 */
@Entity
@Table(name = "PMS_STRATEGY_INFO", schema = "PMSWEB_DBA")
public class StrategyInfoEntity extends BaseEntity {
	/**
	 * 版本号.
	 */
	private static final long serialVersionUID = 1L;

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
	private Date createTime;
	/**
	 * 使用状态ID
	 * @return
	 */
	private String usageStatusId;
	
	@Id
	@Column(name = "STRATEGY_INFO_ID", unique = true, nullable = false, length = 32)
	public String getStrategyInfoId() {
		return this.getId();
	}

	public void setStrategyInfoId(String strategyInfoId) {
		this.setId(strategyInfoId);
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
	
	@Column(name = "CREATE_TIME", nullable = false)
	public Date getCreateTime() {
		return createTime;
	}
	
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	@Column(name = "USAGE_STATUS_ID", nullable = false, length = 50)
	public String getUsageStatusId() {
		return usageStatusId;
	}

	public void setUsageStatusId(String usageStatusId) {
		this.usageStatusId = usageStatusId;
	}

	
}