// import React from 'react';
import * as React from 'react';

import './assets/index.css';
import './assets/markdown.css';

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getAnchorLink, getInstance } from './utils';

let options: MkOptions;

// render dom tree by recursion
function renderTree(tree: HeadlinesItem[]) {
  return (
    <div>
      {tree.map(({ element, items }: HeadlinesItem, index: number) => (
        <div key={index}>
          {element && <QueryLink element={element} />}
          {items.length !== 0 && <ul>{renderTree(items)}</ul>}
        </div>
      ))}
    </div>
  );
}

// get h1 ~ h6 tags from string of html
function getHeadlines(mdHtml: string): HTMLElement[] {
  const fragment = document.createElement('div');
  fragment.innerHTML = mdHtml;
  const headlines: HTMLElement[] = Array.from(
    fragment.querySelectorAll('h1, h2, h3, h4, h5, h6')
  );
  return headlines.filter((h: HTMLElement) => h.id);
}

// get H-tag's level, such as: H2 --> 2
function getTagLevel(tag: string): number {
  const match = tag.match(/\d/g) || [];
  return Number(match[0]) || 1;
}

// convert flatten arr to tree
function flattenToTree(mdHtml: string) {
  const headline = getHeadlines(mdHtml);
  const stack: HeadlinesItem[] = [];
  const root: HeadlinesItem = { id: 0, element: null, items: [] };
  let wrapper;
  headline.reduce((prev: number, curr: HTMLElement) => {
    const currentLevel = getTagLevel(curr.tagName);
    const offset = currentLevel - prev;
    const child: HeadlinesItem = {
      id: currentLevel,
      element: curr,
      items: [],
    };

    while (
      offset <= 0 &&
      stack.length > 0 &&
      currentLevel - stack[stack.length - 1].id <= 0
    ) {
      stack.pop();
    }

    wrapper = stack[stack.length - 1] || root;
    wrapper.items.push(child);
    stack.push(child);

    return stack[stack.length - 1].id;
  }, root.id);
  return [root];
}

function Toc({ mdHtml }: TocProps) {
  const [tree, setTree] = useState<HeadlinesItem[]>([]);

  useEffect(() => {
    if (mdHtml) {
      const tree = flattenToTree(mdHtml);
      setTree(tree);
    }
  }, [mdHtml]);

  return (
    <div className="nav">
      <div className="nav-toc">{renderTree(tree)}</div>
    </div>
  );
}

// Toc's link tag
function QueryLink({ element }: QueryLinkProps) {
  let active = '';
  let linkTo = '';
  const { hash, search, pathname } = useLocation();
  const hashInElement = (element.children[0] as HTMLAnchorElement).hash;
  const { id: to } = element;
  const { isHashRouter, anchorId } = options;

  if (isHashRouter) {
    const searchInLink = hashInElement.split('?')[1];
    active = search.slice(1) === searchInLink ? 'active' : '';
    linkTo = getAnchorLink({ search, pathname, to, anchorId });
  } else {
    active = hash === hashInElement ? 'active' : '';
    linkTo = `#${to}`;
  }

  return (
    <li>
      <a href={linkTo} className={`anchor ${active}`}>
        {element.innerText.slice(1)}
      </a>
    </li>
  );
}

function MarkdownPage(props: MkProps) {
  if (!props.markdownText) return null;

  const defaultOptions: MkOptions = {
    markdownText: '',
    isHashRouter: false,
    themeColor: '#5e7ce0',
    anchorId: '_to',
    markdownInstance: null,
  };

  options = { ...defaultOptions, ...props };
  let { markdownText, isHashRouter, markdownInstance, anchorId } = options;
  const { search, pathname } = useLocation();
  const searchParams = new URLSearchParams(search);
  const to = searchParams.get(anchorId);

  // Set markdown styles
  const setThemeColor = () => {
    const { themeColor } = props;
    if (!themeColor) return;

    const color = themeColor.startsWith('#') ? themeColor.slice(1) : themeColor;
    document.documentElement.setAttribute('style', `--theme-color: #${color}`);
  };

  // convert markdown text to html , user's markdown-it instance is first
  const parseMd = () => {
    if (!markdownInstance) {
      markdownInstance = getInstance({
        search,
        pathname,
        isHashRouter,
        anchorId,
      });
    }

    return markdownInstance.render(markdownText);
  };

  useEffect(() => {
    if (isHashRouter) {
      document.querySelector(`#${to}`)?.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [to]);

  setThemeColor();
  const markdownHtml = parseMd();

  return (
    <div className="markdown-content">
      <Toc mdHtml={markdownHtml} />
      <div
        className="markdown-section"
        dangerouslySetInnerHTML={{ __html: markdownHtml }}
      ></div>
    </div>
  );
}

export default MarkdownPage;
