import type { Article } from '../utils/gameLogic';

export const ARTICLES: Article[] = [
    {
        id: '0',
        headline: "",
        category: "",
        date: "",
        content: []
    },
    {
        id: '1',
        headline: "Government announces new plan to cut energy bills",
        category: "Politics",
        date: "2023-10-25",
        content: [
            "The government has announced a new plan to help millions of households with their energy bills this winter.",
            "Under the new scheme, eligible families will receive a one-off payment of £200 directly into their bank accounts.",
            "The Prime Minister stated that this support package is essential to protect the most vulnerable from rising costs.",
            "Critics have argued that the measures do not go far enough to address the underlying issues in the energy market."
        ]
    },
    {
        id: '2',
        headline: "SpaceX launches successfully from Texas starbase",
        category: "Science",
        date: "2023-11-01",
        content: [
            "SpaceX has successfully launched its massive Starship rocket from the starbase facility in Boca Chica, Texas.",
            "The uncrewed test flight achieved several key milestones, including stage separation and reaching orbital velocity.",
            "Elon Musk, the founder of SpaceX, congratulated the team on a 'historic achievement' that brings humanity closer to Mars.",
            "Environmental groups have raised concerns about the impact of the launch on the local wildlife refugee nearby."
        ]
    }
];

export function getEmptyArticle(): Article {
    return ARTICLES[0];
}

export async function getDailyArticle(): Promise<Article> {
    // For now, return the first one. In future, use date hashing.
    // const today = new Date().getDate();
    // convertArticle().then((article)=>{console.log(article)});
    // return ARTICLES[today % ARTICLES.length];
    const article = await convertArticle();
    return article;
}

async function convertArticle(): Promise<Article> {
    const url = 'https://www.bbc.co.uk/news/articles/cqxqzlrzlx1o';
    const response = await fetch(url);
    const result = await response.text();
    const htmlParser = new DOMParser();
    const parsedHTML = htmlParser.parseFromString(result, 'text/html');
    const paragraphElements = parsedHTML.querySelectorAll('p[class*="Paragraph"]')
    const headline = parsedHTML.querySelector('h1')?.textContent || '';
    const date = parsedHTML.querySelector('time')?.textContent || '';
    
    const paragraphs: string[] = [];
    paragraphElements.forEach((element)=>{paragraphs.push(element.textContent)})

    return {
        id: '0',
        headline,
        category: '',
        date,
        content:  paragraphs
    }
}