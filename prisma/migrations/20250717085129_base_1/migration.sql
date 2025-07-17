/*
  Warnings:

  - The `floor` column on the `PropertyInfo` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `rating` column on the `PropertyInfo` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `rating_count` column on the `PropertyInfo` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "PropertyInfo" ALTER COLUMN "startingPrice" SET DATA TYPE BIGINT,
DROP COLUMN "floor",
ADD COLUMN     "floor" INTEGER,
DROP COLUMN "rating",
ADD COLUMN     "rating" INTEGER,
DROP COLUMN "rating_count",
ADD COLUMN     "rating_count" INTEGER;
