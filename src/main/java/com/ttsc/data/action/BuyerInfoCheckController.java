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

import com.ttsc.data.entity.BuyerInfo;
import com.ttsc.data.po.BuyerInfoPo;
import com.ttsc.data.po.BuyerInfoQueryPo;
import com.ttsc.data.result.BasicResult;
import com.ttsc.data.service.BuyerInfoService;
import com.ttsc.data.util.ReadPropertiesUtil;

/**
 * 买手信息审核
 * @author arno.jiang
 * 
 */
@Controller
@RequestMapping("buyerCheck")
public class BuyerInfoCheckController extends BaseController {
	private static final Logger logger = LoggerFactory.getLogger(BuyerInfoCheckController.class);

	@Autowired
	private BuyerInfoService buyerInfoService;
	
	/**
	 * 审核
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "checkInfo", method = {RequestMethod.POST })
	@ResponseBody
	public BasicResult<String> checkInfo(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		BasicResult<String> rs = new BasicResult<String>();
		try {
			String id = request.getParameter("id");
			String status = request.getParameter("status");
			String checkMessage = request.getParameter("checkMessage");


			BuyerInfo user = new BuyerInfo();
			user.setId(Integer.parseInt(id));
			user.setIsValidate(Integer.parseInt(status));
			user.setCheckMessage(checkMessage);
			user.setCheckTime(new Date());

			buyerInfoService.checkUserInfo(user);
		} catch (Exception e) {
			e.printStackTrace();
			logger.info("系统异常，买手信息审核失败!" + e.getMessage());
			rs.setMessage("系统异常，买手信息审核失败!");
			rs.setCode("1");
			return rs;
		}
		return rs;
	}
	
	/**
	 * 根据ID查询买手信息
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "getBuyerInfo", method = {RequestMethod.POST })
	@ResponseBody
	public BasicResult<BuyerInfoPo> getBuyerInfo(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		BasicResult<BuyerInfoPo> rs = new BasicResult<BuyerInfoPo>();
		try {
			String userId = request.getParameter("userId");

			BuyerInfoPo  po= buyerInfoService.findUserBUserId(Integer.parseInt(userId));
			if(StringUtils.isNotEmpty(po.getHandPassPortPhoto())){
				po.setHandPassPortPhoto(ReadPropertiesUtil.get("image_base_path")+po.getHandPassPortPhoto());
			}
			if(StringUtils.isNotEmpty(po.getPassPortPhoto())){
				po.setPassPortPhoto(ReadPropertiesUtil.get("image_base_path")+po.getPassPortPhoto());
			}
			
			rs.setSingleResult(po);
		} catch (Exception e) {
			e.printStackTrace();
			logger.info("系统异常，买手信息获取失败!" + e.getMessage());
			rs.setMessage("系统异常，买手信息获取失败!");
			rs.setCode("1");
			return rs;
		}
		return rs;
	}
	
	/**
	 * 查询待审核列表
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "queryUnCheckInfoList", method = {RequestMethod.POST })
	@ResponseBody
	public BasicResult<List<BuyerInfoPo>> queryUnCheckInfoList(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		BasicResult<List<BuyerInfoPo>> rs = new BasicResult<List<BuyerInfoPo>>();
		try {
			String userId = request.getParameter("userId");
			String telephone = request.getParameter("telephone");
			String realName = request.getParameter("realName");
			String passPostNum = request.getParameter("passPostNum");
			String status = request.getParameter("status");
			String startTime = request.getParameter("startTime")+" 00:00:00";
			String endTime = request.getParameter("endTime")+" 23:59:59";
			
			if(StringUtils.isEmpty(userId)){
				userId = null;
			}
			
			if(StringUtils.isEmpty(telephone)){
				telephone = null;
			}
			
			if(StringUtils.isEmpty(realName)){
				realName = null;
			}
			
			if(StringUtils.isEmpty(passPostNum)){
				passPostNum = null;
			}
			
			if(StringUtils.isEmpty(status)){
				status = null;
			}

			BuyerInfoQueryPo queryPo = new BuyerInfoQueryPo();
			queryPo.setId(userId);
			queryPo.setRealName(realName);
			queryPo.setPassPostNum(passPostNum);
			queryPo.setTelephone(telephone);
			queryPo.setStartTime(startTime);
			queryPo.setEndTime(endTime);
			queryPo.setStatus(status);

			List<BuyerInfoPo> list = buyerInfoService.getUnCheckUserList(queryPo);
			rs.setSingleResult(list);
		} catch (Exception e) {
			e.printStackTrace();
			logger.info("系统异常，买手信息审核列表查询失败!" + e.getMessage());
			rs.setMessage("系统异常，买手信息审核列表查询失败!");
			rs.setCode("1");
			return rs;
		}
		return rs;
	}
}
