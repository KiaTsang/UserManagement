/****************************************************************
 ***        Copyright © EASTCOMPEACE        2015.04.22        ***
 ****************************************************************/
package ecp.bsp.business.file.myenum;

/**
 * 使用状态枚举.
 * 
 * @since 2015-06-25
 * 
 * @author zengqingyue
 */
public enum UsageStatusEnum {
	/**
	 * 停用.
	 */
	DISABLE,
	
	/**
	 * 启用.
	 */
	ENABLE;
	
	/**
	 * 根据枚举顺序取枚举值.
	 * 
	 * @param ordinal
	 *             枚举顺序.
	 * @return 枚举顺序取枚举值.
	 */
	public static UsageStatusEnum valueOf(int ordinal) { 
		if (ordinal < 0 || ordinal >= values().length) {
			throw new IndexOutOfBoundsException("Invalid ordinal");
		}
		
		return values()[ordinal];
	}
}
