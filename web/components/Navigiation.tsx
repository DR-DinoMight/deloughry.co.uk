import {NextPage} from "next";
import {useEffect, useState} from "react";

import styles from "../styles/Navigation.module.css";
import Link from "next/link";
import links from "./Links";
import {useRouter} from "next/router";

const Navigation: NextPage = () => {

  const router = useRouter();
  //Shrink the navbar on scroll
  const [navbarShrink, setNavbarShrink] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavbarShrink(true);
      } else {
        setNavbarShrink(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={` ${ navbarShrink ? 'bg-black-400 shadow-2xl': 'bg-black-400'} sticky top-0 z-50 transition-all`}>
      <nav className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 `} aria-label="Top">
        <div className={` ${ navbarShrink ? 'py-3': 'py-6'} w-full flex items-center justify-between lg:border-none transition-all`}>
          <div className="flex items-center">
            <Link
              href="/"
              className={`${styles.title} ${ navbarShrink ? styles.small: ''} hover:border-0 hover:text-yellow-500 hover:bg-transparent no-underline hover:no-underline`}
              title="aka DR DinoMight">

              <span>Matthew<br/>Peck-Deloughry</span>

            </Link>
            <div className="hidden ml-10 space-x-8 lg:block">
              {links.main.map((link) => (
                (<Link
                  key={link.name}
                  href={link.href}
                  className={`text-base font-medium ${link.href === router.asPath ? 'text-yellow no-underline' : 'text-white'}`}>

                  {link.name}

                </Link>)
              ))}
            </div>
          </div>
          <div className="hidden ml-10 space-x-4 lg:flex align-middle items-center space-x-4 ">
            {links.social.map((item) => (
              <a key={item.name} href={item.href} className="hover:border-0 hover:text-yellow-500 hover:bg-transparent no-underline hover:no-underline" rel={item.rel}>
                <span className="sr-only">{item.name}</span>
                <item.icon aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
        <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
          {links.main.map((link) => (
            <a key={link.name} href={link.href} className="text-base no-under font-medium text-white">
              {link.name}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
