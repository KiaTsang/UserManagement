/****************************************************************
 ***        Copyright © EASTCOMPEACE        2015.04.22        ***
 ****************************************************************/
package ecp.bsp.business.file.service.impl;
import java.text.ParseException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.quartz.SchedulerException;
import org.quartz.Trigger;
import org.quartz.DateBuilder.IntervalUnit;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.eastcompeace.system.quartz.core.QuarzManager;
import com.eastcompeace.system.quartz.entity.JobEntity;
import com.eastcompeace.system.quartz.util.ExpressionUtils;
import com.eastcompeace.system.quartz.util.MyTriggerUtils;

import ecp.bsp.business.file.dao.impl.TaskStrategyDAO;
import ecp.bsp.business.file.dto.EncryptionAlgorithmDTO;
import ecp.bsp.business.file.dto.ReportRuleDTO;
import ecp.bsp.business.file.dto.TaskStrategyDTO;
import ecp.bsp.business.file.entity.ReportRuleEntity;
import ecp.bsp.business.file.entity.ReportTaskEntity;
import ecp.bsp.business.file.entity.StrategyInfoEntity;
import ecp.bsp.business.file.entity.TaskBrandEntity;
import ecp.bsp.business.file.entity.TaskCustomerEntity;
import ecp.bsp.business.file.entity.TaskEmailReceiverEntity;
import ecp.bsp.business.file.entity.TaskQuartzEntity;
import ecp.bsp.business.file.entity.TaskReportRuleEntity;
import ecp.bsp.business.file.entity.TaskReviewerEntity;
import ecp.bsp.business.file.entity.TaskStrategyEntity;
import ecp.bsp.business.file.job.ReportTaskJob;
import ecp.bsp.business.file.myenum.OperateTypeEnum;
import ecp.bsp.business.file.myenum.ReportSendTypeEnum;
import ecp.bsp.business.file.myenum.SendMailInformTypeEnum;
import ecp.bsp.business.file.myenum.UsageStatusEnum;
import ecp.bsp.system.commons.dto.ActionResult;
import ecp.bsp.system.commons.utils.ActionResultUtil;
import ecp.bsp.system.commons.utils.LoggerUtil;
import ecp.bsp.system.commons.utils.StringUtils;
import ecp.bsp.system.core.BaseDTO;

import com.eastcompeace.paapermit.value.GetUserInfoResM;

import ecp.bsp.system.commons.utils.PAAUserUtil;

/**
 * 任务策略信息服务层
 * 
 * @since 2015-06-25
 * 
 * @author zengqingyue.
 * 
 */
@Service
@Transactional(propagation = Propagation.REQUIRED)
public class TaskStrategyService {
	@Resource
	private TaskStrategyDAO taskStrategyDAO;

	/**
	 * 提交任务策略信息
	 * @param taskStrategyDTO
	 * @return
	 * @throws Exception 
	 */
	public ActionResult submitTaskStrategy(TaskStrategyDTO taskStrategyDTO) throws Exception {
		//检查数据合法性
		if (this.validateTaskStrategyInfoByName(taskStrategyDTO.getTaskStrategyName())) {
			String exceptionMessage = "该策略名称已存在，请重新输入.";
			LoggerUtil.instance(this.getClass()).error(exceptionMessage);
			throw new RuntimeException(exceptionMessage);
		}
		//保存任务策略的所有信息
		this.saveTaskStrategyInfo(taskStrategyDTO);
		//上传类型为自动时，保存调度任务
		this.saveQuartzTaskInfo(taskStrategyDTO);
		//返回处理结果
		return ActionResultUtil.getActionResult(taskStrategyDTO.getStrategyInfoId(), "新建任务策略信息成功");
	}

