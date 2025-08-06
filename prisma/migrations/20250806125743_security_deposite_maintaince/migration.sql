-- AlterTable
ALTER TABLE "PayingGuestInfo" ADD COLUMN     "maintaince" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
ADD COLUMN     "securityDeposite" DECIMAL(10,2) NOT NULL DEFAULT 0.00;
