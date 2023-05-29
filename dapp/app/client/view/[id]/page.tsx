"use client";

import Card from "@components/Card";
import { useState, useEffect } from "react";
import getAllAdvertisements from "@hooks/getAdvertisements";
import getAllWebsites from "@hooks/getWebsites";
import Advertisement from "@models/advertisement";
import Website from "@models/website";
import axios from "axios";
import { AI_MODEL_URL } from "@constants/aiModel";

export default function Ad({ params }: { params: { id: string } }) {
    /* Message */
    const [message, setMessage] = useState("");

    /* Smart Contract */
    const {
        advertisements,
        submitAdvertisement,
        getAdvertisementWithId,
        updateAdvertisementWithAIKnowledge,
        closeAdvertisementAndSplitTheRewards,
    } = getAllAdvertisements();

    const { getWebsiteWithId } = getAllWebsites();

    const [ad, setAd] = useState<Advertisement>();

    const fetchData = async () => {
        let advertisement = await getAdvertisementWithId(parseInt(params.id));
        setAd(advertisement);
    };

    useEffect(() => {
        fetchData().catch(console.error);
    }, []);

    /* AI Model */
    const handleAI = async () => {
        if (!ad) {
            return;
        }
        const result = await axios.post(AI_MODEL_URL, {
            image_url: `https://ipfs.io/ipfs/${ad?.ipfsHash}`,
        });
        const data = result.data;
        if (data.description) {
            setMessage(data.description);
        }
        if (data.status === "OK") {
            let isAppropriate =
                !data.prediction["contains_nude"] &&
                !data.prediction["contains_sexy"] &&
                !data.prediction["contains_violence"];
            console.log("Appropriate:", isAppropriate);
            await updateAdvertisementWithAIKnowledge(
                parseInt(params.id),
                isAppropriate
            );
            await fetchData().catch(console.error);
        }
    };

    const temp_ad: Advertisement = {
        owner: "string",
        budget: "any",
        ipfsHash: "string",
        tag: "string",
        id: "any",
        isChecked: true,
        isAppropriate: false,
        visitors: ["34r545345", "r4tertzer", "rtgegtdhh"],
        websiteId: "any",
    };

    //setAd(temp_ad)

    const closeAdHandler = async (adID: number, websiteID: number) => {
        let website: Website = await getWebsiteWithId(websiteID);
        await closeAdvertisementAndSplitTheRewards(adID, website.owner);
    };

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
                    Advertisement #{params.id}
                </p>

                <h1 className="text-6xl font-bold text-white">
                    Track the status of your advertisement
                </h1>

                <p className="mt-9 mb-8 text-2xl text-gray-200">
                    Check how your advertisement is progressing
                </p>
                {ad && !ad.isChecked && (
                    <button
                        type="submit"
                        onClick={handleAI}
                        className="bg-slate-200 hover:bg-slate-300 text-black font-bold py-4 px-4 mb-8 rounded text-left"
                    >
                        Ask AI to classify the advertisement
                    </button>
                )}
                <div className="grid grid-cols-3 gap-4">
                    <Card
                        status={true}
                        title="1. Advertisement submitted"
                        description="Advertisement has been submitted successfully and is stored on the blockchain along with InterPlanetary Fie System."
                    ></Card>
                    <Card
                        status={true}
                        title="2 .AI model picked"
                        description="AI model that will perform the advertisement classification has been picked."
                    ></Card>
                    <Card
                        status={ad !== undefined && ad.isChecked}
                        title="3. AI model performs the classification"
                        description="Classification by the previously picked AI model has been performed."
                    ></Card>
                    <Card
                        status={ad !== undefined && ad.isAppropriate}
                        title="4. Advertisement is accepted"
                        description="Congratulations Your advertisement has been approved."
                    ></Card>
                    <Card
                        status={ad !== undefined && ad.websiteId != -1}
                        title="5. Advertisement is displayed on the website"
                        description="Your advertisement is visible on the website. Check it out here."
                    ></Card>
                    <div
                        className="m-0 p-0"
                        onClick={() =>
                            ad
                                ? closeAdHandler(ad.id, ad.websiteId)
                                : closeAdHandler(-1, -1)
                        }
                    >
                        <Card
                            status={false}
                            title="6. Close this advertisement campaign"
                            description="If you so desire, you can close this advertising campaing. Please click this card."
                        ></Card>
                    </div>
                </div>
            </main>
        </div>
    );
}
