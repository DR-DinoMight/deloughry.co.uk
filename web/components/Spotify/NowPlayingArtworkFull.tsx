import useSWR from 'swr';
import {NowPlayingSong} from "../../lib/spotify";
import Image from "next/future/image";
import {fetcher} from "../../lib/fetcher";
import { useEffect, useRef, useState } from 'react';
import { Textfit } from 'react-textfit';


export default function NowPlayingArtworkFull() {

  const {data} = useSWR<NowPlayingSong>('/api/spotify/now-playing', fetcher, { refreshInterval: 5000 });

  const [artwork, setArtwork ] = useState();

  //cache the artwork in state  so we can still display it when no longer playing

  useEffect(() => {
    if (data && data.isPlaying) {
      setArtwork(data?.song?.albumArt[0]?.url)
    }
    }, [data]);

  const nowPlayingRef = useRef(null);

  const artworkStyle = {
    backgroundImage: `url("${artwork}")`,
    backgroundRepeat: 'no-repeat',
    backgroundBlendMode: 'screen',
    backgroundSize: '100% 100%',
    filter: 'blur(6px) brightness(60%)',
    transition: 'background-image 0.2s ease-in-out',
    animation: 'fadein 2s ease-in'
  }

  let overflowing = (nowPlayingRef.current.offsetWidth < nowPlayingRef.current.scrollWidth);

  return (
    <div className="overflow-hidden relative m-auto w-full h-screen">
      <div style={data?.isPlaying ? artworkStyle : {}} className="w-screen h-screen">
      </div>
      <div className='flex absolute bottom-10 left-10 gap-8 w-full'>
        <img src={artwork} className="w-1/4 rounded-2xl border-8 border-white animate-fadein"
        key={artwork}/>
        <div className="overflow-hidden self-end w-full">
          <p className="w-2/3 text-3xl font-black word-wrap">
          {data?.song?.artist}
          </p>
          <div className="overflow-hidden w-2/3 text-6xl font-light text-white whitespace-nowrap" ref={nowPlayingRef}>
             <p className={`inline-block ${overflowing ? 'animate-bouncingText' : ''}`}>{data?.song?.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
