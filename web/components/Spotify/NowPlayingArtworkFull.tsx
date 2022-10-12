import useSWR from 'swr';
import {NowPlayingSong} from "../../lib/spotify";
import Image from "next/future/image";
import {fetcher} from "../../lib/fetcher";
import { useEffect, useState } from 'react';


export default function NowPlayingArtworkFull() {
  const {data} = useSWR<NowPlayingSong>('/api/spotify/now-playing', fetcher, { refreshInterval: 5000 });

  const [artwork, setArtwork ] = useState();

  //cache the artwork in state  so we can still display it when no longer playing

  useEffect(() => {
    if (data && data.isPlaying) {
      setArtwork(data?.song?.albumArt[0]?.url)
    }
    }, [data]);

  const artworkStyle = {
    backgroundImage: `url("${artwork}")`,
    backgroundRepeat: 'no-repeat',
    backgroundBlendMode: 'screen',
    backgroundSize: '100% 100%',
    filter: 'blur(6px) brightness(60%)',
    transition: 'background-image 0.2s ease-in-out',
    animation: 'fadein 2s ease-in'
  }

  return (
    <div className="overflow-hidden relative m-auto w-full h-screen">
      <div style={data?.isPlaying ? artworkStyle : {}} className="w-screen h-screen">
      </div>
      <div className='flex absolute bottom-10 left-10 gap-8 w-full'>
        <img src={artwork} className="w-1/4 rounded-2xl border-8 border-white animate-fadein" 
        key={artwork}/>
        <div className="overflow-hidden self-end w-2/4">
          <p className="w-full text-4xl word-wrap">
          {data?.song?.artist}
          </p>
          <p className="text-6xl text-white whitespace-nowrap animate-marquee">
          {data?.song?.name}
          </p>
        </div>
      </div>
    </div>
  );
}
