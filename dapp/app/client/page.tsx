export const metadata = {
    title: 'Client - WEB3 ADVERTISING AGENCY',
}

export default function Client() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome, Client!
        </h1>

        <p className="mt-3 text-2xl">
          Here you can submit your ads, set your budget, and target your audience.
        </p>

        {/* Add Client-specific components here */}
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://www.yourwebsite.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/logo.svg" alt="Logo" className="h-4 ml-2" />
        </a>
      </footer>
    </div>
  );
}
