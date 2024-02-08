/*
  Warnings:

  - The primary key for the `restaurants` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "restaurants" DROP CONSTRAINT "restaurants_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "restaurants_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "restaurants_id_seq";
