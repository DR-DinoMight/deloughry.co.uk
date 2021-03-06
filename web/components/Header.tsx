import Image from "next/future/image";
import BlinkingCursor from "./BlnkingCursor";

const Header = () => {
  return (
    <div className='flex mb-12 md:flex-row md:gap-6 flex-col'>
      <Image src="/images/me.jpg" alt="Me" width={300} height={300} className='rounded-lg md:mb-0 mb-6 align-middle justify-center'/>
      <h1 className='text-4xl md:text-5xl'>
        <span className='text-orange-600'>Developer.</span><br/><span
        className='text-twitch'>Streamer.</span><br/><span className='text-twitter'>Tweeter.</span><br/>&amp; a
        little bit of everything <span className='text-red'>Nerdy!</span>
        <BlinkingCursor cursor="_" className='font-bold'/>
      </h1>
    </div>
  );
}

export default Header;
