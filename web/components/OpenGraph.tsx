import {buildQueryString} from "../lib/url-helpers";

export const OpenGraph = (props) => {
  const {
    title = "Deloughry.co.uk",
    description = "",
    ogImageParams,
    path = "/",
  } = props;

  return (
    <>
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" key="twcard"/>
      <meta name="twitter:creator" content="@Dr_DinoMight" key="twhandle"/>
      <meta name="twitter:title" content={title} key="twtitle"/>
      <meta name="twitter:description" content={description} key="twdescription"/>
      <meta name="twitter:image" content={`https://deloughry.co.uk/.netlify/functions/og${ogImageParams ? buildQueryString(ogImageParams) : ''}`} key="twimage"/>
      {/* Open Graph */}

      {/* Open Graph */}
      <meta property="og:url" content={`https://deloughry.co.uk${path}`} key="ogurl"/>
      <meta property="og:image"
            content={`https://deloughry.co.uk/.netlify/functions/og${ogImageParams ? buildQueryString(ogImageParams) : ''}`}
            key="ogimage"/>
      <meta property="og:locale" content="en_GB" key="oglocale"/>
      <meta property="og:site_name" content={process.env.NEXT_PUBLIC_SITE_NAME} key="ogsitename"/>
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="600" />
      <meta property="og:title" content={title} key="ogtitle"/>
      <meta property="og:description" content={description} key="ogdesc"/>
    </>
  );
}
export default OpenGraph;
