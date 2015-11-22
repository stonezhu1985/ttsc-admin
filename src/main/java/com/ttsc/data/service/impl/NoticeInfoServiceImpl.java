package com.ttsc.data.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ttsc.data.dao.NoticeInfoDao;
import com.ttsc.data.entity.NoticeInfo;
import com.ttsc.data.po.NoticeQueryPo;
import com.ttsc.data.service.NoticeInfoService;

@Component("noticeInfoService")
public class NoticeInfoServiceImpl implements NoticeInfoService {

	@Autowired
	NoticeInfoDao noticeInfoDao;
	
	@Override
	public NoticeInfo getNoticeById(int id) {
		// TODO Auto-generated method stub
		return noticeInfoDao.getNoticeById(id);
	}

	@Override
	public List<NoticeInfo> queryList(NoticeQueryPo query) {
		// TODO Auto-generated method stub
		return noticeInfoDao.queryList(query);
	}
	
	@Override
	public void deleteNotice(int id){
		noticeInfoDao.deleteNotice(id);
	}

	@Override
	public int saveNotice(NoticeInfo notice) {
		noticeInfoDao.saveNotice(notice);
		return notice.getId();
	}

	@Override
	public void updateNotice(NoticeInfo notice) {
		// TODO Auto-generated method stub
		noticeInfoDao.updateNotice(notice);
	}

}
