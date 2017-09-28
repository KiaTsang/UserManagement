package ecp.bsp.business.file.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import ecp.bsp.system.core.BaseEntity;

/**
 * 算法DLL实体
 * 
 * @since 2015-08-07
 * 
 * @author zengqingyue.
 */
@Entity
@Table(name = "PMS_ALGORITHM_DLL", schema = "PMSWEB_DBA")
public class AlgorithmDllEntity extends BaseEntity {
	/**
	 * 版本号.
	 */
	private static final long serialVersionUID = 1L;
	
	/**
	 * 算法名称.
	 */
	private String encryptionAlgorithmId;
	/**
	 * 算法编码.
	 */
	private String dllName;
	/**
	 * 算法密钥.
	 */
	private String dllMethod;
	/**
	 * 算法类型.
	 */
	private String dllExtraParam;
	/**
	 * 算法描述.
	 */
	private String dllReturnType;
	
	@Id
	@Column(name = "ALGORITHM_DLL_ID", unique = true, nullable = false, length = 32)
	public String getAlgorithmDllId() {
		return this.getId();
	}

	@Column(name = "ENCRYPTION_ALGORITHM_NAME", nullable = false, length = 50)
	public void setAlgorithmDllId(String algorithmDllId) {
		this.setId(algorithmDllId);
	}
	
	@Column(name = "ENCRYPTION_ALGORITHM_ID", nullable = false, length = 50)
	public String getEncryptionAlgorithmId() {
		return encryptionAlgorithmId;
	}
	
	public void setEncryptionAlgorithmId(String encryptionAlgorithmId) {
		this.encryptionAlgorithmId = encryptionAlgorithmId;
	}
	
	@Column(name = "DLL_NAME", nullable = false, length = 50)
	public String getDllName() {
		return dllName;
	}
	public void setDllName(String dllName) {
		this.dllName = dllName;
	}
	
	@Column(name = "DLL_METHOD", nullable = false, length = 50)
	public String getDllMethod() {
		return dllMethod;
	}
	public void setDllMethod(String dllMethod) {
		this.dllMethod = dllMethod;
	}
	
	@Column(name = "DLL_EXTRA_PARAM", nullable = false, length = 50)
	public String getDllExtraParam() {
		return dllExtraParam;
	}
	public void setDllExtraParam(String dllExtraParam) {
		this.dllExtraParam = dllExtraParam;
	}
	
	@Column(name = "DLL_RETURN_TYPE", nullable = false, length = 50)
	public String getDllReturnType() {
		return dllReturnType;
	}
	public void setDllReturnType(String dllReturnType) {
		this.dllReturnType = dllReturnType;
	}

}