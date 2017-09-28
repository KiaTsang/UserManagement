package ecp.bsp.business.file.service.impl;

import java.io.IOException;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import ecp.bsp.business.file.dao.impl.MailModeConfigDAO;
import  ecp.bsp.system.framework.mail.data.dto.MailModeDTO;
import ecp.bsp.system.framework.mail.data.entity.MailModeEntity;
import ecp.bsp.system.commons.constant.ExceptionCodeConst;
import ecp.bsp.system.commons.dto.ActionResult;
import ecp.bsp.system.commons.utils.ActionResultUtil;
import ecp.bsp.system.commons.utils.LoggerUtil;
import ecp.bsp.system.core.BaseDTO;

/**
 * 邮件模板配置信息服务层
 * 
 * @since 2015-09-16<br>
 * 
 * @author tangwenfen.
 * 
 */
@Service
@Transactional(propagation = Propagation.REQUIRED)
public class MailModeConfigService {
	@Resource
	private MailModeConfigDAO mailModeConfigDAO;

//	public MailModeConfigService()
//	{
//	if(""!=null)
//	{
//		
//	}
//		
	//}
	/**
	 * 提交邮件模板
	 * @param mailModeDTO
	 * @return
	 * @throws Exception 
	 */
	public ActionResult submitMailMode(MailModeDTO mailModeDTO) throws Exception {
		//检查数据的合法性
		if (this.validateMailModeByName(mailModeDTO.getMailModeName())) {
			String exceptionMessage = ExceptionCodeConst.SYSTEM_EXCEPTION_CODE + "邮件模板名称已存在，请重新输入.";
			LoggerUtil.instance(this.getClass()).error(exceptionMessage);
			throw new RuntimeException(exceptionMessage);
		}
		//保存邮件模板
		MailModeEntity mailModeEntity = new MailModeEntity();
		BaseDTO.dtoToEntity(mailModeDTO, mailModeEntity);
		this.mailModeConfigDAO.saveMailMode(mailModeEntity);
		//返回处理结果.
		return ActionResultUtil.getActionResult(mailModeEntity.getMailModeId(), "新建邮件模板成功");
	}
	
	/**
	 * 更新邮件模板 
	 * @param mailModeDTO
	 * @return
	 * @throws Exception
	 */
	public ActionResult modifyMailMode(MailModeDTO mailModeDTO) throws Exception {
		//更新邮件模板
		MailModeEntity mailModeEntity = this.mailModeConfigDAO.getMailModeEntityById(mailModeDTO.getMailModeId());
		BaseDTO.dtoToEntity(mailModeDTO, mailModeEntity);
		this.mailModeConfigDAO.update(mailModeEntity);
		//返回处理结果.
		return ActionResultUtil.getActionResult(mailModeEntity.getMailModeId(), "修改邮件模板成功");
	}
	
	/**
	 * 删除邮件模板
	 * @param mailModeId
	 * @return
	 * @throws Exception 
	 */
	public ActionResult deleteMailMode(String mailModeId) throws Exception {
		//删除邮件模板 
		this.mailModeConfigDAO.deleteMailModeEntityById(mailModeId);
		//返回处理结果.
		return ActionResultUtil.getActionResult(mailModeId, "删除邮件模板成功");
	}
	
	/**
	 * 获取邮件模板列表
	 * @return
	 */
	public List<MailModeDTO> getMailModeList() {
		return this.mailModeConfigDAO.getMailModeList();
	}
	
	/**
	 * 根据邮件模板的ID获取邮件模板
	 * @param mailModeId
	 * @return
	 */
	public MailModeDTO getMailModeById(String mailModeId) {
		MailModeEntity mailModeEntity = this.mailModeConfigDAO.getMailModeEntityById(mailModeId);
		MailModeDTO mailModeDTO = new MailModeDTO();
		mailModeDTO.setMailModeId(mailModeId);
		BaseDTO.entityToDTO(mailModeEntity, mailModeDTO);
		return mailModeDTO ;
		
	}
	
	/**
	 * 检查邮件模板名称是否存在
	 * @param BrandName
	 * @return
	 */
	private boolean validateMailModeByName(String mailModeName) {
		MailModeEntity mailModeEntity = this.mailModeConfigDAO.getMailModeEntityByName(mailModeName);
		return mailModeEntity != null ? true : false; 
	}
	
}