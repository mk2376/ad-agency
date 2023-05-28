// import getAllWebsites from "@hooks/getWebsites";
import { utils } from "ethers";
import Link from "next/link";

export default function ProviderWebsiteView() {
    /* Smart Contract */
    // const { websites, submitWebsite } = getAllWebsites();

    const websites1 = [
        { id: 451, URL: "sample.go", meta: 1},
        { id: 2567, URL: "doable.com", meta: 3434}
    ]

    return (
        <main className="flex flex-col items-center">
            <h1 className="text-6xl font-bold">
                These are your advertisements:
            </h1>
            <div className="min-w-[400px]">
                {websites1.map((website, i) => {
                    return (
                        <Link href={"/provider/view/" + website.id}>
                            <div className="flex flex-col items-center w-full m-6 bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <div className="flex flex-col justify-between p-4 leading-normal">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        URL: {website.URL}
                                    </h5>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                        Ads on website: {website.meta}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
            <p>{websites1.length}</p>
        </main>
    );
};
