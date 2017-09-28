package ecp.bsp.business.file.dto;

import org.springframework.stereotype.Component;

import ecp.bsp.system.core.BaseDTO;

/**
 * 产品类型DTO
 * 
 * @since 2015-06-08 <br>
 * 
 * @author zengqingyue.
 * 
 */
@Component
public class ProductTypeDTO extends BaseDTO {
	/**
	 * 产品类型ID.
	 */
	private String productTypeId;
	/**
	 * 产品类型名称.
	 */
	private String productTypeName;
	/**
	 * 产品类型ID.
	 */
	private String id;
	/**
	 * 产品类型名称.
	 */
	private String text;
	
	/**
	 * 产品类型描述.
	 */
	private String productTypeDesc;

	public String getProductTypeId() {
		return productTypeId;
	}

	public void setProductTypeId(String productTypeId) {
		this.productTypeId = productTypeId;
	}

	public String getProductTypeName() {
		return productTypeName;
	}

	public void setProductTypeName(String productTypeName) {
		this.productTypeName = productTypeName;
	}

	public String getProductTypeDesc() {
		return productTypeDesc;
	}

	public void setProductTypeDesc(String productTypeDesc) {
		this.productTypeDesc = productTypeDesc;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}
	
}
