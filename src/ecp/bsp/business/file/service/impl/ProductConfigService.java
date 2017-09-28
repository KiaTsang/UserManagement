package ecp.bsp.business.file.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import ecp.bsp.business.file.dao.impl.ProductConfigDAO;
import ecp.bsp.business.file.dto.ProductTypeDTO;
import ecp.bsp.business.file.entity.ProductTypeEntity;
import ecp.bsp.business.file.entity.TaskStrategyEntity;
import ecp.bsp.system.commons.constant.ExceptionCodeConst;
import ecp.bsp.system.commons.dto.ActionResult;
import ecp.bsp.system.commons.utils.ActionResultUtil;
import ecp.bsp.system.commons.utils.LoggerUtil;
import ecp.bsp.system.core.BaseDTO;

/**
 * 产品类型配置信息服务层
 * 
 * @since 2015-06-08 <br>
 * 
 * @author zengqingyue.
 * 
 */
@Service
@Transactional(propagation = Propagation.REQUIRED)
public class ProductConfigService {
	@Resource
	private ProductConfigDAO fileConfigDAO;

	/**
	 * 提交产品类型信息
	 * @param productTypeDTO
	 * @return
	 * @throws Exception 
	 */
	public ActionResult submitProductType(ProductTypeDTO productTypeDTO) throws Exception {
		//检查数据的合法性
		if (this.validateProductTypeByName(productTypeDTO.getProductTypeName())) {
			String exceptionMessage = ExceptionCodeConst.SYSTEM_EXCEPTION_CODE + "产品类型名称已存在，请重新输入.";
			LoggerUtil.instance(this.getClass()).error(exceptionMessage);
			throw new RuntimeException(exceptionMessage);
		}
		//保存产品类型信息
		ProductTypeEntity productTypeEntity = new ProductTypeEntity();
		BaseDTO.dtoToEntity(productTypeDTO, productTypeEntity);
		this.fileConfigDAO.saveProductType(productTypeEntity);
		//返回处理结果.
		return ActionResultUtil.getActionResult(productTypeEntity.getProductTypeId(), "新建产品类型成功");
	}
	
	/**
	 * 更新产品类型信息
	 * @param productTypeDTO
	 * @return
	 * @throws Exception
	 */
	public ActionResult modifyProductType(ProductTypeDTO productTypeDTO) throws Exception {
		//更新产品类型信息
		ProductTypeEntity productTypeEntity = this.fileConfigDAO.getProductTypeEntityById(productTypeDTO.getProductTypeId());
		productTypeEntity.setProductTypeDesc(productTypeDTO.getProductTypeDesc());
		this.fileConfigDAO.update(productTypeEntity);
		//返回处理结果.
		return ActionResultUtil.getActionResult(productTypeEntity.getProductTypeId(), "修改产品类型成功");
	}
	
	/**
	 * 删除产品类型信息
	 * @param productTypeId
	 * @return
	 * @throws Exception 
	 */
	public ActionResult deleteProductType(String productTypeId) throws Exception {
		//检查数据的合法性
		List<TaskStrategyEntity> list = this.fileConfigDAO.getTaskStrategyListByProductType(productTypeId);
		if (list.size() > 0) {
			String exceptionMessage = ExceptionCodeConst.SYSTEM_EXCEPTION_CODE + "该产品类型已被使用，不能删除.";
			LoggerUtil.instance(this.getClass()).error(exceptionMessage);
			throw new RuntimeException(exceptionMessage);
		}
		//删除产品类型
		this.fileConfigDAO.deleteProductTypeById(productTypeId);
		//返回处理结果.
		return ActionResultUtil.getActionResult(productTypeId, "删除产品类型成功");
	}
	
	/**
	 * 获取产品类型信息列表
	 * @return
	 */
	public List<ProductTypeDTO> getProductTypeList() {
		return this.fileConfigDAO.getProductTypeList();
	}
	
	/**
	 * 检查产品类型名称是否存在
	 * @param productTypeName
	 * @return
	 */
	private boolean validateProductTypeByName(String productTypeName) {
		ProductTypeEntity productTypeEntity = this.fileConfigDAO.getProductTypeByName(productTypeName);
		return productTypeEntity != null ? true : false; 
	}

}