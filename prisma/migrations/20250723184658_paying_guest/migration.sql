/*
  Warnings:

  - You are about to drop the column `city` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `googleMapLink` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `landmark` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `pincode` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `propertyId` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the `PropertyAmenities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PropertyImages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PropertyInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reviews` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Unit` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `locality` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PGOccupancyTypeEnum" AS ENUM ('Single Sharing', 'Double Sharing', 'Triple Sharing');

-- CreateEnum
CREATE TYPE "PGGenderPolicyEnum" AS ENUM ('Male', 'Female', 'Co-Ed');

-- CreateEnum
CREATE TYPE "PGPreferedTenantsEnum" AS ENUM ('Students', 'Working Professionals');

-- CreateEnum
CREATE TYPE "PGFoodTypeEnum" AS ENUM ('Veg', 'Non-Veg', 'Veg/Non Veg');

-- CreateEnum
CREATE TYPE "PGAmenitiesEnum" AS ENUM ('High Speed Wifi', 'Air Conditioning', 'Bike Parking', 'Car Parking', 'Laundary', '24x7 Security', 'In-House Gym', 'Food Available', 'Power Backup');

-- CreateEnum
CREATE TYPE "PGWashroomEnum" AS ENUM ('Common', 'Attached');

-- CreateEnum
CREATE TYPE "PGMealsEnum" AS ENUM ('Only Dinner', 'Two Meals (Lunch & Dinner)', 'Three Meals (Lunch, Dinner and Breakfast)');

-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "PropertyAmenities" DROP CONSTRAINT "PropertyAmenities_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "PropertyImages" DROP CONSTRAINT "PropertyImages_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "PropertyInfo" DROP CONSTRAINT "PropertyInfo_hostId_fkey";

-- DropForeignKey
ALTER TABLE "PropertyInfo" DROP CONSTRAINT "PropertyInfo_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "Reviews" DROP CONSTRAINT "Reviews_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "Unit" DROP CONSTRAINT "Unit_propertyId_fkey";

-- DropIndex
DROP INDEX "Location_propertyId_key";

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "city",
DROP COLUMN "googleMapLink",
DROP COLUMN "landmark",
DROP COLUMN "pincode",
DROP COLUMN "propertyId",
DROP COLUMN "state",
ADD COLUMN     "locality" TEXT NOT NULL,
ADD COLUMN     "relatedLocality" TEXT[];

-- DropTable
DROP TABLE "PropertyAmenities";

-- DropTable
DROP TABLE "PropertyImages";

-- DropTable
DROP TABLE "PropertyInfo";

-- DropTable
DROP TABLE "Reviews";

-- DropTable
DROP TABLE "Unit";

-- DropEnum
DROP TYPE "UnitTypeEnum";

-- CreateTable
CREATE TABLE "PayingGuestInfo" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "propertyName" TEXT NOT NULL,
    "hostId" TEXT NOT NULL,
    "availableOccupancyType" "PGOccupancyTypeEnum"[],
    "genderPolicy" "PGGenderPolicyEnum" NOT NULL DEFAULT 'Co-Ed',
    "startingPrice" DECIMAL(10,2) NOT NULL,
    "baasthanVerified" BOOLEAN NOT NULL DEFAULT false,
    "reraRegistered" BOOLEAN NOT NULL DEFAULT false,
    "reraRegistrationNumber" TEXT,
    "amenities" "PGAmenitiesEnum"[],
    "preferedTenants" "PGPreferedTenantsEnum"[] DEFAULT ARRAY['Students']::"PGPreferedTenantsEnum"[],
    "washroomType" "PGWashroomEnum" NOT NULL,
    "floors" INTEGER NOT NULL,
    "operatingSince" SMALLINT NOT NULL,
    "meals" "PGMealsEnum" NOT NULL,
    "noticePeriodInDays" SMALLINT NOT NULL,
    "addressLine1" TEXT NOT NULL,
    "addressLine2" TEXT,
    "locality" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,

    CONSTRAINT "PayingGuestInfo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PayingGuestInfo" ADD CONSTRAINT "PayingGuestInfo_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
