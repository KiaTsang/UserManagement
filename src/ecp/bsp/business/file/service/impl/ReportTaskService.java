/****************************************************************
 ***        Copyright © EASTCOMPEACE        2015.04.22        ***
 ****************************************************************/
package ecp.bsp.business.file.service.impl;

import java.io.File;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.lang.StringEscapeUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import ecp.bsp.business.file.constant.TaskConst;
import ecp.bsp.business.file.dao.impl.FtpConfigDAO;
import ecp.bsp.business.file.dao.impl.ReportTaskDAO;
import ecp.bsp.business.file.dao.impl.TaskStrategyDAO;
import ecp.bsp.business.file.dto.ReportRuleDTO;
import ecp.bsp.business.file.dto.ReportTaskDTO;
import ecp.bsp.business.file.dto.ReportTaskAttachmentDTO;
import ecp.bsp.business.file.dto.ReportTaskEncryptionDTO;
import ecp.bsp.business.file.dto.ReportTaskSendDTO;
import ecp.bsp.business.file.entity.ReportTaskAttachmentEntity;
import ecp.bsp.business.file.entity.ReportTaskEntity;
import ecp.bsp.business.file.entity.ReportTaskSendEmailEntity;
import ecp.bsp.business.file.entity.ReportTaskSendEntity;
import ecp.bsp.business.file.entity.ReportTaskSendFtpEntity;
import ecp.bsp.business.file.entity.ReportTaskSendTempEntity;
import ecp.bsp.business.file.entity.ReportTaskUploadEntity;
import ecp.bsp.business.file.entity.ReportTaskUploadFtpEntity;
import ecp.bsp.business.file.entity.TaskStrategyEntity;
import ecp.bsp.business.file.myenum.EncryptionStatusEnum;
import ecp.bsp.business.file.myenum.OperateTypeEnum;
import ecp.bsp.business.file.myenum.RepTaskActivityTypeEnum;
import ecp.bsp.business.file.myenum.ReportReviewTypeEnum;
import ecp.bsp.business.file.myenum.ReportSendTypeEnum;
import ecp.bsp.system.commons.dto.ActionResult;
import ecp.bsp.system.commons.myenum.FinalVersionTypeEnum;
import ecp.bsp.system.commons.utils.ActionResultUtil;
import ecp.bsp.system.commons.utils.LoggerUtil;
import ecp.bsp.system.commons.utils.PropertiesUtil;
import ecp.bsp.system.commons.utils.RegexpUtils;
import ecp.bsp.system.core.BaseDTO;
import ecp.bsp.system.framework.file.data.dto.AttachmentDTO;
import ecp.bsp.system.framework.file.data.entity.AttachmentEntity;
import ecp.bsp.system.framework.file.data.entity.AttachmentTempEntity;
import ecp.bsp.system.framework.file.impl.AttachmentDAO;
import ecp.bsp.system.framework.file.impl.AttachmentService;
import ecp.bsp.system.framework.ftp.FtpUtil;
import ecp.bsp.system.framework.ftp.data.dto.FtpDTO;
import ecp.bsp.system.framework.ftp.data.dto.FtpSyncDTO;
import ecp.bsp.system.framework.ftp.data.entity.FtpEntity;
import ecp.bsp.system.framework.ftp.data.myenum.FtpSyncStatusEnum;
import ecp.bsp.system.framework.ftp.impl.FtpService;

/**
 * 报表任务信息服务层
 * 
 * @since 2015-07-09
 * 
 * @author zengqingyue.
 * 
 */
/**
 * @author Administrator
 *
 */
@Service
@Transactional(propagation = Propagation.REQUIRED)
public class ReportTaskService {
	@Resource
	private ReportTaskReviewService reportTaskReviewService;
	
	@Resource
	private AttachmentService attachmentService;
	
	@Resource
	private FtpService ftpService;
	
	@Resource
	private ReportTaskDAO reportTaskDAO;
	
	@Resource
	private TaskStrategyDAO taskStrategyDAO;
	
	@Resource 
	private FtpConfigDAO ftpConfigDAO;
	
	@Resource 
	private AttachmentDAO attachmentDAO;
	
