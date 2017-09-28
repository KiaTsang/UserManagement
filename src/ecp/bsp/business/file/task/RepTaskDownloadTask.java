package ecp.bsp.business.file.task;

import ecp.bsp.business.file.dto.ReportTaskDTO;
import ecp.bsp.business.file.service.impl.ReportTaskService;
import ecp.bsp.business.file.service.impl.ReportTaskService;
import ecp.bsp.system.framework.context.ContextBeanFactory;
import ecp.bsp.system.framework.thread.Task;

/**
 * 报表任务FTP下载任务
 * 
 * @since 2015-06-24
 * 
 * @author zengqingyue.
 */
public class RepTaskDownloadTask extends Task{
	
	private ReportTaskDTO reportTaskDTO;
	
	private ReportTaskService reportTaskService ;
	
	public ReportTaskService getReportTaskService() {
		if (this.reportTaskService == null) {
			this.reportTaskService = (ReportTaskService) ContextBeanFactory.getBeanByClass(ReportTaskService.class);
		}
		
		return reportTaskService;
	}
	
	public RepTaskDownloadTask() {
		super();
	}

	public RepTaskDownloadTask(ReportTaskDTO reportTaskDTO) {
		super();
		this.reportTaskDTO = reportTaskDTO;
	}

	@Override
	public Task[] taskCore() throws Exception {
		this.getReportTaskService().downloadReportTaskAttachmentByFtp(reportTaskDTO);
		return null;
	}

	@Override
	protected boolean useDb() {
		return false;
	}

	@Override
	protected boolean needExecuteImmediate() {
		return false;
	}

	@Override
	public String info() {
		return "报表任务FTP文件下载完成！";
	}

}
