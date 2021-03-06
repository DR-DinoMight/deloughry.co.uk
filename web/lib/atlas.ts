
import {ShortcutOptionsType} from "../types/ShortcutOptionsType";

const dataUrl = process.env.ATLAS_DATA_URL
const dataKey = process.env.ATLAS_DATA_KEY

const upsertPageView = async (pageUrl : string ) => {
  const response = await fetch(`${dataUrl}/action/updateOne`, {
    method: 'POST',
    headers: {
      'Access-Control-Request-Headers': '*',
        'api-key': dataKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "dataSource": "M4P",
      "database": "website",
      "collection": "views",
      "filter": { "name": pageUrl },
      "update": {
        "$set": {
          "updatedAt": `${new Date().toISOString()}`,
        },
        "$inc": {
          "views": 1
        }
      },
      "upsert": true
    })
  });
  return await response.json();
}

const getPageViewCount = async (pageUrl : string ) => {
  const response = await fetch(`${dataUrl}/action/findOne`, {
    method: 'POST',
    headers: {
      'Access-Control-Request-Headers': '*',
        'api-key': dataKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "dataSource": "M4P",
      "database": "website",
      "collection": "views",
      "filter": {
        "name": pageUrl
      }
    })
  });

  const body = await response.json();
  return body?.document?.views || 0;
}

const addNewShortcutEntry = async (options : ShortcutOptionsType) => {
  return await fetch(`${dataUrl}/action/insertOne`, {
    method: 'POST',
    headers: {
      'Access-Control-Request-Headers': '*',
      'api-key': dataKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "dataSource": "M4P",
      "database": "website",
      "collection": "shortcuts",
      "document": options
    })
  });
}

export {
  upsertPageView,
  getPageViewCount,
  addNewShortcutEntry
}
