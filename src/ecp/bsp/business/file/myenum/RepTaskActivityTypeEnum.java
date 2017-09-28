/****************************************************************
 ***        Copyright © EASTCOMPEACE        2015.04.22        ***
 ****************************************************************/
package ecp.bsp.business.file.myenum;

/**
 * 报表任务活动状态枚举.
 * 
 * @since 2015-07-09
 * 
 * @author zengqingyue
 */
public enum RepTaskActivityTypeEnum {
	/**
	 * 报表上传.
	 */
	REPORT_UPLOAD,
	
	/**
	 * 报表审核.
	 */
	REPORT_REVIEW,
	/**
	 * 报表加密.
	 */
	REPORT_ENCRYPTION,
	/**
	 * 报表分发.
	 */
	REPORT_SEND;
	
	/**
	 * 根据枚举顺序取枚举值.
	 * 
	 * @param ordinal
	 *             枚举顺序.
	 * @return 枚举顺序取枚举值.
	 */
	public static RepTaskActivityTypeEnum valueOf(int ordinal) { 
		if (ordinal < 0 || ordinal >= values().length) {
			throw new IndexOutOfBoundsException("Invalid ordinal");
		}
		
		return values()[ordinal];
	}
}
