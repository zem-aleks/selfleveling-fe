import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import AuthContextProvider from "@/modules/auth/contexts/AuthContext";
import { AuthGuard } from "@/modules/auth/guards/AuthGuard";

import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Selfleveling.ai",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthContextProvider>
          <AuthGuard>{children}</AuthGuard>
        </AuthContextProvider>
      </body>
    </html>
  );
}
