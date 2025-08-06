-- CreateTable
CREATE TABLE "PayingGuestHouseRules" (
    "id" BIGSERIAL NOT NULL,
    "payingGuestId" UUID NOT NULL,
    "houseRuleHtml" TEXT NOT NULL,

    CONSTRAINT "PayingGuestHouseRules_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PayingGuestHouseRules" ADD CONSTRAINT "PayingGuestHouseRules_payingGuestId_fkey" FOREIGN KEY ("payingGuestId") REFERENCES "PayingGuestInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
