"use client";

import Image from "next/image";
import Advertisement from "@models/advertisement";
import Website from "@models/website";
import getAllAdvertisements from "@hooks/getAdvertisements";
import getAllWebsites from "@hooks/getWebsites";
import { useState, useEffect } from "react";

const WebView = ({ params }: { params: { id: string } }) => {
    /* Message */
    const [message, setMessage] = useState("");

    /* Website data */
    const { getWebsiteWithId } = getAllWebsites();

    /* Advertisement data */
    const { getAdvertisementsWithoutWebsite, updateWebsiteForAdvertisement } =
        getAllAdvertisements();

    const [adsWithoutWebsite, setAdsWithoutWebsite] = useState<Advertisement[]>(
        []
    );
    const fetchAdvertisementData = async () => {
        let ads = await getAdvertisementsWithoutWebsite();
        setAdsWithoutWebsite(ads);
    };

    const [website, setWebsite] = useState<Website>();
    const fetchWebsiteData = async () => {
        let web = await getWebsiteWithId(parseInt(params.id));
        setWebsite(web);
    };
    useEffect(() => {
        fetchWebsiteData();
        fetchAdvertisementData();
    }, []);

    /* Chosen ad */
    const [chosenAd, setChosenAd] = useState<Advertisement>();
    const handleChosenAd = (ad: Advertisement) => {
        console.log(ad);
        setChosenAd(ad);
    };

    /* Update website for ad */
    async function handlerUpdateWebsiteForAdvertisement() {
        if (!chosenAd) {
            return;
        }
        /* Save new website for advertisement */
        await updateWebsiteForAdvertisement(
            parseInt(chosenAd?.id._hex),
            parseInt(params.id)
        );
        setMessage("Successfully selected advertisement to show on website!");
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
            <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
                {message.length > 0 && (
                    <div
                        className="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex mb-8"
                        role="alert"
                    >
                        <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                            INFO
                        </span>
                        <span className="font-semibold mr-2 text-left flex-auto">
                            {message}
                        </span>
                    </div>
                )}
                <p className="mt-3 text-2xl text-gray-500">
                    Website #{params.id}
                </p>

                <h1 className="text-6xl font-bold text-gray-950">
                    Track the ads displayed on your website
                </h1>

                <p className="mt-9 mb-4 text-2xl text-gray-800">
                    Check which ads are shown to your viewers
                </p>

                {chosenAd && (
                    <p className="mt-9 mb-8 text-2xl text-gray-800">
                        Currently chosen:{parseInt(chosenAd.id._hex)}
                    </p>
                )}
                {chosenAd && (
                    <button
                        type="submit"
                        onClick={handlerUpdateWebsiteForAdvertisement}
                        className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-4 px-4 mb-8 rounded text-left"
                    >
                        Display this Advertisement
                    </button>
                )}

                <div className="grid grid-cols-3 gap-4 text-black text-4xl">
                    {adsWithoutWebsite.map((ad, i) => {
                        return (
                            <div
                                onClick={() => handleChosenAd(ad)}
                                key={`ad_${i}`}
                                className="flex flex-col items-center w-full m-6 bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                            >
                                <Image
                                    key={`${ad.ipfsHash}`}
                                    className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                                    src={`https://ipfs.io/ipfs/${ad.ipfsHash}`}
                                    alt={`Ad image #${i}`}
                                    width={100}
                                    height={100}
                                />
                                <div
                                    key={`ad_internal_div_${i}`}
                                    className="flex flex-col justify-between p-4 leading-normal"
                                >
                                    <h5
                                        key={`ad_budget_${i}`}
                                        className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                                    >
                                        Budget: {parseInt(ad.budget._hex)} WEI
                                    </h5>
                                    <p
                                        key={`ad_tag_${i}`}
                                        className="mb-3 font-normal text-gray-700 dark:text-gray-400"
                                    >
                                        Tag: {ad.tag}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
};

export default WebView;
