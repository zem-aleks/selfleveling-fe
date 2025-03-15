import AuthContextProvider from "@/modules/auth/contexts/AuthContext";

export const metadata = {
  title: "Selfleveling.ai",
  description: "",
};

import "../globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
