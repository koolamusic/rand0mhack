import "@/styles/globals.css";
import { WalletProvider } from "@/context/WalletProvider";

import type { Metadata } from "next";

import { Saira } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";

const inter = Saira({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Random Jack",
  description:
    "AI powered incentive platform that empowers YOU to earn rewards for interacting with the Aptos blockchain.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider>
          <WalletProvider>{children}</WalletProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
