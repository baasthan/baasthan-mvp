import { Card, CardContent } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PGGenderPolicyEnumMap } from "@/constants/PGGenderPolicyType";
import { PGMealsEnumMap } from "@/constants/PGMeals";
import { PGOccupancyTypeEnumMap } from "@/constants/PGOccupancyType";
import { PGFormData } from "@/constants/PgTypes";
import { PGWashroomEnumMap } from "@/constants/PGWashroomType";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { UseFormReturn } from "react-hook-form";
import {
  PGGenderPolicyEnum,
  PGMealsEnum,
  PGOccupancyTypeEnum,
  PGWashroomEnum,
} from "../../../../prisma/generated/prisma";
import { renderCheckboxGroup } from "./Checkbox-Group";
import { SectionHeader } from "./Section-Header";

interface OccupancyPolicyProps {
  form: UseFormReturn<PGFormData>;
}

const OccupancyPolicy = ({ form }: OccupancyPolicyProps) => {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-8">
        <SectionHeader
          title="Occupancy & Policies"
          subtitle="Define your accommodation rules"
        />

        <div className="space-y-8">
          <FormField
            control={form.control}
            name="availableOccupancyType"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-base font-medium text-gray-900 mb-4 block">
                  Available Occupancy Types
                </FormLabel>
                {renderCheckboxGroup(
                  Object.values(PGOccupancyTypeEnum),
                  field.value,
                  field.onChange,
                  PGOccupancyTypeEnumMap,
                  "occupancy"
                )}

                {fieldState.error ? (
                  <FormMessage />
                ) : (
                  <p className="text-sm">&nbsp;</p>
                )}
              </FormItem>
            )}
          />

          <div className="grid grid-cols-3 gap-3">
            <div>
              {form
                .watch("availableOccupancyType")
                .includes("singleSharing") && (
                <FormField
                  control={form.control}
                  name="singleSharingPrice"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Enter Cost for Single Sharing</FormLabel>
                      <Input
                        type="number"
                        {...field}
                        placeholder="Enter amount"
                      />
                      {fieldState.error ? (
                        <FormMessage />
                      ) : (
                        <p className="text-sm">&nbsp;</p>
                      )}
                    </FormItem>
                  )}
                />
              )}
            </div>
            <div>
              {form
                .watch("availableOccupancyType")
                .includes("doubleSharing") && (
                <FormField
                  control={form.control}
                  name="doubleSharingPrice"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Enter Cost for Double Sharing</FormLabel>
                      <Input
                        type="number"
                        {...field}
                        placeholder="Enter amount"
                      />
                      {fieldState.error ? (
                        <FormMessage />
                      ) : (
                        <p className="text-sm">&nbsp;</p>
                      )}
                    </FormItem>
                  )}
                />
              )}
            </div>
            <div>
              {form
                .watch("availableOccupancyType")
                .includes("tripleSharing") && (
                <FormField
                  control={form.control}
                  name="trippleShareingPrice"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Enter Cost for Triple Sharing</FormLabel>
                      <Input
                        type="number"
                        {...field}
                        placeholder="Enter amount"
                      />
                      {fieldState.error ? (
                        <FormMessage />
                      ) : (
                        <p className="text-sm">&nbsp;</p>
                      )}
                    </FormItem>
                  )}
                />
              )}
            </div>
          </div>

          <Separator className="my-8" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="genderPolicy"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Gender Policy
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="h-12! border-gray-300 focus:border-blue-500 focus:ring-blue-500 w-full">
                        <SelectValue placeholder="Select policy" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(PGGenderPolicyEnum).map((val) => (
                          <SelectItem key={val} value={val}>
                            {PGGenderPolicyEnumMap[val]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
              name="washroomType"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Washroom Type
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="h-12! border-gray-300 focus:border-blue-500 focus:ring-blue-500 w-full">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(PGWashroomEnum).map((val) => (
                          <SelectItem key={val} value={val}>
                            {PGWashroomEnumMap[val]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
              name="meals"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Meals Policy
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="h-12! border-gray-300 focus:border-blue-500 focus:ring-blue-500 w-full">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(PGMealsEnum).map((val) => (
                          <SelectItem key={val} value={val}>
                            {PGMealsEnumMap[val]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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

export default OccupancyPolicy;
