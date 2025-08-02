import { Card, CardContent } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Checkbox } from "@/components/ui/checkbox";
import { PGFormData } from "@/constants/PgTypes";
import { UseFormReturn } from "react-hook-form";
import { SectionHeader } from "./Section-Header";

interface VerificationProps {
  form: UseFormReturn<PGFormData>;
}

const Verification = ({ form }: VerificationProps) => {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-8">
        <SectionHeader
          title="Verification & Registration"
          subtitle="Build trust with verified credentials"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="reraRegistered"
            render={({ field, fieldState }) => (
              <FormItem>
                <div className="flex items-start space-x-3 p-6 border-2 border-gray-200 rounded-xl hover:border-gray-300 transition-colors">
                  <Checkbox
                    id="reraRegistered"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <FormLabel
                      htmlFor="reraRegistered"
                      className="text-base font-medium text-gray-900 cursor-pointer"
                    >
                      RERA Registered
                    </FormLabel>
                    <p className="text-sm text-gray-600 mt-1">
                      Registered under Real Estate Regulatory Authority
                    </p>
                  </div>
                </div>
              </FormItem>
            )}
          />
        </div>

        {form.watch("reraRegistered") && (
          <div className="mt-6">
            <FormField
              control={form.control}
              name="reraRegistrationNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    RERA Registration Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter RERA Registration Number"
                      className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Verification;
