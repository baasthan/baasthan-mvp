"use client";
import ShareDetails from "@/components/share-details";
import { redirect } from "next/navigation";

const page = () => {
  return (
    <ShareDetails
      open
      onOpenChange={(open) => {
        if (!open) {
          redirect("/");
        }
      }}
    />
  );
};

export default page;
