// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import {getCurrentlyPlaying, getLastSong, NowPlayingSong} from "../../../lib/spotify"

export default async (
  req: NextApiRequest,
  res: NextApiResponse
) => {

  const spotifyResponse = await getLastSong()

  if (spotifyResponse === undefined) {
    return res.status(200).json({ isPlaying: false });
  }
  const track = spotifyResponse;
  // return res.status(200).json(spotifyResponse);

  if ( track) {
    return res.status(200).json({
        name: track.name,
        artist: "artists" in track ? track.artists.map((_artist: { name: any; }) => _artist.name).join(', ') : 'N/A',
        album: "album" in track ? track.name: null,
        albumArt: "album" in track ? track.album.images : null,
        uri: track.external_urls.spotify,
    });
  }

  return res.status(200).json({ isPlaying: false });
}
