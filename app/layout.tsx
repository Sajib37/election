import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Election 2025",
  description: "Chuadanga District Students Welfare Association, Jagannath University Election 2025",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="bg-purple-600 p-4 fixed w-full top-0 z-10">
        <h1 className="text-center text-3xl font-bold text-white">
          Election 2025
        </h1>
      </div>
      <div className="pt-10">
        {children}
      </div>
      </body>
    </html>
  );
}
