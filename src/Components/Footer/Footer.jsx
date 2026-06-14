import React from "react";
import "./Footer.css";
import ffos from "../Assets/footer_img.jpeg";

import { FaFacebook, FaTelegram, FaYoutube } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";

import estakioLogo from "../Assets/estakio-logo.png";

import { Link, useLocation } from "react-router-dom";
import { useWalletReady } from "../../hooks/useWalletReady";

export default function Footer() {
  const location = useLocation();
  const currentPath = location.pathname;
  const walletReady = useWalletReady();
  const isHomeGated = currentPath === "/" && !walletReady;
  return (
    <div className="Main_footer_bg">
      <div className="container">
        <div className="row m-0">
          <div className="col-md-5">
            <div className="footer-brand">
              <Link to="/" className="brand-link">
                <img src={estakioLogo} alt="Global Real Estate Marketplace" className="site-logo" />
              </Link>
            </div>
            <div className="social_icons mt-2 d-flex gap-3">
              <div
                className="around_social"
                style={{ textDecoration: "none !important", color: "white" }}
              >
                <a
                  href="https://www.instagram.com/estakio"
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: "none !important" }}
                >
                  <AiFillInstagram className="icons_clr" />
                </a>
              </div>

              <div className="around_social">
                <a href="https://twitter.com/estakiotoken" target="_blank" rel="noreferrer">
                  <FaXTwitter className="icons_clr" />
                </a>
              </div>

              <div className="around_social">
                <a href="https://t.me/Estakio_official" target="_blank" rel="noreferrer">
                  <FaTelegram className="icons_clr" />
                </a>
              </div>

              <div className="around_social">
                <a
                  href="https://web.facebook.com/estakio?_rdc=1&_rdr"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaFacebook className="icons_clr" />
                </a>
              </div>
              <div className="around_social">
                <a href="https://youtube.com/@estakio" target="_blank" rel="noreferrer">
                  <FaYoutube className="icons_clr" />
                </a>
              </div>

              {/* <div className="around_social">
  <FaDiscord className="icons_clr" />
</div> */}
            </div>
            <p className="text-white text-start site_font fw-semi-bold mt-2">
              Contact us at info@estakio.com
            </p>

            {/* <p className="site_font mt-3 text-white">Made with love by p0x labs. <br /> */}

            <p className="site_font mt-3 text-white">
              © 2026 Global Real Estate Marketplace. All rights reserved.
            </p>
          </div>
          <div className="col-md-3">

            {!isHomeGated && (
            <div>
              <Link className="text-decoration-none" to="/">
                <span className="footer_links text-white">Home</span>
              </Link>

              {(currentPath === "/" ||
                currentPath === "/Earn-rewards-staking" ||
                currentPath === "/Earn-free-reals-tokens-airdrops") && (
                <>
                  <Link className="text-decoration-none" to="/Earn-rewards-staking">
                    <span className="footer_links text-white">Earn Rewards</span>
                  </Link>
                  <Link
                    className="text-decoration-none"
                    to="/Earn-free-reals-tokens-airdrops"
                  >
                    <span className="footer_links text-white">AirDrop</span>
                  </Link>
                </>
              )}

              {currentPath === "/" && (
                <>
                  <a href="#buy_tokens" className="footer_links text-white">
                    Buy Tokens
                  </a>
                  <a href="#comming_nft" className="footer_links text-white">
                    Coming NFT
                  </a>
                  <a href="#Tokenomics" className="footer_links text-white">
                    Tokenomics
                  </a>
                  <a href="#Timeline" className="footer_links text-white">
                    Timeline
                  </a>
                  <a
                    href="https://drive.google.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="footer_links text-white"
                  >
                    Whitepaper
                  </a>
                  <a
                    href="https://drive.google.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="footer_links text-white"
                  >
                    Audit
                  </a>
                </>
              )}
            </div>
            )}
          </div>
          <div className="col-md-4 mt-3 mt-md-0">
            <img src={ffos} className="rounded" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
