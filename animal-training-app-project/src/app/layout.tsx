import type { Metadata } from "next";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import Navbar from "@/components/Navbar";
import { Heebo, Oswald } from "next/font/google";
// import navbar later and add it into the main component

const heebo = Heebo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heebo",
});

const oswald = Oswald({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-oswald",
  weight: ["400", "500"], // Including both weights we need
});

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
    <html lang="en" className={`${heebo.variable} ${oswald.variable}`}>
      <body className="antialiased font-heebo">
        <Navbar />
        <UserProvider>
          <main>{children}</main>
        </UserProvider>
      </body>
    </html>
  );
}
