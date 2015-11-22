package com.ttsc.data.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.ttsc.data.entity.BuyerInfo;
import com.ttsc.data.po.BuyerInfoPo;
import com.ttsc.data.po.BuyerInfoQueryPo;

/**
 *用户dao 
 * @author arno.jiang
 *
 */
@Repository
public interface BuyerInfoDao {
	/**
	 * 获取未审批列表
	 * @return
	 */
	public List<BuyerInfoPo> getUnCheckUserList(BuyerInfoQueryPo queryPo);
	/**
	 * 根据id查询用户
	 * @param id
	 * @return
	 */
	public BuyerInfoPo findUserBUserId(int id);

	
	/**
	 * 审核
	 * @param user
	 */
	public void checkUserInfo(BuyerInfo user);
	
	/**
	 * 修改花呗标示
	 * @param id
	 */
	public void updateHuabeiInfo(int id);
	

}

