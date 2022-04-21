import Image from "next/image";
import BlinkingCursor from "./BlnkingCursor";

const Header = () => {
  return (
    <div className='flex mb-12'>
      <div className='mr-20 flex flex-column align-middle hidden md:block'>
        <Image src="/images/me.jpg" alt="Me" width={300} height={300} layout='fixed' className='rounded-full'/>
      </div>
      <h1 className='text-4xl md:text-6xl'>
        <span className='text-orange-600'>Developer.</span><br/><span
        className='text-twitch'>Streamer.</span><br/><span className='text-twitter'>Tweeter.</span><br/>&amp; a
        little bit of everything <span className='text-red'>Nerdy!</span>
        <BlinkingCursor cursor="_" className='font-bold'/>
      </h1>
    </div>
  );
}

export default Header;
