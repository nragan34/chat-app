import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { NewsConfig } from 'src/app/interfaces/news-config';
import { LocalStorageService } from '../local-storage.service';
import { v4 as uuidv4 } from "uuid";
import { stringify } from 'querystring';


/**
 * This component is to manage api calls for news sources
 */

const AUTH_DATA = 'newsSubscriptions'

@Injectable({
  providedIn: 'root'
})
export class NewsConfigService {
  private readonly _newsSource = new BehaviorSubject<NewsConfig[]>([]);
  readonly news$ = this._newsSource.asObservable();

  configUrl = '';

  // configUrl = '';
  baseUrl = 'https://newsapi.org/v2/';
  apiKey = 'apiKey=b07f2494b86346c6b20a88ebe75babca';
  newsOptions = {
    everythingApple: ['Apple News', 'everything?q=apple&from=2022-02-05&to=2022-02-05&sortBy=popularity&',
      'All articles mentioning Apple from yesterday, sorted by popular publishers first'],
    everythingTesla: ['Tesla News', 'everything?q=tesla&from=2022-01-08&sortBy=publishedAt&', 'All articles about Tesla from the last month, sorted by recent first'],
    topBusinessUs: ['U.S. Business News', 'top-headlines?country=us&category=business&', 'Top business headlines in the US right now'],
    techCrunch: ['Tech Crunch News', 'top-headlines?sources=techcrunch&', 'Top headlines from TechCrunch right now'],
    wallStreet: ['Wall Street News', 'everything?domains=wsj.com&', 'All articles published by the Wall Street Journal in the last 6 months, sorted by recent first']
  }

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
    const news = this.localStorageService.getItem(AUTH_DATA);
    if (news?.length) {
      this._setNews(news)
    } else {
      console.log(news)
    }
  }

  getNews(): NewsConfig[] {
    return this._newsSource.getValue();
  }

  // set news article
  private _setNews(news: NewsConfig[] | any): void {
    this._newsSource.next(news);
    this.localStorageService.setItem(AUTH_DATA, news);
  }

  // add news article
  addNews(newsArticle: NewsConfig): void {
    const addNews = [
      ...this.getNews().filter(news => news.articles !== newsArticle.articles)
    ]
    this._setNews(addNews);
  }


  // When user subscribes trigger half of this to 
  // set value into NewsConfig
  // triger the get method by grabbing id
  // use id to ccall http get
  getConfig(url: string | undefined, key: string) {
    const getUrl = this.baseUrl + url + this.apiKey
    // const newsOptionValue = Object.keys(this.newsOptions[key]);
    return this.http.get<NewsConfig>(getUrl)
      .pipe(
        map(news => {
          const newsid = news.id = uuidv4();
          const newsArticles = news.articles = news.articles
          this._setNews([...this.getNews(), {
            id: uuidv4(),
            articles: newsArticles
        }])
          return news
          retry(3),
          catchError(this.handleError)
        })
      )
  }

  getConfigResponse(): Observable<HttpResponse<NewsConfig>> {
    return this.http.get<NewsConfig>(
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
