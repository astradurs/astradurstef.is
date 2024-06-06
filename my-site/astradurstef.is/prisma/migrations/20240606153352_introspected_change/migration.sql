/*
  Warnings:

  - Added the required column `email` to the `bingocardfield` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bingocardfield" ADD COLUMN     "email" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "bingocardfield" ADD CONSTRAINT "bingocardfield_email_fkey" FOREIGN KEY ("email") REFERENCES "user"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
