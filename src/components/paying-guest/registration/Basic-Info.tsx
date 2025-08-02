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
import { IndianRupee } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { SectionHeader } from "./Section-Header";

interface BasicInfoProps {
  form: UseFormReturn<PGFormData>;
}

const BasicInfo = ({ form }: BasicInfoProps) => {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-8">
        <SectionHeader
          title="Basic Information"
          subtitle="Tell us about your property"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <FormField
            control={form.control}
            name="propertyName"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Property Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Sunrise PG"
                    className={`h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 `}
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
            name="startingPrice"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Starting Price (₹/month)
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="number"
                      placeholder="e.g., ₹5000/-"
                      className="h-12 pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      {...field}
                    />
                  </div>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="floors"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Number of Floors
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="e.g., 3"
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
            name="operatingSince"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Operating Since
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="e.g., 2020"
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
            name="noticePeriodInDays"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Notice Period (Days)
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="e.g., 30 Days"
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
      </CardContent>
    </Card>
  );
};

export default BasicInfo;
