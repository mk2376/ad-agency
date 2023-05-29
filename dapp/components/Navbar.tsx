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
            <div className="flex space-x-8 text-xl">
                <Link href="/client">
                    <p className="text-white hover:text-gray-200">Client</p>
                </Link>
                <Link href="/provider">
                    <p className="text-white hover:text-gray-200">Provider</p>
                </Link>
                <Link href="/visitor">
                    <p className="text-white hover:text-gray-200">Visitor</p>
                </Link>
            </div>
        </nav>
    );
}
