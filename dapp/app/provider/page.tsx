import Link from "next/link";

export const metadata = {
    title: 'Provider - WEB3 ADVERTISING AGENCY',
}

export default function Provider() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-6xl font-bold">
        Welcome, Provider!
      </h1>

      <p className="mt-3 text-2xl">
        Here you can submit your webpage and choose the ads that best fit your audience.
      </p>

      <div className="flex flex-row gap-8 mt-8">
          <Link href="/provider/view">
              <button className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-4 px-4 rounded">
                  View my websites
              </button>
          </Link>

          <Link href="/provider/submit">
              <button className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-4 px-4 rounded">
                  Submit a new website
              </button>
          </Link>
      </div>
    </div>
  );
}
