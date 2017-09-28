package ecp.bsp.business.file.dto;

import org.springframework.stereotype.Component;

import ecp.bsp.system.core.BaseDTO;

/**
 * 算法实体dto
 * 
 * @since 2015-06-15 <br>
 * 
 * @author zengqingyue.
 */
@Component
public class EncryptionAlgorithmDTO extends BaseDTO {
	/**
	 * 算法名称(id).
	 */
	private String id;
	
	/**
	 * 算法名称(text).
	 */
	private String text;
	/**
	 * 算法ID.
	 */
	private String encryptionAlgorithmId;
	
	/**
	 * 算法名称.
	 */
	private String encryptionAlgorithmName;
	/**
	 * 算法编号.
	 */
	private String encryptionAlgorithmCode;
	/**
	 * 算法类型.
	 */
	private String encryptionAlgorithmType;
	/**
	 * 算法密钥.
	 */
	private String encryptionAlgorithmKey;
	/**
	 * 算法描述.
	 */
	private String emailReceiverDesc;
	/**
	 * 动态库名称.
	 */
	private String dllName;
	/**
	 * 动态库方法.
	 */
	private String dllMethod;
	/**
	 * 动态库额外参数.
	 */
	private String dllExtraParam;
	/**
	 * 返回类型.
	 */
	private String dllReturnType;
	/**
	 * 算法DLL ID.
	 */
	private String algorithmDllId;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public String getEncryptionAlgorithmId() {
		return encryptionAlgorithmId;
	}
	public void setEncryptionAlgorithmId(String encryptionAlgorithmId) {
		this.encryptionAlgorithmId = encryptionAlgorithmId;
	}
	public String getEncryptionAlgorithmName() {
		return encryptionAlgorithmName;
	}
	public void setEncryptionAlgorithmName(String encryptionAlgorithmName) {
		this.encryptionAlgorithmName = encryptionAlgorithmName;
	}
	public String getEncryptionAlgorithmCode() {
		return encryptionAlgorithmCode;
	}
	public void setEncryptionAlgorithmCode(String encryptionAlgorithmCode) {
		this.encryptionAlgorithmCode = encryptionAlgorithmCode;
	}
	public String getEncryptionAlgorithmKey() {
		return encryptionAlgorithmKey;
	}
	public void setEncryptionAlgorithmKey(String encryptionAlgorithmKey) {
		this.encryptionAlgorithmKey = encryptionAlgorithmKey;
	}
	public String getEmailReceiverDesc() {
		return emailReceiverDesc;
	}
	public void setEmailReceiverDesc(String emailReceiverDesc) {
		this.emailReceiverDesc = emailReceiverDesc;
	}
	public String getEncryptionAlgorithmType() {
		return encryptionAlgorithmType;
	}
	public void setEncryptionAlgorithmType(String encryptionAlgorithmType) {
		this.encryptionAlgorithmType = encryptionAlgorithmType;
	}
	public String getDllName() {
		return dllName;
	}
	public void setDllName(String dllName) {
		this.dllName = dllName;
	}
	public String getDllMethod() {
		return dllMethod;
	}
	public void setDllMethod(String dllMethod) {
		this.dllMethod = dllMethod;
	}
	public String getDllExtraParam() {
		return dllExtraParam;
	}
	public void setDllExtraParam(String dllExtraParam) {
		this.dllExtraParam = dllExtraParam;
	}
	public String getDllReturnType() {
		return dllReturnType;
	}
	public void setDllReturnType(String dllReturnType) {
		this.dllReturnType = dllReturnType;
	}
	public String getAlgorithmDllId() {
		return algorithmDllId;
	}
	public void setAlgorithmDllId(String algorithmDllId) {
		this.algorithmDllId = algorithmDllId;
	}
	
}