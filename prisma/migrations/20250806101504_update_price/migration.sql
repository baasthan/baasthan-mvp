/*
  Warnings:

  - You are about to alter the column `doubleSharingPrice` on the `PayingGuestInfo` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `singleShareingPrice` on the `PayingGuestInfo` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `trippleShareingPrice` on the `PayingGuestInfo` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "PayingGuestInfo" ALTER COLUMN "doubleSharingPrice" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "singleShareingPrice" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "trippleShareingPrice" SET DATA TYPE DECIMAL(10,2);
