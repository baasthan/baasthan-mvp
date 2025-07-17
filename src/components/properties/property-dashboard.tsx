"use client";
import { PropertyInfoSelected } from "@/repository/properties";
import { Button } from "../ui/button";

interface PropertyDashboardProps {
  ownProperties: PropertyInfoSelected[];
}

const PropertyDashboard = ({ ownProperties }: PropertyDashboardProps) => {
  const handlePostNewProperty = async () => {};

  return (
    <>
      <div className="flex justify-end">
        <Button onClick={handlePostNewProperty}>Post New Property</Button>
      </div>
      <div>
        {ownProperties.map((property) => (
          <></>
          // <PropertyCards
          //   key={property.id}
          //   id={property.id}
          //   name={property.name}
          //   location={property.Location?.name ?? "Unknown"}
          //   price={`₹${property.minPrice}`}
          //   rating={property.Reviews?.length ?? 0}
          //   reviews={property.Reviews?.length ?? 0}
          //   image={property.PropertyImages?.[0]?.url ?? "/placeholder.svg"}
          //   amenities={property.PropertyAmenities?.map((a) => a.amenityName) ?? []}
          //   type={property.type}
          //   verified={property.verified}
          //   liked={false}
          // />
        ))}
      </div>
    </>
  );
};

export default PropertyDashboard;
