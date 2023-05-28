export const metadata = {
    title: "Visitor - WEB3 ADVERTISING AGENCY",
};

export default function Visitor() {

    // const { adsWatched } = getVisitorAllWatchedAds();

    const adsWatched = 45;

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-6xl font-bold">
                Welcome, Visitor!
            </h1>

            <p className="mt-3 text-2xl">
                Here you can see how many ads you have already watched
            </p>

            <div className='rounded-lg backdrop-blur-md bg-violet-950/50 m-20 w-min mb-4 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]'>
                <p className="p-12 text-5xl font-bold text-[#ba305e] visible hover:visible">
                    {adsWatched}
                </p>
            </div>
        </div>
    );
}
