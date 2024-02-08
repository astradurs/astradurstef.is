/*
  Warnings:

  - You are about to drop the column `downvotes` on the `restaurants` table. All the data in the column will be lost.
  - You are about to drop the column `upvotes` on the `restaurants` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "restaurants" DROP COLUMN "downvotes",
DROP COLUMN "upvotes";

-- CreateTable
CREATE TABLE "votes" (
    "email" VARCHAR(100) NOT NULL,
    "restaurantid" TEXT NOT NULL,
    "vote" BOOLEAN NOT NULL,
    "createtime" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "votes_pkey" PRIMARY KEY ("email","restaurantid")
);

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_email_fkey" FOREIGN KEY ("email") REFERENCES "user"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_restaurantid_fkey" FOREIGN KEY ("restaurantid") REFERENCES "restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
