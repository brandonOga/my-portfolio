import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Rubik_Moonrocks } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/footer";
import Noise from "@/components/noise"; 

const inter = Inter({
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
});

const rubik_moonrocks = Rubik_Moonrocks({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-moonrock",
});

export const metadata: Metadata = {
  title: "Brandon Mupemhi",
  description: "I blend creativity with code",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${rubik_moonrocks.variable}`}>
      <body className={inter.className}>
        <div className="relative min-h-screen w-full overflow-hidden">
          <Noise />
          <div className="relative z-10">
            <Header />
            {children}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}


