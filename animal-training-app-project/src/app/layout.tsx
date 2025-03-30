import type { Metadata } from "next";
import "./globals.css";
import { UserProvider } from '@/context/UserContext';
// import navbar later and add it into the main component


export const metadata: Metadata = {
  title: "Animal Training App",
  description: "BOG Project 2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">

          <UserProvider>
            <main>
              {children}
            </main>
          </UserProvider>
      </body>
    </html>
  );
}
