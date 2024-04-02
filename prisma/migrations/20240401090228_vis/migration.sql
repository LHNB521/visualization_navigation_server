-- CreateTable
CREATE TABLE "sys_user" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "nickname" VARCHAR(20) NOT NULL,
    "phone_number" VARCHAR(20),
    "sex" INTEGER DEFAULT 3,
    "status" INTEGER NOT NULL DEFAULT 1,
    "department_id" INTEGER,
    "create_time" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_time" TIMESTAMP(3),
    "is_delete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "sys_user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sys_user_username_key" ON "sys_user"("username");
