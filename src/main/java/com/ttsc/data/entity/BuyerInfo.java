package com.ttsc.data.entity;

import java.util.Date;

/**
 * 用户
 * @author stone.zhu
 *
 */
public class BuyerInfo {
	// id
	private int id;
	// 手机号码
	private String telephone;
	// 性别
	private int sex;
	// 昵称
	private String name;
	//密码
	private String password;
	//头像
    private String heaPortrait;
    //QQ号码
    private String qq;
    //真实姓名
    private String realName;
    //身份证照片
    private String passPortPhoto;
    //邀请码
    private int invitationCode;
    //手持身份证照片
    private String handPassPortPhoto;
    //身份证号码
    private String passPostNum;
	//是否认证
    private int isValidate;
    //身份证上传时间
    private Date passPortCreateTime;
    //创建时间
    private Date createTime;
    //更新时间
    private Date updateTime;
    //审核意见
    private String checkMessage;
    //审核时间
    private Date checkTime;
    
    public Date getCheckTime() {
		return checkTime;
	}

	public void setCheckTime(Date checkTime) {
		this.checkTime = checkTime;
	}

	public int getIsValidate() {
 		return isValidate;
 	}

 	public void setIsValidate(int isValidate) {
 		this.isValidate = isValidate;
 	}

 	public Date getPassPortCreateTime() {
 		return passPortCreateTime;
 	}

 	public void setPassPortCreateTime(Date passPortCreateTime) {
 		this.passPortCreateTime = passPortCreateTime;
 	}

 	public Date getUpdateTime() {
 		return updateTime;
 	}

 	public void setUpdateTime(Date updateTime) {
 		this.updateTime = updateTime;
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

	public int getInvitationCode() {
		return invitationCode;
	}

	public void setInvitationCode(int invitationCode) {
		this.invitationCode = invitationCode;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
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

	public String getHeaPortrait() {
		return heaPortrait;
	}

	public void setHeaPortrait(String heaPortrait) {
		this.heaPortrait = heaPortrait;
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

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public String getCheckMessage() {
		return checkMessage;
	}

	public void setCheckMessage(String checkMessage) {
		this.checkMessage = checkMessage;
	}

}
