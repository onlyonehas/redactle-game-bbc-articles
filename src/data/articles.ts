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

export async function getDailyArticle(): Promise<Article> {
    const url = `https://f1950jcnl7.execute-api.eu-west-1.amazonaws.com/`;

    const response = await fetch(url);
    const json = await response.json();

    return json;
}