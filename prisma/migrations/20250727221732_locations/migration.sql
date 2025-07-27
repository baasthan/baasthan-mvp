/*
  Warnings:

  - You are about to drop the column `relatedLocality` on the `Location` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Location" DROP COLUMN "relatedLocality";

-- CreateTable
CREATE TABLE "RelatedLocality" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "locationId" UUID NOT NULL,

    CONSTRAINT "RelatedLocality_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RelatedLocality" ADD CONSTRAINT "RelatedLocality_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;
