import Card from '@components/Card';

export const metadata = {
    title: 'Ad - WEB3 ADVERTISING AGENCY',
}

export default function Ad({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <p className="mt-3 text-2xl text-gray-500">
            Website #{params.id}
        </p>
        
        <h1 className="text-6xl font-bold text-gray-950">
            Track the ads displayed on your website
        </h1>

        <p className="mt-9 mb-24 text-2xl text-gray-800">
            Check which ads are shown to your viewers
        </p>

        <div className="grid grid-cols-3 gap-4 text-black text-4xl">
            { "TODO" }
        </div>
      </main>
    </div>
  );
}
