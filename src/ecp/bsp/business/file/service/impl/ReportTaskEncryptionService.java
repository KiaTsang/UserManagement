/****************************************************************
 ***        Copyright © EASTCOMPEACE        2015.04.22        ***
 ****************************************************************/
package ecp.bsp.business.file.service.impl;

import java.io.File;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import ecp.bsp.business.file.constant.TaskConst;
import ecp.bsp.business.file.dao.impl.EmailConfigDAO;
import ecp.bsp.business.file.dao.impl.OperatorConfigDAO;
import ecp.bsp.business.file.dao.impl.ReportTaskDAO;
import ecp.bsp.business.file.dao.impl.TaskStrategyDAO;
import ecp.bsp.business.file.dto.ReportTaskAttachmentDTO;
import ecp.bsp.business.file.dto.ReportTaskEncryptionDTO;
import ecp.bsp.business.file.dto.ReportTaskReviewDTO;
import ecp.bsp.business.file.entity.EncryptionAlgorithmEntity;
import ecp.bsp.business.file.entity.OperatorEntity;
import ecp.bsp.business.file.entity.ReportTaskAttachmentEntity;
import ecp.bsp.business.file.entity.ReportTaskEncryptionEntity;
import ecp.bsp.business.file.entity.ReportTaskEntity;
import ecp.bsp.business.file.entity.ReportTaskSendEmailEntity;
import ecp.bsp.business.file.entity.ReportTaskSendEntity;
import ecp.bsp.business.file.entity.ReportTaskSendFtpEntity;
import ecp.bsp.business.file.entity.ReportTaskSendTempEntity;
import ecp.bsp.business.file.entity.TaskCustomerEntity;
import ecp.bsp.business.file.entity.TaskEmailReceiverEntity;
import ecp.bsp.business.file.entity.TaskStrategyEntity;
import ecp.bsp.business.file.myenum.EncryptionStatusEnum;
import ecp.bsp.business.file.myenum.EncryptionTypeEnum;
import ecp.bsp.business.file.myenum.OperateTypeEnum;
import ecp.bsp.business.file.myenum.RepTaskActivityTypeEnum;
import ecp.bsp.business.file.myenum.ReportSendTypeEnum;
import ecp.bsp.business.file.myenum.SendMailInformTypeEnum;
import ecp.bsp.system.commons.dto.ActionResult;
import ecp.bsp.system.commons.myenum.FinalVersionTypeEnum;
import ecp.bsp.system.commons.utils.ActionResultUtil;
import ecp.bsp.system.commons.utils.DateUtil;
import ecp.bsp.system.commons.utils.FileUtil;
import ecp.bsp.system.commons.utils.PropertiesUtil;
import ecp.bsp.system.commons.utils.ZipUtil;
import ecp.bsp.system.core.BaseDTO;
import ecp.bsp.system.framework.file.data.entity.AttachmentEntity;
import ecp.bsp.system.framework.file.impl.AttachmentService;

/**
 * 报表任务加密信息服务层
 * 
 * @since 2015-07-16
 * 
 * @author zengqingyue.
 * 
 */
@Service
@Transactional(propagation = Propagation.REQUIRED)
public class ReportTaskEncryptionService {
	
	@Resource
	private AttachmentService attachmentService;
	
	@Resource
	private EmailConfigDAO emailConfigDAO;
	
	@Resource
	private OperatorConfigDAO operatorConfigDAO;
	
	@Resource
	private ReportTaskDAO reportTaskDAO;
	
	@Resource
	private TaskStrategyDAO taskStrategyDAO;

