/****************************************************************
 ***        Copyright © EASTCOMPEACE        2015.04.22        ***
 ****************************************************************/
package ecp.bsp.business.file.myenum;

/**
 * 报表审核类型枚举.
 * 
 * @since 2015-07-09
 * 
 * @author zengqingyue
 */
public enum ReportReviewTypeEnum {
	/**
	 * 用户审核.
	 */
	USER_REVIEW,
	/**
	 * 系统审核.
	 */
	SYSTEM_REVIEW;
	
	/**
	 * 根据枚举顺序取枚举值.
	 * 
	 * @param ordinal
	 *             枚举顺序.
	 * @return 枚举顺序取枚举值.
	 */
	public static ReportReviewTypeEnum valueOf(int ordinal) { 
		if (ordinal < 0 || ordinal >= values().length) {
			throw new IndexOutOfBoundsException("Invalid ordinal");
		}
		
		return values()[ordinal];
	}
}