	/**
	 *提交报表任务信息
	 * @param reportTaskDTO
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings("rawtypes")
	public ActionResult submitReportTask(ReportTaskDTO reportTaskDTO,List localFileList) throws Exception{
		String paaEmployeeId = reportTaskDTO.getPaaEmployeeId();
		String paaUsername = reportTaskDTO.getPaaUsername();
		//校验任务策略信息
		TaskStrategyEntity taskStrategyEntity = this.taskStrategyDAO.getTaskStrategyEntityById(reportTaskDTO.getTaskStrategyId());
		Date date = new Date();
		DateFormat dt1 = new SimpleDateFormat("yyyy.MM.dd.hh.mm.ss");
		reportTaskDTO.setReportTaskName(taskStrategyEntity.getTaskStrategyName()+reportTaskDTO.getPaaUsername()+ dt1.format(date));
		this.validateTaskStrategy(taskStrategyEntity);
		//校验报表任务附件规则
		BaseDTO.entityToDTO(taskStrategyEntity, reportTaskDTO);
		reportTaskDTO.setPaaEmployeeId(paaEmployeeId);
		reportTaskDTO.setPaaUsername(paaUsername);
		this.validateReportTaskAttachmentByUpload(reportTaskDTO,localFileList);
		//保存报表任务信息
		this.saveRepTaskInfo(reportTaskDTO,OperateTypeEnum.MANUALLY);
		//上传和保存永久附件并保存报表任务附件信息
		List<AttachmentEntity> list = this.attachmentService.completeFileUpload(localFileList);
		this.saveReportTaskAttachment(reportTaskDTO.getReportTaskId(), list);
		//保存报表任务评审信息
		this.reportTaskReviewService.saveTaskReviewerInfo(reportTaskDTO,ReportReviewTypeEnum.USER_REVIEW);
		//返回处理结果
		return ActionResultUtil.getActionResult(reportTaskDTO.getReportTaskId(), "报表任务上传成功");
	}

	/**
	 * 保存报表任务信息
	 * @param reportTaskDTO
	 * @param uploadOperatorTypeEnum
	 * @throws Exception
	 */
	private void saveRepTaskInfo(ReportTaskDTO reportTaskDTO,OperateTypeEnum uploadOperatorTypeEnum) throws Exception {
		//保存报表任务信息
		ReportTaskEntity reportTaskEntity = new ReportTaskEntity();
		BaseDTO.dtoToEntity(reportTaskDTO, reportTaskEntity);
		reportTaskEntity.setStartTime(new Date());
		reportTaskEntity.setRepTaskActivityTypeId(String.valueOf(RepTaskActivityTypeEnum.REPORT_REVIEW.ordinal()));
		//保存报表任务上传信息
		ReportTaskUploadEntity reportTaskUploadEntity = new ReportTaskUploadEntity();
		reportTaskUploadEntity.setReportTaskId(reportTaskEntity.getReportTaskId());
		reportTaskUploadEntity.setPaaEmployeeId(reportTaskEntity.getPaaEmployeeId());
		reportTaskUploadEntity.setPaaUsername(reportTaskEntity.getPaaUsername());
		reportTaskUploadEntity.setUploadTime(new Date());
		reportTaskUploadEntity.setIsFinalVersion(String.valueOf(FinalVersionTypeEnum.FINAL_VERSION.ordinal()));
		reportTaskUploadEntity.setOperatorTypeId(String.valueOf(uploadOperatorTypeEnum.ordinal()));
		this.reportTaskDAO.insert(reportTaskEntity);
		this.reportTaskDAO.insert(reportTaskUploadEntity);
		//设置报表任务DTO信息
		reportTaskDTO.setReportTaskUploadId(reportTaskUploadEntity.getReportTaskUploadId());
		reportTaskDTO.setReportTaskId(reportTaskEntity.getReportTaskId());
	}

