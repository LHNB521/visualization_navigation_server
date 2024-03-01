/*
 Navicat Premium Data Transfer

 Source Server         : 192.168.1.2
 Source Server Type    : PostgreSQL
 Source Server Version : 120012
 Source Host           : 192.168.1.2:5432
 Source Catalog        : vis
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 120012
 File Encoding         : 65001

 Date: 01/03/2024 17:21:48
*/


-- ----------------------------
-- Sequence structure for exception_log_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."exception_log_seq";
CREATE SEQUENCE "public"."exception_log_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 99999999
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for menu_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."menu_seq";
CREATE SEQUENCE "public"."menu_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 99999999
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for permission_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."permission_seq";
CREATE SEQUENCE "public"."permission_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 999999999999
START 1
CACHE 1
CYCLE ;

-- ----------------------------
-- Sequence structure for profile_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."profile_seq";
CREATE SEQUENCE "public"."profile_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 99999999999
START 1
CACHE 1;
COMMENT ON SEQUENCE "public"."profile_seq" IS 'profile表id自增';

-- ----------------------------
-- Sequence structure for resource_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."resource_seq";
CREATE SEQUENCE "public"."resource_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 99999999
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for role_menu_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."role_menu_seq";
CREATE SEQUENCE "public"."role_menu_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 999999
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for role_resource_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."role_resource_seq";
CREATE SEQUENCE "public"."role_resource_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 999999999
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for role_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."role_seq";
CREATE SEQUENCE "public"."role_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for user_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."user_seq";
CREATE SEQUENCE "public"."user_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;
COMMENT ON SEQUENCE "public"."user_seq" IS 'user表id自增';

-- ----------------------------
-- Table structure for exception_log
-- ----------------------------
DROP TABLE IF EXISTS "public"."exception_log";
CREATE TABLE "public"."exception_log" (
  "id" int4 NOT NULL DEFAULT nextval('exception_log_seq'::regclass),
  "opt_url" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "opt_method" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "request_param" varchar(255) COLLATE "pg_catalog"."default",
  "opt_desc" varchar(255) COLLATE "pg_catalog"."default",
  "exception_info" text COLLATE "pg_catalog"."default",
  "ip_address" varchar(255) COLLATE "pg_catalog"."default",
  "ip_source" varchar(255) COLLATE "pg_catalog"."default",
  "create_time" timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP
)
;
COMMENT ON COLUMN "public"."exception_log"."opt_url" IS '请求接口';
COMMENT ON COLUMN "public"."exception_log"."opt_method" IS '请求方式';
COMMENT ON COLUMN "public"."exception_log"."request_param" IS '请求参数';
COMMENT ON COLUMN "public"."exception_log"."opt_desc" IS '操作描述';
COMMENT ON COLUMN "public"."exception_log"."exception_info" IS '异常描述';
COMMENT ON COLUMN "public"."exception_log"."ip_address" IS 'ip';
COMMENT ON COLUMN "public"."exception_log"."ip_source" IS 'ip来源';
COMMENT ON COLUMN "public"."exception_log"."create_time" IS '创建时间';

