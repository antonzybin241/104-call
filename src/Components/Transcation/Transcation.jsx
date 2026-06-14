import React from "react";
import img2 from "../Assets/rt2.svg";
import img3 from "../Assets/lqfirspeak-3.svg";
import img4 from "../Assets/lqfirspeak-2.svg";
import img5 from "../Assets/Group-46-1.svg";
import "./Transcation.css";
import manta_1 from "../Assets/modol.jpeg";

const ECOSYSTEM_ITEMS = [
  {
    icon: img5,
    title: "Agricultural land",
    description:
      "Vote-backed openings for business structures and hi-tech agriculture.",
    variant: "ecosystem-card--wide",
  },
  {
    icon: img4,
    title: "Multi-family units",
    description:
      "Townhomes, condos, modular homes, and apartments for families.",
    variant: "",
  },
  {
    icon: img3,
    title: "Zero-emission homes",
    description:
      "Solar grid-tied builds with efficient, lower-carbon operations.",
    variant: "ecosystem-card--tall",
  },
  {
    icon: img2,
    title: "Business complexes",
    description:
      "Forecourts, strip malls, and centers built for scalable growth.",
    variant: "",
  },
];

export default function Transcation() {
  return (
    <section className="main_transcaion_page">
      <div className="container">
        <div className="ecosystem-section">
          <h2 className="ecosystem-section__title site_font txt_clr">
            The Global Real Estate Marketplace (Reals Token) ecosystem
          </h2>
          <p className="ecosystem-section__lead site_font">
            Real-world property strategies powered by on-chain ownership.
          </p>

          <div className="ecosystem-grid">
            {ECOSYSTEM_ITEMS.map((item) => (
              <article
                key={item.title}
                className={`ecosystem-card ${item.variant}`.trim()}
              >
                <div className="ecosystem-card__icon-wrap">
                  <img src={item.icon} alt="" className="ecosystem-card__icon" />
                </div>
                <h3 className="ecosystem-card__title">{item.title}</h3>
                <p className="ecosystem-card__desc">{item.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="row g-3 align-items-center ecosystem-assets mt-3">
          <div className="col-md-6 pad_side">
            <img src={manta_1} className="manta_img w-100" alt="Property assets" />
          </div>
          <div className="col-md-6 pad_side">
            <h3 className="ecosystem-assets__heading site_font txt_clr">
              Assets backed by REALS token
            </h3>
            <p className="ecosystem-assets__text site_font txt_clr">
              Global Real Estate Marketplace anchors REALS in tangible property, giving holders
              real-asset exposure with blockchain transparency—from traditional
              real estate to tokenized participation.
            </p>
            <a href="#buy_tokens" className="text-decoration-none">
              <button type="button" className="ecosystem-assets__cta site_font">
                Buy REALS tokens
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
