"use client";

import React, { useState } from "react";

import { create } from "ipfs-http-client";
import { API_KEY, API_KEY_SECRET } from "@secrets/infura";

export default function ClientAdSubmit() {
    /* Smart Contract */
    

    /* Message */
    const [message, setMessage] = useState("");


    /* Budget Variables */
    const [websiteURL, setWebsiteURL] = useState<string>();
    const handleWebsiteURL = (newWebsiteURLEvent: any) => {
        let websiteURL = newWebsiteURLEvent.target.value;
        console.log("New websiteURL:", websiteURL);
        setWebsiteURL(websiteURL);
        // Reset the message
        setMessage("");
    };

    /* Handle onSubmit */
    async function handleOnSubmit(event: any) {
        event.preventDefault();
        if (
            !websiteURL
        ) {
            setMessage("Please make sure all the fields are filled out!");
        }

        /* Save to smart contract */
       
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
            <div className="text-left w-auto min-w-[300px]">
                <h1 className="text-4xl">Submit website</h1>
                <div className="pt-8">
                    <h2 className="text-3xl mb-4">Website URL:</h2>
                    <div className="w-full">
                        <label
                            htmlFor="websiteURL"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            https://your-website.domain
                        </label>
                        <input
                            value={websiteURL}
                            onChange={handleWebsiteURL}
                            type="text"
                            id="websiteURL"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-800 dark:border-slate-600 dark:placeholder-gray-400 dark:text-white/80 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                            required
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    onClick={handleOnSubmit}
                    className="bg-violet-700 hover:bg-violet-900 text-white font-bold py-4 px-4 rounded mt-8 text-left"
                >
                    Submit my website
                </button>
            </div>
        </main>
    );
};

