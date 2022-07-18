
import Image from "next/future/image";
import {useRouter} from "next/router";
import NowPlayingArtwork from "../components/Spotify/NowPlayingArtwork";

const Index = () => {
  return (
    <div className="w-full h-screen" >
        <NowPlayingArtwork />
    </div>
  );
};

Index.getLayout = function getLayout(children) {
  return <>{children}</>
}

export default Index;
