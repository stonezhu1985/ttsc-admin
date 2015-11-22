package com.ttsc.data.po;

public class BuyerInfoPo {
	// id
	private int id;
	// 手机号码
	private String telephone;
	// 性别
	private int sex;
	// 昵称
	private String name;
	// QQ号码
	private String qq;
	//微信号
	private String weixin;
	// 真实姓名
	private String realName;
	// 身份证照片
	private String passPortPhoto;
	// 手持身份证照片
	private String handPassPortPhoto;
	// 身份证号码
	private String passPostNum;
	// 创建时间
	private String createTime;
	//账户类型
	private int bankType;
	//开户账号
	private String account;
	//开户姓名
	private String bankName;
	//开户城市
	private String bankCity;
	//开户行
	private String openAccount;
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

	public String getPassPostNum() {
		return passPostNum;
	}

	public void setPassPostNum(String passPostNum) {
		this.passPostNum = passPostNum;
	}

	public String getHandPassPortPhoto() {
		return handPassPortPhoto;
	}

	public void setHandPassPortPhoto(String handPassPortPhoto) {
		this.handPassPortPhoto = handPassPortPhoto;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public int getSex() {
		return sex;
	}

	public void setSex(int sex) {
		this.sex = sex;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getQq() {
		return qq;
	}

	public void setQq(String qq) {
		this.qq = qq;
	}

	public String getRealName() {
		return realName;
	}

	public void setRealName(String realName) {
		this.realName = realName;
	}

	public String getPassPortPhoto() {
		return passPortPhoto;
	}

	public void setPassPortPhoto(String passPortPhoto) {
		this.passPortPhoto = passPortPhoto;
	}

	public int getBankType() {
		return bankType;
	}

	public void setBankType(int bankType) {
		this.bankType = bankType;
	}

	public String getAccount() {
		return account;
	}

	public void setAccount(String account) {
		this.account = account;
	}

	public String getBankName() {
		return bankName;
	}

	public void setBankName(String bankName) {
		this.bankName = bankName;
	}

	public String getBankCity() {
		return bankCity;
	}

	public void setBankCity(String bankCity) {
		this.bankCity = bankCity;
	}

	public String getOpenAccount() {
		return openAccount;
	}

	public void setOpenAccount(String openAccount) {
		this.openAccount = openAccount;
	}

	public String getWeixin() {
		return weixin;
	}

	public void setWeixin(String weixin) {
		this.weixin = weixin;
	}
}
