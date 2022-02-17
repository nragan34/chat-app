import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { NewsSource } from 'src/app/interfaces/newsSource';
import { environment } from 'src/environments/environment';

/**
 * news-config-service - 
 * 
 * Calls the news endpoint using the HttpClient:
 *  ::: endpoint baseUrl - https://newsapi.org/v2/
 * 
 * Handles get request errors
 * 
 */

const STORAGE_KEY = 'newsSubscriptions'

@Injectable({
  providedIn: 'root'
})
export class NewsConfigService {
  private readonly _newsSource = new BehaviorSubject<NewsSource[]>([]);
  readonly newsSource$ = this._newsSource.asObservable();

  constructor(private http: HttpClient) {
  }

  // get news articles from endpoint
  getNewsConfig(param: string): Observable<any> {
    // load environment variables
    const baseUrl = environment.newsapi.baseURL;
    const apiKey = environment.newsapi.apiKey;
    // build url 
    const fullUrl = `${baseUrl}` + param + `${apiKey}`
    return this.http.get(fullUrl)
      .pipe(
        retry(3), // retry request x3
        catchError(this.handleError), // catch error when fails
      )
  }

  // handle endpiont get errors
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

}
