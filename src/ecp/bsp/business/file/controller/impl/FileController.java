package ecp.bsp.business.file.controller.impl;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.Resource;


import org.springframework.stereotype.Controller;

import ecp.bsp.business.file.constant.TaskConst;
import ecp.bsp.business.file.dto.BrandDTO;
import ecp.bsp.business.file.dto.EmailReceiverDTO;
import ecp.bsp.business.file.dto.EncryptionAlgorithmDTO;
import ecp.bsp.business.file.dto.OperatorDTO;
import ecp.bsp.business.file.dto.ProductTypeDTO;
import ecp.bsp.business.file.dto.QueryResultDTO;
import ecp.bsp.business.file.dto.ReportRuleDTO;
import ecp.bsp.business.file.dto.ReportTaskDTO;
import ecp.bsp.business.file.dto.ReportTaskEncryptionDTO;
import ecp.bsp.business.file.dto.ReportTaskReviewDTO;
import ecp.bsp.business.file.dto.Select2DTO;
import ecp.bsp.business.file.dto.Select2JSON;
import ecp.bsp.business.file.dto.Select2ResultDTO;
import ecp.bsp.business.file.dto.TaskStrategyDTO;
import ecp.bsp.system.framework.mail.data.dto.MailModeDTO;
import ecp.bsp.business.file.service.impl.AlgorithmService;
import ecp.bsp.business.file.service.impl.BrandConfigService;
import ecp.bsp.business.file.service.impl.EmailConfigService;
import ecp.bsp.business.file.service.impl.FtpConfigService;
import ecp.bsp.business.file.service.impl.ProductConfigService;
import ecp.bsp.business.file.service.impl.OperatorConfigService;
import ecp.bsp.business.file.service.impl.ReportTaskEncryptionService;
import ecp.bsp.business.file.service.impl.ReportTaskReviewService;
import ecp.bsp.business.file.service.impl.ReportTaskService;
import ecp.bsp.business.file.service.impl.TaskStrategyService;
import ecp.bsp.business.file.service.impl.MailModeConfigService;
import ecp.bsp.system.framework.query.impl.PageQueryService;
import ecp.bsp.system.commons.dto.ActionResult;
import ecp.bsp.system.commons.dto.AjaxResult;
import ecp.bsp.system.framework.ftp.data.dto.FtpDTO;
import ecp.bsp.system.framework.query.data.entity.DynamicGridQueryEntity;
import ecp.bsp.system.framework.query.data.entity.QueryPager;
import ecp.bsp.system.framework.query.PageQueryHepler;

/**
 * 文件跟踪系统控制层
 * 
 * @since 2015-06-08 <br>
 * 
 * @author zengqingyue.
 * 
 */
@Controller
public class FileController {
	@Resource
	private ProductConfigService productTypeConfigService;
	
	@Resource
	private OperatorConfigService operatorConfigService;
	
	@Resource
	private BrandConfigService brandConfigService;
	
	@Resource
	private EmailConfigService emailConfigService;
	
	@Resource
	private AlgorithmService algorithmService;
	
	@Resource
	private FtpConfigService ftpConfigService;
	
	@Resource
	private TaskStrategyService taskStrategyService;
	
	@Resource
	private ReportTaskService reportTaskService;
	
	@Resource
	private ReportTaskReviewService reportTaskReviewService;
	
	@Resource
	private ReportTaskEncryptionService reportTaskEncryptionService;
	
	@Resource
	private MailModeConfigService mailModeConfigService;
	
	@Resource
	private PageQueryService pageQueryService;
	/**
	 * 根据策略id获得策略描述
	 * @param 策略id
	 * @return
	 */
	public Object getStrategyDisc(String strategyId) {
		AjaxResult ajaxResult = new AjaxResult();
		String result = "";
		try {
		
			TaskStrategyDTO taskStrategyDTO = this.taskStrategyService.getTaskStrategyDTO(strategyId);
			if (taskStrategyDTO!=null) {
				ajaxResult.setSuccess(true);
				result = taskStrategyDTO.getTaskStrategyDesc();
			    ajaxResult.setMsg(taskStrategyDTO.getTaskStrategyDesc());
			} else {
				ajaxResult.setSuccess(false);
				ajaxResult.setMsg("");
			}
		} catch (Exception e) {
			ajaxResult.setSuccess(false);
			ajaxResult.setMsg(e.getMessage());
		}	
		
		return result;
	}
	
