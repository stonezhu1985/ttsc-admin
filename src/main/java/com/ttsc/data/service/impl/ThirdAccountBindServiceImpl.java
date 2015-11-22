package com.ttsc.data.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ttsc.data.dao.ThirdAccountBindDao;
import com.ttsc.data.entity.ThirdAccountInfo;
import com.ttsc.data.po.ThirdAccountPo;
import com.ttsc.data.po.ThirdAccountQueryPo;
import com.ttsc.data.service.ThirdAccountBindService;

@Component("thirdAccountBindService")
public class ThirdAccountBindServiceImpl implements ThirdAccountBindService {
	@Autowired
	private ThirdAccountBindDao thirdAccountBindDao;
	
	@Override
	public void checkThirdAccountInfo(ThirdAccountInfo thirdAccount) {
		thirdAccountBindDao.checkThirdAccountInfo(thirdAccount);
	}

	@Override
	public ThirdAccountPo findThirdAccountById(int id) {
		return thirdAccountBindDao.findThirdAccountById(id);
	}

	@Override
	public List<ThirdAccountPo> getUnCheckThirdAccountList(
			ThirdAccountQueryPo queryPo) {
		return thirdAccountBindDao.getUnCheckThirdAccountList(queryPo);
	}

}
