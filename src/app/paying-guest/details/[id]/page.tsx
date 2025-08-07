import PayingGuestAmenitiesCard from "@/components/paying-guest/paying-guest-amenities-card";
import PayingGuestDetailsImage from "@/components/paying-guest/paying-guest-details-image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PGGenderPolicyEnumMap } from "@/constants/PGGenderPolicyType";
import { PGMealsEnumMap } from "@/constants/PGMeals";
import { PGOccupancyTypeEnumMap } from "@/constants/PGOccupancyType";
import { PGPreferedTenantsEnumMap } from "@/constants/PGPreferedTenantsType";
import { PGWashroomEnumMap } from "@/constants/PGWashroomType";
import { auth } from "@/lib/auth";
import {
  getPayingGuestInfoByFilters,
  getPayingGuestInfoById,
} from "@/repository/paying-guest";
import { PayingGuestInfoWithPublicUser } from "@/types/paying-guest";
import getInitials from "@/utils/getInitials";
import { ArrowRight, Building2, MapPin, PhoneCall, Send } from "lucide-react";
import { Metadata, ResolvingMetadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import z from "zod";

type Props = {
  params: Promise<{ id: string }>;
};

export const revalidate = 3600;

export async function generateStaticParams() {
  const properties = await getPayingGuestInfoByFilters({
    baasthanVerified: true,
  });

  if (properties && properties.length > 0) {
    return properties.map((property) => ({ id: property.id }));
  }
  return [];
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;
  const payingGuestInfo: PayingGuestInfoWithPublicUser | null =
    await getPayingGuestInfoById(id);
  if (payingGuestInfo) {
    return {
      title: payingGuestInfo.propertyName,
    };
  }
  return {};
}

const PayingGuestDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const isValidId = z.string().uuid().safeParse(id).success;
  if (!isValidId) {
    redirect("/");
  }

  const authSession = await auth.api.getSession({
    headers: await headers(),
  });

  const userId =
    authSession &&
    authSession.user &&
    (authSession.user.role === "hostUserRole" ||
      authSession.user.role === "superAdminUser")
      ? authSession.user.id
      : undefined;

  const payingGuestInfo: PayingGuestInfoWithPublicUser | null =
    await getPayingGuestInfoById(id, userId);

  if (!payingGuestInfo) {
    return notFound();
  }
  return (
    <div className="container shadow-2xl rounded-md overflow-hidden mx-auto py-2 flex flex-col gap-4">
      <PayingGuestDetailsImage images={payingGuestInfo.PayingGuestImages} />

      <div id="pg-basic-details" className="flex flex-col gap-4 p-2 ">
        <div className="flex flex-row justify-between ">
          <div>
            <h3 className="text-2xl text-primary font-semibold flex items-center gap-1">
              <Building2 size={16} />
              {payingGuestInfo.propertyName}
            </h3>

            <h4 className="text-lg font-semibold text-muted-foreground flex items-center gap-1">
              <MapPin size={16} />
              {payingGuestInfo.locality}, {payingGuestInfo.city}
            </h4>
          </div>

          <h4 className="font-semibold text-muted-foreground  text-lg">
            Starting from{" "}
            <span className="text-primary">
              ₹{payingGuestInfo.startingPrice.toNumber()}
            </span>
          </h4>
        </div>
        <div id="basic-details" className="flex flex-col gap-2">
          <h3 className="text-lg font-medium">PG Details</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div>
              <p className="font-semibold">Security Deposite</p>
              <p className="text-primary">
                {payingGuestInfo.securityDeposite.toNumber() !== 0
                  ? `₹${payingGuestInfo.securityDeposite.toNumber()}`
                  : "N/A"}
              </p>
            </div>
            <div>
              <p className="font-semibold">Maintaince</p>
              <p className="text-primary">
                {payingGuestInfo.maintaince.toNumber() !== 0
                  ? `₹${payingGuestInfo.maintaince.toNumber()}`
                  : "N/A"}
              </p>
            </div>
            <div>
              <p className="font-semibold">Operating Since</p>
              <p className="text-primary">{payingGuestInfo.operatingSince}</p>
            </div>
            <div>
              <p className="font-semibold">Notice Period</p>
              <p className="text-primary">
                {payingGuestInfo.noticePeriodInDays} Days
              </p>
            </div>
            <div>
              <p className="font-semibold">Preffered Gender</p>
              <p className="text-primary">
                {PGGenderPolicyEnumMap[payingGuestInfo.genderPolicy]}
              </p>
            </div>
            <div>
              <p className="font-semibold">Preffered Tenants</p>
              <p className="text-primary">
                {payingGuestInfo.preferedTenants
                  .map((preferance) => PGPreferedTenantsEnumMap[preferance])
                  .join("/")}
              </p>
            </div>
            <div>
              <p className="font-semibold">Washroom</p>
              <p className="text-primary">
                {PGWashroomEnumMap[payingGuestInfo.washroomType]}
              </p>
            </div>
          </div>
        </div>
        <div id="occupancy_availability" className="flex flex-col gap-2">
          <h3 className="text-lg font-medium ">Occupancy Available</h3>
          <div className="flex flex-col md:flex-row gap-2 overflow-visible">
            {payingGuestInfo.availableOccupancyType.map(
              (occupancyType, index) => (
                <div
                  key={index}
                  className="py-2 px-4 shadow-sm hover:shadow-2xl rounded-md w-full md:w-xs  bg-secondary cursor-pointer"
                >
                  <p className="text-primary font-semibold">
                    {PGOccupancyTypeEnumMap[occupancyType]}
                  </p>
                  {occupancyType === "singleSharing" && (
                    <p>
                      Starting From ₹
                      {payingGuestInfo.singleSharingPrice.toNumber()}/month
                    </p>
                  )}
                  {occupancyType === "doubleSharing" && (
                    <p>
                      Starting From ₹
                      {payingGuestInfo.doubleSharingPrice.toNumber()}
                      /month
                    </p>
                  )}
                  {occupancyType === "tripleSharing" && (
                    <p>
                      Starting From ₹
                      {payingGuestInfo.trippleShareingPrice.toNumber()}/month
                    </p>
                  )}
                </div>
              )
            )}
          </div>
        </div>
        <div id="amenities" className="flex flex-col gap-2">
          <h3 className="text-lg  font-medium">Amenities</h3>
          <div className="flex flex-row gap-2 flex-wrap">
            {payingGuestInfo.amenities.map((amenity, index) => (
              <PayingGuestAmenitiesCard key={index} amenity={amenity} />
            ))}
          </div>
        </div>

        <div id="food-availability" className="flex flex-col gap-2">
          <h3 className="text-lg font-medium ">Food Availability</h3>
          <div className="bg-secondary px-4 rounded-md py-2 flex flex-row gap-2 w-fit shadow-sm hover:shadow-2xl cursor-pointer">
            {PGMealsEnumMap[payingGuestInfo.meals]}
          </div>
        </div>
        <div id="host-details" className="flex flex-col gap-2">
          <h3 className="text-lg font-medium ">Host Details</h3>
          <div className="bg-secondary flex flex-row items-center gap-2 w-full md:w-xs rounded-md px-4 py-2 shadow-sm hover:shadow-2xl">
            <Avatar className=" size-10">
              <AvatarFallback>
                {getInitials(payingGuestInfo.user.name)}
              </AvatarFallback>
              {payingGuestInfo.user.image && (
                <AvatarImage src={payingGuestInfo.user.image}></AvatarImage>
              )}
            </Avatar>
            <div className="flex flex-col gap-2 cursor-pointer">
              <p className="font-semibold">{payingGuestInfo.user.name}</p>
              <div className="flex flex-row gap-2">
                <Button size={"icon"} variant={"outline"} className="size-8">
                  <Send size={16} />
                </Button>
                <Button size={"icon"} variant={"outline"} className="size-8">
                  <PhoneCall size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div id="terms-and-conditions" className=" flex flex-col gap-2">
          <h3 className="text-lg font-medium ">
            Terms and Conditions of Property
          </h3>
          <div>
            <Button asChild variant={"secondary"}>
              <Link href={`/paying-guest/details/${id}/house-rules`}>
                House Rules <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayingGuestDetailsPage;
