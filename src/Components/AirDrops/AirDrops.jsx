import React, { useCallback, useEffect, useState } from "react";
import "./AirDropStyle.css";
import { FaXTwitter } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { IoLogoYoutube } from "react-icons/io5";
import axios from "axios";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";
import { Helmet } from "react-helmet";

const AIRDROP_API_BASE =
  process.env.REACT_APP_API_URL || "http://localhost:3344";
const AIRDROP_ROUTE = "/Earn-free-reals-tokens-airdrops";

const cardArray = [
  {
    title: "Twitter : Global Real Estate Marketplace Official Account",
    icons: <FaXTwitter />,
    path: "https://twitter.com/estakiotoken",
    active: false,
  },
  {
    title: "Telegram official: Global Real Estate Marketplace Official Account",
    icons: <FaTelegram />,
    path: "https://t.me/Estakio_official",
    active: false,
  },
  {
    title: "Telegram public: Global Real Estate Marketplace Public Channel",
    icons: <FaTelegram />,
    path: "https://t.me/Estakio_public",
    active: false,
  },
  {
    title: "YouTube: Global Real Estate Marketplace Official Channel",
    icons: <IoLogoYoutube />,
    path: "https://www.youtube.com/@Estakio",
    active: false,
  },
];

export default function Airdrops() {
  const [cards, setCards] = useState(cardArray);
  const { address } = useAccount();
  const [userDetails, setUserDetails] = useState({});
  const [spinner, setSpinner] = useState(false);
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState("");
  const [updatedCount, setUpdatedCount] = useState(0);
  const [username, setUsername] = useState("");
  const [isValidUserName, setIsValidUserName] = useState("");
  const [refAddress, setRefAddress] = useState("");
  const [copied, setCopied] = useState(false);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let refValue = urlParams.get("ref");

  const handleChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail);
    if (isValidEmail) {
      setIsValid("");
    } else {
      setIsValid("Invalid email");
    }
  };

  const handleChangetelegram = (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    const usernamePart = newUsername.replace(/^.*\/([^/]+)$/, "$1");
    const isValidUsername = /^[a-zA-Z][a-zA-Z0-9_.]{3,30}$/.test(usernamePart);
    if (isValidUsername) {
      setIsValidUserName("");
    } else {
      setIsValidUserName("Invalid username");
    }
  };

  const handleCardClick = (index) => {
    let countIncrement = 0;

    setCards((prevCards) => {
      const updatedCards = [...prevCards];
      if (!updatedCards[index].active) {
        updatedCards[index].active = true;
        countIncrement++;
      }
      return updatedCards;
    });

    setUpdatedCount((prevCount) => prevCount + countIncrement);
  };

  const handleSubmit = async () => {
    try {
      const userPoints = updatedCount * 10;
      let refPoints = Number(userPoints * 0.1);
      refPoints = Number(refPoints) * Number(1000000000000000000);
      const count = Number(userPoints) * Number(1000000000000000000);

      if (username !== "" && email !== "") {
        if (Object.keys(userDetails).length === 0) {
          setSpinner(true);
          if (refValue === null) {
            refValue = "0x0000000000000000000000000000000000000000";
            refPoints = 0;
          }
          const res = await axios.post(`${AIRDROP_API_BASE}/addPoints`, {
            walletAddress: address,
            points: count,
            email: email,
            telegram: username,
            refAddress: refValue,
            refPoint: refPoints,
          });
          if (res.data.success) {
            toast.success(res.data.msg);
          } else {
            toast.error(res.data.msg);
          }
        } else {
          toast.error("This address already exists");
        }
      } else {
        if (username === "") {
          setIsValidUserName("Username is require");
        }
        if (email === "") {
          setIsValid("Email is required");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSpinner(false);
    }
  };

  const getUserData = useCallback(async () => {
    if (!address) {
      return;
    }
    try {
      const res = await axios.get(
        `${AIRDROP_API_BASE}/getByAddress?walletAddress=${address}`
      );
      if (res?.data?.success) {
        const data = res.data.data;
        setUserDetails(data);
        if (data?.email) {
          setEmail(data.email);
        }
        if (data?.telegram) {
          setUsername(data.telegram);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [address]);

  useEffect(() => {
    getUserData();
  }, [getUserData, spinner]);

  useEffect(() => {
    const origin = window.location.origin;
    if (address) {
      setRefAddress(`${origin}${AIRDROP_ROUTE}?ref=${address}`);
    } else {
      setRefAddress("Connect wallet");
    }

    const timer = setInterval(() => {
      setCopied(false);
    }, 3000);

    return () => clearInterval(timer);
  }, [address, copied]);

  const hasExistingUser = Object.keys(userDetails).length > 0;
  const tasksDisabled = hasExistingUser || !address;

  return (
    <div className="main_reaspa_here">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Global Real Estate Marketplace - Earn Free Reals Tokens Airdrops</title>
        <link rel="canonical" href="https://estakio.com/Earn-free-reals-tokens-airdrops" />
      </Helmet>
      <div className="container main_airdrop_page">
        <div className="row justify-content-center mx-0">
          <div className="col-md-8 mt-3">
            <h1 className="igniatio col-md-8 mt-3">
              Global Real Estate Marketplace - Earn Free Reals Tokens Airdrops
            </h1>
            <h6 className="igniatio">Airdrop Program by Global Real Estate Marketplace (Reals Token)</h6>
            <p>
              Global Real Estate Marketplace (Reals Token), where real estate meets Crypto to build a
              better future. “Building a better future for your Investments..,”
            </p>
            <p>
              The Airdrop Program, powered by Global Real Estate Marketplace, provides
              rewards for community members as they explore the platform,
              engage with the community, and support the growth of the network.
            </p>
            <h1>1% Airdrop 20000000 Reals tokens</h1>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="mainBoxDiv">
              <div className="d-flex w-100 mt-3 gap-2">
                <div style={{ width: "50%" }}>
                  <input
                    type="email"
                    className="singleBoxStyle "
                    placeholder="Enter your email here"
                    value={email}
                    onChange={handleChange}
                    readOnly={hasExistingUser}
                    style={{ width: "100%", border: "none", outline: "none" }}
                  />
                  <p style={{ color: "red" }}>{isValid}</p>
                </div>
                <div style={{ width: "50%" }}>
                  <input
                    type="text"
                    className="singleBoxStyle "
                    placeholder="Enter your telegram username"
                    value={username}
                    onChange={handleChangetelegram}
                    readOnly={hasExistingUser}
                    style={{ width: "100%", border: "none", outline: "none" }}
                  />
                  <p style={{ color: "red" }}>{isValidUserName}</p>
                </div>
              </div>
              {cards.map((items, index) => (
                <a
                  href={items.path}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    width: "100%",
                    cursor:
                      cards[index].active || tasksDisabled
                        ? "not-allowed"
                        : "pointer",
                    textDecoration: "none",
                    pointerEvents:
                      cards[index].active || tasksDisabled ? "none" : "auto",
                  }}
                  key={index}
                >
                  <div
                    className="singleBoxStyle"
                    onClick={() => handleCardClick(index)}
                  >
                    <div>
                      <span className="mx-2">{items.icons}</span>
                      {items.title}
                    </div>
                    {(cards[index].active || hasExistingUser) && (
                      <div>
                        <BsFillPatchCheckFill />
                      </div>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center mt-5">
          <button
            className="wallet_button air_drop_btns p-5"
            style={{ cursor: updatedCount === 0 ? "not-allowed" : "pointer" }}
            disabled={updatedCount === 0}
            onClick={handleSubmit}
          >
            {spinner ? "Loading..." : "Submit"}
          </button>
        </div>

        <div className="row justify-content-center mt-2">
          <div className="col-md-8">
            <div>
              <h6 className="txt_clr site_font ">Term and conditions </h6>
              <ul className="ps-0 term_condtions">
                <li>Must follow, join and Subscribe the above social links.</li>
                <li>Must provide your email and telegram username.</li>
                <li>All will be verified before distributing the Airdrops.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="row main_Box_div  mt-5 ">
          <div className="col-md-8 mt-4 ">
            <div className="token_staking_box">
              <div className="row align-items-center ">
                <div className="token_mart_sawap">
                  <div className="mt-3 mt-2">
                    <div className="Apr_div">
                      <p>Referal Address</p>
                    </div>
                    <div className="d-flex ">
                      <div className="copy_input_b w-100 d-flex ">
                        <input
                          type="text"
                          className="wap_iiinnn w-100"
                          value={refAddress}
                          readOnly
                        />
                      </div>
                      <CopyToClipboard
                        text={refAddress}
                        onCopy={() => setCopied(true)}
                      >
                        <button type="button" className="CopyBTN">
                          {copied ? "COPIED" : "COPY"}
                        </button>
                      </CopyToClipboard>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
