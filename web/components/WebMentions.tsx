import {useWebMentions, WebMentionsTypes} from "../hooks/useWebMentions";
import {stripDomainFromString} from "../helpers/TextHelpers";

export default function WebMentions({url, className}: {url?: string, className?: string}) {
  const webMentions : WebMentionsTypes = useWebMentions(url);

  const mentionTypes = {
    'in-reply-to': 'Replied',
    'bookmark-of': 'Bookmarked',
    'mention-of': 'Mentioned',
    'rsvp': 'RSVPed',
  }

  if (webMentions)
  {
    return (
      <>
        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div>
            <span className="flex flex-row mb-4">
                <svg className="w-6 h-6 mr-2 text-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /> </svg>
                <p className="text-red"><span className="text-white">Likes</span> {webMentions.likes.length}</p>
            </span>
            <ul className="flex flex-row ">
              {webMentions.likes.map((like, index) => (
                <li className="mr-2" key={index}><a target="_blank" rel="noopener noreferrer" href={like.author.url} title={like.author.name}><img src={like.author.photo} alt={`Avatar for ${like.author.name}`} className={'rounded-full w-10 h-10  border-2 border-red'}/></a></li>
              ))}
            </ul>
          </div>
          <div>
            <span className='flex flex-row mb-4'>
            <svg className="w-6 h-6 text-terminal-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            <p className="ml-2 text-terminal-green"><span
              className="text-white">Reposts</span> {webMentions.reposts.length}</p>
          </span>
          <ul className="flex flex-row ">
            {webMentions.reposts.map((like, index) => (
              <li className="mr-2" key={index}><a target="_blank" rel="noopener noreferrer" href={like.author.url} title={like.author.name}><img src={like.author.photo}
                                                                                           alt={`Avatar for ${like.author.name}`}
                                                                                           className={'rounded-full w-10 h-10  border-2 border-terminal-green'}/></a>
              </li>
            ))}
          </ul>
          </div>
        </div>
        <div className={'mt-6'}>
          <h4 className={'flex flex-row'}><svg className="w-6 h-6 mr-2 text-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg> Mentions</h4>
          <ul className={'flex flex-row mt-4'}>
            {webMentions.mentions.map((mention, index) => (
              <li key={index} className="px-4 py-5 bg-black-300 border-4 border-purple shadow rounded-lg overflow-hidden sm:p-6 transition-all duration-400">
                  <span className="flex flex-row items mb-6 align-middle item-center">
                    <a target="_blank" rel="noopener noreferrer" href={mention.author.url} title={mention.author.name}><img
                      src={mention.author.photo} alt={`Avatar for ${mention.author.name}`}
                      className={'rounded-full w-10 h-10 border-2 border-purple'}/></a>
                  <p
                    className="ml-2 self-center">
                      <a target="_blank" rel="noopener noreferrer" href={mention.author.url} title={mention.author.name}>{mention.author.name}</a> {mentionTypes[mention['wm-property']]} on <time className="font-bold">{new Date(mention.published).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}</time></p>
                </span>
                <div>
                  {mention.content ? <p className={'mb-6'}>"{mention.content.text}"</p> : null}
                  {!url ? (<small className={'text-xs text-purple'}>..about the page <a target="_blank" rel="noopener noreferrer" href={mention['wm-target']}>{stripDomainFromString(mention['wm-target'])}</a></small>) : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }
  return <></>;
}
