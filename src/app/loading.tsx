"use client";
import Image from "next/image";
import { useEffect } from "react";

const Loading = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <div className="relative w-20 aspect-square animate-pulse">
        <Image src={"/logo.svg"} fill alt="Loading" />
      </div>
    </div>
  );
};

export default Loading;
