package ecp.bsp.business.file.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import ecp.bsp.business.file.constant.TaskConst;
import ecp.bsp.business.file.dto.EncryptionAlgorithmDTO;
import ecp.bsp.business.file.dto.ReportRuleDTO;
import ecp.bsp.business.file.dto.TaskStrategyDTO;
import ecp.bsp.business.file.entity.EncryptionAlgorithmEntity;
import ecp.bsp.business.file.entity.ReportTaskEntity;
import ecp.bsp.business.file.entity.StrategyInfoEntity;
import ecp.bsp.business.file.entity.TaskCustomerEntity;
import ecp.bsp.business.file.entity.TaskReviewerEntity;
import ecp.bsp.business.file.entity.TaskStrategyEntity;
import ecp.bsp.system.core.BaseDAO;
/**
 * 任务策略信息DAO层
 * 
 * @since 2015-06-25
 * 
 * @author zengqingyue.
 * 
 */
@Repository
public class TaskStrategyDAO extends BaseDAO{

	/**
	 * 根据策略名称获取策略信息实体
	 * @param strategyName
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<TaskStrategyEntity> getTaskStrategyInfoByName(String taskStrategyName) {
		return (List<TaskStrategyEntity>)this.query(TaskConst.SQL_GET_TASK_STRATEGY_INFO_BY_NAME, 
				new Object[]{taskStrategyName}, TaskStrategyEntity.class);
	}
	
	/**
	 * 根据策略名称和ID获取策略信息实体
	 * @param strategyName
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<TaskStrategyEntity> getTaskStrategyInfoByName(String taskStrategyName,String taskStrategyId) {
		return (List<TaskStrategyEntity>)this.query(TaskConst.SQL_GET_TASK_STRATEGY_INFO_BY_ID, 
				new Object[]{taskStrategyName,taskStrategyId}, TaskStrategyEntity.class);
	}

	/**
	 * 根据任务策略ID获取未完成的报表任务信息列表
	 * @param taskStrategyId
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<ReportTaskEntity> getNotFinishedReportTask(String taskStrategyId) {
		return (List<ReportTaskEntity>)this.query(TaskConst.SQL_GET_NOT_FINISHED_REPORT_TASK, 
				new Object[]{taskStrategyId}, ReportTaskEntity.class);
	}

	/**
	 * 根据ID获取任务策略信息实体
	 * @param taskStrategyId
	 * @return
	 */
	public TaskStrategyEntity getTaskStrategyEntityById(String taskStrategyId) {
		return this.getEntity(TaskStrategyEntity.class, taskStrategyId);
	}

	/**
	 * 根据主键ID获取策略信息实体
	 * @param strategyInfoId
	 * @return
	 */
	public StrategyInfoEntity getStrategyInfoEntityById(String strategyInfoId) {
		return this.getEntity(StrategyInfoEntity.class, strategyInfoId);
	}

	/**
	 * 获取算法信息列表
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<EncryptionAlgorithmDTO> getEncryptionAlgorithmList() {
		return (List<EncryptionAlgorithmDTO>)this.query(TaskConst.SQL_GET_ENCRYPTION_ALGORITHM_LIST, EncryptionAlgorithmDTO.class);
	}

	/**
	 * 获取任务策略列表信息
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<TaskStrategyDTO> getTaskStrategyList() {
		return (List<TaskStrategyDTO>)this.query(TaskConst.SQL_GET_TASK_STRATEGY_INFO_LIST, TaskStrategyDTO.class);
	}
	/**
	 * 获取已启用的任务策略列表信息
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<TaskStrategyDTO> getUsedTaskStrategyList() {
		return (List<TaskStrategyDTO>)this.query(TaskConst.SQL_GET_USED_TASK_STRATEGY_INFO_LIST, TaskStrategyDTO.class);
	}
	/**
	 * 根据任务策略信息ID获取任务策略信息列表
	 * @param taskStrategyId
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public TaskStrategyDTO getTaskStrategyInfoById(String taskStrategyId) {
		List<TaskStrategyDTO> list = 
				(List<TaskStrategyDTO>)this.query(TaskConst.SQL_GET_TASK_STRATEGY_INFO_BY_TASK_STRATEGY_ID, 
						new Object[]{taskStrategyId},TaskStrategyDTO.class);
		return list.size() > 0 ? list.get(0) : null;
	}
	
	/**
	 * 根据任务策略信息ID获取报表规则信息列表
	 * @param taskStrategyId
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<ReportRuleDTO> getReportRuleList(String taskStrategyId) {
		return (List<ReportRuleDTO>)this.query(TaskConst.SQL_GET_REPORT_RULE_LIST_BY_TASK_STRATEGY_ID, 
						new Object[]{taskStrategyId},ReportRuleDTO.class);
	}

	/**
	 * 根据任务策略ID获取任务评审人信息列表
	 * @param taskStrategyId
	 * @return
	 */
	public List<TaskReviewerEntity> getTaskReviewerEntityListById(String taskStrategyId) {
		return this.getEntityList(TaskReviewerEntity.class, TaskConst.PARAM_ENTITY_TASK_STRATEGY_ID, 
				taskStrategyId, null);
	}

	/**
	 * 根据任务策略ID获取任务客户信息列表
	 * @param taskStrategyId
	 * @return
	 */
	public List<TaskCustomerEntity> getTaskCustomerEntityList(String taskStrategyId) {
		return this.getEntityList(TaskCustomerEntity.class, TaskConst.PARAM_ENTITY_TASK_STRATEGY_ID, 
				taskStrategyId, null);// TODO Auto-generated method stub
	}

	public EncryptionAlgorithmEntity getEncryptionAlgorithmEntityById(String encryptionAlgorithmId) {
		return this.getEntity(EncryptionAlgorithmEntity.class, encryptionAlgorithmId);
	}
	
}