	/**
	 * 提交产品类型信息
	 * @param productTypeDTO
	 * @return
	 */
	public Object submitProductType(ProductTypeDTO productTypeDTO){
		ActionResult result = null;	
		AjaxResult ajaxResult = new AjaxResult();
		
		try {
			result = this.productTypeConfigService.submitProductType(productTypeDTO);
			ajaxResult.setSuccess(true);
			ajaxResult.setMsg(result);
		} catch (Exception e) {
			ajaxResult.setSuccess(false);
			ajaxResult.setMsg(e.getMessage());
		}	
		
		return ajaxResult;
	}
	
	/**
	 * 修改产品类型信息
	 * @param productTypeDTO
	 * @return
	 */
	public Object modifyProductType(ProductTypeDTO productTypeDTO){
		ActionResult result = null;	
		AjaxResult ajaxResult = new AjaxResult();
		
		try {
			result = this.productTypeConfigService.modifyProductType(productTypeDTO);
			ajaxResult.setSuccess(true);
			ajaxResult.setMsg(result);
		} catch (Exception e) {
			ajaxResult.setSuccess(false);
			ajaxResult.setMsg(e.getMessage());
		}	
		
		return ajaxResult;
	}
	
	/**
	 * 删除产品类型信息
	 * @param productTypeId
	 * @return
	 */
	public Object deleteProductType(String productTypeId){
		ActionResult result = null;	
		AjaxResult ajaxResult = new AjaxResult();
		
		try {
			result = this.productTypeConfigService.deleteProductType(productTypeId);
			ajaxResult.setSuccess(true);
			ajaxResult.setMsg(result);
		} catch (Exception e) {
			ajaxResult.setSuccess(false);
			ajaxResult.setMsg(e.getMessage());
		}	
		
		return ajaxResult;
	}
	
	/**
	 * 获取产品类型信息列表
	 * @return
	 */
	public Object getProductTypeList(){
		List<ProductTypeDTO> list = this.productTypeConfigService.getProductTypeList();
		return list;
	}
	
	/**
	 * 提交运营商信息
	 * @param productTypeDTO
	 * @return
	 */
	public Object submitOperator(OperatorDTO OperatorDTO){
		ActionResult result = null;	
		AjaxResult ajaxResult = new AjaxResult();
		
		try {
			result = this.operatorConfigService.submitOperator(OperatorDTO);
			ajaxResult.setSuccess(true);
			ajaxResult.setMsg(result);
		} catch (Exception e) {
			ajaxResult.setSuccess(false);
			ajaxResult.setMsg(e.getMessage());
		}	
		
		return ajaxResult;
	}
	
	/**
	 * 修改运营商信息
	 * @param OperatorDTO
	 * @return
	 */
	public Object modifyOperator(OperatorDTO OperatorDTO){
		ActionResult result = null;	
		AjaxResult ajaxResult = new AjaxResult();
		
		try {
			result = this.operatorConfigService.modifyOperator(OperatorDTO);
			ajaxResult.setSuccess(true);
			ajaxResult.setMsg(result);
		} catch (Exception e) {
			ajaxResult.setSuccess(false);
			ajaxResult.setMsg(e.getMessage());
		}	
		
		return ajaxResult;
	}
	
	/**
	 * 删除运营商信息
	 * @param operatorId
	 * @return
	 */
	public Object deleteOperator(String operatorId){
		ActionResult result = null;	
		AjaxResult ajaxResult = new AjaxResult();
		
		try {
			result = this.operatorConfigService.deleteOperator(operatorId);
			ajaxResult.setSuccess(true);
			ajaxResult.setMsg(result);
		} catch (Exception e) {
			ajaxResult.setSuccess(false);
			ajaxResult.setMsg(e.getMessage());
		}	
		
		return ajaxResult;
	}
	
