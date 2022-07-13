import { NextRequest, NextResponse } from 'next/server'
import {upsertPageView} from "./lib/atlas";
import {setPageView} from "./lib/pageviews";


export function middleware(req: NextRequest) {

  if (!req.nextUrl.pathname.startsWith('/api') &&
      !req.nextUrl.pathname.startsWith('/og')) {
        const { pathname } = req.nextUrl
        setPageView(pathname);
      }

}
