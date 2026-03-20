package com.peson.admin;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

/**
 * Spring Boot 应用主类
 * 
 * @author peson
 * @since 2026-03-20
 */
@SpringBootApplication
@MapperScan("com.peson.admin.mapper")
@EnableAspectJAutoProxy
public class PesonDesignAdminApplication {

    public static void main(String[] args) {
        SpringApplication.run(PesonDesignAdminApplication.class, args);
        System.out.println("========================================");
        System.out.println("Pesong Design Admin Application Started Successfully!");
        System.out.println("========================================");
    }
}