	/**
	 * 获取运营商信息列表
	 * @return
	 */
	public Object getOperatorList(){
		List<OperatorDTO> list = this.operatorConfigService.getOperatorList();
		return list;
	}
	
	/**
	 * 提交品牌信息
	 * @param productTypeDTO
	 * @return
	 */
	public Object submitBrand(BrandDTO brandDTO){
		ActionResult result = null;	
		AjaxResult ajaxResult = new AjaxResult();
		
		try {
			result = this.brandConfigService.submitBrand(brandDTO);
			ajaxResult.setSuccess(true);
			ajaxResult.setMsg(result);
		} catch (Exception e) {
			ajaxResult.setSuccess(false);
			ajaxResult.setMsg(e.getMessage());
		}	
		
		return ajaxResult;
	}
	
	/**
	 * 修改品牌信息
	 * @param BrandDTO
	 * @return
	 */
	public Object modifyBrand(BrandDTO brandDTO){
		ActionResult result = null;	
		AjaxResult ajaxResult = new AjaxResult();
		
		try {
			result = this.brandConfigService.modifyBrand(brandDTO);
			ajaxResult.setSuccess(true);
			ajaxResult.setMsg(result);
		} catch (Exception e) {
			ajaxResult.setSuccess(false);
			ajaxResult.setMsg(e.getMessage());
		}	
		
		return ajaxResult;
	}
	
	/**
	 * 删除品牌信息
	 * @param BrandId
	 * @return
	 */
	public Object deleteBrand(String brandId){
		ActionResult result = null;	
		AjaxResult ajaxResult = new AjaxResult();
		
		try {
			result = this.brandConfigService.deleteBrand(brandId);
			ajaxResult.setSuccess(true);
			ajaxResult.setMsg(result);
		} catch (Exception e) {
			ajaxResult.setSuccess(false);
			ajaxResult.setMsg(e.getMessage());
		}	
		
		return ajaxResult;
	}
	
	/**
	 * 获取品牌信息列表
	 * @return
	 */
	public Object getBrandList(){
		List<BrandDTO> list = this.brandConfigService.getBrandList();
		return list;
	}
	
	/**
	 * 提交邮箱信息
	 * @param emailReceiverDTO
	 * @return
	 */
	public Object submitEmailReceiver(EmailReceiverDTO emailReceiverDTO){
		ActionResult result = null;	
		AjaxResult ajaxResult = new AjaxResult();
		
		try {
			result = this.emailConfigService.submitEmailReceiver(emailReceiverDTO);
			ajaxResult.setSuccess(true);
			ajaxResult.setMsg(result);
		} catch (Exception e) {
			ajaxResult.setSuccess(false);
			ajaxResult.setMsg(e.getMessage());
		}	
		
		return ajaxResult;
	}
	
	/**
	 * 修改邮箱信息
	 * @param emailReceiverDTO
	 * @return
	 */
	public Object modifyEmailReceiver(EmailReceiverDTO emailReceiverDTO){
		ActionResult result = null;	
		AjaxResult ajaxResult = new AjaxResult();
		
		try {
			result = this.emailConfigService.modifyEmailReceiver(emailReceiverDTO);
			ajaxResult.setSuccess(true);
			ajaxResult.setMsg(result);
		} catch (Exception e) {
			ajaxResult.setSuccess(false);
			ajaxResult.setMsg(e.getMessage());
		}	
		
		return ajaxResult;
	}
	
	/**
	 * 删除邮箱信息
	 * @param emailReceiverId
	 * @return
	 */
	public Object deleteEmailReceiver(String emailReceiverId){
		ActionResult result = null;	
		AjaxResult ajaxResult = new AjaxResult();
		
		try {
			result = this.emailConfigService.deleteEmailReceiver(emailReceiverId);
			ajaxResult.setSuccess(true);
			ajaxResult.setMsg(result);
		} catch (Exception e) {
			ajaxResult.setSuccess(false);
			ajaxResult.setMsg(e.getMessage());
		}	
		
		return ajaxResult;
	}
	
