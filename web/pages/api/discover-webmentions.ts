// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import type { WebmentionOptions } from '../../lib/webmention-discovery';
import { webmentionDiscovery } from '../../lib/webmention-discovery';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const options : WebmentionOptions = {
    postCount: Number(process.env.WEBMENTION_POST_COUNT) || 1,
    feedUrl: process.env.WEBMENTION_FEED_URL,
    logFileLocation: process.env.WEBMENTION_LOG_LOCATION,
    domainsToIgnoreString: process.env.WEBMENTION_IGNORED_DOMAINS,
    // dryRun: true
  }

  if (req.query.key !== `${process.env.WEBMENTION_KEY}`) {
    res.status(401).json({
      error: 'Unauthorized'
    })
    return;
  }

  const webmentionData = await webmentionDiscovery(options);

  res.status(200).json({
    name: 'discover-webmentions',
    results: webmentionData
  });
}
