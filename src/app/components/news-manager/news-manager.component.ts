import { Component, Input, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { NewsSource } from 'src/app/interfaces/newsSource';
import { NewsManagerService } from 'src/app/services/news/news-manager.service';
import { NewsSourceService } from 'src/app/services/news/newssource.service';
import { UserActiveService } from 'src/app/services/user-active.service';

/**
 * news-manager-component - 
 * 
 * 
 * Get managedNewsSource by active user id from news-manager-service as newsSources
 * 
 * get all newsSources from newsSourceService by newsSource id
 * 
 * Filter newsSources to discoverNewsChannels
 * subscribe to news-sources to display in html
 * 
 * trackById
 */

@Component({
  selector: 'app-news-manager',
  templateUrl: './news-manager.component.html',
  styleUrls: ['./news-manager.component.scss']
})
export class NewsManagerComponent implements OnInit {

  managedNewsSource$: Subscription
  newsSources: (NewsSource | undefined)[] | undefined
  discoverNewsChannels: (NewsSource | undefined)[] | undefined

  activeUserId: string | undefined

  constructor(
    private newsManagerService: NewsManagerService,
    private newsSourceService: NewsSourceService,
    private userActiveService: UserActiveService,
  ) {

    this.activeUserId = this.userActiveService.getActiveUser();

    this.managedNewsSource$ = this.newsManagerService.managedNewsSource$
      .pipe(
        map(() => {
          // get managedNewsSource by active user id  | returns array of newsManager objects
          const userNews = this.newsManagerService.getManagedNewsSourceByUserId(this.activeUserId);
          // get newsSource by newsSource id
          const newsSources = userNews.map((newsId) => this.newsSourceService.getNewsSourceByUserId(newsId))
          // get all newsSources and filter out non-subscribed
          // newsSources
          const discoverNewsChannels = this.newsSourceService.getNewsSource().filter(news => !userNews.includes(news.id));
          return {
            newsSources,
            discoverNewsChannels
          };
        })
      )
      .subscribe(news => {
        this.newsSources = news.newsSources;
        this.discoverNewsChannels = news.discoverNewsChannels;
      })

  }

  ngOnInit(): void {
  }

  trackById(index: number, newsSource: any): number {
    return newsSource.id
  }

}
