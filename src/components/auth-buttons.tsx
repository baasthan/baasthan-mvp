"use client";

import { APP_CONFIG, AUTH_CONFIG } from "@/config";
import { signOut, useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import getInitials from "@/utils/getInitials";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const SignIn = dynamic(() => import("./sign-in"), {
  loading: () => (
    <div className="flex justify-center p-4">
      <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"></div>
    </div>
  ),
});

const SignUp = dynamic(() => import("./sign-up"), {
  loading: () => (
    <div className="flex justify-center p-4">
      <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"></div>
    </div>
  ),
});

interface AuthButtonsProps {
  isMobile?: boolean;
  onActionComplete?: () => void;
}

const AuthButtons = ({
  isMobile = false,
  onActionComplete,
}: AuthButtonsProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState<boolean>(
    searchParams.get(AUTH_CONFIG.SIGN_IN_PROMPT) === "true" || false
  );
  const [activeTab, setActiveTab] = useState<"sign-in" | "sign-up">("sign-in");

  const { data, isPending } = useSession();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (data && data.user) {
      setOpenDialog(false);
      if (searchParams.get(AUTH_CONFIG.SIGN_IN_PROMPT) === "true") {
        params.delete("sign-in-prompt");
        router.replace(`?${params.toString()}`);
      }
    }
  }, [data]);

  const handleSignOut = async () => {
    const currentUrl = window.location.href;
    const searchParams = new URLSearchParams();
    searchParams.set(AUTH_CONFIG.SIGN_IN_PROMPT, "true");
    searchParams.set("redirect", currentUrl);

    await signOut();

    setOpenDialog(true);
    router.push(`${APP_CONFIG.BASE_URL}/?${searchParams.toString()}`);
  };

  if (isPending) {
    return (
      <Avatar>
        <AvatarFallback></AvatarFallback>
      </Avatar>
    );
  }
  if (data && data.user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-11 w-11">
            {data.user.image && <AvatarImage src={data.user.image} />}
            <AvatarFallback className="bg-primary text-primary-foreground">
              {getInitials(data.user.name)}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className=" flex flex-col p-2 gap-4 bg-muted"
        >
          <DropdownMenuGroup>
            <div className="flex flex-row  items-center gap-2 p-2">
              <Avatar>
                {data.user.image && <AvatarImage src={data.user.image} />}
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {getInitials(data.user.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm text-muted-foreground">
                  {data.user.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {data.user.email}
                </p>
              </div>
            </div>
          </DropdownMenuGroup>
          <Button variant={"link"} asChild>
            <Link href="/profile">View Profile</Link>
          </Button>
          <Button
            variant="destructive"
            className="w-full"
            onClick={handleSignOut}
          >
            Sign out
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <>
      <Dialog
        modal
        open={openDialog}
        onOpenChange={(open) => {
          setOpenDialog(open);
          if (!open && onActionComplete) {
            onActionComplete();
          }
        }}
      >
        <DialogTrigger asChild>
          <Button
            variant="default"
            className={cn(
              "font-medium text-sm",
              isMobile && "w-full justify-center"
            )}
            onClick={() => setOpenDialog(true)}
          >
            Sign In / Create Account
          </Button>
        </DialogTrigger>

        <Tabs
          defaultValue={activeTab}
          value={activeTab}
          onValueChange={(value) =>
            setActiveTab(value as "sign-in" | "sign-up")
          }
        >
          <DialogContent showCloseButton={false}>
            <DialogHeader>
              <DialogTitle className="flex flex-row justify-between">
                <TabsList className="border rounded-full">
                  <TabsTrigger value="sign-in">Sign In</TabsTrigger>
                  <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
                </TabsList>
                <DialogClose asChild>
                  <Button variant={"ghost"} size="icon">
                    ✕
                  </Button>
                </DialogClose>
              </DialogTitle>
            </DialogHeader>

            <TabsContent value="sign-in">
              <SignIn />
            </TabsContent>
            <TabsContent value="sign-up">
              <SignUp />
            </TabsContent>
          </DialogContent>
        </Tabs>
      </Dialog>
    </>
  );
};

export default AuthButtons;
