import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { News } from '../interfaces/news'
import { initialNews } from '../seeds/news'

@Injectable({
  providedIn: 'root'
})
export class NewsTimelineService {

  private readonly _newsSource = new BehaviorSubject<News[]>(initialNews);

  readonly myNews$ = this._newsSource.asObservable();

  constructor() { }


  private _setNews(myNews: News[]) {
    this._newsSource.next(myNews)
  }

  getNews() {
    return this._newsSource.getValue();
  }

  addNews(news: News) {
    const myNews = [...this.getNews(), news]
    this._setNews(myNews)
    console.log("Logging ID: ....> ",news.id);
  }
}
