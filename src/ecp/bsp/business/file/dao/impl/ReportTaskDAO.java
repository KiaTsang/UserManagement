package ecp.bsp.business.file.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import ecp.bsp.business.file.constant.TaskConst;
import ecp.bsp.business.file.dto.ReportRuleDTO;
import ecp.bsp.business.file.dto.ReportTaskAttachmentDTO;
import ecp.bsp.business.file.dto.ReportTaskDTO;
import ecp.bsp.business.file.dto.ReportTaskEncryptionDTO;
import ecp.bsp.business.file.dto.ReportTaskReviewDTO;
import ecp.bsp.business.file.dto.ReportTaskSendDTO;
import ecp.bsp.business.file.entity.ReportTaskEncryptionEntity;
import ecp.bsp.business.file.entity.ReportTaskEntity;
import ecp.bsp.business.file.entity.ReportTaskReviewEntity;
import ecp.bsp.business.file.entity.ReportTaskSendEmailEntity;
import ecp.bsp.business.file.entity.ReportTaskSendEntity;
import ecp.bsp.business.file.entity.ReportTaskSendFtpEntity;
import ecp.bsp.business.file.entity.ReportTaskSendTempEntity;
import ecp.bsp.business.file.entity.ReportTaskUploadEntity;
import ecp.bsp.system.core.BaseDAO;
/**
 * 报表任务信息DAO层
 * 
 * @since 2015-07-09
 * 
 * @author zengqingyue.
 * 
 */
@Repository
public class ReportTaskDAO extends BaseDAO{
	/**
	 * 获取报表任务上传信息列表
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<ReportTaskDTO> getReportTaskUploadList() {
		return (List<ReportTaskDTO>) this.query(TaskConst.SQL_GET_REPORT_TASK_UPLOAD_LIST, ReportTaskDTO.class);
	}
	
	/**
	 * 获取报表任务审核信息列表
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<ReportTaskReviewDTO> getReportTaskReviewList() {
		return (List<ReportTaskReviewDTO>) this.query(TaskConst.SQL_GET_REPORT_TASK_REVIEW_LIST, ReportTaskReviewDTO.class);
	}
	
	/**
	 * 根据报表任务评审ID获取报表任务审核信息
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public ReportTaskReviewDTO getReportTaskReviewInfoById(String reportTaskReviewId) {
		List<ReportTaskReviewDTO> list = 
				(List<ReportTaskReviewDTO>) this.query(TaskConst.SQL_GET_REPORT_TASK_REVIEW_LIST_BY_ID,
						new Object[]{reportTaskReviewId}, ReportTaskReviewDTO.class);
		return list.size() > 0 ? list.get(0) : null;
	}

	/**
	 * 根据ID获取报表任务评审信息
	 * @param reportTaskReviewId
	 * @return
	 */
	public ReportTaskReviewEntity getReportTaskReviewEntityById(String reportTaskReviewId) {
		return this.getEntity(ReportTaskReviewEntity.class, reportTaskReviewId);
	}

	/**
	 * 根据任务上传ID获取未评审的信息
	 * @param reportTaskUploadId
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<ReportTaskReviewDTO> getReportTaskUnReviewEntityListByUploadId(String reportTaskUploadId) {
		return (List<ReportTaskReviewDTO>) this.query(TaskConst.SQL_GET_REPORT_TASK_UN_REVIEW_LIST_BY_UPLOAD_ID, 
				new Object[]{reportTaskUploadId}, ReportTaskReviewDTO.class);
	}
	
	/**
	 * 获取报表任务信息列表
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<ReportTaskDTO> getReportTaskDTOList() {
		return (List<ReportTaskDTO>) this.query(TaskConst.SQL_GET_REPORT_TASK_LIST, ReportTaskDTO.class);
	}

	/**
	 * 根据报表任务ID获取报表任务信息
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public ReportTaskDTO getReportTaskInfoByReportTaskId(String reportTaskId) {
		List<ReportTaskDTO> list = (List<ReportTaskDTO>) this.query(TaskConst.SQL_GET_REPORT_TASK_INFO_BY_TASK_ID, 
				new Object[]{reportTaskId}, ReportTaskDTO.class);
		return  (list.size() > 0 ? list.get(0) : null);
	}
	
	/**
	 * 根据任务策略ID获取任务报表规则列表
	 * @param taskStrategyId
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<ReportRuleDTO> getTaskReportRuleList(String taskStrategyId) {
		return (List<ReportRuleDTO>) this.query(TaskConst.SQL_GET_REPORT_TASK_REPORT_RULE_LIST_BY_STRATEGY_ID, 
				new Object[]{taskStrategyId}, ReportRuleDTO.class);
	}

	/**
	 * 根据主键ID获取报表任务实体信息
	 * @param reportTaskId
	 * @return
	 */
	public ReportTaskEntity getReportTaskEntityById(String reportTaskId) {
		return this.getEntity(ReportTaskEntity.class, reportTaskId);
	}

	/**
	 * 获取报表任务加密信息列表
	 * @return
	 */
	public List<ReportTaskEncryptionDTO> getReportTaskEncryptionList() {
		return null;
	}

