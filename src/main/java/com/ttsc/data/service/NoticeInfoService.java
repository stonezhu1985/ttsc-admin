package com.ttsc.data.service;

import java.util.List;

import com.ttsc.data.entity.NoticeInfo;
import com.ttsc.data.po.NoticeQueryPo;

public interface NoticeInfoService {
	/**
	 * 保存公告
	 * @param notice
	 * @return
	 */
	public int saveNotice(NoticeInfo notice);
	
	/**
	 * 修改公告
	 * @param notice
	 * @return
	 */
	public void updateNotice(NoticeInfo notice);
	
	/**
	 * 删除公告
	 * @param id
	 * @return
	 */
	public void deleteNotice(int id);
	
	/**
	 * 根据ID获取公告
	 * @param id
	 * @return
	 */
	public NoticeInfo getNoticeById(int id);
	
	/**
	 * 查询公告
	 * @param query
	 * @return
	 */
	public List<NoticeInfo> queryList(NoticeQueryPo query);
	
	/**
	 * 查询公告总数
	 * @param query
	 * @return
	 */
	public int queryListTotal(NoticeQueryPo query);
}
