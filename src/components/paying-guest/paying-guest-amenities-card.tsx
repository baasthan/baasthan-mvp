import { PGAmenitiesEnumMap } from "@/constants/PGAmenitiesType";
import { PayingGuestInfoWithPublicUser } from "@/types/paying-guest";
import {
  AirVent,
  Bike,
  CarFront,
  Dumbbell,
  ShieldCheck,
  WashingMachine,
  Wifi,
} from "lucide-react";
import { PGAmenitiesEnum } from "../../../prisma/generated/prisma";

interface PayingGuestAmenitiesCardProps {
  amenity: PayingGuestInfoWithPublicUser["amenities"][number];
}
const PayingGuestAmenitiesCard = ({
  amenity,
}: PayingGuestAmenitiesCardProps) => {
  const getIcon = () => {
    if (amenity === PGAmenitiesEnum.ac) {
      return <AirVent size={16} />;
    }
    if (amenity === PGAmenitiesEnum.carParking) {
      return <CarFront size={16} />;
    }
    if (amenity === PGAmenitiesEnum.bikeParking) {
      return <Bike size={16} />;
    }
    if (amenity === PGAmenitiesEnum.gym) {
      return <Dumbbell size={16} />;
    }
    if (amenity === PGAmenitiesEnum.laundary) {
      return <WashingMachine size={16} />;
    }
    if (amenity === PGAmenitiesEnum.wifi) {
      return <Wifi size={16} />;
    }
    if (amenity === PGAmenitiesEnum.security) {
      return <ShieldCheck size={16} />;
    }
    return null;
  };
  return (
    <div className="bg-secondary rounded-md px-4 py-2 flex flex-row items-center shadow-sm hover:shadow-2xl gap-2 cursor-pointer">
      {getIcon()}
      <p>{PGAmenitiesEnumMap[amenity]}</p>
    </div>
  );
};

export default PayingGuestAmenitiesCard;