	/**
	 * 获取邮箱信息列表
	 * @return
	 */
	public Object getEmailReceiverList(){
		List<EmailReceiverDTO> list = this.emailConfigService.getEmailReceiverList();
		return list;
	}
	/**
	 * 提交FTP信息
	 * @param ftpDTO
	 * @return
	 */
	public Object submitFtp(FtpDTO ftpDTO){
		ActionResult result = null;	
		AjaxResult ajaxResult = new AjaxResult();
		
		try {
			result = this.ftpConfigService.submitFtp(ftpDTO);
			ajaxResult.setSuccess(true);
			ajaxResult.setMsg(result);
		} catch (Exception e) {
			ajaxResult.setSuccess(false);
			ajaxResult.setMsg(e.getMessage());
		}	
		
		return ajaxResult;
	}
	
	/**
	 * 修改FTP信息
	 * @param ftpDTO
	 * @return
	 */
	public Object modifyFtp(FtpDTO ftpDTO){
		ActionResult result = null;	
		AjaxResult ajaxResult = new AjaxResult();
		
		try {
			result = this.ftpConfigService.modifyFtp(ftpDTO);
			ajaxResult.setSuccess(true);
			ajaxResult.setMsg(result);
		} catch (Exception e) {
			ajaxResult.setSuccess(false);
			ajaxResult.setMsg(e.getMessage());
		}	
		
		return ajaxResult;
	}
	
	/**
	 * 删除FTP信息
	 * @param FtpId
	 * @return
	 */
	public Object deleteFtp(String ftpId){
		ActionResult result = null;	
		AjaxResult ajaxResult = new AjaxResult();
		
		try {
			result = this.ftpConfigService.deleteFtp(ftpId);
			ajaxResult.setSuccess(true);
			ajaxResult.setMsg(result);
		} catch (Exception e) {
			ajaxResult.setSuccess(false);
			ajaxResult.setMsg(e.getMessage());
		}	
		
		return ajaxResult;
	}
	
	/**
	 * 获取FTP信息列表
	 * @return
	 */
	public Object getFtpList(){
		List<FtpDTO> list = this.ftpConfigService.getFtpList();
		return list;
	}
	
	/**
	 * 根据FTP的ID获取FTP
	 * @param ftpId
	 * @return
	 */
	public FtpDTO getFtpById(String ftpId) {
		return this.ftpConfigService.getFtpById(ftpId);
	}
	
	/**
	 * 提交加密算法信息
	 * @param encryptionAlgorithmDTO
	 * @return
	 */
	public Object submitEncryptionAlgorithm(EncryptionAlgorithmDTO encryptionAlgorithmDTO){
		ActionResult result = null;	
		AjaxResult ajaxResult = new AjaxResult();
		
		try {
			result = this.algorithmService.submitEncryptionAlgorithm(encryptionAlgorithmDTO);
			ajaxResult.setSuccess(true);
			ajaxResult.setMsg(result);
		} catch (Exception e) {
			ajaxResult.setSuccess(false);
			ajaxResult.setMsg(e.getMessage());
		}	
		
		return ajaxResult;
	}
	
	/**
	 * 修改加密算法信息
	 * @param encryptionAlgorithmDTO
	 * @return
	 */
	public Object modifyEncryptionAlgorithm(EncryptionAlgorithmDTO encryptionAlgorithmDTO){
		ActionResult result = null;	
		AjaxResult ajaxResult = new AjaxResult();
		
		try {
			result = this.algorithmService.modifyEncryptionAlgorithm(encryptionAlgorithmDTO);
			ajaxResult.setSuccess(true);
			ajaxResult.setMsg(result);
		} catch (Exception e) {
			ajaxResult.setSuccess(false);
			ajaxResult.setMsg(e.getMessage());
		}	
		
		return ajaxResult;
	}
	
