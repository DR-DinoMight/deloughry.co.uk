import webmentionDiscovery from './webmention-discovery';
import {WebmentionOptions, FeedLog, ReferenceLink} from "./types";
import {fetchLogEntry, referenceLinkExists, upsertLogEntry} from "./logging";

export {
    webmentionDiscovery,
    fetchLogEntry,
    referenceLinkExists,
    upsertLogEntry
};

export type {
    WebmentionOptions,
    FeedLog,
    ReferenceLink
};