	/**
	 * 根据报表任务加密ID获取报表任务加密信息
	 * @param reportTaskEncryptionId
	 * @return
	 */
	public ReportTaskEncryptionDTO getReportTaskEncryptionInfoById(String reportTaskEncryptionId) {
		return null;
	}

	/**
	 * 根据报表任务评审ID获取报表任务加密列表
	 * @return
	 */
	public List<ReportTaskEncryptionEntity> getReportTaskEncryptionListById(String reportTaskReviewId) {
		return this.getEntityList(ReportTaskEncryptionEntity.class, TaskConst.PARAM_ENTITY_REPORT_TASK_REVIEW_ID, 
				reportTaskReviewId, null);
	}

	/**
	 * 根据主键ID获取报表任务加密实体
	 * @param reportTaskEncryptionId
	 * @return
	 */
	public ReportTaskEncryptionEntity getReportTaskEncryptionEntityById(String reportTaskEncryptionId) {
		return this.getEntity(ReportTaskEncryptionEntity.class, reportTaskEncryptionId);
	}

	/**
	 * 根据报表任务ID获取报表任务附件信息列表
	 * @param reportTaskId
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<ReportTaskAttachmentDTO> getReportTaskAttachmentByReportTaskId(String reportTaskId) {
		return (List<ReportTaskAttachmentDTO>) this.query(TaskConst.SQL_GET_REPORT_TASK_REPORT_ATTACHMENT_LIST_BY_TASK_ID, 
				new Object[]{reportTaskId}, ReportTaskAttachmentDTO.class);
	}

	/**
	 * 根据任务ID获取报表任务所有过程信息
	 * @param reportTaskId
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<ReportTaskDTO> getReportTaskAllInfoByTaskId(String reportTaskId) {
		return (List<ReportTaskDTO>) this.query(TaskConst.SQL_GET_REPORT_TASK_ALL_INFO_BY_TASK_ID, 
				new Object[]{reportTaskId,reportTaskId,reportTaskId,reportTaskId,reportTaskId}, ReportTaskDTO.class);
	}

	/**
	 * 通过DBlink获取发送完成的报表任务分发信息
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<ReportTaskSendDTO> getHadSendReportTaskSendInfoByDBLink() {
		return (List<ReportTaskSendDTO>) this.query(TaskConst.SQL_GET_HAVE_SEND_REPORT_TASK_SEND_INFO_BY_DBLINK, ReportTaskSendDTO.class);
	}

	/**
	 * 根据ID获取报表任务发送信息
	 * @param reportTaskSendId
	 * @return
	 */
	public ReportTaskSendEntity getReportTaskSendEntityById(String reportTaskSendId) {
		return this.getEntity(ReportTaskSendEntity.class, reportTaskSendId);
	}

	/**
	 * 通过任务发送ID和DBlink获取报表任务发送信息
	 * @param reportTaskSendId
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public ReportTaskSendDTO getRepTaskSendBySendId(String reportTaskSendId) {
		List<ReportTaskSendDTO> list = (List<ReportTaskSendDTO>) this.query(TaskConst.SQL_GET_REPORT_TASK_SEND_INFO_BY_SEND_ID, 
				new Object[]{reportTaskSendId}, ReportTaskSendDTO.class);
		return  (list.size() > 0 ? list.get(0) : null);
	}
	
	/**
	 * 通过任务发送ID和DBlink获取报表任务发送FTP信息
	 * @param reportTaskSendId
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public ReportTaskSendDTO getRepTaskSendFtpBySendId(String reportTaskSendId) {
		List<ReportTaskSendDTO> list = (List<ReportTaskSendDTO>) this.query(TaskConst.SQL_GET_REPORT_TASK_SEND_FTP_BY_SEND_ID, 
				new Object[]{reportTaskSendId}, ReportTaskSendDTO.class);
		return  (list.size() > 0 ? list.get(0) : null);
	}

	

	/**
	 * 通过任务发送ID和DBlink获取报表任务发送Email信息
	 * @param reportTaskSendId
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<ReportTaskSendDTO> getRepTaskSendEmailBySendId(String reportTaskSendId) {
		return (List<ReportTaskSendDTO>) this.query(TaskConst.SQL_GET_REPORT_TASK_SEND_EMAIL_BY_SEND_ID, 
				new Object[]{reportTaskSendId}, ReportTaskSendDTO.class);
	}

	/**
	 * 根据ID获取报表任务发送FTP信息
	 * @param reportTaskSendFtpId
	 * @return
	 */
	public ReportTaskSendFtpEntity getReportTaskSendFtpEntityById(String reportTaskSendFtpId) {
		return this.getEntity(ReportTaskSendFtpEntity.class, reportTaskSendFtpId);
	}
	
	/**
	 * 根据ID获取报表任务发送email信息
	 * @param reportTaskSendEmailId
	 * @return
	 */
	public ReportTaskSendEmailEntity getReportTaskSendEmailEntityById(String reportTaskSendEmailId) {
		return this.getEntity(ReportTaskSendEmailEntity.class, reportTaskSendEmailId);
	}

