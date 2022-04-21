// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {getPageViewCount} from "../../lib/atlas";
import rateLimit from "../../lib/rate-limit";


const limiter = rateLimit({
  interval: 10 * 1000, // 10 seconds
  uniqueTokenPerInterval: 500, // 500 tokens per interval
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //see if rate limit is exceeded if so return 429
  try {
    await limiter.check(res, 100, 'PAGE_VIEW_CACHE');
  } catch (err) {
    res.status(429).json({
      error: err.message,
    });
    return;
  }

  // Get the query string parameter url
  const {u} = req.query

  // If no url is provided, return an 0
  if (!u) {
    res.status(200).json({
      pageviews: 0
    })
  }

  // Otherwise, return the number of pageviews for the provided url
  // call  getPageViewCount(url)
  const pageviews = await getPageViewCount(u.toString());
  res.status(200).json({
    views: pageviews
  })
}
