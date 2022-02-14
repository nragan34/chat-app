export interface News {
    push();
    id: string,
    articles: [
        {
            source: {
                id: string,
                name: string,
            },
            author: string,
            title: string,
            description: string,
            url: string,
            urlToImage: string,
            publishedAt: string,
            content: string
        }
    ],
    pair: [string, string]
}
