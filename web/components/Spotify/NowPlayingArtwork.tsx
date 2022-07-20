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

  const artworkStyle = {
    backgroundImage: `url("${artwork}")`
  }

  return (
    <div className="w-full h-screen relative overflow-hidden m-auto">
      <div className={`duration-500 ease-in-out ${data?.isPlaying ? 'opacity-0' : 'blur-lg opacity-100'} top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center items-center absolute inset-0 bg-cover bg-center z-0 border-white border-8 rounded-full h-screen aspect-square`} style={ artworkStyle}></div>
      <div className={`animate-spinslow relative w-screen h-screen duration-1000 ease-in-out ${data?.isPlaying ? 'opacity-100' : 'opacity-0'}`}>
        <div className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center items-center absolute inset-0 bg-cover bg-center z-0 border-white border-8 rounded-full h-screen aspect-square " style={ artworkStyle}></div>
        <div className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 justify-center items-center absolute w-[6%] aspect-square rounded-full bg-white"></div>
        <div className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 justify-center items-center absolute w-[5%] aspect-square rounded-full bg-[#191919]"></div>
      </div>
          <div className={`bg-black/20 absolute top-1/2 -translate-y-1/2 transition-all duration-1000 ease-in-out ${data?.isPlaying ? 'opacity-100' : 'opacity-0'}`}>
            <div className=" shadow-black drop-shadow-lg  rounded text-8xl animate-marquee whitespace-nowrap">
              Now Playing: {data?.song?.name} - {data?.song?.artist}
            </div>
          </div>
    </div>
  );
}
