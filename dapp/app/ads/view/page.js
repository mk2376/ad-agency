"use client";

import getAdvertisements from "@hooks/getAdvertisements";

const ClientAdView = () => {
    /* Smart Contract */
    const { advertisements, submitAdvertisement } = getAdvertisements();

    return (
        <main className="flex flex-col items-center">
            <h1 className="text-6xl font-bold">
                These are your advertisements:
            </h1>
            <div>
                {advertisements.map((ad, i) => {
                    return (
                        <div
                            key={`ad_${i}`}
                            className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                        >
                            <img
                                key={ad.ipfsHash}
                                className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                                src={`https://ipfs.io/ipfs/${ad.ipfsHash}`}
                                alt={`Ad image #${i}`}
                            />
                            <div
                                key={`ad_${i}_metadata`}
                                className="flex flex-col justify-between p-4 leading-normal"
                            >
                                <h5
                                    key={`ad_${i}_budget`}
                                    className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                                >
                                    Budget:{" "}
                                    {parseInt(ad.budget.hex) * 10 ** -18} ETH
                                </h5>
                                <p
                                    key={`ad_${i}_tag`}
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
    );
};

export default ClientAdView;
