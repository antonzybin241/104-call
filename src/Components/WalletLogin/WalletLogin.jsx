import React from "react";
import "./WalletLogin.css";
import { FaWallet } from "react-icons/fa";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { Helmet } from "react-helmet";
import estakioLogo from "../Assets/estakio-logo.png";

export default function WalletLogin() {
  const { open: openWeb3Modal } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { chains, switchNetwork } = useSwitchNetwork();

  const targetChainId = chains[0]?.id;
  const isCorrectNetwork = chain?.id === targetChainId;

  const handleConnect = () => {
    if (!isConnected || !address) {
      openWeb3Modal();
      return;
    }
    if (!isCorrectNetwork) {
      switchNetwork?.(targetChainId);
    }
  };

  return (
    <div className="wallet-login">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Global Real Estate Marketplace - Connect Wallet</title>
      </Helmet>
      <div className="wallet-login__card">
        <div className="wallet-login__logo">
          <img src={estakioLogo} alt="Global Real Estate Marketplace" className="site-logo" />
        </div>
        <h1 className="wallet-login__title">Connect your wallet</h1>
        <p className="wallet-login__subtitle">
          Connect a Web3 wallet on BNB Smart Chain to access the Global Real Estate Marketplace presale,
          staking, and token features.
        </p>
        {!isConnected || !address ? (
          <button
            type="button"
            className="wallet-login__btn"
            onClick={() => openWeb3Modal()}
          >
            <FaWallet />
            Connect Wallet
          </button>
        ) : !isCorrectNetwork ? (
          <>
            <p className="wallet-login__connected">
              Wallet: {address.substring(0, 6)}...{address.substring(address.length - 4)}
            </p>
            <button
              type="button"
              className="wallet-login__btn"
              onClick={handleConnect}
            >
              Switch to BNB Smart Chain
            </button>
          </>
        ) : null}

        <p className="wallet-login__hint">
          Supports MetaMask, Trust Wallet, WalletConnect, and more.
        </p>
      </div>
    </div>
  );
}
