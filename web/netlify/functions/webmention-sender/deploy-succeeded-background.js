const { builder } = require("@netlify/functions");
import fetch from 'node-fetch';


exports.handler = builder(async function (event, context) {
    // GET CONFIG
    // FEED URL TO LOOK UP
    const feedUrl = process.env.WEBMENTION_FEED_URL;

    // if feedUrl is not set, return error message and exit
    if (!feedUrl) {
        return {
            statusCode: 500,
            body: "WEBMENTION_FEED_URL is not set",
        };
    }

    // HOW MANY POSTS TO FETCH
    const postCount = process.env.WEBMENTION_POST_COUNT;

    // USING CONFIG SEE HOW MANY POSTS TO CHECK AND WHERE.
    // go fetch the feed xml, parse it, and get the posts ordered by date
    const postLinks = await fetchFeedPostLinks(feedUrl, postCount);
    let results = [];
    // THEN SEARCH THE PAGE(S) FOR ALL EXTERNAL LINKS
    for (const postLink of postLinks) {
        const links = await resolveLinksOnURL(postLink);
        // THEN CHECK IF ANY OF THE LINKS ARE WEBMENTION ENDPOINTS
        for (const link of links) {
            // IF WEBMENTION ENDPOINT, SEND WEBMENTION
            if (await sendWebmention(link, postLink)) {
                results.push('Sent webmention to ' + link);
            }
            else {
                results.push('Failed to send webmention to ' + link);
            }

        }
    }
    return {
        statusCode: 200,
        body: JSON.stringify(results),
    };
});

const sendWebmention = async (url, srcLink) => {
    if (!url) {
        throw new Error("No link provided");
    }

    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status ${res.status}`);
    }

    const headers = res.headers.get("Link");
    if (headers) {
        const webmentionLink = headers.match(/<(.*)>; rel="webmention"/);
        if (webmentionLink) return await postLink(webmentionLink[1], srcLink);
    }

    //can't finde webmention link, try to find it in the html
    const html = await res.text();
    const webmentionLink = html.match(/<link rel="webmention" href="(.*)"/);
    if (webmentionLink) return await postLink(webmentionLink[1], srcLink);

    throw new Error(`Could not find webmention link in ${url}`);
};

const postLink = async (url, postLink) => {
    // const res = await fetch(url, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //         source: postLink,
    //         target: url,
    //     }),
    // });
    // return res.ok;

    return true;
}

const fetchFeedPostLinks = async (feedUrl, postCount) => {
    return fetch(feedUrl)
        .then(res => res.text())
        .then(body => {
            // Get the RSS feed and parse the items without dom
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(body, "text/xml");
            const items = xmlDoc.getElementsByTagName("item");
            //order by pubDate and pluck the postCount number of posts
            const posts = Array.from(items).sort((a, b) => {
                const aDate = new Date(a.getElementsByTagName("pubDate")[0].textContent);
                const bDate = new Date(b.getElementsByTagName("pubDate")[0].textContent);
                return aDate - bDate;
            }).slice(0, postCount);
            return posts;
        })
        .then(posts => {
            // Get the links from the posts
            return Array.from(posts).map(post => {
                return post.getElementsByTagName("link")[0].textContent;
            });
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
}

const resolveLinksOnURL = async (link) => {
    if (!link) {
        throw new Error("No link provided");
    }

    const res = await fetch(link);

    if (!res.ok) {
        throw new Error(`Could not fetch ${link}, status ${res.status}`);
    }

    // search the html of res for links to external urls
    const html = await res.text();
    const links = html.match(/<a[^>]*href="([^"]*)"[^>]*>/g);
    if (!links) {
        return [];
    }
    const allLinks = links.map(link => link.match(/<a[^>]*href="([^"]*)"[^>]*>/)[1]);
    // filter out links that are not external
    return  allLinks.filter(link => link.startsWith("http"));
}
