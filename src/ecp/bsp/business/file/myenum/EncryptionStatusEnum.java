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
public enum EncryptionStatusEnum {
	/**
	 * 未加密.
	 */
	NONE_ENCRYPTION,
	
	/**
	 * 系统加密.
	 */
	SYSTEM_ENCRYPTION,
	/**
	 * 人工加密.
	 */
	HUMAN_ENCRYPTION;
	
	/**
	 * 根据枚举顺序取枚举值.
	 * 
	 * @param ordinal
	 *             枚举顺序.
	 * @return 枚举顺序取枚举值.
	 */
	public static EncryptionStatusEnum valueOf(int ordinal) { 
		if (ordinal < 0 || ordinal >= values().length) {
			throw new IndexOutOfBoundsException("Invalid ordinal");
		}
		
		return values()[ordinal];
	}
}
