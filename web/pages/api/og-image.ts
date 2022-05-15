import { NextApiRequest, NextApiResponse } from 'next';
import { OgQueryParams } from '../../types/OgQueryParams';

const generateQueryString = (query: OgQueryParams) => encodeURI(Object.keys(query)
  .reduce((acc, cur, index) => query[cur] ? `${acc}${index === 0 ? '' : '&'}${cur}=${query[cur]}` : acc, '?'));


export default async (req: NextApiRequest, res: NextApiResponse) => {
  const params : OgQueryParams = req.query;
  const { buffer } = await fetch(`https://deloughry.co.uk/.netlify/functions/og${generateQueryString(params)}`).then(res => res.json());

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ buffer }));
};
