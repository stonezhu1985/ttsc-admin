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

import com.ttsc.data.entity.ThirdAccountInfo;
import com.ttsc.data.po.ThirdAccountPo;
import com.ttsc.data.po.ThirdAccountQueryPo;
import com.ttsc.data.result.BasicResult;
import com.ttsc.data.service.BuyerInfoService;
import com.ttsc.data.service.ThirdAccountBindService;
import com.ttsc.data.util.ReadPropertiesUtil;

/**
 * 第三方账号审核
 * @author arno.jiang
 *
 */
@Controller
@RequestMapping("thirdAccount")
public class ThirdAccountController extends BaseController {
	private static final Logger logger = LoggerFactory.getLogger(ThirdAccountController.class);

	@Autowired
	private ThirdAccountBindService thirdAccountBindService;
	
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


			ThirdAccountInfo obj = new ThirdAccountInfo();
			obj.setId(Integer.parseInt(id));
			obj.setIsExamine(Integer.parseInt(status));
			obj.setCheckMessage(checkMessage);
			obj.setCheckTime(new Date());

			thirdAccountBindService.checkThirdAccountInfo(obj);
			
			ThirdAccountPo  po= thirdAccountBindService.findThirdAccountById(Integer.parseInt(id));
			if("1".equals(status) && StringUtils.isNotEmpty(po.getReputationPhoto()) && StringUtils.isNotEmpty(po.getRealNamePhoto()) && StringUtils.isNotEmpty(po.getFlowersPhoto())){
				buyerInfoService.updateHuabeiInfo(Integer.parseInt(po.getUserId()));
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			logger.info("系统异常，任务账号绑定审核失败!" + e.getMessage());
			rs.setMessage("系统异常，任务账号绑定审核失败!");
			rs.setCode("1");
			return rs;
		}
		return rs;
	}
	
	/**
	 * 根据ID查询任务账号绑定信息
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "findThirdAccountById", method = {RequestMethod.POST })
	@ResponseBody
	public BasicResult<ThirdAccountPo> findThirdAccountById(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		BasicResult<ThirdAccountPo> rs = new BasicResult<ThirdAccountPo>();
		try {
			String id = request.getParameter("id");

			ThirdAccountPo  po= thirdAccountBindService.findThirdAccountById(Integer.parseInt(id));
			if(StringUtils.isNotEmpty(po.getReputationPhoto())){
				po.setReputationPhoto(ReadPropertiesUtil.get("image_base_path")+po.getReputationPhoto());
			}
			if(StringUtils.isNotEmpty(po.getRealNamePhoto())){
				po.setRealNamePhoto(ReadPropertiesUtil.get("image_base_path")+po.getRealNamePhoto());
			}
			
			if(StringUtils.isNotEmpty(po.getFlowersPhoto())){
				po.setFlowersPhoto(ReadPropertiesUtil.get("image_base_path")+po.getFlowersPhoto());
			}
			
			rs.setSingleResult(po);
		} catch (Exception e) {
			e.printStackTrace();
			logger.info("系统异常，任务账号绑定信息获取失败!" + e.getMessage());
			rs.setMessage("系统异常，任务账号绑定信息获取失败!");
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
	public BasicResult<List<ThirdAccountPo>> queryUnCheckInfoList(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		BasicResult<List<ThirdAccountPo>> rs = new BasicResult<List<ThirdAccountPo>>();
		try {
			String userId = request.getParameter("userId");
			String telephone = request.getParameter("telephone");
			String realName = request.getParameter("realName");
			String platId = request.getParameter("platId");
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
			
			if(StringUtils.isEmpty(platId)){
				platId = null;
			}
			
			if(StringUtils.isEmpty(status)){
				status = null;
			}

			ThirdAccountQueryPo queryPo = new ThirdAccountQueryPo();
			queryPo.setUserId(userId);
			queryPo.setRealName(realName);
			queryPo.setPlatId(platId);
			queryPo.setTelephone(telephone);
			queryPo.setStartTime(startTime);
			queryPo.setEndTime(endTime);
			queryPo.setStatus(status);

			List<ThirdAccountPo> list = thirdAccountBindService.getUnCheckThirdAccountList(queryPo);
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
