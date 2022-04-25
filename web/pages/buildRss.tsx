import client from "../lib/sanity";
import groq from "groq";
import fs from "fs";
import {buildRFC822Date} from "../helpers/Date";

const domain : string = 'https://deloughry.co.uk'

const buildRssItems = (logs : any[]) => {
  return logs.map((log) => {
    return `
      <item>
        <title>${log.title}</title>
        <description>${log.description}</description>
        <link>${domain}/logs/${log.slug.current}</link>
        <guid>${domain}/logs/${log.slug.current}</guid>
        <pubDate>${buildRFC822Date(log.publishedAt)}</pubDate>
      </item>
    `
  }).join('');
}

const BuildRss  = ({logs}) => {
  return (
    <div>
      <h1>Build RSS</h1>
      <p>
        This page rebuilds the RSS feed.
      </p>
    </div>
  )
}

export default BuildRss;

export async function getStaticProps() {
    const logs = await client.fetch(groq`
  *[_type == "logPost" && publishedAt < now()] | order(publishedAt desc) {
      "id": _id,
      title,
      slug,
      description,
      author->,
      category->,
      publishedAt
  }
`)

  const feedString : string  = `<?xml version="1.0"?>
    <rss version="2.0" 
      xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>Deloughry.co.uk</title>
        <link>${domain}</link>
        <atom:link 
          href="https://${domain}/feed.xml" 
          rel="self" 
          type="application/rss+xml" />
        <description>Developer. Streamer. Tweeter. &amp; a little bit of everything Nerdy!_</description>
        ${buildRssItems(logs)}
    </channel>
    </rss>`;


  fs.writeFile("./public/feed.xml", feedString, function (err) {
    if (err) {
      console.log(err);
    }
    console.log("feed.xml written to ./public!");
  });

  return {
    props: {
      feedString,
    },
  };
  }