	/**
	 * 提交报表任务加密信息
	 * @param reportTaskReviewDTO
	 * @return
	 * @throws Exception 
	 */
	public ActionResult submitReportTaskEncryption(ReportTaskEncryptionDTO reportTaskEncryptionDTO) throws Exception {
		//获取任务策略信息
		TaskStrategyEntity taskStrategyEntity = this.taskStrategyDAO.getTaskStrategyEntityById(reportTaskEncryptionDTO.getTaskStrategyId());
		//校验报表任务附件规则
//		ReportTaskDTO reportTaskDTO = new ReportTaskDTO();
//		BaseDTO.entityToDTO(taskStrategyEntity, reportTaskDTO);
//		this.reportTaskService.validateReportTaskAttachment(reportTaskDTO);
		//更新加密信息
		BaseDTO.entityToDTO(taskStrategyEntity, reportTaskEncryptionDTO);
		List<ReportTaskEncryptionEntity> reportTaskEncryptionEntityList = 
				this.reportTaskDAO.getReportTaskEncryptionListById(reportTaskEncryptionDTO.getReportTaskReviewId());
		for (ReportTaskEncryptionEntity reportTaskEncryptionEntity : reportTaskEncryptionEntityList) {
			if (reportTaskEncryptionEntity.getReportTaskEncryptionId().equals(reportTaskEncryptionDTO.getReportTaskEncryptionId())) {
				reportTaskEncryptionEntity.setEncryptionTime(new Date());
				reportTaskEncryptionEntity.setEncryptionAlgorithmId(reportTaskEncryptionDTO.getEncryptionAlgorithmId());
				reportTaskEncryptionEntity.setEncryptionDesc(reportTaskEncryptionDTO.getEncryptionDesc());
				this.reportTaskDAO.update(reportTaskEncryptionEntity);
			} else {
				//系统自动提交加密信息
				reportTaskEncryptionEntity.setEncryptionTime(new Date());
				reportTaskEncryptionEntity.setEncryptionDesc("系统自动处理");
				this.reportTaskDAO.update(reportTaskEncryptionEntity);
			}
		}
		//保存外发信息
		this.saveReportTaskSendInfo(reportTaskEncryptionDTO);
		//返回处理结果
		return ActionResultUtil.getActionResult(reportTaskEncryptionDTO.getReportTaskEncryptionId(), "报表任务加密成功.");
	}
	
	/**
	 * 保存报表任务加密信息
	 * @param reportTaskDTO
	 * @param reportReviewTypeEnum
	 * @throws Exception
	 */
	public void saveTaskEncryptionInfo(ReportTaskReviewDTO reportTaskReviewDTO) throws Exception {
		TaskStrategyEntity taskStrategyEntity = 
				this.taskStrategyDAO.getTaskStrategyEntityById(reportTaskReviewDTO.getTaskStrategyId());
		ReportTaskEncryptionDTO reportTaskEncryptionDTO = new ReportTaskEncryptionDTO();
		BaseDTO.entityToDTO(taskStrategyEntity, reportTaskEncryptionDTO);
		BaseDTO.copyObjectPropertys(reportTaskReviewDTO, reportTaskEncryptionDTO);
		
		//判断加密类型
		if (reportTaskEncryptionDTO.getEncryptionOperatorTypeId().equals(String.valueOf(OperateTypeEnum.AUTOMATIC.ordinal()))) {
			//判断是否加密
			boolean encryptionResult = true;
			if (reportTaskEncryptionDTO.getIsEncryption().equals("1")) {
				//自动加密报表任务附件
				encryptionResult = this.encryptionAttachment(reportTaskEncryptionDTO);
			} 
			//保存加密信息
			ReportTaskEncryptionEntity reportTaskEncryptionEntity = new ReportTaskEncryptionEntity();
			BaseDTO.dtoToEntity(reportTaskEncryptionDTO, reportTaskEncryptionEntity);
			reportTaskEncryptionEntity.setEncryptionTime(new Date());
			reportTaskEncryptionEntity.setPaaEmployeeId(TaskConst.PARAM_SYSTEM_MANAGER_ID);
			reportTaskEncryptionEntity.setPaaUsername(TaskConst.PARAM_SYSTEM_MANAGER_NAME);
			reportTaskEncryptionEntity.setOperatorTypeId(reportTaskEncryptionDTO.getEncryptionOperatorTypeId());
			reportTaskEncryptionEntity.setIsFinalVersion(String.valueOf(FinalVersionTypeEnum.FINAL_VERSION.ordinal()));
			if (encryptionResult) {
				reportTaskEncryptionEntity.setEncryptionDesc(TaskConst.PARAM_ENCRYPTION_SUCCESS_RESULT);
			} else {
				reportTaskEncryptionEntity.setEncryptionDesc(TaskConst.PARAM_ENCRYPTION_FAIL_RESULT);
			}
			this.reportTaskDAO.insert(reportTaskEncryptionEntity);
			
			if (encryptionResult) {
				reportTaskEncryptionDTO.setReportTaskEncryptionId(reportTaskEncryptionEntity.getReportTaskEncryptionId());
				//保存外发信息
				this.saveReportTaskSendInfo(reportTaskEncryptionDTO);
			}
		} else {
			//获取客户信息
			List<TaskCustomerEntity> taskCustomerList = 
					this.taskStrategyDAO.getTaskCustomerEntityList(reportTaskEncryptionDTO.getTaskStrategyId());
			for (TaskCustomerEntity taskCustomerEntity : taskCustomerList) {
				//保存加密信息
				ReportTaskEncryptionEntity reportTaskEncryptionEntity = new ReportTaskEncryptionEntity();
				BaseDTO.dtoToEntity(reportTaskEncryptionDTO, reportTaskEncryptionEntity);
				reportTaskEncryptionEntity.setPaaUsername(taskCustomerEntity.getPaaUsername());
				reportTaskEncryptionEntity.setPaaEmployeeId(taskCustomerEntity.getPaaEmployeeId());
				reportTaskEncryptionEntity.setOperatorTypeId(reportTaskEncryptionDTO.getEncryptionOperatorTypeId());
				reportTaskEncryptionEntity.setIsFinalVersion(String.valueOf(FinalVersionTypeEnum.FINAL_VERSION.ordinal()));
				this.reportTaskDAO.insert(reportTaskEncryptionEntity);
			}
			//更新报表任务信息
			ReportTaskEntity reportTaskEntity = this.reportTaskDAO.getReportTaskEntityById(reportTaskEncryptionDTO.getReportTaskId());
			reportTaskEntity.setRepTaskActivityTypeId(String.valueOf(RepTaskActivityTypeEnum.REPORT_ENCRYPTION.ordinal()));
			this.reportTaskDAO.update(reportTaskEntity);
		}
	}
	
