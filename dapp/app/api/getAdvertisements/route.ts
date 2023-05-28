import { contractAddress, ethEndpoint } from "@constants/ethConstants";
import { ethers } from "ethers";

import AdvertisementSmartContract from "../../../../smart_contracts/build/contracts/Advertisements.json";

import { NextResponse } from "next/server";
import Advertisement from "@models/advertisement";

export async function GET(request: Request) {
    const provider = ethers.providers.getDefaultProvider(ethEndpoint);

    let abi = AdvertisementSmartContract.abi;

    const smartContract = new ethers.Contract(contractAddress, abi, provider);

    const result = await smartContract.getAdvertisements();

    const advertisements = result.map((advertisement: Advertisement, index: number) => {
        return advertisement;
    });

    return NextResponse.json(advertisements);
}
