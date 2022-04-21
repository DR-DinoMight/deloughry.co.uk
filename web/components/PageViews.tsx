import useSWR from "swr";
import { useRouter } from "next/router";
const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function PageViews({url, className}: {url?: string, className?: string}) {
  const router = useRouter();
  // if url is not provided, use the current url
  const queryUrl = url || router.query.url;
  const {data} = useSWR(`/api/pageviews?u=${queryUrl}`, fetcher);

  return <span className={className}>{data?.views || 0}</span>;
}
