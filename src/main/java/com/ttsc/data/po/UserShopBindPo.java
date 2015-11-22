package com.ttsc.data.po;

public class UserShopBindPo {
	private int id;
	private int userId;//用户ID
	private String telephone;
	private int platId;// 平台
	private String shopName;// 商铺名称
	private String linkUrl;// 店铺校验链接地址
	private String wwId;// 旺旺ID
	private String validCode;//校验码
	private int status;// 状态：0未审核、1通过、2未通过
	private String createTime;// 创建时间
	private String checkTime;// 审核时间
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
	public String getTelephone() {
		return telephone;
	}
	public void setTelephone(String telephone) {
		this.telephone = telephone;
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
	public String getValidCode() {
		return validCode;
	}
	public void setValidCode(String validCode) {
		this.validCode = validCode;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	public String getCheckTime() {
		return checkTime;
	}
	public void setCheckTime(String checkTime) {
		this.checkTime = checkTime;
	}
	public String getCheckMessage() {
		return checkMessage;
	}
	public void setCheckMessage(String checkMessage) {
		this.checkMessage = checkMessage;
	}
	
}
