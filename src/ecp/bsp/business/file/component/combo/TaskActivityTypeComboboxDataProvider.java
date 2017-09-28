package ecp.bsp.business.file.component.combo;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import org.springframework.stereotype.Repository;

import ecp.bsp.business.file.constant.ComponentConst;
import ecp.bsp.system.framework.component.dao.ParamSettingDAO;
import ecp.bsp.system.framework.component.data.dto.ComboboxNodeDTO;
import ecp.bsp.system.framework.component.impl.ComponentCreatorDataProvider;

@Repository(value="repTaskActivityTypeCombo")
public class TaskActivityTypeComboboxDataProvider extends ComponentCreatorDataProvider<String>{
	/**
	 * 参数设置DAO
	 */
	@Resource
	private ParamSettingDAO paramSettingDAO;
	
	/**
	 * 获取DTO数据
	 */
	@Override
	public List<Map<String,Object>> getDTOS() {
		List<ComboboxNodeDTO<String>>  comboboxNodeDTOList = 
				this.paramSettingDAO.getParamList(ComponentConst.SQL_GET_REP_TASK_ACTIVITY_TYPE_LIST, ComboboxNodeDTO.class);
		return this.createComboboxData(comboboxNodeDTOList);
	}
}