	/**
	 * 删除加密算法信息
	 * @param encryptionAlgorithmId
	 * @return
	 */
	public Object deleteEncryptionAlgorithm(String encryptionAlgorithmId){
		ActionResult result = null;	
		AjaxResult ajaxResult = new AjaxResult();
		
		try {
			result = this.algorithmService.deleteEncryptionAlgorithm(encryptionAlgorithmId);
			ajaxResult.setSuccess(true);
			ajaxResult.setMsg(result);
		} catch (Exception e) {
			ajaxResult.setSuccess(false);
			ajaxResult.setMsg(e.getMessage());
		}	
		
		return ajaxResult;
	}
	
	/**
	 * 获取加密算法信息列表
	 * @return
	 */
	public Object getEncryptionAlgorithmList(){
		List<EncryptionAlgorithmDTO> list = this.taskStrategyService.getEncryptionAlgorithmList();
		return list;
	}
	
	/**
	 * 根据加密算法ID获取加密算法信息
	 * @return
	 */
	public EncryptionAlgorithmDTO getEncryptionAlgorithmById(String encryptionAlgorithmId){
		return  this.algorithmService.getEncryptionAlgorithmById(encryptionAlgorithmId);
	}
	
	/**
	 * 提交任务策略信息
	 * @param taskStrategyDTO
	 * @return
	 */
	public Object submitTaskStrategy(TaskStrategyDTO taskStrategyDTO,ReportRuleDTO reportRuleDTO){
		ActionResult result = null;	
		AjaxResult ajaxResult = new AjaxResult();
		
		try {
			taskStrategyDTO.setReportRuleList(reportRuleDTO.getReportRuleList());
			result = this.taskStrategyService.submitTaskStrategy(taskStrategyDTO);
			ajaxResult.setSuccess(true);
			ajaxResult.setMsg(result);
		} catch (Exception e) {
			ajaxResult.setSuccess(false);
			ajaxResult.setMsg(e.getMessage());
		}	
		
		return ajaxResult;
	}
	
	/**
	 * 修改任务策略信息
	 * @param taskStrategyDTO
	 * @return
	 */
	public Object modifyTaskStrategy(TaskStrategyDTO taskStrategyDTO,ReportRuleDTO reportRuleDTO){
		ActionResult result = null;	
		AjaxResult ajaxResult = new AjaxResult();
		
		try {
			taskStrategyDTO.setReportRuleList(reportRuleDTO.getReportRuleList());
			result = this.taskStrategyService.modifyTaskStrategy(taskStrategyDTO);
			ajaxResult.setSuccess(true);
			ajaxResult.setMsg(result);
		} catch (Exception e) {
			ajaxResult.setSuccess(false);
			ajaxResult.setMsg(e.getMessage());
		}	
		
		return ajaxResult;
	}
	
	/**
	 * 停用任务策略信息
	 * @param taskStrategyDTO
	 * @return
	 */
	public Object stopTaskStrategy(TaskStrategyDTO taskStrategyDTO){
		ActionResult result = null;	
		AjaxResult ajaxResult = new AjaxResult();
		
		try {
			result = this.taskStrategyService.stopTaskStrategy(taskStrategyDTO);
			ajaxResult.setSuccess(true);
			ajaxResult.setMsg(result);
		} catch (Exception e) {
			ajaxResult.setSuccess(false);
			ajaxResult.setMsg(e.getMessage());
		}	
		
		return ajaxResult;
	}
	
	/**
	 * 启用任务策略信息
	 * @param taskStrategyDTO
	 * @return
	 */
	public Object resumeTaskStrategy(TaskStrategyDTO taskStrategyDTO){
		ActionResult result = null;	
		AjaxResult ajaxResult = new AjaxResult();
		
		try {
			result = this.taskStrategyService.resumeTaskStrategy(taskStrategyDTO);
			ajaxResult.setSuccess(true);
			ajaxResult.setMsg(result);
		} catch (Exception e) {
			ajaxResult.setSuccess(false);
			ajaxResult.setMsg(e.getMessage());
		}	
		
		return ajaxResult;
	}
	
