-- CreateEnum
CREATE TYPE "SupportReasonEnum" AS ENUM ('tenancy', 'hosting', 'other');

-- CreateEnum
CREATE TYPE "SupportStatusEnum" AS ENUM ('created', 'inProgress', 'contacted', 'awaitingUserVerification', 'awaitingPropertyVerification', 'done', 'failedUserVerification', 'failedPropertyVerication');

-- CreateTable
CREATE TABLE "SupportRequest" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "mobileNumber" CHAR(10) NOT NULL,
    "reason" "SupportReasonEnum" NOT NULL DEFAULT 'tenancy',
    "status" "SupportStatusEnum" NOT NULL DEFAULT 'created',
    "emailTriggered" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SupportRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SupportRequest_email_key" ON "SupportRequest"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SupportRequest_mobileNumber_key" ON "SupportRequest"("mobileNumber");
