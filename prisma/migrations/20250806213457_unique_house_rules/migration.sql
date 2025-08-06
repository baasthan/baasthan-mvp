/*
  Warnings:

  - A unique constraint covering the columns `[payingGuestId]` on the table `PayingGuestHouseRules` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PayingGuestHouseRules_payingGuestId_key" ON "PayingGuestHouseRules"("payingGuestId");
