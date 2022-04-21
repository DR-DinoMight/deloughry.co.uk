import type {NextPage} from 'next'
import BlinkingCursor from "../../components/BlnkingCursor";
import client from "../../lib/sanity";
import groq from "groq";
import Link from 'next/link';
import Head from 'next/head'
import PageViews from "../../components/PageViews";

const Logs  = ({logs}) => {

  return (
    <>
      <h2 className="text-3xl"><span className='text-red'>/var/logs</span> <span
        className='text-white'>$ ls -la <BlinkingCursor cursor={'_'}/></span></h2>

      <div className="flex flex-wrap">
        {logs.map(log => (
          <Link href="/logs/[slug]" as={`/logs/${log.slug.current}`} key={log.id}>
            <a className="w-full p-2 no-underline hover:underline text-white">
              <div className="p-2 rounded-lg">
                <div className="flex flex-row space-between items-center">
                  <h3
                  className="text-xl font-bold flex-1 text-white">{log.title}</h3>
                  <span
                  className={` ${log.category.textColor} mr-2`}>{log.category.title}</span> @ <PageViews url={`/logs/${log.slug.current}`} className={`ml-2 ${log.category.textColor}`}/></div>
                <p className={`text-sm text-gray-400 mt-4`}>{log.description}</p>
              </div>
            </a>
          </Link>
        ))
        }
      </div>
    </>
  )
}

export default Logs

export async function getStaticProps() {
  const logCount = await client.fetch(
    groq`*[_type == "logPost"] | count`
  );

  const logs = await client.fetch(groq`
    *[_type == "logPost" && publishedAt < now() ]| order(publishedAt desc) {
      "id": _id,
      title,
      slug,
      description,
      category->
    }
  `)
  return {
    props: {
      logs
    }
  }
}
