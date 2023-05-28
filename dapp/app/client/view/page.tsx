"use client";

import Image from "next/image";
import Link from "next/link";
import getAllAdvertisements from "@hooks/getAdvertisements";
import { utils } from "ethers";

const ClientAdView = () => {
    /* Smart Contract */
    const { advertisements, submitAdvertisement } = getAllAdvertisements();

    const advertisements1 = [
        { id: 23434, ipfsHash: "0x4rstrtgdghdfhg5terg", budget: { hex: "435"} , tag: "#sample-tag"},
        { id: 674, ipfsHash: "0xhzkjujlkkjlrdgdgdfg", budget: { hex: "5646456"}, tag: "#great-tag"}
    ]

    return (
        <main className="flex flex-col items-center">
            <h1 className="text-6xl font-bold">
                These are your advertisements:
            </h1>
            <div className="min-w-[400px]">
                {advertisements1.map((ad, i) => {
                    return (
                        <Link href={"/client/view/" + ad.id}>
                            <div className="flex flex-col items-center w-full m-6 bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <Image
                                    className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                                    src={`https://ipfs.io/ipfs/${ad.ipfsHash}`}
                                    alt={`Ad image #${i}`}
                                    width={100}
                                    height={100}
                                />
                                <div className="flex flex-col justify-between p-4 leading-normal">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        Budget: {parseInt(ad.budget.hex)} WEI
                                    </h5>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                        Tag: {ad.tag}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
            <p>{advertisements1.length}</p>
        </main>
    );
};

export default ClientAdView;
