export const metadata = {
    title: "Provider - WEB3 ADVERTISING AGENCY",
};

export default function Visitor() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
            <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
                <h1 className="text-6xl font-bold">Welcome, Visitor!</h1>

                <p className="mt-3 text-2xl">
                    Here you can choose to view or block ads and provide
                    feedback. quote
                </p>

                {/* Add Visitor-specific components here */}
            </main>
        </div>
    );
}
