package ecp.bsp.business.file.dto;

import org.springframework.stereotype.Component;

import ecp.bsp.system.core.BaseDTO;

/**
 * 邮箱接收人实体
 * 
 * @since 2015-06-08 <br>
 * 
 * @author zengqingyue.
 */
@Component
public class EmailReceiverDTO extends BaseDTO {
	/**
	 * 邮箱接收人名称.
	 */
	private String id;
	/**
	 * 邮箱接收人名称.
	 */
	private String text;
	/**
	 * 邮箱接收人名称.
	 */
	private String emailReceiverId;
	/**
	 * 邮箱接收人名称.
	 */
	private String emailReceiverName;
	/**
	 * 邮箱接收人地址.
	 */
	private String emailReceiverAddress;
	/**
	 * 邮箱接收人描述.
	 */
	private String emailReceiverDesc;
	
	public String getEmailReceiverId() {
		return emailReceiverId;
	}
	
	public void setEmailReceiverId(String emailReceiverId) {
		this.emailReceiverId = emailReceiverId;
	}
	
	public String getEmailReceiverName() {
		return emailReceiverName;
	}
	
	public void setEmailReceiverName(String emailReceiverName) {
		this.emailReceiverName = emailReceiverName;
	}
	
	public String getEmailReceiverAddress() {
		return emailReceiverAddress;
	}
	
	public void setEmailReceiverAddress(String emailReceiverAddress) {
		this.emailReceiverAddress = emailReceiverAddress;
	}
	
	public String getEmailReceiverDesc() {
		return emailReceiverDesc;
	}
	
	public void setEmailReceiverDesc(String emailReceiverDesc) {
		this.emailReceiverDesc = emailReceiverDesc;
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