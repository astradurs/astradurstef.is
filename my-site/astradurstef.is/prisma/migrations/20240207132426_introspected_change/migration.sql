-- AddForeignKey
ALTER TABLE "gdcwaitlist" ADD CONSTRAINT "gdcwaitlist_email_fkey" FOREIGN KEY ("email") REFERENCES "user"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
