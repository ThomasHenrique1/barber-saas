import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import Logo from "@/public/Logo.png";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "BarberHub",
    template: "%s | BarberHub",
  },

  description:
    "Sistema completo para gestão de barbearias.",

  applicationName: "BarberHub",

  icons: {
    icon: "/Logo.png",
    shortcut: "/Logo.png",
    apple: "/Logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
    >
      <body
        className={`${inter.variable} min-h-screen bg-background font-sans text-foreground antialiased`}
      >
        {children}
      </body>
    </html>
  );
}