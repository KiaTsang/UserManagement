package ecp.bsp.business.file.dto;


import org.springframework.stereotype.Component;

import ecp.bsp.system.core.BaseDTO;

/**
 * 品牌DTO
 * 
 * @since 2015-06-08 <br>
 * 
 * @author zengqingyue.
 */
@Component
public class BrandDTO extends BaseDTO {
	/**
	 * 品牌ID.
	 */
	private String brandId;
	
	/**
	 * 品牌名称.
	 */
	private String brandName;
	
	/**
	 * 品牌ID.
	 */
	private String id;
	
	/**
	 * 品牌名称.
	 */
	private String text;
	
	/**
	 * 品牌描述.
	 */
	private String brandDesc;

	public String getBrandId() {
		return brandId;
	}

	public void setBrandId(String brandId) {
		this.brandId = brandId;
	}

	public String getBrandName() {
		return brandName;
	}

	public void setBrandName(String brandName) {
		this.brandName = brandName;
	}

	public String getBrandDesc() {
		return brandDesc;
	}

	public void setBrandDesc(String brandDesc) {
		this.brandDesc = brandDesc;
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