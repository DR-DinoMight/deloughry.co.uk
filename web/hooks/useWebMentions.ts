import {useEffect, useState} from "react";

export type WebMentionsTypes = {
  likes: any,
  reposts: any,
  mentions: any
}

export const useWebMentions= (url?: string) : WebMentionsTypes => {
  const [mentions, setMentions] = useState<WebMentionsTypes| undefined>(undefined);
  useEffect(() => {
    const wmUrl = 'https://webmention.io/api/mentions.jf2?deloughry.co.uk&token=bpZ72emNGYIKhE3iNJO4SA';
    const target = url ? `${wmUrl}&target=${url}` : wmUrl
    fetch(
      target
    )
      .then((response) => response.json())
      .then((mentions) => {
        if (mentions.children) {
          const mentionsWithoutLikeOrReposts = mentions.children.filter((mention) => mention['wm-property'] !== 'like-of' && mention['wm-property'] !== 'repost-of');
          const totalLike = mentions.children.filter((mention) => mention['wm-property'] === 'like-of');
          const totalRepost = mentions.children.filter((mention) => mention['wm-property'] === 'repost-of');

          const webMentions: WebMentionsTypes =
            {
              likes: totalLike,
              reposts: totalRepost,
              mentions: mentionsWithoutLikeOrReposts
            };
          console.log(webMentions);
          setMentions(webMentions);
        }
      });
  }, []);

  return mentions;
}
