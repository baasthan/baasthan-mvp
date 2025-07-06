"use client";

import { TabsList } from "@radix-ui/react-tabs";
import { useState } from "react";
import SignIn from "./sign-in";
import SignUp from "./sign-up";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Tabs, TabsContent, TabsTrigger } from "./ui/tabs";

const AuthButtons = () => {
  const [openAuthDialog, setOpenAuthDialog] = useState<boolean>(false);
  return (
    <>
      <Dialog modal open={openAuthDialog} onOpenChange={setOpenAuthDialog}>
        <DialogTrigger asChild>
          <Button>Sign In / Login</Button>
        </DialogTrigger>

        <Tabs>
          <DialogContent showCloseButton={false}>
            <DialogHeader>
              <DialogTitle className="flex flex-row justify-between">
                <TabsList className="bg-secondary rounded-full">
                  <TabsTrigger value="sign-in">Sign In</TabsTrigger>
                  <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
                </TabsList>
                <DialogClose asChild>
                  <Button variant={"ghost"}>X</Button>
                </DialogClose>
              </DialogTitle>
            </DialogHeader>
            <DialogDescription>
              <TabsContent value="sign-in">
                <SignIn />
              </TabsContent>
              <TabsContent value="sign-up">
                <SignUp />
              </TabsContent>
            </DialogDescription>
          </DialogContent>
        </Tabs>
      </Dialog>
    </>
  );
};

export default AuthButtons;
