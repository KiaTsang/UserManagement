package ecp.bsp.business.file.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import ecp.bsp.business.file.constant.FileConfigConst;
import ecp.bsp.business.file.dto.EncryptionAlgorithmDTO;
import ecp.bsp.business.file.entity.AlgorithmDllEntity;
import ecp.bsp.business.file.entity.EncryptionAlgorithmEntity;
import ecp.bsp.business.file.entity.TaskStrategyEntity;
import ecp.bsp.system.core.BaseDAO;
/**
 * 算法信息DAO层
 * 
 * @since 2015-06-08 <br>
 * 
 * @author zengqingyue.
 * 
 */
@Repository
public class AlgorithmConfigDAO extends BaseDAO{

	/**
	 * 根据ID获取加密算法信息实体
	 * @param encryptionAlgorithmId
	 * @return
	 */
	public EncryptionAlgorithmEntity getEncryptionAlgorithmEntityById(String encryptionAlgorithmId) {
		return this.getEntity(EncryptionAlgorithmEntity.class, encryptionAlgorithmId);
	}

	/**
	 * 根据名称获取加密算法实体信息
	 * @param encryptionAlgorithmName
	 * @return
	 */
	public EncryptionAlgorithmEntity getEncryptionAlgorithmByName(String encryptionAlgorithmName) {
		return this.getEntity(EncryptionAlgorithmEntity.class, new String[]{FileConfigConst.PARAM_ENTITY_ENCRYPTION_ALGORITHM_NAME},
				new Object[]{encryptionAlgorithmName});
	}

	/**
	 * 根据ID获取算法DLL实体信息
	 * @param algorithmDllId
	 * @return
	 */
	public AlgorithmDllEntity getAlgorithmDllEntityById(String algorithmDllId) {
		return this.getEntity(AlgorithmDllEntity.class, algorithmDllId);
	}

	/**
	 * 根据算法ID获取任务策略信息实体列表
	 * @param encryptionAlgorithmId
	 * @return
	 */
	public List<TaskStrategyEntity> getTaskStrategyListByEncryptionAlgorithm(String encryptionAlgorithmId) {
		return (List<TaskStrategyEntity>) this.getEntityList(TaskStrategyEntity.class, 
				FileConfigConst.PARAM_ENTITY_ENCRYPTION_ALGORITHM_ID,encryptionAlgorithmId,null);
	}

	/**
	 * 根据算法ID删除算法实体信息
	 * @param encryptionAlgorithmId
	 * @throws Exception
	 */
	public void deleteEncryptionAlgorithmById(String encryptionAlgorithmId) throws Exception {
		this.delete(EncryptionAlgorithmEntity.class, encryptionAlgorithmId);
	}

	/**
	 * 根据算法ID获取算法那DLL实体信息
	 * @param encryptionAlgorithmId
	 * @return
	 */
	public AlgorithmDllEntity getAlgorithmDllEntityByEncryptionAlgorithmId(
			String encryptionAlgorithmId) {
		List<AlgorithmDllEntity> list =  (List<AlgorithmDllEntity>) this.getEntityList(AlgorithmDllEntity.class, 
				FileConfigConst.PARAM_ENTITY_ENCRYPTION_ALGORITHM_ID,encryptionAlgorithmId,null);
		return list.size() > 0 ? list.get(0) : null;
	}
    
	/**
	 * 根据加密算法ID获取加密算法信息
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public EncryptionAlgorithmDTO getEncryptionAlgorithmById(String encryptionAlgorithmId){
		List<EncryptionAlgorithmDTO> list = 
				(List<EncryptionAlgorithmDTO>)this.query(FileConfigConst.SQL_GET_ENCRYPTION_ALGORITHM_BY_ENCRYPTION_ALGORITHM_ID, 
						new Object[]{encryptionAlgorithmId},EncryptionAlgorithmDTO.class);
		return list.size() > 0 ? list.get(0) : null;
	}
	
}
