import React from "react";
import "./Estakio_nft.css";
import nft from "../Assets/nft_new.jpeg";
import hit from "../Assets/rnt2.jpeg";

const TOKEN_FUNCTIONS = [
  {
    title: "Asset-backed stability",
    text: "REALS is supported by real estate, helping reduce typical crypto volatility.",
  },
  {
    title: "Fast BSC transactions",
    text: "Low-cost, quick transfers on Binance Smart Chain across the Global Real Estate Marketplace ecosystem.",
  },
  {
    title: "Yield generation",
    text: "Earn through staking, property-backed NFTs, leasing, and rentals.",
  },
  {
    title: "Governance",
    text: "Holders join community decisions on platform direction and upgrades.",
  },
  {
    title: "Real-world assets (RWA)",
    text: "Fractional, on-chain ownership of tokenized property assets.",
  },
];

export default function Estakio_nft() {
  return (
    <>
      <div className="main_estakio_nft">
        <div className="container">
          <div className="row align-items-center mt-4" id="comming_nft">
            <div className="col-md-6  text-start">
              <h1 className="lower_tkn text-start ">Upcoming Global Real Estate Marketplace NFT </h1>
              <p className="nft_para">
              The upcoming launch of Real Estate NFTs promises to be a groundbreaking opportunity. Investors will have the chance to invest in tangible real estate properties through NFTs and earn passive income.
              Each NFT will be backed by a real property, enabling investors to participate in buying, selling, leasing, and renting these properties directly through the blockchain.
              </p>
              <p className="nft_para">
              When leasing a property NFT, investors can earn daily income from rental yields or other forms of returns. There will be a lock-in period of 2 to 3 years, compliant with local regulations. After this period, investors will also receive their initial investment back.
              Transactions for buying and selling properties via NFTs will be conducted in accordance with local laws and regulations.
              All the Transactions will be only through Reals Tokens.
              </p>
              {/* <p className="nft_para fw-bold  ">
              As a special offer, free agricultural land property NFTs will be available for lease to those who purchase Real Tokens valued at $200 or more and stake them on the Global Real Estate Marketplace platform.
              </p> */}
            </div>
            <div className="col-md-6  mt-3 mt-md-0">
              <img src={nft} className="rounded" alt="" />
            </div>
          </div>
          <div className="row align-items-center mt-5">
            <div className="col-md-6  mt-3 mt-md-0">
              <img src={hit} className="rounded" alt="" />
            </div>
            <div className="col-md-6  text-start mt-3 mt-md-0">
              <h1 className="lower_tkn text-start ">How it works? </h1>
              <p className="nft_para">
                Investors pool funds and invest in Global Real Estate Marketplace project. Global Real Estate Marketplace
                issues Global Real Estate Marketplace (Reals Token)s to investors in proportion to
                their invested amount. Investors can choose to stake their
                tokens, hold them, or exchange them in the open market.
              </p>
              <ul>
                <li className="hw_lis fw-blod">
                  Staked tokens are used by Global Real Estate Marketplace for various purposes:
                </li>
                <li className="hw_lis">
                  <span className="fw-bold"> 
                  Acquisition of properties::</span>{" "}
                  Global Real Estate Marketplace acquires properties with committed funds.
                </li>
                <li className="hw_lis">
                  <span className="fw-bold"> Leasing of properties: </span>{" "}
                  The acquired properties are leased by Global Real Estate Marketplace in order to generate rental income.
                </li>
                <li className="hw_lis">
                  <span className="fw-bold"> Development of sites: </span>{" "}
                  Global Real Estate Marketplace employs pledged funds in order to finance the development of properties and sites, thereby augmenting their value.

                </li>
                <li className="hw_lis">
                  <span className="fw-bold">
                    {" "}
                    Marketing at a higher price:{" "}
                  </span>{" "}
                  Global Real Estate Marketplace employs a premium pricing strategy in order to attract prospective purchasers or tenants to the properties/sites.

                </li>
                <li className="hw_lis">
                  <span className="fw-bold"> Profit generation: </span> Profit is defined as the revenue generated from property leasing, property
                  transactions, and site development.
                </li>
                <li className="hw_lis">
                  <span className="fw-bold">
                    {" "}
                    Deduction of expenditures:{" "}
                  </span>{" "}
                  Operating Expenditures Deducted from the generated profit are Global Real Estate Marketplace's operational expenses, which include marketing costs, maintenance costs, and management fees.
                </li>
                {/* <li className="hw_lis">
                  <span className="fw-bold"> Profit distribution: </span> After
                  deducting the expenditures, Global Real Estate Marketplace distributes a portion of
                  the remaining profit to the token stakers. Token stakers
                  receive their share of profit according to the number of
                  tokens they stake. Investors can choose to reinvest their
                  profits, sell their tokens on the open market, or hold them
                  for future participation in the project. Global Real Estate Marketplace (Reals Token)
                  TOKENOMICS
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="main_estakio_nft main_estakio_nft--functions">
        <div className="container">
          <h2 className="token-functions__heading site_font txt_clr">
            Functions of Reals tokens
          </h2>

          <div className="token-functions__row token-functions__row--2">
            {TOKEN_FUNCTIONS.slice(0, 2).map((item) => (
              <article key={item.title} className="token-feature-card">
                <h3 className="token-feature-card__title">{item.title}</h3>
                <p className="token-feature-card__text">{item.text}</p>
              </article>
            ))}
          </div>

          <div className="token-functions__row token-functions__row--3">
            {TOKEN_FUNCTIONS.slice(2).map((item) => (
              <article key={item.title} className="token-feature-card">
                <h3 className="token-feature-card__title">{item.title}</h3>
                <p className="token-feature-card__text">{item.text}</p>
              </article>
            ))}
          </div>

          <div className="token-functions__row token-functions__row--2 mt-2">
            <article className="token-feature-card token-feature-card--accent">
              <h3 className="token-feature-card__title">Benefits of staking</h3>
              <p className="token-feature-card__text">
                30-day lock: 1% APY · 90-day lock: 2.5% APY · 180-day lock: 6%
                APY.
              </p>
            </article>
            <article className="token-feature-card token-feature-card--accent">
              <h3 className="token-feature-card__title">Profit distribution</h3>
              <p className="token-feature-card__text">
                Stakers receive a share of net profits after expenses, in line
                with tokens staked.
              </p>
            </article>
          </div>
        </div>

        {/* <div className="nimers mt-3">
          <div className="row m-0">
            <div className="col-md-4 pad_side ">
              <div className="white_box_mata">
                <h3 className="txt_clr site_font fs-1 fw-bold ">$580.59M+</h3>
                <p className="txt_clr site_font   ">Total Value Locked</p>
              </div>
            </div>
            <div className="col-md-4 pad_side  mt-3 mt-md-0">
              <div className="white_box_mata">
                <h3 className="txt_clr site_font fs-1 fw-bold ">24.90M+</h3>
                <p className="txt_clr site_font   ">Transactions on Chains</p>
              </div>
            </div>
            <div className="col-md-4 pad_side  mt-3 mt-md-0">
              <div className="white_box_mata">
                <h3 className="txt_clr site_font fs-1 fw-bold ">270</h3>
                <p className="txt_clr site_font   ">Ecosystem Projects</p>
              </div>
            </div>
          </div>
        </div> */}

        {/* <div className="my-5">

      <h3 className="txt_clr site_font fs-3 text-center fw-semi-bold">The Manta Core Ecosystem Products</h3>
      <p className="txt_clr site_font text-center ">The suite of core Manta products provide all of the fundamental functionality for <br /> all on-chain features in the network.</p>
</div> */}
      </div>
    </>
  );
}
