"use client";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";

const HeaderSwitch = () => {
  const [activeTab, setActiveTab] = useState<1 | 2>(1);

  return (
    <div className="relative flex flex-row rounded-full bg-accent p-1 transition-all w-fit border">
      {/* Animated Background */}
      <div
        className={clsx(
          "absolute top-1 left-1 h-[calc(100%-0.5rem)] w-1/2 rounded-full bg-primary transition-all duration-300 ease-in-out z-0",
          activeTab === 2 && "translate-x-full"
        )}
      />

      {/* Tabs */}
      <Link
        href="/"
        className={clsx(
          "relative z-10 w-24 text-center rounded-full p-2 transition-all",
          activeTab === 1 ? "text-primary-foreground" : "text-accent-foreground"
        )}
        onClick={() => setActiveTab(1)}
      >
        Properties
      </Link>
      <Link
        href="/"
        className={clsx(
          "relative z-10 w-24 text-center rounded-full p-2 transition-all",
          activeTab === 2 ? "text-primary-foreground" : "text-accent-foreground"
        )}
        onClick={() => setActiveTab(2)}
      >
        Venues
      </Link>
    </div>
  );
};

export default HeaderSwitch;
