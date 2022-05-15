import client, {clientForPreview} from '../../lib/sanity'
import groq from "groq";
import {PortableText, PortableTextComponents} from '@portabletext/react'
import {PtComponents, urlFor} from "../../helpers/TextHelpers";
import BlinkingCursor from "../../components/BlnkingCursor";
import {formatPublishedDateForDateTime, formatPublishedDateForDisplay} from "../../helpers/Date";
import Head from 'next/head'
import PageViews from "../../components/PageViews";
import {useRouter} from 'next/router'
import WebMentions from "../../components/WebMentions";
import {buildQueryString} from "../../lib/url-helpers";
import {OgQueryParams} from "../../types/OgQueryParams";

const LogPost = (props) => {
  const router = useRouter();
  const {
    title = '',
    name = '',
    description = '',
    category = null,
    authorImage,
    body = [],
    publishedAt = '',
    timeSincePublished = '',
    headerImage = null,
    slug = null,
  } = props.logPost
  return (
    <>
      <Head>
        <title>{title} | {process.env.NEXT_PUBLIC_SITE_NAME}</title>
        <meta name="author" content={name}/>
        <meta name="description" content={description}/>
        {/* Twitter */}
        <meta name="twitter:card" content="summary" key="twcard"/>
        <meta name="twitter:creator" content="@Dr_DinoMight" key="twhandle"/>
        <meta name="twitter:title" content={title} key="twtitle"/>
        <meta name="twitter:description" content={description} key="twdescription"/>
        <meta name="twitter:image" content={props.ogImage} key="twimage"/>
        {/* Open Graph */}

        {/* Open Graph */}
        <meta property="og:url" content={`https://deloughry.co.uk${router.asPath}`} key="ogurl"/>
        <meta property="og:image"
              content={props.ogImage}
              key="ogimage"/>
        <meta property="og:site_name" content={process.env.NEXT_PUBLIC_SITE_NAME} key="ogsitename"/>
        <meta property="og:title" content={title} key="ogtitle"/>
        <meta property="og:description" content={description} key="ogdesc"/>
      </Head>
      <article>
        <h2 className="text-3xl"><span className='text-red'>/var/logs</span> <span
          className='text-white'>$ {title}<BlinkingCursor cursor={'_'}/></span></h2>
          <div className="mt-6 flex items-center">
            <div className="flex-shrink-0">
              <span className="sr-only">{name}</span>
              <img className="h-10 w-10 rounded-full" src={urlFor(authorImage).width(100).url()} alt=""/>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">
                By {name}
              </p>
              <div className="flex space-x-1 text-sm">
                <time
                  dateTime={formatPublishedDateForDateTime(publishedAt)}>{formatPublishedDateForDisplay(publishedAt)}</time>
                <span aria-hidden="true">&middot;</span>
              </div>
            </div>
          </div>
          {category &&
              <p className={`text-red text-lg`}>Posted in: <span
                  className={`${category.textColor}`}>{category.title}</span></p>
          }
          <p className={`text-red text-lg`}>Views: <PageViews url={`/logs/${slug.current}`}
                                                              className={`ml-2 ${category.textColor}`}/></p>
          <PortableText
            value={body}
            components={PtComponents}
          />

      </article>
      <div>
        <h3 className="text-xl font-medium text-purple mt-4">Mentions about this page from around the web</h3>
        <div className="flex flex-col">
          <WebMentions url={`https://deloughry.co.uk${router.asPath}`} />
        </div>
      </div>
    </>
  )
}

const query = groq`*[_type == "logPost" && slug.current == $slug][0]{
  "id": _id,
  slug,
  title,
  description,
  publishedAt,
  "timeSincePublished": dateTime(now()) - dateTime(publishedAt),
  "name": author->name,
  "authorImage": author->image,
  category->,
 body
 }`

export async function getStaticPaths() {

  let sanityClient = client;
  if (process.env.SANITY_READ_ONLY_PREVIEW_TOKEN) {
    sanityClient = clientForPreview;
  }

  const paths = await sanityClient.fetch(
    `*[_type == "logPost" && defined(slug.current)][].slug.current`
  )

  return {
    paths: paths.map((path: any) => ({
      params: {
        slug: path
      }
    })),
    fallback: false
  }
}

export async function getStaticProps(context: any) {
  let sanityClient = client;
  if (process.env.SANITY_READ_ONLY_PREVIEW_TOKEN) {
    sanityClient = clientForPreview;
  }

  const {slug = ""} = context.params
  const logPost = await sanityClient.fetch(
    query,
    {slug}
  )

  const ogImageParams: OgQueryParams = {
    title: logPost.title,
    category: logPost.category,
    publishedOn: new Date(logPost.publishedAt).toLocaleString(),
  }
  const ogImage = await fetch(`https://deloughry.co.uk/.netlify/functions/og${buildQueryString(ogImageParams)}`)
      .then(res => res.text());
  // const ogImage = `https://deloughry.co.uk/images/me.jpg`;
  console.log(ogImage);
  return {
    props: {
      logPost,
      ogImage
    },
  }
}

export default LogPost
