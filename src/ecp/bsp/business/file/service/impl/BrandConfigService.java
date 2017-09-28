package ecp.bsp.business.file.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import ecp.bsp.business.file.dao.impl.BrandConfigDAO;
import ecp.bsp.business.file.dto.BrandDTO;
import ecp.bsp.business.file.entity.BrandEntity;
import ecp.bsp.business.file.entity.TaskBrandEntity;
import ecp.bsp.system.commons.constant.ExceptionCodeConst;
import ecp.bsp.system.commons.dto.ActionResult;
import ecp.bsp.system.commons.utils.ActionResultUtil;
import ecp.bsp.system.commons.utils.LoggerUtil;
import ecp.bsp.system.core.BaseDTO;

/**
 * 品牌配置信息服务层
 * 
 * @since 2015-06-15 <br>
 * 
 * @author zengqingyue.
 * 
 */
@Service
@Transactional(propagation = Propagation.REQUIRED)
public class BrandConfigService {
	@Resource
	private BrandConfigDAO brandConfigDAO;

	/**
	 * 提交品牌信息
	 * @param BrandDTO
	 * @return
	 * @throws Exception 
	 */
	public ActionResult submitBrand(BrandDTO brandDTO) throws Exception {
		//检查数据的合法性
		if (this.validateBrandByName(brandDTO.getBrandName())) {
			String exceptionMessage = ExceptionCodeConst.SYSTEM_EXCEPTION_CODE + "品牌名称已存在，请重新输入.";
			LoggerUtil.instance(this.getClass()).error(exceptionMessage);
			throw new RuntimeException(exceptionMessage);
		}
		//保存品牌信息
		BrandEntity brandEntity = new BrandEntity();
		BaseDTO.dtoToEntity(brandDTO, brandEntity);
		this.brandConfigDAO.saveBrand(brandEntity);
		//返回处理结果.
		return ActionResultUtil.getActionResult(brandEntity.getBrandId(), "新建品牌成功");
	}
	
	/**
	 * 更新品牌信息
	 * @param BrandDTO
	 * @return
	 * @throws Exception
	 */
	public ActionResult modifyBrand(BrandDTO brandDTO) throws Exception {
		//更新品牌信息
		BrandEntity brandEntity = this.brandConfigDAO.getBrandEntityById(brandDTO.getBrandId());
		brandEntity.setBrandDesc(brandDTO.getBrandDesc());
		this.brandConfigDAO.update(brandEntity);
		//返回处理结果.
		return ActionResultUtil.getActionResult(brandEntity.getBrandId(), "修改品牌成功");
	}
	
	/**
	 * 删除品牌信息
	 * @param BrandId
	 * @return
	 * @throws Exception 
	 */
	public ActionResult deleteBrand(String brandId) throws Exception {
		//检查数据的合法性
		List<TaskBrandEntity> list = this.brandConfigDAO.getTaskBrandListByBrand(brandId);
		if (list.size() > 0) {
			String exceptionMessage = ExceptionCodeConst.SYSTEM_EXCEPTION_CODE + "该品牌已被使用，不能删除.";
			LoggerUtil.instance(this.getClass()).error(exceptionMessage);
			throw new RuntimeException(exceptionMessage);
		}
		//删除品牌
		this.brandConfigDAO.deleteBrandById(brandId);
		//返回处理结果.
		return ActionResultUtil.getActionResult(brandId, "删除品牌成功");
	}
	
	/**
	 * 获取品牌信息列表
	 * @return
	 */
	public List<BrandDTO> getBrandList() {
		return this.brandConfigDAO.getBrandList();
	}
	
	/**
	 * 检查品牌名称是否存在
	 * @param BrandName
	 * @return
	 */
	private boolean validateBrandByName(String brandName) {
		BrandEntity brandEntity = this.brandConfigDAO.getBrandByName(brandName);
		return brandEntity != null ? true : false; 
	}

}