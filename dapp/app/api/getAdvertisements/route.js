import { contractAddress, ethEndpoint } from "@constants/ethConstants";
import { ethers } from "ethers";

import AdvertisementSmartContract from "../../../../smart_contracts/build/contracts/Advertisements.json";

import { NextResponse } from "next/server";

export async function GET(request) {
    const provider = new ethers.providers.getDefaultProvider(ethEndpoint);

    let abi = AdvertisementSmartContract.abi;

    const smartContract = new ethers.Contract(contractAddress, abi, provider);

    const result = await smartContract.getAdvertisements();

    const advertisements = result.map((advertisement, index) => {
        return [...advertisement];
    });

    return NextResponse.json(advertisements);
}
