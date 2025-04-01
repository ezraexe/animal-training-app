import type { Metadata } from "next";
import "./globals.css";
import { UserProvider } from '@/context/UserContext';
import Navbar from '@/components/Navbar';
import { Heebo } from 'next/font/google';
// import navbar later and add it into the main component

const heebo = Heebo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heebo',
});

export const metadata: Metadata = {
  title: "Animal Training App",
  description: "BOG Final Project",
  icons: {
    icon: '/tab-logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={heebo.variable}>
      <body className="antialiased font-heebo">
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
