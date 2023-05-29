"use client";

import React, { useState } from "react";
import { ethers } from "ethers";

const provider = new ethers.providers.Web3Provider(window.ethereum);

const WalletCard = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [userBalance, setUserBalance] = useState(null);

    const connectwalletHandler = () => {
        if (window.ethereum) {
            provider.send("eth_requestAccounts", []).then(async () => {
                await accountChangedHandler(provider.getSigner());
            });
        } else {
            setErrorMessage("Please Install Metamask!!!");
        }
    };

    const accountChangedHandler = async (newAccount) => {
        const address = await newAccount.getAddress();
        setDefaultAccount(address);
        const balance = await newAccount.getBalance();
        setUserBalance(ethers.utils.formatEther(balance));
        await getuserBalance(address);
    };

    const getuserBalance = async (address) => {
        const balance = await provider.getBalance(address, "latest");
    };

    return (
        <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
            <h3 className="h4">Please connect to MetaMask below:</h3>
            <button
                className="bg-violet-700 hover:bg-violet-900 text-white font-bold py-4 px-4 rounded my-8 text-left"
                onClick={connectwalletHandler}
            >
                {defaultAccount ? "Connected!!" : "Connect"}
            </button>
            <div className="displayAccount">
                <h4 className="walletAddress">Address:{defaultAccount}</h4>
                <div className="balanceDisplay">
                    <h3>Wallet Amount: {userBalance}</h3>
                </div>
            </div>
            {errorMessage}
        </main>
    );
};
export default WalletCard;
