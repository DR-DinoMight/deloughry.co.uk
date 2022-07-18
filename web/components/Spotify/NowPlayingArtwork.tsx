import useSWR from 'swr';
import {NowPlayingSong} from "../../lib/spotify";
import Image from "next/future/image";
import {fetcher} from "../../lib/fetcher";


export default function NowPlayingArtwork() {
  const {data} = useSWR<NowPlayingSong>('/api/spotify/now-playing', fetcher, { refreshInterval: 5000 });

  return (
    <div className="w-full h-screen relative overflow-hidden m-auto">
        {data?.isPlaying && (
          <img src={data?.song?.albumArt[0]?.url} alt={data?.song?.name} className="m-auto border-white border-8 rounded-full animate-spinslow row-span-full col-span-full object-fill h-full aspect-square"/>
        )}
        <div className='bg-black/20 absolute top-1/2'>
          <div className=" shadow-black drop-shadow-lg  rounded text-8xl  animate-marquee whitespace-nowrap">
            Now Playing: {data?.song?.name} - {data?.song?.artist}
          </div>
        </div>

    </div>
  );
}
