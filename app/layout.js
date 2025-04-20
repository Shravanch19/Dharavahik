import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer/Footer";
import { Analytics } from "@vercel/analytics/react";
import { Suspense } from "react";
import Head from "next/head";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dharavahik",
  description: "Your premier destination for movies and entertainment",
  keywords: "movies, entertainment, streaming, watch movies",
  authors: [{ name: "Dharavahik" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  themeColor: "#000000",
  openGraph: {
    title: "Dharavahik",
    description: "Your premier destination for movies and entertainment",
    type: "website",
    locale: "en_US",
    siteName: "Dharavahik",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dharavahik",
    description: "Your premier destination for movies and entertainment",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png" },
    ],
  },
};

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
}

export default function RootLayout({ children }) {
  return (
    <>
      <Head>
        <Link rel="icon" href="/favicon.ico" />
      </Head>
      <html lang="en" className="scroll-smooth">
        <body className={`${inter.className} min-h-screen flex flex-col`}>
          <Suspense fallback={<Loading />}>
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <Analytics />
          </Suspense>
        </body>
      </html>
    </>
  );
}
