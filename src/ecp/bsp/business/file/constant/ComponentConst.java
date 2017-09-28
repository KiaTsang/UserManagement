/****************************************************************
 ***        Copyright © EASTCOMPEACE        2016.11.01        ***
 ****************************************************************/
package ecp.bsp.business.file.constant;

/**
 * 组件常量类
 * 
 * @author <a href="mailto:zengqingyue@eastcompeace.com">zengqingyue</a>
 * @since 2016-11-01
 */
public class ComponentConst {
	/**
	 * 获取报表发送类型列表
	 */
	public static final String SQL_GET_REPORT_SEND_TYPE_LIST = new StringBuffer()
    .append("SELECT REPORT_SEND_TYPE_ID AS ID, REPORT_SEND_TYPE_NAME AS TEXT")
    .append(" FROM PMS_REPORT_SEND_TYPE ORDER BY REPORT_SEND_TYPE_ID")
    .toString();
	
	/**
	 * 获取任报表务活动类型类型列表
	 */
	public static final String SQL_GET_REP_TASK_ACTIVITY_TYPE_LIST = new StringBuffer()
    .append("SELECT REP_TASK_ACTIVITY_TYPE_ID AS ID, REP_TASK_ACTIVITY_TYPE_NAME AS TEXT")
    .append(" FROM PMS_REP_TASK_ACTIVITY_TYPE ORDER BY REP_TASK_ACTIVITY_TYPE_ID")
    .toString();
}
