-- CreateTable
CREATE TABLE "counters" (
    "id" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "emoji" TEXT NOT NULL,
    "counterName" TEXT NOT NULL,
    "createtime" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatetime" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "counters_pkey" PRIMARY KEY ("id")
);
