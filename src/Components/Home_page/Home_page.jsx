import React, { useState } from "react";
import Landing_page from "../Landing_page/Landing_page";
import Transcation from "../Transcation/Transcation";
import Tokennomics from "../Tokennomics/Tokennomics";
import FAQ from "../FAQ/FAQ";
import BuyETH from "../Buy_eth/Buy_eth";
import Estakio_nft from "../Estakio_nft/Estakio_nft";
import Partners from "../Partners/Partners";
import Estakio_road from "../Estakio_road/Estakio_road";
import Mata_land from "../Mata_land/Mata_land";
import Newsletter from "../Newsletter/Newsletter";
import WalletLogin from "../WalletLogin/WalletLogin";
import { Helmet } from "react-helmet";
import { useWalletReady } from "../../hooks/useWalletReady";

export default function Home_page() {
  const [, setRaise] = useState(0);
  const walletReady = useWalletReady();

  if (!walletReady) {
    return <WalletLogin />;
  }

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Global Real Estate Marketplace - Reals Tokens, Where Real Estate meets crypto to build a better
          future
        </title>
        <link rel="canonical" href="https://estakio.com/" />
      </Helmet>
      <Mata_land />
      <Landing_page setRaise={setRaise} />
      <Transcation />
      <Estakio_nft />
      <BuyETH />
      <Tokennomics />
      <Estakio_road />
      <Partners />
      <FAQ />
      <Newsletter />
    </div>
  );
}
