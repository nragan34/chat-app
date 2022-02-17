import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import { News } from 'src/app/interfaces/news';
import { NewsSource } from 'src/app/interfaces/newsSource';
import { NewsConfigService } from 'src/app/services/news/news-config.service';
import { NewsManagerService } from 'src/app/services/news/news-manager.service';
import { NewsSourceService } from 'src/app/services/news/newssource.service';
import { UserActiveService } from 'src/app/services/user-active.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  managedNewsSource$: Subscription
  newsSources: (NewsSource | undefined)[] | undefined

  currentNews: any | undefined
  
  activeUserId: string | undefined

  constructor(
    private newsManagerService: NewsManagerService,
    private newsSourceService: NewsSourceService,
    private newsConfigService: NewsConfigService,
    private userActiveService: UserActiveService,
    private http: HttpClient
    
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
          return {
            newsSources
          };
        })
      )
      .subscribe(news => {
        this.newsSources = news.newsSources;
      })
  }
  
  ngOnInit() {
  }

  // load specific news content
  readNews(param: string | undefined) {
    if (param) {
      this.newsConfigService.getConfig(param).subscribe(newsData => this.currentNews = newsData)
    }
  }

  trackById(index: number, newsSource: any): number {
    return newsSource.id
  }
  
}
