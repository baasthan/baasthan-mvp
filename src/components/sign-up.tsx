"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/auth-client";
import { Loader2, X } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import validator from "validator";

export default function SignUp() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitForm = async () => {
    if (validator.isEmpty(firstName) || validator.isEmpty(lastName)) {
      toast.error("First name and last name are required.");
      return;
    }
    if (!validator.isEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    await signUp.email({
      email,
      password,
      name: `${firstName} ${lastName}`,
      image: image ? await convertImageToBase64(image) : "",
      callbackURL: redirectUrl ?? "/",
      fetchOptions: {
        onResponse: () => {
          setLoading(false);
        },
        onRequest: () => {
          setLoading(true);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: async () => {
          router.push("/dashboard");
        },
      },
    });
  };

  const isFormValid = () => {
    return (
      !validator.isEmpty(firstName.trim()) &&
      !validator.isEmpty(lastName.trim()) &&
      validator.isEmail(email) &&
      !validator.isEmpty(password) &&
      password === passwordConfirmation
    );
  };

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="first-name">First name</Label>
          <Input
            id="first-name"
            placeholder="Max"
            required
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            value={firstName}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="last-name">Last name</Label>
          <Input
            id="last-name"
            placeholder="Robinson"
            required
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            value={lastName}
          />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="m@example.com"
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          placeholder="Password"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Confirm Password</Label>
        <Input
          id="password_confirmation"
          type="password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          autoComplete="new-password"
          placeholder="Confirm Password"
        />
      </div>
      {password &&
        passwordConfirmation &&
        password !== passwordConfirmation && (
          <p className="text-sm text-red-500 mt-1">Passwords do not match</p>
        )}
      <div className="grid gap-2">
        <Label htmlFor="image">Profile Image (optional)</Label>
        <div className="flex items-end gap-4">
          {imagePreview && (
            <div className="relative w-16 h-16 rounded-sm overflow-hidden">
              <Image
                src={imagePreview}
                alt="Profile preview"
                layout="fill"
                objectFit="cover"
              />
            </div>
          )}
          <div className="flex items-center gap-2 w-full">
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
            {imagePreview && (
              <X
                className="cursor-pointer"
                onClick={() => {
                  setImage(null);
                  setImagePreview(null);
                }}
              />
            )}
          </div>
        </div>
      </div>
      <Button
        type="submit"
        className="w-full"
        disabled={loading || !isFormValid()}
        onClick={submitForm}
      >
        {loading ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          "Create an account"
        )}
      </Button>
    </div>
  );
}

async function convertImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