	/**
	 * 修改任务策略信息
	 * @param taskStrategyDTO
	 * @return
	 * @throws Exception 
	 */
	public ActionResult modifyTaskStrategy(TaskStrategyDTO taskStrategyDTO) throws Exception {
		//检查数据合法性
		List<ReportTaskEntity> reportTaskList = this.taskStrategyDAO.getNotFinishedReportTask(taskStrategyDTO.getTaskStrategyId());
		if (this.validateTaskStrategyNameById(taskStrategyDTO.getTaskStrategyName(),taskStrategyDTO.getTaskStrategyId())) {
			String exceptionMessage = "该策略名称已存在，请重新输入.";
			LoggerUtil.instance(this.getClass()).error(exceptionMessage);
			throw new RuntimeException(exceptionMessage);
		}
		if (reportTaskList.size() > 0) {
			String exceptionMessage = "该任务策略生成的报表任务还未结束，无法修改.";
			LoggerUtil.instance(this.getClass()).error(exceptionMessage);
			throw new RuntimeException(exceptionMessage);
		}
		//更新任务策略信息
		TaskStrategyEntity oldTaskStrategyEntity = this.taskStrategyDAO.getTaskStrategyEntityById(taskStrategyDTO.getTaskStrategyId());
		oldTaskStrategyEntity.setIsFinalVersion("0");
		this.taskStrategyDAO.update(oldTaskStrategyEntity);
		//删除旧的调度任务
		this.deleteQuartzTaskInfo(taskStrategyDTO);
		//保存任务策略的所有信息
		TaskStrategyEntity newTaskStrategyEntity = this.saveTaskStrategyInfo(taskStrategyDTO);
		//上传类型为自动时，保存新的调度任务
		this.saveQuartzTaskInfo(taskStrategyDTO);
		//返回处理结果
		return ActionResultUtil.getActionResult(newTaskStrategyEntity.getTaskStrategyId(), "修改任务策略信息成功");
	}

	/**
	 * 停用任务策略信息
	 * @param taskStrategyDTO
	 * @return
	 * @throws Exception 
	 */
	public ActionResult stopTaskStrategy(TaskStrategyDTO taskStrategyDTO) throws Exception {
		//更新策略信息
		StrategyInfoEntity strategyInfoEntity = this.taskStrategyDAO.getStrategyInfoEntityById(taskStrategyDTO.getStrategyInfoId());
		strategyInfoEntity.setUsageStatusId(String.valueOf(UsageStatusEnum.DISABLE.ordinal()));
		this.taskStrategyDAO.update(strategyInfoEntity);
		//停止任务调度信息
		this.stopQuartzTaskInfo(taskStrategyDTO);
		//返回处理结果
		return ActionResultUtil.getActionResult(taskStrategyDTO.getStrategyInfoId(), "任务策略停用成功");
	}

	/**
	 * 启用任务策略信息
	 * @param taskStrategyDTO
	 * @return
	 * @throws Exception 
	 */
	public ActionResult resumeTaskStrategy(TaskStrategyDTO taskStrategyDTO) throws Exception {
		//更新策略信息
		StrategyInfoEntity strategyInfoEntity = this.taskStrategyDAO.getStrategyInfoEntityById(taskStrategyDTO.getStrategyInfoId());
		strategyInfoEntity.setUsageStatusId(String.valueOf(UsageStatusEnum.ENABLE.ordinal()));
		this.taskStrategyDAO.update(strategyInfoEntity);
		//恢复任务调度信息
		this.resumeQuartzTaskInfo(taskStrategyDTO);
		//返回处理结果
		return ActionResultUtil.getActionResult(taskStrategyDTO.getStrategyInfoId(), "任务策略启用成功");
	}

