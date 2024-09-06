import type { Metadata } from "next";

import React from "react";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

export const metadata: Metadata = {
  title: "Agendar",
};

export default function Layout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen ">
      <Sidebar />
      <div className="flex flex-col w-full overflow-x-hidden ">
        <Header />
        {children}
      </div>
    </main>
  );
}
