-- AlterTable
ALTER TABLE "user" ADD COLUMN     "createtime" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatetime" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("email");