	/**
	 * 获取任务策略信息列表
	 * @return
	 */
	public Object getTaskStrategyList(){
		List<TaskStrategyDTO> list = this.taskStrategyService.getTaskStrategyList();
		return list;
	}
	
	/**
	 * 获取已经使用的任务策略信息列表
	 * @return
	 */
	public Object getUsedTaskStrategyList(){
		List<TaskStrategyDTO> list = this.taskStrategyService.getUsedTaskStrategyList();
		return list;
	}

	/**
	 * 根据任务策略信息ID获取任务策略信息列表
	 * @param taskStrategyId
	 * @return
	 */
	public TaskStrategyDTO getTaskStrategyInfoById(String taskStrategyId) {
		//TaskStrategyDTO taskStrategyDTO=this.taskStrategyService.getTaskStrategyInfoById(taskStrategyId);
		return this.taskStrategyService.getTaskStrategyInfoById(taskStrategyId);
	}
	
	/**
	 * 根据任务策略信息ID获取报表规则信息列表
	 * @param taskStrategyId
	 * @return
	 */
	public Object getReportRuleList(String taskStrategyId){
		List<ReportRuleDTO> list = this.taskStrategyService.getReportRuleList(taskStrategyId);
		return list;
	}
	
	
	/**
	 * 提交报表任务
	 * @param reportTaskDTO
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings("rawtypes")
	public Object submitReportTask(ReportTaskDTO reportTaskDTO,List localFileList) throws Exception{
		ActionResult result = null;	
		AjaxResult ajaxResult = new AjaxResult();
		try {
			result = this.reportTaskService.submitReportTask(reportTaskDTO,localFileList);
			ajaxResult.setSuccess(true);
			ajaxResult.setMsg(result);
		} catch (Exception e) {
			ajaxResult.setSuccess(false);
			ajaxResult.setMsg(e.getMessage());
		}	
		
		return ajaxResult;
	}
	
	/**
	 * 上传报表任务附件
	 * @param reportTaskId
	 * @param fileCreateIds
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("rawtypes")
	public Object uploadReportTaskAttachment(String reportTaskId,List fileCreateIds) throws Exception{
		ActionResult result = null;	
		AjaxResult ajaxResult = new AjaxResult();
		try {
			result = this.reportTaskService.uploadReportTaskAttachment(reportTaskId,fileCreateIds);
			ajaxResult.setSuccess(true);
			ajaxResult.setMsg(result);
		} catch (Exception e) {
			ajaxResult.setSuccess(false);
			ajaxResult.setMsg(e.getMessage());
		}	
		
		return ajaxResult;
	}
	
	/**
	 * 获取报表任务信息列表
	 * @return
	 */
	public Object getReportTaskList(){
		List<ReportTaskDTO> list = this.reportTaskService.getReportTaskList();
		return list;
	}
	
