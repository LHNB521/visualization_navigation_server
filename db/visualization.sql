-- 创建表的工作交由prisma完成，这里只初始化表的数据

-- 初始化用户表数据
INSERT INTO sys_user (id, username, password, nickname, sex, status, create_time, update_time, is_delete) VALUES 
	(1, "admin", "$2b$10$Somjr8/8n2xG5L0UEhKnAeSDT3ekKz1cJkHSmk.RMk8WpG5knRf4O", "系统管理员", 3, 1, sysdate(), sysdate(), false);
