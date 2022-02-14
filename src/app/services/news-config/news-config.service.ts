import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { News } from 'src/app/interfaces/news';
import { LocalStorageService } from '../local-storage.service';
import { v4 as uuidv4 } from "uuid";

/**
 * This component is to manage api calls for news sources
 */

const STORAGE_KEY = 'newsSubscriptions'

@Injectable({
  providedIn: 'root'
})
export class NewsConfigService {
  private readonly _newsSource = new BehaviorSubject<News[]>([]);
  readonly news$ = this._newsSource.asObservable();

  configUrl = '';

  // api stuff
  baseUrl = 'https://newsapi.org/v2/';
  apiKey = 'apiKey=b07f2494b86346c6b20a88ebe75babca';

  // news params
  // see how you can use this to get urls
  // newsParams = new HttpParams()
  //   .set('apple', 'everything?q=apple&from=2022-02-05&to=2022-02-05&sortBy=popularity&')
  //   .set('tesla', 'everything?q=tesla&from=2022-02-08&sortBy=publishedAt&')
  //   .set('business', 'top-headlines?country=us&category=business&')
  //   .set('tech', 'top-headlines?sources=techcrunch&')
  //   .set('wallstreet', 'everything?domains=wsj.com&')


  // news options object
  newsOptions = {
    everythingApple: ['Apple News',
      'everything?q=apple&from=2022-02-05&to=2022-02-05&sortBy=popularity&',
      'All articles mentioning Apple from yesterday, sorted by popular publishers first'],
    everythingTesla: ['Tesla News',
      'everything?q=tesla&from=2022-02-08&sortBy=publishedAt&',
      'All articles about Tesla from the last month, sorted by recent first'],
    topBusinessUs: ['U.S. Business News',
      'top-headlines?country=us&category=business&',
      'Top business headlines in the US right now'],
    techCrunch: ['Tech Crunch News',
      'top-headlines?sources=techcrunch&',
      'Top headlines from TechCrunch right now'],
    wallStreet: ['Wall Street News',
      'everything?domains=wsj.com&',
      'All articles published by the Wall Street Journal in the last 6 months, sorted by recent first']
  }

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
    const news = this.localStorageService.getItem(STORAGE_KEY);
    if (news?.length) {
      this._setNews(news)
    } else {
      console.log(news)
    }
  }


  // set news article
  private _setNews(news: News[] | any): void {
    this._newsSource.next(news);
    this.localStorageService.setItem(STORAGE_KEY, news);
  }



  // getNewsByActiveUser(newsKey: string | undefined): string[] {
  //   return newsKey
  //     ? this.getNews().reduce<string[]>((acc, cur) => {
  //       let newsKey;
  //       if (cur.pair[0] === newsKey) newsKey = cur.pair[1];
  //       if (cur.pair[1] === newsKey) newsKey = cur.pair[0];
  //       if (newsKey) acc.push(newsKey);
  //       return acc;
  //     }, [])
  //     : [];
  // }



  // find news article 
  getNewsByActiveUser(userId: string, newsArticle: string) {
    const news = this.getNews();
    const targetNews = news.find(
      (news) => news.pair[0].includes(userId) && news.pair[1].includes(newsArticle)
    )
    return targetNews
  }

  // add news article
  // set news to user [userId, newsOptions key]
  addNews(newsArticle: string, userId: string): void {
    // if not newsArticle or undefined returned
    if (!this.getNewsByActiveUser(userId, newsArticle) || undefined) {
      this._setNews([
        ...this.getNews(),
        {
          id: uuidv4(),
          pair: [userId, newsArticle]
        }
      ])
    }
  }

  // get news
  getNews(): News[] {
    return this._newsSource.getValue();
  }

  getNewsById(newsId: string): News | undefined {
    console.log('getting news by id... ', this.getNews().find(news => news.id === newsId))
    return this.getNews().find(news => news.id === newsId)
  }


  // When user subscribes
  // set value to NewsConfig
  // set id
  // use id to call http get
  getConfig(url: string | undefined, key: string) {
    // build url 
    const fullUrl = `${this.baseUrl}` + url + `${this.apiKey}`
    return this.http.get<News>(fullUrl)
      .pipe(
        retry(3), // retry get request 3 times
        map(news => {
          this._setNews([...this.getNews(), {
            id: uuidv4(),
            articles: news.articles
          }])
          return news
        }),
        // catch error if get request fails
        catchError(this.handleError),
      )
  }

  // get configuration response
  getConfigResponse(): Observable<HttpResponse<News>> {
    return this.http.get<News>(
      this.configUrl, { observe: 'response' });
  }

  // handle error
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  makeIntentionalError() {
    return this.http.get('not/a/real/url')
      .pipe(
        catchError(this.handleError)
      );
  }


}
