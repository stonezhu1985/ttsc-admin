package com.ttsc.data.entity;

import java.util.Date;

public class ThirdAccountInfo {

	private int id;
	//账号
	private String account;
	//收货人姓名
	private String consigneePerson;
	//手机号码
	private String telephone;
	//省份
	private int province;
	//城市
	private int city;
	//县
	private int county;
	//详细地址
	private String address;
	//性别
	private int sex;
	//信誉的图片
	private String reputationPhoto;
	//实名认证
	private String realNamePhoto;
	//花取截图
	private String flowersPhoto;
	//信誉等级
	private int reputationLevel;
	//第三方平台id
	private int thirdPartId;
	//第三方等级id
	private int thirdLevelInfoId;
	//是否审核
	private int isExamine;
	private Date checkTime;// 审核时间
	private String checkMessage;//审核意见
	
	public Date getCheckTime() {
		return checkTime;
	}
	public void setCheckTime(Date checkTime) {
		this.checkTime = checkTime;
	}
	public String getCheckMessage() {
		return checkMessage;
	}
	public void setCheckMessage(String checkMessage) {
		this.checkMessage = checkMessage;
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
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getAccount() {
		return account;
	}
	public void setAccount(String account) {
		this.account = account;
	}
	public String getConsigneePerson() {
		return consigneePerson;
	}
	public void setConsigneePerson(String consigneePerson) {
		this.consigneePerson = consigneePerson;
	}
	public String getTelephone() {
		return telephone;
	}
	public void setTelephone(String telephone) {
		this.telephone = telephone;
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
	public int getCounty() {
		return county;
	}
	public void setCounty(int county) {
		this.county = county;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public int getSex() {
		return sex;
	}
	public void setSex(int sex) {
		this.sex = sex;
	}
	public String getReputationPhoto() {
		return reputationPhoto;
	}
	public void setReputationPhoto(String reputationPhoto) {
		this.reputationPhoto = reputationPhoto;
	}
	public int getReputationLevel() {
		return reputationLevel;
	}
	public void setReputationLevel(int reputationLevel) {
		this.reputationLevel = reputationLevel;
	}
	public int getThirdPartId() {
		return thirdPartId;
	}
	public void setThirdPartId(int thirdPartId) {
		this.thirdPartId = thirdPartId;
	}
	public int getThirdLevelInfoId() {
		return thirdLevelInfoId;
	}
	public void setThirdLevelInfoId(int thirdLevelInfoId) {
		this.thirdLevelInfoId = thirdLevelInfoId;
	}
	public int getIsExamine() {
		return isExamine;
	}
	public void setIsExamine(int isExamine) {
		this.isExamine = isExamine;
	}
}
