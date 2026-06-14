import React, { useState } from "react";
import "./Header.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import estakioLogo from "../Assets/estakio-logo.png";
import { FaWallet } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { Link, useLocation } from "react-router-dom";
import { useWalletReady } from "../../hooks/useWalletReady";

export default function Header() {
  const location = useLocation();
  const currentPath = location.pathname;
  const walletReady = useWalletReady();
  const isHomeGated = currentPath === "/" && !walletReady;
  const [show, setShow] = useState(false);
  const { chain } = useNetwork();
  const { chains, switchNetwork } = useSwitchNetwork();
  const { address } = useAccount();
  const { open } = useWeb3Modal();

  const handleClose = () => setShow(false);
  return (
    <div className="main_header_here">
      <Navbar collapseOnSelect expand="lg" className="main_headre">
        <Container >
          <Navbar.Brand href="#home" className="main_logo ">
            <Link to="/" className="brand-link">
              <img src={estakioLogo} alt="Global Real Estate Marketplace" className="site-logo" />
            </Link>
          </Navbar.Brand>
          <div className="in_resonsive">
            <button
              onClick={() =>
                address
                  ? chain?.id === chains[0]?.id
                    ? open()
                    : switchNetwork?.(chains[0]?.id)
                  : open()
              }
              className="wallet_button2 "
            >
              {address ? (
                chain?.id === chains[0]?.id || chain?.id === chains[1]?.id ? (
                  address ? (
                    <>
                      <FaWallet style={{ fontSize: "1.2rem" }} />
                    </>
                  ) : (
                    <>
                      <FaWallet style={{ fontSize: "1.2rem" }} />
                    </>
                  )
                ) : (
                  "Switch"
                )
              ) : (
                <>
                  <FaWallet style={{ fontSize: "1.2rem" }} />
                </>
              )}
            </button>
            <span className="d-block d-lg-none " onClick={() => setShow(!show)}>
              {show ? (
                <>
                  <RxCross2 className="header-menu-toggle" />{" "}
                </>
              ) : (
                <>
                  <AiOutlineMenu className="header-menu-toggle" />
                </>
              )}
            </span>
          </div>

          <Navbar.Collapse
            id="responsive-navbar-nav"
            className={show ? "show" : ""}
          >
            <Nav className="me-auto">
              <Nav.Link onClick={handleClose} className="header_links">
                <Link to="/" className="text-decoration-none header_links">
                  Home
                </Link>
              </Nav.Link>
              {!isHomeGated &&
                (currentPath === "/" ||
                  currentPath === "/Earn-rewards-staking" ||
                  currentPath === "/Earn-free-reals-tokens-airdrops") && (
                  <>
                    <Nav.Link onClick={handleClose} className="header_links">
                      <Link
                        to="/Earn-rewards-staking"
                        className="text-decoration-none header_links"
                      >
                        Staking
                      </Link>
                    </Nav.Link>
                  </>
                )}
              {!isHomeGated && currentPath === "/" && (
                <>
                  <Nav.Link
                    onClick={handleClose}
                    className="header_links"
                    href="#buy_tokens"
                  >
                    Buy Tokens
                  </Nav.Link>
                  <Nav.Link
                    onClick={handleClose}
                    className="header_links"
                    href="#comming_nft"
                  >
                    Coming NFT
                  </Nav.Link>
                  <Nav.Link
                    onClick={handleClose}
                    className="header_links"
                    href="#Tokenomics"
                  >
                    Tokenomics
                  </Nav.Link>
                  <Nav.Link
                    onClick={handleClose}
                    className="header_links"
                    href="#Timeline"
                  >
                    Timeline
                  </Nav.Link>
                  <Nav.Link
                    onClick={handleClose}
                    className="header_links"
                    href="https://drive.google.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Whitepaper
                  </Nav.Link>
                  <Nav.Link
                    onClick={handleClose}
                    className="header_links"
                    href="https://drive.google.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Audit
                  </Nav.Link>
                </>
              )}





            </Nav>
            <Nav className="">
              {!isHomeGated && (
                <Nav.Link
                  onClick={handleClose}
                  className="wallet_button d-flex me-2"
                >
                  <Link
                    to="Earn-free-reals-tokens-airdrops"
                    className="text-decoration-none header_airdrop_link"
                  >
                    AirDrop
                  </Link>
                </Nav.Link>
              )}
              <button
                onClick={() =>
                  address
                    ? chain?.id === chains[0]?.id
                      ? open()
                      : switchNetwork?.(chains[0]?.id)
                    : open()
                }
                className="wallet_button "
              >
                {address ? (
                  chain?.id === chains[0]?.id || chain?.id === chains[1]?.id ? (
                    address ? (
                      <>
                        {`${address.substring(0, 6)}...${address.substring(
                          address.length - 4
                        )}`}
                      </>
                    ) : (
                      <>
                        Connect <FaWallet />
                      </>
                    )
                  ) : (
                    "Switch Network"
                  )
                ) : (
                  <>
                    Connect <FaWallet />
                  </>
                )}
              </button>
              <div className="bg_blue"></div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
