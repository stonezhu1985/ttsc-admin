package com.ttsc.data.action;

import java.util.Date;
import java.util.List;

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

import com.ttsc.data.entity.UserShopBindInfo;
import com.ttsc.data.po.UserShopBindPo;
import com.ttsc.data.po.UserShopBindQueryPo;
import com.ttsc.data.result.BasicResult;
import com.ttsc.data.service.UserShopBindService;

/**
 * 商户店铺绑定审核
 * @author arno.jiang
 * 
 */
@Controller
@RequestMapping("userShopBind")
public class UserShopBindController extends BaseController {
	private static final Logger logger = LoggerFactory.getLogger(UserShopBindController.class);

	@Autowired
	private UserShopBindService userShopBindService;
	
	/**
	 * 商户店铺绑定审核
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "checkBindingInfo", method = {RequestMethod.POST })
	@ResponseBody
	public BasicResult<String> checkBindingInfo(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		BasicResult<String> rs = new BasicResult<String>();
		try {
			String id = request.getParameter("id");
			String status = request.getParameter("status");
			String checkMessage = request.getParameter("checkMessage");


			UserShopBindInfo userShopBindInfo = new UserShopBindInfo();
			userShopBindInfo.setId(Integer.parseInt(id));
			userShopBindInfo.setStatus(Integer.parseInt(status));
			userShopBindInfo.setCheckMessage(checkMessage);
			userShopBindInfo.setCheckTime(new Date());

			userShopBindService.checkBindingInfo(userShopBindInfo);
		} catch (Exception e) {
			logger.info("系统异常，商户店铺绑定审核失败!" + e.getMessage());
			rs.setMessage("系统异常，商户店铺绑定审核失败!");
			rs.setCode("1");
			return rs;
		}
		return rs;
	}
	
	/**
	 * 商户店铺绑定信息查询
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "queryBindingInfo", method = {RequestMethod.POST })
	@ResponseBody
	public BasicResult<List<UserShopBindPo>> queryBindingInfo(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		BasicResult<List<UserShopBindPo>> rs = new BasicResult<List<UserShopBindPo>>();
		try {
			String userId = request.getParameter("userId");
			String platId = request.getParameter("platId");
			String status = request.getParameter("status");
			String startTime = request.getParameter("startTime")+" 00:00:00";
			String endTime = request.getParameter("endTime")+" 23:59:59";
			
			if(StringUtils.isEmpty(userId)){
				userId = null;
			}
			
			if(StringUtils.isEmpty(platId)){
				platId = null;
			}
			
			if(StringUtils.isEmpty(status)){
				status = null;
			}

			UserShopBindQueryPo userShopBindQueryPo = new UserShopBindQueryPo();
			userShopBindQueryPo.setUserId(userId);
			userShopBindQueryPo.setPlatId(platId);
			userShopBindQueryPo.setStartTime(startTime);
			userShopBindQueryPo.setEndTime(endTime);
			userShopBindQueryPo.setStatus(status);

			List<UserShopBindPo> list = userShopBindService.getUnCheckShopBindList(userShopBindQueryPo);
			rs.setSingleResult(list);
		} catch (Exception e) {
			e.printStackTrace();
			logger.info("系统异常，商户店铺待审核列表查询失败!" + e.getMessage());
			rs.setMessage("系统异常，商户店铺待审核列表查询失败!");
			rs.setCode("1");
			return rs;
		}
		return rs;
	}
}
