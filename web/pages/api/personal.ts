import cacheData from 'memory-cache';

const dataUrl = process.env.ATLAS_DATA_URL
const dataKey = process.env.ATLAS_DATA_KEY


const fetchWithCache = async (url: string, options: any) => {
  const value = cacheData.get(url);
  if (value) {
    return value;
  } else {
    const response = await fetch(url, {
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
        "sort": { "$natural": -1 },
        "limit": 1
      })
    });

    const body = await response.json();
    //cache data for 30 mins
    cacheData.put(url, body, 1800000);

    return body;
  }
}

export default async function handler(req, res) {
  const documents = await fetchWithCache(`${dataUrl}/action/find`, {});

  if (documents) {
    //get the first document and return it
    const document = documents.documents[0];
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 's-maxage=36000, stale-while-revalidate');
    res.status(200).json(document);
  }
  else {
    res.status(500).send('Error fetching data');
  }
}
