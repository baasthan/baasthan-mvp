"use client";
import { PayingGuestInfoWithPublicUser } from "@/types/paying-guest";
import { useEffect, useState } from "react";

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
    <div className="relative w-sm h-48 overflow-hidden">
      {images.map((image, index) => (
        <img
          key={image.id}
          src={image.url}
          className={`absolute w-full h-full object-cover object-center transition-opacity group-hover:scale-105 duration-200 ${
            currentImageIndex !== index ? "opacity-0 -z-10" : "opacity-100"
          }`}
          alt={""}
        />
      ))}
    </div>
  );
};

export default PayingGuestImageCarosel;
