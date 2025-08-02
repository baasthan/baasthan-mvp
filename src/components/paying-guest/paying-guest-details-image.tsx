import { PayingGuestInfoWithPublicUser } from "@/types/paying-guest";
import Image from "next/image";
import { Button } from "../ui/button";

interface PayingGuestDetailsImageProps {
  images: PayingGuestInfoWithPublicUser["PayingGuestImages"];
}
const PayingGuestDetailsImage = ({ images }: PayingGuestDetailsImageProps) => {
  if (images.length === 0) {
    return (
      <div
        className="min-h-1/3 aspect-video rounded-2xl flex flex-col
       justify-center items-center outline "
      >
        <h3 className="text-xl text-muted-foreground">
          No Images found for this property
        </h3>
        <h4 className="text-lg text-muted-foreground">Please contact owner</h4>
      </div>
    );
  }
  if (images.length === 1) {
    return (
      <div className="relative aspect-video">
        <Image src={images[0].url} alt={""} fill />
      </div>
    );
  }
  return (
    <div className="relative flex flex-row gap-2">
      <Button className="absolute bottom-0 right-0 m-4 z-10">View All</Button>
      <div className="relative aspect-video flex-1/2 rounded-2xl overflow-hidden">
        <Image
          src={images[0].url}
          alt=""
          fill
          className="h-full object-cover hover:scale-[1.05]"
        />
      </div>
      <div className=" flex flex-col flex-1/2 h-1/3 gap-2">
        {images.slice(1).map((image) => (
          <div
            key={image.id}
            className=" relative aspect-video h-1/3 rounded-2xl overflow-hidden"
          >
            <Image
              src={image.url}
              alt=""
              fill
              className="h-full object-cover hover:scale-[1.05]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PayingGuestDetailsImage;
