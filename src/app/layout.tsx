import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import React from "react";

const inter = Inter({
  weight: ["100", "200", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agendar",
};

export default async function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  /* const session = await getServerSession() */
  return (
    <html lang="pt-br">
      <body
        className={`${inter.className} bg-background min-h-screen`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
