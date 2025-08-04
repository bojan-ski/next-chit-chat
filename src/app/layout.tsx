import type { Metadata } from "next";
import { Merriweather, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/appLayout/Header";
import Footer from "@/components/appLayout/Footer";

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Chit Chat App",
  description: "Warm and inviting chit chat application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${merriweather.variable} ${inter.variable} antialiased`}>
        <Header />

        <main>
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
