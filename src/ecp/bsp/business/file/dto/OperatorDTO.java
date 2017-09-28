package ecp.bsp.business.file.dto;

import org.springframework.stereotype.Component;

import ecp.bsp.system.core.BaseDTO;
/**
 * 运营商DTO
 * 
 * @since 2015-06-08 <br>
 * 
 * @author zengqingyue.
 */
@Component
public class OperatorDTO extends BaseDTO {
	/**
	 * 运营商名称.
	 */
	private String operatorId;
	
	/**
	 * 运营商名称.
	 */
	private String operatorName;
	
	/**
	 * 运营商名称.
	 */
	private String id;
	
	/**
	 * 运营商名称.
	 */
	private String text;
	
	/**
	 * 运营商描述.
	 */
	private String operatorDesc;

	public String getOperatorId() {
		return operatorId;
	}

	public void setOperatorId(String operatorId) {
		this.operatorId = operatorId;
	}

	public String getOperatorName() {
		return operatorName;
	}

	public void setOperatorName(String operatorName) {
		this.operatorName = operatorName;
	}

	public String getOperatorDesc() {
		return operatorDesc;
	}

	public void setOperatorDesc(String operatorDesc) {
		this.operatorDesc = operatorDesc;
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