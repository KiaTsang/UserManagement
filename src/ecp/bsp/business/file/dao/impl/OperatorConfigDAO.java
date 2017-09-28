package ecp.bsp.business.file.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import ecp.bsp.business.file.constant.FileConfigConst;
import ecp.bsp.business.file.dto.OperatorDTO;
import ecp.bsp.business.file.entity.OperatorEntity;
import ecp.bsp.business.file.entity.TaskStrategyEntity;
import ecp.bsp.system.core.BaseDAO;
/**
 * 运营商配置信息DAO层
 * 
 * @since 2015-06-08 <br>
 * 
 * @author zengqingyue.
 * 
 */
@Repository
public class OperatorConfigDAO extends BaseDAO{

	/**
	 * @param OperatorEntity
	 * @return
	 * @throws Exception 
	 */
	public void saveOperator(OperatorEntity operatorEntity) throws Exception {
		this.insert(operatorEntity);
	}

	/**
	 * 根据运营商ID获取运营商实体
	 * @param OperatorId
	 * @return
	 */
	public OperatorEntity getOperatorEntityById(String operatorId) {
		return this.getEntity(OperatorEntity.class, operatorId);
	}
	
	/**
	 * 根据运营商名称获取运营商实体
	 * @param OperatorName
	 * @return
	 */
	public OperatorEntity getOperatorByName(String operatorName) {
		return this.getEntity(OperatorEntity.class, new String[]{FileConfigConst.PARAM_ENTITY_OPERATOR_NAME},
				new Object[]{operatorName});
	}

	/**
	 * 根据运营商ID删除运营商实体
	 * @param OperatorId
	 * @throws Exception
	 */
	public void deleteOperatorById(String operatorId) throws Exception {
		this.delete(OperatorEntity.class,operatorId);
	}

	/**
	 * 获取运营商信息列表
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<OperatorDTO> getOperatorList() {
		return (List<OperatorDTO>) this.query(FileConfigConst.SQL_GET_OPERATOR_LIST, OperatorDTO.class);
	}

	/**
	 * 根据运营商ID获取任务策略列表信息
	 * @param OperatorId
	 * @return
	 */
	public List<TaskStrategyEntity> getTaskStrategyListByOperator(String operatorId) {
		return (List<TaskStrategyEntity>) this.getEntityList(TaskStrategyEntity.class, 
				FileConfigConst.PARAM_ENTITY_OPERATOR_ID,operatorId,null);
	}
}
