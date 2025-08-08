/*
  Warnings:

  - A unique constraint covering the columns `[email,mobileNumber,reason]` on the table `SupportRequest` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "SupportRequest_email_key";

-- DropIndex
DROP INDEX "SupportRequest_mobileNumber_key";

-- CreateIndex
CREATE UNIQUE INDEX "SupportRequest_email_mobileNumber_reason_key" ON "SupportRequest"("email", "mobileNumber", "reason");
