import Document, {Html, Head, Main, NextScript} from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
          <link rel="manifest" href="/site.webmanifest"/>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com"/>
          <link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=JetBrains+Mono&display=swap"
                rel="stylesheet"/>
          <link rel="webmention" href="https://webmention.io/deloughry.co.uk/webmention" />
          <link rel="pingback" href="https://webmention.io/deloughry.co.uk/xmlrpc" />
          <link
            rel="alternate"
            type="application/rss+xml"
            title="RSS Feed for deloughry.co.uk"
            href="https://deloughry.co.uk/feed.xml"
          />
        </Head>
        <body>
          <Main/>
          <NextScript/>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
