import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { NewsConfig } from 'src/app/interfaces/news-config';
import { LocalStorageService } from '../local-storage.service';
import { stringify } from 'querystring';

const AUTH_DATA = 'newsSubscriptions'

@Injectable({
  providedIn: 'root'
})
export class NewsConfigService {
  private readonly _newsConfigSource = new BehaviorSubject<NewsConfig[]>([]);
  readonly newsConfig$ = this._newsConfigSource.asObservable();

  configUrl = 'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=b07f2494b86346c6b20a88ebe75babca';

  // configUrl = '';
  baseUrl = 'https://newsapi.org/v2/';
  apiKey = 'apiKey=b07f2494b86346c6b20a88ebe75babca';
  newsOptions = {
    everythingApple: ['Apple News','everything?q=apple&from=2022-02-05&to=2022-02-05&sortBy=popularity&',
    'All articles mentioning Apple from yesterday, sorted by popular publishers first'] ,
    topBusinessUs: ['U.S. Business News', 'top-headlines?country=us&category=business&', 'Top business headlines in the US right now'],
    techCrunch: ['Tech Crunch News', 'top-headlines?sources=techcrunch&', 'Top headlines from TechCrunch right now'],
    wallStreet: ['Wall Street News', 'everything?domains=wsj.com&', 'All articles published by the Wall Street Journal in the last 6 months, sorted by recent first']
  }

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {

  }

  private _setNews(news: NewsConfig[] | any): void {
    this._newsConfigSource.next(news);
    this.localStorageService.setItem(AUTH_DATA, news);
  }

  getNews(): NewsConfig[] {
    return this._newsConfigSource.getValue();
  }

  newsUrlBuilder(newsOption: string) {
    const configUrl = this.baseUrl + newsOption + this.apiKey;
    this.configUrl = configUrl
    this.getConfig()
  }

  // get config and retry 3 times
  getConfig() {
    return this.http.get<NewsConfig>(this.configUrl)
      .pipe(
        retry(3),
        catchError(this.handleError)
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
