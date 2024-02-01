-- CreateTable
CREATE TABLE "gdcwaitlist" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100),
    "email" VARCHAR(100),
    "isodate" DATE,
    "createtime" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "gdcwaitlist_pkey" PRIMARY KEY ("id")
);
