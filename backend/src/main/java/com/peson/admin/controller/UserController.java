package com.peson.admin.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.peson.admin.common.Result;
import com.peson.admin.entity.SysUser;
import com.peson.admin.service.SysUserService;
import com.peson.admin.utils.PasswordUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

/**
 * 用户管理控制器
 * 
 * @author peson
 * @since 2026-03-20
 */
@Slf4j
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final SysUserService userService;

    /**
     * 分页查询用户列表
     */
    @GetMapping("/page")
    public Result<Page<SysUser>> getUserPage(
            @RequestParam(defaultValue = "1") Integer pageNum,
            @RequestParam(defaultValue = "10") Integer pageSize,
            @RequestParam(required = false) String keyword) {
        try {
            Page<SysUser> page = new Page<>(pageNum, pageSize);
            LambdaQueryWrapper<SysUser> wrapper = new LambdaQueryWrapper<>();
            
            if (keyword != null && !keyword.isEmpty()) {
                wrapper.and(w -> w
                    .like(SysUser::getUsername, keyword)
                    .or()
                    .like(SysUser::getNickname, keyword)
                    .or()
                    .like(SysUser::getEmail, keyword)
                    .or()
                    .like(SysUser::getPhone, keyword));
            }
            
            wrapper.orderByDesc(SysUser::getCreateTime);
            Page<SysUser> userPage = userService.page(page, wrapper);
            
            userPage.getRecords().forEach(u -> u.setPassword(null));
            return Result.success(userPage);
        } catch (Exception e) {
            log.error("查询用户列表失败", e);
            return Result.error("查询用户列表失败：" + e.getMessage());
        }
    }

    /**
     * 根据 ID 查询用户
     */
    @GetMapping("/{id}")
    public Result<SysUser> getUserById(@PathVariable Long id) {
        try {
            SysUser user = userService.getById(id);
            if (user == null) {
                return Result.error("用户不存在");
            }
            user.setPassword(null);
            return Result.success(user);
        } catch (Exception e) {
            log.error("查询用户失败", e);
            return Result.error("查询用户失败：" + e.getMessage());
        }
    }

    /**
     * 创建用户
     */
    @PostMapping
    public Result<SysUser> createUser(@RequestBody SysUser user) {
        try {
            // 检查用户名是否存在
            if (userService.checkUsernameExist(user.getUsername())) {
                return Result.error("用户名已存在");
            }
            
            // 校验密码
            if (!StringUtils.hasText(user.getPassword())) {
                return Result.error("密码不能为空");
            }

            // 设置默认状态
            if (user.getStatus() == null) {
                user.setStatus(1);
            }

            if (!StringUtils.hasText(user.getNickname())) {
                user.setNickname(user.getUsername());
            }

            // 密码加密
            user.setPassword(PasswordUtils.encode(user.getPassword()));

            userService.save(user);
            user.setPassword(null);
            return Result.success("用户创建成功", user);
        } catch (Exception e) {
            log.error("创建用户失败", e);
            return Result.error("创建用户失败：" + e.getMessage());
        }
    }

    /**
     * 更新用户
     */
    @PutMapping
    public Result<String> updateUser(@RequestBody SysUser user) {
        try {
            if (user.getId() == null) {
                return Result.error("用户 ID 不能为空");
            }
            
            SysUser existUser = userService.getById(user.getId());
            if (existUser == null) {
                return Result.error("用户不存在");
            }
            
            // 如果修改了用户名，检查新用户名是否已存在
            if (!existUser.getUsername().equals(user.getUsername())) {
                if (userService.checkUsernameExist(user.getUsername())) {
                    return Result.error("用户名已存在");
                }
            }
            
            if (StringUtils.hasText(user.getPassword())) {
                user.setPassword(PasswordUtils.encode(user.getPassword()));
            } else {
                user.setPassword(null);
            }

            userService.updateById(user);
            return Result.success("用户更新成功", "");
        } catch (Exception e) {
            log.error("更新用户失败", e);
            return Result.error("更新用户失败：" + e.getMessage());
        }
    }

    /**
     * 删除用户
     */
    @DeleteMapping("/{id}")
    public Result<String> deleteUser(@PathVariable Long id) {
        try {
            SysUser user = userService.getById(id);
            if (user == null) {
                return Result.error("用户不存在");
            }
            
            // 逻辑删除
            userService.removeById(id);
            return Result.success("用户删除成功", "");
        } catch (Exception e) {
            log.error("删除用户失败", e);
            return Result.error("删除用户失败：" + e.getMessage());
        }
    }
}
