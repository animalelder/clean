import Link from "next/link";

export default function HelpAndSupportLinks() {
  return (
    <nav className="flex flex-col space-y-4 text-gray-500 sm:flex-row sm:space-y-0 sm:space-x-6 sm:justify-start">
      <Link href="/" className="transition-colors hover:text-gray-700">
        Home
      </Link>
      <Link href="/Contact" className="transition-colors hover:text-gray-700">
        Contact
      </Link>
      <Link href="/Help" className="transition-colors hover:text-gray-700">
        Help & Support
      </Link>
      <Link href="/Terms" className="transition-colors hover:text-gray-700">
        Terms of Service
      </Link>
    </nav>
  );
}
