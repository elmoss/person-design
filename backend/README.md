# Peson Design Admin

基于 Spring Boot 3 + MyBatis-Plus + Redis + MySQL 的管理后台项目

## 技术栈

- **JDK**: 17
- **Spring Boot**: 3.2.4
- **MyBatis-Plus**: 3.5.5
- **Redis**: 最新稳定版
- **MySQL**: 8.0+
- **文件上传**: commons-fileupload

## 项目结构

```
peson-design-admin/
├── src/main/java/com/peson/admin/
│   ├── config/              # 配置类
│   ├── controller/          # 控制器
│   ├── service/             # 服务层接口
│   │   └── impl/           # 服务层实现
│   ├── mapper/             # DAO 层
│   ├── entity/             # 实体类
│   ├── dto/                # 数据传输对象
│   ├── vo/                 # 视图对象
│   ├── utils/              # 工具类
│   └── common/             # 通用类
├── src/main/resources/
│   ├── mapper/             # MyBatis XML 映射文件
│   ├── db/                 # SQL 脚本
│   ├── static/             # 静态资源
│   ├── templates/          # 模板文件
│   └── application.yml     # 配置文件
├── upload/                 # 文件上传目录
└── pom.xml                 # Maven 配置
```

## 快速开始

### 1. 环境要求

- JDK 17+
- MySQL 8.0+
- Redis 6.0+
- Maven 3.6+

### 2. 数据库初始化

执行 `src/main/resources/db/init.sql` 创建数据库和表

### 3. 配置修改

修改 `src/main/resources/application.yml` 中的数据库和 Redis 配置：

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/peson_design?...
    username: your_username
    password: your_password
  
  data:
    redis:
      host: localhost
      port: 6379
```

### 4. 运行项目

```bash
mvn clean install
mvn spring-boot:run
```

或者使用 IDE 直接运行 `PesonDesignAdminApplication` 主类

### 5. 访问项目

启动成功后，访问地址：http://localhost:8080/api

## API 接口

### 用户管理

- GET `/api/user/page` - 分页查询用户列表
- GET `/api/user/{id}` - 查询用户详情
- POST `/api/user` - 创建用户
- PUT `/api/user` - 更新用户
- DELETE `/api/user/{id}` - 删除用户

### 文件管理

- POST `/api/file/upload` - 上传文件
- GET `/api/file/{id}` - 查询文件信息
- DELETE `/api/file/{id}` - 删除文件

## 功能特性

- ✅ 基于 MyBatis-Plus 的 CRUD 操作
- ✅ Redis 缓存支持
- ✅ 文件上传功能
- ✅ 统一响应结果封装
- ✅ 全局异常处理
- ✅ 逻辑删除支持
- ✅ 自动填充字段（创建时间、更新时间）
- ✅ 分页查询

## 注意事项

1. 上传文件目录需要有写权限
2. 密码加密功能待实现（建议使用 BCrypt）
3. 生产环境请修改默认配置并加强安全措施

## 开发计划

- [ ] 添加 Spring Security 安全认证
- [ ] 集成 Swagger 文档
- [ ] 完善单元测试
- [ ] 添加更多业务模块

## License

MIT
