package ecp.bsp.business.file.controller.impl;
import java.text.ParseException;
import javax.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import com.eastcompeace.paapermit.common.exception.PaaCommonException;
import com.eastcompeace.paapermit.value.GetUserInfoResM;
import com.eastcompeace.paapermit.value.UserLoginResM;
import com.eastcompeace.paapermit.value.GetUserListResM;
import com.eastcompeace.paapermit.value.GetUserListResDUsers;
import java.util.List;
import ecp.bsp.system.commons.dto.AjaxResult;
import ecp.bsp.system.commons.utils.PAAUserUtil;

/**
 * 登陆控制层
 * 
 * @since 2015-07-27 <br>
 * 
 * @author tangwenfen.
 * 
 */
@Controller
public class LoginController {
	 
	/** 用户登录验证
	 * @param username
	 * @param password
	 * @param request
	 * @return
	 * @throws Exception
	 */
	public Object login(String username, String password,HttpServletRequest request) throws Exception {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			UserLoginResM userLoginResM = PAAUserUtil.getUserLogin(username, password);
			//将登陆者的有关信息设置到session中 
			request.getSession().setAttribute("userName",userLoginResM.getUser_name()); 
			request.getSession().setAttribute("empId",userLoginResM.getUser_staffid()); 
			ajaxResult.setSuccess(true);
			ajaxResult.setMsg("用户登录成功");
		} catch(Exception e) {
			ajaxResult.setSuccess(false);
			ajaxResult.setMsg(e.getMessage());
		}
	    return ajaxResult ;
	}
	
	/** 获得用户信息
	 * @param sessionAccess
	 * @param request
	 * @throws PaaCommonException
	 * @throws ParseException
	 */
	public Object getLoginInfo(HttpServletRequest request) throws Exception{
		AjaxResult ajaxResult = new AjaxResult();
		try{
			String staffid = (String) request.getSession().getAttribute("empId");
			GetUserInfoResM getUserInfoResM = PAAUserUtil.getUserInfoByStaffId(staffid);
			ajaxResult.setSuccess(true);
			ajaxResult.setMsg(getUserInfoResM);
		}catch(Exception e){
			ajaxResult.setSuccess(false);
			ajaxResult.setMsg(e.getMessage());
		}
		return ajaxResult;
	}
 
	/** 获得用户信息列表
	 * @param 
	 */
	public  List<GetUserListResDUsers>  getUserList() {
		GetUserListResM getUserListResM = PAAUserUtil.getUserList();
		return getUserListResM.getUsers();	
	}
	
	
	/** 用户退出
	 * @param request
	 * @return
	 * @throws PaaCommonException
	 * @throws ParseException
	 */
	public Object userLogout(HttpServletRequest request)  throws Exception{
		AjaxResult ajaxResult = new AjaxResult();
		try {
			String userName = (String) request.getSession().getAttribute("userName");
			PAAUserUtil.userLogout(userName);
			ajaxResult.setSuccess(true);
			ajaxResult.setMsg("用户退出成功");
		} catch(Exception e) {
			ajaxResult.setSuccess(false);
			ajaxResult.setMsg(e.getMessage());
		}
	    return ajaxResult ;
	}
	
	
}