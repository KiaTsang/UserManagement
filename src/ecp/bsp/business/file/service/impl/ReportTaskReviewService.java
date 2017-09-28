/****************************************************************
 ***        Copyright © EASTCOMPEACE        2015.04.22        ***
 ****************************************************************/
package ecp.bsp.business.file.service.impl;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import ecp.bsp.business.file.dao.impl.ReportTaskDAO;
import ecp.bsp.business.file.dao.impl.TaskStrategyDAO;
import ecp.bsp.business.file.dto.ReportTaskDTO;
import ecp.bsp.business.file.dto.ReportTaskReviewDTO;
import ecp.bsp.business.file.entity.ReportTaskEncryptionEntity;
import ecp.bsp.business.file.entity.ReportTaskEntity;
import ecp.bsp.business.file.entity.ReportTaskReviewEntity;
import ecp.bsp.business.file.entity.ReportTaskUploadEntity;
import ecp.bsp.business.file.entity.TaskReviewerEntity;
import ecp.bsp.business.file.myenum.ReportReviewStatusEnum;
import ecp.bsp.business.file.myenum.ReportReviewTypeEnum;
import ecp.bsp.system.commons.dto.ActionResult;
import ecp.bsp.system.commons.myenum.FinalVersionTypeEnum;
import ecp.bsp.system.commons.utils.ActionResultUtil;

/**
 * 报表任务评审信息服务层
 * 
 * @since 2015-07-09
 * 
 * @author zengqingyue.
 * 
 */
@Service
@Transactional(propagation = Propagation.REQUIRED)
public class ReportTaskReviewService {
	@Resource
	private ReportTaskEncryptionService reportTaskEncryptionService;
	
	@Resource
	private ReportTaskDAO reportTaskDAO;
	
	@Resource
	private TaskStrategyDAO taskStrategyDAO;

	/**
	 * 提交报表任务评审信息
	 * @param reportTaskReviewDTO
	 * @return
	 * @throws Exception 
	 */
	public ActionResult submitReportTaskReview(ReportTaskReviewDTO reportTaskReviewDTO) throws Exception {
		//获取当前评审信息
		ReportTaskReviewEntity reportTaskReviewEntity = 
				this.reportTaskDAO.getReportTaskReviewEntityById(reportTaskReviewDTO.getReportTaskReviewId());
		//根据报表任务审核信息的审核状态判断任务是否已经审核完毕，如是则提示已经审核，无需再重复审核
		if (reportTaskReviewEntity.getReportReviewStatusId() != null) {
			return ActionResultUtil.getActionResult(reportTaskReviewDTO.getReportTaskReviewId(), "任务评审完成，无需重复提交.");
		}
		reportTaskReviewEntity.setReportReviewStatusId(reportTaskReviewDTO.getReportReviewStatusId());
		reportTaskReviewEntity.setReviewDesc(reportTaskReviewDTO.getReviewDesc());
		reportTaskReviewEntity.setReviewTime(new Date());
		reportTaskReviewEntity.setIsFinalVersion(String.valueOf(FinalVersionTypeEnum.FINAL_VERSION.ordinal()));
		//更新当前评审信息
		this.reportTaskDAO.update(reportTaskReviewEntity);
		//更新所有未评审的信息（系统评审）
		List<ReportTaskReviewDTO> unReviewlist = 
				this.reportTaskDAO.getReportTaskUnReviewEntityListByUploadId(reportTaskReviewEntity.getReportTaskUploadId()/*,reportTaskReviewDTO.getReportTaskReviewId()*/);
		for (ReportTaskReviewDTO reportTaskUnReviewDTO : unReviewlist) {
			ReportTaskReviewEntity reportTaskUnReviewEntity = this.reportTaskDAO.getEntity(ReportTaskReviewEntity.class, reportTaskUnReviewDTO.getReportTaskReviewId());
			reportTaskUnReviewEntity.setReportReviewTypeId(String.valueOf(ReportReviewTypeEnum.SYSTEM_REVIEW.ordinal()));
			reportTaskUnReviewEntity.setReportReviewStatusId(reportTaskReviewEntity.getReportReviewStatusId());
			reportTaskUnReviewEntity.setReviewTime(new Date());
			reportTaskUnReviewEntity.setReviewDesc("系统自动评审.");
			reportTaskUnReviewEntity.setIsFinalVersion(String.valueOf(FinalVersionTypeEnum.FINAL_VERSION.ordinal()));
			this.reportTaskDAO.update(reportTaskUnReviewEntity);
		}
		
		if (reportTaskReviewDTO.getReportReviewStatusId().equals(String.valueOf(ReportReviewStatusEnum.AGREE.ordinal()))) {
			//审核通过时，保存报表任务加密信息
			this.reportTaskEncryptionService.saveTaskEncryptionInfo(reportTaskReviewDTO);
		} else {
			//审核不通过，更新报表任务信息，结束任务
			ReportTaskUploadEntity reportTaskUploadEntity = 
					this.reportTaskDAO.getReportTaskUploadEntityById(reportTaskReviewEntity.getReportTaskUploadId());
			ReportTaskEntity reportTaskEntity = this.reportTaskDAO.getReportTaskEntityById(reportTaskUploadEntity.getReportTaskId());
			reportTaskEntity.setEndTime(new Date());
			this.reportTaskDAO.update(reportTaskEntity);
		}
		//返回处理结果
		return ActionResultUtil.getActionResult(reportTaskReviewDTO.getReportTaskReviewId(), "任务评审成功.");
	}
	
