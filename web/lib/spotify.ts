const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')

const NOW_PLAYING_URL = 'https://api.spotify.com/v1/me/player/currently-playing'
const TOP_PLAYING_TRACK_URL = 'https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=3'
const TOP_PLAYING_ARTIST_URL = 'https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=3'
const RECENTLY_PLAYED_URL = 'https://api.spotify.com/v1/me/player/recently-played?limit=1'


export type NowPlayingSong = {
  isPlaying: boolean;
  song?: SpotifySong
};


export type SpotifySong = {
  name: string;
  artist: string;
  album: string;
  albumArt: any[];
  uri: string;
};

// GET ACCESS TOKEN
const getAccessToken = async () => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `grant_type=refresh_token&refresh_token=${refresh_token}&user-library-read`
  })
  const json = await response.json()
  return json.access_token
}

// GET CURRENTLY PLAYING
const getCurrentlyPlaying = async () : Promise<SpotifyApi.CurrentlyPlayingObject | undefined> => {
  const accessToken = await getAccessToken()
  const response = await fetch(NOW_PLAYING_URL, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  if (response.status === 204 || response.status > 404) {
    return undefined
  }
  return await response.json()
}

// GET LAST SONG
const getLastSong = async () : Promise<SpotifyApi.TrackObjectFull | undefined> => {
  const accessToken = await getAccessToken()
  const response = await fetch(RECENTLY_PLAYED_URL, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  const json = await response.json()
  return json.items[0]?.track
}


// GET TOP TRACKS
const getTopTracks = async () : Promise<SpotifyApi.TrackObjectFull[] | undefined> => {
  const accessToken = await getAccessToken()
  const response = await fetch(TOP_PLAYING_TRACK_URL, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  const json = await response.json()
  return json.items
}

// GET TOP ARTISTS
const getTopArtists = async () => {
  const accessToken = await getAccessToken()
  const response = await fetch(TOP_PLAYING_ARTIST_URL, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  const json = await response.json()
  return json
}

export {
  getCurrentlyPlaying,
  getTopTracks,
  getTopArtists,
  getLastSong
}