	/**
	 * 获取未发送的报表任务分发实体信息列表
	 * @return
	 */
	public List<ReportTaskSendEntity> getUnSendReportTaskSendEntity() {
		return  this.getEntityList(ReportTaskSendEntity.class, TaskConst.PARAM_ENTITY_IS_SEND, "0", null);
	}

	/**
	 * 根据发送ID获取报表任务分发临时表信息实体
	 * @param reportTaskSendId
	 * @return
	 */
	public ReportTaskSendTempEntity getReportTaskSendTempEntityBySendId(String reportTaskSendId) {
		return this.getEntity(ReportTaskSendTempEntity.class, TaskConst.PARAM_ENTITY_REPORT_TASK_SEND_ID, reportTaskSendId);
	}

	/**
	 * 获取当前时间前一天FTP同步成功的报表任务信息
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<ReportTaskDTO> getFtpSyncSuccessReportTaskAtYesterday() {
		return (List<ReportTaskDTO>) this.query(TaskConst.SQL_GET_FTP_SYNC_SUCCESS_REPORT_TASK_AT_YESTERDAY, ReportTaskDTO.class);
	}

	/**
	 * 根据用户ID获取报表任务信息列表
	 * @param paaEmployeeId
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<ReportTaskDTO> getReportTaskListByPaaEmployeeId(String paaEmployeeId) {
		return (List<ReportTaskDTO>) this.query(TaskConst.SQL_GET_REPORT_TASK_INFO_BY_PAA_EMPLOYEE_ID,
				new Object[]{paaEmployeeId},ReportTaskDTO.class);
	}

	/**
	 * 根据paa用户ID获取报表任务审核信息
	 * @param paaEmployeeId
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<ReportTaskReviewDTO> getReportTaskReviewInfoByPaaEmployeeId(String paaEmployeeId,String isFilter) {
		if(isFilter.equals("0")){
		return (List<ReportTaskReviewDTO>) this.query(TaskConst.SQL_GET_REPORT_TASK_REVIEW_LIST_BY_PAA_EMPLOYEE_ID, 
				new Object[]{paaEmployeeId},ReportTaskReviewDTO.class);
		}else{
		return (List<ReportTaskReviewDTO>) this.query(TaskConst.SQL_GET_REPORT_TASK_REVIEW_LIST_BY_PAA_EMPLOYEE_ID_FILTER, 
					new Object[]{paaEmployeeId},ReportTaskReviewDTO.class);
		}
	}

	/**
	 * 根据用户ID获取报表任务上传信息列表
	 * @param paaEmployeeId
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<ReportTaskDTO> getReportTaskUploadListByPaaEmployeeId(String paaEmployeeId) {
		return (List<ReportTaskDTO>) this.query(TaskConst.SQL_GET_REPORT_TASK_UPLOAD_LIST_BY_PAA_EMPLOYEE_ID, 
				new Object[]{paaEmployeeId},ReportTaskDTO.class);
	}

	/**
	 * 根据报表任务ID获取报表任务加密信息
	 * @param reportTaskId
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public ReportTaskEncryptionDTO getReportTaskEncryptionInfoByTaskId(String reportTaskId) {
		List<ReportTaskEncryptionDTO> list  = (List<ReportTaskEncryptionDTO>) this.query(TaskConst.SQL_GET_REPORT_TASK_ENCRYPTION_LIST_BY_REPORT_TASK_ID, 
				new Object[]{reportTaskId},ReportTaskEncryptionDTO.class);
		return  list.size() > 0 ? list.get(0) : null;
	}

	/**
	 * 根据报表任务ID获取已加密的报表任务附件信息列表
	 * @param reportTaskId
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<ReportTaskAttachmentDTO> getEncryptionAttachmentByReportTaskId(String reportTaskId) {
		return (List<ReportTaskAttachmentDTO>) this.query(TaskConst.SQL_GET_ENCRYPTION_ATTACHMENT_LIST_BY_TASK_ID, 
				new Object[]{reportTaskId}, ReportTaskAttachmentDTO.class);
	}

	/**
	 * 根据Id获取报表任务上传实体信息
	 * @param reportTaskUploadId
	 * @return
	 */
	public ReportTaskUploadEntity getReportTaskUploadEntityById(String reportTaskUploadId) {
		return this.getEntity(ReportTaskUploadEntity.class, reportTaskUploadId);
	}

	/**获取报表数量
	 * @return
	 */
	public ReportTaskDTO getReporTaskNum() {
		@SuppressWarnings("unchecked")
		List<ReportTaskDTO> list  = (List<ReportTaskDTO>) this.query(TaskConst.SQL_GET_REPORT_TASK_NUM, ReportTaskDTO.class);
		return  list.size() > 0 ? list.get(0) : null;
	}

	
	@SuppressWarnings("unchecked")
	public List<ReportTaskSendDTO> getReportTaskSendDto() {
		
		return (List<ReportTaskSendDTO>) this.query(TaskConst.SQL_REPORT_TASK_SEND, ReportTaskSendDTO.class);
	}
	
}
