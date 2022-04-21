import LogType from '../types/LogType';
import BlinkingCursor from "./BlnkingCursor";
import {formatPublishedDateForDateTime, formatPublishedDateForDisplay} from "../helpers/Date";
import Link from 'next/link';

import PageViews from "./PageViews";

interface Props {
  logs: LogType[];
  selectCategory?: string;
}


const LogItem = ({log}) => {


  let categoryBgColor, categoryTextColor, categoryBorderColor;
  //if category is undefined set the default calors and such
  if (log.category === undefined) {
    categoryBgColor = 'bg-black-600';
    categoryTextColor = 'text-black';
    categoryBorderColor = 'border-black-600';
  } else {
    categoryBgColor = log.category.backgroundColor;
    categoryTextColor = log.category.textColor;
    categoryBorderColor = categoryBgColor.replace('bg', 'border');
  }

  return (
    <Link href="/logs/[slug]" as={`/logs/${log.slug.current}`}>
      <a key={log.title}
         className={`no-underline ${categoryBorderColor} text-white transition cursor-pointer ease-in-out delay-150 motion-reduce:transition-none motion-reduce:transform-none hover:scale-95 hover:grow-2 rounded-lg border-4 hover:underline`}>

        <div
          className={` flex flex-col space-between shadow-lg overflow-hidden  flex-1 p-6 flex flex-col justify-between hover:pink-500/50 grow h-full space-3`}>
          <div className="flex grow-0 items-center space-x-1 text-xs">
            <time dateTime={formatPublishedDateForDateTime(log.publishedAt)}>{formatPublishedDateForDisplay(log.publishedAt)}</time>
          </div>
          <h3 className="text-md font-semibold grow my-4 leading-1">{log.title}</h3>
          <div className="flex justify-between text-xs">
            <div className="flex flex-col">
              <p>Posted in: </p>
              {(log.category != undefined) && (<p className={`text-sm font-medium no-underline hover:no-underline ${categoryTextColor}`}>{log.category.title}</p>)}
            </div>
            <div className="flex flex-col">
              <p>Views:</p>
              <p><PageViews url={`/logs/${log.slug.current}`} className={`${categoryTextColor}`}/></p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}

const LogList = (
  {
    logs, selectCategory = 'all'
  }
    : Props) => {
  return (
    <div>
      <h2 className="text-3xl"><span className='text-red'>/var/logs</span> <span
        className='text-white'>$ cat {selectCategory}.log &gt; list<BlinkingCursor cursor={'_'}/></span></h2>
      <div className="my-6 grid gap-8 lg:grid-cols-3 lg:gap-x-10">
        {logs.map((log) => {
          return <LogItem key={log.id} log={log}/>
        })}
      </div>
      <Link href="/logs/">
        <a className="text-sm mt-12 ">
          READ MORE LOG POSTS &gt;
        </a>
      </Link>
    </div>
  )
}

export default LogList;
