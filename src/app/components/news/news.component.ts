import { Component,  OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { NewsSource } from 'src/app/interfaces/newsSource';
import { NewsConfigService } from 'src/app/services/news/news-config.service';
import { NewsManagerService } from 'src/app/services/news/news-manager.service';
import { NewsSourceService } from 'src/app/services/news/newssource.service';
import { UserActiveService } from 'src/app/services/user-active.service';

/**
 * news-component - 
 * 
 * 
 * Get news sources from news-manager-service as newsSources
 * subscribe to news-sources to display in html
 * 
 * readNews - used to call apoi endpoint
 * 
 */

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

  ) {

    this.activeUserId = this.userActiveService.getActiveUser();

    this.managedNewsSource$ = this.newsManagerService.managedNewsSource$
      .pipe(
        map(() => {
          // get news source by active user id  | returns array of new sources
          const userNews = this.newsManagerService.getManagedNewsSourceByUserId(this.activeUserId);
          // get newsSource by id
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

  trackById(index: number, newsSource: any): number {
    return newsSource.id
  }

  // load api content
  readNews(param: string | undefined) {
    if (param) {
      this.newsConfigService.getNewsConfig(param).subscribe(newsData => this.currentNews = newsData)
    }
  }

}
