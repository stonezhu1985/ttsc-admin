package com.ttsc.data.po;

public class BuyerInfoQueryPo {
	private String id;
	private String telephone;
	// 真实姓名
	private String realName;
	// 身份证号码
	private String passPostNum;
	private String startTime;
	private String endTime;
	private String status;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public String getRealName() {
		return realName;
	}

	public void setRealName(String realName) {
		this.realName = realName;
	}

	public String getPassPostNum() {
		return passPostNum;
	}

	public void setPassPostNum(String passPostNum) {
		this.passPostNum = passPostNum;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
}
