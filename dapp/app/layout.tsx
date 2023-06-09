import "@styles/globals.css";

import Navbar from "@components/Navbar";
import Footer from "@components/Footer";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="bg-cover-image bg-no-repeat bg-cover bg-center">
                <main className="flex flex-col h-screen justify-between">
                    <Navbar />
                    {children}
                    <Footer />
                </main>
            </body>
        </html>
    );
}
