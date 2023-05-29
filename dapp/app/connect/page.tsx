"use client";

import React, { useState } from "react";
import { ethers } from "ethers";

const provider = new ethers.providers.Web3Provider(window.ethereum);

const WalletCard = () => {
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [defaultAccount, setDefaultAccount] = useState<any>(null);
    const [userBalance, setUserBalance] = useState<any>(null);

    const connectwalletHandler = () => {
        if (window.ethereum) {
            provider.send("eth_requestAccounts", []).then(async () => {
                await accountChangedHandler(provider.getSigner());
            });
        } else {
            setErrorMessage("Please Install Metamask!!!");
        }
    };

    const accountChangedHandler = async (newAccount: any) => {
        const address = await newAccount.getAddress();
        setDefaultAccount(address);
        const balance = await newAccount.getBalance();
        setUserBalance(ethers.utils.formatEther(balance));
        await getuserBalance(address);
    };

    const getuserBalance = async (address: any) => {
        const balance = await provider.getBalance(address, "latest");
    };

    return (
        <div className="flex flex-col items-center justify-center flex-1 px-20 text-center">
            <p className="mt-9 mb-4 text-2xl text-gray-200">
                Please connect to MetaMask below:
            </p>
            
            <button
                className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-4 px-4 rounded m-6"
                onClick={connectwalletHandler}
            >
                {defaultAccount ? "Connected!!" : "Connect"}
            </button>
            { defaultAccount ?
                <div className="displayAccount">
                    <h4 className="walletAddress">Address:{defaultAccount}</h4>
                    <div className="balanceDisplay">
                        <h3>Wallet Amount: {userBalance}</h3>
                    </div>
                </div>
                /* {errorMessage} */
            :
                <></>
            }
        </div>
    );
};
export default WalletCard;

<p className="mt-9 mb-4 text-2xl text-gray-200">
Check which ads are shown to your viewers
</p>