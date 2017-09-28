package ecp.bsp.business.file.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import ecp.bsp.system.core.BaseEntity;

/**
 * 算法实体
 * 
 * @since 2015-06-15 <br>
 * 
 * @author zengqingyue.
 */
@Entity
@Table(name = "PMS_ENCRYPTION_ALGORITHM", schema = "PMSWEB_DBA")
public class EncryptionAlgorithmEntity extends BaseEntity {
	/**
	 * 版本号.
	 */
	private static final long serialVersionUID = 1L;
	
	/**
	 * 算法名称.
	 */
	private String encryptionAlgorithmName;
	/**
	 * 算法编码.
	 */
	private String encryptionAlgorithmCode;
	/**
	 * 算法密钥.
	 */
	private String encryptionAlgorithmKey;
	/**
	 * 算法类型.
	 */
	private String encryptionAlgorithmType;
	/**
	 * 算法描述.
	 */
	private String emailReceiverDesc;
	
	@Id
	@Column(name = "ENCRYPTION_ALGORITHM_ID", unique = true, nullable = false, length = 32)
	public String getEncryptionAlgorithmId() {
		return this.getId();
	}

	public void setEncryptionAlgorithmId(String encryptionAlgorithmId) {
		this.setId(encryptionAlgorithmId);
	}

	@Column(name = "ENCRYPTION_ALGORITHM_NAME", nullable = false, length = 50)
	public String getEncryptionAlgorithmName() {
		return encryptionAlgorithmName;
	}

	public void setEncryptionAlgorithmName(String encryptionAlgorithmName) {
		this.encryptionAlgorithmName = encryptionAlgorithmName;
	}

	@Column(name = "ENCRYPTION_ALGORITHM_CODE", nullable = false, length = 50)
	public String getEncryptionAlgorithmCode() {
		return encryptionAlgorithmCode;
	}

	public void setEncryptionAlgorithmCode(String encryptionAlgorithmCode) {
		this.encryptionAlgorithmCode = encryptionAlgorithmCode;
	}

	@Column(name = "ENCRYPTION_ALGORITHM_KEY", nullable = false, length = 50)
	public String getEncryptionAlgorithmKey() {
		return encryptionAlgorithmKey;
	}

	public void setEncryptionAlgorithmKey(String encryptionAlgorithmKey) {
		this.encryptionAlgorithmKey = encryptionAlgorithmKey;
	}

	@Column(name = "ENCRYPTION_ALGORITHM_DESC", nullable = false, length = 50)
	public String getEmailReceiverDesc() {
		return emailReceiverDesc;
	}

	public void setEmailReceiverDesc(String emailReceiverDesc) {
		this.emailReceiverDesc = emailReceiverDesc;
	}

	@Column(name = "ENCRYPTION_ALGORITHM_TYPE", nullable = false, length = 50)
	public String getEncryptionAlgorithmType() {
		return encryptionAlgorithmType;
	}

	public void setEncryptionAlgorithmType(String encryptionAlgorithmType) {
		this.encryptionAlgorithmType = encryptionAlgorithmType;
	}

}