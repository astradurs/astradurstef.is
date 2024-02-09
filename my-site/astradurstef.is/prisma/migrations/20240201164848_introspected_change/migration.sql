/*
  Warnings:

  - Made the column `name` on table `gdcwaitlist` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `gdcwaitlist` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isodate` on table `gdcwaitlist` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createtime` on table `gdcwaitlist` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "gdcwaitlist" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "isodate" SET NOT NULL,
ALTER COLUMN "isodate" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "createtime" SET NOT NULL;
