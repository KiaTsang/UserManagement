package ecp.bsp.business.file.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import ecp.bsp.system.core.BaseEntity;

/**
 * 分发类型实体
 * 
 * @since 2015-10-13 <br>
 * 
 * @author tangwenfen.
 */
@Entity
@Table(name = "PMS_REPORT_SEND_TYPE", schema = "PMSWEB_DBA")
public class ReportSendTypeEntity extends BaseEntity {
	/**
	 * 版本号.
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 分发类型名称.
	 */
	private String reportSendTypeName;
	
	/**
	 * 分发类型ID.
	 * 
	 * @return 分发类型ID.
	 */
	@Id
	@Column(name = "REPORT_SEND_TYPE_ID", unique = true, nullable = false, length = 32)
	public String getReportSendTypeId() {
		return this.getId();
	}

	/**
	 * 设置分发类型ID.
	 * 
	 * @param reportSendTypeId         
	 */
	public void setReportSendTypeId(String reportSendTypeId) {
		this.setId(reportSendTypeId);
	}
	
	@Column(name = "REPORT_SEND_TYPE_NAME", nullable = false, length = 50)
	public String getReportSendTypeName() {
		return reportSendTypeName;
	}
	
	public void setReportSendTypeName(String reportSendTypeName) {
		this.reportSendTypeName = reportSendTypeName;
	}
	
}
