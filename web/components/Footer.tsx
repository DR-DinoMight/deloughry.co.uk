
import TwitterLogo from "./Icons/TwitterLogo";
import GithubLogo from "./Icons/GithubLogo";
import TwitchLogo from "./Icons/TwitchLogo";
import MothLogo from "./Icons/MothLogo";
import Link from "next/link";
import links from "./Links";


const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-black-400 shadow-2xl">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
          {links.main.map((item) => (
            <div key={item.name} className="px-5 py-2">
              <Link href={item.href}>
                <a className="text-base font-medium text-white">
                  {item.name}
                </a>
              </Link>
            </div>
          ))}
        </nav>
        <div className="mt-8 flex justify-center space-x-4">
          {links.social.map((item) => (
            <a key={item.name} href={item.href} className="hover:border-0 hover:text-yellow-500 hover:bg-transparent no-underline hover:no-underline">
              <span className="sr-only">{item.name}</span>
              <item.icon aria-hidden="true" />
            </a>
          ))}
        </div>
        <p className="mt-8 text-center text-base text-gray-400">Made with Nerdy Passion {year} Matthew Peck-Deloughry.</p>
      </div>
    </footer>
  )
}
