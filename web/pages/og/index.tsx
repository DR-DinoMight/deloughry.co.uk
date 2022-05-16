
import Image from "next/image";
import {useRouter} from "next/router";
import {OgQueryParams} from "../../types/OgQueryParams";

const Index = () => {
  const router = useRouter();
  const {
    image,
    title,
    likes,
    comments,
    shares,
    category,
    categoryColor,
    publishedOn
  } : OgQueryParams | any = router.query;


  return (
    <div className="flex items-center justify-between h-screen m-auto gap-4 mx-20" >
      <div className='flex'>
        <Image src={image ?? "/images/me.jpg"} alt="Me" width={300} height={300} layout='fixed' className='rounded-lg'/>
      </div>
      <div className='w-3/4 flex flex-col'>
        <h1 className='text-5xl leading-tight'>
          {!title && (
            <>
              <span className='text-orange-600'>Developer.</span><br/><span
              className='text-twitch'>Streamer.</span><br/><span className='text-twitter'>Tweeter.</span><br/>&amp; a
              little bit of<br/> everything <span className='text-red'>Nerdy!</span>
            </>
          ) }
          {title}_
        </h1>
        <ul className="flex w-full justify-between mt-10 text-3xl items-center">
          {category && <li className={(categoryColor ?? 'text-terminal-green' )}><span className='text-white'>In:</span> {category}</li>}
          {publishedOn && (<li className='text-terminal-green'>On: <span className="text-white">{publishedOn}</span></li>) }
          <li className={(likes && likes > 0) ? "flex justify-center items-center gap-2" : "hidden"}>
            <svg className="w-10 h-10 mr-2 text-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /> </svg>
            {likes ?? 0}
          </li>
          <li className={(shares && shares > 0) ?  "flex justify-center items-center gap-2" : "hidden"}>
            <svg className="w-10 h-10 text-terminal-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            {shares ?? 0}
          </li>
          <li className={(comments && comments > 0) ?  "flex justify-center items-center gap-2" : "hidden"}>
            <svg className="w-10 h-10 mr-2 text-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
            {comments ?? 0}
          </li>
          {!category && !publishedOn && <li className="text-terminal-green">
              https://deloughry.co.uk
          </li>}

        </ul>
      </div>
    </div>
  );
};

Index.getLayout = function getLayout(children) {
  return <>{children}</>
}

export default Index;
