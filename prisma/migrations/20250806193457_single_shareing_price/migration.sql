/*
  Warnings:

  - You are about to drop the column `singleShareingPrice` on the `PayingGuestInfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PayingGuestInfo" DROP COLUMN "singleShareingPrice",
ADD COLUMN     "singleSharingPrice" DECIMAL(10,2) NOT NULL DEFAULT 0.00;
