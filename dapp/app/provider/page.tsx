export const metadata = {
    title: 'Provider - WEB3 ADVERTISING AGENCY',
}

export default function Provider() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome, Provider!
        </h1>

        <p className="mt-3 text-2xl">
          Here you can submit your webpage and choose the ads that best fit your audience.
        </p>

        {/* Add Provider-specific components here */}
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
