package ecp.bsp.business.file.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import ecp.bsp.system.core.BaseEntity;

/**
 * 产品类型实体
 * 
 * @since 2015-06-08 <br>
 * 
 * @author zengqingyue.
 */
@Entity
@Table(name = "PMS_PRODUCT_TYPE", schema = "PMSWEB_DBA")
public class ProductTypeEntity extends BaseEntity {
	/**
	 * 版本号.
	 */
	private static final long serialVersionUID = 1L;
	
	/**
	 * 产品类型名称.
	 */
	private String productTypeName;
	
	/**
	 * 产品类型描述.
	 */
	private String productTypeDesc;
	
	/**
	 * 获取产品类型ID.
	 * 
	 * @return 产品类型ID.
	 */
	@Id
	@Column(name = "PRODUCT_TYPE_ID", unique = true, nullable = false, length = 32)
	public String getProductTypeId() {
		return this.getId();
	}

	/**
	 * 设置产品类型ID.
	 * 
	 * @param productTypeId
	 *            产品类型ID.
	 */
	public void setProductTypeId(String productTypeId) {
		this.setId(productTypeId);
	}

	@Column(name = "PRODUCT_TYPE_NAME", nullable = false, length = 50)
	public String getProductTypeName() {
		return productTypeName;
	}

	public void setProductTypeName(String productTypeName) {
		this.productTypeName = productTypeName;
	}

	@Column(name = "PRODUCT_TYPE_DESC", nullable = false, length = 200)
	public String getProductTypeDesc() {
		return productTypeDesc;
	}

	public void setProductTypeDesc(String productTypeDesc) {
		this.productTypeDesc = productTypeDesc;
	}
	
}