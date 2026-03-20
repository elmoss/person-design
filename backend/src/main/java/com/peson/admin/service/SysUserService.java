package com.peson.admin.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.peson.admin.entity.SysUser;

/**
 * 用户服务接口
 * 
 * @author peson
 * @since 2026-03-20
 */
public interface SysUserService extends IService<SysUser> {

    /**
     * 根据用户名查询用户
     * 
     * @param username 用户名
     * @return 用户信息
     */
    SysUser getByUsername(String username);

    /**
     * 检查用户名是否存在
     * 
     * @param username 用户名
     * @return true-存在 false-不存在
     */
    boolean checkUsernameExist(String username);
}
