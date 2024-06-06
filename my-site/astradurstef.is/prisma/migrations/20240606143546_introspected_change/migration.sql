/*
  Warnings:

  - Added the required column `bingoeventid` to the `bingocardfield` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bingocardfield" ADD COLUMN     "bingoeventid" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "bingocardfield" ADD CONSTRAINT "bingocardfield_bingoeventid_fkey" FOREIGN KEY ("bingoeventid") REFERENCES "bingoevent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
