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

 Date: 03/01/2024 10:38:17
*/


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
  "id" int4 NOT NULL DEFAULT nextval('profile_seq'::regclass),
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
  "id" int4 NOT NULL DEFAULT nextval('user_seq'::regclass),
  "username" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "password" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "enable" int2 NOT NULL,
  "createTime" timestamp(6) NOT NULL DEFAULT NULL::timestamp without time zone,
  "updateTime" timestamp(6) NOT NULL DEFAULT NULL::timestamp without time zone
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
SELECT setval('"public"."profile_seq"', 1, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."user_seq"', 5, true);

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
