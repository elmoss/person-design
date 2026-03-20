package com.peson.admin.utils;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.util.DigestUtils;

import java.nio.charset.StandardCharsets;

/**
 * 密码工具类：支持 BCrypt 与历史 MD5
 */
public final class PasswordUtils {

    private static final BCryptPasswordEncoder ENCODER = new BCryptPasswordEncoder();

    private PasswordUtils() {}

    public static String encode(String raw) {
        return ENCODER.encode(raw);
    }

    public static boolean matches(String raw, String encoded) {
        if (raw == null || encoded == null) {
            return false;
        }
        if (isBcrypt(encoded)) {
            return ENCODER.matches(raw, encoded);
        }
        String md5 = DigestUtils.md5DigestAsHex(raw.getBytes(StandardCharsets.UTF_8));
        return md5.equalsIgnoreCase(encoded);
    }

    public static boolean isBcrypt(String encoded) {
        return encoded.startsWith("$2a$") || encoded.startsWith("$2b$") || encoded.startsWith("$2y$");
    }

    /**
     * 旧密码为 MD5 时升级为 BCrypt
     */
    public static String upgradeIfNeeded(String raw, String encoded) {
        if (encoded == null) {
            return null;
        }
        if (isBcrypt(encoded)) {
            return encoded;
        }
        if (matches(raw, encoded)) {
            return encode(raw);
        }
        return encoded;
    }
}
