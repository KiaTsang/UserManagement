package ecp.bsp.business.file.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import ecp.bsp.business.file.dao.impl.EmailConfigDAO;
import ecp.bsp.business.file.dto.EmailReceiverDTO;
import ecp.bsp.business.file.entity.EmailReceiverEntity;
import ecp.bsp.business.file.entity.TaskEmailReceiverEntity;
import ecp.bsp.system.commons.constant.ExceptionCodeConst;
import ecp.bsp.system.commons.dto.ActionResult;
import ecp.bsp.system.commons.utils.ActionResultUtil;
import ecp.bsp.system.commons.utils.LoggerUtil;
import ecp.bsp.system.core.BaseDTO;

/**
 * 邮箱配置信息服务层
 * 
 * @since 2015-06-15 <br>
 * 
 * @author zengqingyue.
 * 
 */
@Service
@Transactional(propagation = Propagation.REQUIRED)
public class EmailConfigService {
	@Resource
	private EmailConfigDAO emailConfigDAO;

	/**
	 * 提交邮箱信息
	 * @param emailReceiverDTO
	 * @return
	 * @throws Exception 
	 */
	public ActionResult submitEmailReceiver(EmailReceiverDTO emailReceiverDTO) throws Exception {
		//检查数据的合法性
		if (this.validateEmailReceiverByName(emailReceiverDTO.getEmailReceiverName())) {
			String exceptionMessage = ExceptionCodeConst.SYSTEM_EXCEPTION_CODE + "邮箱名称已存在，请重新输入.";
			LoggerUtil.instance(this.getClass()).error(exceptionMessage);
			throw new RuntimeException(exceptionMessage);
		}
		//保存邮箱信息
		EmailReceiverEntity emailReceiverEntity = new EmailReceiverEntity();
		BaseDTO.dtoToEntity(emailReceiverDTO, emailReceiverEntity);
		this.emailConfigDAO.saveEmailReceiver(emailReceiverEntity);
		//返回处理结果.
		return ActionResultUtil.getActionResult(emailReceiverEntity.getEmailReceiverId(), "新建邮箱成功");
	}
	
	/**
	 * 更新邮箱信息
	 * @param emailReceiverDTO
	 * @return
	 * @throws Exception
	 */
	public ActionResult modifyEmailReceiver(EmailReceiverDTO emailReceiverDTO) throws Exception {
		//更新邮箱信息
		EmailReceiverEntity emailReceiverEntity = this.emailConfigDAO.getEmailReceiverEntityById(emailReceiverDTO.getEmailReceiverId());
		emailReceiverEntity.setEmailReceiverAddress(emailReceiverDTO.getEmailReceiverAddress());
		emailReceiverEntity.setEmailReceiverDesc(emailReceiverDTO.getEmailReceiverDesc());
		this.emailConfigDAO.update(emailReceiverEntity);
		//返回处理结果.
		return ActionResultUtil.getActionResult(emailReceiverEntity.getEmailReceiverId(), "修改邮箱成功");
	}
	
	/**
	 * 删除邮箱信息
	 * @param emailReceiverId
	 * @return
	 * @throws Exception 
	 */
	public ActionResult deleteEmailReceiver(String emailReceiverId) throws Exception {
		//检查数据的合法性
		List<TaskEmailReceiverEntity> list = this.emailConfigDAO.getTaskEmailReceiverListByEmailReceiver(emailReceiverId);
		if (list.size() > 0) {
			String exceptionMessage = ExceptionCodeConst.SYSTEM_EXCEPTION_CODE + "该邮箱已被使用，不能删除.";
			LoggerUtil.instance(this.getClass()).error(exceptionMessage);
			throw new RuntimeException(exceptionMessage);
		}
		//删除邮箱
		this.emailConfigDAO.deleteEmailReceiverById(emailReceiverId);
		//返回处理结果.
		return ActionResultUtil.getActionResult(emailReceiverId, "删除邮箱成功");
	}
	
	/**
	 * 获取邮箱信息列表
	 * @return
	 */
	public List<EmailReceiverDTO> getEmailReceiverList() {
		return this.emailConfigDAO.getEmailReceiverList();
	}
	
	/**
	 * 检查邮箱名称是否存在
	 * @param emailReceiverName
	 * @return
	 */
	private boolean validateEmailReceiverByName(String emailReceiverName) {
		EmailReceiverEntity emailReceiverEntity = this.emailConfigDAO.getEmailReceiverByName(emailReceiverName);
		return emailReceiverEntity != null ? true : false; 
	}

}