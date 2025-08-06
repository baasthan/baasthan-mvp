-- AlterTable
ALTER TABLE "PayingGuestInfo" ADD COLUMN     "doubleSharingPrice" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "singleShareingPrice" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "trippleShareingPrice" DECIMAL(65,30) NOT NULL DEFAULT 0;