	/**
	 * 上传报表任务附件
	 * @param reportTaskId
	 * @param fileCreateIds
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("rawtypes")
	public ActionResult uploadReportTaskAttachment(String reportTaskId, List fileCreateIds) throws Exception {
		//上传和保存永久附件
		List<AttachmentEntity> list = this.attachmentService.completeFileUpload(fileCreateIds);
		//保存报表任务附件信息
		this.saveReportTaskAttachment(reportTaskId, list);
		//返回处理结果
		return ActionResultUtil.getActionResult(reportTaskId, "报表任务附件上传成功");
	}
	
	/**
	 * 通过FTP下载报表任务附件
	 * @param reportTaskDTO
	 * @return
	 * @throws Exception
	 */
	public ActionResult downloadReportTaskAttachmentByFtp(ReportTaskDTO reportTaskDTO) throws Exception {
		//保存报表任务信息
//		this.saveRepTaskInfo(reportTaskDTO, OperateTypeEnum.AUTOMATIC);
		//匹配报表任务文件
		ReportRuleDTO reportRuleDTO = this.matchReportTaskAttachment(reportTaskDTO);
		//保存报表任务上传信息
		this.saveRepTaskUploadInfo(reportTaskDTO,reportRuleDTO);
		//判断是否匹配成功
		if (reportRuleDTO.isMatch()) {
			//下载FTP附件并保存FTP同步历史信息
			List<AttachmentDTO> downloadFileList = this.downloadAttachmentByFtp(reportTaskDTO,reportRuleDTO.getMatchAttachmentList());
			if (downloadFileList.size() == reportRuleDTO.getMatchAttachmentList().size()) {
				//保存附件信息
				List<AttachmentEntity> attachmentEntityList = this.attachmentService.saveAttachment(downloadFileList);
				//保存报表任务附件信息
				this.saveReportTaskAttachment(reportTaskDTO.getReportTaskId(),attachmentEntityList);
				//保存报表任务审核信息
				this.reportTaskReviewService.saveTaskReviewerInfo(reportTaskDTO, ReportReviewTypeEnum.USER_REVIEW);
				//如果FTP删除类型为立即删除，则下载完成后，立即删除FTP附件信息
			}
		} else {
			//更新报表任务信息
//			ReportTaskEntity reportTaskEntity = this.reportTaskDAO.getReportTaskEntityById(reportTaskDTO.getReportTaskId());
//			reportTaskEntity.setRepTaskActivityTypeId(String.valueOf(RepTaskActivityTypeEnum.REPORT_UPLOAD.ordinal()));
//			reportTaskEntity.setEndTime(new Date());
//			this.reportTaskDAO.update(reportTaskEntity);
		}
		//返回处理结果
		return ActionResultUtil.getActionResult("", "报表任务附件上传成功");
	}
	
	/**
	 * 匹配报表任务附件规则(文件数量和文件命名)
	 * @param reportTaskDTO
	 * @return
	 * @throws IOException 
	 */
	private ReportRuleDTO matchReportTaskAttachment(ReportTaskDTO reportTaskDTO) throws IOException {
		boolean isMatch = true;
		List<Object> matchAttachmentList = new ArrayList<Object>();
		ReportRuleDTO matchReportRule = new ReportRuleDTO();
		StringBuilder ftpLog = new StringBuilder();
		//获取FTP信息
		FtpEntity ftpEntity = this.ftpConfigDAO.getFtpEntityById(reportTaskDTO.getFtpId());
		FtpDTO ftpDTO = new FtpDTO();
		BaseDTO.entityToDTO(ftpEntity, ftpDTO);
		String[] remoteFileList = this.ftpService.getRemoteFileList(ftpDTO,ftpLog);
		matchReportRule.setMatchDesc(ftpLog.toString());		
		if (reportTaskDTO.getIsMatchRule().equals("1")) {
			//获取任务报表规则列表
			List<ReportRuleDTO> reportRuleList = this.reportTaskDAO.getTaskReportRuleList(reportTaskDTO.getTaskStrategyId());
			for (ReportRuleDTO reportRuleDTO : reportRuleList) {
				String matchFileName = "";
				//添加与报表规则匹配的远程文件信息
				for (int i = 0; i < remoteFileList.length; i++) {
					String reportRuleExpression = StringEscapeUtils.unescapeJava(reportRuleDTO.getReportRuleExpression());
					isMatch = RegexpUtils.matchString(remoteFileList[i], reportRuleExpression);
					matchFileName = remoteFileList[i];
					if (isMatch) {
						matchAttachmentList.add(remoteFileList[i]);
						break;
					}
				}
				if (!isMatch) {
					matchReportRule.setMatchDesc("文件["+matchFileName+"]匹配失败");
					break;
				}
			}
			//判断任务报表规则数与FTP匹配成功的文件数
			if (matchAttachmentList.size() != reportRuleList.size()) {
				matchReportRule.setMatchDesc("匹配文件数不一致");
				isMatch = false;
			}
		} else {
			if (remoteFileList == null) {
				matchReportRule.setMatchDesc(ftpLog.toString());
				isMatch = false;
			} else if (remoteFileList.length > 0) {
				//添加远程目录的所有文件信息
				for (int i = 0; i < remoteFileList.length; i++) {
					if (!remoteFileList[i].equals("Thumbs.db")) {
						matchAttachmentList.add(remoteFileList[i]);
					}
				}
			} else {
				matchReportRule.setMatchDesc(ftpLog.toString() + "FTP服务器文件数为零");
				isMatch = false;
			}
		}
		
		//设置匹配结果信息
		matchReportRule.setMatch(isMatch);
		matchReportRule.setMatchAttachmentList(matchAttachmentList);
		return matchReportRule;
	}
	
