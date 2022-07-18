import useSWR from 'swr';
import {NowPlayingSong} from "../../lib/spotify";
import Image from "next/future/image";
import {fetcher} from "../../lib/fetcher";
import { useEffect, useState } from 'react';


export default function NowPlayingArtwork() {
  const {data} = useSWR<NowPlayingSong>('/api/spotify/now-playing', fetcher, { refreshInterval: 5000 });

  const [artwork, useArtwork ] = useState();

  //cache the artwork in state  so we can still display it when no longer playing

  useEffect(() => {
    if (data && data.isPlaying) {
      useArtwork(data?.song?.albumArt[0]?.url)
    }
    }, [data]);


  return (
    <div className="w-full h-screen relative overflow-hidden m-auto">
      <div className={`${data?.isPlaying ? 'animate-spinslow' : ''} w-screen h-screen relative`}>
        <img src={artwork} className={`m-auto border-white border-8 rounded-full row-span-full col-span-full object-fill h-full aspect-square object-fill`}/>

      </div>
        {data?.isPlaying && (
          <div className='bg-black/20 absolute top-1/2'>
            <div className=" shadow-black drop-shadow-lg  rounded text-8xl  animate-marquee whitespace-nowrap">
              Now Playing: {data?.song?.name} - {data?.song?.artist}
            </div>
          </div>
        )}
    </div>
  );
}
