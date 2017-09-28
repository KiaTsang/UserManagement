package ecp.bsp.business.file.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import ecp.bsp.business.file.dao.impl.OperatorConfigDAO;
import ecp.bsp.business.file.dto.OperatorDTO;
import ecp.bsp.business.file.entity.OperatorEntity;
import ecp.bsp.business.file.entity.TaskStrategyEntity;
import ecp.bsp.system.commons.constant.ExceptionCodeConst;
import ecp.bsp.system.commons.dto.ActionResult;
import ecp.bsp.system.commons.utils.ActionResultUtil;
import ecp.bsp.system.commons.utils.LoggerUtil;
import ecp.bsp.system.core.BaseDTO;

/**
 * 运营商配置信息服务层
 * 
 * @since 2015-06-15 <br>
 * 
 * @author zengqingyue.
 * 
 */
@Service
@Transactional(propagation = Propagation.REQUIRED)
public class OperatorConfigService {
	@Resource
	private OperatorConfigDAO operatorConfigDAO;

	/**
	 * 提交运营商信息
	 * @param OperatorDTO
	 * @return
	 * @throws Exception 
	 */
	public ActionResult submitOperator(OperatorDTO operatorDTO) throws Exception {
		//检查数据的合法性
		if (this.validateOperatorByName(operatorDTO.getOperatorName())) {
			String exceptionMessage = ExceptionCodeConst.SYSTEM_EXCEPTION_CODE + "运营商名称已存在，请重新输入.";
			LoggerUtil.instance(this.getClass()).error(exceptionMessage);
			throw new RuntimeException(exceptionMessage);
		}
		//保存运营商信息
		OperatorEntity operatorEntity = new OperatorEntity();
		BaseDTO.dtoToEntity(operatorDTO, operatorEntity);
		this.operatorConfigDAO.saveOperator(operatorEntity);
		//返回处理结果.
		return ActionResultUtil.getActionResult(operatorEntity.getOperatorId(), "新建运营商成功");
	}
	
	/**
	 * 更新运营商信息
	 * @param OperatorDTO
	 * @return
	 * @throws Exception
	 */
	public ActionResult modifyOperator(OperatorDTO operatorDTO) throws Exception {
		//更新运营商信息
		OperatorEntity operatorEntity = this.operatorConfigDAO.getOperatorEntityById(operatorDTO.getOperatorId());
		operatorEntity.setOperatorDesc(operatorDTO.getOperatorDesc());
		this.operatorConfigDAO.update(operatorEntity);
		//返回处理结果.
		return ActionResultUtil.getActionResult(operatorEntity.getOperatorId(), "修改运营商成功");
	}
	
	/**
	 * 删除运营商信息
	 * @param OperatorId
	 * @return
	 * @throws Exception 
	 */
	public ActionResult deleteOperator(String operatorId) throws Exception {
		//检查数据的合法性
		List<TaskStrategyEntity> list = this.operatorConfigDAO.getTaskStrategyListByOperator(operatorId);
		if (list.size() > 0) {
			String exceptionMessage = ExceptionCodeConst.SYSTEM_EXCEPTION_CODE + "该运营商已被使用，不能删除.";
			LoggerUtil.instance(this.getClass()).error(exceptionMessage);
			throw new RuntimeException(exceptionMessage);
		}
		//删除运营商
		this.operatorConfigDAO.deleteOperatorById(operatorId);
		//返回处理结果.
		return ActionResultUtil.getActionResult(operatorId, "删除运营商成功");
	}
	
	/**
	 * 获取运营商信息列表
	 * @return
	 */
	public List<OperatorDTO> getOperatorList() {
		return this.operatorConfigDAO.getOperatorList();
	}
	
	/**
	 * 检查运营商名称是否存在
	 * @param OperatorName
	 * @return
	 */
	private boolean validateOperatorByName(String operatorName) {
		OperatorEntity operatorEntity = this.operatorConfigDAO.getOperatorByName(operatorName);
		return operatorEntity != null ? true : false; 
	}

}