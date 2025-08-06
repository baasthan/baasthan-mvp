"use client";
import { PayingGuestInfoWithPublicUser } from "@/types/paying-guest";
import Image from "next/image";

interface PayingGuestDetailsImageProps {
  images: PayingGuestInfoWithPublicUser["PayingGuestImages"];
}

const PayingGuestDetailsImage = ({ images }: PayingGuestDetailsImageProps) => {
  return (
    <div className={`flex flex-row gap-2 overflow-auto px-2`}>
      {images.map((img) => (
        <div
          key={img.id}
          className="relative  rounded-md aspect-video min-w-full md:min-w-xl  overflow-hidden "
        >
          <Image
            src={img.url}
            alt=""
            fill
            className="w-full h-auto object-cover shadow-2xl"
          />
        </div>
      ))}
    </div>
  );
};

export default PayingGuestDetailsImage;
