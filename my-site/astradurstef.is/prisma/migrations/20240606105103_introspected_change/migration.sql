-- CreateTable
CREATE TABLE "bingocard" (
    "id" TEXT NOT NULL,
    "eventname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createtime" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatetime" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bingocard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bingocard" ADD CONSTRAINT "bingocard_email_fkey" FOREIGN KEY ("email") REFERENCES "user"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
