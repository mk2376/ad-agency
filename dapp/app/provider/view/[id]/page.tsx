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
    const {
        getAdvertisementsWithoutWebsite,
        updateWebsiteForAdvertisement,
        getAdvertisementForWebsite,
    } = getAllAdvertisements();

    const [adsWithoutWebsite, setAdsWithoutWebsite] = useState<Advertisement[]>(
        []
    );
    const fetchAdvertisementData = async () => {
        let ads = await getAdvertisementsWithoutWebsite();
        setAdsWithoutWebsite(ads);
    };

    const [currentAd, setCurrentAd] = useState<Advertisement>();
    const fetchCurrentAd = async () => {
        let ad = await getAdvertisementForWebsite(parseInt(params.id));
        console.log("Ad for website:", ad);
        if (ad.ipfsHash != "") {
            setCurrentAd(ad);
        }
    };
    useEffect(() => {
        fetchCurrentAd();
    }, []);

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
        console.log("Chosen ad:", ad);
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

    const temp_chosenAd: Advertisement = {
        owner: "owner",
        budget: {
            _hex: "0x4453656",
        },
        ipfsHash: "string",
        tag: "random tag",
        id: "34545",
        isChecked: true,
        isAppropriate: false,
        visitors: ["34r545345", "r4tertzer", "rtgegtdhh"],
        websiteId: "any",
        isClosed: false,
    };

    const temp_adsWithoutWebsite = [
        temp_chosenAd,
        temp_chosenAd,
        temp_chosenAd,
    ];

    return (
        <div className="flex flex-col items-center justify-center py-2">
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
                <p className="mt-3 text-2xl text-gray-150">
                    Website #{params.id}
                </p>

                <h1 className="text-6xl font-bold text-white">
                    Track the ads displayed on your website
                </h1>

                <p className="mt-9 mb-4 text-2xl text-gray-200">
                    Check which ads are shown to your viewers
                </p>
                {!currentAd && (
                    <p className="mt-9 mb-4 text-2xl text-slate-100">
                        You are currently not displaying any advertisements on
                        this website!
                    </p>
                )}
                {currentAd && (
                    <p className="mt-9 mb-4 text-2xl text-slate-100">
                        Currently displaying the following advertisement:
                    </p>
                )}
                {currentAd && (
                    <div className="flex flex-col items-center w-full m-6 text-left bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 text-ellipsis">
                        <Image
                            className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg  p-6"
                            src={`https://ipfs.io/ipfs/${currentAd.ipfsHash}`}
                            alt={`Ad image`}
                            width={100}
                            height={100}
                        />
                        <div className="flex flex-col justify-between p-4 leading-normal">
                            <h5 className="mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Owner: {currentAd.owner}
                            </h5>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                Budget:{" "}
                                {parseInt(currentAd.budget._hex) * 10 ** -18}{" "}
                                ETH
                            </p>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                Tag: {currentAd.tag}
                            </p>
                        </div>
                    </div>
                )}

                {adsWithoutWebsite.length > 0 && (
                    <p className="mt-9 mb-8 text-2xl text-slate-200">
                        Choose an advertisement to display on the website from
                        the list below:
                    </p>
                )}
                {chosenAd && (
                    <button
                        type="submit"
                        onClick={handlerUpdateWebsiteForAdvertisement}
                        className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-4 px-4 mb-8 rounded w-64"
                    >
                        Display Advertisement
                    </button>
                )}
                <div className="grid grid-flow-col md:grid-flow-row gap-4 text-slate-1 text-2xl">
                    {adsWithoutWebsite.length == 0 ? (
                        <div className="flex flex-col items-center m-16 gap-14">
                            <p className="mt-3 text-2xl">
                                It seems there are no advertisements available
                                for this website.
                            </p>
                        </div>
                    ) : (
                        adsWithoutWebsite.map((ad, i) => {
                            return (
                                <div
                                    onClick={() => handleChosenAd(ad)}
                                    key={`ad_${i}`}
                                    className={`flex flex-col items-center w-full m-6 text-left bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-ellipsis ${
                                        parseInt(ad.id._hex) ==
                                        parseInt(chosenAd?.id._hex)
                                            ? "border-4 border-rose-500"
                                            : ""
                                    }`}
                                >
                                    <Image
                                        key={`${ad.ipfsHash}`}
                                        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg  p-6"
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
                                            key={`ad_owner_${i}`}
                                            className="mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                                        >
                                            Owner: {ad.owner}
                                        </h5>
                                        <p
                                            key={`ad_budget_${i}`}
                                            className="mb-3 font-normal text-gray-700 dark:text-gray-400"
                                        >
                                            Budget:{" "}
                                            {parseInt(ad.budget._hex) *
                                                10 ** -18}{" "}
                                            ETH
                                        </p>
                                        <p
                                            key={`ad_tag_${i}`}
                                            className="mb-3 font-normal text-gray-700 dark:text-gray-400"
                                        >
                                            Tag: {ad.tag}
                                        </p>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </main>
        </div>
    );
};

export default WebView;
