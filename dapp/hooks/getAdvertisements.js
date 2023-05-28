import axios from "axios";
import Advertisement from "@models/advertisement";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import { contractAddress } from "@constants/ethConstants";
import { useState, useEffect } from "react";

import AdvertisementSmartContract from "../../smart_contracts/build/contracts/Advertisements.json";

const getAdvertisements = () => {
    const [advertisements, setAdvertisements] = useState([]);

    const abi = AdvertisementSmartContract.abi;

    useEffect(() => {
        getAdvertisements();
    }, []);

    async function getAdvertisements() {
        const data = await axios.get("/api/getAdvertisements");
        const result = data.data
            .map((item) => new Advertisement(item))
            .reverse();
        setAdvertisements(result);
        console.log(result);
    }

    async function submitAdvertisement(ipfsHash, tag, budget) {
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
            contractAddress,
            abi,
            provider
        );
        const contractWithSigner = smartContract.connect(signer);
        const tx = await contractWithSigner.submitAdvertisement(
            ipfsHash,
            tag,
            ethers.utils.parseEther(budget),
            { value: ethers.utils.parseEther(budget) }
        );
        await tx.wait();

        getAdvertisements();
    }

    return {
        advertisements: advertisements,
        submitAdvertisement: (ipfsHash, tag, budget) =>
            submitAdvertisement(ipfsHash, tag, budget),
    };
};

export default getAdvertisements;