	/**
	 * 保存报表任务分发信息
	 * @param reportTaskEncryptionDTO
	 * @throws Exception 
	 */
	private void saveReportTaskSendInfo(ReportTaskEncryptionDTO reportTaskEncryptionDTO) throws Exception {
		//保存分发信息
		ReportTaskSendEntity reportTaskSendEntity = new ReportTaskSendEntity();
		reportTaskSendEntity.setReportTaskEncryptionId(reportTaskEncryptionDTO.getReportTaskEncryptionId());
		reportTaskSendEntity.setReportSendTypeId(reportTaskEncryptionDTO.getReportSendTypeId());
		reportTaskSendEntity.setSendTime(new Date());
		reportTaskSendEntity.setIsSend("0");
		reportTaskSendEntity.setIsFinalVersion(String.valueOf(FinalVersionTypeEnum.FINAL_VERSION.ordinal()));
		this.reportTaskDAO.insert(reportTaskSendEntity);
		//保存分发同步信息
		if (reportTaskEncryptionDTO.getReportSendTypeId().equals(String.valueOf(ReportSendTypeEnum.EMAIL.ordinal()))) {
			List<TaskEmailReceiverEntity> taskEmailReceiverEntityList = 
					this.emailConfigDAO.getTaskEmailReceiverEntityListById(reportTaskEncryptionDTO.getTaskStrategyId());
			for (TaskEmailReceiverEntity taskEmailReceiverEntity : taskEmailReceiverEntityList) {
				ReportTaskSendEmailEntity reportTaskSendEmailEntity = new ReportTaskSendEmailEntity();
				reportTaskSendEmailEntity.setReportTaskSendId(reportTaskSendEntity.getReportTaskSendId());
				reportTaskSendEmailEntity.setEmailReceiverId(taskEmailReceiverEntity.getEmailReceiverId());
				reportTaskSendEmailEntity.setEmailReceiverType(taskEmailReceiverEntity.getEmailReceiverType());
				this.reportTaskDAO.insert(reportTaskSendEmailEntity);
			}
		} else if (reportTaskEncryptionDTO.getReportSendTypeId().equals(String.valueOf(ReportSendTypeEnum.FTP.ordinal()))) {
			ReportTaskSendFtpEntity reportTaskSendFtpEntity = new ReportTaskSendFtpEntity();
			reportTaskSendFtpEntity.setReportTaskSendId(reportTaskSendEntity.getReportTaskSendId());
			reportTaskSendFtpEntity.setFtpId(reportTaskEncryptionDTO.getReportTargetFtpId());
			this.reportTaskDAO.insert(reportTaskSendFtpEntity);
		} else {
			//第三方发送信息
		}
		//如果报表外发成功之后需要进行邮件通知
		 //（1）保存通知邮件接收人与抄送人
		TaskStrategyEntity  taskStrategyEntity=this.taskStrategyDAO.getTaskStrategyEntityById(reportTaskEncryptionDTO.getTaskStrategyId()) ;
		if(taskStrategyEntity!=null && taskStrategyEntity.getIsSendSucMailInform().equals(String.valueOf(SendMailInformTypeEnum.SEND_EMAILINFORM.ordinal())) )
		{
			List<TaskEmailReceiverEntity> taskEmailReceiverEntityList = 
					this.emailConfigDAO.getTaskEmailReceiverEntityListById(reportTaskEncryptionDTO.getTaskStrategyId());
			for (TaskEmailReceiverEntity taskEmailReceiverEntity : taskEmailReceiverEntityList) {
				if(taskEmailReceiverEntity.getEmailReceiverType().equals("2") || taskEmailReceiverEntity.getEmailReceiverType().equals("3"))
				{
				ReportTaskSendEmailEntity reportTaskSendEmailEntity = new ReportTaskSendEmailEntity();
				reportTaskSendEmailEntity.setReportTaskSendId(reportTaskSendEntity.getReportTaskSendId());
				reportTaskSendEmailEntity.setEmailReceiverId(taskEmailReceiverEntity.getEmailReceiverId());
				reportTaskSendEmailEntity.setEmailReceiverType(taskEmailReceiverEntity.getEmailReceiverType());
				this.reportTaskDAO.insert(reportTaskSendEmailEntity);
			    }
			}
			//（2）要将ReportTaskSendEntity的信息初始化
			reportTaskSendEntity.setIsSendSucinformemail("1");
			reportTaskSendEntity.setResultSendSucinformemail("0");
			reportTaskSendEntity.setTimeSendSucinformemail(0);
			this.reportTaskDAO.insert(reportTaskSendEntity);
		}
		else
		{
			//（2）要将ReportTaskSendEntity的信息初始化
			reportTaskSendEntity.setIsSendSucinformemail("0");
			reportTaskSendEntity.setResultSendSucinformemail("0");
			reportTaskSendEntity.setTimeSendSucinformemail(0);
			this.reportTaskDAO.insert(reportTaskSendEntity);
		}
		//更新报表任务信息
		ReportTaskEntity reportTaskEntity = this.reportTaskDAO.getReportTaskEntityById(reportTaskEncryptionDTO.getReportTaskId());
		reportTaskEntity.setRepTaskActivityTypeId(String.valueOf(RepTaskActivityTypeEnum.REPORT_SEND.ordinal()));
		this.reportTaskDAO.update(reportTaskEntity);
		//保存临时表信息
		OperatorEntity operatorEntity = this.operatorConfigDAO.getOperatorEntityById(reportTaskEncryptionDTO.getOperatorId());
		ReportTaskSendTempEntity reportTaskSendTempEntity = new ReportTaskSendTempEntity();
		reportTaskSendTempEntity.setReportTaskSendId(reportTaskSendEntity.getReportTaskSendId());
		reportTaskSendTempEntity.setReportTaskId(reportTaskEncryptionDTO.getReportTaskId());
		reportTaskSendTempEntity.setIsEncryption(reportTaskEncryptionDTO.getIsEncryption());
		reportTaskSendTempEntity.setReportTaskName(reportTaskEntity.getReportTaskName());
		reportTaskSendTempEntity.setOperatorName(operatorEntity.getOperatorName());
		this.reportTaskDAO.insert(reportTaskSendTempEntity);
	}

