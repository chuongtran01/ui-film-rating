import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import StoreProvider from "@/app/StoreProvider";
import QueryProvider from "@/app/QueryProvider";
import Navbar from "@/components/layout/navbar/Navbar";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import BackToTopButton from "@/components/BackToTopButton";
import Footer from "@/components/layout/footer/Footer";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cinecritique",
  description: "Cinecritique is a platform for movie and series reviews.",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}>
        <NuqsAdapter>
          <NextIntlClientProvider messages={messages}>
            <QueryProvider>
              <StoreProvider>
                {/* <main> */}
                <Navbar />
                {children}
                <Footer />
                {/* </main> */}
                <Toaster />
              </StoreProvider>
            </QueryProvider>
          </NextIntlClientProvider>
          <BackToTopButton />
        </NuqsAdapter>
      </body>
    </html>
  );
}
