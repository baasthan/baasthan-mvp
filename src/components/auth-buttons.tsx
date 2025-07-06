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
          <Button size={"icon"} asChild className=" cursor-pointer">
            <Avatar>
              {data.user.image && <AvatarImage src={data.user.image} />}
              <AvatarFallback className="bg-primary text-primary-foreground">
                {getInitials(data.user.name)}
              </AvatarFallback>
            </Avatar>
          </Button>
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
