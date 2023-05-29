"use client";

import getAllAdvertisements from "@hooks/getAdvertisements";
import { useState, useEffect } from "react";

const Visitor = () => {
    /* Get number of viewed ads */
    const { getNumberOfVisitsForAddress } = getAllAdvertisements();
    const [numberOfAdsWatched, setNumberOfAdsWatched] = useState();

    const fetchNumberOfVisits = async () => {
        console.log("Before");
        let numberOfVisits = await getNumberOfVisitsForAddress();
        console.log("Number of visits:", numberOfVisits);
        setNumberOfAdsWatched(numberOfVisits);
    };

    useEffect(() => {
        fetchNumberOfVisits();
    }, []);

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-6xl font-bold">Welcome, Visitor!</h1>

            <p className="mt-3 text-2xl">
                Here you can see how many ads you have already watched
            </p>

            <div className="rounded-lg backdrop-blur-md bg-violet-950/50 m-20 w-min mb-4 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                <p className="p-12 text-5xl font-bold text-[#ba305e] visible hover:visible">
                    {numberOfAdsWatched ? parseInt(numberOfAdsWatched._hex) : 0}
                </p>
            </div>
        </div>
    );
};

export default Visitor;
