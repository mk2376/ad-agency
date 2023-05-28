import Link from "next/link";

export const metadata = {
    title: "Client - WEB3 ADVERTISING AGENCY",
};

export default function Client() {
    return (
        <main className="flex flex-col items-center">
            <h1 className="text-6xl font-bold">Welcome, Client!</h1>

            <p className="mt-3 text-2xl">
                Here you can view all your advertisements or submit new ones!
            </p>

            {/* Add Client-specific components here */}
            <div className="flex flex-row gap-8 mt-8">
                <Link href="/client/view">
                    <button className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-4 px-4 rounded">
                        View my advertisements
                    </button>
                </Link>

                <Link href="/client/submit">
                    <button className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-4 px-4 rounded">
                        Submit a new advertisement
                    </button>
                </Link>
            </div>
        </main>
    );
}
