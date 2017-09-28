package ecp.bsp.business.file.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import ecp.bsp.business.file.dao.impl.FtpConfigDAO;
import ecp.bsp.business.file.entity.TaskStrategyEntity;
import ecp.bsp.system.commons.constant.ExceptionCodeConst;
import ecp.bsp.system.commons.dto.ActionResult;
import ecp.bsp.system.commons.utils.ActionResultUtil;
import ecp.bsp.system.commons.utils.LoggerUtil;
import ecp.bsp.system.core.BaseDTO;
import ecp.bsp.system.framework.ftp.data.dto.FtpDTO;
import ecp.bsp.system.framework.ftp.data.entity.FtpEntity;

/**
 * FTP配置信息服务层
 * 
 * @since 2015-06-15 <br>
 * 
 * @author zengqingyue.
 * 
 */
@Service
@Transactional(propagation = Propagation.REQUIRED)
public class FtpConfigService {
	@Resource
	private FtpConfigDAO ftpConfigDAO;

	/**
	 * 提交FTP信息
	 * @param ftpDTO
	 * @return
	 * @throws Exception 
	 */
	public ActionResult submitFtp(FtpDTO ftpDTO) throws Exception {
		//检查数据的合法性
		if (this.validateFtpByName(ftpDTO.getFtpName())) {
			String exceptionMessage = ExceptionCodeConst.SYSTEM_EXCEPTION_CODE + "FTP名称已存在，请重新输入.";
			LoggerUtil.instance(this.getClass()).error(exceptionMessage);
			throw new RuntimeException(exceptionMessage);
		}
		//保存FTP信息
		FtpEntity ftpEntity = new FtpEntity();
		BaseDTO.dtoToEntity(ftpDTO, ftpEntity);
		this.ftpConfigDAO.saveFtp(ftpEntity);
		//返回处理结果.
		return ActionResultUtil.getActionResult(ftpEntity.getFtpId(), "新建FTP成功");
	}
	
	/**
	 * 更新FTP信息
	 * @param ftpDTO
	 * @return
	 * @throws Exception
	 */
	public ActionResult modifyFtp(FtpDTO ftpDTO) throws Exception {
		//更新FTP信息
		FtpEntity ftpEntity = this.ftpConfigDAO.getFtpEntityById(ftpDTO.getFtpId());
		BaseDTO.dtoToEntity(ftpDTO, ftpEntity);
		this.ftpConfigDAO.update(ftpEntity);
		//返回处理结果.
		return ActionResultUtil.getActionResult(ftpEntity.getFtpId(), "修改FTP成功");
	}
	
	/**
	 * 删除FTP信息
	 * @param ftpId
	 * @return
	 * @throws Exception 
	 */
	public ActionResult deleteFtp(String ftpId) throws Exception {
		//检查数据的合法性
		List<TaskStrategyEntity> list = this.ftpConfigDAO.getTaskStrategyListByFtp(ftpId);
		if (list.size() > 0) {
			String exceptionMessage = ExceptionCodeConst.SYSTEM_EXCEPTION_CODE + "该FTP已被使用，不能删除.";
			LoggerUtil.instance(this.getClass()).error(exceptionMessage);
			throw new RuntimeException(exceptionMessage);
		}
		//删除FTP
		this.ftpConfigDAO.deleteFtpById(ftpId);
		//返回处理结果.
		return ActionResultUtil.getActionResult(ftpId, "删除FTP成功");
	}
	
	/**
	 * 获取FTP信息列表
	 * @return
	 */
	public List<FtpDTO> getFtpList() {
		return this.ftpConfigDAO.getFtpList();
	}
	
	/**
	 * 获取FTP
	 * @return
	 */
	public FtpDTO getFtpById(String ftpId) {
		return this.ftpConfigDAO.getFtpById(ftpId);
	}
	
	/**
	 * 检查FTP名称是否存在
	 * @param FtpName
	 * @return
	 */
	private boolean validateFtpByName(String ftpName) {
		FtpEntity ftpEntity = this.ftpConfigDAO.getFtpByName(ftpName);
		return ftpEntity != null ? true : false; 
	}

}