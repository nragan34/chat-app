import { Component, Input, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { NewsSource } from 'src/app/interfaces/newsSource';
import { NewsManagerService } from 'src/app/services/news/news-manager.service';
import { NewsSourceService } from 'src/app/services/news/newssource.service';
import { UserActiveService } from 'src/app/services/user-active.service';

@Component({
  selector: 'app-news-manager',
  templateUrl: './news-manager.component.html',
  styleUrls: ['./news-manager.component.scss']
})
export class NewsManagerComponent implements OnInit {

  managedNewsSource$: Subscription
  newsSources: (NewsSource | undefined)[] | undefined
  discoveredNews: (NewsSource | undefined)[] | undefined

  activeUserId: string | undefined

  constructor(
    private newsManagerService: NewsManagerService,
    private newsSourceService: NewsSourceService,
    private userActiveService: UserActiveService,
  ) {
    this.activeUserId = this.userActiveService.getActiveUser();
    // get news source from service and subscribe
    // this.newsSource$ = this.newsSourceService.newsSource$.subscribe(newsSource => this.newsSources = newsSource)
    this.managedNewsSource$ = this.newsManagerService.managedNewsSource$
      .pipe(
        map(() => {
          // get news source by active user id  | returns array of new sources
          const userNews = this.newsManagerService.getNewsSourceByUserId(this.activeUserId);
          // get news by id
          const newsSources = userNews.map((newsId) => this.newsSourceService.getNewsSourceByUserId(newsId))
          // get all newsSources and filter
          const discoveredNews = this.newsSourceService.getNewsSource().filter(news => !userNews.includes(news.id));
          return {
            newsSources,
            discoveredNews
          };
        })
      )
      .subscribe(news => {
        this.newsSources = news.newsSources;
        this.discoveredNews = news.discoveredNews;
      })
  }

  ngOnInit(): void {
  }

  trackById(index: number, newsSource: any): number {
    return newsSource.id
  }

}
