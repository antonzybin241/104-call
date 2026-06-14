import React, { useCallback, useEffect, useState } from "react";
import "./Smart_token_staking.css";
import estakioLogo from "../Assets/estakio-logo.png";
import Stake from "../Stake/Stake";
import { useAccount } from "wagmi";
import Web3 from "web3";
import {
  Token_staking_Contract_ABI,
  Token_staking_Contract_Address,
  Token_staking_Token_Contract_ABI,
  Token_staking_Token_Contract_Address,
} from "../Contract/Contract";
import {
  prepareWriteContract,
  waitForTransaction,
  writeContract,
} from "@wagmi/core";
import toast from "react-hot-toast";
import { Staking_Data } from "./Staking_Data";
import { Helmet } from "react-helmet";

const webSupply = new Web3("https://bsc-rpc.publicnode.com");

export default function Smart_token_staking() {
  const [getInput, setgetInput] = useState("");
  const [plan, setplan] = useState(30);
  const { address } = useAccount();
  const [spinner, setspinner] = useState(false);
  const [tokenBalance, settokenBalance] = useState(0);

  const Stake_Token = async (days) => {
    try {
      if (!address) {
        toast.error("Connect Wallet First");
      } else {
        const stakingContractOf = new webSupply.eth.Contract(
          Token_staking_Contract_ABI,
          Token_staking_Contract_Address
        );

        let minimumDeposit = await stakingContractOf.methods
          .minimumDeposit()
          .call();
        minimumDeposit = webSupply.utils.fromWei(minimumDeposit.toString());

        if (!getInput || Number(getInput) === 0 || Number(getInput) < Number(minimumDeposit)) {
          toast.error(
            !getInput || Number(getInput) === 0
              ? "Please Enter Token Value"
              : Number(getInput) < Number(minimumDeposit)
              ? `Please Enter Token Value Greater than ${minimumDeposit}`
              : ""
          );
        } else {
          setplan(days);
          setspinner(true);
          const values = webSupply.utils.toWei(getInput);
          const { request } = await prepareWriteContract({
            address: Token_staking_Token_Contract_Address,
            abi: Token_staking_Token_Contract_ABI,
            functionName: "approve",
            args: [Token_staking_Contract_Address, values],
            account: address,
          });
          const { hash } = await writeContract(request);
          await waitForTransaction({
            hash,
          });
          setTimeout(() => {
            setspinner(false);
            toast.success("Approve SuccessFully");
            Staking_Fuc(values, days);
          }, 2000);
        }
      }
    } catch (error) {
      setspinner(false);
      console.log(error);
    }
  };

  const Staking_Fuc = async (value, days) => {
    try {
      setspinner(true);

      const { request } = await prepareWriteContract({
        address: Token_staking_Contract_Address,
        abi: Token_staking_Contract_ABI,
        functionName: "farm",
        args: [value, days],
        account: address,
      });
      const { hash } = await writeContract(request);
      await waitForTransaction({
        hash,
      });

      setTimeout(() => {
        setspinner(false);
        toast.success("Transaction Completed");
      }, 4000);
    } catch (error) {
      console.log(error);
      setspinner(false);
    }
  };

  const balanceOf = useCallback(async () => {
    try {
      const ContractOfToken = new webSupply.eth.Contract(
        Token_staking_Token_Contract_ABI,
        Token_staking_Token_Contract_Address
      );
      const ContractOf = new webSupply.eth.Contract(
        Token_staking_Contract_ABI,
        Token_staking_Contract_Address
      );
      if (address) {
        let tokenBalace = await ContractOfToken.methods.balanceOf(address).call();
        tokenBalace = webSupply.utils.fromWei(tokenBalace.toString());
        settokenBalance(tokenBalace);
      }
      await ContractOf.methods.totalStaked().call();
      await ContractOf.methods.totalStakers().call();
    } catch (error) {
      console.log(error);
    }
  }, [address]);

  useEffect(() => {
    balanceOf();
  }, [balanceOf, spinner]);

  return (
    <div className="main_token_staking_page">
      <div className="container">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Global Real Estate Marketplace - Stake and Earn Reals Tokens</title>
          <link rel="canonical" href="https://estakio.com/Earn-rewards-staking" />
        </Helmet>
        <h1 className="site_font txt_clr">
          Global Real Estate Marketplace - Stake and Earn Reals Tokens..,{" "}
        </h1>
        <div className="row main_Box_div  mt-5 ">
          {Staking_Data.map((items) => (
            <div className="col-md-4 mt-4 " key={items.Days}>
              <div className="token_staking_box">
                <div className="row align-items-center ">
                  <div className="token_mart_sawap">
                    <div className="mart_logo_wap d-flex justify-content-center">
                      <img src={estakioLogo} className="site-logo" alt="Global Real Estate Marketplace" />
                    </div>
                    <div className="mt-3 mt-2">
                      <div className="Apr_div">
                        <p>APY</p>
                        <p>{items.APY}</p>
                      </div>
                      <div className="Apr_div">
                        <p>Lock Duration</p>
                        <p>{items?.Days} Days</p>
                      </div>
                      <p className="mb-0">
                        Balance: {parseFloat(tokenBalance).toFixed(3)} $Reals
                        Token
                      </p>
                      <div className="d-flex ">
                        <div className="swap_input_b d-flex ">
                          <input
                            type="text"
                            className="wap_iiinnn"
                            placeholder="0.00"
                            value={plan === items.Days ? getInput : ""}
                            onChange={(e) => {
                              setgetInput(e.target.value);
                              setplan(items.Days);
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setgetInput(
                                tokenBalance > 0
                                  ? Number(tokenBalance) - 0.001
                                  : 0
                              );
                              setplan(items.Days);
                            }}
                          >
                            Max
                          </button>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="swap_clr_btn"
                        onClick={() => Stake_Token(items.Days)}
                      >
                        {spinner && plan === items.Days
                          ? "Loading.."
                          : "Stake"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row">
          <Stake />
        </div>
      </div>
    </div>
  );
}
