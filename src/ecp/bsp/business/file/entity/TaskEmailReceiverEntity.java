package ecp.bsp.business.file.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import ecp.bsp.system.core.BaseEntity;

/**
 * 任务邮箱接收人实体
 * 
 * @since 2015-06-08 <br>
 * 
 * @author zengqingyue.
 */
@Entity
@Table(name = "PMS_TASK_EMAIL_RECEIVER", schema = "PMSWEB_DBA")
public class TaskEmailReceiverEntity extends BaseEntity {
	/**
	 * 版本号.
	 */
	private static final long serialVersionUID = 1L;
	
	/**
	 * 邮箱接收人名称.
	 */
	private String emailReceiverId;
	/**
	 * 邮箱接收人类型.
	 */
	private String emailReceiverType;
	/**
	 * 任务策略ID.
	 */
	private String taskStrategyId;
	
	@Id
	@Column(name = "TASK_EMAIL_RECEIVER_ID", unique = true, nullable = false, length = 32)
	public String getTaskEmailReceiverId() {
		return this.getId();
	}
	
	public void setTaskEmailReceiverId(String taskEmailReceiverId) {
		this.setId(taskEmailReceiverId);
	}

	@Column(name = "EMAIL_RECEIVER_ID", nullable = false, length = 50)
	public String getEmailReceiverId() {
		return emailReceiverId;
	}

	public void setEmailReceiverId(String emailReceiverId) {
		this.emailReceiverId = emailReceiverId;
	}

	@Column(name = "TASK_STRATEGY_ID", nullable = false, length = 50)
	public String getTaskStrategyId() {
		return taskStrategyId;
	}
	
	public void setTaskStrategyId(String taskStrategyId) {
		this.taskStrategyId = taskStrategyId;
	}
	@Id
	@Column(name = "TASK_EMAIL_RECEIVER_TYPE",  length = 32)
	public String getEmailReceiverType() {
		return emailReceiverType;
	}

	public void setEmailReceiverType(String emailReceiverType) {
		this.emailReceiverType = emailReceiverType;
	}

}