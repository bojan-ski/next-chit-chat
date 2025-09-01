import type { Metadata } from "next";
import { Merriweather, Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { GlobalProvider } from "@/context/globalProvider";
import { Toaster } from "react-hot-toast";
import Header from "@/components/appLayout/Header";
import Footer from "@/components/appLayout/Footer";
import BanMessage from "@/components/BanMessage";
import UnreadMessageToast from "@/components/UnreadMessageToast";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <GlobalProvider>

        <html lang="en">

          <body className={`${merriweather.variable} ${inter.variable} antialiased`}>
            <Header />

            {/* if member is banned message component */}
            <BanMessage />

            {/* if member has unread messages notification component */}
            <UnreadMessageToast />

            <main>
              {children}
            </main>

            <Footer />

            <Toaster />
          </body>

        </html>

      </GlobalProvider>
    </ClerkProvider>
  );
}
