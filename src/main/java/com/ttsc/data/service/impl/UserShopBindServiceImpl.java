package com.ttsc.data.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ttsc.data.dao.UserShopBindDao;
import com.ttsc.data.entity.UserShopBindInfo;
import com.ttsc.data.po.UserShopBindPo;
import com.ttsc.data.po.UserShopBindQueryPo;
import com.ttsc.data.service.UserShopBindService;

@Component("userShopBindService")
public class UserShopBindServiceImpl implements UserShopBindService {
	
	@Autowired
	private UserShopBindDao userShopBindDao;

	@Override
	public List<UserShopBindPo> getUnCheckShopBindList(UserShopBindQueryPo userShopBindQueryPo) {
		return userShopBindDao.getUnCheckShopBindList(userShopBindQueryPo);
	}

	@Override
	public void checkBindingInfo(UserShopBindInfo userShopBindInfo) {
		userShopBindDao.checkBindingInfo(userShopBindInfo);
	}

}
