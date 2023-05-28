import axios from "axios";
import Advertisement from "@models/advertisement";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import {
    advertisementContractAddress,
    ethEndpoint,
} from "@constants/ethConstants";
import { useState, useEffect } from "react";

import AdvertisementSmartContract from "../../smart_contracts/build/contracts/Advertisements.json";

export default function getAdvertisements() {
    const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);

    const abi = AdvertisementSmartContract.abi;

    useEffect(() => {
        getAllAdvertisements();
    }, []);

    async function getAllAdvertisements() {
        const data = await axios.get("/api/getAdvertisements");
        const result = data.data
            .map((item: Advertisement) => new Advertisement(item))
            .reverse();
        setAdvertisements(result);
        console.log(result);
    }

    async function getAdvertisementWithId(id: number) {
        const provider = ethers.providers.getDefaultProvider(ethEndpoint);

        const smartContract = new ethers.Contract(
            advertisementContractAddress,
            abi,
            provider
        );

        const result = await smartContract.getAdvertisementWithId(id);

        return result;
    }

    async function getAdvertisementsWithoutWebsite() {
        const provider = ethers.providers.getDefaultProvider(ethEndpoint);

        const smartContract = new ethers.Contract(
            advertisementContractAddress,
            abi,
            provider
        );

        const result = await smartContract.getAdvertisementsWithoutWebsite();
        const data = result.map(
            (advertisement: Advertisement, index: number) => {
                return advertisement;
            }
        );
        const advertisements = data
            .map((item: Advertisement) => new Advertisement(item))
            .reverse();
        return advertisements;
    }

    async function submitAdvertisement(
        ipfsHash: string,
        tag: string,
        budget: string
    ) {
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
            advertisementContractAddress,
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
    }

    async function updateAdvertisementWithAIKnowledge(
        id: number,
        appropriate: boolean
    ) {
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
            advertisementContractAddress,
            abi,
            provider
        );
        const contractWithSigner = smartContract.connect(signer);
        const tx = await contractWithSigner.updateAdvertisementWithAIKnowledge(
            id,
            appropriate
        );
        await tx.wait();
    }

    async function updateWebsiteForAdvertisement(
        adID: number,
        websiteID: number
    ) {
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
            advertisementContractAddress,
            abi,
            provider
        );
        const contractWithSigner = smartContract.connect(signer);
        const tx = await contractWithSigner.updateAdvertisementWebsite(
            adID,
            websiteID
        );
        await tx.wait();
    }

    return {
        advertisements: advertisements,
        submitAdvertisement: (ipfsHash: string, tag: string, budget: string) =>
            submitAdvertisement(ipfsHash, tag, budget),
        getAdvertisementWithId: (id: number) => getAdvertisementWithId(id),
        getAdvertisementsWithoutWebsite: () =>
            getAdvertisementsWithoutWebsite(),
        updateAdvertisementWithAIKnowledge: (
            id: number,
            appropriate: boolean
        ) => updateAdvertisementWithAIKnowledge(id, appropriate),
        updateWebsiteForAdvertisement: (adID: number, websiteID: number) =>
            updateWebsiteForAdvertisement(adID, websiteID),
    };
}
