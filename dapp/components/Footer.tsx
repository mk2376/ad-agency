export default function Footer() {
  return (
    <footer className="flex items-center justify-center w-full h-24 backdrop-blur-md bg-violet-950/50">
        <a
            className="flex items-center justify-center"
            href="https://ad-agency.web3"
            target="_blank"
            rel="noopener noreferrer"
            >
            Powered by {'NextJS, Tailwind CSS, Solidity, ...'}
                <img src="/logo.svg" alt="Logo" className="h-4 ml-2" />
        </a>
    </footer>
  )
}
