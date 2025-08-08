"use client";
import useSendSupportRequest from "@/hooks/client-hooks/useSendSupportRequest";
import { useSession } from "@/lib/auth-client";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import z from "zod";

import { SupportReasonEnumMap } from "@/constants/SupportReason";
import { SupportReasonEnum } from "../../prisma/generated/prisma";
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
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

type ShareDetailsProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const ShareDetails = ({ open, onOpenChange }: ShareDetailsProps) => {
  const { data, isPending, refetch } = useSession();

  const [email, setEmail] = useState<string>("");
  const [disableEmailFiled, setDisableEmailField] = useState<boolean>(false);
  const [mobileNumber, setMobileNumber] = useState<string>("");

  const [supportReason, setSupportReason] = useState<SupportReasonEnum>();

  const {
    data: response,
    execute,
    isSuccess,
    isLoading,
    error,
    resetService,
  } = useSendSupportRequest();

  useEffect(() => {
    if (open === false) {
      if (!data) {
        setEmail("");
      }
      setMobileNumber("");
      setSupportReason("hosting");
      resetService();
    }
  }, [open]);

  useEffect(() => {
    if (!isPending && data && data.user) {
      setEmail(data.user.email);
      setDisableEmailField(true);
    }
  }, [isPending, data]);

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        if (onOpenChange) {
          onOpenChange(false);
        }
      }, 2200);
    }
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
        <div className="grid gap-2">
          <Label>Reason</Label>
          <RadioGroup
            className="grid gap-2 grid-cols-3"
            value={supportReason}
            defaultValue={SupportReasonEnum.hosting}
            onValueChange={(value: SupportReasonEnum) => {
              console.log(value);
              setSupportReason(value);
            }}
          >
            {(
              Object.keys(SupportReasonEnum) as Array<
                keyof typeof SupportReasonEnum
              >
            ).map((reason) => (
              <Label key={reason}>
                <RadioGroupItem value={reason} />
                {SupportReasonEnumMap[reason]}
              </Label>
            ))}
          </RadioGroup>
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
                execute({ email, mobileNumber, reason: supportReason });
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
