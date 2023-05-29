export const metadata = {
    title: "WEB3 ADVERTISING AGENCY",
    description: "WEB3 ADVERTISING AGENCY",
};

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center py-2">
            <h1 className="text-6xl font-bold">
                Welcome to{" "}
                <a className="text-blue-600" href="/">
                    WEB3 ADVERTISING AGENCY
                </a>
            </h1>

            <p className="mt-3 text-2xl">
                Revolutionizing the advertising industry with blockchain
                technology.
            </p>

            { /*
            <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
                 We will add more content here later 
            </div>
            */ }
        </div>
    );
}
