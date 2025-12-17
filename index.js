import * as htmlparser2 from "htmlparser2";
import * as cssSelect from 'css-select';
import * as domutils from 'domutils';

const getArticleUrl = () => '/news/articles/cqxqzlrzlx1o';

export const handler = async (event) => {
  const url = `https://www.bbc.co.uk/${getArticleUrl()}`;

  const response = await fetch(url);
  const html = await response.text();
  const dom = htmlparser2.parseDocument(html);

  const paragraphElements = cssSelect.selectAll('p[class*="Paragraph"]', dom);
  const paragraphs = [];
  paragraphElements.forEach((element)=>{paragraphs.push(domutils.textContent(element))});

  const headlineElement = cssSelect.selectOne('h1', dom);
  const dateElement = cssSelect.selectOne('time', dom);
  const headline = domutils.textContent(headlineElement);
  const date = domutils.textContent(dateElement);

  return {
    statusCode: 200,
    body: {
      id: '0',
      headline,
      category: '',
      date,
      content:  paragraphs
    }
  };
};
