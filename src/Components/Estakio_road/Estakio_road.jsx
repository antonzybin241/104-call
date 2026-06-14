import React from "react";
import "./Estakio_road.css";

const TIMELINE_ITEMS = [
  {
    step: "06",
    date: "Sept 2024",
    title: "Exchange & NFT platform",
    description: "Talking to Big Exchange & NFT Platform Creation",
  },
  {
    step: "07",
    date: "Nov 2024",
    title: "Exchange launch",
    description: "Exchange Launching",
  },
  {
    step: "08",
    date: "Dec 2024",
    title: "Property-backed NFTs",
    description: "Real properties backed NFT Launching and Distributions",
  },
  {
    step: "09",
    date: "Jan 2025",
    title: "Stake, lease & rent",
    description:
      "Properties backed NFTs for Stake, Lease & Rent at locking periods to earn",
  },
  {
    step: "10",
    date: "March 2025",
    title: "Reals blockchain",
    description: "Launch of own Blockchain for Reals coin",
  },
];

export default function Estakio_road() {
  return (
    <section className="estakio-timeline" id="Timeline">
      <div className="container">
        <h2 className="estakio-timeline__heading site_font txt_clr">
          Global Real Estate Marketplace Timeline
        </h2>
        <p className="estakio-timeline__sub">
          Key milestones on the path to the Global Real Estate Marketplace real-estate crypto ecosystem.
        </p>

        <div className="estakio-timeline__track">
          {TIMELINE_ITEMS.map((item) => (
            <article key={item.step} className="estakio-timeline__item">
              <div className="estakio-timeline__marker">
                <span className="estakio-timeline__step">{item.step}</span>
              </div>
              <div className="estakio-timeline__card">
                <time className="estakio-timeline__date">{item.date}</time>
                <h3 className="estakio-timeline__title">{item.title}</h3>
                <p className="estakio-timeline__desc">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
