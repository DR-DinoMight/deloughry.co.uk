import * as LRU from 'lru-cache';
import {scalarOptions} from "yaml";
import Int = scalarOptions.Int;

const rateLimit =  (options : {interval: Number, uniqueTokenPerInterval: Number}) => {

  const tokenCache = new LRU({
    max: options.uniqueTokenPerInterval,
    maxAge: options.interval
  });
   const check = async (res, limit, token) => {
     new Promise<void>((resolve, reject) => {
       const tokenCount = tokenCache.get(token) || [0]
       if (tokenCount[0] === 0) {
         tokenCache.set(token, tokenCount)
       }
       tokenCount[0] += 1

       const currentUsage = tokenCount[0]
       const isRateLimited = currentUsage >= parseInt(limit, 10)
       res.setHeader('X-RateLimit-Limit', limit)
       res.setHeader(
         'X-RateLimit-Remaining',
         isRateLimited ? 0 : limit - currentUsage
       )

       return isRateLimited ? reject(429) : resolve()
     });
  }
  return {
     check
  }
}

export default rateLimit