	/**
	 * 保存任务策略的所有信息
	 * @param taskStrategyDTO
	 * @param strategyInfoId
	 * @return
	 * @throws Exception
	 */
	private TaskStrategyEntity saveTaskStrategyInfo(TaskStrategyDTO taskStrategyDTO) throws Exception{
		//保存策略信息
		StrategyInfoEntity strategyInfoEntity = null;
		if (!StringUtils.isValidateString((taskStrategyDTO.getStrategyInfoId()))) {
			strategyInfoEntity = new StrategyInfoEntity();
			BaseDTO.dtoToEntity(taskStrategyDTO, strategyInfoEntity);
			strategyInfoEntity.setCreateTime(new Date());
			strategyInfoEntity.setUsageStatusId(String.valueOf(UsageStatusEnum.ENABLE.ordinal()));
			taskStrategyDTO.setStrategyInfoId(strategyInfoEntity.getStrategyInfoId());
		}
		//保存任务策略信息
		TaskStrategyEntity taskStrategyEntity = new TaskStrategyEntity();
		BaseDTO.dtoToEntity(taskStrategyDTO, taskStrategyEntity);
		taskStrategyEntity.setStrategyInfoId(taskStrategyDTO.getStrategyInfoId());
		taskStrategyEntity.setCreateTime(new Date());
		taskStrategyEntity.setIsFinalVersion("1");
		taskStrategyDTO.setTaskStrategyId(taskStrategyEntity.getTaskStrategyId());
		if (strategyInfoEntity != null) {
			this.taskStrategyDAO.insert(strategyInfoEntity);
		}
		this.taskStrategyDAO.insert(taskStrategyEntity);
		//保存评审人信息
		if (StringUtils.isValidateString(taskStrategyDTO.getTaskReviewerIds())) {
			String[] taskReviewers = taskStrategyDTO.getTaskReviewerIds().split(",");
			for (String reviewerId : taskReviewers) {
				GetUserInfoResM userInfo = PAAUserUtil.getUserInfoByUserId(Integer.parseInt(reviewerId));
				TaskReviewerEntity taskReviewerEntity = new TaskReviewerEntity();
				taskReviewerEntity.setTaskStrategyId(taskStrategyEntity.getTaskStrategyId());
				taskReviewerEntity.setPaaEmployeeId(reviewerId);
				taskReviewerEntity.setPaaUsername(userInfo.getUser_fullname());
				this.taskStrategyDAO.insert(taskReviewerEntity);
			}
		}
		//保存品牌信息
		if (StringUtils.isValidateString(taskStrategyDTO.getBrandIds())) {
			String[] brandIds = taskStrategyDTO.getBrandIds().split(",");
			for (String brandId : brandIds) {
				TaskBrandEntity taskBrandEntity = new TaskBrandEntity();
				taskBrandEntity.setTaskStrategyId(taskStrategyEntity.getTaskStrategyId());
				taskBrandEntity.setBrandId(brandId);
				this.taskStrategyDAO.insert(taskBrandEntity);
			}
		}
		//加密类型为手动时，保存客户信息
		if (StringUtils.isValidateString(taskStrategyDTO.getCustomerIds()) && 
				taskStrategyDTO.getEncryptionOperatorTypeId().equals(String.valueOf(OperateTypeEnum.MANUALLY.ordinal()))) {
			String[] customerIds = taskStrategyDTO.getCustomerIds().split(",");
			for (String customerId : customerIds) {
				TaskCustomerEntity taskCustomerEntity = new TaskCustomerEntity();
				taskCustomerEntity.setTaskStrategyId(taskStrategyEntity.getTaskStrategyId());
				taskCustomerEntity.setPaaEmployeeId(customerId);
				this.taskStrategyDAO.insert(taskCustomerEntity);
			}
		}
		//报表外发成功以后，如果发送通知邮件，保存主收人信息
		if (StringUtils.isValidateString(taskStrategyDTO.getSendSucInformReceiverIds()) && 
				taskStrategyDTO.getIsSendSucMailInform().equals(String.valueOf(SendMailInformTypeEnum.SEND_EMAILINFORM.ordinal()))) {
			String[] sendSucInformReceiverIds = taskStrategyDTO.getSendSucInformReceiverIds().split(",");
			for (String sendSucInformReceiverId : sendSucInformReceiverIds) {
				TaskEmailReceiverEntity taskEmailReceiverEntity = new TaskEmailReceiverEntity();
				taskEmailReceiverEntity.setTaskStrategyId(taskStrategyEntity.getTaskStrategyId());
				taskEmailReceiverEntity.setEmailReceiverId(sendSucInformReceiverId);
				taskEmailReceiverEntity.setEmailReceiverType("2");
				this.taskStrategyDAO.insert(taskEmailReceiverEntity);
			}
		}
		//报表外发成功以后，如果发送通知邮件，保存抄送人信息
		if (StringUtils.isValidateString(taskStrategyDTO.getSendSucInformCcIds()) && 
				taskStrategyDTO.getIsSendSucMailInform().equals(String.valueOf(SendMailInformTypeEnum.SEND_EMAILINFORM.ordinal()))) {
			String[] sendSucInformCcIds = taskStrategyDTO.getSendSucInformCcIds().split(",");
			for (String sendSucInformCcId : sendSucInformCcIds) {
				TaskEmailReceiverEntity taskEmailReceiverEntity = new TaskEmailReceiverEntity();
				taskEmailReceiverEntity.setTaskStrategyId(taskStrategyEntity.getTaskStrategyId());
				taskEmailReceiverEntity.setEmailReceiverId(sendSucInformCcId);
				taskEmailReceiverEntity.setEmailReceiverType("3");
				this.taskStrategyDAO.insert(taskEmailReceiverEntity);
			}
		}
		//外发类型为e-mail时，保存邮箱主收人信息
		if (StringUtils.isValidateString(taskStrategyDTO.getEmailReceiverIds()) && 
				taskStrategyDTO.getReportSendTypeId().equals(String.valueOf(ReportSendTypeEnum.EMAIL.ordinal()))) {
			String[] emailReceiverIds = taskStrategyDTO.getEmailReceiverIds().split(",");
			for (String emailReceiverId : emailReceiverIds) {
				TaskEmailReceiverEntity taskEmailReceiverEntity = new TaskEmailReceiverEntity();
				taskEmailReceiverEntity.setTaskStrategyId(taskStrategyEntity.getTaskStrategyId());
				taskEmailReceiverEntity.setEmailReceiverId(emailReceiverId);
				taskEmailReceiverEntity.setEmailReceiverType("1");
				this.taskStrategyDAO.insert(taskEmailReceiverEntity);
			}
		}
		//外发类型为e-mail时，保存邮箱抄送人信息
		if (StringUtils.isValidateString(taskStrategyDTO.getEmailCcIds()) && 
				taskStrategyDTO.getReportSendTypeId().equals(String.valueOf(ReportSendTypeEnum.EMAIL.ordinal()))) {
			String[] emailCcIds = taskStrategyDTO.getEmailCcIds().split(",");
			for (String emailCcId : emailCcIds) {
				TaskEmailReceiverEntity taskEmailReceiverEntity = new TaskEmailReceiverEntity();
				taskEmailReceiverEntity.setTaskStrategyId(taskStrategyEntity.getTaskStrategyId());
				taskEmailReceiverEntity.setEmailReceiverId(emailCcId);
				taskEmailReceiverEntity.setEmailReceiverType("0");
				this.taskStrategyDAO.insert(taskEmailReceiverEntity);
			}
		}
		//上传类型为自动时，保存任务调度信息
		if (taskStrategyDTO.getUploadOperatorTypeId().equals(String.valueOf(OperateTypeEnum.AUTOMATIC.ordinal()))) {
			TaskQuartzEntity taskQuartzEntity = new TaskQuartzEntity();
			BaseDTO.dtoToEntity(taskStrategyDTO, taskQuartzEntity);
			this.taskStrategyDAO.insert(taskQuartzEntity);
		}
		//保存报表规则和任务报表规则信息
		List<ReportRuleDTO> reportRuleList = taskStrategyDTO.getReportRuleList();
		if (reportRuleList != null) {
			for (ReportRuleDTO reportRuleDTO : reportRuleList) {
				ReportRuleEntity reportRuleEntity =  new ReportRuleEntity();
				BaseDTO.dtoToEntity(reportRuleDTO, reportRuleEntity);
				this.taskStrategyDAO.insert(reportRuleEntity);
				TaskReportRuleEntity taskReportRuleEntity = new TaskReportRuleEntity();
				taskReportRuleEntity.setReportRuleId(reportRuleEntity.getReportRuleId());
				taskReportRuleEntity.setTaskStrategyId(taskStrategyDTO.getTaskStrategyId());
				this.taskStrategyDAO.insert(taskReportRuleEntity);
			}
		}
		
		return taskStrategyEntity;
	}
	
