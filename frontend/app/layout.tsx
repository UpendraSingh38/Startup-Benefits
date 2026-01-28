import "../styles/globals.css";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Startup Benefits",
  description: "Exclusive SaaS deals for early-stage startups"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
