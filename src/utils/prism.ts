import escapeHtml from 'escape-html';
import Prism from 'prismjs';

// highlight the codeBlock with prismjs
function highlight(text: string, language: string) {
  const lang = language.toLowerCase();

  // if the language can't be found, the default value is javascript
  if (!lang || !Prism.languages[lang])  return wrapCode(text, 'js');

  const code = Prism.highlight(text, Prism.languages[lang], lang);
  return wrapCode(code, lang);
}

function wrapCode(code: string, lang: string) {
  const codeHtml = lang === 'text' ? escapeHtml(code) : code;
  return `<pre v-pre class="language-${lang}"><code>${codeHtml}</code></pre>`;
}

export { highlight };
