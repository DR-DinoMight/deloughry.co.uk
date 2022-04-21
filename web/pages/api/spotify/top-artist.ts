// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import {getCurrentlyPlaying, getLastSong, getTopArtists, getTopTracks, NowPlayingSong} from "../../../lib/spotify"

export default async (
  req: NextApiRequest,
  res: NextApiResponse
) => {

  const spotifyResponse = await getTopArtists()

  if (spotifyResponse === undefined) {
    return res.status(200).json({ isPlaying: false });
  }
  const artists = spotifyResponse;
  // return res.status(200).json(artists);

  if ( artists) {
    //for each track organise the data
    const artistsData = artists.items.map( track => {
      return {
        name: track.name,
        image: track.images,
        uri: track.external_urls.spotify,
      }
    })
    return res.status(200).json(artistsData);
  }

  return res.status(200).json({ isPlaying: false });
}
