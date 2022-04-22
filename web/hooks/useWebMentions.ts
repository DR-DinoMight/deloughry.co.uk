import {useEffect, useState} from "react";

export const useWebMentions = (url?: string) => {
  const [mentions, setMentions] = useState([]);
  useEffect(() => {-
    fetch(
      `https://webmention.io/api/mentions.jf2?deloughry.co.uk&token=bpZ72emNGYIKhE3iNJO4SA`
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
