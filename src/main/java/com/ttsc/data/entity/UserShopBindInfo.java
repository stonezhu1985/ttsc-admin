package com.ttsc.data.entity;

import java.util.Date;

/**
 * 商户店铺绑定信息
 * 
 * @author arno.jiang
 * 
 */
public class UserShopBindInfo {
	private int id;
	private int userId;//用户ID
	private int platId;// 平台
	private String shopName;// 商铺名称
	private String linkUrl;// 店铺首页链接地址
	private String wwId;// 旺旺ID
	private String validCode;//校验码
	private int province;// 省
	private int city;// 市
	private int town;// 县，城镇
	private String provinceName;// 省名称
	private String cityName;// 市名称
	private String townName;// 县，城镇名称
	private int status;// 状态：0未审核、1通过、2未通过
	private Date createTime;// 创建时间
	private Date checkTime;// 审核时间
	private String checkMessage;//审核意见

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	
	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public int getPlatId() {
		return platId;
	}

	public void setPlatId(int platId) {
		this.platId = platId;
	}

	public String getShopName() {
		return shopName;
	}

	public void setShopName(String shopName) {
		this.shopName = shopName;
	}

	public String getLinkUrl() {
		return linkUrl;
	}

	public void setLinkUrl(String linkUrl) {
		this.linkUrl = linkUrl;
	}

	public String getWwId() {
		return wwId;
	}

	public void setWwId(String wwId) {
		this.wwId = wwId;
	}

	public int getProvince() {
		return province;
	}

	public void setProvince(int province) {
		this.province = province;
	}

	public int getCity() {
		return city;
	}

	public void setCity(int city) {
		this.city = city;
	}

	public int getTown() {
		return town;
	}

	public void setTown(int town) {
		this.town = town;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getCheckTime() {
		return checkTime;
	}

	public void setCheckTime(Date checkTime) {
		this.checkTime = checkTime;
	}

	public String getProvinceName() {
		return provinceName;
	}

	public void setProvinceName(String provinceName) {
		this.provinceName = provinceName;
	}

	public String getCityName() {
		return cityName;
	}

	public void setCityName(String cityName) {
		this.cityName = cityName;
	}

	public String getTownName() {
		return townName;
	}

	public void setTownName(String townName) {
		this.townName = townName;
	}

	public String getValidCode() {
		return validCode;
	}

	public void setValidCode(String validCode) {
		this.validCode = validCode;
	}
	
	public String getCheckMessage() {
		return checkMessage;
	}

	public void setCheckMessage(String checkMessage) {
		this.checkMessage = checkMessage;
	}
}
