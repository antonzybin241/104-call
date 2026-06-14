import React, { useCallback, useEffect, useState } from "react";
import "./Stake.css";
import { useAccount } from "wagmi";
import {
  Token_staking_Contract_ABI,
  Token_staking_Contract_Address,
} from "../Contract/Contract";
import Web3 from "web3";
import moment from "moment";
import Countdown from "react-countdown";
import {
  prepareWriteContract,
  waitForTransaction,
  writeContract,
} from "@wagmi/core";
import { toast } from "react-hot-toast";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const WebSupply = new Web3("https://bsc-rpc.publicnode.com");

const Stake = () => {
  const { address } = useAccount();
  const [spinner, setspinner] = useState(false);
  const [Stake_History_show, setStake_History_show] = useState([]);
  const [totalStaked, settotalStaked] = useState(0);

  const Stake_History = useCallback(async () => {
    try {
      const stakingContractOf = new WebSupply.eth.Contract(
        Token_staking_Contract_ABI,
        Token_staking_Contract_Address
      );
      const totalStakedtoken = await stakingContractOf.methods
        .totalStaked()
        .call();
      settotalStaked(
        WebSupply.utils.fromWei(totalStakedtoken.toString())
      );

      if (address) {
        const UserInformation = await stakingContractOf.methods
          .UserInformation(address)
          .call();

        const array1 = UserInformation[0];
        const array2 = UserInformation[1];
        const array3 = UserInformation[2];
        let myArray = [];

        for (let i = 0; i < array1.length; i++) {
          const currentTimestamp = array3[i];
          const amount = WebSupply.utils.fromWei(array1[i].toString());
          const date = moment(Number(array3[i]) * 1000).format("DD-MM-YYYY");
          const obj = {
            Sno: i + 1,
            address: address,
            amount: amount,
            unLoackTime: Number(currentTimestamp) + Number(86400) * array2[i],
            LockTime: date,
          };
          myArray = [...myArray, obj];
        }
        setStake_History_show(myArray);
      }
    } catch (error) {
      console.log(error);
    }
  }, [address]);

  useEffect(() => {
    Stake_History();
  }, [Stake_History]);

  const Completionist = () => (
    <div className="text_days fs-5 ">Unstaked Time Reached!</div>
  );

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <Completionist />;
    }
    return (
      <div className="text_days fs-5 ">
        {days}d : {hours}h : {minutes}m : {seconds}s
      </div>
    );
  };

  const Withdraw = async (index) => {
    try {
      setspinner(true);
      const { request } = await prepareWriteContract({
        address: Token_staking_Contract_Address,
        abi: Token_staking_Contract_ABI,
        functionName: "harvest",
        args: [[index]],
        account: address,
      });
      const { hash } = await writeContract(request);
      await waitForTransaction({
        hash,
      });
      setTimeout(() => {
        setspinner(false);
        toast.success("Transaction Completed");
        Stake_History();
      }, 4000);
    } catch (error) {
      console.log(error);
      setspinner(false);
    }
  };

  const confirmWithdraw = (index, unlockTime) => {
    const currentTime = Math.floor(new Date().getTime() / 1000.0);
    if (currentTime < unlockTime) {
      toast.error("Time is not reached!");
      return;
    }

    Modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content:
        "Before unstake time 10% will be deducted from your amount and reward",
      okText: "Continue",
      cancelText: "Cancel",
      onOk: () => Withdraw(index),
    });
  };

  return (
    <div>
      <div className="container mx-auto lg:px-10 py-5">
        <div className="flex flex-col items-center justify-center lg:py-0 py-8">
          <div className="text-center">
            <p className="text-center pb-1 text-3xl font-bold stekss">
              Total Staked Reals Tokens Are : {totalStaked} $Reals Token
            </p>
            <hr className="line flex mx-auto mb-8" />
          </div>
          <div className="text-center">
            <p className="text-center pb-1 text-3xl font-bold stekss">
              Your Stakes
            </p>
            <hr className="line flex mx-auto mb-8" />
          </div>
          <div className="MuiBox-root css-ihc79b">
            <div className="d-flex justify-content-end align-items-center mb-3">
              <button
                type="button"
                className="inner_btn_site stake-refresh-btn"
                onClick={() => Stake_History()}
              >
                Refresh
              </button>
            </div>
            <div
              className="MuiTableContainer-root css-48ybtg mt-4"
              border="none"
              pt={2}
              pb={5}
            >
              <table
                className="MuiTable-root css-1owb465 ajdakj"
                aria-label="simple table"
                style={{ minWidth: 600 }}
              >
                <thead className="MuiTableHead-root css-1wbz3t9">
                  <tr className="MuiTableRow-root MuiTableRow-head css-1gqug66">
                    <th
                      className="MuiTableCell-root MuiTableCell-head MuiTableCell-alignCenter MuiTableCell-sizeMedium css-1gzy9y4"
                      scope="col"
                      style={{ fontSize: 16, color: "#151522" }}
                    >
                      #
                    </th>
                    <th
                      className="MuiTableCell-root MuiTableCell-head MuiTableCell-alignCenter MuiTableCell-sizeMedium css-1gzy9y4"
                      scope="col"
                      style={{ fontSize: 16, color: "#151522" }}
                    >
                      Staked Amount
                    </th>
                    <th
                      className="MuiTableCell-root MuiTableCell-head MuiTableCell-alignCenter MuiTableCell-sizeMedium css-1gzy9y4"
                      scope="col"
                      style={{ fontSize: 16, color: "#151522" }}
                    >
                      Withdrawal Time
                    </th>
                    <th
                      className="MuiTableCell-root MuiTableCell-head MuiTableCell-alignCenter MuiTableCell-sizeMedium css-1gzy9y4"
                      scope="col"
                      style={{ fontSize: 16, color: "#151522" }}
                    >
                      Unstake
                    </th>
                  </tr>
                </thead>
                <tbody className="MuiTableBody-root css-1xnox0e">
                  {Stake_History_show.length === 0 ? (
                    <tr>
                      <td
                        className="MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium css-q34dxg"
                        colSpan={4}
                        style={{ border: "none" }}
                      >
                        <div className="MuiBox-root css-ehd0rl">
                          <p className="MuiTypography-root MuiTypography-body1 css-o7q7an">
                            You have no staking data
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    Stake_History_show.map((items, index) => (
                      <tr
                        className="MuiTableRow-root css-1gqug66"
                        key={`${items.Sno}-${items.unLoackTime}`}
                      >
                        <td className="MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium css-q34dxg text-black text-center">
                          {items.Sno}
                        </td>
                        <td className="MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium css-q34dxg text-black text-center">
                          {items.amount}
                        </td>
                        <td className="MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium css-q34dxg text-black text-center">
                          <Countdown
                            date={
                              Date.now() +
                              (parseInt(items.unLoackTime, 10) * 1000 -
                                Date.now())
                            }
                            renderer={renderer}
                          />
                        </td>
                        <td className="MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium css-q34dxg text-black text-center">
                          <button
                            type="button"
                            className="inner_btn_site"
                            style={{ width: "5rem" }}
                            onClick={() =>
                              confirmWithdraw(index, items.unLoackTime)
                            }
                          >
                            {spinner ? "Loading ..." : "Unstake"}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stake;
