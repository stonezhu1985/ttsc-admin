package com.ttsc.data.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ttsc.data.dao.BuyerInfoDao;
import com.ttsc.data.entity.BuyerInfo;
import com.ttsc.data.po.BuyerInfoPo;
import com.ttsc.data.po.BuyerInfoQueryPo;
import com.ttsc.data.service.BuyerInfoService;

@Component("buyerInfoService")
public class BuyerInfoServiceImpl implements BuyerInfoService {
	@Autowired
	private BuyerInfoDao buyerInfoDao;
	
	@Override
	public void checkUserInfo(BuyerInfo user) {
		buyerInfoDao.checkUserInfo(user);
	}

	@Override
	public BuyerInfoPo findUserBUserId(int id) {
		return buyerInfoDao.findUserBUserId(id);
	}

	@Override
	public List<BuyerInfoPo> getUnCheckUserList(BuyerInfoQueryPo queryPo) {
		return buyerInfoDao.getUnCheckUserList(queryPo);
	}

	@Override
	public void updateHuabeiInfo(int id) {
		buyerInfoDao.updateHuabeiInfo(id);
	}

}
