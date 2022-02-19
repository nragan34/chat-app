import { NewsSource } from "../interfaces/newsSource";

export const initialNewsSource: NewsSource[] = [
    {
        id: '1',
        name: 'Ad Week',
        param: 'adweek',
        description: 'adweek.com news articles'
    },
    {
        id: '2',
        name: 'ABC News',
        param: 'abcnews',
        description: 'abc news news articles'
    },
    {
        id: '3',
        name: 'Apple Insider',
        param: 'appleinsider',
        description: 'apple insider news articles'
    },
    {
        id: '4',
        name: 'ARS Technica',
        param: 'arstechnica',
        description: 'arstechnica news articles'
    },
    {
        id: '5',
        name: 'Smashing Magazine',
        param: 'smashingmagazine',
        description: 'smashing magazine news articles'
    },
    {
        id: '6',
        name: 'USA Today',
        param: 'usatoday',
        description: 'usa today news articles'
    },
    {
        id: '7',
        name: 'The Atlantic',
        param: 'theatlantic',
        description: 'the atlantic news articles'
    }
    // {
    //     id: '2',
    //     name: 'Tesla News',
    //     param: 'everything?q=tesla&from=2022-02-08&sortBy=publishedAt&',
    //     description: 'All articles about Tesla from the last month, sorted by recent first'
    // },
    // {
    //     id: '3',
    //     name: 'U.S. Business News',
    //     param: 'top-headlines?country=us&category=business&',
    //     description: 'Top business headlines in the US right now'
    // },
    // {
    //     id: '4',
    //     name: 'Tech Crunch News',
    //     param: 'top-headlines?sources=techcrunch&',
    //     description: 'Top headlines from TechCrunch right now'
    // },
    // {
    //     id: '5',
    //     name: 'Wall Street News',
    //     param: 'everything?domains=wsj.com&',
    //     description: 'All articles published by the Wall Street Journal in the last 6 months, sorted by recent first'
    // }
]