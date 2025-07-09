import {
  AirVent,
  Camera,
  CookingPot,
  Droplets,
  Dumbbell,
  Heart,
  MessageCircle,
  Share,
  Wifi,
} from "lucide-react";
import { Button } from "./ui/button";
import Pill from "./ui/pill";
import Typography from "./ui/typography";

interface Aminity {
  name: string;
}
interface PropertyCardProps {
  id: string;
  name: string;
  locationText: string;
  aminities?: Aminity[];
  minPrice: number;
}
const PropertyCard = ({
  name,
  locationText,
  minPrice,
  aminities,
  id,
}: PropertyCardProps) => {
  return (
    <div className="rounded-2xl  hover:shadow-2xl overflow-clip min-w-xs">
      <div className="relative">
        <img
          src={`https://placehold.co/600x400?text=${encodeURIComponent(name)}`}
        />
        <div className="absolute top-0 right-0 flex flex-row p-2">
          <Button size={"icon"} variant={"ghost"}>
            <Heart />
          </Button>
          <Button size={"icon"} variant={"ghost"}>
            <Share />
          </Button>
        </div>
      </div>
      <div className="bg-accent p-2 flex flex-col gap-4">
        <div>
          <Typography.large>{name}</Typography.large>
          <Typography.small className="text-muted-foreground">
            Starting from <span className="font-bold">Rs.{minPrice}/month</span>
          </Typography.small>
        </div>
        <div className="flex flex-row gap-2 flex-wrap">
          <Pill icon={Wifi}>Wifi</Pill>
          <Pill icon={Dumbbell}>Gym</Pill>
          <Pill icon={CookingPot}>North-Indian Foods</Pill>
          <Pill icon={Droplets}>Hot-Water</Pill>
          <Pill icon={AirVent}>Air Conditioning</Pill>
        </div>
        <div className="flex flex-row justify-between gap-2">
          <div className="flex gap-2">
            <Button variant={"outline"}>
              <MessageCircle />
              Chat
            </Button>
            <Button variant={"outline"}>
              <Camera />
              Tour
            </Button>
          </div>
          <Button>Book Now</Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
