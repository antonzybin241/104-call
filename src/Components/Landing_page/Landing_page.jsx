import React, { useCallback, useEffect, useState } from "react";
import "./Landing_page.css";
import Tab from "../Tab_page/Tab_page";
import Web3 from "web3";
import {
  preSale_Contract_ABI,
  preSale_Contract_Address,
  referal_Contract_Address_Contract_ABI,
  referal_Contract_Address,
  preSale_Contract_ABI_old,
  preSale_Contract_Address_old,
} from "../Contract/Contract";
import { useAccount } from "wagmi";
import {
  prepareWriteContract,
  waitForTransaction,
  writeContract,
} from "@wagmi/core";
import toast from "react-hot-toast";


import { FaArrowRightLong } from "react-icons/fa6";
import CopyToClipboard from "react-copy-to-clipboard";

const webSupply = new Web3("https://bsc-rpc.publicnode.com");

export default function Landing_page({ setRaise }) {
  const [raised, setraise] = useState(0);
  const [get_tokeSold, setget_tokeSold] = useState(0);
  const { address } = useAccount();
  const [refAddress, setRefAddress] = useState("");
  const [copied, setCopied] = useState(false);
  const [Claimable, setClaimable] = useState(0);
  const [referralClaimable, setreferralClaimable] = useState(0);
  const [claimSpinner1, setclaimSpinner1] = useState(false);

  const referralClaimabletoken = async () => {
    try {
     
        setclaimSpinner1(true);

        const { request } = await prepareWriteContract({
          address: preSale_Contract_Address,
          abi: preSale_Contract_ABI,
          functionName: "claimReferalIncome",
          args: [],
          account: address,
        });
        const { hash } = await writeContract(request);
        await waitForTransaction({
          hash,
        });

        setTimeout(() => {
          setclaimSpinner1(false);
          toast.success("Transaction Completed");
        }, 4000);
    } catch (error) {
      console.log(error);
      setclaimSpinner1(false);
    }
  };
  // const getValue = async () => {
  //   try {
  //     let ContractOf = new webSupply.eth.Contract(
  //       preSale_Contract_ABI,
  //       preSale_Contract_Address
  //     );
  //     let tokenToUSDT = await ContractOf.methods.TokenPricePerUSDC().call();
  //     tokenToUSDT = webSupply.utils.fromWei(tokenToUSDT.toString());
  //     setgetTokenToUSDT(tokenToUSDT);

  //     let TokenSold = await ContractOf.methods.TokenSold().call();
  //     let currentRate = await ContractOf.methods.TokenPricePerUSDC().call();

  //     TokenSold = webSupply.utils.fromWei(TokenSold.toString());
  //     currentRate = webSupply.utils.fromWei(currentRate.toString());



  //     // i m chaing this

  //     // TokenSold = Number(71458.127) + Number(TokenSold);

  //     // To this
  //     TokenSold = Number(TokenSold);

  //     setRaise(Intl.NumberFormat().format(Number(TokenSold) * Number(currentRate)));
  //     setraise(Intl.NumberFormat().format(Number(TokenSold) * Number(currentRate)));
  //     setraise(Intl.NumberFormat().format(Number(TokenSold) * Number(currentRate)));


  //     // TokenSold = Intl.NumberFormat().format(TokenSold);
  //     setget_tokeSold(TokenSold);

  //     let maxTokeninPresale = await ContractOf.methods
  //       .maxTokeninPresale()
  //       .call();
  //     maxTokeninPresale = webSupply.utils.fromWei(maxTokeninPresale.toString());
  //     // console.log("maxToken",maxTokeninPresale);

  //     // console.log("width",parseInt(Number(TokenSold) / Number(maxTokeninPresale) / 100,));

  //     let CurrentStage = await ContractOf.methods.currentPhase().call();
  //     // currentPhasePricee = currentPhasePricee.price;
  //     // console.log("CurrentStage",CurrentStage);
  //     setCurrentStage(CurrentStage);
  //     // getCurrentPhasePrice

  //     // Get Current Stage Price
  //     let phases = await ContractOf.methods.phases(CurrentStage).call();
  //     // console.log(phases);
  //     let phasePrice = phases.price / 1e18;
  //     let newPhase = (1 / phasePrice).toFixed(2);
  //     setPhasePrice(newPhase);
  //     // console.log("Current phase price",newPhase);

  //     // 1$ = 5 token
  //     //  1 token = 1/5

  //     // setRaise( Intl.NumberFormat().format(Number(TokenSold)*Number(phasePrice)) )

  //     //Get Next Stage Price
  //     let SCurrentStage = Number(CurrentStage) + 1;
  //     // console.log("S current",SCurrentStage);
  //     let Nextphases = await ContractOf.methods.phases(SCurrentStage).call();
  //     // console.log(Nextphases);
  //     let NextphasePrice = Nextphases.price / 1e18;
  //     let TNextPhasePrice = (1 / NextphasePrice).toFixed(2);
  //     setNextPhasePrice("0.0035 $");
  //     // console.log("Next phase price",TNextPhasePrice);

  //     //

  //     // Remaining token
  //     maxTokeninPresale = Number(maxTokeninPresale) - Number(TokenSold);
  //     // console.log("Remaining token in preslse",maxTokeninPresale);
  //     setget_maxTokeninPresale(maxTokeninPresale);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  //  function getCurrentPhasePrice() internal view returns (uint256) {
  // return phases[currentPhase].price;
  // }

  const Claim_status = useCallback(async () => {
    let ContractOf = new webSupply.eth.Contract(
      preSale_Contract_ABI,
      preSale_Contract_Address
    );

    let ContractOfold = new webSupply.eth.Contract(
      preSale_Contract_ABI_old,
      preSale_Contract_Address_old
    );

    let ContractOfreferal = new webSupply.eth.Contract(
      referal_Contract_Address_Contract_ABI,
      referal_Contract_Address
    );
    let TokenSold = await ContractOf.methods.TokenSold().call();
    let currentRate = await ContractOf.methods.TokenPricePerUSDC().call();

    TokenSold = webSupply.utils.fromWei(TokenSold.toString());
    currentRate = webSupply.utils.fromWei(currentRate.toString());



    // i m chaing this

    // TokenSold = Number(71458.127) + Number(TokenSold);

    // To this
    TokenSold = Number(TokenSold);

    const raisedAmount = Intl.NumberFormat().format(
      Number(Number(TokenSold) * Number(currentRate)) + Number(21890.697)
    );
    setraise(raisedAmount);
    if (setRaise) {
      setRaise(raisedAmount);
    }
    setget_tokeSold(TokenSold);

    // let CurrentStage = await ContractOf.methods.currentPhase().call();
    // currentPhasePricee = currentPhasePricee.price;
    // console.log("CurrentStage",CurrentStage);
    // setCurrentStage(CurrentStage);
    // getCurrentPhasePrice

    // Get Current Stage Price
    // let phases = await ContractOf.methods.phases(CurrentStage).call();
    // console.log(phases);
    // let phasePrice = phases.price / 1e18;
    // let newPhase = (1 / phasePrice).toFixed(2);
    // setPhasePrice(newPhase);
    // console.log("Current phase price",newPhase);

    // 1$ = 5 token
    //  1 token = 1/5

    // setRaise( Intl.NumberFormat().format(Number(TokenSold)*Number(phasePrice)) )

    //Get Next Stage Price
    // let SCurrentStage = Number(CurrentStage) + 1;
    // console.log("S current",SCurrentStage);
    // let Nextphases = await ContractOf.methods.phases(SCurrentStage).call();
    // console.log(Nextphases);
    // let NextphasePrice = Nextphases.price / 1e18;
    // let TNextPhasePrice = (1 / NextphasePrice).toFixed(2);
    // setNextPhasePrice("0.0035 $");
    // console.log("Next phase price",TNextPhasePrice);

    //

    if (address) {
      //  let address = "0x7f269c43BA2BFC891602fc3222c60b2D5c807d56"
      let Claimable = await ContractOf.methods.Claimable(address).call();
      Claimable = webSupply.utils.fromWei(Claimable.toString());
      // console.log("Claimable",Claimable);

      let Claimableold = await ContractOfold.methods.Claimable(address).call();
      Claimableold = webSupply.utils.fromWei(Claimableold.toString());

      if (Number(Claimable)+Number(Claimableold) > 0) {
        setClaimable(Number(Claimable)+Number(Claimableold));
      } else {
        setClaimable(0);
      }
    }

    if (address) {
      //  let address = "0x7f269c43BA2BFC891602fc3222c60b2D5c807d56"
      let referralClaimable = await ContractOfreferal.methods.checkref(address).call();
      referralClaimable = webSupply.utils.fromWei(referralClaimable.toString());

      let referralClaimablenew = await ContractOf.methods.referralClaimable(address).call();
      referralClaimablenew = webSupply.utils.fromWei(referralClaimablenew.toString());

      if (Number(referralClaimable)+Number(referralClaimablenew) > 0) {
        setreferralClaimable(Number(referralClaimable)+Number(referralClaimablenew));
      } else {
        setreferralClaimable(0);
      }
    }
  }, [address, setRaise]);

  useEffect(() => {
    Claim_status();
    const interval = setInterval(() => {
      Claim_status();
    }, 5000);
    return () => clearInterval(interval);
  }, [Claim_status]);

  useEffect(() => {
    const origin = window.location.origin;
    if (address) {
      setRefAddress(`${origin}?ref=${address}`);
    } else {
      setRefAddress("Connect wallet");
    }

    const timer = setInterval(() => {
      setCopied(false);
    }, 3000);

    return () => clearInterval(timer);
  }, [address, copied]);
  return (
    <div className="main_div_landing">
      <div className="main_landing">
        <div className="container hero-container">
          <div className=" justify-content-center">
            <div className="row justify-content-center">
              {/* <div className="col-lg-6 ">
                <div className="main_div_Text">
                  <h5 className="text-left txt_clr">
                    <span >
                      <p style={{ fontSize: "2.14rem" }}>
                        Global Real Estate Marketplace (Reals Token), where real estate meets Crypto to
                        build a best future.
                      </p>
                    </span>
                  </h5>
                  <h6 className="site_font txt_clr">
                    <span style={{ fontSize: "2rem" }}>
                      <em>“Building a best future for </em>
                      <em>your Investments..,”</em>
                    </span>
                  </h6>
                </div>
              </div> */}
              <div className="col-12 pad_side">
                  <div className="landing_box" id="buy_tokens">
                  <h1 className="text-center site_font txt_clr">Buy Reals Tokens now</h1>
                    <div className="row">
                      <div className="col-6">
                      
                        <div className="info_pre d-flex gap-2">
                          <h6>Current $Reals Token Sales </h6>
                          {/* <h2>Stage 1</h2> */}
                        </div>
                      </div>
                      <div className="col-6 text-end">
                        <div className="info_pre">
                          <h6>Remaining Tokens </h6>
                          <h2>
                          {Intl.NumberFormat().format(Number(1500000000)-(Number(144446088)+Number(get_tokeSold)))}{" $Reals Token"}
                          </h2>
                        </div>
                      </div>
                    </div>
                    <div className="progress_bar">
                      <div
                        className="inner_pro"
                        style={{
                          width: `${
                            ((Number(144446088)+Number(get_tokeSold))/Number(1500000000))*100
                          }%`,
                        }}
                      ></div>
                      {/* <div className="inner_pro" style={{
                    width: parseInt(Number(get_tokeSold) /
                    Number(get_maxTokeninPresale) /
                    100,)
                  }}></div> */}
                    </div>
                    <div className="row mt-3">
                      <div className="col-6">
                        <div className="info_pre">
                          <h6>Total Token Sold </h6>
                          <h2 className="text-truncate">144,446,088+{Intl.NumberFormat().format(get_tokeSold)} $Reals Token</h2>
                        </div>
                      </div>
                      {/* <div className="col-6 text-end">
                        <div className="info_pre">
                          <h6>Total Token Sold </h6>
                          <h2 className="text-truncate">124545454+{Intl.NumberFormat().format(get_tokeSold)}</h2>
                        </div>
                      </div> */}
                    </div>
<div className="d-flex justify-content-between">


                    <div className="rate mt-1">
                      <h4 className="fw-bold">Current Price: <span className="fw-semibold">$0.01</span></h4>

                      {/* <h4>$1= {getTokenToUSDT} Reals Token</h4> */}
                    </div>
                    <div className="rate mt-1">
                      <h4>1 $ =100 Reals Token</h4>

                      {/* <h4>$1= {getTokenToUSDT} Reals Token</h4> */}
                    </div>
                    </div>

                    <div
                      className="text-center text-white"
                      style={{ fontFamily: "'Inter', sans-serif;" }}
                    >
                      {/* <h6
                        className="span-text"
                        style={{
                          fontSize: "16px",
                          fontFamily: "'Inter', sans-serif;",
                        }}
                      >
                        Your Purchased Reals Tokens : {Claimable}{" "}
                      </h6> */}
                      <h6
                        className="txt_clr site_font  "
                        style={{
                          fontSize: "16px",
                        
                        }}
                      >
                        Ready to Claim : {Claimable}{" "}
                      </h6>
                    </div>

                    <div className="buy_chain_box">
                      <Tab Claimable={Claimable} />
                    </div>
                  </div>
              </div>
            </div>

            <div className="row g-3 justify-content-center mt-3">
              <div className="col-md-6 pad_side">
                <div className="white_paper_box">
                  <div className="row">
                    <div className="col-10">
                      <div>
                        <h4 className="names_re">White paper</h4>
                        <p>
                          Download our whitepaper to get a detailed
                          understanding of Global Real Estate Marketplace
                        </p>
                      </div>
                    </div>
                    <div className="col-2 circle_box">
                      <div className="cir">
                        <a
                          href="https://drive.google.com/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FaArrowRightLong style={{ color: "white" }} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 pad_side">
                <div className="white_paper_box">
                  <div className="row">
                    <div className="col-10">
                      <div>
                        <h4 className="names_re">AUDIT report </h4>
                        <p>
                          The smart contract has been audited by blockchain
                          security specialist Solid Proof.
                        </p>
                      </div>
                    </div>
                    <div className="col-2 circle_box">
                      <div className="cir">
                        <a
                          href="https://drive.google.com/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FaArrowRightLong style={{ color: "white" }} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row g-3 landing-stats mt-3" id="earnreward">
              <div className="col-sm-4 pad_side">
                <div className="stat-card">
                  <p className="stat-card__value">5</p>
                  <p className="stat-card__label">Total stages</p>
                </div>
              </div>
              <div className="col-sm-4 pad_side">
                <div className="stat-card">
                  <p className="stat-card__value stat-card__value--compact">
                    $137,000 + ${raised}
                  </p>
                  <p className="stat-card__label">Amount raised</p>
                </div>
              </div>
              <div className="col-sm-4 pad_side">
                <div className="stat-card">
                  <p className="stat-card__value stat-card__value--compact">
                    1.5B
                  </p>
                  <p className="stat-card__label">Reals tokens for sale</p>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-12 pad_side">
                <div className="referral-panel">
                  <h3 className="referral-panel__title">Referral link</h3>
                  <div className="referral-copy-row">
                    <input
                      type="text"
                      className="referral-copy-row__input"
                      value={refAddress}
                      readOnly
                      aria-label="Referral link"
                    />
                    <CopyToClipboard
                      text={refAddress}
                      onCopy={() => setCopied(true)}
                    >
                      <button
                        type="button"
                        className="referral-copy-row__btn"
                      >
                        {copied ? "Copied" : "Copy"}
                      </button>
                    </CopyToClipboard>
                  </div>
                  <p className="referral-panel__hint">
                    Earn 10% for each referral.
                  </p>
                  <p className="referral-panel__reward">
                    Claimable rewards:{" "}
                    <strong>
                      {parseFloat(referralClaimable).toFixed(4)} $REALS
                    </strong>
                  </p>
                  <button
                    type="button"
                    className="referral-panel__claim buy_BTN"
                    onClick={referralClaimabletoken}
                  >
                    {claimSpinner1 ? "Loading…" : "Claim referral rewards"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