	/**
	 * 保存调度任务信息
	 * @param taskStrategyDTO
	 * @throws ParseException 
	 * @throws SchedulerException 
	 */
	@SuppressWarnings("deprecation")
	public void saveQuartzTaskInfo(TaskStrategyDTO taskStrategyDTO) throws SchedulerException, ParseException {
		//上传类型为自动时，保存调度信息
		if (taskStrategyDTO.getUploadOperatorTypeId().equals(String.valueOf(OperateTypeEnum.AUTOMATIC.ordinal()))) {
			String[] quartzTime = taskStrategyDTO.getTaskQuartzTime().split(":");
			//封装调度开始时间
			Date quartStartDate = new Date();
			quartStartDate.setHours(Integer.parseInt(quartzTime[0]));
			quartStartDate.setMinutes(Integer.parseInt(quartzTime[1]));
			quartStartDate.setSeconds(Integer.parseInt(quartzTime[2]));
			//设置调度周期
//			if (taskStrategyDTO.getQuartzPeriodTypeId().equals("")) {
//				
//			}
			String expression = ExpressionUtils.decorateDate2ExpressionWithInterval(quartStartDate,IntervalUnit.DAY,Integer.parseInt("1"));
			//封装调度信息
			Map<String,Object> map = new HashMap<String,Object>();
			map.put("taskStrategyDTO", taskStrategyDTO);
//			Trigger trigger = MyTriggerUtils.newSimpleTrigger(taskStrategyDTO.getTaskStrategyId(), taskStrategyDTO.getStrategyInfoId(),
//					IntervalUnit.DAY, 1, quartStartDate);
			Trigger trigger = MyTriggerUtils.newCronTrigger(taskStrategyDTO.getTaskStrategyId(), taskStrategyDTO.getStrategyInfoId(),expression);
			JobEntity jobEntity = new JobEntity(taskStrategyDTO.getTaskStrategyId(),taskStrategyDTO.getStrategyInfoId(), 
					ReportTaskJob.class, trigger);
			//创建调度任务
			QuarzManager.createJobWithTrigger(jobEntity,map,true); 
		}
	}
	
