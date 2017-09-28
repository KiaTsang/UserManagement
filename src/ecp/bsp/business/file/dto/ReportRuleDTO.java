package ecp.bsp.business.file.dto;

import java.io.Serializable;
import java.util.List;

import org.springframework.stereotype.Component;

import ecp.bsp.system.core.BaseDTO;

/**
 * 报表规则DTO
 * 
 * @since 2015-06-26
 * 
 * @author zengqingyue.
 */
@Component
public class ReportRuleDTO extends BaseDTO implements Serializable{
	/**
	 * 序列化
	 */
	private static final long serialVersionUID = 1L;
	
	private List<ReportRuleDTO> reportRuleList;
	/**
	 * 任务报表规则ID.
	 */
	private String taskReportRuleId;
	/**
	 * 任务策略ID.
	 */
	private String taskStrategyId;
	/**
	 * 报表规则表达式.
	 */
	private String reportRuleId;
	/**
	 * 报表规则表达式.
	 */
	private String reportRuleExpression;
	
	/**
	 * 报表规则描述.
	 */
	private String reportRuleExpressionEg;

	/**
	 * 报表规则描述.
	 */
	private boolean isMatch;
	
	/**
	 * 报表规则描述.
	 */
	private String matchDesc;
	
	/**
	 * 报表规则描述.
	 */
	private List<Object> matchAttachmentList;
	
	public String getReportRuleId() {
		return reportRuleId;
	}

	public void setReportRuleId(String reportRuleId) {
		this.reportRuleId = reportRuleId;
	}

	public String getReportRuleExpression() {
		return reportRuleExpression;
	}

	public void setReportRuleExpression(String reportRuleExpression) {
		this.reportRuleExpression = reportRuleExpression;
	}

	public String getReportRuleExpressionEg() {
		return reportRuleExpressionEg;
	}

	public void setReportRuleExpressionEg(String reportRuleExpressionEg) {
		this.reportRuleExpressionEg = reportRuleExpressionEg;
	}
	
	public List<ReportRuleDTO> getReportRuleList() {
		return reportRuleList;
	}

	public void setReportRuleList(List<ReportRuleDTO> reportRuleList) {
		this.reportRuleList = reportRuleList;
	}

	public String getTaskReportRuleId() {
		return taskReportRuleId;
	}

	public void setTaskReportRuleId(String taskReportRuleId) {
		this.taskReportRuleId = taskReportRuleId;
	}

	public String getTaskStrategyId() {
		return taskStrategyId;
	}

	public void setTaskStrategyId(String taskStrategyId) {
		this.taskStrategyId = taskStrategyId;
	}

	public boolean isMatch() {
		return isMatch;
	}

	public void setMatch(boolean isMatch) {
		this.isMatch = isMatch;
	}

	public List<Object> getMatchAttachmentList() {
		return matchAttachmentList;
	}

	public void setMatchAttachmentList(List<Object> matchAttachmentList) {
		this.matchAttachmentList = matchAttachmentList;
	}

	public String getMatchDesc() {
		return matchDesc;
	}

	public void setMatchDesc(String matchDesc) {
		this.matchDesc = matchDesc;
	}
	
}