	/**
	 * 通过FTP下载附件
	 * @param reportTaskDTO
	 * @param remoteFileList
	 * @return
	 * @throws Exception
	 */
	private List<AttachmentDTO> downloadAttachmentByFtp(ReportTaskDTO reportTaskDTO,List<Object> remoteFileList) throws Exception {
		//根据任务上传ID生成保存文件路径
		String localPath = this.generateFtpFilePath(reportTaskDTO);
		//获取FTP信息
		FtpEntity ftpEntity = this.ftpConfigDAO.getFtpEntityById(reportTaskDTO.getFtpId());
		FtpDTO ftpDTO = new FtpDTO();
		BaseDTO.entityToDTO(ftpEntity, ftpDTO);
		//设置FtpSyncDTO信息
		FtpSyncDTO ftpSyncDTO = new FtpSyncDTO();
		ftpSyncDTO.setFtpDTO(ftpDTO);
		ftpSyncDTO.setSyncContext(reportTaskDTO.getReportTaskName());
		ftpSyncDTO.setSyncId(reportTaskDTO.getReportTaskUploadId());
		ftpSyncDTO.setSyncGroupId(reportTaskDTO.getReportTaskId());
		ftpSyncDTO.setLocalPath(localPath);
		ftpSyncDTO.setRemoteFileList(remoteFileList);
		//返回成功下载的文件
		return this.ftpService.download(ftpSyncDTO);
	}

