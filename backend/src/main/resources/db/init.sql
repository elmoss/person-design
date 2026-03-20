-- PostgreSQL init for Supabase

-- 用户表
DROP TABLE IF EXISTS sys_user;
CREATE TABLE IF NOT EXISTS sys_user (
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(100) NOT NULL,
  nickname VARCHAR(50),
  email VARCHAR(100),
  phone VARCHAR(20),
  avatar VARCHAR(255),
  status SMALLINT DEFAULT 1,
  deleted SMALLINT DEFAULT 0,
  create_time TIMESTAMP DEFAULT NOW(),
  update_time TIMESTAMP DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS uk_sys_user_username ON sys_user(username);

-- 文件表
DROP TABLE IF EXISTS sys_file;
CREATE TABLE IF NOT EXISTS sys_file (
  id BIGSERIAL PRIMARY KEY,
  file_name VARCHAR(100) NOT NULL,
  original_name VARCHAR(255) NOT NULL,
  file_path VARCHAR(500) NOT NULL,
  file_url VARCHAR(500) NOT NULL,
  file_type VARCHAR(20),
  file_size BIGINT,
  file_ext VARCHAR(10),
  upload_by BIGINT,
  deleted SMALLINT DEFAULT 0,
  create_time TIMESTAMP DEFAULT NOW(),
  update_time TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sys_file_upload_by ON sys_file(upload_by);
CREATE INDEX IF NOT EXISTS idx_sys_file_create_time ON sys_file(create_time);

-- 插入测试数据（密码为 MD5: 123456）
INSERT INTO sys_user (username, password, nickname, email, phone, status)
VALUES ('admin', 'e10adc3949ba59abbe56e057f20f883e', '管理员', 'admin@peson.com', '13800138000', 1)
ON CONFLICT (username) DO NOTHING;
