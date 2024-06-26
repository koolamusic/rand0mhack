"use client";

import {
  useWallet,
  WalletReadyState,
  Wallet,
  isRedirectable,
  WalletName,
} from "@aptos-labs/wallet-adapter-react";
import { cn } from "@/utils/styling";

const buttonStyles = "nes-btn is-primary";

export const WalletButtons = () => {
  const { wallets, connected, disconnect, isLoading } = useWallet();

  if (connected) {
    return (
      <div className="flex flex-row">
        <div
          className="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          // className={cn(buttonStyles, "btn-small hover:bg-blue-700")}
          onClick={disconnect}
        >
          Disconnect
        </div>
      </div>
    );
  }

  if (isLoading || !wallets[0]) {
    return (
      <div className={cn(buttonStyles, "cursor-not-allowed opacity-50")}>
        Loading...
      </div>
    );
  }

  return <WalletView wallet={wallets[0]} />;
};

const WalletView = ({ wallet }: { wallet: Wallet }) => {
  const { connect } = useWallet();
  const isWalletReady =
    wallet.readyState === WalletReadyState.Installed ||
    wallet.readyState === WalletReadyState.Loadable;
  const mobileSupport = wallet.deeplinkProvider;

  const onWalletConnectRequest = async (walletName: WalletName) => {
    try {
      connect(walletName);
    } catch (error) {
      console.warn(error);
      window.alert("Failed to connect wallet");
    }
  };

  /**
   * If we are on a mobile browser, adapter checks whether a wallet has a `deeplinkProvider` property
   * a. If it does, on connect it should redirect the user to the app by using the wallet's deeplink url
   * b. If it does not, up to the dapp to choose on the UI, but can simply disable the button
   * c. If we are already in a in-app browser, we don't want to redirect anywhere, so connect should work as expected in the mobile app.
   *
   * !isWalletReady - ignore installed/sdk wallets that don't rely on window injection
   * isRedirectable() - are we on mobile AND not in an in-app browser
   * mobileSupport - does wallet have deeplinkProvider property? i.e does it support a mobile app
   */
  if (!isWalletReady && isRedirectable()) {
    // wallet has mobile app
    if (mobileSupport) {
      return (
        <button
          className="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          // className={cn(buttonStyles, "hover:bg-blue-700")}
          disabled={false}
          key={wallet.name}
          onClick={() => onWalletConnectRequest(wallet.name)}
          style={{ maxWidth: "300px" }}
        >
          Connect Wallet
        </button>
      );
    }
    // wallet does not have mobile app
    return (
      <button
        // className={cn(buttonStyles, "cursor-not-allowed opacity-50")}
        className="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        disabled={true}
        key={wallet.name}
        style={{ maxWidth: "300px" }}
      >
        Connect Wallet - Desktop Only
      </button>
    );
  } else {
    // desktop
    return (
      <button
        // className="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"

        className={cn(
          "relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
          isWalletReady ? "hover:bg-blue-700" : "cursor-not-allowed opacity-50",
        )}
        disabled={!isWalletReady}
        key={wallet.name}
        onClick={() => onWalletConnectRequest(wallet.name)}
        style={{ maxWidth: "300px" }}
      >
        Connect Wallet
      </button>
    );
  }
};
