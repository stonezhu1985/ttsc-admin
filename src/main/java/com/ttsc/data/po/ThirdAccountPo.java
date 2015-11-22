package com.ttsc.data.po;

public class ThirdAccountPo {
	private String id;
	private String userId;//生财ID
	private String realName;//姓名
	private String account;//第三方账号
	private String telephone;//收货电话
	private String address;//收货地址
	private String levelName;//平台等级
	private String partName;//平台类型
	private String reputationPhoto;//信誉等级
	private String realNamePhoto;//实名认证
	private String flowersPhoto;//其他图片
	private String consigneePerson;//收货人
	private String cityName;//城市
	private String createTime;
	private String status;
	private String checkMessage;

	public String getCheckMessage() {
		return checkMessage;
	}

	public void setCheckMessage(String checkMessage) {
		this.checkMessage = checkMessage;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getRealName() {
		return realName;
	}

	public void setRealName(String realName) {
		this.realName = realName;
	}

	public String getAccount() {
		return account;
	}

	public void setAccount(String account) {
		this.account = account;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getLevelName() {
		return levelName;
	}

	public void setLevelName(String levelName) {
		this.levelName = levelName;
	}

	public String getPartName() {
		return partName;
	}

	public void setPartName(String partName) {
		this.partName = partName;
	}

	public String getReputationPhoto() {
		return reputationPhoto;
	}

	public void setReputationPhoto(String reputationPhoto) {
		this.reputationPhoto = reputationPhoto;
	}

	public String getRealNamePhoto() {
		return realNamePhoto;
	}

	public void setRealNamePhoto(String realNamePhoto) {
		this.realNamePhoto = realNamePhoto;
	}

	public String getFlowersPhoto() {
		return flowersPhoto;
	}

	public void setFlowersPhoto(String flowersPhoto) {
		this.flowersPhoto = flowersPhoto;
	}

	public String getConsigneePerson() {
		return consigneePerson;
	}

	public void setConsigneePerson(String consigneePerson) {
		this.consigneePerson = consigneePerson;
	}

	public String getCityName() {
		return cityName;
	}

	public void setCityName(String cityName) {
		this.cityName = cityName;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
}
