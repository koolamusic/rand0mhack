"use client";

import dynamic from "next/dynamic";
import { PropsWithChildren } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Connected } from "@/components/Home/Connected";
import { NotConnected } from "@/components/Home/NotConnected";
import { WalletButtons } from "@/components/WalletButtons";
import { QuestCategory } from "./_components/quest-category";

const FixedSizeWrapper = ({ children }: PropsWithChildren) => {
  const fixedStyle = {
    width: "1200px",
    height: "800px",
    border: "6px solid",
    margin: "auto",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={fixedStyle}>{children}</div>
    </div>
  );
};

export default function Home() {
  const { connected } = useWallet();

  return (
    <main className="flex flex-col">
      <Header />
      <QuestCategory />
      {/* {connected ? <Connected /> : <NotConnected />} */}
    </main>
  );
}

function Header() {
  return (
    <header className="sticky top-0 flex w-full items-center justify-between gap-2  border-b-2 bg-gray-50 px-6 py-4">
      <h1 className="text-2xl font-bold">RMB</h1>
      <DynamicWalletButtons />
    </header>
  );
}

const DynamicWalletButtons = dynamic(
  async () => {
    return { default: WalletButtons };
  },
  {
    loading: () => (
      <div className="nes-btn is-primary cursor-not-allowed opacity-50">
        Loading...
      </div>
    ),
    ssr: false,
  },
);
