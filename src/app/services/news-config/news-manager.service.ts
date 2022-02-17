import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NewsSource } from 'src/app/interfaces/newsSource';
import { initialNewsSource } from 'src/app/seeds/newsSource';
import { LocalStorageService } from '../local-storage.service';


const STORAGE_KEY = 'newsSource'

/**
 * This component is to manage user subscriptions
 */
@Injectable({
  providedIn: 'root'
})
export class NewsManagerService {

  private readonly _newsSource = new BehaviorSubject<NewsSource[]>([]);
  readonly newsSource$ = this._newsSource.asObservable();

  constructor( private localStorageService: LocalStorageService) {
    const newsSource = this.localStorageService.getItem(STORAGE_KEY);
    console.log('news Source 1.... ', newsSource)
    if (newsSource?.length) {
      console.log(newsSource, 'news source!')
      this._setNewsSource(newsSource)
    } else {
      console.log(initialNewsSource, 'news source!')
      this._setNewsSource(initialNewsSource)
    }
  }

  // set news article
  private _setNewsSource(newsSource: NewsSource[]) {
    this._newsSource.next(newsSource);
    console.log('....loging news source', newsSource)
    this.localStorageService.setItem(STORAGE_KEY, newsSource);
  }

  // setNewsSource(newsSource: NewsSource[]) {
  //   this._newsSource.next(newsSource);
  //   this.localStorageService.setItem(STORAGE_KEY, newsSource);
  // }

  getNewsSource(): NewsSource[] {
    return this._newsSource.getValue()
  }

}
