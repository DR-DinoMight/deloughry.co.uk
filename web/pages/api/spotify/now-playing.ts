// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import {getCurrentlyPlaying, NowPlayingSong} from "../../../lib/spotify"

export default async (
  req: NextApiRequest,
  res: NextApiResponse
) => {

  const spotifyResponse = await getCurrentlyPlaying()

  if (spotifyResponse === undefined) {
    return res.status(200).json({ isPlaying: false });
  }

  const song = spotifyResponse;
  const isPlaying = song.is_playing;

  const isMusic = song.currently_playing_type === 'track';

  if ( song && song.item && isPlaying && isMusic) {
    return res.status(200).json({
      isPlaying: true,
      song: {
        name: song.item.name,
        artist: "artists" in song.item ? song.item.artists.map((_artist: { name: any; }) => _artist.name).join(', ') : 'N/A',
        album: "album" in song.item ? song.item.album.name: null,
        albumArt: "album" in song.item ? song.item.album.images : null,
        duration: song.item.duration_ms,
        progress: song.progress_ms,
        uri: song.item.external_urls.spotify
      }
    });
  }

  return res.status(200).json({ isPlaying: false });
}
