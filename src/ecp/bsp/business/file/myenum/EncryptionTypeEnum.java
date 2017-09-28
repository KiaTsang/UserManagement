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
public enum EncryptionTypeEnum {
	/**
	 * RAR加密.
	 */
	RAR_ENCRYPTION,
	/**
	 * 文件级加密.
	 */
	FILE_ENCRYPTION;
	
	/**
	 * 根据枚举顺序取枚举值.
	 * 
	 * @param ordinal
	 *             枚举顺序.
	 * @return 枚举顺序取枚举值.
	 */
	public static EncryptionTypeEnum valueOf(int ordinal) { 
		if (ordinal < 0 || ordinal >= values().length) {
			throw new IndexOutOfBoundsException("Invalid ordinal");
		}
		
		return values()[ordinal];
	}
}
