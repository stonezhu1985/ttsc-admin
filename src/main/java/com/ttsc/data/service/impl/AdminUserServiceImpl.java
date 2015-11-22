package com.ttsc.data.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ttsc.data.dao.AdminUserDao;
import com.ttsc.data.entity.AdminUser;
import com.ttsc.data.service.AdminUserService;

@Component("adminUserService")
public class AdminUserServiceImpl implements AdminUserService {

	@Autowired
	private AdminUserDao adminUserDao;

	@Override
	public AdminUser getAdminUser(AdminUser adminUser) {
		return adminUserDao.getAdminUser(adminUser);
	}

}
