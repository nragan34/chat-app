import { Component, Input, OnInit } from '@angular/core';
import { NewsSource } from 'src/app/interfaces/newsSource';
import { NewsManagerService } from 'src/app/services/news/news-manager.service';
import { UserActiveService } from 'src/app/services/user-active.service';

/**
 * News Source Component -
 *  
 * @Input - allows this component to update the news-manager componenet
 * with data from NewsSource
 * 
 * provides the following options:
 *  ::: addNewsToSubscription() - add news channel to users channel list
 *  ::: removeNewsFromSubscription() - remove news channel from users news channel list
 * 
 * uses the following services:
 *  ::: news-manager-service - add & remove news channels
 *  ::: user-active-service - get active user
 * 
 */

@Component({
  selector: 'app-news-source',
  templateUrl: './news-source.component.html',
  styleUrls: ['./news-source.component.scss']
})
export class NewsSourceComponent implements OnInit {

  @Input() newsSourceObj: NewsSource | undefined
  @Input() discoverNews: boolean | undefined

  activeUserId: string | undefined

  constructor(
    private newsManagerService: NewsManagerService,
    private userActiveService: UserActiveService
  ) { 

    this.activeUserId = this.userActiveService.getActiveUser();

  }

  ngOnInit(): void {
  }

  trackById(index: number, newsSource: any): number {
    return newsSource.id;
  }

  addNewsToSubscription() {
    if (this.newsSourceObj && this.activeUserId) {
      this.newsManagerService.addUserNews(this.newsSourceObj.id, this.activeUserId)
    }
  }

  removeNewsFromSubscription(newsSourceId: string) {
    if(this.activeUserId) {
      this.newsManagerService.removeNews(this.activeUserId, newsSourceId);
    }
  }

}
