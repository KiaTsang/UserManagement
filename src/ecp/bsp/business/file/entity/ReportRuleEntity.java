package ecp.bsp.business.file.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import ecp.bsp.system.core.BaseEntity;

/**
 * 报表规则实体
 * 
 * @since 2015-06-08 <br>
 * 
 * @author zengqingyue.
 */
@Entity
@Table(name = "PMS_REPORT_RULE", schema = "PMSWEB_DBA")
public class ReportRuleEntity extends BaseEntity {
	/**
	 * 版本号.
	 */
	private static final long serialVersionUID = 1L;
	
	/**
	 * 报表规则表达式.
	 */
	private String reportRuleExpression;
	
	/**
	 * 报表规则描述.
	 */
	private String reportRuleExpressionEg;
	
	@Id
	@Column(name = "REPORT_RULE_ID", unique = true, nullable = false, length = 32)
	public String getReportRuleId() {
		return this.getId();
	}

	public void setReportRuleId(String reportRuleId) {
		this.setId(reportRuleId);
	}
	
	@Column(name = "REPORT_RULE_EXPRESSION", nullable = false, length = 50)
	public String getReportRuleExpression() {
		return reportRuleExpression;
	}
	
	public void setReportRuleExpression(String reportRuleExpression) {
		this.reportRuleExpression = reportRuleExpression;
	}
	
	@Column(name = "REPORT_RULE_EXPRESSION_EG", nullable = false, length = 50)
	public String getReportRuleExpressionEg() {
		return reportRuleExpressionEg;
	}
	
	public void setReportRuleExpressionEg(String reportRuleExpressionEg) {
		this.reportRuleExpressionEg = reportRuleExpressionEg;
	}

}