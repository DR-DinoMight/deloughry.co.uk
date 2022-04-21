import {PortableTextComponents} from "@portabletext/react";
import {SanityImageSource} from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";
import client from "../lib/sanity";
import React from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { xt256 } from 'react-syntax-highlighter/dist/cjs/styles/hljs';


export const PtComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <img
          alt={value.alt || ' '}
          loading="lazy"
          className="py-4"
          src={urlFor(value).fit('max').auto('format').url()}
        />
      )
    },
    code: ({ value }) => {
      if (!value || !value.code) { return null }
      const {language, code} = value;
      return (
        <SyntaxHighlighter language={language || 'text'} wrapLines={true} showLineNumbers={true} style={xt256} className="my-4 text-sm">
          {code}
        </SyntaxHighlighter>
      )
    }
  },
  marks: {
    em: ({children}) => <em>{children}</em>,
    strong: ({children}) => <strong>{children}</strong>,
    code: ({children}) => <code className="text-terminal-green bg-black text-sm p-1">{children}</code>,
  },
  block: {
    blockquote: ({children}) => <blockquote className="border-terminal-green text-sm bg-black border-l-8 p-8 m-6 text-terminal-green italic text-white">{children}</blockquote>,
    h2: ({children}) => <h2 className="text-3xl font-bold">{children}</h2>,
    h3: ({children}) => <h3 className="text-2xl font-bold py-2 text-terminal-green">{children}</h3>,
  },
  list: {
    // Ex. 1: customizing common list types
    bullet: ({children}) => <ul className="my-4 list-inside">{children}</ul>,
    number: ({children}) => <ol className="my-4 list-inside">{children}</ol>,

    // Ex. 2: rendering custom lists
    checkmarks: ({children}) => <ol className="m-auto text-lg">{children}</ol>,
  },
  listItem: {
    // Ex. 1: customizing common list types
    bullet: ({children}) => <li className="pl-4 py-2 list-disc text-white-50">{children}</li>,
    number: ({children}) => <li className="pl-4 py-2 list-decimal" >{children}</li>,

    // Ex. 2: rendering custom list items
    checkmarks: ({children}) => <li>✅ {children}</li>,
  },
}

export const urlFor =  (source: SanityImageSource) => {
  return imageUrlBuilder(client).image(source)
}
