import {OgQueryParams} from "../types/OgQueryParams";

export const buildQueryString = (query: OgQueryParams) => encodeURI(Object.keys(query)
  .reduce((acc, cur, index) => query[cur] ? `${acc}${index === 0 ? '' : '&'}${cur}=${query[cur]}` : acc, '?'));

