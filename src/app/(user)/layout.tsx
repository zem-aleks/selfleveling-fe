import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import AuthContextProvider from "@/modules/auth/contexts/AuthContext";
import { AuthGuard } from "@/modules/auth/guards/AuthGuard";
import { Toaster } from "@/ui/sonner";

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
        <Toaster />
        <AuthContextProvider>
          <AuthGuard>
            <div className="flex h-full w-full flex-col items-center justify-center">
              <div className="flex h-screen w-full max-w-2xl flex-col justify-center gap-4 pb-20">
                {children}
              </div>
            </div>
          </AuthGuard>
        </AuthContextProvider>
      </body>
    </html>
  );
}
