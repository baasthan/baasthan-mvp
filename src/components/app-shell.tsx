"use client";

import { Toaster } from "@/components/ui/sonner";
import Footer from "./footer";
import Header from "./header";

interface AppShellProps {
  children: React.ReactNode;
}

const AppShell = ({ children }: AppShellProps) => {
  return (
    <>
      <Header />
      <Toaster position="top-right" />
      <main className="mx-auto pt-16 w-full flex-1 bg-white min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default AppShell;
