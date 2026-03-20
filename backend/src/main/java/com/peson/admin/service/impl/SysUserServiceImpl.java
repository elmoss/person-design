package com.peson.admin.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.peson.admin.entity.SysUser;
import com.peson.admin.mapper.SysUserMapper;
import com.peson.admin.service.SysUserService;
import org.springframework.stereotype.Service;

/**
 * 用户服务实现类
 * 
 * @author peson
 * @since 2026-03-20
 */
@Service
public class SysUserServiceImpl extends ServiceImpl<SysUserMapper, SysUser> implements SysUserService {

    @Override
    public SysUser getByUsername(String username) {
        LambdaQueryWrapper<SysUser> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(SysUser::getUsername, username);
        return this.getOne(wrapper);
    }

    @Override
    public boolean checkUsernameExist(String username) {
        long count = this.count(new LambdaQueryWrapper<SysUser>().eq(SysUser::getUsername, username));
        return count > 0;
    }
}
