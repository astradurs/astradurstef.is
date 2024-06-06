/*
  Warnings:

  - Added the required column `solved` to the `bingocard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bingocard" ADD COLUMN     "solved" BOOLEAN NOT NULL;
