"use client";

import { utils } from "ethers";
import Link from "next/link";
import getAllWebsites from "@hooks/getWebsites";
import getAllAdvertisements from "@hooks/getAdvertisements";

export default function ProviderWebsiteView() {
    /* Smart Contract */
    const { websites, submitWebsite } = getAllWebsites();

    return (
        <main className="flex flex-col items-center">
            <h1 className="text-6xl font-bold">These are your websites:</h1>
            <div className="min-w-[400px]">
                {websites.map((website, i) => {
                    return (
                        <Link
                            href={"/provider/view/" + parseInt(website.id.hex)}
                        >
                            <div className="flex flex-col items-center w-full m-6 bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <div className="flex flex-col justify-between p-4 leading-normal">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        URL: {website.url}
                                    </h5>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                        Ads on website: BLAH BLAH BLAH
                                    </p>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </main>
    );
}
