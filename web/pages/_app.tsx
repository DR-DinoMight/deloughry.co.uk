import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {useKonamiCode} from "../hooks";
import {useEffect} from "react";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }: AppProps) {

    const konamiCode = useKonamiCode();
    useEffect(() => {
        if (konamiCode) {
            console.log('konami code detected');
            document.body.classList.toggle('terminal');
        }
    }, [konamiCode]);

    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    )
}

export default MyApp
