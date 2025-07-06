"use client";

import { signOut, useSession } from "@/lib/auth-client";
import getInitials from "@/utils/getInitials";

import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SignIn from "./sign-in";
import SignUp from "./sign-up";
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
import Typography from "./ui/typography";

const AuthButtons = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState<boolean>(
    searchParams.get("sign-in-prompt") === "true" || false
  );

  const { data, isPending } = useSession();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (data && data.user) {
      setOpenDialog(false);
      if (searchParams.get("sign-in-prompt") === "true") {
        params.delete("sign-in-prompt");
        router.replace(`?${params.toString()}`);
      }
    }
  }, [data, isPending, router, searchParams]);

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
          <Avatar>
            {data.user.image && <AvatarImage src={data.user.image} />}
            <AvatarFallback className="bg-primary text-primary-foreground">
              {getInitials(data.user.name)}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
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
                <Typography.p>{data.user.name}</Typography.p>
                <Button variant={"link"} asChild>
                  <Link href="/profile">View Profile</Link>
                </Button>
              </div>
            </div>
          </DropdownMenuGroup>

          <Button
            variant="destructive"
            className="w-full"
            onClick={() => signOut()}
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
        }}
      >
        <DialogTrigger asChild>
          <Button>Sign In / Login</Button>
        </DialogTrigger>

        <Tabs defaultValue="sign-in">
          <DialogContent showCloseButton={false}>
            <DialogHeader>
              <DialogTitle className="flex flex-row justify-between">
                <TabsList className=" border rounded-full">
                  <TabsTrigger value="sign-in">Sign In</TabsTrigger>
                  <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
                </TabsList>
                <DialogClose asChild>
                  <Button variant={"ghost"}>X</Button>
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
