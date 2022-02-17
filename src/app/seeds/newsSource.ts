import { NewsSource } from "../interfaces/newsSource";

export const initialNewsSource: NewsSource[] = [
    {
        id: '1',
        name: 'Apple News',
        param: 'everything?q=apple&from=2022-02-05&to=2022-02-05&sortBy=popularity&',
        description: 'All articles mentioning Apple from yesterday, sorted by popular publishers first'
    },
    {
        id: '2',
        name: 'Tesla News',
        param: 'everything?q=tesla&from=2022-02-08&sortBy=publishedAt&',
        description: 'All articles about Tesla from the last month, sorted by recent first'
    },
    {
        id: '3',
        name: 'U.S. Business News',
        param: 'top-headlines?country=us&category=business&',
        description: 'Top business headlines in the US right now'
    },
    {
        id: '4',
        name: 'Tech Crunch News',
        param: 'top-headlines?sources=techcrunch&',
        description: 'Top headlines from TechCrunch right now'
    },
    {
        id: '5',
        name: 'Wall Street News',
        param: 'everything?domains=wsj.com&',
        description: 'All articles published by the Wall Street Journal in the last 6 months, sorted by recent first'
    }
]