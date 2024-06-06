/*
  Warnings:

  - You are about to drop the column `eventname` on the `bingocard` table. All the data in the column will be lost.
  - Added the required column `bingoeventid` to the `bingocard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bingocard" DROP COLUMN "eventname",
ADD COLUMN     "bingoeventid" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "bingoevent" (
    "id" TEXT NOT NULL,
    "eventname" TEXT NOT NULL,
    "eventslug" TEXT NOT NULL,
    "createtime" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatetime" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bingoevent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bingocardfield" (
    "id" TEXT NOT NULL,
    "fieldvalue" TEXT NOT NULL,
    "createtime" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatetime" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bingocardfield_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bingocard" ADD CONSTRAINT "bingocard_bingoeventid_fkey" FOREIGN KEY ("bingoeventid") REFERENCES "bingoevent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
