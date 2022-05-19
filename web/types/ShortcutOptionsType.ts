export type ShortcutOptionsType = {
  updated?: Date,
  time: {
    timezone: string,
    tz_abbr: string,
  },
  geo : {
    date: Date,
    locality: string,
    region: string,
    country: string,
  },
  battery: {
    percentage: number,
    isCharging?: boolean,
  },
  weather: {
    date: Date,
    description: string,
    temp_c: number,
    humidity: number,
    wind_mph: number,
  },
}
