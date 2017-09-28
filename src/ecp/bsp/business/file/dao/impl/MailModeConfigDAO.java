package ecp.bsp.business.file.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import ecp.bsp.business.file.constant.FileConfigConst;
import ecp.bsp.system.framework.mail.data.dto.MailModeDTO;
import ecp.bsp.system.framework.mail.data.entity.MailModeEntity;
import ecp.bsp.system.core.BaseDAO;

/**
 * 邮件模板配置信息DAO层
 * 
 * @since 2015-09-16 <br>
 * 
 * @author tangwenfen.
 * 
 */
@Repository
public class MailModeConfigDAO extends BaseDAO{

	/**
	 * 保存邮件模板
	 * @param mailModeEntity
	 * @return
	 * @throws Exception 
	 */
	public void saveMailMode(MailModeEntity mailModeEntity) throws Exception {
		this.insert(mailModeEntity);
	}

	/**
	 * 根据邮件模板ID获取邮件模板实体
	 * @param mailModeId
	 * @return
	 */
	public MailModeEntity getMailModeEntityById(String mailModeId) {
		return this.getEntity(MailModeEntity.class, mailModeId);
	}
	
	/**
	 * 根据邮件模板名称获取邮件模板实体
	 * @param mailModeName
	 * @return
	 */
	public MailModeEntity getMailModeEntityByName(String mailModeName) {
		return this.getEntity(MailModeEntity.class, new String[]{FileConfigConst.PARAM_ENTITY_MAIL_MODE_NAME},
				new Object[]{mailModeName});
	}
	
	/**
	 * 根据邮件模板ID删除邮件模板实体
	 * @param mailModeId
	 * @throws Exception
	 */
	public void deleteMailModeEntityById(String mailModeId) throws Exception {
		this.delete(MailModeEntity.class,mailModeId);
	}

	/**
	 * 获取邮件模板列表
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<MailModeDTO> getMailModeList() {
		return (List<MailModeDTO>) this.query(FileConfigConst.SQL_GET_MAIL_MODE_LIST, MailModeDTO.class);
	}
    
}
