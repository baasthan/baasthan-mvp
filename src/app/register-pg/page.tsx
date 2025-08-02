"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, IndianRupee } from "lucide-react";
import { useForm } from "react-hook-form";

import {
  PGAmenitiesEnum,
  PGGenderPolicyEnum,
  PGMealsEnum,
  PGOccupancyTypeEnum,
  PGPreferedTenantsEnum,
  PGWashroomEnum,
} from "../../../prisma/generated/prisma";

import { PGAmenitiesEnumMap } from "@/constants/PGAmenitiesType";
import { PGGenderPolicyEnumMap } from "@/constants/PGGenderPolicyType";
import { PGMealsEnumMap } from "@/constants/PGMeals";
import { PGOccupancyTypeEnumMap } from "@/constants/PGOccupancyType";
import { PGPreferedTenantsEnumMap } from "@/constants/PGPreferedTenantsType";
import { createPGSchema, PGFormData } from "@/constants/PgTypes";
import { PGWashroomEnumMap } from "@/constants/PGWashroomType";
import usePGRegistarationService from "@/hooks/client-hooks/usePgRegistrationService";

import { useEffect } from "react";
import { toast } from "react-toastify";

export default function PGRegisterPage() {
  const form = useForm<PGFormData>({
    resolver: zodResolver(createPGSchema),
    mode: "onChange",
    defaultValues: {
      reraRegistered: false,
      amenities: [],
      preferedTenants: [],
      availableOccupancyType: [],
    },
  });
  const {
    data: response,
    execute,
    isSuccess,
    isLoading,
    error,
  } = usePGRegistarationService();

  useEffect(() => {
    if (!isSuccess && error) {
      toast.error(error);
      console.log(`Error: ${error}`);
    } else if (isSuccess && response) {
      form.reset();
      toast.success(
        response && (response?.message || "Pg has been registered successfully")
      );
      console.log("Server response: ", response);
    }
  }, [response]);

  const onSubmit = async (data: PGFormData) => {
    await execute(data);
  };

  const renderCheckboxGroup = <T extends string>(
    options: T[],
    selected: T[] | undefined,
    onChange: (newVal: T[]) => void,
    enumMap: Record<T, string>,
    groupIdPrefix: string
  ) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {options.map((opt) => {
          const isChecked = selected?.includes(opt);
          return (
            <label
              key={opt}
              className={`
                relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                ${
                  isChecked
                    ? "border-blue-500 bg-blue-50 shadow-sm"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }
              `}
            >
              <Checkbox
                id={`${groupIdPrefix}-${opt}`}
                checked={isChecked}
                onCheckedChange={(checked) => {
                  const newValue = checked
                    ? [...(selected || []), opt]
                    : (selected || []).filter((val) => val !== opt);
                  onChange(newValue);
                }}
                className="mr-3"
              />
              <span className="text-sm font-medium text-gray-900">
                {enumMap[opt]}
              </span>
            </label>
          );
        })}
      </div>
    );
  };

  const SectionHeader = ({
    title,
    subtitle,
  }: {
    title: string;
    subtitle: string;
  }) => (
    <div className="flex items-center space-x-3 mb-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary-foreground mb-2">
              Register Your PG
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              List your paying guest accommodation and connect with potential
              tenants
            </p>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
            {/* Basic Information */}
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

            {/* Occupancy & Policies */}
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
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger className="h-12! border-gray-300 focus:border-blue-500 focus:ring-blue-500 w-full">
                                <SelectValue placeholder="Select policy" />
                              </SelectTrigger>
                              <SelectContent>
                                {Object.values(PGGenderPolicyEnum).map(
                                  (val) => (
                                    <SelectItem key={val} value={val}>
                                      {PGGenderPolicyEnumMap[val]}
                                    </SelectItem>
                                  )
                                )}
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
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
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
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
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

            {/* Amenities & Preferences */}
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

            {/* Verification */}
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

            {/* Address */}
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
                    render={({ field }) => (
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="addressLine2"
                    render={({ field }) => (
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="locality"
                      render={({ field }) => (
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
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
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
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <FormField
                      control={form.control}
                      name="district"
                      render={({ field }) => (
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
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
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
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
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
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="pincode"
                      render={({ field }) => (
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
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Images */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-8">
                <SectionHeader
                  title="Property Images"
                  subtitle="Showcase your property with high-quality photos"
                />

                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-200">
                          <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-2xl mx-auto mb-4">
                            <Camera className="h-8 w-8 text-gray-400" />
                          </div>
                          <Input
                            type="file"
                            multiple
                            accept="image/*"
                            className="hidden"
                            id="image-upload"
                            onChange={(e) => field.onChange(e.target.files)}
                          />
                          <label
                            htmlFor="image-upload"
                            className="cursor-pointer"
                          >
                            <div className="text-lg font-medium text-gray-900 mb-2">
                              Upload Property Images
                            </div>
                            <div className="text-sm text-gray-600 mb-4">
                              Drag and drop your images here, or{" "}
                              <span className="text-blue-600 font-medium hover:text-blue-700">
                                browse
                              </span>
                            </div>
                            <div className="text-xs text-gray-500">
                              PNG, JPG, JPEG up to 10MB each • Minimum 3 images
                              recommended
                            </div>
                          </label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex justify-center pt-8">
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={!form.formState.isValid || isLoading}
              >
                Register PG Property
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
