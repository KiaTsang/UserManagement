package ecp.bsp.business.file.controller.impl;

import javax.annotation.Resource;
import org.springframework.stereotype.Controller;

import ecp.bsp.system.framework.component.impl.ComponentCreatorDataService;
/**
 * 获取组件控制层
 * 
 * @since 2015-10-13 <br>
 * 
 * @author tangwenfen.
 * 
 */
@Controller
public class ComponentGetterController {
    
	@Resource
	private ComponentCreatorDataService componentCreatorDataService;
	
	
	/** 根据combox的类型获取对应的数据
	 * @param dataProvider
	 * @return
	 */
	@SuppressWarnings("static-access")
	public Object getComboxDataByName(String dataProvider){
		return componentCreatorDataService.getComboboxDTOS(dataProvider);
	}
}