	/**
	 * 获取报表任务信息列表（根据查询条件queryCondition）
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public Object getReportTaskListByCondition(List queryCondition,Integer start,Integer limit){
		String sql = TaskConst.SQL_GET_REPORT_TASK_LIST;
		List<DynamicGridQueryEntity> filter = PageQueryHepler.createConditions(queryCondition);
		QueryPager queryPager = this.pageQueryService.queryList(filter, sql, start, limit, ReportTaskDTO.class);
		QueryResultDTO queryResultDTO = new QueryResultDTO();
		queryResultDTO.setRecordsTotal(queryPager.getTotalCount());
		queryResultDTO.setRecordsFiltered((queryPager.getTotalCount()));
		queryResultDTO.setData(queryPager.getResult());
		return queryResultDTO;
	}
	
	/**
	 * 获取已经使用的任务策略信息列表（根据查询条件queryCondition）
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Object getUsedTaskStrategyListByCondition(List queryCondition,Integer start,Integer limit){
		String sql = TaskConst.SQL_GET_USED_TASK_STRATEGY_INFO_LIST;
		List<DynamicGridQueryEntity> filter = PageQueryHepler.createConditions(queryCondition);
		QueryPager queryPager = this.pageQueryService.queryList(filter, sql, start, limit, TaskStrategyDTO.class);
		
		List<TaskStrategyDTO> taskStrategyDTOList = (List<TaskStrategyDTO>) queryPager.getResult();
		Select2JSON json = new Select2JSON();
		List<Select2DTO<String>> Select2DTOList = new ArrayList<Select2DTO<String>>();
		for (TaskStrategyDTO taskStrategyDTO : taskStrategyDTOList) {
            Select2DTO<String> select2 = new Select2DTO<String>();
            select2.setId(taskStrategyDTO.getId());
            select2.setText(taskStrategyDTO.getText());
            Select2DTOList.add(select2);
        }
		json.setResults(Select2DTOList);
		json.setMore((start + limit - 1) < queryPager.getTotalCount());
		
		Select2ResultDTO select2ResultDTO = new Select2ResultDTO();
		select2ResultDTO.setJson(json);
		select2ResultDTO.setSuccess(true);
		
		return select2ResultDTO;
	}
	
	/**
	 * 根据用户ID获取报表任务信息列表
	 * @return
	 */
	public Object getReportTaskListByPaaEmployeeId(String paaEmployeeId){
		List<ReportTaskDTO> list = this.reportTaskService.getReportTaskListByPaaEmployeeId(paaEmployeeId);
		return list;
	}
	
	/**
	 * 根据报表任务ID获取报表任务信息列表
	 * @return
	 */
	public Object getReportTaskInfoByReportTaskId(String reportTaskId){
		return this.reportTaskService.getReportTaskInfoByReportTaskId(reportTaskId);
	}
	
	/**
	 * 根据报表任务ID获取任务附件
	 * @param reportTaskId
	 * @return
	 */
	public Object getReportTaskAttachmentByReportTaskId(String reportTaskId){
		return this.reportTaskService.getReportTaskAttachmentByReportTaskId(reportTaskId);
	}
	
	
	/**
	 * 获取报表任务上传信息列表
	 * @return
	 */
	public Object getReportTaskUploadList(){
		List<ReportTaskDTO> list = this.reportTaskService.getReportTaskUploadList();
		return list;
	}
	
	/**
	 * 根据用户ID获取报表任务上传信息列表
	 * @return
	 */
	public Object getReportTaskUploadListByPaaEmployeeId(String paaEmployeeId){
		List<ReportTaskDTO> list = this.reportTaskService.getReportTaskUploadListByPaaEmployeeId(paaEmployeeId);
		return list;
	}
	
	/**
	 * 提交报表任务评审信息
	 * @param reportTaskReviewDTO
	 * @return
	 * @throws Exception
	 */
	public Object submitReportTaskReview(ReportTaskReviewDTO reportTaskReviewDTO) throws Exception{
		ActionResult result = null;	
		AjaxResult ajaxResult = new AjaxResult();
		try {
			result = this.reportTaskReviewService.submitReportTaskReview(reportTaskReviewDTO);
			ajaxResult.setSuccess(true);
			ajaxResult.setMsg(result);
		} catch (Exception e) {
			ajaxResult.setSuccess(false);
			ajaxResult.setMsg(e.getMessage());
		}
		
		return ajaxResult;
	}
	
	/**
	 * 获取报表任务审核信息列表
	 * @return
	 */
	public Object getReportTaskReviewList(){
		List<ReportTaskReviewDTO> list = this.reportTaskReviewService.getReportTaskReviewList();
		return list;
	}
	
	/**
	 * 根据paa用户ID获取报表任务审核信息
	 * @param reportTaskReviewId
	 * @return
	 */
	public Object getReportTaskReviewInfoByPaaEmployeeId(String paaEmployeeId ,String isFilter){
		return this.reportTaskReviewService.getReportTaskReviewInfoByPaaEmployeeId(paaEmployeeId,isFilter);
	}
	
	/**
	 * 根据报表任务评审ID获取报表任务审核信息
	 * @param reportTaskReviewId
	 * @return
	 */
	public Object getReportTaskReviewInfoById(String reportTaskReviewId){
		return this.reportTaskReviewService.getReportTaskReviewInfoById(reportTaskReviewId);
	}
	
