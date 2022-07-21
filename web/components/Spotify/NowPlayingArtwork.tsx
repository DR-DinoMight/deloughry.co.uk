import useSWR from 'swr';
import {NowPlayingSong} from "../../lib/spotify";
import Image from "next/future/image";
import {fetcher} from "../../lib/fetcher";
import { useEffect, useState } from 'react';


export default function NowPlayingArtwork() {
  const {data} = useSWR<NowPlayingSong>('/api/spotify/now-playing', fetcher, { refreshInterval: 5000 });

  const [artwork, setArtwork ] = useState();

  //cache the artwork in state  so we can still display it when no longer playing

  useEffect(() => {
    if (data && data.isPlaying) {
      setArtwork(data?.song?.albumArt[0]?.url)
    }
    }, [data]);

  const artworkStyle = {
    backgroundImage: `url("${artwork}")`
  }

  return (
    <div className="w-full h-screen relative overflow-hidden m-auto">
      {artwork && (<div className={`duration-500 ease-in-out ${data?.isPlaying ? 'opacity-0' : 'blur-lg opacity-100'} top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center items-center absolute inset-0 bg-cover bg-center z-0 border-white border-8 rounded-full h-screen aspect-square`} style={ artworkStyle}></div>)}
      <div className="h-full aspect-square left-1/2 relative -translate-x-1/2">
        <div className={`animate-spinslow relative h-full duration-1000 ease-in-out bg-black ${data?.isPlaying ? 'opacity-100' : 'opacity-0'} rounded-full border-black-50 border-8`}>
          <div className="inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute h-[96%] w-[96%] border-2 rounded-full border-black-300"></div>
          <div className="inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute h-[95%] w-[95%] border-2 rounded-full border-black-300/50"></div>
          <div className="inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute h-[90%] w-[90%] border-2 rounded-full border-black-300"></div>
          <div className="inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute h-[91%] w-[91%] border-2 rounded-full border-black-300/50"></div>
          <div className="inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute h-[86%] w-[86%] border-2 rounded-full border-black-300"></div>
          <div className="inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute h-[85%] w-[85%] border-2 rounded-full border-black-300/50"></div>
          <div className="inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute h-[80%] w-[80%] border-2 rounded-full border-black-300"></div>
          <div className="inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute h-[81%] w-[81%] border-2 rounded-full border-black-300/50"></div>
          <div className="inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute h-[76%] w-[76%] border-2 rounded-full border-black-300"></div>
          <div className="inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute h-[75%] w-[75%] border-2 rounded-full border-black-300/50"></div>
          <div className="inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute h-[70%] w-[70%] border-2 rounded-full border-black-300"></div>
          <div className="inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute h-[71%] w-[71%] border-2 rounded-full border-black-300/50"></div>
          <div className="inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute h-[66%] w-[66%] border-2 rounded-full border-black-300"></div>
          <div className="inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute h-[65%] w-[65%] border-2 rounded-full border-black-300/50"></div>
          <div className="inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute h-[60%] w-[60%] border-2 rounded-full border-black-300"></div>
          <div className="inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute h-[61%] w-[61%] border-2 rounded-full border-black-300/50"></div>
          <div className="inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute h-[56%] w-[56%] border-2 rounded-full border-black-300"></div>
          <div className="inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute h-[55%] w-[55%] border-2 rounded-full border-black-300/50"></div>
          <div className="inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute h-[50%] w-[50%] border-2 rounded-full border-black-300"></div>
          <div className="inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute h-[51%] w-[51%] border-2 rounded-full border-black-300/50"></div>

          <div className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center items-center absolute inset-0 bg-cover bg-center z-0 rounded-full h-30 aspect-square " style={ artworkStyle}></div>

          <div className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 justify-center items-center absolute w-[6%] aspect-square rounded-full bg-white"></div>
          <div className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 justify-center items-center absolute w-[5%] aspect-square rounded-full bg-[#191919]"></div>
        </div>
      </div>

      <div className={`text-center overflow-hidden absolute p-4 bottom-2 left-1/2 -translate-x-1/2 w-1/3 rounded-lg bg-black-300/50 transition-all duration-1000 ease-in-out ${data?.isPlaying ? 'opacity-100' : 'opacity-0'}`}>
        <p className="text-terminal-green">Now Playing: </p>
        <p className="text-2xl text-yellow-500 word-wrap w-full">
         {data?.song?.artist}
        </p>
        <p className="text-4xl whitespace-nowrap text-white animate-marquee">
         {data?.song?.name}
        </p>
      </div>
    </div>
  );
}