	/**
	 * 删除调度任务信息
	 * @param taskStrategyDTO
	 * @throws SchedulerException 
	 */
	private void deleteQuartzTaskInfo(TaskStrategyDTO taskStrategyDTO) throws SchedulerException {
		if(QuarzManager.checkJobExists(taskStrategyDTO.getTaskStrategyId(), taskStrategyDTO.getStrategyInfoId())){
			QuarzManager.deleteJob(taskStrategyDTO.getTaskStrategyId(), taskStrategyDTO.getStrategyInfoId());				
		}
	}
	
	/**
	 * 停用调度任务信息
	 * @param taskStrategyDTO
	 * @throws SchedulerException 
	 */
	private void stopQuartzTaskInfo(TaskStrategyDTO taskStrategyDTO) throws SchedulerException {
		if(QuarzManager.checkJobExists(taskStrategyDTO.getTaskStrategyId(), taskStrategyDTO.getStrategyInfoId())){
			QuarzManager.pauseJob(taskStrategyDTO.getTaskStrategyId(), taskStrategyDTO.getStrategyInfoId());
		}
	}
	
	/**
	 * 恢复调度任务信息
	 * @param taskStrategyDTO
	 * @throws SchedulerException 
	 */
	private void resumeQuartzTaskInfo(TaskStrategyDTO taskStrategyDTO) throws SchedulerException {
		if(QuarzManager.checkJobExists(taskStrategyDTO.getTaskStrategyId(), taskStrategyDTO.getStrategyInfoId())){
			QuarzManager.resumeJob(taskStrategyDTO.getTaskStrategyId(), taskStrategyDTO.getStrategyInfoId());
		}
	}
	
	/**
	 * 根据任务策略名称检验策略名称
	 * @param strategyName
	 * @return
	 */
	private boolean validateTaskStrategyInfoByName(String taskStrategyName) {
		List<TaskStrategyEntity> list = this.taskStrategyDAO.getTaskStrategyInfoByName(taskStrategyName);
		return list.size() > 0 ? true : false; 
	}
	
	/**
	 * 根据任务策略ID和名称检验策略名称
	 * @param strategyName
	 * @return
	 */
	private boolean validateTaskStrategyNameById(String taskStrategyName,String taskStrategyId) {
		List<TaskStrategyEntity> list = this.taskStrategyDAO.getTaskStrategyInfoByName(taskStrategyName,taskStrategyId);
		return list.size() > 0 ? true : false; 
	}
	
	
	/**
	 * 获取任务策略信息列表
	 * @return
	 */
	public List<TaskStrategyDTO> getTaskStrategyList() {
		return this.taskStrategyDAO.getTaskStrategyList();
	}
	/**
	 * 获取已启用的任务策略信息列表
	 * @return
	 */
	public List<TaskStrategyDTO> getUsedTaskStrategyList() {
		return this.taskStrategyDAO.getUsedTaskStrategyList();
	}
	/**
	 * 根据任务策略信息ID获取任务策略信息列表
	 * @param taskStrategyId
	 * @return
	 */
	public TaskStrategyDTO getTaskStrategyInfoById(String taskStrategyId) {
		return this.taskStrategyDAO.getTaskStrategyInfoById(taskStrategyId);
	}
	
	/**
	 * 获取算法信息列表
	 * @return
	 */
	public List<EncryptionAlgorithmDTO> getEncryptionAlgorithmList() {
		return this.taskStrategyDAO.getEncryptionAlgorithmList();
	}

	/**
	 * 根据任务策略信息ID获取报表规则信息列表
	 * @param taskStrategyId
	 * @return
	 */
	public List<ReportRuleDTO> getReportRuleList(String taskStrategyId) {
		return this.taskStrategyDAO.getReportRuleList(taskStrategyId);
	}
	/**
	 * 根据策略id获得策略描述
	 * @param 策略id
	 * @return
	 */
	public TaskStrategyDTO getTaskStrategyDTO(String strategyId) {
		return this.taskStrategyDAO.getTaskStrategyInfoById(strategyId);// TODO Auto-generated method stub
		
	}
}