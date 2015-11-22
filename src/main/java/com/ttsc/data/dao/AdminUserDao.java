package com.ttsc.data.dao;

import org.springframework.stereotype.Repository;

import com.ttsc.data.entity.AdminUser;

@Repository
public interface AdminUserDao {
	/**
	 * 
	 * @param adminUser
	 * @return
	 */
	public AdminUser getAdminUser(AdminUser adminUser);
}
