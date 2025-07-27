/*
  Warnings:

  - Added the required column `pincode` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "pincode" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "PayingGuestImages" (
    "id" BIGSERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "payingGuestId" UUID NOT NULL,

    CONSTRAINT "PayingGuestImages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PayingGuestImages" ADD CONSTRAINT "PayingGuestImages_payingGuestId_fkey" FOREIGN KEY ("payingGuestId") REFERENCES "PayingGuestInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
