import React, { useCallback, useEffect, useState } from "react";
import "./Tab_page.css";
import busd from "../Assets/busd.png";
import bnb from "../Assets/binance.png";
import Web3 from "web3";
import {
  prepareWriteContract,
  waitForTransaction,
  writeContract,
} from "@wagmi/core";
import { useAccount } from "wagmi";
import {
  USDC_Contract_ABI,
  USDC_Contract_Address,
  preSale_Contract_ABI,
  preSale_Contract_Address,
  preSale_Contract_ABI_old,
  preSale_Contract_Address_old,
} from "../Contract/Contract";
import toast from "react-hot-toast";

const webSupply = new Web3("https://bsc-rpc.publicnode.com");

export default function Tab_page({ Claimable }) {
  const { address } = useAccount();
  const [getBalance, setgetBalance] = useState(0);
  const [getBNB_value, setgetBNB_value] = useState("");
  const [showToken, setshowToken] = useState(0);
  const [spinner, setspinner] = useState(false);
  const [plan, setplan] = useState(0);
  const [claimSpinner, setclaimSpinner] = useState(false);
  const [claimSpinner1, setclaimSpinner1] = useState(false);

  const handleChange_value = (e) => {
    setgetBNB_value(e.target.value);
  };

  const balanceOf = useCallback(async () => {
    try {
      const TokenContractOf = new webSupply.eth.Contract(
        USDC_Contract_ABI,
        USDC_Contract_Address
      );
      const ContractOf = new webSupply.eth.Contract(
        preSale_Contract_ABI,
        preSale_Contract_Address
      );
      if (address) {
        const value_BNB = webSupply.utils.toWei(
          getBNB_value === "" ? "0" : getBNB_value.toString()
        );
        if (plan === 0) {
          let bnb_Balance = await webSupply.eth.getBalance(address);
          bnb_Balance = webSupply.utils.fromWei(bnb_Balance.toString());
          setgetBalance(bnb_Balance.toString());
          let get_BNBTO_Token = await ContractOf.methods
            .BNBToToken(value_BNB)
            .call();
          get_BNBTO_Token = webSupply.utils.fromWei(get_BNBTO_Token.toString());
          setshowToken(get_BNBTO_Token);
        } else {
          let USDC_Balance = await TokenContractOf.methods
            .balanceOf(address)
            .call();
          USDC_Balance = webSupply.utils.fromWei(USDC_Balance.toString());
          setgetBalance(USDC_Balance.toString());
          let get_USDCTOToken = await ContractOf.methods
            .getValuePerUSDC(value_BNB)
            .call();
          get_USDCTOToken = webSupply.utils.fromWei(get_USDCTOToken.toString());
          setshowToken(get_USDCTOToken);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [address, getBNB_value, plan]);

  const staking_Amount = async () => {
    try {
      if (getBNB_value === "") {
        toast.error("Please Enter Amount First!");
        setspinner(false);
      } else if (Number(getBNB_value) > Number(getBalance)) {
        toast.error("Insufficient Balance");
        setspinner(false);
      } else if (!address) {
        toast.error("Please Connect Metamaske First!");
      } else {
        const queryString = window.location.search;
        const parameters = new URLSearchParams(queryString);
        let RefferalAddress = parameters.get("ref");
        if (RefferalAddress === null) {
          RefferalAddress = "0x0000000000000000000000000000000000000000";
        }
        if (plan === 0) {
          setspinner(true);
          const stakingValue = webSupply.utils.toWei(getBNB_value.toString());
          const { request } = await prepareWriteContract({
            address: preSale_Contract_Address,
            abi: preSale_Contract_ABI,
            functionName: "BuyWithBNB",
            args: [RefferalAddress],
            value: stakingValue.toString(),
            account: address,
          });
          const { hash } = await writeContract(request);
          await waitForTransaction({
            hash,
          });
          setspinner(false);
          toast.success("Purchase Successful");
        } else {
          setspinner(true);
          const preSaleValue = webSupply.utils.toWei(getBNB_value.toString());
          const { request: approveRequest } = await prepareWriteContract({
            address: USDC_Contract_Address,
            abi: USDC_Contract_ABI,
            functionName: "approve",
            args: [preSale_Contract_Address, preSaleValue.toString()],
            account: address,
          });
          const { hash: approveHash } = await writeContract(approveRequest);
          await waitForTransaction({
            hash: approveHash,
          });

          setTimeout(async () => {
            toast.success("Approve Successful");
            const { request: buyRequest } = await prepareWriteContract({
              address: preSale_Contract_Address,
              abi: preSale_Contract_ABI,
              functionName: "BuyWithUSDC",
              args: [RefferalAddress, preSaleValue.toString()],
              account: address,
            });
            const { hash: buyHash } = await writeContract(buyRequest);
            await waitForTransaction({
              hash: buyHash,
            });
            setspinner(false);
            toast.success("Purchase Successful");
          }, 3000);
        }
      }
    } catch (e) {
      console.log("Error", e);
      setspinner(false);
    }
  };

  const ClaimToken = async () => {
    try {
      if (Claimable > 0) {
        setclaimSpinner1(true);

        const { request } = await prepareWriteContract({
          address: preSale_Contract_Address,
          abi: preSale_Contract_ABI,
          functionName: "claim",
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
      } else {
        toast.error("No Claimable Found");
      }
    } catch (error) {
      console.log(error);
      setclaimSpinner1(false);
    }
  };

  const ClaimTokenold = async () => {
    try {
      if (Claimable > 0) {
        setclaimSpinner(true);

        const { request } = await prepareWriteContract({
          address: preSale_Contract_Address_old,
          abi: preSale_Contract_ABI_old,
          functionName: "claim",
          args: [],
          account: address,
        });
        const { hash } = await writeContract(request);
        await waitForTransaction({
          hash,
        });

        setTimeout(() => {
          setclaimSpinner(false);
          toast.success("Transaction Completed");
        }, 4000);
      } else {
        toast.error("No Claimable Found");
      }
    } catch (error) {
      console.log(error);
      setclaimSpinner(false);
    }
  };

  useEffect(() => {
    balanceOf();
  }, [balanceOf]);

  return (
    <div className="ab_main">
      <div className="first_Box_stking d-flex gap-2" id="">
        <div className="d-flex  gap-3">
          <div
            className={`bnb_Text txt_clr${plan === 0 ? " bnb_Text--active" : ""}`}
            onClick={() => setplan(0)}
            onKeyDown={(e) => e.key === "Enter" && setplan(0)}
            role="button"
            tabIndex={0}
          >
            <img src={bnb} className=" tab_imgss me-2" alt="BNB" />
            <span>BNB</span>
          </div>
          <div
            className={`bnb_Text txt_clr${plan === 1 ? " bnb_Text--active" : ""}`}
            onClick={() => setplan(1)}
            onKeyDown={(e) => e.key === "Enter" && setplan(1)}
            role="button"
            tabIndex={0}
          >
            <img src={busd} className=" tab_imgss me-2" alt="USDC" />
            <span>USDC</span>
          </div>
        </div>
      </div>
      <div className="balnce_text">
        Your wallet : {parseFloat(getBalance.toString()).toFixed(3)}{" "}
        {plan === 0 ? "BNB" : "USDC"}
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="box_busd ">
            <div className="d-flex justify-content-between">
              <p>Amount in {plan === 0 ? "BNB" : "USDC"} </p>
              <p
                style={{ cursor: "pointer" }}
                onClick={() =>
                  setgetBNB_value(
                    getBalance !== "0" ? Number(getBalance) - Number(0.0001) : 0
                  )
                }
              >
                MAX
              </p>
            </div>

            <input
              type="number"
              placeholder="0"
              value={getBNB_value}
              onChange={handleChange_value}
            />
          </div>
        </div>
        <div className="col-md-6 mt-2 mt-md-0">
          <div className="box_busd ">
            <p>Tokens</p>
            <input type="text" disabled placeholder="0" value={showToken} readOnly />
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center gap-2 ">
        <button type="button" className="buy_BTN" onClick={staking_Amount}>
          {spinner ? "Loading..." : "Buy $Reals Token"}
        </button>
        <button type="button" className="buy_BTN" onClick={ClaimTokenold}>
          {claimSpinner ? "Loading..." : "Claim $Reals Token(old)"}
        </button>
        <button type="button" className="buy_BTN" onClick={ClaimToken}>
          {claimSpinner1 ? "Loading..." : "Claim $Reals Token"}
        </button>
      </div>
    </div>
  );
}
