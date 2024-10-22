import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StarsCanvas from "@/components/main/StarsBackground";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://vercel.com/maleakhies-projects/porto-maleakhie"
  ),
  title: "Maleakhi Ekklesia",
  description: "Developer Portfolio By Maleakhi Ekklesia",
  keywords: ["Developer", "Portfolio", "Developer Portflio", "Ibrahim Memon"],
  openGraph: {
    title: "Maleakhi Ekklesia",
    description: "Software Engineer",
    images: "/OpenGraph.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-[#111] overflow-y-scroll overflow-x-hidden`}
      >
        <StarsCanvas />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
