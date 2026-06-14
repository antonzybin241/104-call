import React from "react";
import "./Buy_eth.css";

const BUY_STEPS = [
  {
    step: "01",
    title: "Connect",
    points: [
      "Connect MetaMask or Trust Wallet on BNB Smart Chain.",
      "Use the buy widget above, or trade on PancakeSwap.",
    ],
  },
  {
    step: "02",
    title: "Purchase",
    points: [
      "Buy with BNB or USDC on BSC.",
      "Keep a small BNB balance for gas (~0.0026 BNB).",
    ],
  },
  {
    step: "03",
    title: "Claim",
    points: [
      "View claimable tokens after purchase.",
      "Claim on BNB Smart Chain when ready.",
    ],
  },
];

export default function Buy_eth() {
  return (
    <section className="main_buy_eth" id="how_to_buy">
      <div className="container">
        <h2 className="main_heading_buy lower_tkn buy-section__title">
          How to buy Reals token
        </h2>
        <p className="buy-section__lead site_font txt_clr text-center">
          Join the presale from $0.0011–$0.30 per token before the next stage.
        </p>

        <div className="buy-steps">
          {BUY_STEPS.map((item) => (
            <article key={item.step} className="buy-step-card">
              <span className="buy-step-card__num">{item.step}</span>
              <h3 className="buy-step-card__title site_font txt_clr">
                {item.title}
              </h3>
              <ul className="buy-step-card__list">
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
