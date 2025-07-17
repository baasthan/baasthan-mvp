-- DropForeignKey
ALTER TABLE "PropertyInfo" DROP CONSTRAINT "PropertyInfo_organizationId_fkey";

-- AlterTable
ALTER TABLE "PropertyInfo" ALTER COLUMN "organizationId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "PropertyInfo" ADD CONSTRAINT "PropertyInfo_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;
