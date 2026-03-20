# IDEA 启动问题排查指南

## ✅ 已完成配置

1. **已添加 AOP 依赖** - `spring-boot-starter-aop`
2. **已启用注解处理器** - 在 `.idea/workspace.xml` 中配置
3. **Lombok 已正确配置** - pom.xml 中包含 Lombok 依赖

## 🔧 IDEA 中手动检查步骤

### 1. 启用注解处理器（重要）

打开 IDEA，依次进入：
```
Preferences/Settings → Build, Execution, Deployment → Compiler → Annotation Processors
```
- ✅ 勾选 **"Enable annotation processing"**
- ✅ 勾选 **"Obtain processors from project classpath"**

### 2. 检查 Lombok 插件

确保已安装 Lombok 插件：
```
Preferences/Settings → Plugins
```
- 搜索 "Lombok"
- 如果未安装，点击 Install
- 安装后重启 IDEA

### 3. 检查 Maven 配置

```
Preferences/Settings → Build, Execution, Deployment → Build Tools → Maven
```
- Maven home directory: 确认路径正确
- User settings file: 确认 settings.xml 路径
- Local repository: 确认本地仓库路径

### 4. 检查 JDK 配置

```
File → Project Structure → SDKs
```
- 确保使用 JDK 17 或更高版本
- 项目 SDK 设置为 17

### 5. 清理并重新导入项目

```
File → Invalidate Caches / Restart...
```
选择：**Invalidate and Restart**

或者在 Maven 工具窗口执行：
```
Lifecycle → clean
Lifecycle → install
```

## 🚀 启动方法

### 方法一：直接运行主类

1. 找到 `src/main/java/com.peson.admin.PesonDesignAdminApplication`
2. 右键点击 → Run 'PesonDesignAdminApplication'

### 方法二：使用 Maven 运行

在 IDEA 的 Terminal 中执行：
```bash
mvn spring-boot:run
```

### 方法三：使用 Spring Boot Dashboard

如果安装了 Spring Boot Helper 插件：
1. 打开 Spring Boot 工具窗口
2. 找到项目
3. 点击绿色启动按钮

## ⚠️ 常见错误及解决方案

### 错误 1: BeanCreationException - AspectJ 相关

**原因**: 缺少 AOP 依赖
**解决**: 已在 pom.xml 中添加 `spring-boot-starter-aop`

### 错误 2: 泛型类型推断错误

**原因**: Result.success() 返回类型问题
**解决**: 已将 Controller 返回类型改为 `Result<String>`

### 错误 3: Lombok 找不到符号

**原因**: 注解处理器未启用或 Lombok 插件未安装
**解决**: 
1. 安装 Lombok 插件
2. 启用注解处理器
3. 重启 IDEA

### 错误 4: 端口被占用

**错误信息**: Port 8080 was already in use
**解决**:
```bash
# Mac/Linux
lsof -ti:8080 | xargs kill -9

# Windows
netstat -ano | findstr :8080
taskkill /PID <进程 ID> /F
```

### 错误 5: MySQL 连接失败

**解决**:
1. 确保 MySQL 服务已启动
2. 修改 `application.yml` 中的数据库配置
3. 执行 `src/main/resources/db/init.sql` 初始化数据库

### 错误 6: Redis 连接失败

**解决**:
1. 确保 Redis 服务已启动
2. 修改 `application.yml` 中的 Redis 配置
3. 如果不需要 Redis，可以暂时注释掉相关依赖

## 📝 验证启动成功

启动成功后应该看到：
```
========================================
Pesong Design Admin Application Started Successfully!
========================================
Tomcat started on port 8080 (http) with context path '/api'
Started PesonDesignAdminApplication in X.XXX seconds
```

访问测试：
- http://localhost:8080/api/user/page

## 💡 提示

1. **首次启动较慢**: Maven 需要下载依赖，请耐心等待
2. **热部署**: 已配置 DevTools，代码修改后会自动重启
3. **日志级别**: 开发环境使用 DEBUG 级别，生产环境请改为 INFO
4. **密码加密**: 当前示例未实现密码加密，生产环境必须添加 BCrypt

## 🔗 相关链接

- [Spring Boot 官方文档](https://spring.io/projects/spring-boot)
- [MyBatis-Plus 官方文档](https://baomidou.com/)
- [Lombok 官方文档](https://projectlombok.org/)
