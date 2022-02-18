import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NewsManager } from 'src/app/interfaces/newsManager';
import { initialNewsManager } from 'src/app/seeds/newsManager';
import { LocalStorageService } from '../local-storage.service';
import { v4 as uuidv4 } from "uuid";


const STORAGE_KEY = 'managedNewsSource'

/**
 * This component is to manage user subscriptions
 */
@Injectable({
  providedIn: 'root'
})
export class NewsManagerService {

  private readonly _managedNewsSource = new BehaviorSubject<NewsManager[]>([]);
  readonly managedNewsSource$ = this._managedNewsSource.asObservable();

  constructor(private localStorageService: LocalStorageService) {
    const managedNewsSource = this.localStorageService.getItem(STORAGE_KEY);
    if (managedNewsSource?.length) {
      this._setManagedNewsSource(managedNewsSource)
    } else {
      this._setManagedNewsSource(initialNewsManager)
    }
  }

  // set news article
  private _setManagedNewsSource(managedNewsSource: NewsManager[]) {
    this._managedNewsSource.next(managedNewsSource);
    this.localStorageService.setItem(STORAGE_KEY, managedNewsSource);
  }

  getManagedNewsSource(): NewsManager[] {
    return this._managedNewsSource.getValue()
  }


  // add newsSource to user
  addUserNews(userId: string, newsSourceId: string): void {
    if (!this.getManagedNewsSourceByUserId(userId).includes(newsSourceId)) {
      this._setManagedNewsSource([
        ...this.getManagedNewsSource(),
        {
          id: uuidv4(),
          pair: [userId, newsSourceId]
        }
      ])
    }
  }

  getManagedNewsSourceByUserId(userId: string | undefined): string[] {
    return userId
      ? this.getManagedNewsSource().reduce<string[]>((acc, cur) => {
        let newsSourceId;
        if (cur.pair[0] === userId) newsSourceId = cur.pair[1];
        if (cur.pair[1] === userId) newsSourceId = cur.pair[0];
        if (newsSourceId) acc.push(newsSourceId);
        return acc;
      }, [])
      : [];
  }

  removeNews(userId: string, newsSourceId: string) {
    const targetNews = this.getManagedNewsSource().find(news => news.pair.includes(userId) && news.pair.includes(newsSourceId));
    this._setManagedNewsSource(
      targetNews ? this.getManagedNewsSource().filter(news => news.id !== targetNews.id) : this.getManagedNewsSource()
    )
  }

}
