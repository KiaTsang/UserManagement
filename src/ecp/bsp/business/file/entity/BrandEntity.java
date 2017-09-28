package ecp.bsp.business.file.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import ecp.bsp.system.core.BaseEntity;

/**
 * 品牌实体
 * 
 * @since 2015-06-08 <br>
 * 
 * @author zengqingyue.
 */
@Entity
@Table(name = "PMS_BRAND", schema = "PMSWEB_DBA")
public class BrandEntity extends BaseEntity {
	/**
	 * 版本号.
	 */
	private static final long serialVersionUID = 1L;
	
	/**
	 * 品牌名称.
	 */
	private String brandName;
	
	/**
	 * 品牌描述.
	 */
	private String brandDesc;
	
	@Id
	@Column(name = "BRAND_ID", unique = true, nullable = false, length = 32)
	public String getBrandId() {
		return this.getId();
	}

	public void setBrandId(String brandId) {
		this.setId(brandId);
	}

	@Column(name = "BRAND_NAME", nullable = false, length = 50)
	public String getBrandName() {
		return brandName;
	}

	public void setBrandName(String brandName) {
		this.brandName = brandName;
	}

	@Column(name = "BRAND_DESC", nullable = false, length = 50)
	public String getBrandDesc() {
		return brandDesc;
	}

	public void setBrandDesc(String brandDesc) {
		this.brandDesc = brandDesc;
	}
}