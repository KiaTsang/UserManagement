package ecp.bsp.business.file.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import ecp.bsp.business.file.dao.impl.AlgorithmConfigDAO;
import ecp.bsp.business.file.dto.EncryptionAlgorithmDTO;
import ecp.bsp.business.file.entity.AlgorithmDllEntity;
import ecp.bsp.business.file.entity.EncryptionAlgorithmEntity;
import ecp.bsp.business.file.entity.TaskStrategyEntity;
import ecp.bsp.business.file.myenum.EncryptionAlgorithmTypeEnum;
import ecp.bsp.system.commons.constant.ExceptionCodeConst;
import ecp.bsp.system.commons.dto.ActionResult;
import ecp.bsp.system.commons.utils.ActionResultUtil;
import ecp.bsp.system.commons.utils.LoggerUtil;
import ecp.bsp.system.core.BaseDTO;

/**
 * 算法信息服务层
 * 
 * @since 2015-06-15 <br>
 * 
 * @author zengqingyue.
 * 
 */
@Service
@Transactional(propagation = Propagation.REQUIRED)
public class AlgorithmService {
	@Resource
	private AlgorithmConfigDAO algorithmConfigDAO;

	/**
	 * 提交算法信息
	 * @param EncryptionAlgorithmDTO
	 * @return
	 * @throws Exception 
	 */
	public ActionResult submitEncryptionAlgorithm(EncryptionAlgorithmDTO encryptionAlgorithmDTO) throws Exception {
		//检查数据的合法性
		if (this.validateEncryptionAlgorithmName(encryptionAlgorithmDTO.getEncryptionAlgorithmName())) {
			String exceptionMessage = ExceptionCodeConst.SYSTEM_EXCEPTION_CODE + "算法名称已存在，请重新输入.";
			LoggerUtil.instance(this.getClass()).error(exceptionMessage);
			throw new RuntimeException(exceptionMessage);
		}
		//保存算法信息
		EncryptionAlgorithmEntity encryptionAlgorithmEntity = new EncryptionAlgorithmEntity();
		BaseDTO.dtoToEntity(encryptionAlgorithmDTO, encryptionAlgorithmEntity);
		this.algorithmConfigDAO.insert(encryptionAlgorithmEntity);
		//保存算法DLL信息
		if (encryptionAlgorithmEntity.getEncryptionAlgorithmType().equals(
				String.valueOf(EncryptionAlgorithmTypeEnum.FILE_ENCRYPTION.ordinal()))) {
			AlgorithmDllEntity algorithmDllEntity = new AlgorithmDllEntity();
			BaseDTO.dtoToEntity(encryptionAlgorithmDTO, algorithmDllEntity);
			algorithmDllEntity.setEncryptionAlgorithmId(encryptionAlgorithmEntity.getEncryptionAlgorithmId());
			this.algorithmConfigDAO.insert(algorithmDllEntity);
		}
		//返回处理结果.
		return ActionResultUtil.getActionResult(encryptionAlgorithmEntity.getEncryptionAlgorithmId(), "新建算法成功");
	}
	
	/**
	 * @param encryptionAlgorithmName
	 * @return
	 */
	private boolean validateEncryptionAlgorithmName(String encryptionAlgorithmName) {
		EncryptionAlgorithmEntity encryptionAlgorithmEntity = 
				this.algorithmConfigDAO.getEncryptionAlgorithmByName(encryptionAlgorithmName);
		return encryptionAlgorithmEntity != null ? true : false; 
	}

	/**
	 * 更新算法信息
	 * @param EncryptionAlgorithmDTO
	 * @return
	 * @throws Exception
	 */
	public ActionResult modifyEncryptionAlgorithm(EncryptionAlgorithmDTO encryptionAlgorithmDTO) throws Exception {
		//更新算法信息
		EncryptionAlgorithmEntity encryptionAlgorithmEntity = 
				this.algorithmConfigDAO.getEncryptionAlgorithmEntityById(encryptionAlgorithmDTO.getEncryptionAlgorithmId());
		BaseDTO.dtoToEntity(encryptionAlgorithmDTO, encryptionAlgorithmEntity);
		this.algorithmConfigDAO.update(encryptionAlgorithmEntity);
		//删除旧算法DLL信息
		AlgorithmDllEntity algorithmDllEntity = 
				this.algorithmConfigDAO.getAlgorithmDllEntityById(encryptionAlgorithmDTO.getAlgorithmDllId());
		if (algorithmDllEntity != null) {
			this.algorithmConfigDAO.delete(algorithmDllEntity);
		}
		if (encryptionAlgorithmEntity.getEncryptionAlgorithmType().equals(
				String.valueOf(EncryptionAlgorithmTypeEnum.FILE_ENCRYPTION.ordinal()))) {
			//添加算法DLL信息
			AlgorithmDllEntity newAlgorithmDllEntity = new AlgorithmDllEntity();
			BaseDTO.dtoToEntity(encryptionAlgorithmDTO, newAlgorithmDllEntity);
			newAlgorithmDllEntity.setEncryptionAlgorithmId(encryptionAlgorithmEntity.getEncryptionAlgorithmId());
			this.algorithmConfigDAO.insert(newAlgorithmDllEntity);
		}
		//返回处理结果.
		return ActionResultUtil.getActionResult(encryptionAlgorithmEntity.getEncryptionAlgorithmId(), "修改算法成功");
	}
	
	/**
	 * 删除算法信息
	 * @param encryptionAlgorithmId
	 * @return
	 * @throws Exception 
	 */
	public ActionResult deleteEncryptionAlgorithm(String encryptionAlgorithmId) throws Exception {
		//检查数据的合法性
		List<TaskStrategyEntity> list = this.algorithmConfigDAO.getTaskStrategyListByEncryptionAlgorithm(encryptionAlgorithmId);
		if (list.size() > 0) {
			String exceptionMessage = ExceptionCodeConst.SYSTEM_EXCEPTION_CODE + "该算法已被使用，不能删除.";
			LoggerUtil.instance(this.getClass()).error(exceptionMessage);
			throw new RuntimeException(exceptionMessage);
		}
		//删除算法DLL信息
		AlgorithmDllEntity algorithmDllEntity = 
				this.algorithmConfigDAO.getAlgorithmDllEntityByEncryptionAlgorithmId(encryptionAlgorithmId);
		if (algorithmDllEntity != null) {
			this.algorithmConfigDAO.delete(algorithmDllEntity);
		}
		//删除算法信息
				this.algorithmConfigDAO.deleteEncryptionAlgorithmById(encryptionAlgorithmId);
		//返回处理结果.
		return ActionResultUtil.getActionResult(encryptionAlgorithmId, "删除算法成功");
	}
	
	/**
	 * 根据加密算法ID获取加密算法信息
	 * @return
	 */
	public EncryptionAlgorithmDTO getEncryptionAlgorithmById(String encryptionAlgorithmId){
		return this.algorithmConfigDAO.getEncryptionAlgorithmById(encryptionAlgorithmId);
	}
	

}