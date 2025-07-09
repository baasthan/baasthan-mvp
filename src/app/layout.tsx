import * as React from "react";

import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import { APP_CONFIG } from "@/config";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: APP_CONFIG.NAME, template: "%s | Baasthan" },
  description: APP_CONFIG.DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex flex-col antialiased bg-linear-to-tr from-[#4c4ddc]/30 to-[transparent]`}
      >
        <Header />
        <Toaster />
        <main className="py-2 flex flex-1">{children}</main>
        <footer></footer>
      </body>
    </html>
  );
}
