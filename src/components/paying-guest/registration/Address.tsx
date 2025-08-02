import { Card, CardContent } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PGFormData } from "@/constants/PgTypes";
import { UseFormReturn } from "react-hook-form";
import { SectionHeader } from "./Section-Header";

interface AddressProps {
  form: UseFormReturn<PGFormData>;
}

const Address = ({ form }: AddressProps) => {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-8">
        <SectionHeader
          title="Property Address"
          subtitle="Where is your property located?"
        />

        <div className="space-y-6">
          <FormField
            control={form.control}
            name="addressLine1"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Address Line 1
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="House/Building number, Street name"
                    className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    {...field}
                  />
                </FormControl>
                {fieldState.error ? (
                  <FormMessage />
                ) : (
                  <p className="text-sm">&nbsp;</p>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="addressLine2"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Address Line 2 (Optional)
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Landmark, Area"
                    className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    {...field}
                  />
                </FormControl>
                {fieldState.error ? (
                  <FormMessage />
                ) : (
                  <p className="text-sm">&nbsp;</p>
                )}
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="locality"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Locality
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Locality/Neighborhood"
                      className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      {...field}
                    />
                  </FormControl>
                  {fieldState.error ? (
                    <FormMessage />
                  ) : (
                    <p className="text-sm">&nbsp;</p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    City
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="City"
                      className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      {...field}
                    />
                  </FormControl>
                  {fieldState.error ? (
                    <FormMessage />
                  ) : (
                    <p className="text-sm">&nbsp;</p>
                  )}
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FormField
              control={form.control}
              name="district"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    District
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="District"
                      className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      {...field}
                    />
                  </FormControl>
                  {fieldState.error ? (
                    <FormMessage />
                  ) : (
                    <p className="text-sm">&nbsp;</p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    State
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="State"
                      className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      {...field}
                    />
                  </FormControl>
                  {fieldState.error ? (
                    <FormMessage />
                  ) : (
                    <p className="text-sm">&nbsp;</p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Country
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Country"
                      className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      {...field}
                    />
                  </FormControl>
                  {fieldState.error ? (
                    <FormMessage />
                  ) : (
                    <p className="text-sm">&nbsp;</p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pincode"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Pincode
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="123456"
                      className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      {...field}
                    />
                  </FormControl>
                  {fieldState.error ? (
                    <FormMessage />
                  ) : (
                    <p className="text-sm">&nbsp;</p>
                  )}
                </FormItem>
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Address;