	/**
	 * 提交报表任务加密信息
	 * @param reportTaskEncryptionDTO
	 * @return
	 * @throws Exception 
	 */
	public Object submitReportTaskEncryption(ReportTaskEncryptionDTO reportTaskEncryptionDTO) throws Exception{
		ActionResult result = null;	
		AjaxResult ajaxResult = new AjaxResult();
		try {
			result = this.reportTaskEncryptionService.submitReportTaskEncryption(reportTaskEncryptionDTO);
			ajaxResult.setSuccess(true);
			ajaxResult.setMsg(result);
		} catch (Exception e) {
			ajaxResult.setSuccess(false);
			ajaxResult.setMsg(e.getMessage());
		}	
		
		return ajaxResult;
	}
	
	/**
	 * 上传报表任务加密附件
	 * @param reportTaskId
	 * @param fileCreateIds
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("rawtypes")
	public Object uploadReportTaskEncryptionAttachment(String reportTaskId,List fileCreateIds) throws Exception{
		return this.reportTaskEncryptionService.uploadReportTaskEncryptionAttachment(reportTaskId,fileCreateIds);
	}
	
	/**
	 * 根据任务ID获取报表任务所有过程信息
	 * @param reportTaskId
	 * @return
	 */
	public Object getReportTaskAllInfoByTaskId(String reportTaskId){
		return this.reportTaskService.getReportTaskAllInfoByTaskId(reportTaskId);
	}
	
	/**
	 * 获取报表数量
	 * @return
	 */
	public Object getReporTaskNum() {
		return this.reportTaskService.getReporTaskNum();
	}
	
	/**
	 * 提交邮件模板信息
	 * @param mailModeDTO
	 * @return
	 */
	public Object submitMailMode(MailModeDTO mailModeDTO){
		ActionResult result = null;	
		AjaxResult ajaxResult = new AjaxResult();
		
		try {
			result = this.mailModeConfigService.submitMailMode(mailModeDTO);
			ajaxResult.setSuccess(true);
			ajaxResult.setMsg(result);
		} catch (Exception e) {
			ajaxResult.setSuccess(false);
			ajaxResult.setMsg(e.getMessage());
		}	
		
		return ajaxResult;
	}
	
	/**
	 * 修改邮件模板信息
	 * @param mailModeDTO
	 * @return
	 */
	public Object modifyMailMode(MailModeDTO mailModeDTO){
		ActionResult result = null;	
		AjaxResult ajaxResult = new AjaxResult();
		
		try {
			result = this.mailModeConfigService.modifyMailMode(mailModeDTO);
			ajaxResult.setSuccess(true);
			ajaxResult.setMsg(result);
		} catch (Exception e) {
			ajaxResult.setSuccess(false);
			ajaxResult.setMsg(e.getMessage());
		}	
		
		return ajaxResult;
	}
	
	/**
	 * 删除邮件模板信息
	 * @param mailModeId
	 * @return
	 */
	public Object deleteMailMode(String mailModeId){
		ActionResult result = null;	
		AjaxResult ajaxResult = new AjaxResult();
		
		try {
			result = this.mailModeConfigService.deleteMailMode(mailModeId);
			ajaxResult.setSuccess(true);
			ajaxResult.setMsg(result);
		} catch (Exception e) {
			ajaxResult.setSuccess(false);
			ajaxResult.setMsg(e.getMessage());
		}	
		
		return ajaxResult;
	}
	
	/**
	 * 获取邮件模板信息列表
	 * @return
	 */
	public Object getMailModeList(){
		List<MailModeDTO> list = this.mailModeConfigService.getMailModeList();
		return list;
	}
	
	/**
	 * 根据邮件模板的ID获取邮件模板
	 * @param mailModeId
	 * @return
	 */
	public MailModeDTO getMailModeById(String mailModeId) {
		return this.mailModeConfigService.getMailModeById(mailModeId);
	}
}