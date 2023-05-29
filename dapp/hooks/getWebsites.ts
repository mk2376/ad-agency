import axios from "axios";
import Website from "@models/website";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import { websiteContractAddress, ethEndpoint } from "@constants/ethConstants";
import { useState, useEffect } from "react";

import WebsiteSmartContract from "../../smart_contracts/build/contracts/Websites.json";

export default function getWebsites() {
    const [websites, setWebsites] = useState<Website[]>([]);

    const abi = WebsiteSmartContract.abi;

    useEffect(() => {
        getAllWebsites();
    }, []);

    async function getAllWebsites() {
        const data = await axios.get("/api/getWebsites");
        const result = data.data
            .map((item: Website) => new Website(item))
            .reverse();
        setWebsites(result);
        console.log(result);
    }

    async function getWebsiteWithId(id: number) {
        const provider = ethers.providers.getDefaultProvider(ethEndpoint);

        const smartContract = new ethers.Contract(
            websiteContractAddress,
            abi,
            provider
        );

        const result = await smartContract.getWebsiteWithId(id);

        return result;
    }

    async function getWebsitesForAddress() {
        const provider = ethers.providers.getDefaultProvider(ethEndpoint);

        const smartContract = new ethers.Contract(
            websiteContractAddress,
            abi,
            provider
        );

        const currProvider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await currProvider.listAccounts();
        const addr = accounts[0];

        const result = await smartContract.getWebsitesForAddress(addr);

        const data = result.map((website: Website, index: number) => {
            return website;
        });

        const websites = data
            .map((item: Website) => new Website(item))
            .reverse();

        return websites;
    }

    async function submitWebsite(url: string) {
        const web3Modal = new Web3Modal({
            cacheProvider: true,
            providerOptions: {
                walletconnect: {
                    package: WalletConnectProvider,
                },
            },
        });
        const instance = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(instance);
        const signer = provider.getSigner();
        const smartContract = new ethers.Contract(
            websiteContractAddress,
            abi,
            provider
        );
        const contractWithSigner = smartContract.connect(signer);
        const tx = await contractWithSigner.submitWebsite(url);
        await tx.wait();
    }

    return {
        websites: websites,
        submitWebsite: (url: string) => submitWebsite(url),
        getWebsiteWithId: (id: number) => getWebsiteWithId(id),
        getWebsitesForAddress: () => getWebsitesForAddress(),
    };
}
