import type {NextPage} from 'next'

import Head from 'next/head'
import BlinkingCursor from "../components/BlnkingCursor";
import NowPlayingBlock from "../components/Spotify/NowPlayingBlock";
import LastPlayedBlock from "../components/Spotify/LastPlayedBlock";
import TopTracksBlock from "../components/Spotify/TopTracksBlock";
import TopArtistsBlock from "../components/Spotify/TopArtistsBlock";
import LogViews from "../components/Website/LogViews";
import PageViews from "../components/Website/PageViews";
import LastPageViewed from "../components/Website/LastPageViewed";
import TotalPageViews from "../components/Website/TotallPageViews";
import WebMentions from "../components/WebMentions";
import OpenGraph from "../components/OpenGraph";
import Battery from "../components/Personal/Battery";
import Script from 'next/script';

const Stats: NextPage = () => {
  return (
    <>
      <Head>
        <title>Stats | {process.env.NEXT_PUBLIC_SITE_NAME}</title>
          <OpenGraph path={'/stats'} ogImageParams={{title: "Random Stats a dive into data"}}/>
      </Head>
      <h2 className="text-3xl"><span className='text-red'>~/stats</span> <span
        className='text-white'>$ list <BlinkingCursor cursor={'_'}/></span></h2>

      <div>
        <h3 className="text-xl font-medium text-blue mt-4">Personal Stats</h3>
        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-4">
          <Battery/>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-medium text-spotify mt-4">Spotify</h3>
        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <NowPlayingBlock/>
          <LastPlayedBlock/>
          <TopTracksBlock/>
          <TopArtistsBlock/>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-medium text-red mt-4">Website</h3>
        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <LogViews />
          <PageViews />
          <LastPageViewed />
          <TotalPageViews />
        </div>
      </div>
      <div>
        <h3 className="text-xl font-medium text-red mt-4">My Webring</h3>
        <Script src="https://the-claw-webring-widget.netlify.app/the-claw-webring-widget.mjs" type="module"></Script>

        <the-claw-webring-widget />
      </div>
      <div>
        <h3 className="text-xl font-medium text-purple mt-8">Mentions about my site around the web</h3>
        <div className="flex flex-col">
          <WebMentions />
        </div>
      </div>
    </>
  )
}

export default Stats
