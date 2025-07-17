import AppShell from "@/components/app-shell";
import "./globals.css";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Baasthan", template: "%s | Baasthan" },
  applicationName: "Baasthan",
  description:
    "Baasthan helps students and professionals find affordable, verified PGs and rentals through a smart, hassle-free digital housing platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased `}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
