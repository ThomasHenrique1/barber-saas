import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Barber SaaS",
  description: "A SaaS for barbershops",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className="min-h-full flex flex-col bg-black text-white">{children}</body>
    </html>
  );
}
