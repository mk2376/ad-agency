import Link from 'next/link';

export default function Home() {
  return (
    <div className="h-screen bg-no-repeat bg-contain bg-cover-image flex">
      <div className="m-auto">
        <h1 className="text-9xl text-primary-500 font-mono font-medium my-10">WEB3 ADVERTISING AGENCY</h1>
        <h2 className="text-5xl text-white font-mono font-medium my-10 text-center">Dedicated to planning and handling advertising</h2>
        <div className="flex justify-around">
          <Link href="/advertisements/overview" className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-10 px-16 rounded text-2xl flex mr-6">
            <img src="/assets/img/bookmark_white.svg" className="px-2"></img>Enter as advertising client
          </Link>
          <Link href="/websites/overview" className="bg-white hover:bg-slate-50 text-black font-bold py-10 px-16 rounded text-2xl flex">
            <img src="/assets/img/bookmark_black.svg" className="px-2"></img>Enter as advertising client
          </Link>
        </div>
      </div>
    </div>
  )
}
