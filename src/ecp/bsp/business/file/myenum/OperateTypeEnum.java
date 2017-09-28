/****************************************************************
 ***        Copyright © EASTCOMPEACE        2015.04.22        ***
 ****************************************************************/
package ecp.bsp.business.file.myenum;

/**
 * 操作类型枚举.
 * 
 * @since 2015-06-25
 * 
 * @author zengqingyue
 */
public enum OperateTypeEnum {
	/**
	 * 自动.
	 */
	AUTOMATIC,
	
	/**
	 * 手动.
	 */
	MANUALLY;
	
	/**
	 * 根据枚举顺序取枚举值.
	 * 
	 * @param ordinal
	 *             枚举顺序.
	 * @return 枚举顺序取枚举值.
	 */
	public static OperateTypeEnum valueOf(int ordinal) { 
		if (ordinal < 0 || ordinal >= values().length) {
			throw new IndexOutOfBoundsException("Invalid ordinal");
		}
		
		return values()[ordinal];
	}
}
