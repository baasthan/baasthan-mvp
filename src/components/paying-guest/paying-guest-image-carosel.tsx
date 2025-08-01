"use client";
import { PayingGuestInfoWithPublicUser } from "@/types/paying-guest";
import { useEffect, useState } from "react";
import Image from "next/image";

interface PayingGuestImageCaroselProps {
  images: PayingGuestInfoWithPublicUser["PayingGuestImages"];
}
const PayingGuestImageCarosel = ({ images }: PayingGuestImageCaroselProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative aspect-square overflow-hidden">
      {images.map((image, index) => (
        <Image
          key={image.id}
          src={image.url}
          fill
          className={`absolute object-cover object-center transition-opacity group-hover:scale-105 duration-200 ${
            currentImageIndex !== index ? "opacity-0 -z-10" : "opacity-100"
          }`}
          alt={""}
        />
      ))}
    </div>
  );
};

export default PayingGuestImageCarosel;



