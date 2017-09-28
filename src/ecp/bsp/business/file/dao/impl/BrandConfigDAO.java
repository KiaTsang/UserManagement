package ecp.bsp.business.file.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import ecp.bsp.business.file.constant.FileConfigConst;
import ecp.bsp.business.file.dto.BrandDTO;
import ecp.bsp.business.file.entity.BrandEntity;
import ecp.bsp.business.file.entity.TaskBrandEntity;
import ecp.bsp.system.core.BaseDAO;
/**
 * 品牌配置信息DAO层
 * 
 * @since 2015-06-08 <br>
 * 
 * @author zengqingyue.
 * 
 */
@Repository
public class BrandConfigDAO extends BaseDAO{

	/**
	 * 保存品牌信息
	 * @param brandEntity
	 * @return
	 * @throws Exception 
	 */
	public void saveBrand(BrandEntity brandEntity) throws Exception {
		this.insert(brandEntity);
	}

	/**
	 * 根据品牌ID获取品牌实体
	 * @param brandId
	 * @return
	 */
	public BrandEntity getBrandEntityById(String brandId) {
		return this.getEntity(BrandEntity.class, brandId);
	}
	
	/**
	 * 根据品牌名称获取品牌实体
	 * @param brandName
	 * @return
	 */
	public BrandEntity getBrandByName(String brandName) {
		return this.getEntity(BrandEntity.class, new String[]{FileConfigConst.PARAM_ENTITY_BRAND_NAME},
				new Object[]{brandName});
	}

	/**
	 * 根据品牌ID删除品牌实体
	 * @param brandId
	 * @throws Exception
	 */
	public void deleteBrandById(String brandId) throws Exception {
		this.delete(BrandEntity.class,brandId);
	}

	/**
	 * 获取品牌信息列表
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<BrandDTO> getBrandList() {
		return (List<BrandDTO>) this.query(FileConfigConst.SQL_GET_BRAND_LIST, BrandDTO.class);
	}

	/**
	 * 根据品牌ID获取任务策略列表信息
	 * @param BrandId
	 * @return
	 */
	public List<TaskBrandEntity> getTaskBrandListByBrand(String brandId) {
		return (List<TaskBrandEntity>) this.getEntityList(TaskBrandEntity.class, 
				FileConfigConst.PARAM_ENTITY_BRAND_ID,brandId,null);
	}
}