	/**
	 * 加密任务附件
	 * @param reportTaskEncryptionDTO
	 * @return
	 * @throws Exception 
	 */
	private boolean encryptionAttachment(ReportTaskEncryptionDTO reportTaskEncryptionDTO) throws Exception {
		OperatorEntity operatorEntity = this.operatorConfigDAO.getOperatorEntityById(reportTaskEncryptionDTO.getOperatorId());
		String dayTime = DateUtil.dateToString(new Date(), DateUtil.LONG_DATE_FORMAT);
		String zipName = operatorEntity.getOperatorName() + dayTime + ".zip";
		PropertiesUtil propertiesUtil = new PropertiesUtil(TaskConst.PROPERTIES_NAME_FILE_DIR_PATH);
		String encryptionPath = propertiesUtil.readPropertiesByName(TaskConst.PROPERTIES_KEY_ENCRYPTION_PATH);
		String encryptionFileLocalPath = encryptionPath + File.separator + dayTime + File.separator + 
				reportTaskEncryptionDTO.getReportTaskId();
		//获取算法信息
		EncryptionAlgorithmEntity encryptionAlgorithmEntity = 
				this.taskStrategyDAO.getEncryptionAlgorithmEntityById(reportTaskEncryptionDTO.getEncryptionAlgorithmId());
		//附件加密
		if (encryptionAlgorithmEntity.getEncryptionAlgorithmType().equals(String.valueOf(EncryptionTypeEnum.RAR_ENCRYPTION.ordinal()))) {
			FileUtil.generateDerectory(encryptionFileLocalPath);
			//获取报表任务附件信息
			List<ReportTaskAttachmentDTO> reportTaskAttachmentDTOList = 
					this.reportTaskDAO.getReportTaskAttachmentByReportTaskId(reportTaskEncryptionDTO.getReportTaskId());
			for (ReportTaskAttachmentDTO reportTaskAttachmentDTO : reportTaskAttachmentDTOList) {
				//压缩文件
				ZipUtil.zip(reportTaskAttachmentDTO.getAttachmentPath()+File.separator+reportTaskAttachmentDTO.getAttachmentName(), 
						encryptionFileLocalPath + File.separator + zipName, encryptionAlgorithmEntity.getEncryptionAlgorithmKey());
			}
		} else if (encryptionAlgorithmEntity.getEncryptionAlgorithmType().equals(String.valueOf(EncryptionTypeEnum.FILE_ENCRYPTION.ordinal()))) {
			//调用第三方动态库加密算法(后续升级补充)
		}
		//保存附件信息
		String createId = String.valueOf(new Date().getTime())+"_"+zipName;
		AttachmentEntity attachmentEntity = new AttachmentEntity();
		attachmentEntity.setAttachmentCreateId(createId);
		attachmentEntity.setAttachmentName(zipName);
		attachmentEntity.setAttachmentRename(createId);
		attachmentEntity.setAttachmentPath(encryptionFileLocalPath);
		attachmentEntity.setAttachmentCreateTime(new Date());
		//保存报表任务附件信息（系统加密）
		ReportTaskAttachmentEntity reportTaskAttachmentEntity = new ReportTaskAttachmentEntity();
		reportTaskAttachmentEntity.setAttachmentId(attachmentEntity.getAttachmentId());
		reportTaskAttachmentEntity.setReportTaskId(reportTaskEncryptionDTO.getReportTaskId());
		reportTaskAttachmentEntity.setRepTaskActivityTypeId(String.valueOf(RepTaskActivityTypeEnum.REPORT_ENCRYPTION.ordinal()));
		reportTaskAttachmentEntity.setEncryptionStatusId(String.valueOf(EncryptionStatusEnum.SYSTEM_ENCRYPTION.ordinal()));
		this.reportTaskDAO.insert(attachmentEntity);
		this.reportTaskDAO.insert(reportTaskAttachmentEntity);
		
		return true;
	}
	
