import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NewsSource } from 'src/app/interfaces/newsSource';
import { initialNewsSource } from 'src/app/seeds/newsSource';
import { LocalStorageService } from '../local-storage.service';

/**
 * news-source-service - 
 * 
 * set newsSource to localStorage
 * 
 *  getNewsSource() - 
 *    ::: get all subscribed news sources
 * 
 *  getNewsSourceByUserId() - 
 *    ::: find newsSource by id
 */

const STORAGE_KEY = 'newsSources'

@Injectable({
  providedIn: 'root'
})
export class NewsSourceService {


  private readonly _newsSource = new BehaviorSubject<NewsSource[]>([]);
  readonly newsSource$ = this._newsSource.asObservable();

  constructor( private localStorageService: LocalStorageService) {
    const newsSource = this.localStorageService.getItem(STORAGE_KEY);
    if (newsSource?.length) {
      this._setNewsSource(newsSource)
    } else {
      this._setNewsSource(initialNewsSource)
    }
  }

    // set news article
    private _setNewsSource(newsSource: NewsSource[]) {
      this._newsSource.next(newsSource);
      this.localStorageService.setItem(STORAGE_KEY, newsSource);
    }

    getNewsSource(): NewsSource[] {
      return this._newsSource.getValue();
    }

    getNewsSourceByUserId(newsId: string): NewsSource | undefined {
      return this.getNewsSource().find(news => news.id === newsId)
    }

}
