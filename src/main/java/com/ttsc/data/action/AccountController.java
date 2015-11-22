package com.ttsc.data.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ttsc.data.entity.AdminUser;
import com.ttsc.data.result.BasicResult;
import com.ttsc.data.service.AdminUserService;
import com.ttsc.data.util.Constant;


/**
 * 管理员登录
 * 
 * @author arno.jiang
 * 
 */
@Controller
@RequestMapping("account")
public class AccountController extends BaseController {

	private static final Logger logger = LoggerFactory.getLogger(AccountController.class);

	@Autowired
	private AdminUserService adminUserService;

	/**
	 * 用户登录
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "userLogin", method = {RequestMethod.POST })
	@ResponseBody
	public BasicResult<String> userLogin(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		BasicResult<String> rs = new BasicResult<String>();
		try {
			String account = request.getParameter("account");
			String password = request.getParameter("password");
			String validCode = request.getParameter("validCode");

			if (StringUtils.isEmpty(account)) {
				rs.setMessage("账号不能为空!");
				rs.setCode("1");
				return rs;
			}

			if (StringUtils.isEmpty(password)) {
				rs.setMessage("密码不能为空，请输入!");
				rs.setCode("1");
				return rs;
			}
			
			if (StringUtils.isEmpty(validCode)) {
				rs.setMessage("验证码不能为空，请输入!");
				rs.setCode("1");
				return rs;
			}
			
			if(!request.getSession().getAttribute("validCode").toString().equalsIgnoreCase(validCode)){
				rs.setMessage("验证码不正确!");
				rs.setCode("1");
				return rs;
			}
			System.out.println(account+" "+password+" "+validCode);
			AdminUser adminUser = new AdminUser();
			adminUser.setAccount(account);
			adminUser.setPwd(password.toLowerCase());
			AdminUser obj = adminUserService.getAdminUser(adminUser);
			if (obj == null) {
				rs.setMessage("账号或密码错误，请重新输入!");
				rs.setCode("1");
				return rs;
			}
			request.getSession()
					.setAttribute(Constant.USER_LOGIN_INFO, obj);
		} catch (Exception e) {
			logger.info("系统异常，登录失败!" + e.getMessage());
			rs.setMessage("系统异常，登录失败!");
			rs.setCode("1");
			return rs;
		}
		return rs;
	}
	
	@RequestMapping(value = "frame", method = {RequestMethod.GET })
	public String frame(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		response.setHeader("Pragma","No-cache");    
	    response.setHeader("Cache-Control","no-cache");    
	    response.setDateHeader("Expires", 0);
		if (request.getSession().getAttribute(Constant.USER_LOGIN_INFO) == null) {
			return "index.jsp?num="+Math.random();
		}
		return "main.jsp?num="+Math.random();
	}
	
	@RequestMapping(value = "loginout", method = {RequestMethod.GET })
	public String loginout(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		response.setHeader("Pragma","No-cache");    
	    response.setHeader("Cache-Control","no-cache");    
	    response.setDateHeader("Expires", 0);
		request.getSession().removeAttribute(Constant.USER_LOGIN_INFO);
		return "index.jsp?num="+Math.random();
	}
	
}
