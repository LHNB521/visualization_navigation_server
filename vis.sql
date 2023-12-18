/*
 Navicat Premium Data Transfer

 Source Server         : 43.140.251.66
 Source Server Type    : PostgreSQL
 Source Server Version : 140002
 Source Host           : 43.140.251.66:5432
 Source Catalog        : vis
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 140002
 File Encoding         : 65001

 Date: 18/12/2023 09:12:16
*/


-- ----------------------------
-- Table structure for permission
-- ----------------------------
DROP TABLE IF EXISTS "public"."permission";
CREATE TABLE "public"."permission" (
  "id" int4 NOT NULL,
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
  "enable" int2 NOT NULL,
  "order" int4
)
;
COMMENT ON COLUMN "public"."permission"."show" IS '是否展示在页面菜单';

-- ----------------------------
-- Records of permission
-- ----------------------------

-- ----------------------------
-- Table structure for profile
-- ----------------------------
DROP TABLE IF EXISTS "public"."profile";
CREATE TABLE "public"."profile" (
  "id" int4 NOT NULL,
  "gender" int4,
  "avatar" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "address" varchar(255) COLLATE "pg_catalog"."default",
  "email" varchar(255) COLLATE "pg_catalog"."default",
  "userId" int4 NOT NULL,
  "nickName" varchar(10) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of profile
-- ----------------------------

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS "public"."role";
CREATE TABLE "public"."role" (
  "id" int4 NOT NULL,
  "code" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "name" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "enable" int2 NOT NULL
)
;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO "public"."role" VALUES (1, 'SUPER_ADMIN', '超级管理员', 1);
INSERT INTO "public"."role" VALUES (2, 'ROLE_QA', '质检员', 1);

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
INSERT INTO "public"."role_permissions_permission" VALUES (2, 2);
INSERT INTO "public"."role_permissions_permission" VALUES (2, 3);
INSERT INTO "public"."role_permissions_permission" VALUES (2, 4);
INSERT INTO "public"."role_permissions_permission" VALUES (2, 5);
INSERT INTO "public"."role_permissions_permission" VALUES (2, 9);
INSERT INTO "public"."role_permissions_permission" VALUES (2, 10);
INSERT INTO "public"."role_permissions_permission" VALUES (2, 11);
INSERT INTO "public"."role_permissions_permission" VALUES (2, 12);
INSERT INTO "public"."role_permissions_permission" VALUES (2, 14);
INSERT INTO "public"."role_permissions_permission" VALUES (2, 15);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS "public"."user";
CREATE TABLE "public"."user" (
  "id" int4 NOT NULL,
  "username" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "password" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "enable" int2 NOT NULL,
  "createTime" timestamp(6) NOT NULL,
  "updateTime" timestamp(6) NOT NULL
)
;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO "public"."user" VALUES (1, 'admin', '$2a$10$FsAafxTTVVGXfIkJqvaiV.1vPfq4V9HW298McPldJgO829PR52a56', 1, '2023-11-18 16:18:59.150632', '2023-11-18 16:18:59.150632');

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
