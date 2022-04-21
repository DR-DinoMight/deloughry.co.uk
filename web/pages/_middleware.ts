import { NextRequest, NextResponse } from 'next/server'
import {upsertPageView} from "../lib/atlas";
import {setPageView} from "../lib/pageviews";


export function middleware(req: NextRequest) {

  const { pathname } = req.nextUrl
  setPageView(pathname);
}
