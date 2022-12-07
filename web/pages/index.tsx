import type {NextPage} from 'next'
import Head from 'next/head'

import Header from "../components/Header";
import LogList from "../components/LogList";
import WhoAmI from "../components/WhoAmI";
import NowPlaying from "../components/Spotify/NowPlaying";
import client from '../lib/sanity'
import groq from "groq";
import OpenGraph from "../components/OpenGraph";
import BlinkingCursor from '../components/BlnkingCursor';
import Script from 'next/script';

// @ts-ignore
const Home: NextPage = ({logs}) => {

  return (
    <>
      <Head>
        <title>Passionately Nerdy - {process.env.NEXT_PUBLIC_SITE_NAME}</title>
        <meta name="description" content="A home for the nerdy"/>
        <OpenGraph path={'/'} ogImageParams={{}}/>
      </Head>
      <Header />
      <div>

        <NowPlaying/>
        <WhoAmI />
        <LogList logs={logs} />
        <div className='mt-10'>
          <h2 className="text-3xl"><span className='text-red'>~/webring</span> <span
        className='text-white'>$ ls -la<BlinkingCursor cursor={'_'}/></span></h2>
          <Script src="https://the-claw-webring-widget.netlify.app/the-claw-webring-widget.mjs" type="module"></Script>

          <the-claw-webring-widget />
        </div>
      </div>
    </>
)
}

export default Home


export async function getStaticProps() {
  const logs = await client.fetch(groq`
    *[_type == "logPost" && publishedAt < now()][0..2] | order(publishedAt desc) {
      title,
      slug,
      mainImage,
      publishedAt,
      "timeSincePublished": dateTime(now()) - dateTime(publishedAt),
      "name": author->name,
      "authorImage": author->image,
      category->
    }
  `)
  return {
    props: {
      logs
    }
  }
}
