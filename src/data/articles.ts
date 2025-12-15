import type { Article } from '../utils/gameLogic';

const ARTICLES: Article[] = [
    {
        id: '0',
        headline: "",
        category: "",
        date: "",
        content: []
    }
];

export function getEmptyArticle(): Article {
    return ARTICLES[0];
}

const getArticleUrl = () => '/news/articles/cqxqzlrzlx1o';

export async function getDailyArticle(): Promise<Article> {
    const url = `https://www.bbc.co.uk/${getArticleUrl()}`;

    const response = await fetch(url);
    const html = await response.text();

    const htmlParser = new DOMParser();
    const parsedHTML = htmlParser.parseFromString(html, 'text/html');

    const paragraphElements = parsedHTML.querySelectorAll('p[class*="Paragraph"]')
    const paragraphs: string[] = [];
    paragraphElements.forEach((element)=>{paragraphs.push(element.textContent)});

    const headline = parsedHTML.querySelector('h1')?.textContent || '';
    const date = parsedHTML.querySelector('time')?.textContent || '';

    return {
        id: '0',
        headline,
        category: '',
        date,
        content:  paragraphs
    }
}