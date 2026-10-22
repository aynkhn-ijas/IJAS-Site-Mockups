import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";


const sans = Inter({ subsets: ["latin"], variable: "--font-sans-loaded" });

export const metadata: Metadata = {
  title: { default: "Illinois Junior Academy of Science", template: "%s | IJAS" },
  description: "Illinois Junior Academy of Science — student science research and competition since 1927.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sans.variable}>
      <body className="min-h-screen bg-white">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}