-- ----------------------------
-- Records of exception_log
-- ----------------------------
INSERT INTO "public"."exception_log" VALUES (1, '1', '1', '1', '1', '1', '1', '1', '2024-02-28 07:33:31.752126');
INSERT INTO "public"."exception_log" VALUES (2, '/exception-log/s', 'GET', '', NULL, '{"message":"Cannot GET /exception-log/s","error":"Not Found","statusCode":404}', '127.0.0.1', NULL, '2024-02-28 07:53:04.304698');
INSERT INTO "public"."exception_log" VALUES (3, '/exception-log/sf', 'GET', '', NULL, '{"message":"Cannot GET /exception-log/sf","error":"Not Found","statusCode":404}', '127.0.0.1', NULL, '2024-02-28 07:57:06.832757');
INSERT INTO "public"."exception_log" VALUES (4, '/exception-log', 'GET', '', NULL, '当前请求过多，请稍后重试', '127.0.0.1', NULL, '2024-02-28 08:16:00.630887');
INSERT INTO "public"."exception_log" VALUES (5, '/exception-log', 'GET', '', NULL, '当前请求过多，请稍后重试', '127.0.0.1', NULL, '2024-02-28 08:16:02.951451');
INSERT INTO "public"."exception_log" VALUES (6, '/user/list?pageSize=0&pageNum=0', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-02-28 08:24:37.550797');
INSERT INTO "public"."exception_log" VALUES (7, '/user/list?pageSize=&pageNum=', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-02-28 08:25:07.588116');
INSERT INTO "public"."exception_log" VALUES (8, '/user/list', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-02-28 08:25:34.044893');
INSERT INTO "public"."exception_log" VALUES (9, '/user/detail', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-02-29 03:24:01.386554');
INSERT INTO "public"."exception_log" VALUES (10, '/permission/menu/tree', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-02-29 03:24:01.399068');
INSERT INTO "public"."exception_log" VALUES (11, '/user/detail', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-02-29 06:06:36.3351');
INSERT INTO "public"."exception_log" VALUES (12, '/permission/menu/tree', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-02-29 06:06:36.351767');
INSERT INTO "public"."exception_log" VALUES (13, '/user/detail', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-02-29 06:18:12.792514');
INSERT INTO "public"."exception_log" VALUES (14, '/permission/menu/tree', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-02-29 06:18:12.804222');
INSERT INTO "public"."exception_log" VALUES (15, '/user/detail', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-02-29 06:34:17.048458');
INSERT INTO "public"."exception_log" VALUES (16, '/permission/menu/tree', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-02-29 06:34:17.061668');
INSERT INTO "public"."exception_log" VALUES (17, '/auth/login', 'POST', '', NULL, '验证码错误', '127.0.0.1', NULL, '2024-02-29 06:35:04.39823');
INSERT INTO "public"."exception_log" VALUES (18, '/user/detail', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-02-29 06:35:15.693153');
INSERT INTO "public"."exception_log" VALUES (19, '/permission/menu/tree', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-02-29 06:35:15.705903');
INSERT INTO "public"."exception_log" VALUES (20, '/user/detail', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-02-29 06:36:04.912586');
INSERT INTO "public"."exception_log" VALUES (21, '/permission/menu/tree', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-02-29 06:36:04.926157');
INSERT INTO "public"."exception_log" VALUES (22, '/user/detail', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-02-29 06:37:31.74272');
INSERT INTO "public"."exception_log" VALUES (23, '/permission/menu/tree', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-02-29 06:37:31.755396');
INSERT INTO "public"."exception_log" VALUES (24, '/auth/login', 'POST', '', NULL, '验证码错误', '127.0.0.1', NULL, '2024-02-29 06:37:51.488606');
INSERT INTO "public"."exception_log" VALUES (25, '/user/detail', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-02-29 06:37:59.157457');
INSERT INTO "public"."exception_log" VALUES (26, '/permission/menu/tree', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-02-29 06:37:59.170331');
INSERT INTO "public"."exception_log" VALUES (27, '/user/detail', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-02-29 06:39:21.876354');
INSERT INTO "public"."exception_log" VALUES (28, '/permission/menu/tree', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-02-29 06:39:21.903339');
INSERT INTO "public"."exception_log" VALUES (29, '/user/detail', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-02-29 06:41:20.440051');
INSERT INTO "public"."exception_log" VALUES (30, '/permission/menu/tree', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-02-29 06:41:20.452752');
INSERT INTO "public"."exception_log" VALUES (31, '/user/detail', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-02-29 06:42:53.267344');
INSERT INTO "public"."exception_log" VALUES (32, '/permission/menu/tree', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-02-29 06:42:53.281843');
INSERT INTO "public"."exception_log" VALUES (33, '/auth/login', 'POST', '', NULL, '验证码错误', '127.0.0.1', NULL, '2024-02-29 06:45:05.297006');
INSERT INTO "public"."exception_log" VALUES (34, '/user/detail', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-02-29 07:11:18.959446');
INSERT INTO "public"."exception_log" VALUES (35, '/permission/menu/tree', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-02-29 07:11:18.97556');
INSERT INTO "public"."exception_log" VALUES (36, '/user/detail', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-02-29 07:15:43.055857');
INSERT INTO "public"."exception_log" VALUES (37, '/permission/menu/tree', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-02-29 07:15:43.072478');
INSERT INTO "public"."exception_log" VALUES (38, '/user/detail', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-02-29 07:21:44.423337');
INSERT INTO "public"."exception_log" VALUES (39, '/permission/menu/tree', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-02-29 07:21:44.439043');
INSERT INTO "public"."exception_log" VALUES (40, '/user/detail', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-02-29 07:41:08.063828');
INSERT INTO "public"."exception_log" VALUES (41, '/permission/menu/tree', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-02-29 07:41:08.072273');
INSERT INTO "public"."exception_log" VALUES (42, '/user/detail', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-02-29 08:03:53.459625');
INSERT INTO "public"."exception_log" VALUES (43, '/permission/menu/tree', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-02-29 08:03:53.476143');
INSERT INTO "public"."exception_log" VALUES (44, '/user/detail', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-03-01 02:50:47.142494');
INSERT INTO "public"."exception_log" VALUES (45, '/permission/menu/tree', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-03-01 02:50:47.159809');
INSERT INTO "public"."exception_log" VALUES (46, '/user/detail', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-03-01 02:54:55.016305');
INSERT INTO "public"."exception_log" VALUES (47, '/permission/menu/tree', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-03-01 02:54:55.04615');
INSERT INTO "public"."exception_log" VALUES (48, '/user/detail', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-03-01 02:55:02.953779');
INSERT INTO "public"."exception_log" VALUES (49, '/permission/menu/tree', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-03-01 02:55:02.968693');
INSERT INTO "public"."exception_log" VALUES (50, '/user/detail', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-03-01 02:55:13.21892');
INSERT INTO "public"."exception_log" VALUES (51, '/permission/menu/tree', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-03-01 02:55:13.233092');
INSERT INTO "public"."exception_log" VALUES (52, '/user/detail', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-03-01 03:13:18.319354');
INSERT INTO "public"."exception_log" VALUES (53, '/permission/menu/tree', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-03-01 03:13:18.33146');
INSERT INTO "public"."exception_log" VALUES (54, '/user/detail', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-03-01 03:13:52.773006');
INSERT INTO "public"."exception_log" VALUES (55, '/permission/menu/tree', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-03-01 03:13:52.813304');
INSERT INTO "public"."exception_log" VALUES (56, '/permission/menu/tree', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-03-01 05:14:04.390151');
INSERT INTO "public"."exception_log" VALUES (57, '/user/detail', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-03-01 05:14:04.40206');
INSERT INTO "public"."exception_log" VALUES (58, '/user/detail', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-03-01 05:15:16.593768');
INSERT INTO "public"."exception_log" VALUES (59, '/permission/menu/tree', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-03-01 05:15:16.608975');
INSERT INTO "public"."exception_log" VALUES (60, '/user/detail', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-03-01 05:17:15.416026');
INSERT INTO "public"."exception_log" VALUES (61, '/permission/menu/tree', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-03-01 05:17:15.427627');
INSERT INTO "public"."exception_log" VALUES (62, '/user/detail', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-03-01 05:35:27.646429');
INSERT INTO "public"."exception_log" VALUES (63, '/permission/menu/tree', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-03-01 05:35:27.664052');
INSERT INTO "public"."exception_log" VALUES (64, '/permission/menu/tree', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-03-01 05:42:44.244183');
INSERT INTO "public"."exception_log" VALUES (65, '/user/detail', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-03-01 05:42:44.262117');
INSERT INTO "public"."exception_log" VALUES (66, '/user/detail', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-03-01 05:48:02.250397');
INSERT INTO "public"."exception_log" VALUES (67, '/permission/menu/tree', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-03-01 05:48:02.26043');
INSERT INTO "public"."exception_log" VALUES (68, '/user/detail', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-03-01 05:48:21.503481');
INSERT INTO "public"."exception_log" VALUES (69, '/permission/menu/tree', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-03-01 05:48:21.526303');
INSERT INTO "public"."exception_log" VALUES (70, '/user/detail', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-03-01 05:48:33.091756');
INSERT INTO "public"."exception_log" VALUES (71, '/permission/menu/tree', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-03-01 05:48:33.104986');
INSERT INTO "public"."exception_log" VALUES (72, '/auth/login', 'POST', '', NULL, '验证码有误', '127.0.0.1', NULL, '2024-03-01 05:57:46.317039');
INSERT INTO "public"."exception_log" VALUES (73, '/auth/login', 'POST', '', NULL, '验证码有误', '127.0.0.1', NULL, '2024-03-01 05:58:18.054349');
INSERT INTO "public"."exception_log" VALUES (74, '/auth/login', 'POST', '', NULL, '验证码有误', '127.0.0.1', NULL, '2024-03-01 05:58:26.828335');
INSERT INTO "public"."exception_log" VALUES (75, '/auth/login', 'POST', '', NULL, '验证码有误', '127.0.0.1', NULL, '2024-03-01 05:58:36.604064');
INSERT INTO "public"."exception_log" VALUES (76, '/auth/login', 'POST', '', NULL, '验证码有误', '127.0.0.1', NULL, '2024-03-01 05:59:50.17579');
INSERT INTO "public"."exception_log" VALUES (77, '/auth/login', 'POST', '', NULL, '验证码有误', '127.0.0.1', NULL, '2024-03-01 06:00:17.477627');
INSERT INTO "public"."exception_log" VALUES (78, '/user/detail', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-03-01 06:00:25.519784');
INSERT INTO "public"."exception_log" VALUES (79, '/permission/menu/tree', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-03-01 06:00:25.533313');
INSERT INTO "public"."exception_log" VALUES (80, '/user/detail', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-03-01 06:02:19.497309');
INSERT INTO "public"."exception_log" VALUES (81, '/permission/menu/tree', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-03-01 06:02:19.510287');
INSERT INTO "public"."exception_log" VALUES (82, '/permission/menu/tree', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-03-01 06:05:35.196096');
INSERT INTO "public"."exception_log" VALUES (83, '/user/detail', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-03-01 06:05:35.216355');
INSERT INTO "public"."exception_log" VALUES (84, '/user/detail', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-03-01 06:05:40.400254');
INSERT INTO "public"."exception_log" VALUES (85, '/permission/menu/tree', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-03-01 06:05:40.404664');
INSERT INTO "public"."exception_log" VALUES (86, '/permission/menu/tree', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-03-01 06:06:01.221849');
INSERT INTO "public"."exception_log" VALUES (87, '/user/detail', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-03-01 06:06:01.23451');
INSERT INTO "public"."exception_log" VALUES (88, '/user/detail', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-03-01 06:09:22.026933');
INSERT INTO "public"."exception_log" VALUES (89, '/permission/menu/tree', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-03-01 06:09:22.036427');
INSERT INTO "public"."exception_log" VALUES (90, '/user/detail', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-03-01 06:11:13.69052');
INSERT INTO "public"."exception_log" VALUES (91, '/permission/menu/tree', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-03-01 06:11:13.693433');
INSERT INTO "public"."exception_log" VALUES (92, '/user/detail', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-03-01 06:15:07.810029');
INSERT INTO "public"."exception_log" VALUES (93, '/permission/menu/tree', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-03-01 06:15:07.865708');
INSERT INTO "public"."exception_log" VALUES (94, '/auth/login', 'POST', '', NULL, '验证码有误', '127.0.0.1', NULL, '2024-03-01 06:29:46.028553');
INSERT INTO "public"."exception_log" VALUES (95, '/user/detail', 'GET', '', NULL, '当前用户无此角色', '127.0.0.1', NULL, '2024-03-01 06:33:47.762147');
INSERT INTO "public"."exception_log" VALUES (96, '/user/detail', 'GET', '', NULL, '当前用户无此角色', '127.0.0.1', NULL, '2024-03-01 06:34:47.79594');
INSERT INTO "public"."exception_log" VALUES (97, '/user/detail', 'GET', '', NULL, '当前用户无此角色', '127.0.0.1', NULL, '2024-03-01 06:34:58.00079');
INSERT INTO "public"."exception_log" VALUES (98, '/user/list', 'GET', '', NULL, '当前用户无此角色', '127.0.0.1', NULL, '2024-03-01 06:35:08.309712');
INSERT INTO "public"."exception_log" VALUES (99, '/role/list', 'GET', '', NULL, '当前用户无此角色', '127.0.0.1', NULL, '2024-03-01 06:35:11.94945');
INSERT INTO "public"."exception_log" VALUES (100, '/user/list', 'GET', '', NULL, '当前用户无此角色', '127.0.0.1', NULL, '2024-03-01 06:35:13.318623');
INSERT INTO "public"."exception_log" VALUES (101, '/user/detail', 'GET', '', NULL, '当前用户无此角色', '127.0.0.1', NULL, '2024-03-01 06:38:29.935238');
INSERT INTO "public"."exception_log" VALUES (102, '/user/list', 'GET', '', NULL, '当前用户无此角色', '127.0.0.1', NULL, '2024-03-01 06:38:33.668012');
INSERT INTO "public"."exception_log" VALUES (103, '/user/detail', 'GET', '', NULL, '当前用户无此角色', '127.0.0.1', NULL, '2024-03-01 06:38:46.49087');
INSERT INTO "public"."exception_log" VALUES (104, '/user/detail', 'GET', '', NULL, '当前用户无此角色', '127.0.0.1', NULL, '2024-03-01 06:41:10.060441');
INSERT INTO "public"."exception_log" VALUES (105, '/user/detail', 'GET', '', NULL, '当前用户无此角色', '127.0.0.1', NULL, '2024-03-01 06:43:32.354893');
INSERT INTO "public"."exception_log" VALUES (106, '/user/detail', 'GET', '', NULL, '当前用户无此角色', '127.0.0.1', NULL, '2024-03-01 06:43:43.184364');
INSERT INTO "public"."exception_log" VALUES (107, '/user/detail', 'GET', '', NULL, '当前用户无此角色', '127.0.0.1', NULL, '2024-03-01 06:43:52.179513');
INSERT INTO "public"."exception_log" VALUES (108, '/user/detail', 'GET', '', NULL, '当前用户无此角色', '127.0.0.1', NULL, '2024-03-01 06:43:57.531213');
INSERT INTO "public"."exception_log" VALUES (109, '/user/detail', 'GET', '', NULL, '当前用户无此角色', '127.0.0.1', NULL, '2024-03-01 06:46:02.83051');
INSERT INTO "public"."exception_log" VALUES (110, '/auth/login', 'POST', '', NULL, '验证码有误', '127.0.0.1', NULL, '2024-03-01 06:48:07.818357');
INSERT INTO "public"."exception_log" VALUES (111, '/user/list', 'GET', '', NULL, '当前用户无此角色', '127.0.0.1', NULL, '2024-03-01 06:48:30.865679');
INSERT INTO "public"."exception_log" VALUES (112, '/role/list', 'GET', '', NULL, '当前用户无此角色', '127.0.0.1', NULL, '2024-03-01 06:48:33.028712');
INSERT INTO "public"."exception_log" VALUES (113, '/user/list', 'GET', '', NULL, '当前用户无此角色', '127.0.0.1', NULL, '2024-03-01 06:48:34.533696');
INSERT INTO "public"."exception_log" VALUES (114, '/user/detail', 'GET', '', NULL, '当前用户无此角色', '127.0.0.1', NULL, '2024-03-01 06:54:27.315719');
INSERT INTO "public"."exception_log" VALUES (115, '/user/detail', 'GET', '', NULL, '当前用户无此角色', '127.0.0.1', NULL, '2024-03-01 06:54:33.865863');
INSERT INTO "public"."exception_log" VALUES (116, '/user/detail', 'GET', '', NULL, '当前用户无此角色', '127.0.0.1', NULL, '2024-03-01 06:54:38.785584');
INSERT INTO "public"."exception_log" VALUES (117, '/user/detail', 'GET', '', NULL, '当前用户无此角色', '127.0.0.1', NULL, '2024-03-01 06:54:48.057422');
INSERT INTO "public"."exception_log" VALUES (118, '/user/detail', 'GET', '', NULL, '当前用户无此角色', '127.0.0.1', NULL, '2024-03-01 06:54:52.260847');
INSERT INTO "public"."exception_log" VALUES (119, '/user/detail', 'GET', '', NULL, '当前用户无此角色', '127.0.0.1', NULL, '2024-03-01 06:54:56.172046');
INSERT INTO "public"."exception_log" VALUES (120, '/user/detail', 'GET', '', NULL, '当前用户无此角色', '127.0.0.1', NULL, '2024-03-01 06:55:07.151513');
INSERT INTO "public"."exception_log" VALUES (121, '/user/detail', 'GET', '', NULL, '当前用户无此角色', '127.0.0.1', NULL, '2024-03-01 06:55:13.12103');
INSERT INTO "public"."exception_log" VALUES (122, '/user/detail', 'GET', '', NULL, '当前用户无此角色', '127.0.0.1', NULL, '2024-03-01 06:58:59.783505');
INSERT INTO "public"."exception_log" VALUES (123, '/user/detail', 'GET', '', NULL, '当前用户无此角色', '127.0.0.1', NULL, '2024-03-01 06:59:11.735186');
INSERT INTO "public"."exception_log" VALUES (124, '/user/detail', 'GET', '', NULL, '请登录', '127.0.0.1', NULL, '2024-03-01 07:10:14.464357');
INSERT INTO "public"."exception_log" VALUES (125, '/user/detail', 'GET', '', NULL, '请登录', '127.0.0.1', NULL, '2024-03-01 07:10:23.600896');
INSERT INTO "public"."exception_log" VALUES (126, '/user/detail', 'GET', '', NULL, '请登录', '127.0.0.1', NULL, '2024-03-01 07:10:49.801799');
INSERT INTO "public"."exception_log" VALUES (127, '/auth/login', 'POST', '', NULL, '验证码有误', '127.0.0.1', NULL, '2024-03-01 07:11:14.472211');
INSERT INTO "public"."exception_log" VALUES (128, '/user/detail', 'GET', '', NULL, '请登录', '127.0.0.1', NULL, '2024-03-01 07:12:05.66172');
INSERT INTO "public"."exception_log" VALUES (129, '/user/detail', 'GET', '', NULL, '请登录', '127.0.0.1', NULL, '2024-03-01 07:12:48.408483');
INSERT INTO "public"."exception_log" VALUES (130, '/user/detail', 'GET', '', NULL, '请登录', '127.0.0.1', NULL, '2024-03-01 07:12:54.754024');
INSERT INTO "public"."exception_log" VALUES (131, '/user/detail', 'GET', '', NULL, '请登录', '127.0.0.1', NULL, '2024-03-01 07:14:50.066155');
INSERT INTO "public"."exception_log" VALUES (132, '/user/detail', 'GET', '', NULL, '请登录', '127.0.0.1', NULL, '2024-03-01 07:15:10.790175');
INSERT INTO "public"."exception_log" VALUES (133, '/user/detail', 'GET', '', NULL, '请登录', '127.0.0.1', NULL, '2024-03-01 07:17:52.499704');
INSERT INTO "public"."exception_log" VALUES (134, '/user/detail', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-03-01 07:18:07.061575');
INSERT INTO "public"."exception_log" VALUES (135, '/user/detail', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-03-01 07:18:13.370268');
INSERT INTO "public"."exception_log" VALUES (136, '/user/detail', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-03-01 07:18:21.581101');
INSERT INTO "public"."exception_log" VALUES (137, '/user/detail', 'GET', '', NULL, '{"message":"Unauthorized","statusCode":401}', '127.0.0.1', NULL, '2024-03-01 07:18:35.09424');
INSERT INTO "public"."exception_log" VALUES (138, '/user/detail', 'GET', '', NULL, '请登录', '127.0.0.1', NULL, '2024-03-01 07:18:46.940456');
INSERT INTO "public"."exception_log" VALUES (139, '/user/detail', 'GET', '', NULL, '请登录', '127.0.0.1', NULL, '2024-03-01 07:26:18.478438');
INSERT INTO "public"."exception_log" VALUES (140, '/user/detail', 'GET', '', NULL, '请登录', '127.0.0.1', NULL, '2024-03-01 07:35:54.04552');
INSERT INTO "public"."exception_log" VALUES (141, '/user/detail', 'GET', '', NULL, '请登录', '127.0.0.1', NULL, '2024-03-01 07:46:53.197178');
INSERT INTO "public"."exception_log" VALUES (142, '/user/detail', 'GET', '', NULL, '请登录', '127.0.0.1', NULL, '2024-03-01 07:52:25.603961');
INSERT INTO "public"."exception_log" VALUES (143, '/user/detail', 'GET', '', NULL, '请登录', '127.0.0.1', NULL, '2024-03-01 07:55:49.28464');
INSERT INTO "public"."exception_log" VALUES (144, '/user/detail', 'GET', '', NULL, '请登录', '127.0.0.1', NULL, '2024-03-01 07:58:17.952739');
INSERT INTO "public"."exception_log" VALUES (145, '/user/detail', 'GET', '', NULL, '请登录', '127.0.0.1', NULL, '2024-03-01 07:58:49.980212');
INSERT INTO "public"."exception_log" VALUES (146, '/user/detail', 'GET', '', NULL, '请登录', '127.0.0.1', NULL, '2024-03-01 07:59:46.392855');
INSERT INTO "public"."exception_log" VALUES (147, '/user/detail', 'GET', '', NULL, '请登录', '127.0.0.1', NULL, '2024-03-01 08:04:31.605416');
INSERT INTO "public"."exception_log" VALUES (148, '/user/detail', 'GET', '', NULL, '请登录', '127.0.0.1', NULL, '2024-03-01 08:05:25.250998');
INSERT INTO "public"."exception_log" VALUES (149, '/user/detail', 'GET', '', NULL, '请登录', '127.0.0.1', NULL, '2024-03-01 08:05:56.645508');
INSERT INTO "public"."exception_log" VALUES (150, '/user/detail', 'GET', '', NULL, '请登录', '127.0.0.1', NULL, '2024-03-01 08:06:38.017444');
INSERT INTO "public"."exception_log" VALUES (151, '/user/detail', 'GET', '', NULL, '请登录', '127.0.0.1', NULL, '2024-03-01 08:10:54.979723');
INSERT INTO "public"."exception_log" VALUES (152, '/user/detail', 'GET', '', NULL, '请登录', '127.0.0.1', NULL, '2024-03-01 08:12:13.57036');
INSERT INTO "public"."exception_log" VALUES (153, '/user/detail', 'GET', '', NULL, '权限不足', '127.0.0.1', NULL, '2024-03-01 08:19:37.993406');
INSERT INTO "public"."exception_log" VALUES (154, '/user/detail', 'GET', '', NULL, '权限不足', '127.0.0.1', NULL, '2024-03-01 08:21:22.032707');

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS "public"."menu";
CREATE TABLE "public"."menu" (
  "id" int4 NOT NULL DEFAULT nextval('menu_seq'::regclass),
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "path" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "component" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "icon" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "create_time" timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "update_time" timestamp(6) DEFAULT CURRENT_TIMESTAMP,
  "order_num" int4 NOT NULL,
  "parent_id" int4,
  "is_hidden" int2 NOT NULL
)
;
COMMENT ON COLUMN "public"."menu"."name" IS '菜单名';
COMMENT ON COLUMN "public"."menu"."path" IS '菜单路径';
COMMENT ON COLUMN "public"."menu"."component" IS '组件';
COMMENT ON COLUMN "public"."menu"."icon" IS '菜单icon';
COMMENT ON COLUMN "public"."menu"."create_time" IS '创建时间';
COMMENT ON COLUMN "public"."menu"."update_time" IS '更新时间';
COMMENT ON COLUMN "public"."menu"."order_num" IS '排序';
COMMENT ON COLUMN "public"."menu"."parent_id" IS '父id';
COMMENT ON COLUMN "public"."menu"."is_hidden" IS '是否隐藏  0否1是';

-- ----------------------------
-- Records of menu
-- ----------------------------
INSERT INTO "public"."menu" VALUES (1, '首页', '/', '/index.vue', 'HomeFilled', '2021-01-26 17:06:51', '2023-08-17 15:06:07', 1, NULL, 0);

-- ----------------------------
-- Table structure for permission
-- ----------------------------
DROP TABLE IF EXISTS "public"."permission";
CREATE TABLE "public"."permission" (
  "id" int4 NOT NULL DEFAULT nextval('permission_seq'::regclass),
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "code" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "type" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "parentId" int4,
  "path" varchar(255) COLLATE "pg_catalog"."default",
  "redirect" varchar(255) COLLATE "pg_catalog"."default",
  "icon" varchar(255) COLLATE "pg_catalog"."default",
  "component" varchar(255) COLLATE "pg_catalog"."default",
  "layout" varchar(255) COLLATE "pg_catalog"."default",
  "keepAlive" int2,
  "method" varchar(255) COLLATE "pg_catalog"."default",
  "description" varchar(255) COLLATE "pg_catalog"."default",
  "show" int2 NOT NULL,
  "enable" int2 NOT NULL DEFAULT 1,
  "order" int4
)
;
COMMENT ON COLUMN "public"."permission"."show" IS '是否展示在页面菜单';

-- ----------------------------
-- Records of permission
-- ----------------------------
INSERT INTO "public"."permission" VALUES (1, '可视化大屏', '可视化大屏', 'MENU', 0, '/', '/', '/visualize', 'src/views/visualize/index', '', 1, '', '可视化大屏菜单路由', 1, 1, 1);

-- ----------------------------
-- Table structure for profile
-- ----------------------------
DROP TABLE IF EXISTS "public"."profile";
CREATE TABLE "public"."profile" (
  "id" int4 NOT NULL DEFAULT nextval('profile_seq'::regclass),
  "gender" int4,
  "avatar" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "address" varchar(255) COLLATE "pg_catalog"."default",
  "email" varchar(255) COLLATE "pg_catalog"."default",
  "userId" int4 NOT NULL,
  "nickName" varchar(10) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of profile
-- ----------------------------
INSERT INTO "public"."profile" VALUES (1, 0, '0', '0', '0', 1, '超管');
INSERT INTO "public"."profile" VALUES (11, 0, 'data:image/jpeg;base64,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', NULL, '1767359165@qq.com', 26, '李浩');

-- ----------------------------
-- Table structure for resource
-- ----------------------------
DROP TABLE IF EXISTS "public"."resource";
CREATE TABLE "public"."resource" (
  "id" int4 NOT NULL DEFAULT nextval('resource_seq'::regclass),
  "resource_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "url" varchar(255) COLLATE "pg_catalog"."default",
  "request_method" varchar(255) COLLATE "pg_catalog"."default",
  "parent_id" int4,
  "is_anonymous" int2 NOT NULL,
  "create_time" timestamp(6) NOT NULL,
  "update_time" timestamp(6)
)
;
COMMENT ON COLUMN "public"."resource"."resource_name" IS '资源名';
COMMENT ON COLUMN "public"."resource"."url" IS '权限路径';
COMMENT ON COLUMN "public"."resource"."request_method" IS '请求方式';
COMMENT ON COLUMN "public"."resource"."parent_id" IS '父模块id';
COMMENT ON COLUMN "public"."resource"."is_anonymous" IS '是否匿名访问 0否 1是';

-- ----------------------------
-- Records of resource
-- ----------------------------
INSERT INTO "public"."resource" VALUES (1, '菜单模块', NULL, NULL, NULL, 0, '2022-08-19 22:26:21', NULL);
INSERT INTO "public"."resource" VALUES (2, '删除菜单', '/menu/:id', 'DELETE', 1063, 0, '2022-08-19 22:26:22', '2023-08-16 16:10:32');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS "public"."role";
CREATE TABLE "public"."role" (
  "id" int4 NOT NULL DEFAULT nextval('role_seq'::regclass),
  "code" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "name" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "enable" int2 NOT NULL
)
;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO "public"."role" VALUES (1, 'SUPER_ADMIN', '超级管理员', 1);
INSERT INTO "public"."role" VALUES (2, 'ROLE_ADMIN', '管理员', 1);
INSERT INTO "public"."role" VALUES (5, 'ROLE_COMMON', '普通用户', 1);

-- ----------------------------
-- Table structure for role_menu
-- ----------------------------
DROP TABLE IF EXISTS "public"."role_menu";
CREATE TABLE "public"."role_menu" (
  "id" int4 NOT NULL DEFAULT nextval('role_menu_seq'::regclass),
  "role_id" int4,
  "menu_id" int4
)
;
COMMENT ON COLUMN "public"."role_menu"."id" IS '主键';
COMMENT ON COLUMN "public"."role_menu"."role_id" IS '角色id';
COMMENT ON COLUMN "public"."role_menu"."menu_id" IS '菜单id';

-- ----------------------------
-- Records of role_menu
-- ----------------------------
INSERT INTO "public"."role_menu" VALUES (1, 1, 1);

-- ----------------------------
-- Table structure for role_permissions_permission
-- ----------------------------
DROP TABLE IF EXISTS "public"."role_permissions_permission";
CREATE TABLE "public"."role_permissions_permission" (
  "roleId" int4 NOT NULL,
  "permissionId" int4 NOT NULL
)
;

-- ----------------------------
-- Records of role_permissions_permission
-- ----------------------------
INSERT INTO "public"."role_permissions_permission" VALUES (2, 1);

-- ----------------------------
-- Table structure for role_resource
-- ----------------------------
DROP TABLE IF EXISTS "public"."role_resource";
CREATE TABLE "public"."role_resource" (
  "id" int4 NOT NULL DEFAULT nextval('role_resource_seq'::regclass),
  "role_id" int4,
  "resource_id" int4
)
;
COMMENT ON COLUMN "public"."role_resource"."role_id" IS '角色id';
COMMENT ON COLUMN "public"."role_resource"."resource_id" IS '权限id';

-- ----------------------------
-- Records of role_resource
-- ----------------------------
INSERT INTO "public"."role_resource" VALUES (1, 1, 1);
INSERT INTO "public"."role_resource" VALUES (2, 1, 2);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS "public"."user";
CREATE TABLE "public"."user" (
  "id" int4 NOT NULL DEFAULT nextval('user_seq'::regclass),
  "username" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "password" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "enable" int2 NOT NULL DEFAULT 1,
  "createTime" timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updateTime" timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "userRoleId" int4,
  "nickname" varchar(6) COLLATE "pg_catalog"."default"
)
;
COMMENT ON COLUMN "public"."user"."userRoleId" IS '所属角色';
COMMENT ON COLUMN "public"."user"."nickname" IS '用户昵称';

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO "public"."user" VALUES (1, 'admin', '$2a$10$FsAafxTTVVGXfIkJqvaiV.1vPfq4V9HW298McPldJgO829PR52a56', 1, '2023-11-18 16:18:59.150632', '2023-11-18 16:18:59.150632', 1, '李浩管理');
INSERT INTO "public"."user" VALUES (26, 'lh', '$2a$10$FsAafxTTVVGXfIkJqvaiV.1vPfq4V9HW298McPldJgO829PR52a56', 1, '2024-01-11 07:47:08.750879', '2024-01-11 07:47:08.750879', 2, '李浩');

-- ----------------------------
-- Table structure for user_roles_role
-- ----------------------------
DROP TABLE IF EXISTS "public"."user_roles_role";
CREATE TABLE "public"."user_roles_role" (
  "userId" int4 NOT NULL,
  "roleId" int4 NOT NULL
)
;

-- ----------------------------
-- Records of user_roles_role
-- ----------------------------
INSERT INTO "public"."user_roles_role" VALUES (1, 1);
INSERT INTO "public"."user_roles_role" VALUES (1, 2);
INSERT INTO "public"."user_roles_role" VALUES (26, 2);

-- ----------------------------
-- Function structure for uuid_generate_v1
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_generate_v1"();
CREATE OR REPLACE FUNCTION "public"."uuid_generate_v1"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_generate_v1'
  LANGUAGE c VOLATILE STRICT
  COST 1;

-- ----------------------------
-- Function structure for uuid_generate_v1mc
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_generate_v1mc"();
CREATE OR REPLACE FUNCTION "public"."uuid_generate_v1mc"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_generate_v1mc'
  LANGUAGE c VOLATILE STRICT
  COST 1;

-- ----------------------------
-- Function structure for uuid_generate_v3
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_generate_v3"("namespace" uuid, "name" text);
CREATE OR REPLACE FUNCTION "public"."uuid_generate_v3"("namespace" uuid, "name" text)
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_generate_v3'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for uuid_generate_v4
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_generate_v4"();
CREATE OR REPLACE FUNCTION "public"."uuid_generate_v4"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_generate_v4'
  LANGUAGE c VOLATILE STRICT
  COST 1;

-- ----------------------------
-- Function structure for uuid_generate_v5
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_generate_v5"("namespace" uuid, "name" text);
CREATE OR REPLACE FUNCTION "public"."uuid_generate_v5"("namespace" uuid, "name" text)
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_generate_v5'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for uuid_nil
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_nil"();
CREATE OR REPLACE FUNCTION "public"."uuid_nil"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_nil'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for uuid_ns_dns
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_ns_dns"();
CREATE OR REPLACE FUNCTION "public"."uuid_ns_dns"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_ns_dns'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for uuid_ns_oid
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_ns_oid"();
CREATE OR REPLACE FUNCTION "public"."uuid_ns_oid"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_ns_oid'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for uuid_ns_url
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_ns_url"();
CREATE OR REPLACE FUNCTION "public"."uuid_ns_url"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_ns_url'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for uuid_ns_x500
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_ns_x500"();
CREATE OR REPLACE FUNCTION "public"."uuid_ns_x500"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_ns_x500'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."exception_log_seq"', 154, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."menu_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."permission_seq"', 6, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."profile_seq"', 11, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."resource_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."role_menu_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."role_resource_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."role_seq"', 11, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."user_seq"', 26, true);

-- ----------------------------
-- Primary Key structure for table exception_log
-- ----------------------------
ALTER TABLE "public"."exception_log" ADD CONSTRAINT "exception_log_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table menu
-- ----------------------------
ALTER TABLE "public"."menu" ADD CONSTRAINT "menu_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table permission
-- ----------------------------
CREATE UNIQUE INDEX "IDX_30e166e8c6359970755c5727a2" ON "public"."permission" USING btree (
  "code" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table permission
-- ----------------------------
ALTER TABLE "public"."permission" ADD CONSTRAINT "permission_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table profile
-- ----------------------------
CREATE UNIQUE INDEX "IDX_a24972ebd73b106250713dcddd" ON "public"."profile" USING btree (
  "userId" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table profile
-- ----------------------------
ALTER TABLE "public"."profile" ADD CONSTRAINT "profile_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table resource
-- ----------------------------
ALTER TABLE "public"."resource" ADD CONSTRAINT "resource_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table role
-- ----------------------------
CREATE UNIQUE INDEX "IDX_ae4578dcaed5adff96595e6166" ON "public"."role" USING btree (
  "name" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "IDX_ee999bb389d7ac0fd967172c41" ON "public"."role" USING btree (
  "code" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table role
-- ----------------------------
ALTER TABLE "public"."role" ADD CONSTRAINT "role_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table role_menu
-- ----------------------------
ALTER TABLE "public"."role_menu" ADD CONSTRAINT "role_menu_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table role_permissions_permission
-- ----------------------------
CREATE INDEX "IDX_b36cb2e04bc353ca4ede00d87b" ON "public"."role_permissions_permission" USING btree (
  "roleId" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_bfbc9e263d4cea6d7a8c9eb3ad" ON "public"."role_permissions_permission" USING btree (
  "permissionId" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table role_permissions_permission
-- ----------------------------
ALTER TABLE "public"."role_permissions_permission" ADD CONSTRAINT "role_permissions_permission_pkey" PRIMARY KEY ("roleId", "permissionId");

-- ----------------------------
-- Primary Key structure for table role_resource
-- ----------------------------
ALTER TABLE "public"."role_resource" ADD CONSTRAINT "role_resource_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table user
-- ----------------------------
CREATE UNIQUE INDEX "IDX_78a916df40e02a9deb1c4b75ed" ON "public"."user" USING btree (
  "username" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table user
-- ----------------------------
ALTER TABLE "public"."user" ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table user_roles_role
-- ----------------------------
CREATE INDEX "IDX_4be2f7adf862634f5f803d246b" ON "public"."user_roles_role" USING btree (
  "roleId" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_5f9286e6c25594c6b88c108db7" ON "public"."user_roles_role" USING btree (
  "userId" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table user_roles_role
-- ----------------------------
ALTER TABLE "public"."user_roles_role" ADD CONSTRAINT "user_roles_role_pkey" PRIMARY KEY ("userId", "roleId");
