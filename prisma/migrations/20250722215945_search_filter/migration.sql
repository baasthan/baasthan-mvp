-- CreateEnum
CREATE TYPE "GenderPreferedEnum" AS ENUM ('Male', 'Female', 'Co-Ed');

-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('1 Bhk', '2 Bhk', '3 Bhk');

-- CreateEnum
CREATE TYPE "OccupancyTypeEnum" AS ENUM ('Single Sharing', 'Double Sharing', 'Triple Sharing', 'Quadra Sharing');

-- CreateTable
CREATE TABLE "commercial_info" (
    "id" INTEGER NOT NULL,
    "propertyId" UUID NOT NULL,
    "locality" TEXT NOT NULL,
    "property" "PropertyType" NOT NULL,
    "budget" INTEGER NOT NULL,
    "configuration" INTEGER NOT NULL,
    "area" INTEGER NOT NULL,
    "furnishing" TEXT NOT NULL,
    "postedBy" TEXT NOT NULL,
    "availableFrom" TEXT NOT NULL,
    "reraRegistered" BOOLEAN NOT NULL,
    "registered" BOOLEAN NOT NULL,

    CONSTRAINT "commercial_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "residential_info" (
    "id" INTEGER NOT NULL,
    "propertyId" UUID NOT NULL,
    "locality" TEXT NOT NULL,
    "property_type" TEXT NOT NULL,
    "budget" INTEGER NOT NULL,
    "configuration" INTEGER NOT NULL,
    "bathroom" INTEGER NOT NULL,
    "area" INTEGER NOT NULL,
    "furnishing" TEXT NOT NULL,
    "postedBy" TEXT NOT NULL,
    "available_from" TEXT NOT NULL,
    "tenantsPreferred" TEXT NOT NULL,
    "rera_registered" BOOLEAN NOT NULL,

    CONSTRAINT "residential_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pgInfo" (
    "id" INTEGER NOT NULL,
    "propertyId" UUID NOT NULL,
    "locality" TEXT NOT NULL,
    "budget" INTEGER NOT NULL,
    "occupancyType" "OccupancyTypeEnum"[],
    "tenantsPreferred" TEXT NOT NULL,
    "genderPrefered" "GenderPreferedEnum" NOT NULL,
    "food_provided" BOOLEAN NOT NULL,
    "amenities" TEXT NOT NULL,
    "postedBy" TEXT NOT NULL,
    "propertyType" TEXT NOT NULL,
    "floor" INTEGER NOT NULL,
    "reraRegistered" BOOLEAN NOT NULL,
    "reraRegistrationId" TEXT,

    CONSTRAINT "pgInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "propertySearchResults" (
    "property_id" UUID NOT NULL,
    "propertyTitle" TEXT NOT NULL,
    "locality" TEXT NOT NULL,
    "montlyRent" INTEGER NOT NULL,
    "bed" INTEGER NOT NULL,
    "bath" INTEGER NOT NULL,
    "balcony" INTEGER NOT NULL,

    CONSTRAINT "propertySearchResults_pkey" PRIMARY KEY ("property_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "propertySearchResults_property_id_key" ON "propertySearchResults"("property_id");

-- AddForeignKey
ALTER TABLE "commercial_info" ADD CONSTRAINT "commercial_info_propertyId_to_propertyinfo_fkey" FOREIGN KEY ("propertyId") REFERENCES "PropertyInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commercial_info" ADD CONSTRAINT "commercial_info_propertyId_to_searchresults_fkey" FOREIGN KEY ("propertyId") REFERENCES "propertySearchResults"("property_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "residential_info" ADD CONSTRAINT "residential_info_propertyId_to_propertyinfo_fkey" FOREIGN KEY ("propertyId") REFERENCES "PropertyInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "residential_info" ADD CONSTRAINT "residential_info_propertyId_to_searchresults_fkey" FOREIGN KEY ("propertyId") REFERENCES "propertySearchResults"("property_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pgInfo" ADD CONSTRAINT "pginfo_propertyId_to_propertyinfo_fkey" FOREIGN KEY ("propertyId") REFERENCES "PropertyInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pgInfo" ADD CONSTRAINT "pginfo_propertyId_to_searchresults_fkey" FOREIGN KEY ("propertyId") REFERENCES "propertySearchResults"("property_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "propertySearchResults" ADD CONSTRAINT "propertySearchResults_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "PropertyInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
