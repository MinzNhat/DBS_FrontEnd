import type { Metadata } from "next";
import "./[locale]/globals.css";
import React from "react";

export const metadata: Metadata = {
  title: 'Adorable Library',
  description: 'The remedy to the challenge of storage',
  applicationName: 'Adorable Library Solution',
  keywords: ["react", "server components", 'nextjs', 'tailwind', 'adorable', 'library', 'adorable library'],
  icons: [{ rel: "favicon", type: 'image/ico', url: "/favicon.ico" }],
  generator: 'nhatdev',
  authors: [{ name: 'nhatdev' }],
  creator: 'nhatdev',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html >
  );
};