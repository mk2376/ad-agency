import { websiteContractAddress, ethEndpoint } from "@constants/ethConstants";
import { ethers } from "ethers";

import WebsiteSmartContract from "../../../../smart_contracts/build/contracts/Websites.json";

import { NextResponse } from "next/server";
import Website from "@models/website";

export async function GET(request: Request) {
    const provider = ethers.providers.getDefaultProvider(ethEndpoint);

    let abi = WebsiteSmartContract.abi;

    const smartContract = new ethers.Contract(
        websiteContractAddress,
        abi,
        provider
    );

    const result = await smartContract.getWebsites();

    const websites = result.map((website: Website, index: number) => {
        return website;
    });

    return NextResponse.json(websites);
}
