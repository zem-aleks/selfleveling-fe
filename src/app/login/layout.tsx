import AuthContextProvider from '@/modules/auth/contexts/AuthContext';
import { Toaster } from '@/ui/sonner';

import '../globals.css';

export const metadata = {
  title: 'Selfleveling.ai',
  description: '',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Toaster />
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
