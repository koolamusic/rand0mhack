"use client";

import dynamic from "next/dynamic";
import { Fragment, PropsWithChildren } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Connected } from "@/components/Home/Connected";
import { NotConnected } from "@/components/Home/NotConnected";
import { WalletButtons } from "@/components/WalletButtons";
import { QuestCategory } from "./_components/quest-category";
import CategoryCTA from "./_components/category-cta";
import { LandingHero } from "./_components/landing-hero";
import { UpcomingQuest } from "./_components/upcoming";

export default function Home() {
  const { connected } = useWallet();

  return (
    <main className="flex flex-col">
      <Header />
      <LandingHero />
      {connected ? (
        <section>
          <UpcomingQuest />
          <QuestCategory />
        </section>
      ) : (
        <Fragment />
      )}
      <CategoryCTA />
    </main>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 flex w-full items-center justify-between gap-2 border-b-2 bg-gray-50 px-6 py-4">
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
