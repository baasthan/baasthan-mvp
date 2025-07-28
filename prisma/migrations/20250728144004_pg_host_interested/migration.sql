/*
  Warnings:

  - You are about to drop the `PgOwner` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "PgOwner";

-- CreateTable
CREATE TABLE "PGHostInterested" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobileNumber" CHAR(10) NOT NULL,
    "emailTriggered" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PGHostInterested_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PGHostInterested_email_key" ON "PGHostInterested"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PGHostInterested_mobileNumber_key" ON "PGHostInterested"("mobileNumber");
