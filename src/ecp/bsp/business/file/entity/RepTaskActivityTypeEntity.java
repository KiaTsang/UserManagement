package ecp.bsp.business.file.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import ecp.bsp.system.core.BaseEntity;

/**
 * 报表任务活动类型实体
 * 
 * @since 2015-10-13 <br>
 * 
 * @author tangwenfen.
 */
@Entity
@Table(name = "PMS_REP_TASK_ACTIVITY_TYPE", schema = "PMSWEB_DBA")
public class RepTaskActivityTypeEntity extends BaseEntity {
	/**
	 * 版本号.
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 报表任务活动类型名称.
	 */
	private String repTaskActivityTypeName;
	
	/**
	 * 报表任务活动类型ID.
	 * 
	 * @return 报表任务活动类型ID.
	 */
	@Id
	@Column(name = "REP_TASK_ACTIVITY_TYPE_ID", unique = true, nullable = false, length = 32)
	public String getRepTaskActivityTypeId() {
		return this.getId();
	}

	/**
	 * 设置报表任务活动类型ID.
	 * 
	 * @param repTaskActivityTypeId         
	 */
	public void setRepTaskActivityTypeId(String repTaskActivityTypeId) {
		this.setId(repTaskActivityTypeId);
	}
	
	@Column(name = "REP_TASK_ACTIVITY_TYPE_NAME", nullable = false, length = 50)
	public String getRepTaskActivityTypeName() {
		return repTaskActivityTypeName;
	}
	
	public void setRepTaskActivityTypeName(String repTaskActivityTypeName) {
		this.repTaskActivityTypeName = repTaskActivityTypeName;
	}
	
}
