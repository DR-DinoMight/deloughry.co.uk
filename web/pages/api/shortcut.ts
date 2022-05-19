// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import {ShortcutOptionsType} from "../../types/ShortcutOptionsType";
import {addNewShortcutEntry} from "../../lib/atlas";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.query.key !== `${process.env.WEBMENTION_KEY}`) {
    res.status(401).json({
      error: 'Unauthorized'
    })
    return;
  }

  //parse the json body into ShortcutOptionsType
  const options: ShortcutOptionsType = JSON.parse(req.body);

  const response = await addNewShortcutEntry(options);

  if (!response.ok) {
    res.status(500).json({
      error: response.statusText
    })
  }
  else {
    res.status(200).json({
      message: 'Success'
    })
  }
}
