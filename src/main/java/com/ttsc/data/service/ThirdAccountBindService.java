package com.ttsc.data.service;

import java.util.List;

import com.ttsc.data.entity.ThirdAccountInfo;
import com.ttsc.data.po.ThirdAccountPo;
import com.ttsc.data.po.ThirdAccountQueryPo;

public interface ThirdAccountBindService {
	/**
	 * 获取未审批列表
	 * @return
	 */
	public List<ThirdAccountPo> getUnCheckThirdAccountList(ThirdAccountQueryPo queryPo);
	/**
	 * 根据id查询第三方账号
	 * @param id
	 * @return
	 */
	public ThirdAccountPo findThirdAccountById(int id);

	
	/**
	 * 审核
	 * @param user
	 */
	public void checkThirdAccountInfo(ThirdAccountInfo user);
}