	/**
	 * 保存报表任务上传信息
	 * @param taskStrategyDTO
	 * @param reportRuleDTO
	 * @throws Exception 
	 */
	private void saveRepTaskUploadInfo(ReportTaskDTO reportTaskDTO, ReportRuleDTO reportRuleDTO) throws Exception {
		//保存报表任务信息
		ReportTaskEntity reportTaskEntity = new ReportTaskEntity();
		BaseDTO.dtoToEntity(reportTaskDTO, reportTaskEntity);
		reportTaskEntity.setStartTime(new Date());
		if (reportRuleDTO.isMatch()) {
			reportTaskEntity.setRepTaskActivityTypeId(String.valueOf(RepTaskActivityTypeEnum.REPORT_REVIEW.ordinal()));
		} else {
			reportTaskEntity.setRepTaskActivityTypeId(String.valueOf(RepTaskActivityTypeEnum.REPORT_UPLOAD.ordinal()));
			reportTaskEntity.setEndTime(new Date());
		}
		//保存报表任务上传信息
		ReportTaskUploadEntity reportTaskUploadEntity = new ReportTaskUploadEntity();
		reportTaskUploadEntity.setReportTaskId(reportTaskEntity.getReportTaskId());
		reportTaskUploadEntity.setPaaEmployeeId(reportTaskEntity.getPaaEmployeeId());
		reportTaskUploadEntity.setPaaUsername(reportTaskEntity.getPaaUsername());
		reportTaskUploadEntity.setUploadTime(new Date());
		reportTaskUploadEntity.setIsFinalVersion(String.valueOf(FinalVersionTypeEnum.FINAL_VERSION.ordinal()));
		reportTaskUploadEntity.setOperatorTypeId(String.valueOf(OperateTypeEnum.AUTOMATIC.ordinal()));
		//保存报表任务上传FTP信息
		ReportTaskUploadFtpEntity reportTaskUploadFtpEntity = new ReportTaskUploadFtpEntity();
		reportTaskUploadFtpEntity.setReportTaskUploadId(reportTaskUploadEntity.getReportTaskUploadId());
		reportTaskUploadFtpEntity.setFtpId(reportTaskDTO.getFtpId());
		reportTaskUploadFtpEntity.setFtpUploadTime(new Date());
		reportTaskUploadFtpEntity.setFtpUploadResult(reportRuleDTO.getMatchDesc());
		if (reportRuleDTO.isMatch()) {
			reportTaskUploadFtpEntity.setFtpSyncStatusId(String.valueOf(FtpSyncStatusEnum.SYNC_SUCCESS.ordinal()));
		} else {
			reportTaskUploadFtpEntity.setFtpSyncStatusId(String.valueOf(FtpSyncStatusEnum.SYNC_FAIL.ordinal()));
		}
		this.reportTaskDAO.insert(reportTaskEntity);
		this.reportTaskDAO.insert(reportTaskUploadEntity);
		this.reportTaskDAO.insert(reportTaskUploadFtpEntity);
		//设置报表任务DTO信息
		reportTaskDTO.setReportTaskUploadId(reportTaskUploadEntity.getReportTaskUploadId());
		reportTaskDTO.setReportTaskId(reportTaskEntity.getReportTaskId());
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
			reportTaskAttachmentEntity.setRepTaskActivityTypeId(String.valueOf(RepTaskActivityTypeEnum.REPORT_UPLOAD.ordinal()));
			reportTaskAttachmentEntity.setEncryptionStatusId(String.valueOf(EncryptionStatusEnum.NONE_ENCRYPTION.ordinal()));
			this.reportTaskDAO.insert(reportTaskAttachmentEntity);
		}
	}
	
	/**
	 * 获取报表任务上传信息列表
	 * @return
	 */
	public List<ReportTaskDTO> getReportTaskUploadList() {
		return this.reportTaskDAO.getReportTaskUploadList();
	}
	
	/**
	 * 校验报表任务附件规则
	 * @param reportTaskDTO
	 * @throws IOException 
	 */
	public void validateReportTaskAttachment(ReportTaskDTO reportTaskDTO) throws IOException {
		if (reportTaskDTO.getIsMatchRule().equals("1")) {
			ReportRuleDTO reportRuleDTO = this.matchReportTaskAttachment(reportTaskDTO);
			if (!reportRuleDTO.isMatch()) {
				String exceptionMessage = "文件匹配失败："+reportRuleDTO.getMatchDesc();
				LoggerUtil.instance(this.getClass()).error(exceptionMessage);
				throw new RuntimeException(exceptionMessage);
			}
		}
	}
	
	/**
	 * 校验用户上传的报表任务附件规则
	 * @param reportTaskDTO
	 */
	@SuppressWarnings("rawtypes")
	public boolean validateReportTaskAttachmentByUpload(ReportTaskDTO reportTaskDTO,List localFileList) {
		boolean isMatch = true;
		List<Object> matchAttachmentList = new ArrayList<Object>();
		if (reportTaskDTO.getIsMatchRule().equals("1")) {
			//获取任务报表规则列表
			List<ReportRuleDTO> reportRuleList = this.reportTaskDAO.getTaskReportRuleList(reportTaskDTO.getTaskStrategyId());
			for (ReportRuleDTO reportRuleDTO : reportRuleList) {
				String matchFileName = "";
				//添加与报表规则匹配的远程文件信息 赵荣屏蔽（如果是手动上传，在规则匹配时，只要满足其一就可以）
//				for (int i = 0; i < localFileList.size(); i++) {
//					String reportRuleExpression = StringEscapeUtils.unescapeJava(reportRuleDTO.getReportRuleExpression());
//					AttachmentTempEntity attachmentTempEntity = this.attachmentDAO.getAttachmentTempEntityByCreateId((String) localFileList.get(i));
//					isMatch = RegexpUtils.matchString(attachmentTempEntity.getAttachmentName(), reportRuleExpression);
//					matchFileName = attachmentTempEntity.getAttachmentName();
//					if (isMatch) {
//						matchAttachmentList.add(attachmentTempEntity.getAttachmentName());
//						break;
//					}
//				}
//				if (!isMatch) {
//					String exceptionMessage = "文件["+matchFileName+"]匹配失败";
//					LoggerUtil.instance(this.getClass()).error(exceptionMessage);
//					throw new RuntimeException(exceptionMessage);
//				}
//			}
//			//判断任务报表规则数与FTP匹配成功的文件数
//			if (matchAttachmentList.size() != reportRuleList.size()) {
//				String exceptionMessage = "匹配文件数不一致";
//				LoggerUtil.instance(this.getClass()).error(exceptionMessage);
//				throw new RuntimeException(exceptionMessage);
//			}
			//赵荣修改
			for (int i = 0; i < localFileList.size(); i++) {
				String reportRuleExpression = StringEscapeUtils.unescapeJava(reportRuleDTO.getReportRuleExpression());
				AttachmentTempEntity attachmentTempEntity = this.attachmentDAO.getAttachmentTempEntityByCreateId((String) localFileList.get(i));
				isMatch = RegexpUtils.matchString(attachmentTempEntity.getAttachmentName(), reportRuleExpression);
				matchFileName = attachmentTempEntity.getAttachmentName();
				if(!isMatch)
				{
					String exceptionMessage = "文件["+matchFileName+"]匹配失败";
					LoggerUtil.instance(this.getClass()).error(exceptionMessage);
					throw new RuntimeException(exceptionMessage);
				//	return isMatch;
				}
			}		
		}
	}
		return isMatch;
	}

	/**
	 * 校验任务策略信息
	 * @param taskStrategyEntity
	 */
	private void validateTaskStrategy(TaskStrategyEntity taskStrategyEntity) {
		if (taskStrategyEntity == null) {
			String exceptionMessage = "未找到对应的任务策略信息.";
			LoggerUtil.instance(this.getClass()).error(exceptionMessage);
			throw new RuntimeException(exceptionMessage);
		}
	}

	/**
	 * 根据创建id生成保存ftp文件的路径,并且保存一条记录
	 * @param createId
	 * @return
	 * @throws Exception
	 */
	private String generateFtpFilePath(ReportTaskDTO reportTaskDTO) throws Exception{
		//根据任务上传ID生成保存文件路径
		SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
		String dateStr = format.format(new Date());
		PropertiesUtil propertiesUtil = new PropertiesUtil(TaskConst.PROPERTIES_NAME_FILE_DIR_PATH);
		String ftpDownloadPath = propertiesUtil.readPropertiesByName(TaskConst.PROPERTIES_KEY_DOWNLOAD_PATH);
		
		String localPath = ftpDownloadPath.replaceAll("[\\\\+||/]+", File.separator+File.separator)
//				+ File.separator + reportTaskDTO.getProductTypeName()
//				+ File.separator + reportTaskDTO.getOperatorName()
//				+ File.separator + reportTaskDTO.getBrandName()
				+ File.separator + dateStr
				+ File.separator + reportTaskDTO.getReportTaskUploadId();
		return localPath;
	}
	
	/**
	 * 删除下载成功的FTP附件(后续加上FTP删除类型判断以及删除服务器临时附件信息)
	 * @throws Exception 
	 */
	public void deleteRepTaskAttach() throws Exception {
		//获取FTP当前时间前一天同步成功的报表任务信息
		List<ReportTaskDTO> reportTaskDTOList = this.reportTaskDAO.getFtpSyncSuccessReportTaskAtYesterday();
		for (ReportTaskDTO reportTaskDTO : reportTaskDTOList) {
			//获取报表任务附件信息
			List<ReportTaskAttachmentDTO> reportTaskAttachmentList = getReportTaskAttachmentByReportTaskId(reportTaskDTO.getReportTaskId());
			//获取FTP信息
			FtpEntity ftpEntity = this.ftpConfigDAO.getFtpEntityById(reportTaskDTO.getReportSourceFtpId());
			FtpDTO ftpDTO = new FtpDTO();
			BaseDTO.entityToDTO(ftpEntity, ftpDTO);
			//删除FTP附件
			this.deleteFtpFile(ftpDTO,reportTaskAttachmentList);
		}
		//删除临时文件和压缩文件
	}
	
	/**
	 * 删除文件
	 * @param ftpSyncDTO
	 * @throws Exception
	 */
	public void deleteFtpFile(FtpDTO ftpDTO, List<ReportTaskAttachmentDTO> reportTaskAttachmentList) throws Exception{
		//连接服务器
		StringBuilder ftpLog = new StringBuilder();
		FtpUtil ftpUtil = new FtpUtil(ftpDTO, ftpLog);
		//上传文件
		for (ReportTaskAttachmentDTO reportTaskAttachmentDTO : reportTaskAttachmentList) {
			ftpUtil.deleteFile(reportTaskAttachmentDTO.getAttachmentName(),ftpDTO.getFtpPath(), ftpLog) ;
		}
		//关闭服务器
		ftpUtil.closeConnect();
	}
	
	/**
	 * 通过DBlink同步更新安全区报表任务发送信息
	 * @throws Exception 
	 */
	public void syncRepTaskSendInfo() throws Exception {
		//获取本地未发送的报表任务分发信息
		List<ReportTaskSendDTO>  reportTaskSendDTOList=this.reportTaskDAO.getReportTaskSendDto();
		//赵荣屏蔽
        //List<ReportTaskSendEntity> reportTaskSendEntityList = this.reportTaskDAO.getUnSendReportTaskSendEntity();
        //List<ReportTaskSendEntity> reportTaskSendEntityListSendInform=this.reportTaskDAO.getUnSendReportTaskSendEntity();
		//List<ReportTaskSendEntity> 	reportTaskSendEntityList2Entities.
	    //ReportTaskSendDTO reportTaskSendDTO= new ReportTaskSendDTO();
		for (ReportTaskSendDTO  reportTaskSendDTOsync : reportTaskSendDTOList) {
	    //赵荣屏蔽
		//for (ReportTaskSendEntity reportTaskSendEntity : reportTaskSendEntityList) {
	    //BaseDTO.dtoToEntity(reportTaskSendDTOsync, reportTaskSendEntity);
			ReportTaskSendEntity reportTaskSendEntity = this.reportTaskDAO.getReportTaskSendEntityById(reportTaskSendDTOsync.getReportTaskSendId());
			
			//通过DBlink获取远程服务器的报表任务分发信息
			ReportTaskSendDTO reportTaskSendDTO = this.reportTaskDAO.getRepTaskSendBySendId(reportTaskSendEntity.getReportTaskSendId());
			//更新已发送的报表分发信息
			if (reportTaskSendDTO != null) {
				if (reportTaskSendDTO.getIsSend().equals("1")) {
					//更新报表任务发送信息
					reportTaskSendEntity.setSendTime(reportTaskSendDTO.getSendTime());
					reportTaskSendEntity.setIsSend(reportTaskSendDTO.getIsSend());
					reportTaskSendEntity.setSendResult(reportTaskSendDTO.getSendResult());
					reportTaskSendEntity.setResultSendSucinformemail(reportTaskSendDTO.getResultSendSucinformemail());
					reportTaskSendEntity.setTimeSendSucinformemail(reportTaskSendDTO.getTimeSendSucinformemail());
					this.reportTaskDAO.update(reportTaskSendEntity);
					if (reportTaskSendEntity.getReportSendTypeId().equals(String.valueOf(ReportSendTypeEnum.FTP.ordinal()))) {
						//通过DBlink获取远程服务器的报表任务发送FTP信息
						ReportTaskSendDTO reportTaskSendFtpDTO = this.reportTaskDAO.getRepTaskSendFtpBySendId(reportTaskSendDTO.getReportTaskSendId());
						//更新报表任务发送FTP信息
						ReportTaskSendFtpEntity reportTaskSendFtpEntity = 
								this.reportTaskDAO.getReportTaskSendFtpEntityById(reportTaskSendFtpDTO.getRepTaskSendFtpId());
						BaseDTO.dtoToEntity(reportTaskSendFtpDTO, reportTaskSendFtpEntity);
						this.reportTaskDAO.update(reportTaskSendFtpEntity);
					} else if (reportTaskSendEntity.getReportSendTypeId().equals(String.valueOf(ReportSendTypeEnum.EMAIL.ordinal()))) {
						//通过DBlink获取远程服务器的报表任务发送Email信息
						List<ReportTaskSendDTO> reportTaskSendEmailList = this.reportTaskDAO.getRepTaskSendEmailBySendId(reportTaskSendDTO.getReportTaskSendId());
						//更新报表任务发送Email信息
						for (ReportTaskSendDTO reportTaskSendEmailDTO : reportTaskSendEmailList) {
							ReportTaskSendEmailEntity reportTaskSendEmailEntity = 
									this.reportTaskDAO.getReportTaskSendEmailEntityById(reportTaskSendEmailDTO.getRepTaskSendEmailId());
							BaseDTO.dtoToEntity(reportTaskSendEmailDTO, reportTaskSendEmailEntity);
							this.reportTaskDAO.update(reportTaskSendEmailEntity);
						}
					}
					//获取临时表信息
					ReportTaskSendTempEntity reportTaskSendTempEntity = this.reportTaskDAO.getReportTaskSendTempEntityBySendId(reportTaskSendDTO.getReportTaskSendId());
					//更新报表任务
					ReportTaskEntity reportTaskEntity = this.reportTaskDAO.getReportTaskEntityById(reportTaskSendTempEntity.getReportTaskId());
					reportTaskEntity.setEndTime(new Date());
					this.reportTaskDAO.update(reportTaskEntity);
				}
			}
		}
	}
	
	/**
	 * 获取报表任务信息列表
	 * @return
	 */
	public List<ReportTaskDTO> getReportTaskList() {
		return this.reportTaskDAO.getReportTaskDTOList();
	}

	/**
	 * 根据报表任务ID获取报表任务信息列表
	 * @param reportTaskId
	 * @return
	 */
	public ReportTaskDTO getReportTaskInfoByReportTaskId(String reportTaskId) {
		return this.reportTaskDAO.getReportTaskInfoByReportTaskId(reportTaskId);
	}

	/**
	 * 根据报表任务ID获取报表任务附件信息列表
	 * @param reportTaskId
	 * @return
	 */
	public List<ReportTaskAttachmentDTO> getReportTaskAttachmentByReportTaskId(String reportTaskId) {
		//根据报表任务获取加密信息
		ReportTaskEncryptionDTO reportTaskEncryptionDTO = this.reportTaskDAO.getReportTaskEncryptionInfoByTaskId(reportTaskId);
		if (reportTaskEncryptionDTO != null && 
				reportTaskEncryptionDTO.getIsEncryption().equals("1")) {
			return this.reportTaskDAO.getEncryptionAttachmentByReportTaskId(reportTaskId);
		} else {
			return this.reportTaskDAO.getReportTaskAttachmentByReportTaskId(reportTaskId);
		}
	}

	/**
	 * 根据任务ID获取报表任务所有过程信息
	 * @param reportTaskId
	 * @return
	 */
	public List<ReportTaskDTO> getReportTaskAllInfoByTaskId(String reportTaskId) {
		return this.reportTaskDAO.getReportTaskAllInfoByTaskId(reportTaskId);
	}

	/**
	 * 根据用户ID获取报表任务信息列表
	 * @param paaEmployeeId
	 * @return
	 */
	public List<ReportTaskDTO> getReportTaskListByPaaEmployeeId(String paaEmployeeId) {
		return this.reportTaskDAO.getReportTaskListByPaaEmployeeId(paaEmployeeId);
	}

	/**
	 * 根据用户ID获取报表任务上传信息列表
	 * @param paaEmployeeId
	 * @return
	 */
	public List<ReportTaskDTO> getReportTaskUploadListByPaaEmployeeId(String paaEmployeeId) {
		return this.reportTaskDAO.getReportTaskUploadListByPaaEmployeeId(paaEmployeeId);
	}

	/**获取报表数量
	 * @return
	 */
	public ReportTaskDTO getReporTaskNum() {
		return this.reportTaskDAO.getReporTaskNum();
		
	}

}