import type {NextPage} from 'next'

import Head from 'next/head'
import BlinkingCursor from "../components/BlnkingCursor";

const Stats: NextPage = () => {
  return (
    <>
      <Head>
        <title>Stats | {process.env.NEXT_PUBLIC_SITE_NAME}</title>

      </Head>
      <h2 className="text-3xl"><span className='text-red'>~/projects/wip</span> <span
        className='text-white'>$ instagram <BlinkingCursor cursor={'_'}/></span></h2>
      <div>
        <h3 className="text-xl font-medium text-spotify mt-4">Spotify</h3>
        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <NowPlayingBlock/>
          <LastPlayedBlock/>
          <TopTracksBlock/>
          <TopArtistsBlock/>
        </div>
      </div>
    </>
  )
}

export default Stats
