import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between p-6 backdrop-blur-sm">
            <div className="text-white">
                <Link href="/">
                    <h1 className="text-3xl font-bold">
                        WEB3 ADVERTISING AGENCY
                    </h1>
                </Link>
            </div>
            <div className="flex space-x-8 text-xl h-full items-baseline">
                <Link href="/client">
                    <p className="text-white hover:text-gray-200">Client</p>
                </Link>
                <Link href="/provider">
                    <p className="text-white hover:text-gray-200">Provider</p>
                </Link>
                <Link href="/visitor">
                    <p className="text-white hover:text-gray-200">Visitor</p>
                </Link>
                <Link href="/connect">
                    <p className="text-white hover:text-gray-200 inline-block rounded bg-blue-800 px-6 pb-2 pt-2.5 text-base font-medium uppercase leading-normal shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]">Connect</p>
                </Link>
            </div>
        </nav>
    );
}
