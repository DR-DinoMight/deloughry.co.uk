import {useEffect, useState} from "react";

export const useWebMentions = (url?: string) => {
  const [mentions, setMentions] = useState([]);
  useEffect(() => {
    console.log(`https://webmention.io/api/mentions.jf2?${process.env.WEBMENTION_USERNAME}&token=${process.env.WEBMENTION_TOKEN}`)
    fetch(
      `https://webmention.io/api/mentions.jf2?${process.env.WEBMENTION_USERNAME}&token=${process.env.WEBMENTION_TOKEN}`
    )
      .then((response) => response.json())
      .then((result) => {
        let filtered = [];
        if (result && result.children) {
         filtered = result.children.filter((mention) => {
          if (url) {
            return mention['wm-target'] === url;
          }
          return true;
        });
      }
        setMentions(filtered);
      });
  }, []);

  return mentions;
}
