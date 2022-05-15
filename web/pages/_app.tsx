import '../styles/globals.css'
import type { AppContext, AppInitialProps, AppLayoutProps } from 'next/app'
import type { NextComponentType } from 'next';
import {useKonamiCode} from "../hooks";
import {ReactNode, useEffect} from "react";
import Layout from "../components/Layout";

const MyApp: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> =
  ({
     Component,
     pageProps,
   }: AppLayoutProps) => {
  const konamiCode = useKonamiCode();
  useEffect(() => {
    if (konamiCode) {
      console.log('konami code detected');
      document.body.classList.toggle('terminal');
    }
  }, [konamiCode]);

  const getLayout = Component.getLayout || ((page: ReactNode) => <Layout>{page}</Layout>);

    return <>{getLayout(<Component {...pageProps} />)}</>;
}

export default MyApp
