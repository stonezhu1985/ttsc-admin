package com.ttsc.data.action;

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

import com.ttsc.data.entity.NoticeInfo;
import com.ttsc.data.po.NoticeQueryPo;
import com.ttsc.data.result.BasicResult;
import com.ttsc.data.service.NoticeInfoService;
import com.ttsc.data.util.Constant;

@Controller
@RequestMapping("notice")
public class NoticeController extends BaseController {

	private static final Logger logger = LoggerFactory.getLogger(NoticeController.class);

	@Autowired
	private NoticeInfoService noticeInfoService;
	
	@RequestMapping(value = "save", method = {RequestMethod.POST })
	@ResponseBody
	public BasicResult<String> save(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		BasicResult<String> rs = new BasicResult<String>();
		try {
			if (request.getSession().getAttribute(Constant.USER_LOGIN_INFO) == null) {
				rs.setMessage("请重新登录!");
				rs.setCode("1");
				return rs;
			}
			String title = request.getParameter("title");
			String content = request.getParameter("content");
			String noticeTime = request.getParameter("noticeTime");
			String type = request.getParameter("type");

			if (StringUtils.isEmpty(title)) {
				rs.setMessage("标题不能为空，请输入!");
				rs.setCode("1");
				return rs;
			}

			if (StringUtils.isEmpty(content)) {
				rs.setMessage("公告内容不能为空，请输入!");
				rs.setCode("1");
				return rs;
			}
			
			if (StringUtils.isEmpty(noticeTime)) {
				rs.setMessage("发布时间不能为空，请输入!");
				rs.setCode("1");
				return rs;
			}
			
			if(StringUtils.isEmpty(type)){
				type = "0";
			}
			
			NoticeInfo notice = new NoticeInfo();
			notice.setTitle(title);
			notice.setContent(content);
			notice.setNoticeTime(noticeTime);
			notice.setType(Integer.parseInt(type));
			noticeInfoService.saveNotice(notice);
		} catch (Exception e) {
			e.printStackTrace();
			logger.info("系统异常，公告发布失败!" + e.getMessage());
			rs.setMessage("系统异常，公告发布失败!");
			rs.setCode("1");
			return rs;
		}
		return rs;
	}
	
	@RequestMapping(value = "update", method = {RequestMethod.POST })
	@ResponseBody
	public BasicResult<String> update(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		BasicResult<String> rs = new BasicResult<String>();
		try {
			if (request.getSession().getAttribute(Constant.USER_LOGIN_INFO) == null) {
				rs.setMessage("请重新登录!");
				rs.setCode("1");
				return rs;
			}
			String id = request.getParameter("id");
			String title = request.getParameter("title");
			String content = request.getParameter("content");
			String noticeTime = request.getParameter("noticeTime");
			String type = request.getParameter("type");

			if (StringUtils.isEmpty(title)) {
				rs.setMessage("标题不能为空，请输入!");
				rs.setCode("1");
				return rs;
			}

			if (StringUtils.isEmpty(content)) {
				rs.setMessage("公告内容不能为空，请输入!");
				rs.setCode("1");
				return rs;
			}
			
			if (StringUtils.isEmpty(noticeTime)) {
				rs.setMessage("发布时间不能为空，请输入!");
				rs.setCode("1");
				return rs;
			}
			
			if(StringUtils.isEmpty(type)){
				type = "0";
			}
			
			NoticeInfo notice = new NoticeInfo();
			notice.setId(Integer.parseInt(id));
			notice.setTitle(title);
			notice.setContent(content);
			notice.setType(Integer.parseInt(type));
			notice.setNoticeTime(noticeTime);
			noticeInfoService.updateNotice(notice);
		} catch (Exception e) {
			e.printStackTrace();
			logger.info("系统异常，公告发布失败!" + e.getMessage());
			rs.setMessage("系统异常，公告发布失败!");
			rs.setCode("1");
			return rs;
		}
		return rs;
	}
	
	@RequestMapping(value = "delete", method = {RequestMethod.POST })
	@ResponseBody
	public BasicResult<String> delete(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		BasicResult<String> rs = new BasicResult<String>();
		try {
			if (request.getSession().getAttribute(Constant.USER_LOGIN_INFO) == null) {
				rs.setMessage("请重新登录!");
				rs.setCode("1");
				return rs;
			}
			String id = request.getParameter("id");
			if (StringUtils.isEmpty(id)) {
				rs.setMessage("请选择一条删除!");
				rs.setCode("1");
				return rs;
			}
			noticeInfoService.deleteNotice(Integer.parseInt(id));
		} catch (Exception e) {
			e.printStackTrace();
			logger.info("系统异常，公告删除失败!" + e.getMessage());
			rs.setMessage("系统异常，公告删除失败!");
			rs.setCode("1");
			return rs;
		}
		return rs;
	}
	
	@RequestMapping(value = "queryList", method = {RequestMethod.POST })
	@ResponseBody
	public BasicResult<List<NoticeInfo>> queryList(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		BasicResult<List<NoticeInfo>> rs = new BasicResult<List<NoticeInfo>>();
		try {
			if (request.getSession().getAttribute(Constant.USER_LOGIN_INFO) == null) {
				rs.setMessage("请重新登录!");
				rs.setCode("1");
				return rs;
			}
			String title = request.getParameter("title");
			String type = request.getParameter("type");
			String startDate = request.getParameter("startDate");
			String endDate = request.getParameter("endDate");
			
			if(StringUtils.isEmpty(type)){
				type = null;
			}
			NoticeQueryPo po = new NoticeQueryPo();
			po.setTitle(title);
			po.setType(type);
			po.setStartTime(startDate+" 00:00:00");
			po.setEndTime(endDate+" 23:59:59");
			List<NoticeInfo>  list= noticeInfoService.queryList(po);
			rs.setSingleResult(list);
		} catch (Exception e) {
			logger.info("系统异常，公告查询失败!" + e.getMessage());
			e.printStackTrace();
			rs.setMessage("系统异常，公告查询失败!");
			rs.setCode("1");
			return rs;
		}
		return rs;
	}
	
	@RequestMapping(value = "getNotice", method = {RequestMethod.POST })
	@ResponseBody
	public BasicResult<NoticeInfo> getNotice(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		BasicResult<NoticeInfo> rs = new BasicResult<NoticeInfo>();
		try {
			if (request.getSession().getAttribute(Constant.USER_LOGIN_INFO) == null) {
				rs.setMessage("请重新登录!");
				rs.setCode("1");
				return rs;
			}
			String id = request.getParameter("id");
			
			NoticeInfo notice = noticeInfoService.getNoticeById(Integer.parseInt(id));
			rs.setSingleResult(notice);
		} catch (Exception e) {
			logger.info("系统异常，公告详情获取失败!" + e.getMessage());
			e.printStackTrace();
			rs.setMessage("系统异常，公告详情获取失败!");
			rs.setCode("1");
			return rs;
		}
		return rs;
	}
}
