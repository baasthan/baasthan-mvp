"use client";
import useInterestedPGHostsService from "@/hooks/client-hooks/useInterestedPGHostsService";
import { useSession } from "@/lib/auth-client";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import z from "zod";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type ShareDetailsProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const ShareDetails = ({ open, onOpenChange }: ShareDetailsProps) => {
  const { data, isPending } = useSession();

  const [email, setEmail] = useState<string>("");
  const [disableEmailFiled, setDisableEmailField] = useState<boolean>(false);
  const [mobileNumber, setMobileNumber] = useState<string>("");

  const {
    data: response,
    execute,
    isSuccess,
    isLoading,
    error,
    resetService,
  } = useInterestedPGHostsService();

  useEffect(() => {
    if (!isPending && data && data.user) {
      setEmail(data.user.email);
      setDisableEmailField(true);
    }
  }, [isPending, data]);

  useEffect(() => {
    setTimeout(() => {
      if (onOpenChange) onOpenChange(false);
    }, 2200);
  }, [isSuccess]);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {!open && !onOpenChange && (
        <DialogTrigger asChild>
          <Button className="w-full md:w-fit">Share Details</Button>
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share your contact details</DialogTitle>
        </DialogHeader>
        <div className=" grid gap-2">
          <Label>Email</Label>

          <Input
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            placeholder="Enter Email Address"
            type="email"
            disabled={disableEmailFiled}
          />
        </div>
        <div className=" grid gap-2">
          <Label>Mobile Number</Label>
          <Input
            value={mobileNumber}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMobileNumber(e.target.value)
            }
            placeholder="Enter Mobile Number"
            type="tel"
          />
        </div>
        <DialogFooter className="flex flex-col gap-4">
          <div
            className={`${
              response?.success ? "text-green-500" : "text-destructive"
            }`}
          >
            {response?.message ?? ""}
          </div>

          <div className="flex flex-row gap-4">
            <DialogClose asChild>
              <Button
                variant="outline"
                onClick={() => {
                  setDisableEmailField(false);
                  setEmail("");
                  setMobileNumber("");
                  resetService();
                }}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={() => {
                execute({ email, mobileNumber });
              }}
              disabled={
                isLoading ||
                !z.string().email().safeParse(email).success ||
                !z
                  .string()
                  .regex(/^[6-9]\d{9}$/)
                  .safeParse(mobileNumber).success
              }
            >
              {isLoading && <LoaderCircle />}
              Share Contact
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDetails;
