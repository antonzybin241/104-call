import React from "react";
import "./Partners.css";
import p from "../Assets/p.png";
import p1 from "../Assets/p1.png";
import p2 from "../Assets/p2.png";
import p3 from "../Assets/p3.png";

const PARTNERS = [
  { name: "T Lara Properties", logo: p },
  { name: "PancakeSwap", logo: p1 },
  { name: "Crypto Valley", logo: p2 },
  { name: "BNB Smart Chain", logo: p3 },
];

export default function Partners() {
  return (
    <section className="main_parthners">
      <div className="container">
        <h2 className="partners__heading lower_tkn">Our partners</h2>
        <div className="partners-grid">
          {PARTNERS.map((partner) => (
            <div key={partner.name} className="partner_box">
              <img src={partner.logo} alt={partner.name} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