	/**
	 * 上传报表任务加密附件
	 * @param reportTaskId
	 * @param fileCreateIds
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("rawtypes")
	public ActionResult uploadReportTaskEncryptionAttachment(String reportTaskId,List fileCreateIds) throws Exception {
		//上传和保存永久附件
		List<AttachmentEntity> list = this.attachmentService.completeFileUpload(fileCreateIds);
		//保存报表任务附件信息
		this.saveReportTaskAttachment(reportTaskId, list);
		//返回处理结果
		return ActionResultUtil.getActionResult(reportTaskId, "报表任务附件上传成功");
	}
	
	/**
	 * 保存报表任务附件
	 * @param reportTaskId
	 * @param attachmentEntityList
	 * @throws Exception
	 */
	private void saveReportTaskAttachment(String reportTaskId, List<AttachmentEntity> attachmentEntityList) throws Exception {
		for (AttachmentEntity attachmentEntity : attachmentEntityList) {
			ReportTaskAttachmentEntity reportTaskAttachmentEntity = new ReportTaskAttachmentEntity();
			reportTaskAttachmentEntity.setAttachmentId(attachmentEntity.getAttachmentId());
			reportTaskAttachmentEntity.setReportTaskId(reportTaskId);
			reportTaskAttachmentEntity.setRepTaskActivityTypeId(String.valueOf(RepTaskActivityTypeEnum.REPORT_ENCRYPTION.ordinal()));
			reportTaskAttachmentEntity.setEncryptionStatusId(String.valueOf(EncryptionStatusEnum.HUMAN_ENCRYPTION.ordinal()));
			this.reportTaskDAO.insert(reportTaskAttachmentEntity);
		}
	}
	
	/**
	 * 获取报表任务加密信息列表
	 * @return
	 */
	public List<ReportTaskEncryptionDTO> getReportTaskEncryptionList() {
		return this.reportTaskDAO.getReportTaskEncryptionList();
	}
	
	
	/**
	 * 获取报表任务加密信息列表
	 * @return
	 */
	public List<ReportTaskEncryptionEntity> getReportTaskEncryptionListById(String reportTaskReviewId) {
		return this.reportTaskDAO.getReportTaskEncryptionListById(reportTaskReviewId);
	}
	
	/**
	 * 根据报表任务加密ID获取报表任务加密信息
	 * @return
	 */
	public ReportTaskEncryptionDTO getReportTaskEncryptionInfoById(String reportTaskEncryptionId) {
		return this.reportTaskDAO.getReportTaskEncryptionInfoById(reportTaskEncryptionId);
	}

}