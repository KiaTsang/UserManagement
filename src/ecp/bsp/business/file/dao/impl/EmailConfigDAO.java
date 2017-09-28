package ecp.bsp.business.file.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import ecp.bsp.business.file.constant.FileConfigConst;
import ecp.bsp.business.file.dto.EmailReceiverDTO;
import ecp.bsp.business.file.entity.EmailReceiverEntity;
import ecp.bsp.business.file.entity.TaskEmailReceiverEntity;
import ecp.bsp.system.core.BaseDAO;
/**
 * 邮箱接收人配置信息DAO层
 * 
 * @since 2015-06-08 <br>
 * 
 * @author zengqingyue.
 * 
 */
@Repository
public class EmailConfigDAO extends BaseDAO{

	/**
	 * 保存邮箱接收人
	 * @param emailReceiverEntity
	 * @return
	 * @throws Exception 
	 */
	public void saveEmailReceiver(EmailReceiverEntity emailReceiverEntity) throws Exception {
		this.insert(emailReceiverEntity);
	}

	/**
	 * 根据邮箱接收人ID获取邮箱接收人实体
	 * @param emailReceiverId
	 * @return
	 */
	public EmailReceiverEntity getEmailReceiverEntityById(String emailReceiverId) {
		return this.getEntity(EmailReceiverEntity.class, emailReceiverId);
	}
	
	/**
	 * 根据邮箱接收人名称获取邮箱接收人实体
	 * @param emailReceiverName
	 * @return
	 */
	public EmailReceiverEntity getEmailReceiverByName(String emailReceiverName) {
		return this.getEntity(EmailReceiverEntity.class, new String[]{FileConfigConst.PARAM_ENTITY_EMAIL_RECEIVER_NAME},
				new Object[]{emailReceiverName});
	}

	/**
	 * 根据邮箱接收人ID删除邮箱接收人实体
	 * @param emailReceiverId
	 * @throws Exception
	 */
	public void deleteEmailReceiverById(String emailReceiverId) throws Exception {
		this.delete(EmailReceiverEntity.class,emailReceiverId);
	}

	/**
	 * 获取邮箱接收人信息列表
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<EmailReceiverDTO> getEmailReceiverList() {
		return (List<EmailReceiverDTO>) this.query(FileConfigConst.SQL_GET_EMAIL_LIST, EmailReceiverDTO.class);
	}

	/**
	 * 根据接收人ID获取任务邮箱列表信息
	 * @param EmailReceiverId
	 * @return
	 */
	public List<TaskEmailReceiverEntity> getTaskEmailReceiverListByEmailReceiver(String emailReceiverId) {
		return (List<TaskEmailReceiverEntity>) this.getEntityList(TaskEmailReceiverEntity.class, 
				FileConfigConst.PARAM_ENTITY_EMAIL_RECEIVER_ID,emailReceiverId,null);
	}

	/**
	 * @param taskStrategyId
	 * @return
	 */
	public List<TaskEmailReceiverEntity> getTaskEmailReceiverEntityListById(String taskStrategyId) {
		return (List<TaskEmailReceiverEntity>) this.getEntityList(TaskEmailReceiverEntity.class, 
				FileConfigConst.PARAM_ENTITY_TASK_STRATEGY_ID,taskStrategyId,null);
	}
}
