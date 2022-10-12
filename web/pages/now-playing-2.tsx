
import Image from "next/future/image";
import {useRouter} from "next/router";
import NowPlayingArtworkFull from "../components/Spotify/NowPlayingArtworkFull";

const Index = () => {
  return (
    <div className="w-full h-screen" >
        <NowPlayingArtworkFull />
    </div>
  );
};

Index.getLayout = function getLayout(children) {
  return <>{children}</>
}

export default Index;
