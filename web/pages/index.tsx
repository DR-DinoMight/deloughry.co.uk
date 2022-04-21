import type {NextPage} from 'next'
import Head from 'next/head'

import Header from "../components/Header";
import LogList from "../components/LogList";
import WhoAmI from "../components/WhoAmI";
import NowPlaying from "../components/Spotify/NowPlaying";
import client from '../lib/sanity'
import groq from "groq";

// @ts-ignore
const Home: NextPage = ({logs}) => {

  return (
    <>
      <Head>
        <title>Passionately Nerdy - {process.env.NEXT_PUBLIC_SITE_NAME}</title>
        <meta name="description" content="A home for the nerdy"/>
      </Head>
      <Header />
      <div>

        <NowPlaying/>
        <WhoAmI />
        <LogList logs={logs} />
      </div>
    </>
)
}

export default Home


export async function getStaticProps() {
  console.log(client)
  const logCount = await client.fetch(
    groq`*[_type == "logPost"] | count`
  );

  const logs = await client.fetch(groq`
    *[_type == "logPost" && publishedAt < now()][0..2] | order(publishedAt desc) {
      title,
      slug,
      mainImage,
      publishedAt,
      "timeSincePublished": dateTime(now()) - dateTime(publishedAt),
      "name": author->name, 
      "authorImage": author->image,
      category->
    }
  `)
  return {
    props: {
      logs
    }
  }
}
