"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera } from "lucide-react";
import { useForm } from "react-hook-form";

import { createPGSchema, PGFormData } from "@/constants/PgTypes";
import usePGRegistarationService from "@/hooks/client-hooks/usePgRegistrationService";

import Address from "@/components/paying-guest/registration/Address";
import AmenitiesPreferences from "@/components/paying-guest/registration/Amenities-Preferences";
import BasicInfo from "@/components/paying-guest/registration/Basic-Info";
import OccupancyPolicy from "@/components/paying-guest/registration/Occupancy-Policy";
import { SectionHeader } from "@/components/paying-guest/registration/Section-Header";
import Verification from "@/components/paying-guest/registration/Verification";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function PGRegisterPage() {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
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
            <BasicInfo form={form} />

            {/* Occupancy & Policies */}
            <OccupancyPolicy form={form} />

            {/* Amenities & Preferences */}
            <AmenitiesPreferences form={form} />

            {/* Verification */}
            <Verification form={form} />

            {/* Address */}
            <Address form={form} />
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
                            onChange={(e) => {
                              const files = Array.from(e.target.files || []);
                              field.onChange(files);
                              const previews = files.map((file) =>
                                URL.createObjectURL(file)
                              );
                              setImagePreviews((prev) => [
                                ...prev,
                                ...previews,
                              ]);
                            }}
                          />
                          <label
                            htmlFor="image-upload"
                            className="cursor-pointer"
                          >
                            <div className="text-lg font-medium text-gray-900 mb-2">
                              Upload Property Images
                            </div>
                            <div className="text-sm text-gray-600 mb-4">
                              Drag and drop your images here, or &nbsp;
                              <span className="text-blue-600 font-medium hover:text-blue-700">
                                browse
                              </span>
                            </div>
                            <div className="text-xs text-gray-500">
                              PNG, JPG, JPEG up to 10MB each • Minimum 3 images
                              recommended
                            </div>
                          </label>
                          {imagePreviews.length > 0 && (
                            <div className="mt-4 grid grid-cols-3 gap-4">
                              {imagePreviews.map((src, index) => (
                                <img
                                  key={index}
                                  src={src}
                                  alt={`Preview ${index + 1}`}
                                  className="w-full h-32 object-cover rounded-lg"
                                />
                              ))}
                            </div>
                          )}
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
