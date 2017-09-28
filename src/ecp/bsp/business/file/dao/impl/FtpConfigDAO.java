package ecp.bsp.business.file.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import ecp.bsp.business.file.constant.FileConfigConst;
import ecp.bsp.business.file.entity.TaskStrategyEntity;
import ecp.bsp.system.core.BaseDAO;
import ecp.bsp.system.framework.ftp.data.dto.FtpDTO;
import ecp.bsp.system.framework.ftp.data.entity.FtpEntity;
/**
 * FTP配置信息DAO层
 * 
 * @since 2015-06-08 <br>
 * 
 * @author zengqingyue.
 * 
 */
@Repository
public class FtpConfigDAO extends BaseDAO{

	/**
	 * 保存FTP信息
	 * @param ftpEntity
	 * @return
	 * @throws Exception 
	 */
	public void saveFtp(FtpEntity ftpEntity) throws Exception {
		this.insert(ftpEntity);
	}

	/**
	 * 根据FTPID获取FTP实体
	 * @param FtpId
	 * @return
	 */
	public FtpEntity getFtpEntityById(String ftpId) {
		return this.getEntity(FtpEntity.class, ftpId);
	}
	
	/**
	 * 根据FTP名称获取FTP实体
	 * @param ftpName
	 * @return
	 */
	public FtpEntity getFtpByName(String ftpName) {
		return this.getEntity(FtpEntity.class, new String[]{FileConfigConst.PARAM_ENTITY_FTP_NAME},
				new Object[]{ftpName});
	}

	/**
	 * 根据FTPID删除FTP实体
	 * @param ftpId
	 * @throws Exception
	 */
	public void deleteFtpById(String ftpId) throws Exception {
		this.delete(FtpEntity.class,ftpId);
	}

	/**
	 * 获取FTP信息列表
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<FtpDTO> getFtpList() {
		return (List<FtpDTO>)this.query(FileConfigConst.SQL_GET_FTP_LIST , FtpDTO.class);
	}

	/**
	 * 获取FTP
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public FtpDTO getFtpById(String ftpId) {
		List<FtpDTO> list = 
				(List<FtpDTO>)this.query(FileConfigConst.SQL_GET_TASK_FTP_BY_FTP_ID, 
						new Object[]{ftpId},FtpDTO.class);
		return list.size() > 0 ? list.get(0) : null;
	}
	
	/**
	 * 根据FTPID获取任务策略列表信息
	 * @param FtpId
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<TaskStrategyEntity> getTaskStrategyListByFtp(String ftpId) {
		return (List<TaskStrategyEntity>)this.query(FileConfigConst.SQL_GET_TASK_STRATEGY_LIST_BY_FTP_ID , 
				new Object[]{ftpId,ftpId}, TaskStrategyEntity.class);
	}

}
