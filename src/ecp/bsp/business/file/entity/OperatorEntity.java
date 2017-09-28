package ecp.bsp.business.file.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import ecp.bsp.system.core.BaseEntity;

/**
 * 运营商实体
 * 
 * @since 2015-06-08 <br>
 * 
 * @author zengqingyue.
 */
@Entity
@Table(name = "PMS_OPERATOR", schema = "PMSWEB_DBA")
public class OperatorEntity extends BaseEntity {
	/**
	 * 版本号.
	 */
	private static final long serialVersionUID = 1L;
	
	/**
	 * 运营商名称.
	 */
	private String operatorName;
	
	/**
	 * 运营商描述.
	 */
	private String operatorDesc;
	
	/**
	 * 获取运营商ID.
	 * 
	 * @return 运营商ID.
	 */
	@Id
	@Column(name = "OPERATOR_ID", unique = true, nullable = false, length = 32)
	public String getOperatorId() {
		return this.getId();
	}

	/**
	 * 设置运营商ID.
	 * 
	 * @param productTypeId
	 *            运营商ID.
	 */
	public void setOperatorId(String operatorId) {
		this.setId(operatorId);
	}

	@Column(name = "OPERATOR_NAME", nullable = false, length = 50)
	public String getOperatorName() {
		return operatorName;
	}

	public void setOperatorName(String operatorName) {
		this.operatorName = operatorName;
	}

	@Column(name = "OPERATOR_DESC", nullable = true, length = 200)
	public String getOperatorDesc() {
		return operatorDesc;
	}

	public void setOperatorDesc(String operatorDesc) {
		this.operatorDesc = operatorDesc;
	}

}