package com.peson.admin.controller;

import com.peson.admin.common.Result;
import com.peson.admin.dto.LoginRequest;
import com.peson.admin.dto.RegisterRequest;
import com.peson.admin.entity.SysUser;
import com.peson.admin.service.SysUserService;
import com.peson.admin.utils.PasswordUtils;
import com.peson.admin.vo.LoginResponse;
import com.peson.admin.vo.UserVO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;
import java.util.concurrent.TimeUnit;

/**
 * 认证控制器
 */
@Slf4j
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final SysUserService userService;
    private final StringRedisTemplate stringRedisTemplate;

    @Value("${peson.auth.token-ttl-hours:168}")
    private long tokenTtlHours;

    @Value("${peson.auth.token-prefix:login:token:}")
    private String tokenPrefix;

    @PostMapping("/register")
    public Result<UserVO> register(@Valid @RequestBody RegisterRequest request) {
        try {
            if (userService.checkUsernameExist(request.getUsername())) {
                return Result.error("用户名已存在");
            }

            SysUser user = new SysUser();
            user.setUsername(request.getUsername());
            user.setPassword(PasswordUtils.encode(request.getPassword()));
            user.setNickname(StringUtils.hasText(request.getNickname()) ? request.getNickname() : request.getUsername());
            user.setEmail(request.getEmail());
            user.setPhone(request.getPhone());
            user.setStatus(1);

            userService.save(user);
            return Result.success("注册成功", UserVO.from(user));
        } catch (Exception e) {
            log.error("注册失败", e);
            return Result.error("注册失败：" + e.getMessage());
        }
    }

    @PostMapping("/login")
    public Result<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        try {
            SysUser user = userService.getByUsername(request.getUsername());
            if (user == null) {
                return Result.error("用户名或密码错误");
            }
            if (user.getStatus() != null && user.getStatus() == 0) {
                return Result.error("账号已被禁用");
            }
            if (!PasswordUtils.matches(request.getPassword(), user.getPassword())) {
                return Result.error("用户名或密码错误");
            }

            // 旧密码为 MD5 时自动升级为 BCrypt
            String upgraded = PasswordUtils.upgradeIfNeeded(request.getPassword(), user.getPassword());
            if (!upgraded.equals(user.getPassword())) {
                user.setPassword(upgraded);
                userService.updateById(user);
            }

            String token = UUID.randomUUID().toString().replace("-", "");
            String key = tokenPrefix + token;
            stringRedisTemplate.opsForValue().set(key, String.valueOf(user.getId()), tokenTtlHours, TimeUnit.HOURS);

            return Result.success("登录成功", new LoginResponse(token, UserVO.from(user)));
        } catch (Exception e) {
            log.error("登录失败", e);
            return Result.error("登录失败：" + e.getMessage());
        }
    }

    @PostMapping("/logout")
    public Result<String> logout(HttpServletRequest request) {
        String token = resolveToken(request);
        if (!StringUtils.hasText(token)) {
            return Result.error("未检测到登录 token");
        }
        stringRedisTemplate.delete(tokenPrefix + token);
        return Result.success("退出成功", "");
    }

    @GetMapping("/me")
    public Result<UserVO> me(HttpServletRequest request) {
        String token = resolveToken(request);
        if (!StringUtils.hasText(token)) {
            return Result.error("未检测到登录 token");
        }
        String userId = stringRedisTemplate.opsForValue().get(tokenPrefix + token);
        if (!StringUtils.hasText(userId)) {
            return Result.error(401, "登录已过期");
        }
        SysUser user = userService.getById(Long.valueOf(userId));
        if (user == null) {
            return Result.error("用户不存在");
        }
        return Result.success(UserVO.from(user));
    }

    private String resolveToken(HttpServletRequest request) {
        String auth = request.getHeader("Authorization");
        if (StringUtils.hasText(auth) && auth.startsWith("Bearer ")) {
            return auth.substring(7).trim();
        }
        String token = request.getHeader("X-Token");
        if (StringUtils.hasText(token)) {
            return token.trim();
        }
        return null;
    }
}