	/**
	 * 保存报表任务审核信息
	 * @param reportTaskDTO
	 * @param reportReviewTypeEnum
	 * @throws Exception
	 */
	public void saveTaskReviewerInfo(ReportTaskDTO reportTaskDTO,ReportReviewTypeEnum reportReviewTypeEnum) throws Exception {
		List<TaskReviewerEntity> taskReviewerList = this.taskStrategyDAO.getTaskReviewerEntityListById(reportTaskDTO.getTaskStrategyId());
		for (TaskReviewerEntity taskReviewerEntity : taskReviewerList) {
			ReportTaskReviewEntity reportTaskReviewEntity = new ReportTaskReviewEntity();
			reportTaskReviewEntity.setPaaEmployeeId(taskReviewerEntity.getPaaEmployeeId());
			reportTaskReviewEntity.setPaaUsername(taskReviewerEntity.getPaaUsername());
			reportTaskReviewEntity.setReportTaskUploadId(reportTaskDTO.getReportTaskUploadId());
			reportTaskReviewEntity.setReportReviewTypeId(String.valueOf(reportReviewTypeEnum.ordinal()));
			reportTaskReviewEntity.setIsFinalVersion(String.valueOf(FinalVersionTypeEnum.FINAL_VERSION.ordinal()));
			this.reportTaskDAO.insert(reportTaskReviewEntity);
		}
	}
	
	/**
	 * 获取报表任务审核信息列表
	 * @return
	 */
	public List<ReportTaskReviewDTO> getReportTaskReviewList() {
		return this.reportTaskDAO.getReportTaskReviewList();
	}
	
	/**
	 * 根据报表任务评审ID获取报表任务审核信息
	 * @return
	 */
	public ReportTaskReviewDTO getReportTaskReviewInfoById(String reportTaskReviewId) {
		return this.reportTaskDAO.getReportTaskReviewInfoById(reportTaskReviewId);
	}

	/**
	 * 根据paa用户ID获取报表任务审核信息
	 * @param paaEmployeeId
	 * @return
	 */
	public List<ReportTaskReviewDTO> getReportTaskReviewInfoByPaaEmployeeId(String paaEmployeeId,String isFilter) {
		return this.reportTaskDAO.getReportTaskReviewInfoByPaaEmployeeId(paaEmployeeId,isFilter);
	}
}