interface HeadlinesItem {
  id: number;
  element: HTMLElement | null;
  items: HeadlinesItem[];
}

interface TocProps {
  mdHtml: string;
}

interface MkProps {
  markdownText: string;
  isHashRouter?: boolean;
  themeColor?: string;
  anchorId?: string;
  markdownInstance?: MarkdownIt;
}

interface MkOptions {
  markdownText: string;
  isHashRouter: boolean;
  themeColor: string;
  anchorId: string;
  markdownInstance?: MarkdownIt;
}

interface QueryLinkProps {
  element: HTMLElement;
}

interface AnchorLink {
  search: string;
  pathname:string;
  to: string;
  anchorId: string;
};

interface MarkdownItProps {
  search: string;
  pathname: string;
  isHashRouter: boolean;
  anchorId: string;
}