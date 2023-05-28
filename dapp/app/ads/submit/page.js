"use client";

import Datepicker from "react-tailwindcss-datepicker";
import React, { useState } from "react";

import { create } from "ipfs-http-client";
import { API_KEY, API_KEY_SECRET } from "@secrets/infura";
import getAdvertisements from "@hooks/getAdvertisements";

const ClientAdSubmit = () => {
    /* Smart Contract */
    const { advertisements, submitAdvertisement } = getAdvertisements();

    /* Message */
    const [message, setMessage] = useState("");

    /* Time Range Variables */
    const [timeRange, setTimeRange] = useState({
        startDate: new Date(),
        endDate: new Date().setDate(new Date().getDate() + 7),
    });

    const handleTimeRangeChange = (newTimeRange) => {
        console.log("New Time Range:", newTimeRange);
        setTimeRange(newTimeRange);
        // Reset the message
        setMessage("");
    };

    /* Budget Variables */
    const [budget, setBudget] = useState(0.0);
    const handleBudgetChange = (newBudgetEvent) => {
        let pBudget = newBudgetEvent.target.value;
        console.log("New budget:", pBudget);
        setBudget(pBudget);
        // Reset the message
        setMessage("");
    };

    /* IPFS Variables */
    const ipfs = create({
        host: "ipfs.infura.io",
        port: "5001",
        protocol: "https",
        headers: {
            authorization:
                "Basic " +
                Buffer.from(API_KEY + ":" + API_KEY_SECRET).toString("base64"),
        },
    });
    const [file, setFile] = useState();
    const handleFileChange = (newFileEvent) => {
        let pFile = newFileEvent.target.files[0];
        console.log("New file:", pFile);
        setFile(pFile);
        // Reset the message
        setMessage("");
    };

    /* Tag Variables */
    const [tag, setTag] = useState("");
    const handleTagChange = (newTagEvent) => {
        let pTag = newTagEvent.target.value;
        console.log("New tag:", pTag);
        setTag(pTag);
        // Reset the message
        setMessage("");
    };

    /* Transform file into buffer */
    const readFileAsBuffer = (inputFile) => {
        const tempFileReader = new FileReader();

        return new Promise((resolve, reject) => {
            tempFileReader.onloadend = () => {
                resolve(Buffer(tempFileReader.result));
            };
            tempFileReader.onerror = () => {
                tempFileReader.abort();
                reject(new DOMException("Problem parsing input file."));
            };
            tempFileReader.readAsArrayBuffer(file);
        });
    };

    /* Handle onSubmit */
    async function handleOnSubmit(event) {
        event.preventDefault();
        if (
            !timeRange.startDate ||
            !timeRange.endDate ||
            !budget ||
            !file ||
            !tag
        ) {
            setMessage("Please make sure all the fields are filled out!");
        }
        /* Submit image to IPFS */
        let buffer = await readFileAsBuffer(file);
        const res = await ipfs.add(buffer);

        /* Save advertisement to smart contract */
        submitAdvertisement(res.path, tag, budget);
    }

    return (
        <main className="flex flex-col items-center">
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
            <div className="text-left">
                <h1 className="text-4xl">Submit your advertisement</h1>
                <div className="pt-8">
                    <h2 className="text-3xl mb-4">Time period</h2>
                    <div className="w-auto">
                        <Datepicker
                            value={timeRange}
                            onChange={handleTimeRangeChange}
                        />
                    </div>
                </div>
                <div className="pt-8">
                    <h2 className="text-3xl mb-4">Budget</h2>
                    <div className="w-auto">
                        <label
                            htmlFor="visitors"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Currency: ETH
                        </label>
                        <input
                            value={budget}
                            onChange={handleBudgetChange}
                            type="number"
                            id="visitors"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-800 dark:border-slate-600 dark:placeholder-gray-400 dark:text-white/80 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="0.100"
                            required
                        />
                    </div>
                </div>
                <div className="pt-8">
                    <h2 className="text-3xl mb-4">Design</h2>
                    <div className="w-auto">
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            htmlFor="file_input"
                        >
                            Upload your advertisement design
                        </label>
                        <input
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-white/80 focus:outline-none dark:bg-slate-800 dark:border-slate-600 dark:placeholder-slate-400"
                            id="file_input"
                            type="file"
                        />
                    </div>
                </div>
                <div className="pt-8">
                    <h2 className="text-3xl mb-4">Meta information</h2>
                    <div className="w-auto">
                        <label
                            htmlFor="message"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Specify tags
                        </label>
                        <textarea
                            value={tag}
                            onChange={handleTagChange}
                            id="message"
                            rows="4"
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-800 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white/80 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="technology, consumers, laptop, phone, ..."
                        ></textarea>
                    </div>
                </div>
                <button
                    type="submit"
                    onClick={handleOnSubmit}
                    className="bg-violet-700 hover:bg-violet-900 text-white font-bold py-4 px-4 rounded mt-8 text-left"
                >
                    Submit my advertisement
                </button>
            </div>
        </main>
    );
};

export default ClientAdSubmit;
