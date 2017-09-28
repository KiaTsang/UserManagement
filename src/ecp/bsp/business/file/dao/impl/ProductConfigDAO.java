package ecp.bsp.business.file.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import ecp.bsp.business.file.constant.FileConfigConst;
import ecp.bsp.business.file.dto.ProductTypeDTO;
import ecp.bsp.business.file.entity.ProductTypeEntity;
import ecp.bsp.business.file.entity.TaskStrategyEntity;
import ecp.bsp.system.core.BaseDAO;
/**
 * 产品类型配置信息DAO层
 * 
 * @since 2015-06-08 <br>
 * 
 * @author zengqingyue.
 * 
 */
@Repository
public class ProductConfigDAO extends BaseDAO{

	/**
	 * @param productTypeEntity
	 * @return
	 * @throws Exception 
	 */
	public void saveProductType(ProductTypeEntity productTypeEntity) throws Exception {
		this.insert(productTypeEntity);
	}

	/**
	 * 根据产品类型ID获取产品类型实体
	 * @param productTypeId
	 * @return
	 */
	public ProductTypeEntity getProductTypeEntityById(String productTypeId) {
		return this.getEntity(ProductTypeEntity.class, productTypeId);
	}
	
	/**
	 * 根据产品类型名称获取产品类型实体
	 * @param productTypeName
	 * @return
	 */
	public ProductTypeEntity getProductTypeByName(String productTypeName) {
		return this.getEntity(ProductTypeEntity.class, new String[]{FileConfigConst.PARAM_ENTITY_PRODUCT_TYPE_NAME},
				new Object[]{productTypeName});
	}

	/**
	 * 根据产品类型ID删除产品类型实体
	 * @param productTypeId
	 * @throws Exception
	 */
	public void deleteProductTypeById(String productTypeId) throws Exception {
		this.delete(ProductTypeEntity.class,productTypeId);
	}

	/**
	 * 获取产品类型信息列表
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<ProductTypeDTO> getProductTypeList() {
		return (List<ProductTypeDTO>) this.query(FileConfigConst.SQL_GET_PRODUCT_TYPE_LIST, ProductTypeDTO.class);
	}

	/**
	 * 根据产品类型ID获取任务策略列表信息
	 * @param productTypeId
	 * @return
	 */
	public List<TaskStrategyEntity> getTaskStrategyListByProductType(String productTypeId) {
		return (List<TaskStrategyEntity>) this.getEntityList(TaskStrategyEntity.class, 
				FileConfigConst.PARAM_ENTITY_PRODUCT_TYPE_ID,productTypeId,null);
	}
}
