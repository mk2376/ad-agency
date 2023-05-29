"use client";

import Link from "next/link";
import getAllWebsites from "@hooks/getWebsites";
import { useState, useEffect } from "react";
import Website from "@models/website";

export default function ProviderWebsiteView() {
    /* Smart Contract */
    const { getWebsitesForAddress } = getAllWebsites();
    const [websites, setWebsites] = useState<Website[]>([]);

    const fetchWebsitesForUser = async () => {
        let tempWebsites = await getWebsitesForAddress();
        console.log("My websites:", tempWebsites);
        setWebsites(tempWebsites);
    };

    useEffect(() => {
        fetchWebsitesForUser();
    }, []);

    return (
        <main className="flex flex-col items-center">
            <h1 className="text-6xl font-bold">These are your websites:</h1>
            <div className="min-w-[400px]">
                {websites.length == 0 ? (
                    <div className="flex flex-col items-center m-16 gap-14">
                        <p className="mt-3 text-2xl">
                            It seems like you don't have any websites yet
                        </p>

                        <Link href="/provider/submit">
                            <button className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-4 px-4 rounded">
                                Submit a new website
                            </button>
                        </Link>
                    </div>
                ) : (
                    websites.map((website, i) => {
                        return (
                            <Link
                                key={`website_link_${i}`}
                                href={
                                    "/provider/view/" +
                                    parseInt(website.id._hex)
                                }
                            >
                                <div
                                    key={`website_${i}`}
                                    className="flex flex-col items-center w-full m-6 bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                                >
                                    <div
                                        key={`website_internal_div_${i}`}
                                        className="flex flex-col justify-between p-4 leading-normal"
                                    >
                                        <h5
                                            key={`website_${i}_url`}
                                            className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                                        >
                                            URL: {website.url}
                                        </h5>
                                        <p
                                            key={`website_${i}_owner`}
                                            className="mb-3 font-normal text-gray-700 dark:text-gray-400"
                                        >
                                            Owner: {website.owner}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })
                )}
            </div>
        </main>
    );
}
