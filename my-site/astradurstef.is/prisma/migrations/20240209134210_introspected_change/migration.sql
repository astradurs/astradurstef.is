-- AlterTable
ALTER TABLE "gdcwaitlist" ADD COLUMN     "restaurantid" TEXT;

-- AddForeignKey
ALTER TABLE "gdcwaitlist" ADD CONSTRAINT "gdcwaitlist_restaurantid_fkey" FOREIGN KEY ("restaurantid") REFERENCES "restaurants"("id") ON DELETE SET NULL ON UPDATE CASCADE;
