import React from "react";
import "./WalletLogin.css";
import { Helmet } from "react-helmet";
import estakioLogo from "../Assets/estakio-logo.png";

export default function WalletLogin() {
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
        ) : null}

        <p className="wallet-login__hint">
          Supports MetaMask, Trust Wallet, WalletConnect, and more.
        </p>
      </div>
    </div>
  );
}
