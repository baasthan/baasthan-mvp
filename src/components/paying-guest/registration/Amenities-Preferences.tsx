import { Card, CardContent } from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PGAmenitiesEnumMap } from "@/constants/PGAmenitiesType";
import { PGPreferedTenantsEnumMap } from "@/constants/PGPreferedTenantsType";
import { PGFormData } from "@/constants/PgTypes";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { UseFormReturn } from "react-hook-form";
import {
  PGAmenitiesEnum,
  PGPreferedTenantsEnum,
} from "../../../../prisma/generated/prisma";
import { renderCheckboxGroup } from "./Checkbox-Group";
import { SectionHeader } from "./Section-Header";

interface AmenitiesPreferencesProps {
  form: UseFormReturn<PGFormData>;
}

const AmenitiesPreferences = ({ form }: AmenitiesPreferencesProps) => {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-8">
        <SectionHeader
          title="Amenities & Tenant Preferences"
          subtitle="What facilities do you offer?"
        />

        <div className="space-y-8">
          <FormField
            control={form.control}
            name="amenities"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-base font-medium text-gray-900 mb-4 block">
                  Available Amenities
                </FormLabel>
                {renderCheckboxGroup(
                  Object.values(PGAmenitiesEnum),
                  field.value,
                  field.onChange,
                  PGAmenitiesEnumMap,
                  "amenity"
                )}
                {fieldState.error ? (
                  <FormMessage />
                ) : (
                  <p className="text-sm">&nbsp;</p>
                )}
              </FormItem>
            )}
          />

          <Separator className="my-8" />

          <FormField
            control={form.control}
            name="preferedTenants"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-base font-medium text-gray-900 mb-4 block">
                  Preferred Tenants
                </FormLabel>
                {renderCheckboxGroup(
                  Object.values(PGPreferedTenantsEnum),
                  field.value,
                  field.onChange,
                  PGPreferedTenantsEnumMap,
                  "tenant"
                )}
                {fieldState.error ? (
                  <FormMessage />
                ) : (
                  <p className="text-sm">&nbsp;</p>
                )}
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AmenitiesPreferences;
