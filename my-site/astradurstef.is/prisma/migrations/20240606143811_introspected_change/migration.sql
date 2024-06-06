/*
  Warnings:

  - The primary key for the `bingocard` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bingoeventid` on the `bingocard` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `bingocard` table. All the data in the column will be lost.
  - You are about to drop the column `bingoeventid` on the `bingocardfield` table. All the data in the column will be lost.
  - The primary key for the `bingoevent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `bingoevent` table. All the data in the column will be lost.
  - Added the required column `eventslug` to the `bingocard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventslug` to the `bingocardfield` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "bingocard" DROP CONSTRAINT "bingocard_bingoeventid_fkey";

-- DropForeignKey
ALTER TABLE "bingocardfield" DROP CONSTRAINT "bingocardfield_bingoeventid_fkey";

-- AlterTable
ALTER TABLE "bingocard" DROP CONSTRAINT "bingocard_pkey",
DROP COLUMN "bingoeventid",
DROP COLUMN "id",
ADD COLUMN     "eventslug" TEXT NOT NULL,
ADD CONSTRAINT "bingocard_pkey" PRIMARY KEY ("email", "eventslug");

-- AlterTable
ALTER TABLE "bingocardfield" DROP COLUMN "bingoeventid",
ADD COLUMN     "eventslug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "bingoevent" DROP CONSTRAINT "bingoevent_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "bingoevent_pkey" PRIMARY KEY ("eventslug");

-- AddForeignKey
ALTER TABLE "bingocard" ADD CONSTRAINT "bingocard_eventslug_fkey" FOREIGN KEY ("eventslug") REFERENCES "bingoevent"("eventslug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bingocardfield" ADD CONSTRAINT "bingocardfield_eventslug_fkey" FOREIGN KEY ("eventslug") REFERENCES "bingoevent"("eventslug") ON DELETE RESTRICT ON UPDATE CASCADE;
