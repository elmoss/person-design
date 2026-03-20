package com.peson.admin.common;

import lombok.Data;

import java.io.Serializable;

/**
 * 统一响应结果类
 * 
 * @author peson
 * @since 2026-03-20
 */
@Data
public class Result<T> implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 状态码
     */
    private Integer code;

    /**
     * 消息
     */
    private String message;

    /**
     * 数据
     */
    private T data;

    /**
     * 成功
     */
    public static <T> Result<T> success() {
        return result(200, "操作成功", null);
    }

    /**
     * 成功带数据
     */
    public static <T> Result<T> success(T data) {
        return result(200, "操作成功", data);
    }

    /**
     * 成功带数据和消息
     */
    public static <T> Result<T> success(String message, T data) {
        return result(200, message, data);
    }

    /**
     * 失败
     */
    public static <T> Result<T> error(String message) {
        return result(500, message, null);
    }

    /**
     * 失败带状态码
     */
    public static <T> Result<T> error(Integer code, String message) {
        return result(code, message, null);
    }

    /**
     * 判断是否成功
     */
    public boolean isSuccess() {
        return this.code != null && this.code == 200;
    }

    /**
     * 通用方法
     */
    private static <T> Result<T> result(Integer code, String message, T data) {
        Result<T> result = new Result<>();
        result.setCode(code);
        result.setMessage(message);
        result.setData(data);
        return result;
    }
}
