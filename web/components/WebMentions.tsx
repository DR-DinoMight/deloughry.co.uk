import {useWebMentions} from "../hooks/useWebMentions";

export default function WebMentions({url, className}: {url?: string, className?: string}) {
  const webMentions = useWebMentions(url);

  return (
    <div className={className}>
      <h2>Mentions</h2>
      <p>
        This {url ? 'page' : 'site' } has been mentioned {webMentions.length} times.
      </p>
      {webMentions.map((mention, index) => (
        <div
          style={{
            display: 'grid',
            gap: '1rem',
            gridTemplateColumns: '100px 1fr',
          }}
          key={index}
        >
          <a href={mention.author.url}>
            <img
              style={{ width: 100 }}
              src={mention.author.photo}
              alt={mention.author.name}
            />
          </a>
          <div dangerouslySetInnerHTML={{ __html: mention.content.html }} />
        </div>
      ))}
    </div>
  );
}
