import MarkdownIt from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';
import uslug from 'uslug';

import { highlight } from './prism';
import { getAnchorLink } from './paths';

export default function getInstance({
  search,
  pathname,
  isHashRouter,
  anchorId,
}: MarkdownItProps) {
  const instance = new MarkdownIt({
    highlight,
    html: true,
    linkify: true,
    typographer: true,
  });

  instance.use(markdownItAnchor, {
    permalinkSymbol: '',
    permalink: true,
    permalinkBefore: true,
    // escape special characters, such as: API Reference  --> api-reference
    slugify: (s: string) => uslug(s),
    [isHashRouter ? 'permalinkHref' : '']: (to: string) => {
      return getAnchorLink({ search, pathname, to, anchorId });
    },
  });

  return instance;
}
