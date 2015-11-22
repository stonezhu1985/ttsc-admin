package com.ttsc.data.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.ttsc.data.entity.UserShopBindInfo;
import com.ttsc.data.po.UserShopBindPo;
import com.ttsc.data.po.UserShopBindQueryPo;

/**
 * 商户店铺绑定
 * @author arno.jiang
 *
 */
@Repository
public interface UserShopBindDao {

	/**
	 * 修改商户店铺绑定审核信息
	 * @param userShopBindInfo
	 * @return
	 */
	public void checkBindingInfo(UserShopBindInfo userShopBindInfo);
	
	/**
	 * 获取待审核绑定信息列表
	 * @param userId
	 * @return
	 */
	public List<UserShopBindPo> getUnCheckShopBindList(UserShopBindQueryPo userShopBindQueryPo);
}
