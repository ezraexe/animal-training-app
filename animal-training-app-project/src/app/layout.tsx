import type { Metadata } from "next";
import "./globals.css";
import { UserProvider } from '@/context/UserContext';
import Navbar from '@/components/Navbar';
// import navbar later and add it into the main component


export const metadata: Metadata = {
  title: "Animal Training App",
  description: "BOG Final Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
          <UserProvider>
            <main>
              {children}
            </main>
          </UserProvider>
      </body>
    </html>
  );
}
