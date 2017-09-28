package ecp.bsp.business.file.job;

import java.util.Date;

import org.quartz.DisallowConcurrentExecution;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.PersistJobDataAfterExecution;
import org.springframework.stereotype.Service;

import ecp.bsp.business.file.constant.TaskConst;
import ecp.bsp.business.file.dto.ReportTaskDTO;
import ecp.bsp.business.file.dto.TaskStrategyDTO;
import ecp.bsp.business.file.task.RepTaskDownloadTask;
import ecp.bsp.system.framework.thread.ThreadPool;

/**
 * 日报表任务调度任务
 *
 * @author zengqingyue
 * 
 * @since 2014-07-10
 */
@Service
@PersistJobDataAfterExecution
@DisallowConcurrentExecution
public class ReportTaskJob implements Job{
	/**
	 * 执行日报表FTP上传功能
	 */
	@Override
	public void execute(JobExecutionContext context) {
		TaskStrategyDTO taskStrategyDTO = (TaskStrategyDTO) context.getJobDetail().getJobDataMap().get("taskStrategyDTO");
		if (taskStrategyDTO != null) {
			ReportTaskDTO reportTaskDTO = new ReportTaskDTO();
			reportTaskDTO.setPaaEmployeeId(TaskConst.PARAM_SYSTEM_MANAGER_ID);
			reportTaskDTO.setPaaUsername(TaskConst.PARAM_SYSTEM_MANAGER_NAME);
			reportTaskDTO.setReportTaskName("自动任务_" + taskStrategyDTO.getProductTypeName() + "_" + taskStrategyDTO.getOperatorName()  + "_" +
					taskStrategyDTO.getBrandName()+ "_" + new Date().getTime());
			reportTaskDTO.setTaskStrategyId(taskStrategyDTO.getTaskStrategyId());
			reportTaskDTO.setFtpId(taskStrategyDTO.getReportSourceFtpId());
			reportTaskDTO.setIsMatchRule(taskStrategyDTO.getIsMatchRule());
			reportTaskDTO.setBrandName(taskStrategyDTO.getBrandName());
			reportTaskDTO.setProductTypeName(taskStrategyDTO.getProductTypeName());
			reportTaskDTO.setOperatorName(taskStrategyDTO.getOperatorName());
			ThreadPool.getInstance().addTask(new RepTaskDownloadTask(reportTaskDTO));
		}
	}
}