package ecp.bsp.business.file.job;

import org.quartz.DisallowConcurrentExecution;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.PersistJobDataAfterExecution;
import org.springframework.stereotype.Service;

import ecp.bsp.business.file.service.impl.ReportTaskService;
import ecp.bsp.system.framework.context.ContextBeanFactory;

/**
 * 报表任务发送信息同步任务（用于与安全服务器的数据库表同步）
 *
 * @author zengqingyue
 * 
 * @since 2014-07-30
 */
@Service
@PersistJobDataAfterExecution
@DisallowConcurrentExecution
public class RepTaskSendSyncJob implements Job{
	private ReportTaskService reportTaskService ;
	
	public ReportTaskService getReportTaskService() {
		if (this.reportTaskService == null) {
			this.reportTaskService = (ReportTaskService) ContextBeanFactory.getBeanByClass(ReportTaskService.class);
		}
		
		return reportTaskService;
	}
	
	@Override
	public void execute(JobExecutionContext arg0) throws JobExecutionException {
		try {
			this.getReportTaskService().syncRepTaskSendInfo();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}