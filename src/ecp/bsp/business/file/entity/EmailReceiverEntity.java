package ecp.bsp.business.file.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import ecp.bsp.system.core.BaseEntity;

/**
 * 邮箱接收人实体
 * 
 * @since 2015-06-08 <br>
 * 
 * @author zengqingyue.
 */
@Entity
@Table(name = "PMS_EMAIL_RECEIVER", schema = "PMSWEB_DBA")
public class EmailReceiverEntity extends BaseEntity {
	/**
	 * 版本号.
	 */
	private static final long serialVersionUID = 1L;
	
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
	
	/**
	 * 获取邮箱接收人ID.
	 * 
	 * @return 邮箱接收人ID.
	 */
	@Id
	@Column(name = "EMAIL_RECEIVER_ID", unique = true, nullable = false, length = 32)
	public String getEmailReceiverId() {
		return this.getId();
	}

	/**
	 * 设置邮箱接收人ID.
	 * 
	 * @param productTypeId
	 *            邮箱接收人ID.
	 */
	public void setEmailReceiverId(String emailReceiverId) {
		this.setId(emailReceiverId);
	}

	@Column(name = "EMAIL_RECEIVER_NAME", nullable = false, length = 50)
	public String getEmailReceiverName() {
		return emailReceiverName;
	}

	public void setEmailReceiverName(String emailReceiverName) {
		this.emailReceiverName = emailReceiverName;
	}

	@Column(name = "EMAIL_RECEIVER_ADDRESS", nullable = false, length = 50)
	public String getEmailReceiverAddress() {
		return emailReceiverAddress;
	}

	public void setEmailReceiverAddress(String emailReceiverAddress) {
		this.emailReceiverAddress = emailReceiverAddress;
	}

	@Column(name = "EMAIL_RECEIVER_DESC", nullable = false, length = 500)
	public String getEmailReceiverDesc() {
		return emailReceiverDesc;
	}

	public void setEmailReceiverDesc(String emailReceiverDesc) {
		this.emailReceiverDesc = emailReceiverDesc;
	}

}